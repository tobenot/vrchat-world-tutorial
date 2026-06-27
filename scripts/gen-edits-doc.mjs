import { execSync } from 'child_process';
import fs from 'fs';

const base = 'b7a5e7b';
let diff = execSync(`git diff ${base}..HEAD`, { encoding: 'utf8' });
const extra = execSync('git diff HEAD', { encoding: 'utf8' });
if (extra.trim()) diff += '\n' + extra;

const files = [];
let cur = null;
for (const line of diff.split(/\r?\n/)) {
	if (line.startsWith('diff --git ')) {
		const m = line.match(/ b\/(.*)$/);
		if (cur) files.push(cur);
		cur = { path: m ? m[1] : line, del: [], add: [], deleted: false };
		continue;
	}
	if (!cur) continue;
	if (line.startsWith('deleted file')) cur.deleted = true;
	if (line.startsWith('-') && !line.startsWith('---')) cur.del.push(line.slice(1));
	else if (line.startsWith('+') && !line.startsWith('+++')) cur.add.push(line.slice(1));
}
if (cur) files.push(cur);

let md = `# 阅读反馈改动对照 · 2026-06-27

基准：\`${base}\`（fact check）→ \`HEAD\` + 工作区未提交改动。

- 反馈清单与待讨论：[\`reader-feedback-2026-06-27.md\`](./reader-feedback-2026-06-27.md)
- 完整 unified diff（\`b7a5e7b..HEAD\`）：[\`_raw-diff-2026-06-27.patch\`](./_raw-diff-2026-06-27.patch)
- \`npm install\` + \`npm run build\`：已通过（77 pages）

下文按文件列出 **改前**（删除行）与 **改后**（新增行）。整段删除的 AI 章节等长 diff 会截断，全文以 patch 为准。

---

`;

for (const f of files) {
	md += `## ${f.path}${f.deleted ? '（整文件删除）' : ''}\n\n`;
	if (f.deleted) {
		md += `**改前**：\`git show ${base}:${f.path}\`\n\n**改后**：文件已删除。\n\n---\n\n`;
		continue;
	}
	const delText = f.del.join('\n').trim();
	const addText = f.add.join('\n').trim();
	if (!delText && !addText) {
		md += '（无正文 diff）\n\n---\n\n';
		continue;
	}
	const cap = (text, label) => {
		if (!text) return `**${label}**：（无）\n\n`;
		if (text.length > 6000) {
			return `**${label}**（节选，全文见 patch，共 ${text.length} 字）\n\n\`\`\`\n${text.slice(0, 2500)}\n…\n\`\`\`\n\n`;
		}
		return `**${label}**\n\n\`\`\`\n${text}\n\`\`\`\n\n`;
	};
	md += cap(delText, '改前');
	md += cap(addText, '改后');
	md += '---\n\n';
}

md += `## 本轮新增、不在 git diff 基准内的文件

| 文件 | 说明 |
|------|------|
| \`.codebuddy/rules/reader-amendments.mdc\` | 禁止预告 / 如果句式 / 不讲 AI 协作 |
| \`design/reader-feedback-2026-06-27.md\` | 修改 list + 待讨论 |
| \`design/edits-2026-06-27-before-after.md\` | 本文件 |
| \`scripts/gen-edits-doc.mjs\` | 生成本文件的脚本 |

`;

fs.writeFileSync('design/edits-2026-06-27-before-after.md', md);
console.log(`OK: ${files.length} files, ${md.length} chars`);
