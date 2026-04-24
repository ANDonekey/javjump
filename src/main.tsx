import { render } from "preact";

import App from "@/components/App";
import { detectCloudflareFromText } from "@/fetcher";
import { resolveCode } from "@/helpers";
import { libSites, createVideoSites, normalizeVideoSiteConfig } from "@/sites";
import type { LibSiteConfig } from "@/types";
import "@/style.css";

function resolveLibSite() {
  return libSites.find((item) =>
    typeof item.resolve === "function" ? item.resolve() : !!document.querySelector(item.identifier)
  );
}

function createMountNode(libItem: LibSiteConfig, panel: Element) {
  let app: HTMLDivElement;

  if (typeof libItem.resolve === "function") {
    const container = document.createElement("div");
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

  return app;
}

function main() {
  const libItem = resolveLibSite();
  if (!libItem) {
    console.error("||jop 匹配站点失败");
    return;
  }

  libItem.method();

  const CODE = resolveCode(libItem);
  if (!CODE) {
    console.error("||jop 提取番号失败");
    return;
  }

  const panel = document.querySelector(libItem.queries.panelQueryStr);
  if (!panel) {
    console.error("||jop 插入界面失败", libItem.queries.panelQueryStr);
    return;
  }

  const app = createMountNode(libItem, panel);
  const siteList = createVideoSites(detectCloudflareFromText).map(normalizeVideoSiteConfig);
  render(<App libItem={libItem} CODE={CODE} siteList={siteList} />, app);
  console.log("||脚本挂载成功", CODE);
}

main();
