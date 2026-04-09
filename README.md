# javjump

一个为常见 JAV 信息站添加“跳转在线观看”按钮的 Userscript。
<img width="402" height="278" alt="图片" src="https://github.com/user-attachments/assets/eeac6e89-3f38-4465-b87d-ee80276a456d" />

## 功能

- 在 `JavDB`、`JavBus`、`JavLibrary`、`JMVBT` 等页面注入跳转按钮
- 支持多站点搜索、直达详情页、搜索结果页匹配
- 适配部分站点的 Cloudflare、POST 搜索和特殊页面结构

## 安装

- 脚本文件：
  [JAV 添加跳转在线观看.user.js](https://raw.githubusercontent.com/ANDonekey/javjump/main/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B.user.js)
- 更新元文件：
  [JAV 添加跳转在线观看.meta.js](https://raw.githubusercontent.com/ANDonekey/javjump/main/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B.meta.js)

在 Tampermonkey、Violentmonkey 等脚本管理器中打开 `.user.js` 链接即可安装。

## 更新

脚本头部已经配置：

- `@downloadURL`
- `@updateURL`

发布到 GitHub 仓库 `main` 分支后，脚本管理器即可按元数据地址检查更新。

## 仓库

- GitHub: [ANDonekey/javjump](https://github.com/ANDonekey/javjump)
- Issues: [https://github.com/ANDonekey/javjump/issues](https://github.com/ANDonekey/javjump/issues)

## 致谢

本项目修改自以下项目与发布页：

- 原仓库：[Mrbunker/userjs-jop](https://github.com/Mrbunker/userjs-jop)
- 原始脚本页：[GreasyFork - JAV 添加跳转在线观看](https://greasyfork.org/zh-CN/scripts/429173-jav-%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B)
