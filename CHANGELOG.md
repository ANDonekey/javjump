# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-04-24

### Added

- Added support for `ToJAV` and `Javtiful`.
- Added a dedicated `JAVMENU` parser path to reduce false Cloudflare detection on normal pages.
- Added debug response capture via `window.__javJumpDebug` for development builds.
- Added automatic release asset generation for `.meta.js`.
- Added tracked release artifacts in `dist/`.

### Changed

- Improved `MISSAV`, `HAYAV`, `EVOJAV`, `Jable`, and `JAVMENU` parsing and fallback behavior.
- Split debug-to-page exposure so development builds keep it, while `release` builds remove `unsafeWindow`.
- Switched release output to the normal Chinese filename `JAV 添加跳转在线观看`.
- Updated README with installation, debug usage, and release-mode notes.

### Fixed

- Fixed `JAVMENU` pages being misclassified as Cloudflare challenge pages when the page was actually valid.
- Fixed release filename garbling in `dist/`.
- Fixed release script path handling by discovering the built `.user.js` file dynamically.

## [1.0.0] - 2026-04-24

### Added

- Initial Vite + Preact based userscript project structure.
- Core jump-button injection for `JavDB`, `JavBus`, `JavLibrary`, and `JMVBT`.
- Multi-site search and direct-link resolution support.
