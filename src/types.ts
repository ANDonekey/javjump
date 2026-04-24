export type FetchType = "get" | "parser" | "direct";

export interface LibSiteQueries {
  panelQueryStr: string;
  codeQueryStr: string;
}

export interface LibSiteConfig {
  name: string;
  enable?: boolean;
  identifier: string;
  queries: LibSiteQueries;
  resolve?: (() => boolean) | null;
  getCode?: (() => string) | null;
  method: () => void;
}

export interface VideoSiteDomQuery {
  videoQuery?: string;
  subQuery?: string;
  leakQuery?: string;
  linkQuery?: string;
  titleQuery?: string;
  listIndex?: number;
}

export interface CloudflarePolicy {
  useChallengeText?: boolean;
  useHeaders?: boolean;
  useStatus403?: boolean;
  useErrorText?: boolean;
  forceStatus?: boolean;
}

export interface SearchParseResult {
  isSuccess: boolean;
  isCloudflare: boolean;
  isNotFound?: boolean;
  hasContent?: boolean;
  resultLink?: string;
  multipleRes?: boolean;
  tag?: string;
}

export interface RequestConfig {
  method?: "GET" | "POST";
  url: string;
  headers?: Record<string, string>;
  data?: string;
}

export interface VideoSiteConfig {
  name: string;
  hostname: string;
  url: string;
  fetchType: FetchType;
  strictParser?: boolean;
  domQuery?: VideoSiteDomQuery;
  codeFormatter?: ((code: string) => string) | null;
  directLinkResolver?: ((args: SiteResolverArgs) => string) | null;
  inlinePlayerResolver?:
    | ((args: SiteResolverArgs & { directLink: string }) => void | Promise<void | boolean>)
    | null;
  hideWhenNoDirectLink?: boolean;
  cloudflare?: CloudflarePolicy;
  browseUrl?: string | null;
  searchParser?: ((responseText: string, siteItem: VideoSiteConfig, code: string) => SearchParseResult) | null;
  request?: ((args: { siteItem: VideoSiteConfig; targetLink: string; CODE: string }) => RequestConfig) | null;
}

export interface SiteResolverArgs {
  libItem: LibSiteConfig;
  CODE: string;
  formatCode: string;
}

export interface GmResponse {
  status: number;
  statusText?: string;
  responseText?: string;
  responseHeaders?: string;
  finalUrl?: string;
  responseURL?: string;
  response?: ArrayBuffer | string;
  loaded?: number;
}

export interface Av01VideoItem {
  id?: number | string;
  dvd_id?: string;
  dmm_id?: string;
}

export interface FetchResult {
  isSuccess: boolean;
  isCloudflare: boolean;
  isNotFound?: boolean;
  hasContent?: boolean;
  resultLink: string;
  multipleRes?: boolean;
  tag?: string;
}
