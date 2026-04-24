import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

async function main() {
  const distDir = path.join(repoRoot, "dist");
  await mkdir(distDir, { recursive: true });

  const distFiles = await readdir(distDir);
  const userScriptFileName = distFiles.find((fileName) => fileName.endsWith(".user.js"));

  if (!userScriptFileName) {
    throw new Error("无法在 dist 目录中找到 .user.js 构建产物。");
  }

  const distUserScriptPath = path.join(distDir, userScriptFileName);
  const distMetaPath = path.join(distDir, userScriptFileName.replace(/\.user\.js$/, ".meta.js"));

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
