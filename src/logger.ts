import { gm } from "@/gm";
import type { GmResponse, VideoSiteConfig } from "@/types";

const DEBUG_LOG_KEY = "debugLogs";
const DEBUG_RESPONSE_LIMIT = 20;

let debugLogsEnabled = gm.getValue(DEBUG_LOG_KEY, false);

function getDebugWindow() {
  if (!__DEBUG_TO_PAGE__) {
    return undefined;
  }
  if (typeof unsafeWindow !== "undefined" && unsafeWindow) {
    return unsafeWindow;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  return undefined;
}

export function setDebugLogsEnabled(enabled: boolean) {
  debugLogsEnabled = enabled;
  gm.setValue(DEBUG_LOG_KEY, enabled);

  const debugWindow = getDebugWindow();
  if (!enabled && debugWindow) {
    delete debugWindow.__javJumpDebug;
  }
}

export function getDebugLogsEnabled() {
  return debugLogsEnabled;
}

function debugLog(scope: string, payload: unknown) {
  if (!debugLogsEnabled) return;
  console.log(`[JAVJump][${scope}]`, payload);
}

function getDebugResponseKey(siteItem: VideoSiteConfig | undefined, code: string, targetLink: string) {
  return `${siteItem?.name || "unknown"}:${code}:${targetLink}`;
}

function createDebugStore(lastResponse: {
  key: string;
  site: string;
  code: string;
  targetLink: string;
  fetchedAt: string;
  status: number;
  finalUrl: string;
  headers: string;
  html: string;
}) {
  const debugStore = {
    keys: [] as string[],
    responses: {} as Record<string, typeof lastResponse>,
    lastResponse,
    listSites: () => Array.from(new Set(Object.values(debugStore.responses).map((item) => item.site))),
    getEntry: (key: string) => debugStore.responses[key] || null,
    getSite: (site: string) => Object.values(debugStore.responses).filter((item) => item.site === site),
    getLatestSite: (site: string) => {
      const matchedEntries = debugStore.getSite(site);
      return matchedEntries.length > 0 ? matchedEntries[matchedEntries.length - 1] : null;
    },
    getSiteHtml: (site: string) => debugStore.getLatestSite(site)?.html || ""
  };

  return debugStore;
}

function pushDebugResponse(
  siteItem: VideoSiteConfig | undefined,
  payload: { code: string; targetLink: string; response: GmResponse }
) {
  const debugWindow = getDebugWindow();
  if (!debugLogsEnabled || !debugWindow) return null;

  const responseText = payload.response.responseText || "";
  const responseHeaders = payload.response.responseHeaders || "";
  const key = getDebugResponseKey(siteItem, payload.code, payload.targetLink);
  const entry = {
    key,
    site: siteItem?.name || "unknown",
    code: payload.code,
    targetLink: payload.targetLink,
    fetchedAt: new Date().toISOString(),
    status: payload.response.status,
    finalUrl: payload.response.finalUrl || payload.response.responseURL || payload.targetLink,
    headers: responseHeaders,
    html: responseText
  };

  const debugStore = debugWindow.__javJumpDebug || createDebugStore(entry);

  const keys = debugStore.keys.filter((item) => item !== key);
  keys.push(key);

  while (keys.length > DEBUG_RESPONSE_LIMIT) {
    const removedKey = keys.shift();
    if (removedKey) {
      delete debugStore.responses[removedKey];
    }
  }

  debugStore.keys = keys;
  debugStore.responses[key] = entry;
  debugStore.lastResponse = entry;
  debugWindow.__javJumpDebug = debugStore;

  return {
    key,
    htmlLength: responseText.length,
    consoleHint: [
      `window.__javJumpDebug.lastResponse.html`,
      `window.__javJumpDebug.responses[${JSON.stringify(key)}].html`,
      `copy(window.__javJumpDebug.lastResponse.html)`
    ]
  };
}

function getDebugScope(siteItem: VideoSiteConfig | undefined, stage: string) {
  return `${siteItem?.name || "unknown"}:${stage}`;
}

function logSiteDebug(siteItem: VideoSiteConfig | undefined, stage: string, payload: unknown) {
  debugLog(getDebugScope(siteItem, stage), payload);
}

export function summarizeResponse(response?: GmResponse | null) {
  if (!response) return null;
  const responseText = response.responseText || "";
  const responseHeaders = (response.responseHeaders || "").toLowerCase();

  return {
    status: response.status,
    finalUrl: response.finalUrl || response.responseURL || "",
    length: responseText.length,
    preview: responseText.slice(0, 200),
    headers: (response.responseHeaders || "").slice(0, 500),
    cloudflareSignals: {
      hasCfMitigated: responseHeaders.includes("cf-mitigated"),
      hasCloudflareServer: responseHeaders.includes("server:cloudflare"),
      hasCfRay: responseHeaders.includes("cf-ray")
    }
  };
}

export function logSiteRequest(
  siteItem: VideoSiteConfig,
  payload: { code: string; targetLink: string; requestConfig: { method?: string; url: string; headers?: object; data?: unknown } }
) {
  logSiteDebug(siteItem, "request", {
    code: payload.code,
    targetLink: payload.targetLink,
    requestConfig: {
      method: payload.requestConfig.method,
      url: payload.requestConfig.url,
      headers: payload.requestConfig.headers || {},
      hasData: !!payload.requestConfig.data
    }
  });
}

export function logSiteResponse(siteItem: VideoSiteConfig, payload: { code: string; targetLink: string; response: GmResponse }) {
  const debugDump = pushDebugResponse(siteItem, payload);
  logSiteDebug(siteItem, "response", {
    code: payload.code,
    targetLink: payload.targetLink,
    response: summarizeResponse(payload.response),
    debugDump
  });
}

export function logSiteResult(siteItem: VideoSiteConfig, payload: unknown) {
  logSiteDebug(siteItem, "result", payload);
}

export function logSiteError(siteItem: VideoSiteConfig, payload: unknown) {
  logSiteDebug(siteItem, "error", payload);
}

export function logVideoPageDebug(siteItem: VideoSiteConfig, payload: unknown) {
  logSiteDebug(siteItem, "videoPage", payload);
}

export function logSearchPageDebug(siteItem: VideoSiteConfig, payload: unknown) {
  logSiteDebug(siteItem, "searchPage", payload);
}

export function logSiteSignals(siteItem: VideoSiteConfig, signalName: string, payload: unknown) {
  logSiteDebug(siteItem, signalName, payload);
}
