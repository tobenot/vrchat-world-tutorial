import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidator from 'starlight-links-validator';

const bookTitle = '你的第一个 VRChat 世界：从零到发布的完全手册';
const siteUrl = 'https://vrchat-world-tutorial.pages.dev';

// 死链检查在构建时和 CHECK_LINKS=1 时启用；开发模式默认跳过，写作不被打断
const enableLinksValidator =
  process.env.CHECK_LINKS === '1' || process.env.NODE_ENV === 'production';

export default defineConfig({
  site: siteUrl,
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
        // RSS 自动发现：浏览器和阅读器都能识别
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/rss+xml',
            title: bookTitle,
            href: '/rss.xml',
          },
        },
      ],
      lastUpdated: true,

      social: [
        {
          icon: 'external',
          label: '博客',
          href: 'https://tobenot.top',
        },
        {
          icon: 'rss',
          label: 'RSS',
          href: '/rss.xml',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/tobenot/vrchat-world-tutorial/edit/main/',
      },
      // 组件覆盖：在默认 Footer 下追加阅读估算 / 反馈条 / Mermaid 运行时
      components: {
        Footer: './src/overrides/Footer.astro',
      },
      // 自动生成侧栏：写新章只需加文件，不再回来改配置
      sidebar: [
        {
          label: '开始阅读',
          items: [{ slug: 'preface' }],
        },
        {
          label: '第一部：先站进去再说',
          collapsed: false,
          autogenerate: { directory: '01-getting-started' },
        },
        {
          label: '第二部：认识你的工作台',
          collapsed: false,
          autogenerate: { directory: '02-workbench' },
        },
      ],
      plugins: [
        starlightImageZoom(),
        ...(enableLinksValidator
          ? [
              starlightLinksValidator({
                errorOnInvalidHashes: false,
                errorOnLocalLinks: true,
                errorOnRelativeLinks: false,
              }),
            ]
          : []),
      ],
    }),
    sitemap(),
  ],
});
