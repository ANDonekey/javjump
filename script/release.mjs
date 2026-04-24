import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const releaseBaseName = "JAV 添加跳转在线观看";
const distUserScriptPath = path.join(repoRoot, "dist", `${releaseBaseName}.user.js`);
const distMetaPath = path.join(repoRoot, "dist", `${releaseBaseName}.meta.js`);

async function main() {
  await mkdir(path.join(repoRoot, "dist"), { recursive: true });

  const userScriptContent = await readFile(distUserScriptPath, "utf8");
  const metaBlockMatch = userScriptContent.match(
    /^\/\/ ==UserScript==[\s\S]*?^\/\/ ==\/UserScript==/m
  );

  if (!metaBlockMatch) {
    throw new Error("无法从构建产物中提取 Userscript 元数据头。");
  }

  const metaContent = `${metaBlockMatch[0]}\n`;

  await writeFile(distMetaPath, metaContent, "utf8");

  console.log(`release synced:
  user: ${path.relative(repoRoot, distUserScriptPath)}
  meta: ${path.relative(repoRoot, distMetaPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
