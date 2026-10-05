# 项目概览

> 供无技术背景的读者、审阅者、协作者快速了解本仓库是什么、包含什么、如何运转。
>
> 线上阅读地址：<https://vrchat-world-tutorial.pages.dev>

---

## 1. 这是什么

**《你的第一个 VRChat 世界：从零到发布的完全手册》** 是一本中文 VRChat 世界开发教程，以文档网站形式发布。

| 维度 | 说明 |
|------|------|
| 形态 | 静态文档网站（不是 Unity 工程） |
| 作者 | 萝北来信（LuobeiLetters） |
| 版本 | 0.1.0 |
| 线上地址 | https://vrchat-world-tutorial.pages.dev |
| 源码仓库 | https://github.com/tobenot/vrchat-world-tutorial |
| 部署平台 | Cloudflare Pages |

### 需要区分的两件事

本仓库**只存放教程文字和网站工程**，不含 Unity 场景、Prefab、UdonSharp 脚本等游戏资产。读者按教程内容，在自己的 Unity + VRChat SDK 环境中动手实践。

| 在本仓库里 | 不在本仓库里 |
|------------|--------------|
| 教程文章（MDX） | Unity 项目文件（`.unity`、`.cs`） |
| 网站样式与组件 | VRChat SDK 安装包 |
| 构建与维护脚本 | 教程配图（`src/assets/images/` 目前为空，待补充） |

### 写作背景

作者在学习 VRChat 世界开发时，整理官方文档、社区经验、视频教程和实践记录。制作过程包含 AI 辅助整理，此记录保留为真实来源说明。内容涵盖基础操作与专题。本书定位为**学习笔记**，主要供作者复习，同时开放给有相同需求的读者。

---

## 2. 这本书教什么

### 目标读者

- 刚开始做 VRChat 世界，没用过 Unity、C# 或 Udon
- 想把「我想做个地方」落地成能进去玩的世界
- 需要一份从零到发布的学习路线图

### 读完能做什么

- 做出一个能上传到 VRChat 的最小世界（地板、出生点、Scene Descriptor）
- 完成基础交互范本：按钮、门、拾取物、触发区域
- 排查多人同步问题（「自己看到、别人看不到」）
- 检查空间布局、光照、声音、UI 可读性和运行性能
- 了解发布、更新、维护的基本流程

### 教程涉及的技术（读者需自行安装）

| 类别 | 技术 |
|------|------|
| 游戏引擎 | Unity（版本以 VRChat Creator Docs 为准） |
| 平台 SDK | VRChat SDK（VRC Scene Descriptor、Build & Test、Publish） |
| 脚本语言 | UdonSharp → Udon 字节码 → Udon 虚拟机 |
| 多人同步 | Ownership、网络变量、RequestSerialization |
| 版本管理 | Git（第八部有专门章节） |

---

## 3. 内容结构：九部 + 附录

仓库包含 76 篇 MDX：75 篇读者页面与 1 篇组件演示页。侧栏由 `sidebar.order` 排序；页面地址使用稳定 slug。

### 第一部 · 工具与第一个世界

| 标题 | 源文件 |
|---|---|
| 第一部 · 工具与第一个世界 | [getting-started/index.mdx](../src/content/docs/getting-started/index.mdx) |
| 1. 一个玩家的好奇心 | [getting-started/curiosity.mdx](../src/content/docs/getting-started/curiosity.mdx) |
| 2. VRChat 这家公司和这个引擎 | [getting-started/about-vrchat.mdx](../src/content/docs/getting-started/about-vrchat.mdx) |
| 4. 装好工具，准备出发 | [getting-started/tools.mdx](../src/content/docs/getting-started/tools.mdx) |
| 5. 你的第一个世界 | [getting-started/first-world.mdx](../src/content/docs/getting-started/first-world.mdx) |
| 理解章 A：一个世界是怎么从你的电脑到达别人面前的 | [getting-started/world-pipeline.mdx](../src/content/docs/getting-started/world-pipeline.mdx) |

### 第二部 · 场景物体与组件

| 标题 | 源文件 |
|---|---|
| 第二部 · 场景物体与组件 | [workbench/index.mdx](../src/content/docs/workbench/index.mdx) |
| 6. Unity 里的一切都是物体 | [workbench/gameobjects.mdx](../src/content/docs/workbench/gameobjects.mdx) |
| 7. 组件，给物体装能力 | [workbench/components.mdx](../src/content/docs/workbench/components.mdx) |
| 8. Prefab，把东西做成模具 | [workbench/prefabs.mdx](../src/content/docs/workbench/prefabs.mdx) |
| 9. 材质和光的第一印象 | [workbench/materials-light.mdx](../src/content/docs/workbench/materials-light.mdx) |
| 理解章 B：为什么一切都是空壳加零件 | [workbench/unity-philosophy.mdx](../src/content/docs/workbench/unity-philosophy.mdx) |
| 创作者视角：从模糊画面到具体清单 | [workbench/from-picture-to-list.mdx](../src/content/docs/workbench/from-picture-to-list.mdx) |

### 第三部 · C# 与 UdonSharp 基础

| 标题 | 源文件 |
|---|---|
| 第三部 · C# 与 UdonSharp 基础 | [programming/index.mdx](../src/content/docs/programming/index.mdx) |
| 10. 写给完全没编过程的你 | [programming/basics-no-code.mdx](../src/content/docs/programming/basics-no-code.mdx) |
| 11. 刚好够用的 C# | [programming/csharp-just-enough.mdx](../src/content/docs/programming/csharp-just-enough.mdx) |
| 12. UdonSharp 的支持范围与使用条件 | [programming/udonsharp-personality.mdx](../src/content/docs/programming/udonsharp-personality.mdx) |
| 理解章 C：代码是怎么跑起来的 | [programming/how-code-runs.mdx](../src/content/docs/programming/how-code-runs.mdx) |
| 创作者视角：按需求决定是否添加脚本 | [programming/programming-makes-it-alive.mdx](../src/content/docs/programming/programming-makes-it-alive.mdx) |

### 第四部 · 交互与状态

| 标题 | 源文件 |
|---|---|
| 第四部 · 交互与状态 | [come-alive/index.mdx](../src/content/docs/come-alive/index.mdx) |
| 13. 按一下，灯亮了 | [come-alive/press-and-light.mdx](../src/content/docs/come-alive/press-and-light.mdx) |
| 14. 走进去，事情发生了 | [come-alive/trigger-zones.mdx](../src/content/docs/come-alive/trigger-zones.mdx) |
| 15. 拿起来，丢出去 | [come-alive/pickup-and-throw.mdx](../src/content/docs/come-alive/pickup-and-throw.mdx) |
| 16. 坐下来，照镜子，走过去 | [come-alive/sit-mirror-teleport.mdx](../src/content/docs/come-alive/sit-mirror-teleport.mdx) |
| 17. 门、机关和状态 | [come-alive/doors-and-states.mdx](../src/content/docs/come-alive/doors-and-states.mdx) |
| 理解章 D · 事件、条件、动作 | [come-alive/event-condition-action.mdx](../src/content/docs/come-alive/event-condition-action.mdx) |
| 创作者视角：交互的用途与检查范围 | [come-alive/world-speaks-back.mdx](../src/content/docs/come-alive/world-speaks-back.mdx) |

### 第五部 · 世界类型与设计

| 标题 | 源文件 |
|---|---|
| 第五部 · 世界类型与设计 | [world-types/index.mdx](../src/content/docs/world-types/index.mdx) |
| 18. Chill World，让人愿意留下来的房间 | [world-types/chill-world.mdx](../src/content/docs/world-types/chill-world.mdx) |
| 19. Game World，让规则跑起来 | [world-types/game-world.mdx](../src/content/docs/world-types/game-world.mdx) |
| 20. Social Hub，给社群一个家 | [world-types/social-hub.mdx](../src/content/docs/world-types/social-hub.mdx) |
| 21. Gallery，让作品被看见 | [world-types/gallery.mdx](../src/content/docs/world-types/gallery.mdx) |
| 22. Narrative World，让玩家走进一段故事 | [world-types/narrative-world.mdx](../src/content/docs/world-types/narrative-world.mdx) |
| 23. Event World，舞台、活动和聚会 | [world-types/event-world.mdx](../src/content/docs/world-types/event-world.mdx) |
| 24. Tool World，做一个好用的工具 | [world-types/tool-world.mdx](../src/content/docs/world-types/tool-world.mdx) |
| 25. Commercial World，商品、赞助和创作者经济 | [world-types/commercial-world.mdx](../src/content/docs/world-types/commercial-world.mdx) |

### 第六部 · 多人同步

| 标题 | 源文件 |
|---|---|
| 第六部 · 多人同步 | [with-others/index.mdx](../src/content/docs/with-others/index.mdx) |
| 26. 你看到的，别人不一定看到 | [with-others/you-see-others-dont.mdx](../src/content/docs/with-others/you-see-others-dont.mdx) |
| 27. 谁说了算，Ownership | [with-others/ownership.mdx](../src/content/docs/with-others/ownership.mdx) |
| 28. 告诉别人发生了什么 | [with-others/tell-everyone.mdx](../src/content/docs/with-others/tell-everyone.mdx) |
| 29. 后来的人怎么办 | [with-others/late-joiners.mdx](../src/content/docs/with-others/late-joiners.mdx) |
| 30. 做一个多人小游戏 | [with-others/multiplayer-mini-game.mdx](../src/content/docs/with-others/multiplayer-mini-game.mdx) |

### 第七部 · 空间、音画与性能

| 标题 | 源文件 |
|---|---|
| 第七部 · 空间、音画与性能 | [placeness/index.mdx](../src/content/docs/placeness/index.mdx) |
| 31. 玩家进来的前三十秒 | [placeness/first-thirty-seconds.mdx](../src/content/docs/placeness/first-thirty-seconds.mdx) |
| 32. 空间、比例和舒适 | [placeness/space-and-comfort.mdx](../src/content/docs/placeness/space-and-comfort.mdx) |
| 33. 声音和氛围 | [placeness/sound-and-mood.mdx](../src/content/docs/placeness/sound-and-mood.mdx) |
| 34. UI、提示和反馈 | [placeness/ui-and-feedback.mdx](../src/content/docs/placeness/ui-and-feedback.mdx) |
| 35. 传送门和世界之间的连接 | [placeness/portals.mdx](../src/content/docs/placeness/portals.mdx) |
| 36. 光 | [placeness/light.mdx](../src/content/docs/placeness/light.mdx) |
| 37. 表面和材质 | [placeness/surfaces.mdx](../src/content/docs/placeness/surfaces.mdx) |
| 38. 性能与测量 | [placeness/performance.mdx](../src/content/docs/placeness/performance.mdx) |
| 39. PC 和 Quest | [placeness/pc-and-quest.mdx](../src/content/docs/placeness/pc-and-quest.mdx) |

### 第八部 · 调试、测试与资源管理

| 标题 | 源文件 |
|---|---|
| 第八部 · 调试、测试与资源管理 | [surviving/index.mdx](../src/content/docs/surviving/index.mdx) |
| 40. 坏了怎么办，调试的思路 | [surviving/debugging-mindset.mdx](../src/content/docs/surviving/debugging-mindset.mdx) |
| 41. 测试你的世界 | [surviving/testing-your-world.mdx](../src/content/docs/surviving/testing-your-world.mdx) |
| 42. 版本管理和备份 | [surviving/version-control.mdx](../src/content/docs/surviving/version-control.mdx) |
| 43. 素材、插件和版权 | [surviving/assets-and-licenses.mdx](../src/content/docs/surviving/assets-and-licenses.mdx) |

### 第九部 · 发布与维护

| 标题 | 源文件 |
|---|---|
| 第九部 · 发布与维护 | [publishing/index.mdx](../src/content/docs/publishing/index.mdx) |
| 44. 发布你的世界 | [publishing/submit-your-world.mdx](../src/content/docs/publishing/submit-your-world.mdx) |
| 45. 赞助、商品和创作者经济 | [publishing/creator-economy.mdx](../src/content/docs/publishing/creator-economy.mdx) |
| 46. 维护一个世界 | [publishing/maintaining-a-world.mdx](../src/content/docs/publishing/maintaining-a-world.mdx) |
| 47. 继续学习 | [publishing/keep-learning.mdx](../src/content/docs/publishing/keep-learning.mdx) |

### 附录 · 速查与参考

| 标题 | 源文件 |
|---|---|
| 附录 · 速查与参考 | [appendix/index.mdx](../src/content/docs/appendix/index.mdx) |
| 附录 A · 术语表 | [appendix/glossary.mdx](../src/content/docs/appendix/glossary.mdx) |
| 附录 B · Unity 编辑器速查 | [appendix/unity-shortcuts.mdx](../src/content/docs/appendix/unity-shortcuts.mdx) |
| 附录 C · SDK 与 Unity 组件速查 | [appendix/components-cheatsheet.mdx](../src/content/docs/appendix/components-cheatsheet.mdx) |
| 附录 D · UdonSharp 限制 | [appendix/udonsharp-limits.mdx](../src/content/docs/appendix/udonsharp-limits.mdx) |
| 附录 E · 网络同步决策表 | [appendix/networking-decision.mdx](../src/content/docs/appendix/networking-decision.mdx) |
| 附录 F · 报错排查 | [appendix/errors.mdx](../src/content/docs/appendix/errors.mdx) |
| 附录 G · 性能检查清单 | [appendix/performance-checklist.mdx](../src/content/docs/appendix/performance-checklist.mdx) |
| 附录 H · 发布检查清单 | [appendix/release-checklist.mdx](../src/content/docs/appendix/release-checklist.mdx) |
| 附录 I · 资料导航 | [appendix/resources.mdx](../src/content/docs/appendix/resources.mdx) |

---

## 4. 网站技术栈

本仓库是一个用 **Astro 5 + Starlight** 构建的静态文档站。

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Astro | 5.18.2 |
| 文档主题 | @astrojs/starlight | 0.35.3 |
| 语言 | TypeScript、MDX | TS 5.9 |
| 图表 | Mermaid | 11 |
| 搜索 | Pagefind（Starlight 内置，支持中文） | — |
| RSS / Sitemap | @astrojs/rss、@astrojs/sitemap | — |
| 图片缩放 | starlight-image-zoom | — |
| 死链检查 | starlight-links-validator | — |
| OG 图生成 | satori + @resvg/resvg-js | 构建时 |
| 部署 | Cloudflare Pages | Node ≥ 18 |

### 站点功能

| 功能 | 实现位置 | 说明 |
|------|----------|------|
| 侧栏自动生成 | `astro.config.mjs` | 按目录 `autogenerate`，新章只需加 MDX 文件 |
| 章节元数据 | `src/content.config.ts` | 内容层次、预估时间、章节类型、是否需 SDK |
| 顶栏书名 + 当前章 | `src/overrides/SiteTitle.astro` | 分享截图时可辨认位置 |
| 阅读时间 / 内容层次徽章 | `src/overrides/PageTitle.astro` | 标题下方展示 |
| SEO / JSON-LD | `src/overrides/Head.astro` | 结构化数据 + 每页 OG 图 |
| 底部反馈条 | `src/overrides/Footer.astro` | GitHub Issue 入口 + Mermaid 运行时 |
| 首页字数统计 | `src/components/WordCount.astro` | 全站字数、阅读时长、文章数 |
| 关于页海报 | `src/components/Posters.astro` | 扫描 `src/assets/posters/` |
| RSS 订阅 | `src/pages/rss.xml.js` | `/rss.xml` |
| PWA | `public/manifest.webmanifest` | 可添加到主屏幕 |
| 旧 URL 重定向 | `public/_redirects` | 301 规则 |

### 章节元数据字段

每篇 MDX 可在 frontmatter 中设置：

| 字段 | 类型 | 说明 |
|------|------|------|
| `difficulty` | `基础` / `进阶` / `专题` | 章节内容层次，不评价读者能力 |
| `estimatedMinutes` | 正整数 | 预估跟做时间（分钟） |
| `requiresSDK` | 布尔 | 是否要求 VRChat SDK 已就绪 |
| `chapterType` | `hands-on` / `concept` / `creator-view` / `part-intro` | 章节类型 |
| `summary` | 字符串 | RSS / 卡片用摘要 |

---

## 5. 仓库目录结构

```text
vrchat-world-tutorial/
├── README.md                    # 读者与贡献者入口
├── STARLIGHT-FEATURES.md        # 写作者手册（组件、部署、排错）
├── docs/
│   └── PROJECT_OVERVIEW.md      # 本文件：项目全景说明
├── LICENSE / LICENSE-CODE       # 双协议：内容 CC BY-NC 4.0，代码 MIT
├── package.json                 # 依赖与 npm scripts
├── astro.config.mjs             # Astro + Starlight 主配置
├── tsconfig.json
│
├── src/
│   ├── content/
│   │   └── docs/                # 教程正文（76 篇 MDX）
│   ├── content.config.ts        # 章节 schema 扩展
│   ├── components/              # WordCount.astro, Posters.astro
│   ├── overrides/               # Starlight 组件覆盖
│   ├── pages/                   # rss.xml.js, 404.astro
│   ├── styles/custom.css        # 设计系统（双主题、VRChat 品牌色）
│   └── assets/
│       ├── images/              # 教程配图（待补充）
│       └── posters/             # 关于页海报
│
├── public/                      # favicon、社交卡、PWA 图标、robots.txt
└── scripts/                     # 构建与维护脚本
    ├── build-og.mjs             # 每页 OG 图生成
    ├── check-chapter-refs.mjs   # 章号引用检查
    ├── shift-chapters.mjs       # 批量顺移章号
    ├── fix-quotes.mjs           # 引号修复
    └── gen-edits-doc.mjs        # 编辑记录生成
```

---

## 6. 构建与维护流程

### 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 本地预览 http://localhost:4321
npm run build        # 章号检查 + OG 生成 + Astro 构建
npm run build:strict # 额外启用死链检查
npm run preview      # 预览构建产物
```

### 维护脚本

| 命令 | 作用 |
|------|------|
| `npm run check:chapters` | 扫描正文里写死的「第 N 章」是否过期 |
| `npm run fix:chapters` | 自动同步可识别的链接 / LinkCard |
| `npm run shift:chapters -- --from N --by +1` | 插章时批量顺移章号 |
| `npm run build:og` | 单独生成 OG 卡片 |

`npm run build` 默认跑 `check:chapters:strict`，章号不一致会阻断构建。

### 写作公约

统一遵循 [README 的本书写作公约](../README.md#本书写作公约)，包括机制与条件式表述、不预告、不评价读者能力、删除 AI 使用教学且保留制作来源，以及章节引用与元数据的一致性要求。

`title` 是章名与章号的唯一真源。正文使用稳定 slug 链接；必须写章号时使用 Markdown 链接或 `<LinkCard>`，并运行 `check:chapters:strict`。

### 部署参数（Cloudflare Pages）

| 项目 | 值 |
|------|-----|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | ≥ 18（建议 20） |

---

## 7. 许可协议

| 范围 | 协议 |
|------|------|
| 内容（`src/content/docs/`、`src/assets/`） | [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) |
| 代码（脚本、组件、配置） | [MIT](https://opensource.org/licenses/MIT) |

- 可自由复制、转载、修改、二次创作，需署名并附原项目链接
- 内容不得用于商业用途（付费课程、付费专栏、商业培训等）
- 代码部分可随意使用，不限商用

---

## 8. 资料导航与核查

[附录 J：资料导航](https://vrchat-world-tutorial.pages.dev/appendix/resources/) 汇总 VRChat Creator Docs、UdonSharp、Unity、C# 和社区资料。技术行为优先核对官方原文；第三方翻译与旧 SDK 文档须标注适用版本。

正文引用采用以下检查范围：

- 组件字段：核对 SDK 版本、字段名、默认值与平台差异
- 脚本行为：区分 Unity API、Udon 暴露范围与客户端支持情况
- 输入：区分 Interact、Pickup、Use、Drop，注明客户端和控制器绑定差异
- 音频：区分播放条件、空间化与衰减，检查 Trigger、AudioSource 和 VRC Spatial Audio Source 的配置是否一致
- 多人：区分本地事件、网络事件、同步变量、所有权和晚加入状态
- 发布与许可：使用官方入口，标注公开权限、实例访问范围、素材来源及适用许可

网站构建能检查 MDX、schema、页面路由与站内链接，不能执行教程中的 Unity 或 UdonSharp 示例。客户端行为应通过已安装 SDK 对应的 Unity 工程和 VRChat Build & Test 验证，报告中单独注明是否实测。

---

## 9. 相关文档索引

| 文档 | 路径 | 面向 |
|------|------|------|
| 项目 README | [README.md](../README.md) | 读者、贡献者入口 |
| Starlight 写作手册 | [STARLIGHT-FEATURES.md](../STARLIGHT-FEATURES.md) | 写作者、维护者 |
| 项目概览（本文件） | [docs/PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | 审阅者、无背景读者 |
| 线上前言 | [/preface/](https://vrchat-world-tutorial.pages.dev/preface/) | 读者 |
| 线上资料导航 | [/appendix/resources/](https://vrchat-world-tutorial.pages.dev/appendix/resources/) | 读者查外部资源 |
| 关于页 | [/about/](https://vrchat-world-tutorial.pages.dev/about/) | 作者信息、催更、赞助 |

---

## 10. 审阅清单

供无背景审阅者快速核对项目状态：

- [ ] 确认本仓库是文档站，不是 Unity 工程
- [ ] 浏览 [线上首页](https://vrchat-world-tutorial.pages.dev) 确认呈现正常
- [ ] 抽查 2–3 章正文，确认语言通顺、步骤可跟
- [ ] 检查 [附录 J · 资料导航](https://vrchat-world-tutorial.pages.dev/appendix/resources/) 关键外链是否可访问
- [ ] 确认许可协议（内容 CC BY-NC 4.0，代码 MIT）符合预期
- [ ] 如需本地预览：`npm install && npm run dev`
- [ ] 发现问题：在 [GitHub Issues](https://github.com/tobenot/vrchat-world-tutorial/issues/new) 提交

---

*最后更新：2026-10-05*
