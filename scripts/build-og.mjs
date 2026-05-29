// 把 public/social-card.svg 渲染为 1200×630 的 PNG，写到 public/social-card.png。
// 为什么要这一步：
//   · OG / Twitter Card 多数平台（Facebook / Twitter / Discord / 微信 / QQ）不支持 SVG
//   · OG 协议要求 og:image 是稳定光栅图（PNG/JPG）
//   · SVG 由设计师/作者手改，PNG 由本脚本派生，不入 git 也行（这里选择入 git，
//     避免 Cloudflare Pages 构建时还要装 sharp 的二进制依赖问题）
//
// 触发时机：作为 npm `prebuild` 钩子自动跑；也可以手动 `node scripts/build-og.mjs`。
//
// 幂等：如果 PNG 已存在且 mtime 比 SVG 新，直接跳过。

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync, statSync } from 'node:fs';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const svgPath = resolve(projectRoot, 'public/social-card.svg');
const pngPath = resolve(projectRoot, 'public/social-card.png');

async function main() {
  if (!existsSync(svgPath)) {
    console.warn('[build-og] social-card.svg 不存在，跳过 PNG 生成');
    return;
  }

  if (existsSync(pngPath)) {
    const svgMtime = statSync(svgPath).mtimeMs;
    const pngMtime = statSync(pngPath).mtimeMs;
    if (pngMtime >= svgMtime) {
      console.log('[build-og] social-card.png 已是最新，跳过');
      return;
    }
  }

  await sharp(svgPath, { density: 192 })
    .resize(1200, 630, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(pngPath);

  console.log('[build-og] 已生成 public/social-card.png (1200x630)');
}

main().catch((err) => {
  console.error('[build-og] 失败：', err);
  process.exit(1);
});
