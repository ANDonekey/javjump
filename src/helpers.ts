import {
  DMM_CID_REGEX,
  JMVBT_CODE_REGEX,
  SP_PREFIX,
  VIDEO_CODE_REGEX
} from "@/constants";
import type { LibSiteConfig } from "@/types";

export function normalizeCode(str?: string | null) {
  if (!str) return "";
  return str.toLowerCase().replace(/[\s_-]+/g, "");
}

export function extractVideoCode(text?: string | null) {
  const trimmedText = (text || "").trim();
  return trimmedText.match(VIDEO_CODE_REGEX)?.[0] || trimmedText;
}

export function extractNodeCode(node?: Element | null) {
  if (!node) return "";

  const attrTexts = [
    node.textContent,
    (node as HTMLElement).innerText,
    node.getAttribute?.("title"),
    node.getAttribute?.("alt"),
    node.getAttribute?.("aria-label")
  ].filter(Boolean) as string[];

  for (const text of attrTexts) {
    const code = extractVideoCode(text);
    if (normalizeCode(code)) return code;
  }

  const hrefCode = extractVideoCode(node.getAttribute?.("href") || "");
  if (normalizeCode(hrefCode)) {
    return hrefCode;
  }

  return extractVideoCode(node.outerHTML || "");
}

export function formatJableCode(preCode: string) {
  return extractVideoCode(preCode).replace(/[\s_]+/g, "-").toUpperCase();
}

export function createHiddenCodeNode(codeText: string) {
  let hiddenEl = document.querySelector<HTMLElement>("[data-jav-code]");
  if (!hiddenEl) {
    hiddenEl = document.createElement("span");
    hiddenEl.style.display = "none";
    document.body.appendChild(hiddenEl);
  }
  hiddenEl.setAttribute("data-jav-code", codeText);
}

export function extractJmvbtCode() {
  const codeElements = document.querySelectorAll("strong, b, td, span, div");
  for (const element of codeElements) {
    const text = element.textContent || (element as HTMLElement).innerText || "";
    if ((text.includes("番号") || text.includes("番號")) && text.match(JMVBT_CODE_REGEX)) {
      return text.match(JMVBT_CODE_REGEX)?.[1] || "";
    }
  }

  const pageText = document.body.innerText || document.body.textContent || "";
  return pageText.match(JMVBT_CODE_REGEX)?.[1] || "";
}

export function initJmvbtPage() {
  const infoPanel = document.querySelector("#info");
  infoPanel?.classList.add("jmvbt-panel");

  const codeText = extractJmvbtCode();
  if (codeText) {
    createHiddenCodeNode(codeText);
  }
}

export function extractJmvbtDmmCid() {
  const iframeSrc =
    document
      .querySelector("#Preview_vedio_box iframe[src*='dmm.co.jp'][src*='cid=']")
      ?.getAttribute("src") || "";
  return iframeSrc.match(DMM_CID_REGEX)?.[1]?.toLowerCase() || "";
}

export function buildJavTrailersM3u8Url(cid?: string | null) {
  const normalizedCid = (cid || "").trim().toLowerCase();
  if (!normalizedCid || normalizedCid.length < 3) return "";
  return `https://media.javtrailers.com/hlsvideo/freepv/${normalizedCid[0]}/${normalizedCid.slice(
    0,
    3
  )}/${normalizedCid}/playlist.m3u8`;
}

export function isJmvbtPage() {
  const url = window.location.href;
  return (
    window.location.hostname.includes("jmvbt") &&
    (url.includes("/content_uncensored/") || url.includes("/content_censored/")) &&
    url.endsWith(".htm")
  );
}

export function getCode(libItem: LibSiteConfig) {
  const codeNode = document.querySelector<HTMLElement>(libItem.queries.codeQueryStr);
  if (!codeNode) return "";

  const codeText =
    libItem.name === "javdb"
      ? codeNode.dataset.clipboardText || ""
      : (codeNode.innerText || "").replace("复制", "");

  if (codeText.includes("FC2")) return codeText.split("-")[1];
  if (codeText.startsWith(SP_PREFIX)) return codeText.substring(3);
  return codeText;
}

export function resolveCode(libItem: LibSiteConfig) {
  if (typeof libItem.getCode === "function") {
    const specialCode = libItem.getCode();
    if (specialCode) return specialCode;
  }
  return getCode(libItem);
}

const regEnum = {
  subtitle: /(中文|字幕|subtitle)/,
  leakage: /(无码|無碼|泄漏|泄露|Uncensored)/
};

export function tagsQuery({
  leakageText,
  subtitleText
}: {
  leakageText: string;
  subtitleText: string;
}) {
  const tags: string[] = [];
  if (regEnum.leakage.test(leakageText)) tags.push("无码");
  if (regEnum.subtitle.test(subtitleText)) tags.push("字幕");
  return tags.join(" ");
}
