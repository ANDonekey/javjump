import { extractJmvbtDmmCid, buildJavTrailersM3u8Url } from "@/helpers";
import type { GmResponse } from "@/types";

type HlsRequestHandle = { abort?: () => void } | void;

type HlsNetworkResponse = GmResponse;

interface HlsErrorData {
  fatal?: boolean;
  details?: string;
  type?: string;
}

interface HlsLoaderStats {
  aborted: boolean;
  loaded: number;
  retry: number;
  total: number;
  chunkCount: number;
  bwEstimate: number;
  loading: { start: number; first: number; end: number };
  parsing: { start: number; end: number };
  buffering: { start: number; first: number; end: number };
  trequest: number;
  tfirst: number;
  tload: number;
}

interface HlsLoaderContext {
  url: string;
  headers?: Record<string, string>;
  responseType?: "text" | "arraybuffer";
  type?: string;
  rangeStart?: number;
  rangeEnd?: number;
}

interface HlsLoaderCallbacks {
  onTimeout: (stats: HlsLoaderStats, context: HlsLoaderContext, response: null) => void;
  onError: (
    error: { code: number; text: string },
    context: HlsLoaderContext,
    response: HlsNetworkResponse,
    stats: HlsLoaderStats
  ) => void;
  onSuccess: (
    response: { url: string; data: ArrayBuffer | string | undefined; code: number },
    stats: HlsLoaderStats,
    context: HlsLoaderContext,
    networkDetails: HlsNetworkResponse
  ) => void;
}

export function canUseNativeHls() {
  const ua = navigator.userAgent || "";
  return /Safari/i.test(ua) && !/Chrome|Chromium|Firefox|Edg/i.test(ua);
}

export function ensureHlsScript() {
  if (window.Hls) return Promise.resolve(window.Hls);
  if (window.__javJumpHlsPromise) return window.__javJumpHlsPromise;

  window.__javJumpHlsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/hls.js@1.5.18/dist/hls.min.js";
    script.onload = () => resolve(window.Hls);
    script.onerror = () => reject(new Error("加载 hls.js 失败"));
    document.head.appendChild(script);
  });

  return window.__javJumpHlsPromise;
}

class GmHlsLoader {
  config: unknown;
  request: HlsRequestHandle | null = null;
  stats: HlsLoaderStats;
  context: HlsLoaderContext | null = null;
  callbacks: HlsLoaderCallbacks | null = null;

  constructor(config: unknown) {
    this.config = config;
    this.stats = this.createStats();
  }

  createStats(): HlsLoaderStats {
    const now = performance.now();
    return {
      aborted: false,
      loaded: 0,
      retry: 0,
      total: 0,
      chunkCount: 0,
      bwEstimate: 0,
      loading: { start: now, first: 0, end: 0 },
      parsing: { start: 0, end: 0 },
      buffering: { start: 0, first: 0, end: 0 },
      trequest: now,
      tfirst: 0,
      tload: 0
    };
  }

  resetStats() {
    this.stats = this.createStats();
  }

  destroy() {
    this.abort();
    this.callbacks = null;
    this.context = null;
  }

  abort() {
    if (this.request && typeof this.request.abort === "function") {
      this.request.abort();
    }
    this.stats.aborted = true;
    this.request = null;
  }

  load(context: HlsLoaderContext, _config: unknown, callbacks: HlsLoaderCallbacks) {
    this.context = context;
    this.callbacks = callbacks;
    this.resetStats();

    const isBinaryRequest =
      context.responseType === "arraybuffer" ||
      context.type === "fragment" ||
      context.type === "key";
    const headers = { ...(context.headers || {}) };

    const { rangeStart, rangeEnd } = context;
    if (
      typeof rangeStart === "number" &&
      Number.isFinite(rangeStart) &&
      typeof rangeEnd === "number" &&
      Number.isFinite(rangeEnd)
    ) {
      headers.Range = `bytes=${rangeStart}-${rangeEnd - 1}`;
    } else if (typeof rangeStart === "number" && Number.isFinite(rangeStart)) {
      headers.Range = `bytes=${rangeStart}-`;
    }

    this.request = GM_xmlhttpRequest({
      method: "GET",
      url: context.url,
      headers,
      responseType: isBinaryRequest ? "arraybuffer" : "text",
      ontimeout: () => {
        this.stats.tload = performance.now();
        this.stats.loading.end = this.stats.tload;
        callbacks.onTimeout(this.stats, context, null);
      },
      onerror: (response) => {
        this.stats.tload = performance.now();
        this.stats.loading.end = this.stats.tload;
        callbacks.onError(
          { code: response.status || 0, text: response.statusText || "GM_xmlhttpRequest error" },
          context,
          response,
          this.stats
        );
      },
      onload: (response) => {
        const ok = response.status >= 200 && response.status < 300;
        this.stats.tload = performance.now();
        this.stats.tfirst = this.stats.tfirst || this.stats.tload;
        this.stats.loading.first = this.stats.loading.first || this.stats.tfirst;
        this.stats.loading.end = this.stats.tload;
        this.stats.parsing.start = this.stats.tload;
        this.stats.parsing.end = this.stats.tload;
        this.stats.loaded =
          response.loaded ||
          this.stats.loaded ||
          (response.response instanceof ArrayBuffer ? response.response.byteLength : 0);
        this.stats.total = this.stats.total || this.stats.loaded;

        if (!ok) {
          callbacks.onError(
            { code: response.status, text: response.statusText || "HTTP error" },
            context,
            response,
            this.stats
          );
          return;
        }

        callbacks.onSuccess(
          {
            url: response.finalUrl || response.responseURL || context.url,
            data: isBinaryRequest ? response.response : response.responseText,
            code: response.status
          },
          this.stats,
          context,
          response
        );
      }
    });
  }
}

export async function mountInlineJavTrailersPlayer(
  m3u8Url: string,
  title = "JavTrailers M3U8"
) {
  const host = document.querySelector<HTMLElement>("#Preview_vedio_box");
  if (!host || !m3u8Url) return false;

  host.replaceChildren();

  const shell = document.createElement("div");
  shell.style.cssText =
    "width:644px;max-width:100%;background:#111;border-radius:10px;padding:12px;box-sizing:border-box;color:#f5f7fa;";

  const videoEl = document.createElement("video");
  videoEl.controls = true;
  videoEl.autoplay = true;
  videoEl.playsInline = true;
  videoEl.title = title;
  videoEl.style.cssText =
    "width:100%;max-width:100%;height:auto;min-height:360px;background:#000;border-radius:8px;display:block;";

  const errorEl = document.createElement("div");
  errorEl.style.cssText =
    "margin-top:10px;color:#ff9b9b;font-size:13px;white-space:pre-wrap;";

  shell.append(videoEl, errorEl);
  host.appendChild(shell);

  const showError = (message: string) => {
    errorEl.textContent = message;
  };

  try {
    const Hls = await ensureHlsScript().catch(() => null);
    if (Hls && Hls.isSupported()) {
      const hls = new Hls({ loader: GmHlsLoader });
      hls.loadSource(m3u8Url);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.ERROR, (_event: unknown, data: HlsErrorData) => {
        if (data?.fatal) {
          showError(`播放器加载失败: ${data.details || data.type || "unknown"}`);
        }
      });
    } else if (canUseNativeHls() && videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = m3u8Url;
    } else {
      showError("当前浏览器不支持直接播放 HLS，或 hls.js 加载失败。");
      return true;
    }

    videoEl.play().catch(() => {});
  } catch (error) {
    showError(error instanceof Error ? error.message : "播放器加载失败");
  }

  return true;
}

export function resolveJavTrailersDirectLink(libItemName: string) {
  if (libItemName !== "jmvbt") return "";
  const cid = extractJmvbtDmmCid();
  return buildJavTrailersM3u8Url(cid);
}
