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
        { tag: 'meta', attrs: { name: 'theme-color', content: '#1fd2c4' } },
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
          label: '第二部：认识你的工作台',
          collapsed: false,
          items: [
            { label: '5. Unity 里的一切都是物体', link: '/02-workbench/05-gameobjects/' },
            { label: '6. 组件，给物体装能力', link: '/02-workbench/06-components/' },
            { label: '7. Prefab，把东西做成模具', link: '/02-workbench/07-prefabs/' },
            { label: '8. 材质和光的第一印象', link: '/02-workbench/08-materials-light/' },
            { label: '理解章 B：为什么一切都是空壳加零件', link: '/02-workbench/09-unity-philosophy/' },
            { label: '创作者视角：从模糊画面到具体清单', link: '/02-workbench/10-from-picture-to-list/' },
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
