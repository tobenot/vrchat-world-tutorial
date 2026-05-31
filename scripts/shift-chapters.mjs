/**
 * scripts/shift-chapters.mjs
 *
 * 整体顺移章号：把章号 ≥ FROM 的全部 +BY（BY 可以为负数）。
 *
 * 处理范围（一遍扫描，幂等）：
 *   1. frontmatter `title:` —— "5. xxx" → "6. xxx"
 *   2. 正文里的「第 N 章」（不包括代码块和行内代码）
 *   3. <LinkCard title="N. xxx" ... /> 的点号开头形式
 *
 *   markdown 链接 `[第 N 章 ...](slug)` 与 LinkCard `title="第 N 章 ..."` 形式
 *   会被 (2) 直接命中（"第 N 章" 子串替换），无需单独处理。
 *
 * 用法：
 *   node scripts/shift-chapters.mjs --from 5 --by +1            # 预览
 *   node scripts/shift-chapters.mjs --from 5 --by +1 --write    # 写入
 *
 *   --write 写入完成后会自动跑一次 fix:chapters 同步链接，
 *   再跑 check:chapters:strict 验证一致性。
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS_DIR = join(ROOT, 'src/content/docs');

// ---------- 参数 ----------
function parseArgs() {
  const args = process.argv.slice(2);
  let from = null;
  let by = null;
  let write = false;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--from') from = args[++i];
    else if (a === '--by') by = args[++i];
    else if (a === '--write') write = true;
    else if (a === '-h' || a === '--help') {
      console.log('node scripts/shift-chapters.mjs --from N --by +K [--write]');
      process.exit(0);
    }
  }
  if (from === null || by === null) {
    console.error('缺少必须参数：--from N --by +K');
    console.error('  例如：node scripts/shift-chapters.mjs --from 5 --by +1 --write');
    process.exit(1);
  }
  const fromNum = Number(from);
  const byNum = Number(by);
  if (!Number.isFinite(fromNum) || !Number.isFinite(byNum) || byNum === 0) {
    console.error('--from 必须是数字；--by 必须是非零数字');
    process.exit(1);
  }
  return { from: fromNum, by: byNum, write };
}

// ---------- 文件遍历 ----------
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      out.push(...(await walk(p)));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      out.push(p);
    }
  }
  return out;
}

// ---------- 把代码块 / 行内代码护住 ----------
function splitProtected(text) {
  const segments = [];
  const re = /(```[\s\S]*?```|`[^`\n]+`)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segments.push({ kind: 'text', s: text.slice(last, m.index) });
    segments.push({ kind: 'code', s: m[0] });
    last = re.lastIndex;
  }
  if (last < text.length) segments.push({ kind: 'text', s: text.slice(last) });
  return segments;
}

// ---------- 替换工具 ----------
const CHAPTER_RE = /第\s*(\d+(?:\.\d+)?)\s*章/g;
const LINK_CARD_RE = /<LinkCard\s+([^>]*?)\/?>/g;

function shouldShift(numStr, from) {
  const n = Number(numStr);
  return Number.isFinite(n) && n >= from;
}

function shiftFrontmatter(content, from, by, hits) {
  const fmMatch = content.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)/);
  if (!fmMatch) return content;
  const [whole, head, inner, tail] = fmMatch;
  const newInner = inner.replace(
    /^(\s*title:\s*)(["']?)(\d+(?:\.\d+)?)(\s*[.．、]\s+)([^\r\n]+?)\2(\s*)$/m,
    (line, p, q, n, sep, rest, trail) => {
      if (!shouldShift(n, from)) return line;
      const newN = Number(n) + by;
      hits.push({ kind: 'frontmatter', from: n, to: String(newN) });
      return `${p}${q}${newN}${sep}${rest}${q}${trail}`;
    },
  );
  if (newInner === inner) return content;
  return content.replace(whole, head + newInner + tail);
}

function shiftBodyTextSeg(text, from, by, hits) {
  // 1) 「第 N 章」—— 链接文本 / LinkCard "第 N 章" 标题 / 散文 全部一锅扫
  let out = text.replace(CHAPTER_RE, (m, n) => {
    if (!shouldShift(n, from)) return m;
    const newN = Number(n) + by;
    hits.push({ kind: 'chapter', from: n, to: String(newN) });
    return `第 ${newN} 章`;
  });

  // 2) <LinkCard title="N. xxx" ... />  点号形式
  out = out.replace(LINK_CARD_RE, (full, attrs) => {
    const tm = attrs.match(/title="((\d+(?:\.\d+)?)(\s*[.．、]\s+[^"]*))"/);
    if (!tm) return full;
    const oldTitle = tm[1];
    const n = tm[2];
    if (!shouldShift(n, from)) return full;
    const newN = Number(n) + by;
    const newTitle = String(newN) + tm[3];
    hits.push({ kind: 'linkcard-dot', from: n, to: String(newN) });
    return full.replace(`title="${oldTitle}"`, `title="${newTitle}"`);
  });

  return out;
}

// ---------- 主流程 ----------
async function main() {
  const { from, by, write } = parseArgs();
  const sign = by >= 0 ? '+' : '';
  console.log(`shift-chapters: 章号 ≥ ${from} 全部 ${sign}${by}`);
  console.log(`模式: ${write ? '写入 (--write)' : '预览'}\n`);

  const files = await walk(DOCS_DIR);
  let changedFiles = 0;
  let totalHits = 0;

  for (const f of files) {
    const original = await readFile(f, 'utf8');
    const hits = [];

    // 切开 frontmatter 与 body
    const fmMatch = original.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n?)/);
    const headLen = fmMatch ? fmMatch[1].length : 0;
    let head = fmMatch ? fmMatch[1] : '';
    const body = original.slice(headLen);

    // 1) frontmatter
    if (head) head = shiftFrontmatter(head, from, by, hits);

    // 2) body：在代码块外做替换
    const segs = splitProtected(body);
    let newBody = '';
    for (const seg of segs) {
      newBody += seg.kind === 'code' ? seg.s : shiftBodyTextSeg(seg.s, from, by, hits);
    }

    if (hits.length === 0) continue;
    totalHits += hits.length;
    changedFiles++;

    console.log(`📄 ${relative(ROOT, f)}  (${hits.length} 处)`);
    const summary = hits.reduce((acc, h) => {
      const key = `  [${h.kind}] 第 ${h.from} 章 → 第 ${h.to} 章`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    for (const [k, v] of Object.entries(summary)) console.log(`${k}  × ${v}`);

    if (write) await writeFile(f, head + newBody, 'utf8');
  }

  console.log('\n' + '='.repeat(50));
  console.log(`受影响文件: ${changedFiles}`);
  console.log(`总替换数  : ${totalHits}`);

  if (!write) {
    console.log('\n这是预览模式。加 --write 实际写入：');
    console.log(`  node scripts/shift-chapters.mjs --from ${from} --by ${sign}${by} --write`);
    return;
  }

  // 写入完毕：跑 fix:chapters 同步残漏的链接，再用 strict 验一遍
  console.log('\n→ 自动调用 fix:chapters 同步链接（兜底）……');
  const fix = spawnSync(
    process.execPath,
    [join(ROOT, 'scripts/check-chapter-refs.mjs'), '--write'],
    { stdio: 'inherit' },
  );
  if (fix.status !== 0) {
    console.error('fix:chapters 失败');
    process.exit(fix.status || 1);
  }

  console.log('\n→ 自动调用 check:chapters:strict 验证……');
  const check = spawnSync(
    process.execPath,
    [join(ROOT, 'scripts/check-chapter-refs.mjs'), '--strict'],
    { stdio: 'inherit' },
  );
  process.exit(check.status || 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
