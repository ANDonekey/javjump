# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.1.1] - 2026-04-29

### Changed

- Updated `Javtiful` search URL to the new `/zh/search?q={{code}}` route.
- Added a dedicated `BestJP` search parser to avoid generic search-page mismatches.
- Tightened `JAVMENU` detail-page detection so recommendation pages no longer count as valid hits.

### Fixed

- Fixed `Javtiful` search parsing when result cards included prefix text such as `FHD 02:08:42` before the actual code.
- Fixed `Javtiful` no-result pages being shown as Cloudflare hits instead of normal misses.
- Fixed `BestJP` search parsing for codes such as `SAN-449` and `DLDSS-449`.
- Fixed `JAVMENU` false positives where codes like `AVSA-436` could land on a `You May Like` page and still be treated as a match.

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
