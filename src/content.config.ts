import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      // 教程书元数据：内容层次、阅读时间和章节摘要
      extend: z.object({
        // 内容层次描述章节范围，不用于评价读者能力
        difficulty: z.enum(['基础', '进阶', '专题']).optional(),
        // 预估手把手跟做时间，单位分钟
        estimatedMinutes: z.number().int().positive().optional(),
        // 是否要求 VRChat SDK 已就绪
        requiresSDK: z.boolean().default(false),
        // 章节类型：动手章 / 理解章 / 创作者视角 / 部入口页
        chapterType: z.enum(['hands-on', 'concept', 'creator-view', 'part-intro']).optional(),
        // 给 RSS / 卡片用的简短摘要，独立于 description
        summary: z.string().optional(),
      }),
    }),
  }),
};
