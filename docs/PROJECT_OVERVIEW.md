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

作者在学习 VRChat 世界开发时，将官方文档、社区经验、视频教程和 AI 辅助整理的内容，沉淀为一条零基础可跟走的路线。本书定位为**学习笔记**，主要供作者复习，同时开放给有相同需求的读者。

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
- 检查空间体验，让场景读起来像一个地方
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

全书约 **76 篇** MDX 章节，按九部正文 + 附录组织。侧栏顺序由各文件的 `sidebar.order` 控制。

### 第一部 · 先站进去再说

| 章号 | 标题 | 类型 |
|------|------|------|
| — | 部入口 | 部入口 |
| 1 | 一个玩家的好奇心 | 正文 |
| 2 | VRChat 这家公司和这个引擎 | 正文 |
| 理解章 A | 一个世界是怎么从你的电脑到达别人面前的 | 概念 |
| 4 | 装好工具，准备出发 | 动手 |
| 5 | 你的第一个世界 | 动手 |

### 第二部 · 认识你的工作台

| 章号 | 标题 | 类型 |
|------|------|------|
| 6 | Unity 里的一切都是物体 | 正文 |
| 7 | 组件，给物体装能力 | 正文 |
| 8 | Prefab，把东西做成模具 | 正文 |
| 9 | 材质和光的第一印象 | 正文 |
| 理解章 B | 为什么一切都是空壳加零件 | 概念 |
| 创作者视角 | 从模糊画面到具体清单 | 创作者视角 |

### 第三部 · 学一点编程

| 章号 | 标题 | 类型 |
|------|------|------|
| 10 | 写给完全没编过程的你 | 正文 |
| 11 | 刚好够用的 C# | 正文 |
| 12 | UdonSharp，长得像 C# 但它有脾气 | 正文 |
| 理解章 C | 代码是怎么跑起来的 | 概念 |
| 创作者视角 | 编程让世界从静止变成活的 | 创作者视角 |

### 第四部 · 让世界活过来

| 章号 | 标题 | 类型 |
|------|------|------|
| 13 | 按一下，灯亮了 | 动手 |
| 14 | 走进去，事情发生了 | 动手 |
| 15 | 拿起来，丢出去 | 动手 |
| 16 | 坐下来，照镜子，走过去 | 动手 |
| 17 | 门、机关和状态 | 动手 |
| 理解章 D | 事件、条件、动作 | 概念 |
| 创作者视角 | 你的世界现在会跟人说话了 | 创作者视角 |

### 第五部 · 你想做什么样的世界？

| 章号 | 标题 | 类型 |
|------|------|------|
| 18 | Chill World，让人愿意留下来的房间 | 正文 |
| 19 | Game World，让规则跑起来 | 正文 |
| 20 | Social Hub，给社群一个家 | 正文 |
| 21 | Gallery，让作品被看见 | 正文 |
| 22 | Narrative World，让玩家走进一段故事 | 正文 |
| 23 | Event World，舞台、活动和聚会 | 正文 |
| 24 | Tool World，做一个好用的工具 | 正文 |
| 25 | Commercial World，商品、赞助和创作者经济 | 正文 |

### 第六部 · 和别人一起

| 章号 | 标题 | 类型 |
|------|------|------|
| 26 | 你看到的，别人不一定看到 | 正文 |
| 27 | 谁说了算，Ownership | 正文 |
| 28 | 告诉别人发生了什么 | 正文 |
| 29 | 后来的人怎么办 | 正文 |
| 30 | 做一个多人小游戏 | 动手 |

### 第七部 · 让世界变成一个地方

| 章号 | 标题 | 类型 |
|------|------|------|
| 31 | 玩家进来的前三十秒 | 正文 |
| 32 | 空间、比例和舒适 | 正文 |
| 33 | 声音和氛围 | 正文 |
| 34 | UI、提示和反馈 | 正文 |
| 35 | 传送门和世界之间的连接 | 正文 |
| 36 | 光 | 正文 |
| 37 | 表面和材质 | 正文 |
| 38 | 性能，跑得动才是好 | 正文 |
| 39 | PC 和 Quest | 正文 |

### 第八部 · 做着做着会撞上的事

| 章号 | 标题 | 类型 |
|------|------|------|
| 40 | 坏了怎么办，调试的思路 | 正文 |
| 41 | 测试你的世界 | 正文 |
| 42 | 版本管理和备份 | 正文 |
| 43 | 素材、插件和版权 | 正文 |

### 第九部 · 发出去，然后继续走

| 章号 | 标题 | 类型 |
|------|------|------|
| 44 | 发布你的世界 | 动手 |
| 45 | 赞助、商品和创作者经济 | 正文 |
| 46 | 维护一个世界 | 正文 |
| 47 | 继续学习 | 正文 |

### 附录 · 速查与参考

| 编号 | 标题 | 用途 |
|------|------|------|
| A | 术语表 | VRChat / Unity 常用术语 |
| B | Unity 编辑器速查 | 快捷键与操作 |
| C | SDK 与 Unity 组件速查 | 组件字段说明入口 |
| D | UdonSharp 限制 | 语言子集与禁区 |
| E | 网络同步决策表 | 同步方案选择 |
| F | 报错排查 | 常见错误与处理 |
| G | 性能检查清单 | 发布前性能核对 |
| H | 发布检查清单 | 上传前核对项 |
| J | 资料导航 | 外部资源链接汇总 |

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
| 章节元数据 | `src/content.config.ts` | 难度、预估时间、章节类型、是否需 SDK |
| 顶栏书名 + 当前章 | `src/overrides/SiteTitle.astro` | 分享截图时可辨认位置 |
| 阅读时间 / 难度徽章 | `src/overrides/PageTitle.astro` | 标题下方展示 |
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
| `difficulty` | `新手` / `进阶` / `硬核` | 难度档 |
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

### 章号写作公约

1. **frontmatter `title` 是唯一真源**：只在 `title:` 里写「N. 章名」
2. **散文里能不写章号就不写**：用 slug 链接代替「第 N 章」
3. **必须写章号时**：用 `[第 N 章 ...](slug)` 或 `<LinkCard>`，工具可自动同步

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

## 8. 资料导航审阅

线上附录 J（[资料导航](https://vrchat-world-tutorial.pages.dev/appendix/resources/)）汇总了写书时校对过的外部资源。以下是对该文档的审阅结论。

### 覆盖范围

| 分类 | 条目数 | 评价 |
|------|--------|------|
| VRChat 官方 | 11 | 覆盖 Creator Docs 主站、Worlds、Udon、Networking、Quest、发布、性能等核心入口 |
| UdonSharp | 3 | 主文档、GitHub 仓库、API 参考 |
| Unity 官方 | 3 | Manual、Scripting API、Learn |
| 中文资料 | 2 | VRCZH 汉化、VRCD 社区文档 |
| 社区资源 | 9 | Discord、论坛、GitHub、VRWorld Toolkit、DeepWiki 等 |
| 资产平台 | 3 | Booth、Gumroad、Unity Asset Store |
| C# 语言 | 2 | Microsoft Docs |
| 视频与创作者 | 3+ | Bilibili 搜索、VRC School、个人创作者列表 |
| 示例项目 | 3 | SDK 示例场景、GitHub 搜索、官方模板 |
| 旧版文档 | 1 | SDK2 时代文档（附汉化镜像说明） |

### 优点

- **分类清晰**：按用途分块，每条条目附「用法」说明，读者可判断该不该点
- **中英分工明确**：标注「中文翻译可能滞后，关键参数回英文原版核对」
- **边界说明到位**：VRC School 标注为 Avatar 向；旧版文档标注哪些内容仍以旧站为准
- **维护意识**：文首注明链接可能过期，引导读者提 Issue

### 待改进项

| 项目 | 现状 | 建议 |
|------|------|------|
| VCC 入口 | 未单独列出 | 可加 VRChat Creator Companion 下载页，第一部装工具章会用到 |
| 链接时效 | 静态表格，无自动检测 | 定期人工核对，或考虑 `build:strict` 时抽检关键外链 |
| 个人创作者 | 仅列 2 人 | 可随社区反馈增补，但需控制列表长度 |
| 教程配图 | `src/assets/images/` 为空 | 正文截图/GIF 待补充，不影响资料导航本身 |
| 附录编号 | 无附录 I | 编号跳过了 I，属有意留白或历史遗留，可在附录入口页注明 |

### 与正文交叉引用

资料导航与以下章节形成互补，审阅时确认引用关系完整：

| 附录 / 章节 | 关联 |
|-------------|------|
| 附录 J · 资料导航 | 外部链接总入口 |
| 附录 D · UdonSharp 限制 | C# 子集边界 |
| 附录 E · 网络同步决策表 | 第六部多人同步 |
| 第 43 章 · 素材、插件和版权 | 资产平台授权讨论 |
| 第 4 章 · 装好工具 | 工具链安装实操 |
| 第 47 章 · 继续学习 | 读完后的延伸方向 |

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

*最后更新：2026-07-07*
