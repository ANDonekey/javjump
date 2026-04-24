import type { ComponentChildren } from "preact";
import { memo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

import { DEFAULT_DISABLED_SITES } from "@/constants";
import { baseFetcher } from "@/fetcher";
import { gm } from "@/gm";
import { getDebugLogsEnabled, setDebugLogsEnabled } from "@/logger";
import type { FetchResult, LibSiteConfig, VideoSiteConfig } from "@/types";

function Tooltip({
  content,
  children
}: {
  content?: string;
  children: ComponentChildren;
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="jop-tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content ? <div className="jop-tooltip">{content}</div> : null}
    </div>
  );
}

function Checkbox({
  label,
  value,
  tip,
  onChange
}: {
  label: string;
  value: boolean;
  tip?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="jop-checkbox">
      <input
        type="checkbox"
        className="jop-checkbox-input"
        checked={value}
        onChange={(event) =>
          onChange((event.currentTarget as HTMLInputElement).checked)
        }
      />
      <span className="jop-checkbox-custom" />
      <Tooltip content={tip}>
        <span className="jop-checkbox-label">{label}</span>
      </Tooltip>
    </label>
  );
}

function Group({
  title,
  children
}: {
  title: string;
  children: ComponentChildren;
}) {
  return (
    <>
      <h4 className="jop-setting-title">{title}</h4>
      <div className="jop-setting-list">{children}</div>
    </>
  );
}

function Setting({
  siteList,
  disables,
  setDisables,
  multipleNavi,
  setMultipleNavi,
  hiddenError,
  setHiddenError,
  debugLogs,
  setDebugLogs
}: {
  siteList: VideoSiteConfig[];
  disables: string[];
  setDisables: (value: string[]) => void;
  multipleNavi: boolean;
  setMultipleNavi: (value: boolean) => void;
  hiddenError: boolean;
  setHiddenError: (value: boolean) => void;
  debugLogs: boolean;
  setDebugLogs: (value: boolean) => void;
}) {
  const [showSetting, setShowSetting] = useState(false);

  const handleListChange = (item: VideoSiteConfig, enabled: boolean) => {
    const next = enabled
      ? disables.filter((name) => name !== item.name)
      : [...disables, item.name];
    setDisables(next);
    gm.setValue("disable", next);
  };

  const updateBooleanSetting = (key: string, value: boolean, setter: (value: boolean) => void) => {
    setter(value);
    gm.setValue(key, value);
  };

  return (
    <>
      {!showSetting ? (
        <button
          type="button"
          className="jop-button_def"
          aria-expanded={showSetting}
          onClick={() => setShowSetting(true)}
        >
          设置
        </button>
      ) : null}

      {showSetting ? (
        <>
          <div className="jop-setting">
            <Group title="勾选默认展示">
              {siteList.map((item) => {
                const isEnabled = !disables.includes(item.name);
                return (
                  <Checkbox
                    key={item.name}
                    label={item.name}
                    value={isEnabled}
                    onChange={(checked) => handleListChange(item, checked)}
                  />
                );
              })}
            </Group>

            <Group title="其他设置">
              <Checkbox
                label="展示多个搜索结果"
                value={multipleNavi}
                tip="一个站点内出现多条匹配结果时，打开后跳转到搜索结果页"
                onChange={(checked) =>
                  updateBooleanSetting("multipleNavi", checked, setMultipleNavi)
                }
              />
              <Checkbox
                label="隐藏失败结果"
                value={hiddenError}
                onChange={(checked) =>
                  updateBooleanSetting("hiddenError", checked, setHiddenError)
                }
              />
              <Checkbox
                label="开发日志"
                value={debugLogs}
                tip="在控制台输出请求状态、CF 判断、命中原因等调试信息"
                onChange={(checked) => {
                  setDebugLogs(checked);
                  setDebugLogsEnabled(checked);
                }}
              />
            </Group>
          </div>

          <button
            type="button"
            className="jop-button_def"
            aria-expanded={showSetting}
            onClick={() => setShowSetting(false)}
          >
            收起设置
          </button>
        </>
      ) : null}
    </>
  );
}

function SiteButton({
  siteItem,
  libItem,
  CODE,
  multipleNavi,
  hiddenError
}: {
  siteItem: VideoSiteConfig;
  libItem: LibSiteConfig;
  CODE: string;
  multipleNavi: boolean;
  hiddenError: boolean;
}) {
  const formatCode = siteItem.codeFormatter ? siteItem.codeFormatter(CODE) : CODE;
  const directLink =
    typeof siteItem.directLinkResolver === "function"
      ? siteItem.directLinkResolver({ libItem, CODE, formatCode })
      : "";

  if (siteItem.hideWhenNoDirectLink && !directLink) {
    return null;
  }

  const originLink = directLink || siteItem.url.replace("{{code}}", formatCode);
  const browseLink =
    directLink || (siteItem.browseUrl || siteItem.url).replace("{{code}}", formatCode);

  const [loading, setLoading] = useState(false);
  const [fetchRes, setFetchRes] = useState<FetchResult>();

  useEffect(() => {
    if (directLink) {
      setFetchRes({
        isSuccess: true,
        isCloudflare: false,
        resultLink: directLink
      });
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    baseFetcher({ siteItem, targetLink: originLink, CODE: formatCode }).then((res) => {
      if (!active) return;
      setFetchRes(res);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [siteItem, libItem, CODE, originLink, directLink, formatCode]);

  const multipleFlag = multipleNavi && fetchRes?.multipleRes;
  let tag = multipleFlag ? "多结果" : fetchRes?.tag;
  if (fetchRes?.isCloudflare) {
    tag = tag ? `${tag} CF` : "CF";
  }

  const resultLink = multipleFlag ? browseLink : fetchRes?.resultLink;
  const colorClass = fetchRes?.isCloudflare
    ? "jop-button_yellow"
    : fetchRes?.isSuccess
      ? "jop-button_green"
      : "jop-button_red";

  if (hiddenError && !fetchRes?.isSuccess && !fetchRes?.isCloudflare) {
    return null;
  }

  return (
    <a
      className={`jop-button ${loading ? "" : colorClass}`}
      target="_blank"
      rel="noreferrer"
      href={!resultLink ? browseLink : resultLink}
      onClick={(event) => {
        if (typeof siteItem.inlinePlayerResolver !== "function") return;
        event.preventDefault();
        siteItem.inlinePlayerResolver({
          libItem,
          CODE,
          formatCode,
          directLink
        });
      }}
    >
      {tag ? <div className="jop-button_label">{tag}</div> : null}
      <span>{siteItem.name}</span>
    </a>
  );
}

function App({
  libItem,
  CODE,
  siteList
}: {
  libItem: LibSiteConfig;
  CODE: string;
  siteList: VideoSiteConfig[];
}) {
  const [disables, setDisables] = useState(gm.getValue("disable", DEFAULT_DISABLED_SITES));
  const [multipleNavi, setMultipleNavi] = useState(gm.getValue("multipleNavi", true));
  const [hiddenError, setHiddenError] = useState(gm.getValue("hiddenError", false));
  const [debugLogs, setDebugLogs] = useState(getDebugLogsEnabled());

  const list = siteList.filter(
    (siteItem) => !disables.includes(siteItem.name) && !siteItem.hostname.includes(libItem.name)
  );

  return (
    <>
      <div className="jop-list">
        {list.map((siteItem) => (
          <SiteButton
            key={siteItem.name}
            siteItem={siteItem}
            libItem={libItem}
            CODE={CODE}
            multipleNavi={multipleNavi}
            hiddenError={hiddenError}
          />
        ))}
      </div>
      <Setting
        siteList={siteList}
        disables={disables}
        setDisables={setDisables}
        multipleNavi={multipleNavi}
        setMultipleNavi={setMultipleNavi}
        hiddenError={hiddenError}
        setHiddenError={setHiddenError}
        debugLogs={debugLogs}
        setDebugLogs={setDebugLogs}
      />
    </>
  );
}

export default memo(App);
