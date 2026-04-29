import {
  HAYAV_PLAYER_SELECTOR,
  JABLE_INFO_SELECTOR,
  JABLE_PLAYER_SELECTOR,
  JABLE_REQUEST_HEADERS,
  MISSAV_PLAYER_SELECTOR,
  SITE_NAMES
} from "@/constants";
import { extractNodeCode, extractVideoCode, normalizeCode, tagsQuery } from "@/helpers";
import {
  logSearchPageDebug,
  logSiteError,
  logSiteRequest,
  logSiteResponse,
  logSiteResult,
  logSiteSignals,
  logVideoPageDebug
} from "@/logger";
import { getRequestConfig } from "@/sites";
import type {
  CloudflarePolicy,
  FetchResult,
  GmResponse,
  RequestConfig,
  VideoSiteConfig
} from "@/types";

export function isCloudflareChallenge(responseText?: string) {
  if (!responseText || responseText.length < 100) return false;
  const lowerText = responseText.toLowerCase();
  const hasChallengeText =
    lowerText.includes("just a moment") ||
    lowerText.includes("checking your browser") ||
    (lowerText.includes("please wait") && lowerText.includes("cloudflare"));
  const hasChallengeElements =
    lowerText.includes("cf-browser-verification") ||
    lowerText.includes("challenge-platform") ||
    lowerText.includes("challenges.cloudflare.com");
  const hasDDoSProtection =
    lowerText.includes("ddos protection by cloudflare") &&
    (lowerText.includes("checking") || lowerText.includes("please wait"));
  return hasChallengeText || hasChallengeElements || hasDDoSProtection;
}

export function getCloudflarePolicy(siteItem: VideoSiteConfig): Required<CloudflarePolicy> {
  return {
    useChallengeText: true,
    useHeaders: true,
    useStatus403: true,
    useErrorText: true,
    forceStatus: false,
    ...(siteItem.cloudflare || {})
  };
}

export function detectCloudflareFromText(
  siteItem: VideoSiteConfig,
  responseText: string,
  { hasContent = false }: { hasContent?: boolean } = {}
) {
  const policy = getCloudflarePolicy(siteItem);
  if (policy.forceStatus) return true;
  if (hasContent || !policy.useChallengeText) return false;
  return isCloudflareChallenge(responseText);
}

export function detectCloudflareFromResponse(
  siteItem: VideoSiteConfig,
  response: GmResponse,
  { hasContent = false }: { hasContent?: boolean } = {}
) {
  const policy = getCloudflarePolicy(siteItem);
  if (policy.forceStatus) return true;
  if (hasContent) return false;

  const responseText = response.responseText || "";
  const responseHeaders = (response.responseHeaders || "").toLowerCase();
  const hasHeaderSignals =
    responseHeaders.includes("cf-mitigated") ||
    responseHeaders.includes("server:cloudflare") ||
    responseHeaders.includes("cf-ray");
  const hasChallengeText = isCloudflareChallenge(responseText);

  if (policy.useChallengeText && hasChallengeText) return true;
  if (policy.useHeaders && hasHeaderSignals && hasChallengeText) return true;
  if (policy.useStatus403 && response.status === 403 && (hasChallengeText || hasHeaderSignals)) {
    return true;
  }
  return false;
}

export function detectCloudflareFromError(siteItem: VideoSiteConfig, error: unknown) {
  const policy = getCloudflarePolicy(siteItem);
  if (policy.forceStatus) return true;
  if (!policy.useErrorText) return false;
  const errorText = error instanceof Error ? error.message : String(error || "");
  return isCloudflareChallenge(errorText);
}

export function gmRequest({ method = "GET", url, headers = {}, data }: RequestConfig) {
  return new Promise<GmResponse>((resolve, reject) => {
    GM_xmlhttpRequest({
      method,
      url,
      headers,
      data,
      onload: (response) => resolve(response),
      onerror: (error) => reject(error)
    });
  });
}

function isJableNotFoundResponse(response: GmResponse, targetLink: string) {
  const responseUrl = response.finalUrl || response.responseURL || targetLink;
  const responseText = response.responseText || "";
  const lowerText = responseText.toLowerCase();
  return (
    response.status === 404 ||
    responseUrl.includes("/404.php") ||
    (responseUrl.includes("404") && responseUrl !== targetLink) ||
    lowerText.includes("404 not found") ||
    lowerText.includes("page not found") ||
    lowerText.includes("video not found") ||
    responseText.length < 5000
  );
}

function searchPageCodeCheck(titleNodes: Element[] | NodeListOf<Element>, siteItem: VideoSiteConfig, CODE: string) {
  if (!titleNodes || titleNodes.length === 0) {
    return { isSuccess: false, titleNodeText: "", matchedIndex: 0, multipleRes: false };
  }

  if (siteItem.strictParser) {
    const nodes = Array.from(titleNodes);
    const passNodes = nodes
      .map((node, index) => ({ node, index }))
      .filter(({ node }) => normalizeCode(extractNodeCode(node)) === normalizeCode(CODE));

    return {
      titleNodeText: passNodes.map(({ node }) => node.outerHTML).join(" "),
      isSuccess: passNodes.length > 0,
      multipleRes: passNodes.length > 1,
      matchedIndex: passNodes[0]?.index ?? 0
    };
  }

  const listIndex = siteItem.domQuery?.listIndex ?? 0;
  const titleNode = Array.from(titleNodes)[listIndex];
  const titleNodeText = titleNode?.outerHTML || "";
  const matchCode = extractNodeCode(titleNode);
  return {
    titleNodeText,
    isSuccess: normalizeCode(matchCode) === normalizeCode(CODE),
    multipleRes: titleNodes.length > 1,
    matchedIndex: listIndex
  };
}

function analyzeSearchPageStructure(
  doc: Document,
  responseText: string,
  titleNodes: NodeListOf<Element>,
  linkNodes: NodeListOf<Element>,
  siteItem: VideoSiteConfig
) {
  const pageTitle = doc.querySelector("title")?.textContent?.trim() || "";
  const bodyText = doc.body?.textContent?.trim() || "";
  const lowerTitle = pageTitle.toLowerCase();
  const hasSearchPageTitle =
    /\bsearch(ed| results?)\b/i.test(pageTitle) ||
    lowerTitle.includes("you searched for") ||
    lowerTitle.includes("search results");
  const hasChallengeTitle = /just a moment|checking your browser/i.test(pageTitle);
  const hasNodeContent = titleNodes.length > 0 || linkNodes.length > 0;
  const hasNormalPageStructure =
    !!pageTitle && !hasChallengeTitle && (bodyText.length > 200 || hasSearchPageTitle);
  const hasContent = hasNodeContent || hasNormalPageStructure;

  return {
    pageTitle,
    hasSearchPageTitle,
    hasChallengeTitle,
    hasNodeContent,
    hasNormalPageStructure,
    hasContent,
    isCloudflare: hasNormalPageStructure
      ? false
      : detectCloudflareFromText(siteItem, responseText, { hasContent })
  };
}

export function videoPageParser(
  responseText: string,
  domQuery: VideoSiteConfig["domQuery"] = {},
  siteItem: VideoSiteConfig,
  CODE: string,
  response: GmResponse
): FetchResult {
  const doc = new DOMParser().parseFromString(responseText, "text/html");
  const subNode = domQuery?.subQuery ? doc.querySelector(domQuery.subQuery) : null;
  const subNodeText = subNode?.innerHTML || "";
  const leakNode = domQuery?.leakQuery ? doc.querySelector(domQuery.leakQuery) : null;
  const leakNodeText = leakNode?.innerHTML || "";

  let videoNode: Element | boolean | null = null;

  if (siteItem.name === SITE_NAMES.JABLE) {
    const errorText = responseText.toLowerCase();
    const pageTitle = doc.querySelector("title")?.textContent || "";
    const h1Title = doc.querySelector("h1")?.textContent || "";
    const headerText = doc.querySelector(".info-header")?.textContent || "";
    const normalizedCode = normalizeCode(CODE);
    const hasMatchedCode = [pageTitle, h1Title, headerText].some((text) =>
      normalizeCode(text).includes(normalizedCode)
    );

    const has404Error =
      errorText.includes("404") &&
      (errorText.includes("not found") ||
        errorText.includes("page not found") ||
        pageTitle.toLowerCase().includes("404") ||
        h1Title.toLowerCase().includes("404"));

    const hasNotFoundError =
      (errorText.includes("not found") ||
        errorText.includes("page not found") ||
        errorText.includes("video not found")) &&
      (pageTitle.toLowerCase().includes("not found") ||
        h1Title.toLowerCase().includes("not found"));

    const hasErrorElement = doc.querySelector(".error, .not-found, .404, .no-video, .page-not-found");

    if (has404Error || hasNotFoundError || hasErrorElement) {
      const result = {
        isSuccess: false,
        isCloudflare: false,
        resultLink: response.finalUrl || response.responseURL || "",
        hasContent: false,
        tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
      };
      logVideoPageDebug(siteItem, {
        code: CODE,
        reason: "explicit_not_found",
        responseStatus: response.status
      });
      return result;
    }

    const hasVideoInfo = !!doc.querySelector(JABLE_INFO_SELECTOR);
    videoNode = doc.querySelector(JABLE_PLAYER_SELECTOR);
    if (!(videoNode || hasVideoInfo) || !hasMatchedCode) {
      const hasEnoughContent = responseText.length > 15000;
      const hasVideoScript =
        responseText.includes("video") &&
        (responseText.includes("player") ||
          responseText.includes("embed") ||
          responseText.includes("jwplayer") ||
          responseText.includes("plyr"));
      videoNode = hasMatchedCode && hasVideoInfo && (hasEnoughContent || hasVideoScript) ? true : null;
    }
  } else if (siteItem.name === SITE_NAMES.HAYAV || siteItem.name === SITE_NAMES.EVOJAV) {
    const normalizedCode = normalizeCode(CODE);
    const titleTexts = [
      doc.querySelector("title")?.textContent || "",
      doc.querySelector("meta[property='og:title']")?.getAttribute("content") || "",
      doc.querySelector("h1")?.textContent || "",
      doc.querySelector("meta[name='description']")?.getAttribute("content") || ""
    ];
    const hasMatchedCode = titleTexts.some((text) => normalizeCode(text).includes(normalizedCode));
    const hasPlayer = !!doc.querySelector(HAYAV_PLAYER_SELECTOR);
    const lowerText = responseText.toLowerCase();
    const hasNotFoundText =
      lowerText.includes("404") ||
      lowerText.includes("not found") ||
      lowerText.includes("page not found");

    if (hasNotFoundText && !hasMatchedCode) {
      const result = {
        isSuccess: false,
        isCloudflare: false,
        isNotFound: true,
        resultLink: response.finalUrl || response.responseURL || "",
        hasContent: false,
        tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
      };
      logSiteSignals(siteItem, siteItem.name === SITE_NAMES.EVOJAV ? "evojavSignals" : "hayavSignals", {
        code: CODE,
        hasMatchedCode,
        hasPlayer,
        hasNotFoundText,
        result
      });
      return result;
    }

    videoNode = hasMatchedCode && hasPlayer && !hasNotFoundText ? true : null;
    logSiteSignals(siteItem, siteItem.name === SITE_NAMES.EVOJAV ? "evojavSignals" : "hayavSignals", {
      code: CODE,
      hasMatchedCode,
      hasPlayer,
      hasNotFoundText
    });
  } else if (siteItem.name === SITE_NAMES.MISSAV) {
    const normalizedCode = normalizeCode(CODE);
    const titleTexts = [
      doc.querySelector("title")?.textContent || "",
      doc.querySelector("meta[property='og:title']")?.getAttribute("content") || "",
      doc.querySelector("meta[name='description']")?.getAttribute("content") || "",
      doc.querySelector("h1")?.textContent || ""
    ];
    const hasMatchedCode = titleTexts.some((text) => normalizeCode(text).includes(normalizedCode));
    const hasPlayer = !!doc.querySelector(MISSAV_PLAYER_SELECTOR);
    const lowerText = responseText.toLowerCase();
    const hasNotFoundText =
      lowerText.includes("404") ||
      lowerText.includes("not found") ||
      lowerText.includes("page not found") ||
      lowerText.includes("video not found");

    if (hasNotFoundText && !hasMatchedCode) {
      const result = {
        isSuccess: false,
        isCloudflare: false,
        isNotFound: true,
        resultLink: response.finalUrl || response.responseURL || "",
        hasContent: false,
        tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
      };
      logSiteSignals(siteItem, "missavSignals", {
        code: CODE,
        hasMatchedCode,
        hasPlayer,
        hasNotFoundText,
        result
      });
      return result;
    }

    videoNode = hasMatchedCode && hasPlayer && !hasNotFoundText ? true : null;
    logSiteSignals(siteItem, "missavSignals", {
      code: CODE,
      hasMatchedCode,
      hasPlayer,
      hasNotFoundText
    });
  } else if (siteItem.name === SITE_NAMES.JAVMENU) {
    const normalizedCode = normalizeCode(CODE);
    const canonicalUrl = doc.querySelector("link[rel='canonical']")?.getAttribute("href") || "";
    const ogUrl = doc.querySelector("meta[property='og:url']")?.getAttribute("content") || "";
    const detailCodeTexts = [
      doc.querySelector(".code")?.textContent || "",
      doc.querySelector(".display-5 strong")?.textContent || "",
      doc.querySelector("h1")?.textContent || ""
    ];
    const titleTexts = [
      doc.querySelector("title")?.textContent || "",
      doc.querySelector("meta[property='og:title']")?.getAttribute("content") || "",
      doc.querySelector("meta[name='description']")?.getAttribute("content") || ""
    ];
    const hasExactDetailCode = detailCodeTexts.some(
      (text) => normalizeCode(extractVideoCode(text)) === normalizedCode
    );
    const hasExactTitleCode = titleTexts.some(
      (text) => normalizeCode(extractVideoCode(text)) === normalizedCode
    );
    const hasExactUrlCode = [canonicalUrl, ogUrl].some((urlText) => {
      const lastSegment = urlText.split("/").filter(Boolean).pop() || "";
      return normalizeCode(lastSegment) === normalizedCode;
    });
    const hasMatchedCode = hasExactDetailCode || (hasExactTitleCode && hasExactUrlCode);
    const hasPlayer =
      !!doc.querySelector("#primary-player video[src], #seo-main-video[src]") ||
      !!doc.querySelector("#player-tab .nav-link[data-m3u8]") ||
      !!doc.querySelector("#tab-content video[data-poster], #tab-content video[src]");
    const lowerText = responseText.toLowerCase();
    const hasNotFoundText =
      (lowerText.includes("404") ||
        lowerText.includes("not found") ||
        lowerText.includes("page not found") ||
        lowerText.includes("video not found")) &&
      !hasMatchedCode;

    if (hasNotFoundText) {
      const result = {
        isSuccess: false,
        isCloudflare: false,
        isNotFound: true,
        resultLink: response.finalUrl || response.responseURL || "",
        hasContent: false,
        tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
      };
      logSiteSignals(siteItem, "javmenuSignals", {
        code: CODE,
        hasMatchedCode,
        hasPlayer,
        hasNotFoundText,
        result
      });
      return result;
    }

    videoNode = hasMatchedCode && hasPlayer ? true : null;
    logSiteSignals(siteItem, "javmenuSignals", {
      code: CODE,
      hasExactDetailCode,
      hasExactTitleCode,
      hasExactUrlCode,
      hasMatchedCode,
      hasPlayer,
      hasNotFoundText
    });
  } else {
    videoNode = domQuery?.videoQuery ? doc.querySelector(domQuery.videoQuery) : true;
  }

  const hasContent = !!videoNode || subNodeText.length > 0 || leakNodeText.length > 0;
  const isCloudflare = detectCloudflareFromText(siteItem, responseText, { hasContent });

  const result = {
    isSuccess: !!videoNode && !isCloudflare,
    isCloudflare,
    resultLink: response.finalUrl || response.responseURL || "",
    hasContent,
    tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
  };

  logVideoPageDebug(siteItem, {
    code: CODE,
    hasContent,
    hasVideoNode: !!videoNode,
    isCloudflare,
    result
  });

  return result;
}

export function searchPageParser(responseText: string, siteItem: VideoSiteConfig, CODE: string) {
  if (typeof siteItem.searchParser === "function") {
    return siteItem.searchParser(responseText, siteItem, CODE);
  }

  const { linkQuery, titleQuery } = siteItem.domQuery || {};
  const doc = new DOMParser().parseFromString(responseText, "text/html");
  const titleNodes = titleQuery ? doc.querySelectorAll(titleQuery) : ({} as NodeListOf<Element>);
  const { isSuccess, titleNodeText, multipleRes, matchedIndex } = searchPageCodeCheck(
    Array.from(titleNodes || []),
    siteItem,
    CODE
  );
  const linkNodes = linkQuery ? doc.querySelectorAll(linkQuery) : ({} as NodeListOf<Element>);
  const linkNode = Array.from(linkNodes || [])[matchedIndex ?? siteItem.domQuery?.listIndex ?? 0] as
    | HTMLAnchorElement
    | undefined;

  const structure = analyzeSearchPageStructure(doc, responseText, titleNodes, linkNodes, siteItem);
  const isCloudflare = structure.hasNormalPageStructure
    ? false
    : detectCloudflareFromText(siteItem, responseText, { hasContent: structure.hasContent });

  if (isCloudflare) {
    const result = { isSuccess: false, isCloudflare: true, hasContent: !!structure.hasContent };
    logSearchPageDebug(siteItem, { code: CODE, reason: "cloudflare", ...structure });
    return result;
  }

  if (!isSuccess) {
    const result = { isSuccess: false, isCloudflare: false, hasContent: !!structure.hasContent };
    logSearchPageDebug(siteItem, {
      code: CODE,
      reason: "no_match",
      titleNodeText: titleNodeText.slice(0, 200),
      ...structure
    });
    return result;
  }

  if (!linkNode) {
    const result = { isSuccess: false, isCloudflare: false, hasContent: !!structure.hasContent };
    logSearchPageDebug(siteItem, { code: CODE, reason: "matched_but_no_link", ...structure });
    return result;
  }

  const resultLinkText = linkNode.href.replace(linkNode.hostname, siteItem.hostname);
  const result = {
    isSuccess: true,
    isCloudflare: false,
    hasContent: !!structure.hasContent,
    resultLink: resultLinkText,
    multipleRes,
    tag: tagsQuery({ leakageText: titleNodeText, subtitleText: titleNodeText })
  };
  logSearchPageDebug(siteItem, { code: CODE, reason: "matched", resultLink: resultLinkText, ...structure });
  return result;
}

export async function baseFetcher({
  siteItem,
  targetLink,
  CODE
}: {
  siteItem: VideoSiteConfig;
  targetLink: string;
  CODE: string;
}): Promise<FetchResult> {
  if (siteItem.fetchType === "direct") {
    if (getCloudflarePolicy(siteItem).forceStatus) {
      return { isSuccess: false, resultLink: targetLink, isCloudflare: true };
    }
    return { isSuccess: true, resultLink: targetLink, isCloudflare: false };
  }

  try {
    const requestConfig = getRequestConfig(siteItem, targetLink, CODE);
    if (siteItem.name === SITE_NAMES.JABLE && !requestConfig.headers) {
      requestConfig.headers = JABLE_REQUEST_HEADERS;
    }

    logSiteRequest(siteItem, { code: CODE, targetLink, requestConfig });
    const response = await gmRequest(requestConfig);
    logSiteResponse(siteItem, { code: CODE, targetLink, response });

    if (siteItem.name === SITE_NAMES.JABLE && siteItem.fetchType === "get") {
      if (isJableNotFoundResponse(response, targetLink)) {
        return { isSuccess: false, isCloudflare: false, resultLink: targetLink };
      }
      if (!isCloudflareChallenge(response.responseText)) {
        const parseResult = videoPageParser(
          response.responseText || "",
          siteItem.domQuery,
          siteItem,
          CODE,
          response
        );
        return { ...parseResult, resultLink: targetLink };
      }
    }

    if (siteItem.fetchType === "get") {
      const parseResult = videoPageParser(
        response.responseText || "",
        siteItem.domQuery,
        siteItem,
        CODE,
        response
      );
      if (parseResult.isNotFound) {
        const result = { ...parseResult, resultLink: targetLink };
        logSiteResult(siteItem, { code: CODE, targetLink, reason: "explicit_not_found", result });
        return result;
      }
      if (
        !parseResult.isSuccess &&
        detectCloudflareFromResponse(siteItem, response, { hasContent: !!parseResult.hasContent })
      ) {
        logSiteResult(siteItem, {
          code: CODE,
          targetLink,
          reason: "blocked_response",
          result: { isSuccess: false, isCloudflare: true }
        });
        return { isSuccess: false, isCloudflare: true, resultLink: targetLink };
      }
      if (response.status === 404) {
        throw new Error(String(response.status));
      }
      const result = { ...parseResult, resultLink: targetLink };
      logSiteResult(siteItem, { code: CODE, targetLink, reason: "get_parse", result });
      return result;
    }

    const parseResult = searchPageParser(response.responseText || "", siteItem, CODE);
    if (parseResult.isSuccess) {
      logSiteResult(siteItem, {
        code: CODE,
        targetLink,
        reason: "search_parse_success",
        result: parseResult
      });
      return { resultLink: targetLink, ...parseResult } as FetchResult;
    }

    if (
      detectCloudflareFromResponse(siteItem, response, { hasContent: !!parseResult.hasContent })
    ) {
      logSiteResult(siteItem, {
        code: CODE,
        targetLink,
        reason: "search_blocked_response",
        result: { isSuccess: false, isCloudflare: true }
      });
      return { isSuccess: false, isCloudflare: true, resultLink: targetLink };
    }

    if (response.status === 404) {
      throw new Error(String(response.status));
    }

    logSiteResult(siteItem, {
      code: CODE,
      targetLink,
      reason: "search_parse_fail",
      result: parseResult
    });
    return { resultLink: targetLink, ...parseResult } as FetchResult;
  } catch (error) {
    const errorText = error instanceof Error ? error.message : String(error || "");
    const shouldMarkCloudflare = detectCloudflareFromError(siteItem, error);
    logSiteError(siteItem, {
      code: CODE,
      targetLink,
      errorText,
      isCloudflare: shouldMarkCloudflare
    });
    return {
      isSuccess: false,
      isCloudflare: shouldMarkCloudflare,
      resultLink: targetLink
    };
  }
}
