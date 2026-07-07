# 你的第一个 VRChat 世界：从零到发布的完全手册

> 带你从「这世界怎么做的」，走到「我做了一个世界快来玩」。

面向新手的 **VRChat 世界开发教程**，从零讲起 Unity 基础、VRChat SDK、UdonSharp 编程、多人同步、空间体验设计、性能优化与发布维护。默认你**没用过 Unity、没写过 C#、没配过 SDK**，一步一步把第一个能站进去的世界做出来。

👉 **开始学习：<https://vrchat-world-tutorial.pages.dev>**

[![Astro](https://img.shields.io/badge/Astro-5.18-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Starlight-0.35-7E22CE)](https://starlight.astro.build)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](./LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://vrchat-world-tutorial.pages.dev)

## 这是什么

一份用输出倒逼输入的学习笔记。把网上零散的教程、官方文档、社区经验、自己踩过的坑，以及 AI 辅助整理的内容，逐步沉淀成一条适合新手跟着走的路线。

主要是写给自己复习用的。如果它也刚好帮到了你，那就太好了。

## 这本书会带你走过

- **第一部 · 先站进去再说**：从一个玩家的好奇心出发，安装工具链、跑通 VRChat SDK，把第一个能上线的世界做出来。
- **第二部 · 认识你的工作台**：理解 GameObject、Component、Prefab、Material、Light，看懂 Unity 的"组合式"设计思路。
- **第三部 · 学一点编程**：从零开始学 UdonSharp，写出第一段能在世界里跑起来的代码。
- **第四部 · 让世界活过来**：交互、动画、音效、粒子——让世界从静态场景变成有反馈的体验。
- **第五部 · 你想做什么样的世界？**：展示型、游戏型、社交型……不同类型世界的设计思路与实现方式。
- **第六部 · 和别人一起**：多人同步、网络事件、变量同步——理解 VRChat 的多人架构。
- **第七部 · 让世界变成一个地方**：光影、氛围、空间叙事——让玩家觉得"这里是一个地方"而不只是一个关卡。
- **第八部 · 做着做着会撞上的事**：调试、性能优化、版本管理——开发路上绕不过去的实战问题。
- **第九部 · 发出去，然后继续走**：发布、更新、社区运营——把世界交到玩家手里，然后继续迭代。
- **附录 · 速查与参考**：术语表、快捷键、常见错误、资源链接——随时翻阅的工具箱。

完整路线图见线上的 [前言](https://vrchat-world-tutorial.pages.dev/preface/)。

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

## 章节引用规则（写作公约）

章号是这本书最容易腐烂的引用之一。每插一章 / 拆一章 / 合一章，全书的「第 N 章」就会集体过期。
为了把成本压到最低，请遵守：

1. **frontmatter `title` 是唯一真源**：每篇 mdx 只在 `title:` 里写「N. 章名」。其他地方只引用，不复述。
2. **散文里能不写章号就不写**：与其写「第 11 章会讲 X」，不如写「[后面会有一章专门讲 X](slug)」——slug 不会因为插章而变，章号会。
3. **必须写章号时**：优先 markdown 链接 `[第 11 章 ...](slug)` 或 `<LinkCard title="11. ..." href="slug" />`，工具能自动同步。
4. **章号集中放在数据源 / ⏳ 标记区**：附录里的「详情见第 N 章」放在固定结构里，便于扫描和迁移。

工具：

```bash
# 体检：扫一遍有没有 stale / 漂移 / 冲突的章号引用
npm run check:chapters

# 自动同步可识别的链接 / LinkCard
npm run fix:chapters

# 整体顺移：插一章前一行命令搞定（自动改 frontmatter + LinkCard + 散文 + 链接，再跑 strict 校验）
npm run shift:chapters -- --from 5 --by +1            # 预览
npm run shift:chapters -- --from 5 --by +1 --write    # 写入
```

`npm run build` 默认会跑 `check:chapters:strict`，章号腐烂会直接挡住构建——CI 也是这条命令。

## 项目文档

| 文档 | 说明 |
|------|------|
| [docs/PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) | 项目全景：设计、技术栈、章节结构、资料导航审阅、审阅清单 |
| [STARLIGHT-FEATURES.md](./STARLIGHT-FEATURES.md) | 写作者手册：Starlight 组件、部署、排错 |

## 目录结构

```text
src/content/docs/      正式发布到网站的 78 篇 Markdown 章节（9 部 + 附录）
src/overrides/         Starlight 组件覆盖（Head / SiteTitle / PageTitle / Footer）
src/components/        自定义 Astro 组件（字数统计、海报等）
src/pages/             非文档页（rss.xml / 404）
src/styles/            自定义样式
src/assets/images/     教程配图（目前为空，后续逐步补充截图与 GIF）
public/                静态资源（favicon / OG 图 / manifest）
scripts/               构建与维护脚本（OG 图生成 / 章号检查 / 章号顺移 / 引号修复）
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

本项目采用**双协议**：

| 范围 | 协议 | 文件 |
|---|---|---|
| **内容**（教程文章、配图等 `src/content/docs/` & `src/assets/`） | [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) | [LICENSE](./LICENSE) |
| **代码**（构建脚本、组件、配置等） | [MIT](https://opensource.org/licenses/MIT) | [LICENSE-CODE](./LICENSE-CODE) |

简单说：

- ✅ 可以自由复制、转载、修改、二次创作
- ✅ 需要署名并附上原项目链接
- ❌ 不得将内容用于商业用途（付费课程、付费专栏、商业培训、知识星球、广告变现等）
- ❌ 不得把内容搬走后以自己的名义发布

代码部分（脚本、组件、配置）随意拿去用，MIT，不限商用。

引用的第三方素材、截图、官方文档片段或社区资料，仍遵循各自原始来源的授权规则。

## 关键词

VRChat · VRChat 世界 · VRChat 教程 · VRChat SDK · Unity · Unity 入门 · UdonSharp · Udon · VR 开发 · 元宇宙 · Astro · Starlight
