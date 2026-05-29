/**
 * fix-quotes.mjs
 * 批量将 .md 文件中的弯引号（"" ""）替换为中文直角引号（「」『』）。
 *
 * 规则：
 * - 跳过行内代码（`...`）和代码块（```...```）中的内容
 * - 外层弯引号 → 「」
 * - 嵌套弯引号 → 『』
 * - 英文双引号 "..." 在中文语境中也替换（前后有中文字符时）
 *
 * 用法：
 *   node scripts/fix-quotes.mjs          # 预览模式（只打印变更，不写入）
 *   node scripts/fix-quotes.mjs --write  # 写入模式（实际修改文件）
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const WRITE = process.argv.includes("--write");

// 递归获取所有 .md 文件
async function getMdFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      files.push(...(await getMdFiles(full)));
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

/**
 * 将文本按代码块和行内代码分段，只对非代码段做引号替换。
 */
function replaceQuotes(text) {
  // 把文本拆成：代码块 / 行内代码 / 普通文本 三类片段
  // 代码块：```...```（可能跨行）
  // 行内代码：`...`
  const segments = [];
  const pattern = /(```[\s\S]*?```|`[^`\n]+`)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: "code", content: match[0] });
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }

  // 只对 text 类型片段做替换
  const result = segments
    .map((seg) => {
      if (seg.type === "code") return seg.content;
      return convertQuotes(seg.content);
    })
    .join("");

  return result;
}

/**
 * 核心替换逻辑：
 * 1. 先处理中文弯引号 "" "" → 「」/ 『』（嵌套）
 * 2. 再处理中文语境中的英文双引号 "..." → 「」
 */
function convertQuotes(text) {
  // 第一步：处理弯引号（支持嵌套）
  // \u201C = "  \u201D = "
  text = replacePaired(text, "\u201C", "\u201D");

  // 第二步：处理中文语境中的英文直双引号
  // 匹配模式：中文字符/标点 后面紧跟 "内容"，或 "内容" 后面紧跟中文字符/标点
  // 用宽松规则：只要引号内含有中文字符就替换
  text = replaceAsciiQuotesInChinese(text);

  return text;
}

/**
 * 将配对的弯引号替换为直角引号，支持嵌套。
 * 外层 → 「」，内层 → 『』
 */
function replacePaired(text, open, close) {
  let depth = 0;
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === open) {
      depth++;
      result += depth === 1 ? "「" : "『";
    } else if (ch === close) {
      result += depth === 1 ? "」" : "』";
      depth = Math.max(0, depth - 1);
    } else {
      result += ch;
    }
  }
  return result;
}

/**
 * 处理英文双引号在中文语境中的使用。
 * 规则：如果一对 "..." 的前一个字符或后一个字符是中文，且引号内含中文，则替换。
 * 不替换代码示例中的纯英文引号（如 git commit -m "message"）。
 */
function replaceAsciiQuotesInChinese(text) {
  // 找到所有配对的 ASCII 双引号
  const CJK = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;
  const quoteChar = '"';
  const positions = [];

  for (let i = 0; i < text.length; i++) {
    if (text[i] === quoteChar) {
      positions.push(i);
    }
  }

  // 每两个配对
  if (positions.length < 2) return text;

  const replacements = []; // [{start, end, inner}]

  for (let i = 0; i < positions.length - 1; i += 2) {
    const start = positions[i];
    const end = positions[i + 1];
    const inner = text.slice(start + 1, end);

    // 判断是否在中文语境中
    const charBefore = start > 0 ? text[start - 1] : "";
    const charAfter = end < text.length - 1 ? text[end + 1] : "";
    const hasCJKContext = CJK.test(charBefore) || CJK.test(charAfter);
    const hasCJKInside = CJK.test(inner);

    if (hasCJKContext || hasCJKInside) {
      replacements.push({ start, end, inner });
    }
  }

  // 从后往前替换，避免偏移
  let result = text;
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { start, end, inner } = replacements[i];
    result = result.slice(0, start) + "「" + inner + "」" + result.slice(end + 1);
  }

  return result;
}

// ========== 主流程 ==========
async function main() {
  const files = await getMdFiles(ROOT);
  let totalChanges = 0;

  for (const file of files) {
    const original = await readFile(file, "utf-8");
    const converted = replaceQuotes(original);

    if (converted !== original) {
      totalChanges++;
      const rel = relative(ROOT, file);
      console.log(`\n📝 ${rel}`);

      // 显示变更的行
      const origLines = original.split("\n");
      const convLines = converted.split("\n");
      for (let i = 0; i < origLines.length; i++) {
        if (origLines[i] !== convLines[i]) {
          console.log(`   L${i + 1}:`);
          console.log(`   - ${origLines[i].trim()}`);
          console.log(`   + ${convLines[i].trim()}`);
        }
      }

      if (WRITE) {
        await writeFile(file, converted, "utf-8");
      }
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`共 ${totalChanges} 个文件有变更。`);
  if (!WRITE) {
    console.log(`这是预览模式。加 --write 参数实际写入文件：`);
    console.log(`  node scripts/fix-quotes.mjs --write`);
  } else {
    console.log(`已写入所有文件。`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
