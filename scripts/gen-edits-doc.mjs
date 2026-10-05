import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const value = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};
const baseArg = value('--base');
const output = value('--output');
if (!baseArg || !output) {
  console.error('Usage: node scripts/gen-edits-doc.mjs --base <commit> --output <report.md>');
  process.exit(1);
}
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
const base = git('rev-parse', '--verify', `${baseArg}^{commit}`).trim();
const head = git('rev-parse', 'HEAD').trim();
const diff = git('diff', '--no-ext-diff', base, '--');
const stat = git('diff', '--stat', base, '--');
const files = [];
let current;
for (const line of diff.split(/\r?\n/)) {
  if (line.startsWith('diff --git ')) {
    if (current) files.push(current);
    current = { path: line.match(/ b\/(.*)$/)?.[1] || line, lines: [] };
  } else if (current) current.lines.push(line);
}
if (current) files.push(current);

let report = `# 修改对照\n\n基准提交：${base}\n\n当前 HEAD：${head}\n\n范围为基准提交与当前工作区之间的已跟踪文件差异，包含已提交和未提交修改。不包含未跟踪文件。\n\n本脚本不运行构建，不声明 Unity、VRChat 或网站测试通过。测试结果请另附命令、环境和实际输出。\n\n## 文件统计\n\n\`\`\`text\n${stat.trim()}\n\`\`\`\n`;
for (const f of files) {
  const body = f.lines.join('\n').trim();
  const limit = 14000;
  report += `\n## ${f.path}\n\n`;
  if (body.length > limit) report += `以下为前 ${limit} 个字符；完整内容以另附 Git patch 为准。\n\n`;
  const excerpt = body.slice(0, limit);
  const longestFence = Math.max(2, ...Array.from(excerpt.matchAll(/`+/g), m => m[0].length));
  const fence = '`'.repeat(longestFence + 1);
  report += `${fence}diff\n${excerpt}\n${fence}\n`;
}
writeFileSync(output, report);
console.log(`Wrote ${output}: ${files.length} tracked files`);
