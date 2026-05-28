import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const bookTitle = '你的第一个 VRChat 世界：从零到发布的完全手册';

export default defineConfig({
  site: 'https://vrchat-world-tutorial.pages.dev',
  integrations: [
    starlight({
      title: bookTitle,
      description: '从零到发布的完全手册，写给新手的 VRChat 场景搭建与 Udon 开发指南。',
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
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
            { label: '网站搭建与部署指南', link: '/deploy-guide/' },
            { label: '全书规划', link: '/book-plan/' },
          ],
        },
        {
          label: '第一部：先站进去再说',
          collapsed: false,
          items: [
            { label: '1. 一个玩家的好奇心', link: '/01-getting-started/01-curiosity/' },
          ],
        },
      ],
    }),
  ],
});
