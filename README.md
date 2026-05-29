# 你的第一个 VRChat 世界：从零到发布的完全手册

> 带你从「这世界怎么做的」，走到「我做了一个世界快来玩」。

面向新手的 **VRChat 世界开发教程**，从零讲起 Unity 基础、VRChat SDK、UdonSharp 编程、多人同步、空间体验设计、性能优化与发布维护。默认你**没用过 Unity、没写过 C#、没配过 SDK**，一步一步把第一个能站进去的世界做出来。

👉 **开始学习：<https://vrchat-world-tutorial.pages.dev>**

[![Astro](https://img.shields.io/badge/Astro-5.18-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Starlight-0.35-7E22CE)](https://starlight.astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://vrchat-world-tutorial.pages.dev)

## 这是什么

一份用输出倒逼输入的学习笔记。把网上零散的教程、官方文档、社区经验、自己踩过的坑，以及 AI 辅助整理的内容，逐步沉淀成一条适合新手跟着走的路线。

主要是写给自己复习用的。如果它也刚好帮到了你，那就太好了。

## 这本书会带你走过

- **第一部 · 先站进去再说**：从一个玩家的好奇心出发，安装工具链、跑通 VRChat SDK，把第一个能上线的世界做出来。
- **第二部 · 认识你的工作台**：理解 GameObject、Component、Prefab、Material、Light，看懂 Unity 的"组合式"设计思路。
- **后续章节**（持续更新）：UdonSharp 编程、多人同步、交互组件、空间体验、性能优化、发布维护。

完整路线图见 [book-plan-warm.md](./design/book-plan-warm.md) 与线上的 [前言](https://vrchat-world-tutorial.pages.dev/preface/)。

## 适合谁读

- 刚开始做 VRChat 世界的新手，没碰过 Unity、C# 或 Udon
- 想把"我想做个地方"的想法落地成一个能进去玩的世界
- 需要一份从零到发布、不挑顺序的学习路线图

## 本地运行

```bash
npm install
npm run dev
```

预览地址：`http://localhost:4321`

构建（自动生成 OG 卡片 PNG → 跑 Astro build）：

```bash
npm run build
```

只跑死链严格检查：

```bash
npm run build:strict
```

## 目录结构

```text
src/content/docs/      正式发布到网站的 Markdown 章节
src/overrides/         Starlight 组件覆盖（Head/PageTitle/Footer）
src/pages/             非文档页（rss.xml / 404）
src/assets/images/     教程截图、GIF 和配图
public/                静态资源（favicon / OG 图 / manifest）
scripts/               构建脚本（如 OG 图生成）
design/                书稿规划、SEO 计划、教学法参考等设计资料
```

## 部署

本项目使用 Astro + Starlight，已在 Cloudflare Pages 部署。

| 项目 | 值 |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | ≥ 18 |

## License

本项目采用 [MIT License](./LICENSE)。

内容、示例代码、配置片段都可以自由复制、修改和再使用。附上项目链接我会感谢，不附也没关系。

引用的第三方素材、截图、官方文档片段或社区资料，仍遵循各自原始来源的授权规则。

## 关键词

VRChat · VRChat 世界 · VRChat 教程 · VRChat SDK · Unity · Unity 入门 · UdonSharp · Udon · VR 开发 · 元宇宙 · Astro · Starlight
