import { gm } from "@/gm";
import type { GmResponse, VideoSiteConfig } from "@/types";

const DEBUG_LOG_KEY = "debugLogs";

let debugLogsEnabled = gm.getValue(DEBUG_LOG_KEY, false);

export function setDebugLogsEnabled(enabled: boolean) {
  debugLogsEnabled = enabled;
  gm.setValue(DEBUG_LOG_KEY, enabled);
}

export function getDebugLogsEnabled() {
  return debugLogsEnabled;
}

function debugLog(scope: string, payload: unknown) {
  if (!debugLogsEnabled) return;
  console.log(`[JAVJump][${scope}]`, payload);
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
  logSiteDebug(siteItem, "response", {
    code: payload.code,
    targetLink: payload.targetLink,
    response: summarizeResponse(payload.response)
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
