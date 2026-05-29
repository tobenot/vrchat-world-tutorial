import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const bookTitle = '你的第一个 VRChat 世界：从零到发布的完全手册';

export default defineConfig({
  site: 'https://vrchat-world-tutorial.pages.dev',
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },
  integrations: [

    starlight({
      title: bookTitle,
      description: '从零到发布的完全手册，写给新手的 VRChat 场景搭建与 Udon 开发指南。',
      favicon: '/favicon.png',
      customCss: ['./src/styles/custom.css'],
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#38bdf8' } },
        { tag: 'meta', attrs: { property: 'og:image', content: '/social-card.svg' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: '/social-card.svg' } },
      ],
      lastUpdated: true,

      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/tobenot/vrchat-world-tutorial',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/tobenot/vrchat-world-tutorial/edit/main/',
      },
      sidebar: [
        {
          label: '开始阅读',
          items: [
            { label: '前言：打开一扇门', link: '/preface/' },
          ],
        },
        {
          label: '第一部：先站进去再说',
          collapsed: false,
          items: [
            { label: '1. 一个玩家的好奇心', link: '/01-getting-started/01-curiosity/' },
            { label: '2. AI 是你的创作搭档', link: '/01-getting-started/02-ai-partner/' },
            { label: '3. 装好工具，准备出发', link: '/01-getting-started/03-tools/' },
            { label: '4. 你的第一个世界', link: '/01-getting-started/04-first-world/' },
          ],
        },
        {
          label: '附录',
          collapsed: true,
          items: [
            { label: '全书规划', link: '/book-plan/' },
            { label: '网站搭建与部署', link: '/deploy-guide/' },
          ],
        },
      ],
    }),
  ],
});
