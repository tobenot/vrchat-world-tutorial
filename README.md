# 你的第一个 VRChat 世界：从零到发布的完全手册

> 带你从「这世界怎么做的」，走到「我做了一个世界快来玩」。

这是一本面向新手的 VRChat 世界开发公开笔记，覆盖 Unity 基础、VRChat SDK、UdonSharp、多人同步、空间体验设计、性能优化与发布维护。

在线阅读：<https://vrchat-world-tutorial.pages.dev>

## 项目定位

这不是一本严肃的商业出版物，而是一份用输出倒逼输入的学习笔记。

我会把网上零散的教程、官方文档、社区经验、自己踩过的坑，以及 AI 辅助整理的内容，逐步沉淀成一条适合新手跟着走的路线。

主要是写给自己复习用的。如果它也刚好帮到了你，那就太好了。

## 本地运行

```bash
npm install
npm run dev
```

本地预览地址通常是：

```text
http://localhost:4321
```

## 写作目录

```text
src/content/docs/      正式发布到网站的 Markdown 章节
src/assets/images/     教程截图、GIF 和配图
design/                书稿规划、草稿和设计资料
```

## 部署

本项目使用 Astro + Starlight，可直接部署到 Cloudflare Pages。

Cloudflare Pages 构建设置：

| 项目 | 值 |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |

## License

本项目采用 [MIT License](./LICENSE)。

简单来说：内容、示例代码、配置片段都可以自由复制、修改和再使用。你愿意顺手附上项目链接，我会很感谢；不附也没关系。

请注意：如果文章中引用了第三方素材、截图、官方文档片段或社区资料，它们仍然遵循各自原始来源的授权与使用规则。
