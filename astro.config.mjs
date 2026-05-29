import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidator from 'starlight-links-validator';

const bookTitle = '你的第一个 VRChat 世界：从零到发布的完全手册';
const bookDescription =
  '面向新手的 VRChat 世界开发教程，从零讲起 Unity 基础、VRChat SDK、UdonSharp 编程、多人同步、空间体验设计与性能优化，带你做出第一个能发布的 VRChat 世界。';
const siteUrl = 'https://vrchat-world-tutorial.pages.dev';
const ogImage = `${siteUrl}/social-card.png`;

// 死链检查在构建时和 CHECK_LINKS=1 时启用；开发模式默认跳过，写作不被打断
const enableLinksValidator =
  process.env.CHECK_LINKS === '1' || process.env.NODE_ENV === 'production';

export default defineConfig({
  site: siteUrl,
  // 注意：单语言站点不要在这里再写顶层 Astro `i18n`。
  // 之前曾导致 Starlight 在多 locale 解析路径上拿不到 site title，
  // 渲染出 `XXX | undefined` 的标题（线上验证过的真实 SEO 事故）。
  integrations: [
    starlight({
      title: bookTitle,
      description: bookDescription,
      // 单语言中文站点：用 Starlight 的 root locale，URL 不带 /zh-CN/ 前缀，
      // 但 <html lang="zh-CN"> 正确，Pagefind 会按中文分词。
      // 注意：不要再在顶层 defineConfig 写 Astro 的 i18n 字段——那会让 Starlight
      // 走多 locale 解析路径，导致 site title 渲染为 undefined（曾经的线上事故）。
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      favicon: '/favicon.png',
      customCss: ['./src/styles/custom.css'],
      head: [
        // 主题色（移动端浏览器顶栏）
        { tag: 'meta', attrs: { name: 'theme-color', content: '#1fd2c4' } },

        // —— Open Graph（社交分享卡）——
        // 注意：og:image 必须是绝对 URL，且必须是 PNG/JPG，SVG 多数平台不支持。
        // og:title / og:description / og:url 由 Starlight 基于 frontmatter 自动注入；
        // 这里只补 Starlight 不会写的全站级字段。
        { tag: 'meta', attrs: { property: 'og:site_name', content: bookTitle } },
        { tag: 'meta', attrs: { property: 'og:locale', content: 'zh_CN' } },
        { tag: 'meta', attrs: { property: 'og:image', content: ogImage } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },

        // —— Twitter Card ——
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: ogImage } },

        // PWA 基础（manifest）
        { tag: 'link', attrs: { rel: 'manifest', href: '/manifest.webmanifest' } },

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
          icon: 'heart',
          label: '催更 / 赞助',
          href: '/about/#sponsor',
        },
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
      // 组件覆盖：
      //  · Head：注入 JSON-LD 结构化数据（WebSite / TechArticle / BreadcrumbList）
      //  · PageTitle：在标题下方加阅读时间 / 难度 / 章节类型徽章
      //  · Footer：追加反馈条 + Mermaid 运行时 + 外站链接新标签页处理
      components: {
        Head: './src/overrides/Head.astro',
        PageTitle: './src/overrides/PageTitle.astro',
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
        {
          label: '关于',
          items: [{ slug: 'about' }],
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
    sitemap({
      // 写作样例页 /dev/components-demo/ 是给作者自己看的，不进 sitemap
      filter: (page) => !page.includes('/dev/'),
      // 站点目前更新频率较低，统一用本次构建时间作为 lastmod，
      // 让 Google 知道"这本书还在写、还在变"，触发更频繁的重抓。
      // 后续如果要做 per-page git mtime，再升级 serialize 钩子。
      lastmod: new Date(),
    }),
  ],
});
