// per-page 动态 OG 卡生成器（正式版）
//
// 它做的事：
//   1. 用 satori（JSX-like → SVG）把每一页（按 frontmatter title/description/章节/难度/时长）
//      渲染成一张专属的 1200×630 OG 卡片。
//   2. 用 @resvg/resvg-js 把 SVG 转 PNG，写到 public/og/<flat-slug>.png。
//   3. 把首页卡同时复制成 public/social-card.png，作为兜底（旧链接、缺图回退）。
//
// 触发：作为 npm `prebuild` 钩子自动执行；也能 `node scripts/build-og.mjs` 手动跑。
//
// 依赖：satori、@resvg/resvg-js、gray-matter、glob（已装为 devDependency）。
//
// 字体：思源黑体 NotoSansSC（Regular + Bold），首次跑会从 GitHub raw 拉 OTF
//       到 scripts/.cache/og-fonts/，下次直接复用，缓存文件已 .gitignore。
//
// 增量：mdx 源文件 mtime 比目标 PNG 旧时跳过，加快本地反复 build。

import { readFile, writeFile, mkdir, stat, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import matter from 'gray-matter';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// ============================== 路径常量 ==============================

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const docsDir = resolve(projectRoot, 'src/content/docs');
const outDir = resolve(projectRoot, 'public/og');
const fontDir = resolve(__dirname, '.cache/og-fonts');
const fallbackPng = resolve(projectRoot, 'public/social-card.png');
const fallbackSvg = resolve(projectRoot, 'public/social-card.svg');

// ============================== 字体 ==============================

const FONTS = [
  {
    name: 'NotoSansCJKsc-Regular.otf',
    weight: 400,
    url: 'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf',
  },
  {
    name: 'NotoSansCJKsc-Bold.otf',
    weight: 700,
    url: 'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Bold.otf',
  },
];

async function ensureFonts() {
  if (!existsSync(fontDir)) await mkdir(fontDir, { recursive: true });
  const loaded = [];
  for (const f of FONTS) {
    const local = join(fontDir, f.name);
    if (!existsSync(local)) {
      console.log(`[build-og] downloading ${f.name} (~9MB) ...`);
      const res = await fetch(f.url);
      if (!res.ok) throw new Error(`fetch ${f.url}: HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(local, buf);
      console.log(`[build-og] saved ${(buf.length / 1024 / 1024).toFixed(1)}MB → ${local}`);
    }
    loaded.push({
      name: 'Noto Sans SC',
      data: await readFile(local),
      weight: f.weight,
      style: 'normal',
    });
  }
  return loaded;
}

// ============================== URL / 文件名映射 ==============================

// `'index.mdx'`              → `/`
// `'preface.mdx'`            → `/preface/`
// `'getting-started/index.mdx'`     → `/getting-started/`
// `'getting-started/curiosity.mdx'` → `/getting-started/curiosity/`
function pagePathFromRel(rel) {
  const noExt = rel.replace(/\\/g, '/').replace(/\.mdx$/, '');
  if (noExt === 'index') return '/';
  if (noExt.endsWith('/index')) return '/' + noExt.slice(0, -'/index'.length) + '/';
  return '/' + noExt + '/';
}

// `/` → 'index.png'
// `/getting-started/curiosity/` → 'getting-started__curiosity.png'
function ogFileName(urlPath) {
  if (urlPath === '/') return 'index.png';
  const trimmed = urlPath.replace(/^\/|\/$/g, '');
  return trimmed.replace(/\//g, '__') + '.png';
}

// ============================== 模板元数据 ==============================

const PART_LABELS = {
  'getting-started': '第一部 · 先站进去再说',
  'workbench': '第二部 · 认识你的工作台',
};

const CHAPTER_TYPE_LABELS = {
  'hands-on': '动手章',
  'concept': '概念章',
  'part-intro': '导言',
  'reading-only': '阅读章',
  'walkthrough': '走查',
};

function deriveMeta(rel, data) {
  const r = rel.replace(/\\/g, '/');
  const top = r.includes('/') ? r.split('/')[0] : null;
  const isHome = r === 'index.mdx';
  return {
    title: data.title ?? '',
    description: data.description ?? data.summary ?? '',
    part: top && PART_LABELS[top] ? PART_LABELS[top] : null,
    difficulty: data.difficulty ?? null,
    minutes: data.estimatedMinutes ?? null,
    chapterType: data.chapterType ?? null,
    isHome,
  };
}

// ============================== Satori 模板 ==============================

const COLORS = {
  fg: '#e6f4f1',
  muted: '#9bb6b1',
  accent: '#1fd2c4',
  bgFrom: '#0a1f1c',
  bgTo: '#052828',
  divider: 'rgba(31, 210, 196, 0.25)',
};

const SITE_FOOTER = '萝北来信 · vrchat-world-tutorial.pages.dev';
const BOOK_NAME = '你的第一个 VRChat 世界';
// 首页专用：主标题分两行呈现「正书名 + 副标题」，避免和右下角书名重复
const HOME_TITLE_LINES = ['你的第一个 VRChat 世界', '从零到发布的完全手册'];
// 首页徽章：站点级元信息，不与左上 eyebrow（面向新手 · 中文教程）撞语义
// 阅读邀请：低门槛承诺（免费）+ 易读承诺（浅显易懂）+ 完成度承诺（从零到发布）
const HOME_BADGES = ['免费阅读', '浅显易懂', '从零到发布'];

function clip(s, max) {
  if (!s) return '';
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

// 返回 satori 接受的 React-like 树（用纯对象就行，不需要 react/jsx）
function template(meta) {
  // 标题字号根据长度自适应
  const titleLen = meta.title?.length ?? 0;
  const titleFontSize = titleLen > 22 ? 60 : titleLen > 14 ? 72 : 84;

  // 顶部小标签
  const eyebrow = meta.isHome
    ? '面向新手 · 中文教程'
    : meta.part ?? BOOK_NAME;

  // 徽章
  const badges = [];
  if (meta.isHome) {
    // 首页直接使用站点级徽章组，避免和 eyebrow 重复
    badges.push(...HOME_BADGES);
  } else {
    if (meta.difficulty) badges.push(`难度：${meta.difficulty}`);
    if (meta.minutes) badges.push(`约 ${meta.minutes} 分钟`);
    if (meta.chapterType && CHAPTER_TYPE_LABELS[meta.chapterType]) {
      badges.push(CHAPTER_TYPE_LABELS[meta.chapterType]);
    }
    if (!badges.length) badges.push('面向新手 · 从零讲起');
  }

  // 主标题块：首页双行（正书名 + 副标题），子页单行
  const titleNode = meta.isHome
    ? {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '32px',
            maxWidth: '1020px',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '78px',
                  fontWeight: 700,
                  lineHeight: 1.12,
                  color: COLORS.fg,
                  display: 'flex',
                },
                children: HOME_TITLE_LINES[0],
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '52px',
                  fontWeight: 700,
                  lineHeight: 1.18,
                  marginTop: '14px',
                  color: COLORS.accent,
                  display: 'flex',
                },
                children: `——${HOME_TITLE_LINES[1]}`,
              },
            },
          ],
        },
      }
    : {
        type: 'div',
        props: {
          style: {
            fontSize: `${titleFontSize}px`,
            fontWeight: 700,
            lineHeight: 1.18,
            marginBottom: '32px',
            color: COLORS.fg,
            display: 'flex',
            maxWidth: '1020px',
          },
          children: clip(meta.title || BOOK_NAME, 36),
        },
      };

  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `linear-gradient(135deg, ${COLORS.bgFrom} 0%, ${COLORS.bgTo} 100%)`,
        fontFamily: '"Noto Sans SC"',
        color: COLORS.fg,
        position: 'relative',
        padding: '64px 72px 56px 86px',
      },
      children: [
        // 左侧主题色竖条
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '14px',
              backgroundColor: COLORS.accent,
            },
          },
        },
        // 右上角点缀（细线呼应教学手册感）
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              right: '72px',
              top: '64px',
              fontSize: '20px',
              color: COLORS.muted,
              letterSpacing: '6px',
              display: 'flex',
            },
            children: 'VRCHAT · UNITY · UDONSHARP',
          },
        },
        // 顶部章节标签 / Eyebrow
        {
          type: 'div',
          props: {
            style: {
              fontSize: '26px',
              color: COLORS.accent,
              letterSpacing: '3px',
              marginBottom: '28px',
              fontWeight: 400,
              display: 'flex',
            },
            children: eyebrow,
          },
        },
        // 主标题（首页：两行书名+副标题；子页：单行章节名）
        titleNode,
        // 副标题 / description
        {
          type: 'div',
          props: {
            style: {
              fontSize: '28px',
              lineHeight: 1.5,
              color: COLORS.muted,
              display: 'flex',
              maxWidth: '1020px',
              fontWeight: 400,
            },
            children: clip(meta.description || '从零到发布的完全手册', 90),
          },
        },
        // 弹性占位
        {
          type: 'div',
          props: { style: { flex: 1, display: 'flex' } },
        },
        // 底部信息栏
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: `1px solid ${COLORS.divider}`,
              paddingTop: '22px',
            },
            children: [
              // 左：徽章组
              {
                type: 'div',
                props: {
                  style: { display: 'flex', gap: '14px' },
                  children: badges.map((label) => ({
                    type: 'div',
                    props: {
                      style: {
                        border: `1px solid ${COLORS.accent}`,
                        borderRadius: '999px',
                        padding: '8px 20px',
                        fontSize: '22px',
                        color: COLORS.accent,
                        display: 'flex',
                      },
                      children: label,
                    },
                  })),
                },
              },
              // 右：署名区（首页：只留站点+作者；子页：书名 + 站点+作者）
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  },
                  children: meta.isHome
                    ? [
                        // 首页：完整书名已在主标题区呈现，这里只放作者署名
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '22px',
                              color: COLORS.muted,
                              display: 'flex',
                            },
                            children: SITE_FOOTER,
                          },
                        },
                      ]
                    : [
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '24px',
                              color: COLORS.fg,
                              fontWeight: 700,
                              display: 'flex',
                            },
                            children: BOOK_NAME,
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '20px',
                              color: COLORS.muted,
                              marginTop: '6px',
                              display: 'flex',
                            },
                            children: SITE_FOOTER,
                          },
                        },
                      ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ============================== 主流程 ==============================

async function renderPng(meta, fonts) {
  const tree = template(meta);
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: COLORS.bgFrom,
  })
    .render()
    .asPng();
  return { svg, png };
}

async function main() {
  const t0 = Date.now();
  console.log('[build-og] start');

  const fonts = await ensureFonts();
  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

  const files = await glob('**/*.mdx', {
    cwd: docsDir,
    ignore: ['dev/**'],
    posix: true,
  });
  console.log(`[build-og] ${files.length} mdx pages discovered`);

  let made = 0;
  let skipped = 0;
  let drafts = 0;

  for (const rel of files) {
    const abs = join(docsDir, rel);
    const raw = await readFile(abs, 'utf-8');
    const { data } = matter(raw);

    if (data.draft) {
      drafts++;
      continue;
    }

    const urlPath = pagePathFromRel(rel);
    const fileName = ogFileName(urlPath);
    const outPath = join(outDir, fileName);

    if (existsSync(outPath)) {
      const srcMt = (await stat(abs)).mtimeMs;
      const dstMt = (await stat(outPath)).mtimeMs;
      let fresh = dstMt >= srcMt;
      // 首页除了 PNG 还要落盘 social-card.svg，缺一不可
      if (fresh && rel === 'index.mdx') {
        fresh = existsSync(fallbackSvg) && (await stat(fallbackSvg)).mtimeMs >= srcMt;
      }
      if (fresh) {
        skipped++;
        continue;
      }
    }

    const meta = deriveMeta(rel, data);
    try {
      const { svg, png } = await renderPng(meta, fonts);
      await writeFile(outPath, png);
      // 首页 satori SVG 一并落盘到 public/social-card.svg
      // —— 用作向量兜底，色彩 / 排版与 PNG 完全一致
      if (meta.isHome) {
        await writeFile(fallbackSvg, svg, 'utf-8');
        console.log('[build-og]   ✔ /social-card.svg updated (vector mirror)');
      }
      made++;
      console.log(`[build-og]   ✔ ${urlPath} → og/${fileName}`);
    } catch (err) {
      console.error(`[build-og]   ✗ ${urlPath} failed:`, err.message);
      throw err;
    }
  }

  // 兜底卡：复制首页卡到 /social-card.png（旧链接 / 缺图回退）
  const homePng = join(outDir, 'index.png');
  if (existsSync(homePng)) {
    await copyFile(homePng, fallbackPng);
    console.log('[build-og] fallback /social-card.png updated from /og/index.png');
  }

  const cost = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(
    `[build-og] done in ${cost}s — made=${made}, skipped=${skipped}, drafts=${drafts}`,
  );
}

main().catch((err) => {
  console.error('[build-og] FATAL:', err);
  process.exit(1);
});
