# javjump

为常见 JAV 信息站注入“跳转在线观看”按钮的 Userscript。

## 功能

- 在 `JavDB`、`JavBus`、`JavLibrary`、`JMVBT` 页面注入跳转按钮
- 支持搜索页匹配、直达详情页检测、部分站点的 POST 搜索
- 对部分站点做了 Cloudflare 挑战页识别，尽量减少误命中
- 支持在结果中标记字幕、无码等标签信息

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

脚本头部已配置：

- `@downloadURL`
- `@updateURL`

发布到 GitHub 仓库 `main` 分支后，脚本管理器即可通过元文件地址检查更新。

## 仓库

- GitHub: [ANDonekey/javjump](https://github.com/ANDonekey/javjump)
- Issues: [ANDonekey/javjump/issues](https://github.com/ANDonekey/javjump/issues)

## 致谢

- 原仓库：[Mrbunker/userjs-jop](https://github.com/Mrbunker/userjs-jop)
- 原脚本页：[GreasyFork - JAV 添加跳转在线观看](https://greasyfork.org/zh-CN/scripts/429173-jav-%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B)
