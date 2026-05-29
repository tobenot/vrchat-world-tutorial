import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const docs = await getCollection('docs', ({ data }) => !data.draft);

  // 排序：按文件 id（前缀 01-, 02- 已经天然有序）
  const sorted = docs.sort((a, b) => a.id.localeCompare(b.id));

  return rss({
    title: '你的第一个 VRChat 世界：从零到发布的完全手册',
    description: '面向新手的 VRChat 场景搭建与 Udon 开发指南，每章发布同步推送。',
    site: context.site,
    items: sorted.map((doc) => ({
      title: doc.data.title,
      pubDate: doc.data.lastUpdated instanceof Date ? doc.data.lastUpdated : new Date(),
      description: doc.data.summary || doc.data.description || '',
      link: `/${doc.id}/`,
      categories: [
        doc.data.chapterType,
        doc.data.difficulty,
      ].filter(Boolean),
    })),
    customData: '<language>zh-cn</language>',
  });
}
