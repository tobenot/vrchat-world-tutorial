import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// Static regression checks complement, but do not replace, chapter-by-chapter review.
const root = 'src/content/docs';
async function walk(dir) {
  const result = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) result.push(...await walk(f));
    else if (f.endsWith('.mdx')) result.push(f);
  }
  return result;
}
const rules = [
  ['reader grading', /新手|硬核|菜鸟|小白|困扰新手/],
  ['unsupported ranking', /最常见|头号|大部分世界|绝大多数世界/],
  ['future chapter preview', /下一章(?:会|将|里|中|再)|后[面续](?:的)?(?:第[一二三四五六七八九十\d]+)?章|(?:我们|本书)(?:将|会)在.+(?:章|部).+(?:讲|学|做|介绍)|(?:留到|等到).+(?:章|部).+(?:讲|学|做)/],
  ['removed AI tutorial entry', /(?:ai-partner|ai-workflow|ai-collaboration|ai-assistant|working-with-ai|using-ai)(?:\/|\b)/i],
  ['incorrect pickup default', /Orientation.{0,10}Auto Hold.{0,20}Any/],
];
let failures = 0;
let aiMentions = 0;
const files = await walk(root);
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const [index, line] of source.split(/\r?\n/).entries()) {
    for (const [label, pattern] of rules) {
      if (pattern.test(line) && !(label === 'future chapter preview' && /不预告后续章节/.test(line))) {
        console.error(`${file}:${index + 1}: ${label}: ${line.trim()}`);
        failures++;
      }
    }
    if (/\bAI\b|ChatGPT|Claude|DeepWiki|提示词|人工智能/i.test(line)) {
      aiMentions++;
      console.log(`SOURCE REVIEW ${file}:${index + 1}: ${line.trim()}`);
    }
  }
}
console.log(`Checked ${files.length} MDX files; ${failures} regression matches; ${aiMentions} source/provenance mentions for manual review.`);
if (failures) process.exitCode = 1;
