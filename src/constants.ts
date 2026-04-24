export const SP_PREFIX = "300";
export const VIDEO_CODE_REGEX = /[a-zA-Z]{2,10}[\s_-]*\d{2,6}/;
export const JMVBT_CODE_REGEX = /\b([A-Z]{2,5}-\d{3,5})\b/;
export const DMM_CID_REGEX = /\/cid=([^/]+)\//i;

export const SITE_NAMES = {
  AV01: "AV01",
  AVJOY: "AvJoy",
  BESTJP: "BestJP",
  EVOJAV: "evojav",
  GGJAV: "GGJAV",
  HAYAV: "HAYAV",
  HIGHPORN: "highporn",
  JAVBUS: "JavBus",
  JAVDB: "JavDB",
  JAVTIFUL: "Javtiful",
  JAVHUB: "javhub",
  JABLE: "Jable",
  JAVLIB: "JAVLib",
  JAVMENU: "JAVMENU",
  MISSAV: "MISSAV",
  ONE_TWO_THREE_AV: "123av",
  PAIPANCON: "paipancon",
  SUPJAV: "Supjav"
} as const;

export const JABLE_INFO_SELECTOR =
  ".info-header, .video-info, .video-title, .video-detail, .video-meta";

export const JABLE_PLAYER_SELECTOR = [
  "video",
  "iframe[src*='player']",
  "iframe[src*='embed']",
  ".video-player",
  ".player-wrapper",
  ".jwplayer",
  ".plyr",
  "[class*='player']",
  "[id*='player']"
].join(", ");

export const HAYAV_PLAYER_SELECTOR = [
  "video",
  "source[src]",
  "iframe[src]",
  "[class*='player']",
  "[id*='player']",
  "[data-plyr-provider]",
  "script[src*='player']"
].join(", ");

export const MISSAV_PLAYER_SELECTOR = [
  "video",
  "source[src]",
  "iframe[src*='embed']",
  "iframe[src*='player']",
  "[class*='player']",
  "[id*='player']",
  "[data-plyr-provider]",
  "script[src*='player']"
].join(", ");

export const JABLE_REQUEST_HEADERS = {
  Referer: "https://jable.tv/",
  Origin: "https://jable.tv",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
};

export const SUPJAV_REQUEST_HEADERS = {
  Referer: "https://supjav.com/",
  Origin: "https://supjav.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
};

export const BESTJP_REQUEST_HEADERS = {
  Referer: "https://www.bestjavporn.com/",
  Origin: "https://www.bestjavporn.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
};

export const AV01_REQUEST_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json, text/plain, */*",
  Origin: "https://www.av01.media",
  Referer: "https://www.av01.media/jp/search"
};

export const SEVEN_MMTV_REQUEST_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  Origin: "https://7mmtv.sx",
  Referer: "https://7mmtv.sx/zh/searchform_search/all/index.html"
};

export const JAVGG_REQUEST_HEADERS = {
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  Referer: "https://javgg.net/",
  "Upgrade-Insecure-Requests": "1"
};

export const DEFAULT_DISABLED_SITES: string[] = [
  SITE_NAMES.AVJOY,
  SITE_NAMES.PAIPANCON,
  SITE_NAMES.GGJAV,
  SITE_NAMES.AV01,
  SITE_NAMES.HIGHPORN,
  SITE_NAMES.EVOJAV,
  SITE_NAMES.HAYAV,
  SITE_NAMES.JAVBUS,
  SITE_NAMES.JAVDB,
  SITE_NAMES.JAVLIB,
  SITE_NAMES.MISSAV,
  SITE_NAMES.ONE_TWO_THREE_AV,
  SITE_NAMES.JAVHUB,
  SITE_NAMES.JAVMENU
];
