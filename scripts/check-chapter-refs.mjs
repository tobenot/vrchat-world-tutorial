/**
 * scripts/check-chapter-refs.mjs
 *
 * 检测并修复正文里写死的「第 N 章」引用。
 *
 * 思路：把每篇 .mdx 的 frontmatter `title` 当作唯一真源，
 *   - "1. 一个玩家的好奇心"        → num = 1
 *   - "2. VRChat 这家公司和这个引擎" → num = 2
 *   - "理解章 A：..." / "附录 A · ..." / "前言：..." → 跳过
 *
 * 然后扫描所有 .mdx 里的 markdown 链接 `[文字](url)`：
 *   - 如果文字含有「第 N 章」，并且 url 指向某个已知 slug，
 *     就把 N 与该页面真正的章号比较；
 *   - 不一致 ⇒ stale，可自动修；
 *   - 多章引用（如「第 27、28 章」）只报告；非链接里的散文引用仅在非严格模式报告。
 *
 * 还会顺手报：
 *   - 同一个 num 出现在多个 slug（章节编号冲突）
 *   - 链接目标 slug 在 docs 里找不到
 *
 * 用法：
 *   node scripts/check-chapter-refs.mjs            # 预览（默认）
 *   node scripts/check-chapter-refs.mjs --write    # 自动修可识别的链接
 *   node scripts/check-chapter-refs.mjs --strict   # 有 stale/conflict 时退出码 1（CI 用）
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS_DIR = join(ROOT, 'src/content/docs');

const WRITE = process.argv.includes('--write');
const STRICT = process.argv.includes('--strict');
const REPORT_PLAIN = !STRICT;

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

// ---------- frontmatter 解析（够用就行） ----------
function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const km = line.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.+?)\s*$/);
    if (km) {
      let v = km[2];
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      fm[km[1]] = v;
    }
  }
  return fm;
}

// ---------- 标题 → 章节号 ----------
function extractChapterNum(title) {
  // "1. xxx" / "1.5 xxx" / "5. xxx" 都接受
  // 但不识别 "理解章 A：..." / "附录 A · ..." / "前言：..." / "第二部 · ..."
  const m =
    title.match(/^\s*(\d+(?:\.\d+)?)\s*[.．、]\s*(.+)$/) ||
    title.match(/^\s*(\d+(?:\.\d+)?)\s+(.+)$/);
  if (!m) return null;
  return m[1];
}

// ---------- 文件路径 → URL slug ----------
function fileToSlug(filePath) {
  let rel = relative(DOCS_DIR, filePath).replace(/\\/g, '/').replace(/\.(mdx|md)$/, '');
  if (rel.endsWith('/index')) rel = rel.slice(0, -('/index'.length));
  if (rel === 'index') rel = '';
  return rel === '' ? '/' : `/${rel}/`;
}

function normalizeUrl(url) {
  if (!url) return null;
  const noQH = url.split('#')[0].split('?')[0];
  if (!noQH.startsWith('/')) return null; // 外链、相对链跳过
  return noQH.endsWith('/') ? noQH : noQH + '/';
}

// ---------- 把代码块 / 行内代码护住 ----------
function splitProtected(text) {
  const segments = [];
  const re = /(```[\s\S]*?```|`[^`\n]+`)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last)
      segments.push({ kind: 'text', s: text.slice(last, m.index) });
    segments.push({ kind: 'code', s: m[0] });
    last = re.lastIndex;
  }
  if (last < text.length) segments.push({ kind: 'text', s: text.slice(last) });
  return segments;
}

// ---------- 正则 ----------
const CHAPTER_SINGLE = /第\s*(\d+(?:\.\d+)?)\s*章/;
const CHAPTER_MULTI =
  /第\s*\d+(?:\.\d+)?(?:\s*[、,，]\s*\d+(?:\.\d+)?)+\s*章/;
const MD_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
// 简易 LinkCard 识别：<LinkCard ... title="..." ... href="..." ... />
const LINK_CARD = /<LinkCard\s+([^>]*?)\/?>/g;
const ATTR = /(\w+)\s*=\s*"([^"]*)"/g;

// ---------- 主流程 ----------
async function main() {
  const files = await walk(DOCS_DIR);

  // 1. 建 slug → 章节号 表
  const slugMap = new Map(); // slug -> { num, title, file }
  const numToSlugs = new Map(); // num -> [slug, slug]
  for (const f of files) {
    const content = await readFile(f, 'utf8');
    const fm = parseFrontmatter(content);
    if (!fm.title) continue;
    const num = extractChapterNum(fm.title);
    if (!num) continue;
    const slug = fileToSlug(f);
    slugMap.set(slug, { num, title: fm.title, file: relative(ROOT, f) });
    if (!numToSlugs.has(num)) numToSlugs.set(num, []);
    numToSlugs.get(num).push(slug);
  }

  // 2. 报告章节编号冲突（同一个 num 被两个文件用了）
  const conflicts = [...numToSlugs.entries()].filter(([, ss]) => ss.length > 1);
  if (conflicts.length) {
    console.log('⚠️  章节编号冲突（多个文件 title 用了相同的章号）：');
    for (const [num, ss] of conflicts) {
      console.log(`   第 ${num} 章 出现在：`);
      for (const s of ss) {
        console.log(`     - ${slugMap.get(s).file}  (${slugMap.get(s).title})`);
      }
    }
    console.log('');
  }

  // 3. 扫描每个文件
  let stale = 0;
  let multi = 0;
  let plain = 0;
  let orphan = 0;
  let filesChanged = 0;

  for (const f of files) {
    const original = await readFile(f, 'utf8');
    const segs = splitProtected(original);
    const reports = [];
    let edited = '';
    let changed = false;

    for (const seg of segs) {
      if (seg.kind === 'code') {
        edited += seg.s;
        continue;
      }

      let s = seg.s;

      // 3.1 markdown 链接
      s = s.replace(MD_LINK, (full, text, url) => {
        if (!CHAPTER_SINGLE.test(text)) return full;
        if (CHAPTER_MULTI.test(text)) {
          multi++;
          reports.push({ type: 'multi', text, url });
          return full;
        }
        const claimed = text.match(CHAPTER_SINGLE)[1];
        const norm = normalizeUrl(url);
        if (!norm) return full;
        const target = slugMap.get(norm);
        if (!target) {
          orphan++;
          reports.push({ type: 'orphan', text, url });
          return full;
        }
        if (claimed === target.num) return full;
        stale++;
        const newText = text.replace(CHAPTER_SINGLE, `第 ${target.num} 章`);
        const after = `[${newText}](${url})`;
        reports.push({
          type: 'fix-link',
          before: full,
          after,
          claimed,
          actual: target.num,
        });
        if (WRITE) {
          changed = true;
          return after;
        }
        return full;
      });

      // 3.2 LinkCard JSX
      s = s.replace(LINK_CARD, (full, attrs) => {
        const map = {};
        ATTR.lastIndex = 0;
        let am;
        while ((am = ATTR.exec(attrs)) !== null) map[am[1]] = am[2];
        if (!map.title || !map.href) return full;
        const norm = normalizeUrl(map.href);
        if (!norm) return full;

        // 路径 A：title 含「第 N 章」——把它当成"自称是章引用"，找不到 slug 就 orphan
        if (CHAPTER_SINGLE.test(map.title)) {
          if (CHAPTER_MULTI.test(map.title)) {
            multi++;
            reports.push({ type: 'multi', text: map.title, url: map.href });
            return full;
          }
          const claimed = map.title.match(CHAPTER_SINGLE)[1];
          const target = slugMap.get(norm);
          if (!target) {
            orphan++;
            reports.push({ type: 'orphan', text: map.title, url: map.href });
            return full;
          }
          if (claimed === target.num) return full;
          stale++;
          const newTitle = map.title.replace(CHAPTER_SINGLE, `第 ${target.num} 章`);
          const after = full.replace(`title="${map.title}"`, `title="${newTitle}"`);
          reports.push({
            type: 'fix-linkcard',
            before: full,
            after,
            claimed,
            actual: target.num,
          });
          if (WRITE) {
            changed = true;
            return after;
          }
          return full;
        }

        // 路径 B：title 是「N. 章名」点号形式（入口页 CardGrid 常用）
        // 不报 orphan：LinkCard 也常用作普通导航卡片，不一定每个都对应"章"
        const dotMatch = map.title.match(/^\s*(\d+(?:\.\d+)?)\s*[.．、]\s+/);
        if (dotMatch) {
          const claimed = dotMatch[1];
          const target = slugMap.get(norm);
          if (!target) return full;
          if (claimed === target.num) return full;
          stale++;
          const newTitle = map.title.replace(
            /^(\s*)(\d+(?:\.\d+)?)(\s*[.．、]\s+)/,
            (_, sp, _n, sep) => `${sp}${target.num}${sep}`,
          );
          const after = full.replace(`title="${map.title}"`, `title="${newTitle}"`);
          reports.push({
            type: 'fix-linkcard',
            before: full,
            after,
            claimed,
            actual: target.num,
          });
          if (WRITE) {
            changed = true;
            return after;
          }
          return full;
        }

        return full;
      });

      // 3.3 非链接里的「第 N 章」（链接里的已经处理了）
      // CI 严格模式不报告 plain，避免写作计划类文本刷屏；人工运行 check:chapters 时再审。
      if (REPORT_PLAIN) {
        const stripped = s.replace(MD_LINK, '').replace(LINK_CARD, '');
        const lines = stripped.split(/\r?\n/);
        for (const ln of lines) {
          const trimmed = ln.trim();
          if (!trimmed) continue;
          if (CHAPTER_SINGLE.test(trimmed) || CHAPTER_MULTI.test(trimmed)) {
            plain++;
            reports.push({ type: 'plain', line: trimmed });
          }
        }
      }

      edited += s;
    }

    if (reports.length) {
      console.log(`\n📄 ${relative(ROOT, f)}`);
      for (const r of reports) {
        if (r.type === 'fix-link' || r.type === 'fix-linkcard') {
          console.log(`  [stale] 第 ${r.claimed} 章 → 第 ${r.actual} 章`);
          console.log(`     - ${r.before}`);
          console.log(`     + ${r.after}`);
        } else if (r.type === 'multi') {
          console.log(`  [multi] 多章引用，需手工核对：${r.text}  →  ${r.url}`);
        } else if (r.type === 'orphan') {
          console.log(`  [orphan] 链接目标找不到：${r.text}  →  ${r.url}`);
        } else if (r.type === 'plain') {
          console.log(`  [plain] 非链接里的章节引用：${r.line}`);
        }
      }
    }

    if (WRITE && changed) {
      await writeFile(f, edited, 'utf8');
      filesChanged++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`stale 链接（可自动修）: ${stale}`);
  console.log(`多章引用（需手工）   : ${multi}`);
  console.log(`非链接里的章节引用    : ${plain}`);
  console.log(`找不到目标的链接      : ${orphan}`);
  console.log(`章节编号冲突          : ${conflicts.length}`);
  if (WRITE) {
    console.log(`已写入文件数          : ${filesChanged}`);
  } else if (STRICT) {
    console.log(`\n结构性章节引用检查完成。`);
  } else {
    console.log(`\n这是预览模式。加 --write 实际写入：`);
    console.log(`  node scripts/check-chapter-refs.mjs --write`);
  }

  // plain 只是叙述性章节号，可能是“第 39 章会展开”这类写作计划；
  // 默认 CI 只阻断能被机器可靠判断的结构性问题。
  if (STRICT && (stale > 0 || multi > 0 || orphan > 0 || conflicts.length > 0)) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
