import {
  AV01_REQUEST_HEADERS,
  BESTJP_REQUEST_HEADERS,
  JAVGG_REQUEST_HEADERS,
  SEVEN_MMTV_REQUEST_HEADERS,
  SITE_NAMES,
  SP_PREFIX,
  SUPJAV_REQUEST_HEADERS
} from "@/constants";
import {
  extractJmvbtCode,
  extractNodeCode,
  extractVideoCode,
  formatJableCode,
  initJmvbtPage,
  isJmvbtPage,
  normalizeCode,
  tagsQuery
} from "@/helpers";
import { mountInlineJavTrailersPlayer, resolveJavTrailersDirectLink } from "@/hls";
import { logSiteSignals } from "@/logger";
import type {
  Av01VideoItem,
  LibSiteConfig,
  RequestConfig,
  SearchParseResult,
  VideoSiteConfig
} from "@/types";

export const libSites: LibSiteConfig[] = [
  {
    name: "javdb",
    identifier: "a[href*='javdb']",
    queries: {
      panelQueryStr: ".video-meta-panel>.columns.is-desktop .panel.movie-panel-info",
      codeQueryStr: "[data-clipboard-text]"
    },
    method() {
      const columnVideoCover = document.querySelector<HTMLElement>(".column-video-cover");
      if (columnVideoCover) {
        columnVideoCover.style.width = "60%";
      }

      document
        .querySelector(
          ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)"
        )
        ?.classList.add("db-panel");
    }
  },
  {
    name: "javbus",
    identifier: "a[href*='javbus']",
    queries: {
      panelQueryStr: ".movie>div.info",
      codeQueryStr: 'span[style="color:#CC0000;"]'
    },
    method() {}
  },
  {
    name: "javlib",
    identifier: "img[src*='logo-top']",
    queries: {
      panelQueryStr: "#video_jacket_info #video_info",
      codeQueryStr: "#video_id td.text"
    },
    method() {
      document.querySelector("#video_info")?.classList.add("lib-panel");
    }
  },
  {
    name: "jmvbt",
    identifier: "body",
    queries: {
      panelQueryStr: "#info",
      codeQueryStr: "[data-jav-code]"
    },
    resolve: isJmvbtPage,
    getCode: extractJmvbtCode,
    method: initJmvbtPage
  }
];

function parsePaipancon(responseText: string, siteItem: VideoSiteConfig, CODE: string): SearchParseResult {
  const doc = new DOMParser().parseFromString(responseText, "text/html");
  const galleryLink = doc.querySelector(
    `a[href='/gallery/${CODE}'], a[href='/gallery/${CODE.toUpperCase()}']`
  );
  const resultLinkNode = doc.querySelector("div.card a[href$='.html']");
  const hasContent = !!galleryLink || !!resultLinkNode;

  if (!galleryLink || !resultLinkNode) {
    return { isSuccess: false, isCloudflare: false, hasContent };
  }

  const href = resultLinkNode.getAttribute("href");
  if (!href) {
    return { isSuccess: false, isCloudflare: false, hasContent };
  }

  return {
    isSuccess: true,
    isCloudflare: false,
    hasContent,
    resultLink: `https://${siteItem.hostname}${href}`
  };
}

function parseHighporn(
  responseText: string,
  siteItem: VideoSiteConfig,
  CODE: string,
  detectCloudflareFromText: (siteItem: VideoSiteConfig, responseText: string, opts?: { hasContent?: boolean }) => boolean
): SearchParseResult {
  const doc = new DOMParser().parseFromString(responseText, "text/html");
  const pageTitle = doc.querySelector("title")?.textContent || "";
  const anchors = Array.from(doc.querySelectorAll<HTMLAnchorElement>("a[href]")).filter((node) => {
    const href = node.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return false;
    if (href.includes("/search/videos")) return false;
    if (
      href.includes("/categories/") ||
      href.includes("/models/") ||
      href.includes("/pornstars/") ||
      href.includes("/tags/")
    ) {
      return false;
    }

    return (
      node.href.startsWith(`https://${siteItem.hostname}/`) ||
      node.href.startsWith(`http://${siteItem.hostname}/`)
    );
  });

  const hasContent = anchors.length > 0 || pageTitle.toLowerCase().includes("search results");
  const isCloudflare = detectCloudflareFromText(siteItem, responseText, { hasContent });

  logSiteSignals(siteItem, "highpornSignals", {
    code: CODE,
    pageTitle,
    anchorCount: anchors.length,
    hasContent,
    isCloudflare,
    responsePreview: responseText.slice(0, 200)
  });

  if (isCloudflare) {
    return { isSuccess: false, isCloudflare: true, hasContent };
  }

  const candidates = anchors
    .map((node, index) => {
      const cardNode =
        node.closest("article, .item, .thumb, .card, .well, .video, li, .col") ||
        node.parentElement ||
        node;
      const candidateText = [
        node.textContent || "",
        node.getAttribute("title") || "",
        node.getAttribute("aria-label") || "",
        node.querySelector("img")?.getAttribute("alt") || "",
        cardNode.textContent || ""
      ].join(" ");

      return {
        index,
        href: node.href.replace(node.hostname, siteItem.hostname),
        candidateCode: extractVideoCode(candidateText),
        candidateText: candidateText.trim()
      };
    })
    .filter((item) => item.href && item.candidateText);

  const matchedItems = candidates.filter(
    (item) => normalizeCode(item.candidateCode) === normalizeCode(CODE)
  );

  logSiteSignals(siteItem, "highpornCandidates", {
    code: CODE,
    candidateCount: candidates.length,
    matchedCount: matchedItems.length,
    sampleCandidates: candidates.slice(0, 5).map((item) => ({
      href: item.href,
      candidateCode: item.candidateCode,
      candidateText: item.candidateText.slice(0, 120)
    }))
  });

  if (matchedItems.length === 0) {
    return { isSuccess: false, isCloudflare: false, hasContent };
  }

  const matchedItem = matchedItems[0];
  return {
    isSuccess: true,
    isCloudflare: false,
    hasContent,
    resultLink: matchedItem.href,
    multipleRes: matchedItems.length > 1,
    tag: tagsQuery({
      leakageText: matchedItem.candidateText,
      subtitleText: matchedItem.candidateText
    })
  };
}

function parseBestJp(responseText: string, siteItem: VideoSiteConfig, CODE: string): SearchParseResult {
  const doc = new DOMParser().parseFromString(responseText, "text/html");
  const pageTitle = doc.querySelector("title")?.textContent || "";
  const bodyText = doc.body?.textContent || "";
  const anchorNodes = Array.from(doc.querySelectorAll<HTMLAnchorElement>("a[href*='/video/']"));
  const normalizedTargetCode = normalizeCode(CODE);

  const candidates = anchorNodes
    .map((node) => {
      const href = node.href?.replace(node.hostname, siteItem.hostname) || "";
      const hrefSlug = node.getAttribute("href")?.split("/").filter(Boolean).pop() || "";
      const candidateText = [
        node.getAttribute("title") || "",
        node.textContent || "",
        hrefSlug
      ].join(" ");

      const codeSources = [hrefSlug, node.getAttribute("title") || "", node.textContent || ""];
      let candidateCode = "";

      for (const source of codeSources) {
        const extractedCode = extractVideoCode(source);
        if (normalizeCode(extractedCode) === normalizedTargetCode) {
          candidateCode = extractedCode;
          break;
        }
      }

      if (!candidateCode) {
        for (const source of codeSources) {
          const extractedCode = extractVideoCode(source);
          if (normalizeCode(extractedCode)) {
            candidateCode = extractedCode;
            break;
          }
        }
      }

      return {
        href,
        candidateCode,
        candidateText: candidateText.trim()
      };
    })
    .filter((item, index, array) => item.href && array.findIndex((entry) => entry.href === item.href) === index);

  const hasContent =
    candidates.length > 0 ||
    pageTitle.toLowerCase().includes("search results") ||
    normalizeCode(pageTitle).includes(normalizedTargetCode) ||
    bodyText.includes("Search results for:");
  const matchedItems = candidates.filter(
    (item) => normalizeCode(item.candidateCode) === normalizedTargetCode
  );

  if (matchedItems.length === 0) {
    return { isSuccess: false, isCloudflare: false, hasContent };
  }

  const matchedItem = matchedItems[0];
  return {
    isSuccess: true,
    isCloudflare: false,
    hasContent,
    resultLink: matchedItem.href,
    multipleRes: matchedItems.length > 1,
    tag: tagsQuery({
      leakageText: matchedItem.candidateText,
      subtitleText: matchedItem.candidateText
    })
  };
}

function parseAV01(responseText: string, siteItem: VideoSiteConfig, CODE: string): SearchParseResult {
  try {
    const payload = JSON.parse(responseText) as { videos?: Av01VideoItem[] };
    const videos = Array.isArray(payload.videos) ? payload.videos : [];
    const hasContent = videos.length > 0;
    const matchedVideos = videos.filter((videoItem: Av01VideoItem) => {
      const candidateCode = videoItem?.dvd_id || videoItem?.dmm_id || "";
      return normalizeCode(candidateCode) === normalizeCode(CODE);
    });

    const matchVideo = matchedVideos[0];
    if (!matchVideo?.id) {
      return { isSuccess: false, isCloudflare: false, hasContent };
    }

    const resultCode = (matchVideo.dvd_id || CODE).toLowerCase();
    return {
      isSuccess: true,
      isCloudflare: false,
      hasContent,
      multipleRes: matchedVideos.length > 1,
      resultLink: `https://${siteItem.hostname}/jp/video/${matchVideo.id}/${resultCode}`
    };
  } catch {
    return { isSuccess: false, isCloudflare: false, hasContent: false };
  }
}

function parseSevenMmtv(
  responseText: string,
  siteItem: VideoSiteConfig,
  CODE: string,
  detectCloudflareFromText: (siteItem: VideoSiteConfig, responseText: string, opts?: { hasContent?: boolean }) => boolean
): SearchParseResult {
  const doc = new DOMParser().parseFromString(responseText, "text/html");
  const linkNodes = Array.from(
    doc.querySelectorAll<HTMLAnchorElement>("a[target='_top'][href$='.html']")
  ).filter((node) => !node.href.includes("/searchall_search/"));

  const uniqueLinks = Array.from(new Map(linkNodes.map((node) => [node.href, node])).values());

  const matchedLinks = uniqueLinks.filter((node) => {
    const hrefCode = node.href.split("/").pop()?.replace(/\.html$/i, "") || "";
    const imageAlt = node.querySelector("img")?.getAttribute("alt") || "";
    const candidateCode = extractVideoCode([node.textContent || "", imageAlt, hrefCode].join(" "));
    return normalizeCode(candidateCode || hrefCode) === normalizeCode(CODE);
  });

  const hasContent = uniqueLinks.length > 0;
  const isCloudflare = detectCloudflareFromText(siteItem, responseText, { hasContent });
  if (isCloudflare) {
    return { isSuccess: false, isCloudflare: true, hasContent };
  }

  if (matchedLinks.length === 0) {
    return { isSuccess: false, isCloudflare: false, hasContent };
  }

  const resultLink = matchedLinks[0].href.replace(matchedLinks[0].hostname, siteItem.hostname);
  const tagText = matchedLinks
    .map((node) => node.textContent || node.querySelector("img")?.getAttribute("alt") || "")
    .join(" ");

  return {
    isSuccess: true,
    isCloudflare: false,
    hasContent,
    resultLink,
    multipleRes: matchedLinks.length > 1,
    tag: tagsQuery({ leakageText: tagText, subtitleText: tagText })
  };
}

function parseJavtiful(
  responseText: string,
  siteItem: VideoSiteConfig,
  CODE: string
): SearchParseResult {
  const doc = new DOMParser().parseFromString(responseText, "text/html");
  const pageTitle = doc.querySelector("title")?.textContent?.trim() || "";
  const bodyText = doc.body?.textContent?.trim() || "";
  const hasSearchPage =
    pageTitle.toLowerCase().includes("search result") ||
    bodyText.includes(`Search Result for "${CODE}"`) ||
    bodyText.includes("搜索结果") ||
    bodyText.includes("Search Result for");
  const hasNoResultText =
    bodyText.includes("未找到视频") ||
    bodyText.includes("请尝试其他关键词") ||
    bodyText.toLowerCase().includes("no videos found");
  const resolveJavtifulCandidateCode = (
    linkNode: HTMLAnchorElement,
    titleNode: HTMLAnchorElement | null,
    imageNode: HTMLImageElement | null,
    cardText: string
  ) => {
    const hrefSlug = linkNode.getAttribute("href")?.split("/").filter(Boolean).pop() || "";
    const codeSources = [
      hrefSlug,
      titleNode?.getAttribute("title") || "",
      titleNode?.textContent || "",
      imageNode?.getAttribute("alt") || "",
      cardText
    ];

    for (const source of codeSources) {
      const extractedCode = extractVideoCode(source);
      if (normalizeCode(extractedCode) === normalizeCode(CODE)) {
        return extractedCode;
      }
    }

    for (const source of codeSources) {
      const extractedCode = extractVideoCode(source);
      if (normalizeCode(extractedCode)) {
        return extractedCode;
      }
    }

    return "";
  };

  const candidateLinks = Array.from(
    doc.querySelectorAll<HTMLAnchorElement>(
      "#search-videos a[href*='/video/'], main a[href*='/video/'], a[href*='/video/']"
    )
  );

  const resultCards = candidateLinks
    .map((linkNode) => {
      const card =
        linkNode.closest("article, .card, .group, li, .grid > div, .grid-item") ||
        linkNode.parentElement ||
        linkNode;
      const titleNode =
        card.querySelector<HTMLAnchorElement>("a[title][href*='/video/']") ||
        linkNode;
      const imageNode = card.querySelector<HTMLImageElement>("img[alt]");
      const codeText = card.querySelector(".label-code, .badge, .tag")?.textContent || "";
      const cardText = card.textContent || "";
      const candidateText = [
        codeText,
        titleNode?.getAttribute("title") || "",
        titleNode?.textContent || "",
        imageNode?.getAttribute("alt") || "",
        cardText,
        linkNode.getAttribute("href") || ""
      ].join(" ");

      return {
        href: linkNode.href?.replace(linkNode.hostname, siteItem.hostname) || "",
        candidateCode: resolveJavtifulCandidateCode(linkNode, titleNode, imageNode, cardText),
        candidateText: candidateText.trim()
      };
    })
    .filter((item, index, array) => item.href && array.findIndex((entry) => entry.href === item.href) === index);

  const hasContent = resultCards.length > 0 || hasSearchPage || hasNoResultText;
  const matchedItems = resultCards.filter(
    (item) => normalizeCode(item.candidateCode) === normalizeCode(CODE)
  );

  if (matchedItems.length === 0) {
    return { isSuccess: false, isCloudflare: false, hasContent };
  }

  const matchedItem = matchedItems[0];
  return {
    isSuccess: true,
    isCloudflare: false,
    hasContent,
    resultLink: matchedItem.href,
    multipleRes: matchedItems.length > 1,
    tag: tagsQuery({
      leakageText: matchedItem.candidateText,
      subtitleText: matchedItem.candidateText
    })
  };
}

export function createVideoSites(
  detectCloudflareFromText: (
    siteItem: VideoSiteConfig,
    responseText: string,
    opts?: { hasContent?: boolean }
  ) => boolean
) {
  const getSites: VideoSiteConfig[] = [
    {
      name: "FANZA 動画",
      hostname: "dmm.co.jp",
      url: "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid={{code}}/",
      fetchType: "get",
      codeFormatter: (preCode) => {
        const [pre = "", num = ""] = preCode.split("-");
        if (!pre || !num) {
          return preCode;
        }
        const padNum = num.padStart(5, "0");
        if (pre.toLowerCase().startsWith("start")) {
          return `1${pre.toLowerCase()}${padNum}`;
        }
        return `${pre}${padNum}`;
      }
    },
    {
      name: SITE_NAMES.JAVMENU,
      hostname: "javmenu.com",
      url: "https://javmenu.com/{{code}}",
      fetchType: "get",
      domQuery: {
        videoQuery: "#primary-player video[src], #seo-main-video[src], #player-tab .nav-link[data-m3u8]"
      },
      cloudflare: {
        useChallengeText: false,
        useHeaders: false
      }
    },
    {
      name: SITE_NAMES.HAYAV,
      hostname: "hayav.com",
      url: "https://hayav.com/video/{{code}}/",
      fetchType: "get"
    },
    {
      name: SITE_NAMES.EVOJAV,
      hostname: "evojav.pro",
      url: "https://evojav.pro/video/{{code}}/",
      fetchType: "get"
    },
    {
      name: SITE_NAMES.JAVBUS,
      hostname: "javbus.com",
      url: "https://javbus.com/{{code}}",
      fetchType: "get",
      codeFormatter: (preCode) => (preCode.startsWith("MIUM") ? `${SP_PREFIX}${preCode}` : preCode)
    }
  ];

  const parserSites: VideoSiteConfig[] = [
    {
      name: "javtrailers",
      hostname: "javtrailers.com",
      url: "https://javtrailers.com/search/{{code}}",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        linkQuery: ".videos-list .video-link",
        titleQuery: ".videos-list .video-link p.card-text"
      }
    },
    {
      name: SITE_NAMES.ONE_TWO_THREE_AV,
      hostname: "123av.com",
      url: "https://123av.com/zh/search?keyword={{code}}",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        linkQuery: ".detail>a[href*='v/']",
        titleQuery: ".detail>a[href*='v/']"
      }
    },
    {
      name: SITE_NAMES.BESTJP,
      hostname: "www.bestjavporn.com",
      url: "https://www.bestjavporn.com/search/{{code}}",
      browseUrl: "https://www.bestjavporn.com/search/{{code}}",
      fetchType: "parser",
      strictParser: true,
      cloudflare: {
        useChallengeText: false,
        useHeaders: false,
        useStatus403: false,
        useErrorText: false
      },
      searchParser: (responseText, siteItem, code) => parseBestJp(responseText, siteItem, code)
    },
    {
      name: "Jav.Guru",
      hostname: "jav.guru",
      url: "https://jav.guru/?s={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".imgg>a[href]",
        titleQuery: ".inside-article>.grid1 a[title]"
      }
    },
    {
      name: "JAVMOST",
      hostname: "www.javmost.ws",
      url: "https://www.javmost.ws/search/{{code}}/",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        linkQuery: "#content-update .card > center > a[href*='javmost.ws/']",
        titleQuery: "#content-update .card .card-block > a > h1.card-title"
      }
    },
    {
      name: SITE_NAMES.AVJOY,
      hostname: "avjoy.me",
      url: "https://avjoy.me/search/videos/{{code}}",
      fetchType: "parser",
      domQuery: {
        titleQuery: "#wrapper .row .content-info span.content-title",
        linkQuery: "#wrapper .row a[href^='/video/']"
      }
    },
    {
      name: SITE_NAMES.PAIPANCON,
      hostname: "paipancon.com",
      url: "https://paipancon.com/search/{{code}}",
      fetchType: "parser",
      strictParser: true,
      searchParser: (responseText, siteItem, code) => parsePaipancon(responseText, siteItem, code)
    },
    {
      name: SITE_NAMES.GGJAV,
      hostname: "ggjav.com",
      url: "https://ggjav.com/main/search?string={{code}}",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        titleQuery: "div.item > div.item_title > a.gray_a[href*='/main/video?id=']",
        linkQuery: "div.item > div.item_title > a.gray_a[href*='/main/video?id=']"
      }
    },
    {
      name: SITE_NAMES.HIGHPORN,
      hostname: "highporn.net",
      url: "https://highporn.net/search/videos?search_query={{code}}",
      fetchType: "parser",
      searchParser: (responseText, siteItem, code) =>
        parseHighporn(responseText, siteItem, code, detectCloudflareFromText)
    },
    {
      name: "18av",
      hostname: "18av.mm-cg.com",
      url: "https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".posts h3>a[href]",
        titleQuery: ".posts h3>a[href]"
      }
    },
    {
      name: "ToJAV",
      hostname: "tojav.net",
      url: "https://tojav.net/search/{{code}}",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        linkQuery: ".tray-content .tray-item > a[href]",
        titleQuery: ".tray-content .tray-item .tray-item-title"
      }
    },
    {
      name: SITE_NAMES.JAVTIFUL,
      hostname: "javtiful.com",
      url: "https://javtiful.com/zh/search?q={{code}}",
      fetchType: "parser",
      strictParser: true,
      searchParser: (responseText, siteItem, code) => parseJavtiful(responseText, siteItem, code)
    },
    {
      name: SITE_NAMES.JAVHUB,
      hostname: "javhub.net",
      url: "https://javhub.net/search/{{code}}",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        linkQuery: "a.card-text[href*='play']",
        titleQuery: "a.card-text[href*='play']"
      }
    },
    {
      name: "fcjav",
      hostname: "fcjav.com",
      url: "https://fcjav.com/search/{{code}}",
      fetchType: "parser",
      strictParser: true,
      codeFormatter: (preCode) => preCode.toLowerCase(),
      domQuery: {
        linkQuery: "a.ml-mask.jt[href*='/v/']",
        titleQuery: "a.ml-mask.jt[href*='/v/']"
      }
    },
    {
      name: SITE_NAMES.JAVDB,
      hostname: "javdb.com",
      url: "https://javdb.com/search?q={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".movie-list>.item:first-child>a",
        titleQuery: ".video-title"
      }
    }
  ];

  const directSites: VideoSiteConfig[] = [
    {
      name: "预告播放",
      hostname: "media.javtrailers.com",
      url: "https://media.javtrailers.com/",
      fetchType: "direct",
      hideWhenNoDirectLink: true,
      directLinkResolver: ({ libItem }) => resolveJavTrailersDirectLink(libItem.name),
      inlinePlayerResolver: ({ directLink, CODE }) =>
        mountInlineJavTrailersPlayer(directLink, `${CODE} JavTrailers M3U8`)
    },
    {
      name: SITE_NAMES.JAVLIB,
      hostname: "javlibrary.com",
      url: "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}",
      fetchType: "direct"
    }
  ];

  const specialSites: VideoSiteConfig[] = [
    {
      name: SITE_NAMES.AV01,
      hostname: "www.av01.media",
      url: "https://www.av01.media/api/v1/videos/search?lang=ja",
      browseUrl: "https://www.av01.media/jp/search?q={{code}}",
      fetchType: "parser",
      strictParser: true,
      request: ({ CODE, targetLink }) => ({
        method: "POST",
        url: targetLink,
        headers: AV01_REQUEST_HEADERS,
        data: JSON.stringify({
          query: CODE,
          pagination: { page: 1, limit: 24 }
        })
      }),
      searchParser: (responseText, siteItem, code) => parseAV01(responseText, siteItem, code)
    },
    {
      name: SITE_NAMES.JABLE,
      hostname: "jable.tv",
      url: "https://jable.tv/search/{{code}}/",
      fetchType: "parser",
      codeFormatter: formatJableCode,
      strictParser: true,
      domQuery: {
        linkQuery: "h6.title>a[href*='/videos/']",
        titleQuery: "h6.title>a[href*='/videos/']"
      }
    },
    {
      name: SITE_NAMES.MISSAV,
      hostname: "missav.ws",
      url: "https://missav.ws/{{code}}/",
      fetchType: "get",
      domQuery: {
        subQuery: '.space-y-2 a.text-nord13[href="https://missav.ws/chinese-subtitle"]',
        leakQuery: ".order-first div.rounded-md a[href]:last-child"
      }
    },
    {
      name: SITE_NAMES.SUPJAV,
      hostname: "supjav.com",
      url: "https://supjav.com/zh/?s={{code}}",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        linkQuery: ".posts.clearfix>.post>a.img[title]",
        titleQuery: "h3>a[rel='bookmark'][itemprop='url']"
      }
    },
    {
      name: "javgg",
      hostname: "javgg.net",
      url: "https://javgg.net/?s={{code}}",
      fetchType: "parser",
      strictParser: true,
      request: ({ targetLink }) => ({
        method: "GET",
        url: targetLink,
        headers: JAVGG_REQUEST_HEADERS
      }),
      domQuery: {
        linkQuery: "article .details .title a[href*='/jav/']",
        titleQuery: "article .details .title a[href*='/jav/']"
      }
    },
    {
      name: "7mmtv",
      hostname: "7mmtv.sx",
      url: "https://7mmtv.sx/zh/searchform_search/all/index.html",
      browseUrl: "https://7mmtv.sx/zh/searchall_search/all/{{code}}/1.html",
      fetchType: "parser",
      strictParser: true,
      request: ({ CODE, targetLink }) => ({
        method: "POST",
        url: targetLink,
        headers: SEVEN_MMTV_REQUEST_HEADERS,
        data: `search_keyword=${encodeURIComponent(CODE)}&search_type=searchall&op=search`
      }),
      searchParser: (responseText, siteItem, code) =>
        parseSevenMmtv(responseText, siteItem, code, detectCloudflareFromText)
    }
  ];

  const allSites = [...getSites, ...parserSites, ...directSites, ...specialSites];
  const prioritySiteNames = ["javtrailers", "预告播放"];
  return [
    ...prioritySiteNames.flatMap((name) => allSites.filter((site) => site.name === name)),
    ...allSites.filter((site) => !prioritySiteNames.includes(site.name))
  ];
}

export function getRequestHeaders(siteItem: VideoSiteConfig) {
  if (siteItem.name === SITE_NAMES.JABLE) return undefined;
  if (siteItem.name === SITE_NAMES.SUPJAV) return SUPJAV_REQUEST_HEADERS;
  if (siteItem.name === SITE_NAMES.AV01) return AV01_REQUEST_HEADERS;
  if (siteItem.name === SITE_NAMES.BESTJP) return BESTJP_REQUEST_HEADERS;
  return undefined;
}

export function getRequestConfig(
  siteItem: VideoSiteConfig,
  targetLink: string,
  CODE: string
): RequestConfig {
  if (typeof siteItem.request === "function") {
    return siteItem.request({ siteItem, targetLink, CODE });
  }

  return {
    method: "GET",
    url: targetLink,
    headers: siteItem.name === SITE_NAMES.JABLE ? undefined : getRequestHeaders(siteItem)
  };
}

export function normalizeVideoSiteConfig(site: VideoSiteConfig): VideoSiteConfig {
  return {
    strictParser: false,
    domQuery: {},
    codeFormatter: null,
    directLinkResolver: null,
    inlinePlayerResolver: null,
    hideWhenNoDirectLink: false,
    cloudflare: {},
    browseUrl: null,
    searchParser: null,
    request: null,
    ...site
  };
}
