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
  const __DEBUG_TO_PAGE__: boolean;

  interface JavJumpDebugResponseEntry {
    key: string;
    site: string;
    code: string;
    targetLink: string;
    fetchedAt: string;
    status: number;
    finalUrl: string;
    headers: string;
    html: string;
  }

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
    __javJumpDebug?: {
      keys: string[];
      responses: Record<string, JavJumpDebugResponseEntry>;
      lastResponse: JavJumpDebugResponseEntry;
      listSites: () => string[];
      getEntry: (key: string) => JavJumpDebugResponseEntry | null;
      getSite: (site: string) => JavJumpDebugResponseEntry[];
      getLatestSite: (site: string) => JavJumpDebugResponseEntry | null;
      getSiteHtml: (site: string) => string;
    };
  }

  const unsafeWindow: Window | undefined;
}

export {};
