# 你的第一个 VRChat 世界：从零到发布的完全手册

> 带你从「这世界怎么做的」，走到「我做了一个世界快来玩」。

面向新手的 VRChat 世界开发教程，覆盖 Unity 基础、VRChat SDK、UdonSharp、多人同步、空间体验设计、性能优化与发布维护。

👉 **开始学习：<https://vrchat-world-tutorial.pages.dev>**

## 这是什么

一份用输出倒逼输入的学习笔记。把网上零散的教程、官方文档、社区经验、自己踩过的坑，以及 AI 辅助整理的内容，逐步沉淀成一条适合新手跟着走的路线。

主要是写给自己复习用的。如果它也刚好帮到了你，那就太好了。



## 本地运行

```bash
npm install
npm run dev
```

预览地址：`http://localhost:4321`

## License

本项目采用 [MIT License](./LICENSE)。

内容、示例代码、配置片段都可以自由复制、修改和再使用。附上项目链接我会感谢，不附也没关系。

引用的第三方素材、截图、官方文档片段或社区资料，仍遵循各自原始来源的授权规则。

---

## 附录

### 目录结构

```text
src/content/docs/      正式发布到网站的 Markdown 章节
src/assets/images/     教程截图、GIF 和配图
design/                书稿规划、草稿和设计资料
```

### 部署

本项目使用 Astro + Starlight，可直接部署到 Cloudflare Pages。

| 项目 | 值 |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
