import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import monkey, { cdn, type MonkeyUserScript } from "vite-plugin-monkey";

import pkg from "./package.json";

const PARALLEL =
  "https://update.greasyfork.org/scripts/522123/1511104/tampermonkey%20parallel.js";
const HLS = "https://cdn.jsdelivr.net/npm/hls.js@1.5.18/dist/hls.min.js";
const RELEASE_ASSET_PATH = "dist/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B";
const RELEASE_BASENAME = "JAV 添加跳转在线观看";

function createUserScript(debugToPage: boolean): MonkeyUserScript {
  return {
    name: "JAV 添加跳转在线观看",
    namespace: "https://github.com/ANDonekey/javjump",
    version: pkg.version,
    author: "ANDonekey",
    description: "为 JavDB、JavBus、JavLibrary、JMVBT 等站点添加跳转在线观看的链接",
    license: "MIT",
    icon: "https://javdb.com/favicon-32x32.png",
    homepageURL: "https://github.com/ANDonekey/javjump",
    supportURL: "https://github.com/ANDonekey/javjump/issues",
    include: [
      /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/,
      /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/,
      /^https?:\/\/(\w*\.)?javlibrary\.com.*$/,
      /^http.*\/cn\/\?v=jav.*$/,
      /^https?:\/\/(\w*\.)?jmvbt\.com\/content_(uncensored|censored)\/.*\.htm$/
    ],
    match: [
      "*://*.javdb.com/*",
      "*://*.jmvbt.com/content_uncensored/*.htm",
      "*://*.jmvbt.com/content_censored/*.htm"
    ],
    connect: [
      "dmm.co.jp",
      "jable.tv",
      "missav.ws",
      "123av.com",
      "supjav.com",
      "www.bestjavporn.com",
      "javmenu.com",
      "jav.guru",
      "www.javmost.ws",
      "hayav.com",
      "avjoy.me",
      "paipancon.com",
      "ggjav.com",
      "www.av01.media",
      "highporn.net",
      "evojav.pro",
      "18av.mm-cg.com",
      "tojav.net",
      "javtiful.com",
      "javhub.net",
      "javgg.net",
      "7mmtv.sx",
      "fcjav.com",
      "javtrailers.com",
      "media.javtrailers.com",
      "javbus.com",
      "javdb.com",
      "javlibrary.com"
    ],
    grant: debugToPage
      ? ["GM_addStyle", "GM_getValue", "GM_setValue", "GM_xmlhttpRequest", "unsafeWindow"]
      : ["GM_addStyle", "GM_getValue", "GM_setValue", "GM_xmlhttpRequest"],
    require: [PARALLEL, HLS],
    downloadURL:
      `https://raw.githubusercontent.com/ANDonekey/javjump/main/${RELEASE_ASSET_PATH}.user.js`,
    updateURL:
      `https://raw.githubusercontent.com/ANDonekey/javjump/main/${RELEASE_ASSET_PATH}.meta.js`
  };
}

export default defineConfig(({ mode }) => {
  const debugToPage = mode !== "release";

  return {
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    define: {
      __DEBUG_TO_PAGE__: JSON.stringify(debugToPage)
    },
    esbuild: {
      charset: "utf8"
    },
    build: {
      minify: false
    },
    plugins: [
      preact(),
      monkey({
        entry: "src/main.tsx",
        userscript: createUserScript(debugToPage),
        build: {
          fileName: `${RELEASE_BASENAME}.user.js`,
          externalGlobals: {
            preact: cdn.jsdelivr("preact", "dist/preact.min.js")
          }
        }
      })
    ]
  };
});
