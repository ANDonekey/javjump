interface GmRequestHandle {
  abort?: () => void;
}

interface GmXmlHttpRequestResponse {
  status: number;
  statusText?: string;
  responseText?: string;
  responseHeaders?: string;
  finalUrl?: string;
  responseURL?: string;
  response?: ArrayBuffer | string;
  loaded?: number;
}

interface HlsLoaderConfig {
  loader: new (config: unknown) => unknown;
}

interface HlsErrorData {
  fatal?: boolean;
  details?: string;
  type?: string;
}

interface HlsInstance {
  loadSource(url: string): void;
  attachMedia(media: HTMLMediaElement): void;
  on(event: string, handler: (event: unknown, data: HlsErrorData) => void): void;
}

interface HlsStatic {
  new (config: HlsLoaderConfig): HlsInstance;
  isSupported(): boolean;
  Events: {
    ERROR: string;
  };
}

declare global {
  function GM_addStyle(css: string): void;
  function GM_getValue<T>(key: string, defaultValue?: T): T;
  function GM_setValue<T>(key: string, value: T): void;
  function GM_xmlhttpRequest(details: {
    method?: string;
    url: string;
    headers?: Record<string, string>;
    data?: string;
    responseType?: "text" | "arraybuffer";
    onload?: (response: GmXmlHttpRequestResponse) => void;
    onerror?: (error: GmXmlHttpRequestResponse) => void;
    ontimeout?: () => void;
  }): GmRequestHandle | void;

  interface Window {
    Hls?: HlsStatic;
    __javJumpHlsPromise?: Promise<HlsStatic | undefined>;
  }
}

export {};
