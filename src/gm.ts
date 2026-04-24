export const gm = {
  addStyle(css: string) {
    if (typeof GM_addStyle === "function") {
      GM_addStyle(css);
      return;
    }

    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
  },
  getValue<T>(key: string, defaultValue: T): T {
    if (typeof GM_getValue === "function") {
      return GM_getValue(key, defaultValue);
    }
    return defaultValue;
  },
  setValue<T>(key: string, value: T) {
    if (typeof GM_setValue === "function") {
      GM_setValue(key, value);
    }
  }
};
