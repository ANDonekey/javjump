// ==UserScript==
// @name         JAV 添加跳转在线观看
// @namespace    https://github.com/ANDonekey/javjump
// @version      1.0
// @author       ANDonekey
// @description  为 JavDB、JavBus、JavLibrary、JMVBT 等站点添加跳转在线观看的链接
// @license      MIT
// @icon         https://javdb.com/favicon-32x32.png
// @homepageURL  https://github.com/ANDonekey/javjump
// @supportURL   https://github.com/ANDonekey/javjump/issues
// @include      /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/
// @include      /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/
// @include      /^https?:\/\/(\w*\.)?javlibrary\.com.*$/
// @include      /^http.*\/cn\/\?v=jav.*$/
// @include      /^https?:\/\/(\w*\.)?jmvbt\.com\/content_(uncensored|censored)\/.*\.htm$/
// @match        *://*.app.javdb457.com/*
// @match        *://*.javdb457.com/*
// @match        *://*.javdb.com/*
// @match        *://*.v90f.com/*
// @match        *://*.jmvbt.com/content_uncensored/*.htm
// @match        *://*.jmvbt.com/content_censored/*.htm
// @require      https://update.greasyfork.org/scripts/522123/1511104/tampermonkey%20parallel.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.25.4/dist/preact.min.js
// @connect      dmm.co.jp
// @connect      jable.tv
// @connect      missav.ws
// @connect      123av.com
// @connect      supjav.com
// @connect      www.bestjavporn.com
// @connect      javmenu.com
// @connect      jav.guru
// @connect      www.javmost.ws
// @connect      hayav.com
// @connect      avjoy.me
// @connect      paipancon.com
// @connect      ggjav.com
// @connect      www.av01.media
// @connect      highporn.net
// @connect      evojav.pro
// @connect      18av.mm-cg.com
// @connect      javhub.net
// @connect      javgg.net
// @connect      7mmtv.sx
// @connect      fcjav.com
// @connect      javbus.com
// @connect      javdb.com
// @connect      javlibrary.com
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @downloadURL  https://raw.githubusercontent.com/ANDonekey/javjump/main/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B.user.js
// @updateURL    https://raw.githubusercontent.com/ANDonekey/javjump/main/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B.meta.js
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const e=document.createElement("style");e.textContent=o,document.head.append(e)})(' .jop-list{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;gap:10px;width:100%;height:100%;z-index:1;transition:right .2s ease-in-out;color:#000}.jop-button,.jop-button_def{position:relative;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:3px 10px;border-radius:4px;font-weight:500;font-size:14px;border:1px solid #dcdfe6;color:#606266;cursor:pointer}.jop-button_def{margin:10px 0;width:100px}.jop-button:visited{color:#606266}.jop-button:hover{text-decoration:none;color:#409eff;border:1px solid #c6e2ff;background-color:#ecf5ff}.jop-button_label{position:absolute;font-size:10px;padding:4px;border-radius:4px;top:-13px;right:-10px;line-height:.75;color:#67c23a;border:1px solid #e1f3d8;background:#fff}.jop-button_green{color:#fff!important;background-color:#67c23a}.jop-button_green:hover{color:#fff!important;background-color:#95d475}.jop-button_red{color:#fff!important;background-color:#f56c6c}.jop-button_red:hover{color:#fff!important;background-color:#f89898}.jop-button_yellow{color:#fff!important;background-color:#e6a23c}.jop-button_yellow:hover{color:#fff!important;background-color:#ebb563}.jop-loading{display:inline-block;width:14px;height:14px;margin-right:10px;border:2px dashed #dcdfe6;border-top-color:transparent;border-radius:100%;animation:btnLoading infinite 1s linear}@keyframes btnLoading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.jop-tag{padding:3px 6px;color:#409eff!important;background:#ecf5ff;border:1px solid #d9ecff;border-radius:4px}.jop-setting{margin-top:20px}.jop-setting-list{display:flex;flex-wrap:wrap}.jop-setting-title{margin:10px 0 5px;font-weight:700}.jop-setting-item{display:flex;height:20px;align-items:center;margin-right:15px;-webkit-user-select:none;user-select:none;cursor:pointer}.db-panel .movie-panel-info div.panel-block{padding:5.5px 12px}.db-panel .jop-app{padding:15px 12px}.lib-panel .jop-app{padding:20px 30px;margin-top:10px}.infobox.jop-infobox{line-height:1.5!important;margin:0!important;padding:0!important}.infobox.jop-infobox .jop-app{display:inline;padding:0;margin:0;box-sizing:border-box;line-height:1.5}.infobox.jop-infobox .jop-list{display:inline;box-sizing:border-box;margin:0;padding:0;line-height:1.5}.infobox.jop-infobox .jop-button{display:inline-block;white-space:nowrap;margin:0 6px 0 0;vertical-align:baseline;line-height:1.5}input[type=checkbox],input[type=radio]{margin:0 0 0 5px;cursor:pointer}.jop-tooltip-container{position:relative;display:inline-block}.jop-tooltip{position:absolute;bottom:100%;left:50%;transform:translate(-50%);background-color:#333;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;white-space:nowrap;z-index:1000}.jop-setting-label{cursor:pointer}.jop-checkbox{display:inline-flex;align-items:center;cursor:pointer;margin-right:15px;-webkit-user-select:none;user-select:none}.jop-checkbox-input{position:absolute;opacity:0;cursor:pointer}.jop-checkbox-custom{position:relative;display:inline-block;width:16px;height:16px;background-color:#fff;border:1px solid #dcdfe6;border-radius:2px;transition:all .3s}.jop-checkbox-input:checked+.jop-checkbox-custom{background-color:#409eff;border-color:#409eff}.jop-checkbox-input:checked+.jop-checkbox-custom:after{content:"";position:absolute;top:1px;left:4px;width:5px;height:10px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.jop-checkbox-label{margin-left:3px;font-size:14px;color:#606266}.jop-checkbox:hover .jop-checkbox-custom{border-color:#409eff} ');

(function (preact) {
  'use strict';

  var f$1 = 0;
  function u$1(e2, t2, n, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(l2), l2;
  }
  const SP_PREFIX = "300";
  const VIDEO_CODE_REGEX = /[a-zA-Z]{2,10}[\s_-]*\d{2,6}/;
  const JMVBT_CODE_REGEX = /\b([A-Z]{2,5}-\d{3,5})\b/;
  const JABLE_INFO_SELECTOR = ".info-header, .video-info, .video-title, .video-detail, .video-meta";
  const JABLE_PLAYER_SELECTOR = [
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
  const JABLE_REQUEST_HEADERS = {
    "Referer": "https://jable.tv/",
    "Origin": "https://jable.tv",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
  };
  const SUPJAV_REQUEST_HEADERS = {
    "Referer": "https://supjav.com/",
    "Origin": "https://supjav.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
  };
  const BESTJP_REQUEST_HEADERS = {
    "Referer": "https://www.bestjavporn.com/",
    "Origin": "https://www.bestjavporn.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
  };
  const AV01_REQUEST_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/plain, */*",
    "Origin": "https://www.av01.media",
    "Referer": "https://www.av01.media/jp/search"
  };
  const SEVEN_MMTV_REQUEST_HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Origin": "https://7mmtv.sx",
    "Referer": "https://7mmtv.sx/zh/searchform_search/all/index.html"
  };
  const JAVGG_REQUEST_HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://javgg.net/",
    "Upgrade-Insecure-Requests": "1"
  };
  const normalizeCode = (str) => {
    if (!str) return "";
    return str.toLowerCase().replace(/[\s_-]+/g, "");
  };
  const extractVideoCode = (text) => {
    const trimmedText = (text || "").trim();
    return trimmedText.match(VIDEO_CODE_REGEX)?.[0] || trimmedText;
  };
  const extractNodeCode = (node) => {
    if (!node) return "";
    const attrTexts = [
      node.textContent,
      node.innerText,
      typeof node.getAttribute === "function" ? node.getAttribute("title") : "",
      typeof node.getAttribute === "function" ? node.getAttribute("alt") : "",
      typeof node.getAttribute === "function" ? node.getAttribute("aria-label") : ""
    ].filter(Boolean);
    for (const text of attrTexts) {
      const code = extractVideoCode(text);
      if (normalizeCode(code)) return code;
    }
    if (typeof node.getAttribute === "function") {
      const href = node.getAttribute("href") || "";
      const hrefCode = extractVideoCode(href);
      if (normalizeCode(hrefCode)) return hrefCode;
    }
    return extractVideoCode(node.outerHTML || "");
  };
  const formatJableCode = (preCode) => extractVideoCode(preCode).replace(/[\s_]+/g, "-").toUpperCase();
  const createHiddenCodeNode = (codeText) => {
    let hiddenEl = document.querySelector("[data-jav-code]");
    if (!hiddenEl) {
      hiddenEl = document.createElement("span");
      hiddenEl.style.display = "none";
      document.body.appendChild(hiddenEl);
    }
    hiddenEl.setAttribute("data-jav-code", codeText);
  };
  const extractJmvbtCode = () => {
    const codeElements = document.querySelectorAll("strong, b, td, span, div");
    for (const el of codeElements) {
      const text = el.textContent || el.innerText || "";
      if ((text.includes("番号") || text.includes("番號")) && text.match(JMVBT_CODE_REGEX)) {
        return text.match(JMVBT_CODE_REGEX)?.[1] || "";
      }
    }
    const pageText = document.body.innerText || document.body.textContent || "";
    return pageText.match(JMVBT_CODE_REGEX)?.[1] || "";
  };
  const initJmvbtPage = () => {
    const infoPanel = document.querySelector("#info");
    if (infoPanel) {
      infoPanel.classList.add("jmvbt-panel");
    }
    const codeText = extractJmvbtCode();
    if (codeText) {
      createHiddenCodeNode(codeText);
    }
  };
  const isJableSite = (siteItem) => siteItem.name === "Jable";
  const isSupjavSite = (siteItem) => siteItem.name === "Supjav";
  const isAv01Site = (siteItem) => siteItem.name === "AV01";
  const isBestJpSite = (siteItem) => siteItem.name === "BestJP";
  const isHayavSite = (siteItem) => siteItem.name === "HAYAV";
  const isEvojavSite = (siteItem) => siteItem.name === "evojav";
  const isJableNotFoundResponse = (response, targetLink) => {
    const responseUrl = response.finalUrl || response.responseURL || targetLink;
    const responseText = response.responseText || "";
    const lowerText = responseText.toLowerCase();
    return response.status === 404 || responseUrl.includes("/404.php") || responseUrl.includes("404") && responseUrl !== targetLink || lowerText.includes("404 not found") || lowerText.includes("page not found") || lowerText.includes("video not found") || responseText.length < 5e3;
  };
  const isErrorCode = (resCode) => {
    return [404, 403].includes(resCode);
  };
  const isJmvbtPage = () => {
    const url = window.location.href;
    return window.location.hostname.includes("jmvbt") && (url.includes("/content_uncensored/") || url.includes("/content_censored/")) && url.endsWith(".htm");
  };
  const normalizeLibSiteConfig = (site) => ({
    enable: true,
    resolve: null,
    getCode: null,
    ...site
  });
  const normalizeVideoSiteConfig = (site) => ({
    strictParser: false,
    domQuery: {},
    codeFormater: null,
    forceCloudflareStatus: false,
    browseUrl: null,
    searchParser: null,
    request: null,
    ...site
  });
  const rawLibSites = [
    {
      name: "javdb",
      enable: true,
      identifier: "a[href*='javdb']",
      querys: {
        panelQueryStr: ".video-meta-panel>.columns.is-desktop .panel.movie-panel-info",
        codeQueryStr: `[data-clipboard-text]`
      },
      method() {
        const columnVideoCover = document.querySelector(".column-video-cover");
        if (columnVideoCover) {
          columnVideoCover.style.width = "60%";
        }
        const panel = document.querySelector(
          ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)"
        );
        panel == null ? void 0 : panel.classList.add("db-panel");
      }
    },
    {
      name: "javbus",
      enable: true,
      identifier: "a[href*='javbus']",
      querys: {
        panelQueryStr: ".movie>div.info",
        codeQueryStr: `span[style="color:#CC0000;"]`
      },
      method() {
      }
    },
    {
      name: "javlib",
      enable: true,
      identifier: "img[src*='logo-top']",
      querys: {
        panelQueryStr: "#video_jacket_info #video_info",
        codeQueryStr: `#video_id td.text`
      },
      method() {
        const panel = document.querySelector("#video_info");
        panel == null ? void 0 : panel.classList.add("lib-panel");
      }
    },
        {
      name: "jmvbt",
      enable: true,
      identifier: "body",
      querys: {
        panelQueryStr: "#info",
        codeQueryStr: `[data-jav-code]`
      },
      resolve: isJmvbtPage,
      getCode: extractJmvbtCode,
      method: initJmvbtPage
    }
  ];
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  // 直达详情页站点：脚本会请求目标详情页，再根据页面结构判断是否命中。
  const rawGetSites = [
    {
      name: "FANZA 動画",
      hostname: "dmm.co.jp",
      url: "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid={{code}}/",
      codeFormater: (preCode) => {
        const [pre, num] = preCode.split("-");
        const padNum = num.padStart(5, "0");
        if (pre.toLowerCase().startsWith("start")) {
          return `1${pre.toLowerCase()}${padNum}`;
        }
        return `${pre}${padNum}`;
      },
      domQuery: {}
    },
    {
      name: "JAVMENU",
      hostname: "javmenu.com",
      url: "https://javmenu.com/{{code}}",
      domQuery: {
        videoQuery: "a.nav-link[aria-controls='pills-0']"
      }
    },
    {
      name: "HAYAV",
      hostname: "hayav.com",
      url: "https://hayav.com/video/{{code}}/",
      domQuery: {}
    },
    {
      name: "evojav",
      hostname: "evojav.pro",
      url: "https://evojav.pro/video/{{code}}/",
      domQuery: {}
    },
    {
      name: "JavBus",
      hostname: "javbus.com",
      url: "https://javbus.com/{{code}}",
      domQuery: {},
      codeFormater: (preCode) => preCode.startsWith("MIUM") ? `${SP_PREFIX}${preCode}` : preCode
    }
  ].map((site) => ({ ...site, fetchType: "get" }));
  // 搜索结果页站点：脚本会请求搜索页，并从结果列表里做精确匹配。
  const rawParserSites = [
    {
      name: "123av",
      hostname: "123av.com",
      url: "https://123av.com/zh/search?keyword={{code}}",
      strictParser: true,
      domQuery: {
        linkQuery: `.detail>a[href*='v/']`,
        titleQuery: `.detail>a[href*='v/']`
      }
    },
    {
      name: "BestJP",
      hostname: "www.bestjavporn.com",
      url: "https://www.bestjavporn.com/search/{{code}}",
      strictParser: true,
      domQuery: {
        linkQuery: "a[href*='/video/']",
        titleQuery: "a[href*='/video/']"
      }
    },
    {
      name: "Jav.Guru",
      hostname: "jav.guru",
      url: "https://jav.guru/?s={{code}}",
      domQuery: { linkQuery: ".imgg>a[href]", titleQuery: ".inside-article>.grid1 a[title]" }
    },
    {
      name: "JAVMOST",
      hostname: "www.javmost.ws",
      url: "https://www.javmost.ws/search/{{code}}/",
      strictParser: true,
      domQuery: {
        linkQuery: "#content-update .card > center > a[href*='javmost.ws/']",
        titleQuery: "#content-update .card .card-block > a > h1.card-title"
      }
    },
    {
      name: "AvJoy",
      hostname: "avjoy.me",
      url: "https://avjoy.me/search/videos/{{code}}",
      domQuery: {
        titleQuery: `#wrapper .row .content-info span.content-title`,
        linkQuery: `#wrapper .row a[href^="/video/"]`
      }
    },
    {
      name: "paipancon",
      hostname: "paipancon.com",
      url: "https://paipancon.com/search/{{code}}",
      strictParser: true,
      searchParser: (responseText, siteItem, CODE) => {
        const doc = new DOMParser().parseFromString(responseText, "text/html");
        const galleryLink = doc.querySelector(`a[href='/gallery/${CODE}'], a[href='/gallery/${CODE.toUpperCase()}']`);
        const resultLinkNode = doc.querySelector("div.card a[href$='.html']");
        if (!galleryLink || !resultLinkNode) {
          return { isSuccess: false, isCloudflare: false };
        }
        return {
          isSuccess: true,
          isCloudflare: false,
          resultLink: `https://${siteItem.hostname}${resultLinkNode.getAttribute("href")}`
        };
      },
      domQuery: {}
    },
    {
      name: "GGJAV",
      hostname: "ggjav.com",
      url: "https://ggjav.com/main/search?string={{code}}",
      strictParser: true,
      domQuery: {
        titleQuery: "div.item > div.item_title > a.gray_a[href*='/main/video?id=']",
        linkQuery: "div.item > div.item_title > a.gray_a[href*='/main/video?id=']"
      }
    },
    {
      name: "highporn",
      hostname: "highporn.net",
      url: "https://highporn.net/search/videos?search_query={{code}}",
      domQuery: { linkQuery: ".well>a[href]", titleQuery: ".well>a[href]>span.video-title" }
    },
    {
      name: "18av",
      hostname: "18av.mm-cg.com",
      url: "https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html",
      domQuery: { linkQuery: ".posts h3>a[href]", titleQuery: ".posts h3>a[href]" }
    },
    {
      name: "javhub",
      hostname: "javhub.net",
      url: "https://javhub.net/search/{{code}}",
      strictParser: true,
      domQuery: { linkQuery: "a.card-text[href*='play']", titleQuery: "a.card-text[href*='play']" }
    },
    {
      name: "fcjav",
      hostname: "fcjav.com",
      url: "https://fcjav.com/search/{{code}}",
      strictParser: true,
      codeFormater: (preCode) => preCode.toLowerCase(),
      domQuery: {
        linkQuery: "a.ml-mask.jt[href*='/v/']",
        titleQuery: "a.ml-mask.jt[href*='/v/']"
      }
    },
    {
      name: "JavDB",
      hostname: "javdb.com",
      url: "https://javdb.com/search?q={{code}}",
      domQuery: {
        linkQuery: ".movie-list>.item:first-child>a",
        titleQuery: ".video-title"
      }
    }
  ].map((site) => ({ ...site, fetchType: "parser" }));
  // 直接跳转站点：脚本不做远程预检，只生成可点击链接。
  const rawDirectSites = [
    {
      name: "JAVLib",
      hostname: "javlibrary.com",
      url: "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}"
    }
  ].map((site) => ({ ...site, fetchType: "false" }));
  // 特殊站点：需要单独的编码、Cloudflare 或结果页策略，和常规站点分开维护。
  const specialSites = [
    {
      name: "AV01",
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
          pagination: {
            page: 1,
            limit: 24
          }
        })
      }),
      searchParser: (responseText, siteItem, CODE) => {
        try {
          const payload = JSON.parse(responseText);
          const videos = Array.isArray(payload.videos) ? payload.videos : [];
          const matchedVideos = videos.filter((videoItem) => {
            const candidateCode = videoItem?.dvd_id || videoItem?.dmm_id || "";
            return normalizeCode(candidateCode) === normalizeCode(CODE);
          });
          const matchVideo = matchedVideos[0];
          if (!matchVideo || !matchVideo.id) {
            return { isSuccess: false, isCloudflare: false };
          }
          const resultCode = (matchVideo.dvd_id || CODE).toLowerCase();
          return {
            isSuccess: true,
            isCloudflare: false,
            multipleRes: matchedVideos.length > 1,
            resultLink: `https://${siteItem.hostname}/jp/video/${matchVideo.id}/${resultCode}`
          };
        } catch (error) {
          return { isSuccess: false, isCloudflare: false };
        }
      }
    },
    {
      name: "Jable",
      hostname: "jable.tv",
      url: "https://jable.tv/search/{{code}}/",
      fetchType: "parser",
      codeFormater: formatJableCode,
      domQuery: {
        linkQuery: "h6.title>a[href*='/videos/']",
        titleQuery: "h6.title>a[href*='/videos/']"
      },
      strictParser: true
    },
    {
      name: "MISSAV",
      hostname: "missav.ws",
      url: "https://missav.ws/{{code}}/",
      fetchType: "false",
      domQuery: {
        subQuery: '.space-y-2 a.text-nord13[href="https://missav.ws/chinese-subtitle"]',
        leakQuery: ".order-first div.rounded-md a[href]:last-child"
      }
    },
    {
      name: "Supjav",
      hostname: "supjav.com",
      url: "https://supjav.com/zh/?s={{code}}",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        linkQuery: `.posts.clearfix>.post>a.img[title]`,
        titleQuery: `h3>a[rel="bookmark"][itemprop="url"]`
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
      searchParser: (responseText, siteItem, CODE) => {
        const doc = new DOMParser().parseFromString(responseText, "text/html");
        const linkNodes = Array.from(
          doc.querySelectorAll("a[target='_top'][href$='.html']")
        ).filter((node) => !node.href.includes("/searchall_search/"));
        const uniqueLinks = Array.from(
          new Map(linkNodes.map((node) => [node.href, node])).values()
        );
        const matchedLinks = uniqueLinks.filter((node) => {
          const hrefCode = node.href.split("/").pop()?.replace(/\.html$/i, "") || "";
          const imageAlt = node.querySelector("img")?.getAttribute("alt") || "";
          const candidateCode = extractVideoCode(
            [node.textContent || "", imageAlt, hrefCode].join(" ")
          );
          return normalizeCode(candidateCode || hrefCode) === normalizeCode(CODE);
        });
        const hasContent = uniqueLinks.length > 0;
        const isCloudflare = !hasContent && isCloudflareChallenge(responseText);
        if (isCloudflare) {
          return { isSuccess: false, isCloudflare: true };
        }
        if (matchedLinks.length === 0) {
          return { isSuccess: false, isCloudflare: false };
        }
        const resultLink = matchedLinks[0].href.replace(matchedLinks[0].hostname, siteItem.hostname);
        const tagText = matchedLinks.map((node) => node.textContent || node.querySelector("img")?.getAttribute("alt") || "").join(" ");
        return {
          isSuccess: true,
          isCloudflare: false,
          resultLink,
          multipleRes: matchedLinks.length > 1,
          tag: tagsQuery({ leakageText: tagText, subtitleText: tagText })
        };
      }
    }
  ];
  const rawSiteList = [...rawGetSites, ...rawParserSites, ...rawDirectSites, ...specialSites];
  const libSites = rawLibSites.map(normalizeLibSiteConfig);
  const siteList = rawSiteList.map(normalizeVideoSiteConfig);
  const gmRequest = ({ method = "GET", url, headers = {}, data }) => {
    return new Promise((resolve, reject) => {
      _GM_xmlhttpRequest({
        method,
        url,
        headers,
        data,
        onload: (response) => resolve(response),
        onerror: (error) => reject(error)
      });
    });
  };
  const getCode = (libItem) => {
    const { codeQueryStr } = libItem.querys;
    const codeNode = document.querySelector(codeQueryStr);
    if (!codeNode) return "";
    const codeText = libItem.name === "javdb" ? codeNode.dataset.clipboardText : codeNode.innerText.replace("复制", "");
    if (codeText.includes("FC2")) return codeText.split("-")[1];
    if (codeText.startsWith(SP_PREFIX)) return codeText.substring(3);
    return codeText;
  };
  const resolveCode = (libItem) => {
    if (typeof libItem.getCode === "function") {
      const specialCode = libItem.getCode();
      if (specialCode) return specialCode;
    }
    return getCode(libItem);
  };
  const regEnum = {
    subtitle: /(中文|字幕|subtitle)/,
    leakage: /(无码|無碼|泄漏|泄露|Uncensored)/
  };
  const tagsQuery = ({
    leakageText,
    subtitleText
  }) => {
    const hasLeakage = regEnum.leakage.test(leakageText);
    const hasSubtitle = regEnum.subtitle.test(subtitleText);
    const tags = [];
    if (hasLeakage) tags.push("无码");
    if (hasSubtitle) tags.push("字幕");
    return tags.join(" ");
  };
  var t, r, u, i, o = 0, f = [], c = preact.options, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
  function d(n, t2) {
    c.__h && c.__h(r, n, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n >= u2.__.length && u2.__.push({}), u2.__[n];
  }
  function h(n) {
    return o = 1, p(D, n);
  }
  function p(n, u2, i2) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [D(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return !!n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        })) return !c2 || c2.call(this, n2, t2, r2);
        var i3 = o2.__c.props !== n2;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n2, t2, r2) || i3;
      };
      r.u = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n2, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n2, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y(n, u2) {
    var i2 = d(t++, 3);
    !c.__s && C(i2.__H, u2) && (i2.__ = n, i2.i = u2, r.__H.__h.push(i2));
  }
  function j$1() {
    for (var n; n = f.shift(); ) if (n.__P && n.__H) try {
      n.__H.__h.forEach(z), n.__H.__h.forEach(B$1), n.__H.__h = [];
    } catch (t2) {
      n.__H.__h = [], c.__e(t2, n.__v);
    }
  }
  c.__b = function(n) {
    r = null, e && e(n);
  }, c.__ = function(n, t2) {
    n && t2.__k && t2.__k.__m && (n.__m = t2.__k.__m), s && s(n, t2);
  }, c.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.i = n2.__N = void 0;
    })) : (i2.__h.forEach(z), i2.__h.forEach(B$1), i2.__h = [], t = 0)), u = r;
  }, c.diffed = function(n) {
    v && v(n);
    var t2 = n.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j$1)), t2.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.i = void 0;
    })), u = r = null;
  }, c.__c = function(n, t2) {
    t2.some(function(n2) {
      try {
        n2.__h.forEach(z), n2.__h = n2.__h.filter(function(n3) {
          return !n3.__ || B$1(n3);
        });
      } catch (r2) {
        t2.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), t2 = [], c.__e(r2, n2.__v);
      }
    }), l && l(n, t2);
  }, c.unmount = function(n) {
    m && m(n);
    var t2, r2 = n.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n2) {
      try {
        z(n2);
      } catch (n3) {
        t2 = n3;
      }
    }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w(n) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function B$1(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function C(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function D(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  function g(n, t2) {
    for (var e2 in t2) n[e2] = t2[e2];
    return n;
  }
  function E(n, t2) {
    for (var e2 in n) if ("__source" !== e2 && !(e2 in t2)) return true;
    for (var r2 in t2) if ("__source" !== r2 && n[r2] !== t2[r2]) return true;
    return false;
  }
  function N(n, t2) {
    this.props = n, this.context = t2;
  }
  function M(n, e2) {
    function r2(n2) {
      var t2 = this.props.ref, r3 = t2 == n2.ref;
      return !r3 && t2 && (t2.call ? t2(null) : t2.current = null), E(this.props, n2);
    }
    function u2(e3) {
      return this.shouldComponentUpdate = r2, preact.createElement(n, e3);
    }
    return u2.displayName = "Memo(" + (n.displayName || n.name) + ")", u2.prototype.isReactComponent = true, u2.__f = true, u2;
  }
  (N.prototype = new preact.Component()).isPureReactComponent = true, N.prototype.shouldComponentUpdate = function(n, t2) {
    return E(this.props, n) || E(this.state, t2);
  };
  var T = preact.options.__b;
  preact.options.__b = function(n) {
    n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
  };
  var F = preact.options.__e;
  preact.options.__e = function(n, t2, e2, r2) {
    if (n.then) {
      for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n, t2);
    }
    F(n, t2, e2, r2);
  };
  var U = preact.options.unmount;
  function V(n, t2, e2) {
    return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n2) {
      "function" == typeof n2.__c && n2.__c();
    }), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e2 && (n.__c.__P = t2), n.__c = null), n.__k = n.__k && n.__k.map(function(n2) {
      return V(n2, t2, e2);
    })), n;
  }
  function W(n, t2, e2) {
    return n && e2 && (n.__v = null, n.__k = n.__k && n.__k.map(function(n2) {
      return W(n2, t2, e2);
    }), n.__c && n.__c.__P === t2 && (n.__e && e2.appendChild(n.__e), n.__c.__e = true, n.__c.__P = e2)), n;
  }
  function P() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j(n) {
    var t2 = n.__.__c;
    return t2 && t2.__a && t2.__a(n);
  }
  function B() {
    this.i = null, this.l = null;
  }
  preact.options.unmount = function(n) {
    var t2 = n.__c;
    t2 && t2.__R && t2.__R(), t2 && 32 & n.__u && (n.type = null), U && U(n);
  }, (P.prototype = new preact.Component()).__c = function(n, t2) {
    var e2 = t2.__c, r2 = this;
    null == r2.o && (r2.o = []), r2.o.push(e2);
    var u2 = j(r2.__v), o2 = false, i2 = function() {
      o2 || (o2 = true, e2.__R = null, u2 ? u2(c2) : c2());
    };
    e2.__R = i2;
    var c2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n2 = r2.state.__a;
          r2.__v.__k[0] = W(n2, n2.__c.__P, n2.__c.__O);
        }
        var t3;
        for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.forceUpdate();
      }
    };
    r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n.then(i2, i2);
  }, P.prototype.componentWillUnmount = function() {
    this.o = [];
  }, P.prototype.render = function(n, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i2 = e2.__a && preact.createElement(preact.Fragment, null, n.fallback);
    return i2 && (i2.__u &= -33), [preact.createElement(preact.Fragment, null, e2.__a ? null : n.children), i2];
  };
  var H = function(n, t2, e2) {
    if (++e2[1] === e2[0] && n.l.delete(t2), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e2 = n.i; e2; ) {
      for (; e2.length > 3; ) e2.pop()();
      if (e2[1] < e2[0]) break;
      n.i = e2 = e2[2];
    }
  };
  (B.prototype = new preact.Component()).__a = function(n) {
    var t2 = this, e2 = j(t2.__v), r2 = t2.l.get(n);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t2.props.revealOrder ? (r2.push(u2), H(t2, n, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, B.prototype.render = function(n) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var t2 = preact.toChildArray(n.children);
    n.revealOrder && "b" === n.revealOrder[0] && t2.reverse();
    for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
    return n.children;
  }, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
    var n = this;
    this.l.forEach(function(t2, e2) {
      H(n, e2, t2);
    });
  };
  var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
  };
  preact.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
    Object.defineProperty(preact.Component.prototype, t2, { configurable: true, get: function() {
      return this["UNSAFE_" + t2];
    }, set: function(n) {
      Object.defineProperty(this, t2, { configurable: true, writable: true, value: n });
    } });
  });
  var en = preact.options.event;
  function rn() {
  }
  function un() {
    return this.cancelBubble;
  }
  function on() {
    return this.defaultPrevented;
  }
  preact.options.event = function(n) {
    return en && (n = en(n)), n.persist = rn, n.isPropagationStopped = un, n.isDefaultPrevented = on, n.nativeEvent = n;
  };
  var ln = { enumerable: false, configurable: true, get: function() {
    return this.class;
  } }, fn = preact.options.vnode;
  preact.options.vnode = function(n) {
    "string" == typeof n.type && function(n2) {
      var t2 = n2.props, e2 = n2.type, u2 = {}, o2 = -1 === e2.indexOf("-");
      for (var i2 in t2) {
        var c2 = t2[i2];
        if (!("value" === i2 && "defaultValue" in t2 && null == c2 || Q && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
          var l2 = i2.toLowerCase();
          "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === c2 ? c2 = "" : "translate" === l2 && "no" === c2 ? c2 = false : "o" === l2[0] && "n" === l2[1] ? "ondoubleclick" === l2 ? i2 = "ondblclick" : "onchange" !== l2 || "input" !== e2 && "textarea" !== e2 || X(t2.type) ? "onfocus" === l2 ? i2 = "onfocusin" : "onblur" === l2 ? i2 = "onfocusout" : J.test(i2) && (i2 = l2) : l2 = i2 = "oninput" : o2 && G.test(i2) ? i2 = i2.replace(K, "-$&").toLowerCase() : null === c2 && (c2 = void 0), "oninput" === l2 && u2[i2 = l2] && (i2 = "oninputCapture"), u2[i2] = c2;
        }
      }
      "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = preact.toChildArray(t2.children).forEach(function(n3) {
        n3.props.selected = -1 != u2.value.indexOf(n3.props.value);
      })), "select" == e2 && null != u2.defaultValue && (u2.value = preact.toChildArray(t2.children).forEach(function(n3) {
        n3.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n3.props.value) : u2.defaultValue == n3.props.value;
      })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", ln)) : (t2.className && !t2.class || t2.class && t2.className) && (u2.class = u2.className = t2.className), n2.props = u2;
    }(n), n.$$typeof = q, fn && fn(n);
  };
  var an = preact.options.__r;
  preact.options.__r = function(n) {
    an && an(n), n.__c;
  };
  var sn = preact.options.diffed;
  preact.options.diffed = function(n) {
    sn && sn(n);
    var t2 = n.props, e2 = n.__e;
    null != e2 && "textarea" === n.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value);
  };
  const Tooltip = ({ content, children }) => {
    const [isVisible, setIsVisible] = h(false);
    return /* @__PURE__ */ u$1(
      "div",
      {
        className: "jop-tooltip-container",
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
        children: [
          children,
          isVisible && content && /* @__PURE__ */ u$1("div", { className: "jop-tooltip", children: content })
        ]
      }
    );
  };
  const Checkbox = ({ label, value, tip, onChange }) => {
    const handleChange = (event) => {
      onChange(event.currentTarget.checked);
    };
    return /* @__PURE__ */ u$1("label", { className: "jop-checkbox", children: [
      /* @__PURE__ */ u$1(
        "input",
        {
          type: "checkbox",
          className: "jop-checkbox-input",
          checked: value,
          onChange: handleChange
        }
      ),
      /* @__PURE__ */ u$1("span", { className: "jop-checkbox-custom" }),
      /* @__PURE__ */ u$1(Tooltip, { content: tip || "", children: /* @__PURE__ */ u$1("span", { className: "jop-checkbox-label", children: label }) })
    ] });
  };
  const Setting = ({
    siteList: siteList2,
    setDisables,
    disables,
    multipleNavi,
    setMultipleNavi,
    hiddenError,
    setHiddenError
  }) => {
    const [showSetting, setShowSetting] = h(false);
    const hanleListChange = (item, isHidden) => {
      if (isHidden) {
        setDisables(disables.filter((disItem) => disItem !== item.name));
      } else {
        setDisables([...disables, item.name]);
      }
    };
    const handleNaviChange = (checked) => {
      setMultipleNavi(checked);
      _GM_setValue("multipleNavi", checked);
    };
    const handlehiddenErrorChange = (checked) => {
      setHiddenError(checked);
      _GM_setValue("hiddenError", checked);
    };
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      !showSetting && /* @__PURE__ */ u$1("div", { className: "jop-button_def", onClick: () => setShowSetting(!showSetting), children: "设置" }),
      showSetting && /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("div", { className: "jop-setting", children: [
          /* @__PURE__ */ u$1(Group, { title: "勾选默认展示", children: siteList2.map((item) => {
            const isHidden = disables.includes(item.name);
            return /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: item.name,
                value: !isHidden,
                onChange: (checked) => hanleListChange(item, checked)
              }
            );
          }) }),
          /* @__PURE__ */ u$1(Group, { title: "其他设置", children: [
            /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: "展示多个搜索结果",
                value: multipleNavi,
                tip: "一个站点内出现多条匹配结果时，打开后跳转到搜索结果页",
                onChange: handleNaviChange
              }
            ),
            /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: "隐藏失败结果",
                value: hiddenError,
                onChange: handlehiddenErrorChange
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ u$1(
          "div",
          {
            className: "jop-button_def",
            onClick: () => {
              setShowSetting(!showSetting);
            },
            children: "收起设置"
          }
        )
      ] })
    ] });
  };
  const Group = ({ title, children }) => {
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("h4", { className: "jop-setting-title", children: title }),
      /* @__PURE__ */ u$1("div", { className: "jop-setting-list", children })
    ] });
  };
  function isCloudflareChallenge(responseText) {
    if (!responseText || responseText.length < 100) return false;
    const lowerText = responseText.toLowerCase();
    
    // 严格检测 Cloudflare 挑战页面，避免误判正常页面。
    // 1. 检测明确的挑战页文本，需要出现典型特征。
    const hasChallengeText = lowerText.includes("just a moment") || 
                            lowerText.includes("checking your browser") ||
                            lowerText.includes("please wait") && lowerText.includes("cloudflare");
    
    const hasChallengeElements = lowerText.includes("cf-browser-verification") ||
                                 lowerText.includes("challenge-platform") ||
                                 lowerText.includes("challenges.cloudflare.com");
    
    const hasDDoSProtection = lowerText.includes("ddos protection by cloudflare") &&
                             (lowerText.includes("checking") || lowerText.includes("please wait"));
    
    // 4. 页面很短且包含 Cloudflare 相关文本时，也可能是挑战页。
    const isShortPage = responseText.length < 5000 && 
                       (lowerText.includes("cloudflare") && lowerText.includes("ray"));
    
    // 只有当明确是挑战页面时才返回 true
    // 避免仅因页面出现 "cloudflare" 或 "cf-ray" 就误判。
    return hasChallengeText || hasChallengeElements || hasDDoSProtection || isShortPage;
  }
  function videoPageParser(responseText, { subQuery, leakQuery, videoQuery }, siteItem, CODE, response) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const subNode = subQuery ? doc.querySelector(subQuery) : "";
    const subNodeText = subNode ? subNode.innerHTML : "";
    const leakNode = leakQuery ? doc.querySelector(leakQuery) : null;
    const leakNodeText = leakNode ? leakNode.innerHTML : "";
    
    // Jable 特殊处理：检查页面是否包含真实视频内容。
    let videoNode = null;
    if (siteItem && isJableSite(siteItem)) {
      // 优先检查明确的失败指示器。
      const errorText = responseText.toLowerCase();
      const pageTitle = doc.querySelector("title")?.textContent || "";
      const h1Title = doc.querySelector("h1")?.textContent || "";
      const headerText = doc.querySelector(".info-header")?.textContent || "";
      const normalizedCode = normalizeCode(CODE);
      const hasMatchedCode = [pageTitle, h1Title, headerText].some(
        (text) => normalizeCode(text).includes(normalizedCode)
      );
      
      const has404Error = errorText.includes("404") && (
        errorText.includes("not found") || 
        errorText.includes("page not found") ||
        pageTitle.toLowerCase().includes("404") ||
        h1Title.toLowerCase().includes("404")
      );
      
      const hasNotFoundError = (
        errorText.includes("not found") || 
        errorText.includes("page not found") ||
        errorText.includes("video not found")
      ) && (
        pageTitle.toLowerCase().includes("not found") ||
        h1Title.toLowerCase().includes("not found")
      );
      
      const hasErrorElement = doc.querySelector(".error, .not-found, .404, .no-video, .page-not-found");
      
      // 如果有明确的失败指示器，直接返回失败
      if (has404Error || hasNotFoundError || hasErrorElement) {
        return {
          isSuccess: false,
          isCloudflare: false,
          tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
        };
      }
      
      const hasVideoInfo = !!doc.querySelector(JABLE_INFO_SELECTOR);
      videoNode = doc.querySelector(JABLE_PLAYER_SELECTOR);
      if (!(videoNode || hasVideoInfo) || !hasMatchedCode) {
        const hasEnoughContent = responseText.length > 15000;
        const hasVideoScript = responseText.includes("video") && (
          responseText.includes("player") ||
          responseText.includes("embed") ||
          responseText.includes("jwplayer") ||
          responseText.includes("plyr")
        );
        videoNode = hasMatchedCode && hasVideoInfo && (hasEnoughContent || hasVideoScript) ? true : null;
      }
    } else {
      videoNode = videoQuery ? doc.querySelector(videoQuery) : true;
    }
    
    // 如果能找到正常的页面内容，就不应该是 Cloudflare 挑战
    // 只有在找不到正常内容时才进一步判断 Cloudflare。
    const hasContent = !!videoNode || (subNode && subNodeText.length > 0) || (leakNode && leakNodeText.length > 0);
    const isCloudflare = !hasContent && isCloudflareChallenge(responseText);
    
    return {
      isSuccess: !!videoNode && !isCloudflare,
      isCloudflare: isCloudflare,
      tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
    };
  }
  function searchPageCodeCheck(titleNodes, siteItem, CODE) {
    if (!titleNodes || titleNodes.length === 0) return { isSuccess: false, titleNodeText: "" };
    if (siteItem.strictParser) {
      const nodes = Array.from(titleNodes);
      const passNodes = nodes.map((node, index) => ({ node, index })).filter(({ node }) => {
        const nodeCode = extractNodeCode(node);
        return normalizeCode(nodeCode) === normalizeCode(CODE);
      });
      const titleNodeText = passNodes.map(({ node }) => node.outerHTML).join(" ");
      return {
        titleNodeText,
        isSuccess: passNodes.length > 0,
        multipleRes: passNodes.length > 1,
        matchedIndex: passNodes[0]?.index
      };
    } else {
      const titleNode = titleNodes[siteItem.domQuery.listIndex ?? 0];
      const titleNodeText = titleNode ? titleNode == null ? void 0 : titleNode.outerHTML : "";
      const matchCode = extractNodeCode(titleNode);
      const isSuccess = normalizeCode(matchCode) === normalizeCode(CODE);
      return {
        titleNodeText,
        isSuccess,
        multipleRes: titleNodes.length > 1,
        matchedIndex: siteItem.domQuery.listIndex ?? 0
      };
    }
  }
  function searchPageParser(responseText, siteItem, CODE) {
    if (typeof siteItem.searchParser === "function") {
      return siteItem.searchParser(responseText, siteItem, CODE);
    }
    const { linkQuery, titleQuery } = siteItem.domQuery;
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const titleNodes = titleQuery ? doc.querySelectorAll(titleQuery) : [];
    const { isSuccess, titleNodeText, multipleRes, matchedIndex } = searchPageCodeCheck(titleNodes, siteItem, CODE);
    const linkNodes = linkQuery ? doc.querySelectorAll(linkQuery) : [];
    const linkNode = linkNodes[matchedIndex ?? siteItem.domQuery.listIndex ?? 0];
    // 如果能找到正常的页面内容，就不应该是 Cloudflare 挑战
    // 只有在找不到正常内容时才进一步判断 Cloudflare。
    const hasContent = (titleNodes && titleNodes.length > 0) || (linkNodes && linkNodes.length > 0);
    const isCloudflare = !hasContent && isCloudflareChallenge(responseText);
    
    if (isCloudflare) {
      return { isSuccess: false, isCloudflare: true };
    }
    if (!isSuccess) {
      return { isSuccess: false, isCloudflare: false };
    }
    if (!linkNode) {
      return { isSuccess: false, isCloudflare: false };
    }
    const resultLinkText = linkNode.href.replace(linkNode.hostname, siteItem.hostname);
    return {
      isSuccess: true,
      isCloudflare: false,
      resultLink: resultLinkText,
      multipleRes,
      tag: tagsQuery({ leakageText: titleNodeText, subtitleText: titleNodeText })
    };
  }
  function getRequestHeaders(siteItem) {
    if (isJableSite(siteItem)) return JABLE_REQUEST_HEADERS;
    if (isSupjavSite(siteItem)) return SUPJAV_REQUEST_HEADERS;
    if (isAv01Site(siteItem)) return AV01_REQUEST_HEADERS;
    if (isBestJpSite(siteItem)) return BESTJP_REQUEST_HEADERS;
    return void 0;
  }
  function getRequestConfig(siteItem, targetLink, CODE) {
    if (typeof siteItem.request === "function") {
      return siteItem.request({ siteItem, targetLink, CODE });
    }
    return {
      method: "GET",
      url: targetLink,
      headers: getRequestHeaders(siteItem)
    };
  }
  function isCloudflareBlockedResponse(response, siteItem) {
    const responseText = response.responseText || "";
    if (isCloudflareChallenge(responseText)) {
      return true;
    }
    if (!isSupjavSite(siteItem) && !isBestJpSite(siteItem) && !isHayavSite(siteItem) && !isEvojavSite(siteItem)) {
      return false;
    }
    const responseHeaders = (response.responseHeaders || "").toLowerCase();
    return response.status === 403 || responseHeaders.includes("cf-mitigated") || responseHeaders.includes("cloudflare");
  }
  const baseFetcher = async ({ siteItem, targetLink, CODE }) => {
    if (siteItem.fetchType === "false") {
      if (siteItem.forceCloudflareStatus) {
        return Promise.resolve({
          isSuccess: false,
          resultLink: targetLink,
          isCloudflare: true
        });
      }
      return Promise.resolve({
        isSuccess: true,
        resultLink: targetLink,
        isCloudflare: false
      });
    }
    try {
      const requestConfig = getRequestConfig(siteItem, targetLink, CODE);
      const response = await gmRequest(requestConfig);
      
      // Jable 特殊处理：检查响应状态码
      if (isJableSite(siteItem) && siteItem.fetchType === "get") {
        // 检查是否为 404 页面。
        if (isJableNotFoundResponse(response, targetLink)) {
          return {
            isSuccess: false,
            isCloudflare: false,
            resultLink: targetLink
          };
        }
        if (!isCloudflareChallenge(response.responseText)) {
          const parseResult = videoPageParser(response.responseText, siteItem.domQuery, siteItem, CODE, response);
          return {
            isSuccess: true,
            isCloudflare: false,
            resultLink: targetLink,
            tag: parseResult.tag
          };
        }
      }
      
      if (siteItem.fetchType === "get") {
        const parseResult = videoPageParser(response.responseText, siteItem.domQuery, siteItem, CODE, response);
        if (!parseResult.isSuccess && isCloudflareBlockedResponse(response, siteItem)) {
          return {
            isSuccess: false,
            isCloudflare: true,
            resultLink: targetLink
          };
        }
        if (response.status === 404) {
          throw Error(String(response.status));
        }
        return {
          resultLink: targetLink,
          ...parseResult
        };
      } else {
        const parseResult = searchPageParser(response.responseText, siteItem, CODE);
        if (parseResult.isSuccess) {
          return parseResult;
        }
        if (isCloudflareBlockedResponse(response, siteItem)) {
          return {
            isSuccess: false,
            isCloudflare: true,
            resultLink: targetLink
          };
        }
        if (response.status === 404) {
          throw Error(String(response.status));
        }
        return parseResult;
      }
    } catch (error) {
      return {
        isSuccess: false,
        isCloudflare: isSupjavSite(siteItem) || isBestJpSite(siteItem) || isHayavSite(siteItem) || isEvojavSite(siteItem),
        resultLink: targetLink
      };
    }
  };
  const SiteBtn = ({ siteItem, CODE, multipleNavi, hiddenError }) => {
    const { name, codeFormater } = siteItem;
    const formatCode = codeFormater ? codeFormater(CODE) : CODE;
    const originLink = siteItem.url.replace("{{code}}", formatCode);
    const browseLink = (siteItem.browseUrl || siteItem.url).replace("{{code}}", formatCode);
    const [loading, setLoading] = h(false);
    const [fetchRes, setFetchRes] = h();
    y(() => {
      setLoading(true);
      baseFetcher({ siteItem, targetLink: originLink, CODE: formatCode }).then((res) => {
        setFetchRes(res);
        setLoading(false);
      });
    }, [siteItem, CODE, originLink]);
    const multipleFlag = multipleNavi && (fetchRes == null ? void 0 : fetchRes.multipleRes);
    let tag = multipleFlag ? "多结果" : fetchRes == null ? void 0 : fetchRes.tag;
    if (fetchRes == null ? void 0 : fetchRes.isCloudflare) {
      tag = tag ? tag + " CF" : "CF";
    }
    const resultLink = multipleFlag ? browseLink : fetchRes == null ? void 0 : fetchRes.resultLink;
    let colorClass = "";
    if (fetchRes == null ? void 0 : fetchRes.isCloudflare) {
      colorClass = "jop-button_yellow ";
    } else if (fetchRes == null ? void 0 : fetchRes.isSuccess) {
      colorClass = "jop-button_green ";
    } else {
      colorClass = "jop-button_red ";
    }
    if (hiddenError && !(fetchRes == null ? void 0 : fetchRes.isSuccess) && !(fetchRes == null ? void 0 : fetchRes.isCloudflare)) {
      return /* @__PURE__ */ u$1(preact.Fragment, {});
    }
    return /* @__PURE__ */ u$1(
      "a",
      {
        className: "jop-button " + (loading ? " " : colorClass),
        target: "_blank",
        href: !resultLink ? browseLink : resultLink,
        children: [
          tag && /* @__PURE__ */ u$1("div", { className: "jop-button_label", children: tag }),
          /* @__PURE__ */ u$1("span", { children: name })
        ]
      }
    );
  };
  const App = M(function({ libItem, CODE }) {
    const DEF_DIS = [
      ...["AvJoy", "paipancon", "GGJAV", "AV01", "highporn", "evojav", "HAYAV"],
      ...["JavBus", "JavDB", "JAVLib", "MISSAV_", "123av", "javhub", "JAVMENU"]
    ];
    const [disables, setDisables] = h(_GM_getValue("disable", DEF_DIS));
    const [multipleNavi, setMultipleNavi] = h(_GM_getValue("multipleNavi", true));
    const [hiddenError, setHiddenError] = h(_GM_getValue("hiddenError", false));
    const list = siteList.filter(
      (siteItem) => !disables.includes(siteItem.name) && !siteItem.hostname.includes(libItem.name)
    );
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("div", { class: "jop-list", children: list.map((siteItem) => /* @__PURE__ */ u$1(
        SiteBtn,
        {
          siteItem,
          CODE,
          multipleNavi,
          hiddenError
        },
        siteItem.name
      )) }),
      /* @__PURE__ */ u$1(
        Setting,
        {
          siteList,
          setDisables: (disable) => {
            setDisables(disable);
            _GM_setValue("disable", disable);
          },
          multipleNavi,
          setMultipleNavi: (multipleNavi2) => {
            setMultipleNavi(multipleNavi2);
            _GM_setValue("multipleNavi", multipleNavi2);
          },
          disables,
          hiddenError,
          setHiddenError: (v2) => {
            setHiddenError(v2);
            _GM_setValue("hiddenError", v2);
          }
        }
      )
    ] });
  });
  const resolveLibSite = () => {
    return libSites.find((item) => typeof item.resolve === "function" ? item.resolve() : document.querySelector(item.identifier));
  };
  function main() {
    const libItem = resolveLibSite();
    if (!libItem) {
      console.error("||jop 匹配站点失败");
      return;
    }
    
    // 先执行 method，某些站点会在这里补齐需要的页面元素。
    libItem.method();
    
    const CODE = resolveCode(libItem);
    if (!CODE) {
      console.error("||jop 提取番号失败");
      return;
    }
    
    const panel = document.querySelector(libItem.querys.panelQueryStr);
    if (!panel) {
      console.error("||jop 插入界面失败", libItem.querys.panelQueryStr);
      return;
    }
    
    // JMVBT 特殊处理：创建 infobox 容器。
    let container, app;
    if (typeof libItem.resolve === "function") {
      container = document.createElement("div");
      container.classList.add("infobox", "jop-infobox");
      const label = document.createElement("b");
      label.textContent = "在线观看：";
      container.appendChild(label);
      app = document.createElement("div");
      app.classList.add("jop-app");
      container.appendChild(app);
      panel.appendChild(container);
    } else {
      app = document.createElement("div");
      app.classList.add("jop-app");
      panel.append(app);
    }
    
    preact.render(/* @__PURE__ */ u$1(App, { libItem, CODE }), app);
    console.log("||脚本挂载成功", CODE);
  }
  main();

})(preact);



