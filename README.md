# javjump

一个为常见 JAV 信息站添加“跳转在线观看”按钮的 Userscript。

<img width="402" height="278" alt="图片" src="https://github.com/user-attachments/assets/eeac6e89-3f38-4465-b87d-ee80276a456d" />

## 功能

- 在 `JavDB`、`JavBus`、`JavLibrary`、`JMVBT` 页面注入跳转按钮
- 支持搜索页匹配、直达详情页检测、部分站点的 POST 搜索
- 对部分站点做了 Cloudflare 挑战页识别，尽量减少误命中
- 支持在结果中标记字幕、无码等标签信息
- 支持调试日志与响应 HTML 抓取，方便定位站点失效和误判

## 安装

- 脚本文件：
  [JAV 添加跳转在线观看.user.js](https://raw.githubusercontent.com/ANDonekey/javjump/main/dist/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B.user.js)
- 更新元文件：
  [JAV 添加跳转在线观看.meta.js](https://raw.githubusercontent.com/ANDonekey/javjump/main/dist/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B.meta.js)

在 `Tampermonkey`、`Violentmonkey` 等脚本管理器中打开 `.user.js` 链接即可安装。

## 支持的来源页

- `JavDB`
- `JavBus`
- `JavLibrary`
- `JMVBT`

## 内置的跳转站点

- `javtrailers`
- `FANZA`
- `JAVMENU`
- `HAYAV`
- `evojav`
- `123av`
- `BestJP`
- `Jav.Guru`
- `JAVMOST`
- `AvJoy`
- `GGJAV`
- `highporn`
- `Jable`
- `MISSAV`
- `Supjav`
- `javgg`
- `7mmtv`
- `ToJAV`
- `Javtiful`
- `javhub`
- `fcjav`
- `JAVBus`
- `JavDB`
- `JAVLib`

不同站点可用性会随目标站结构和反爬策略变化。

## Debug 调试

脚本内置了调试日志和最近响应缓存，适合排查：

- 某个站点为什么没命中
- 为什么被误判成 `CF`
- 目标站实际返回了什么 HTML

### 开启调试

在脚本菜单或你现有的调试开关里启用 debug 后，脚本会：

- 在控制台输出 `request`、`response`、`searchPage`、`videoPage`、`result` 等日志
- 把最近最多 `20` 份响应 HTML 挂到页面环境的 `window.__javJumpDebug`

关闭 debug 时，`window.__javJumpDebug` 会被清掉。

说明：

- 普通 `npm run build` 构建会保留这个页面调试桥
- `npm run release` 产物会自动移除 `unsafeWindow` 暴露，发布版不再提供 `window.__javJumpDebug`

### 控制台用法

打开浏览器开发者工具后，可以直接在 Console 里执行：

```js
window.__javJumpDebug
```

查看最后一次抓到的 HTML：

```js
window.__javJumpDebug.lastResponse.html
```

复制最后一次 HTML：

```js
copy(window.__javJumpDebug.lastResponse.html)
```

按 key 读取某一条响应：

```js
window.__javJumpDebug.responses["JAVMENU:AARM-120:https://javmenu.com/AARM-120"].html
```

列出当前缓存里有哪些站点：

```js
window.__javJumpDebug.listSites()
```

查看某个站点最近一次响应：

```js
window.__javJumpDebug.getLatestSite("JAVMENU")
```

直接拿某个站点最近一次 HTML：

```js
window.__javJumpDebug.getSiteHtml("JAVMENU")
```

### 调试数据结构

每条响应包含这些字段：

- `key`
- `site`
- `code`
- `targetLink`
- `fetchedAt`
- `status`
- `finalUrl`
- `headers`
- `html`

其中最常用的是：

- `status`：返回状态码
- `finalUrl`：最终跳转到的地址
- `headers`：响应头
- `html`：完整响应正文

## 开发

```bash
npm install
npm run build
```

发布脚本会生成到 `dist/`：

```bash
npm run release
```

## 更新

更新日志见：[CHANGELOG.md](./CHANGELOG.md)

## 仓库

- GitHub: [ANDonekey/javjump](https://github.com/ANDonekey/javjump)
- Issues: [ANDonekey/javjump/issues](https://github.com/ANDonekey/javjump/issues)

## 致谢

- 原仓库：[Mrbunker/userjs-jop](https://github.com/Mrbunker/userjs-jop)
- 原脚本页：[GreasyFork - JAV 添加跳转在线观看](https://greasyfork.org/zh-CN/scripts/429173-jav-%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B)
