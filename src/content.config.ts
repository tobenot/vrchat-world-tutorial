import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      // 教程书专属字段，方便后续做难度筛选、阅读进度、章节摘要
      extend: z.object({
        // 难度档：让读者一眼判断这章要不要硬扛
        difficulty: z.enum(['新手', '进阶', '硬核']).optional(),
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
