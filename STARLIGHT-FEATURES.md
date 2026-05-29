# Starlight 写作与功能手册

这本书底层用 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build/) 构建。本文档是写作者面向自己的参考——记录这个站点已经接入了哪些能力、写新章时怎么用、踩坑怎么排查。

---

## 0. 目录速查

| 你想做的事 | 看哪一节 |
| :--- | :--- |
| 加一章新内容 | [新增章节](#新增章节) |
| 用步骤、目录树、Tab、卡片 | [Starlight 内置组件](#starlight-内置组件mdx) |
| 写提示框 / 警告框 | [Asides](#asides提示框) |
| 让代码块更帅 | [Expressive Code](#expressive-code-代码块) |
| 画流程图 | [Mermaid 图](#mermaid-图) |
| 给页面加封面 / Hero | [Splash 与 Hero](#splash-模板与-hero) |
| 章节阅读时间 / 难度 | [章节元数据](#章节元数据) |
| 反馈 / Issue 入口 | [底部反馈条](#底部反馈条) |
| 本地开发与构建 | [本地命令](#本地命令) |
| Cloudflare Pages 部署 | [部署到-cloudflare-pages](#部署到-cloudflare-pages) |
| 这页找不到，404 | [常见排错](#常见排错) |

---

## 1. 新增章节

侧栏配置已经改成 **autogenerate**——你不用回 `astro.config.mjs` 改任何东西。

新增一章只要做两件事：

1. 在对应的目录下新建文件，**文件名用纯英文 slug**（**不要带数字前缀**——侧栏顺序由 frontmatter `sidebar.order` 控制，避免未来插章导致 URL 全断），扩展名统一用 `.mdx`：

   ```
   src/content/docs/getting-started/my-new-chapter.mdx
   ```

   > 全书章节文件统一用 `.mdx`，方便随时插入 `<Steps>`、`<FileTree>`、`<CardGrid>` 等组件，纯 Markdown 内容也完全兼容。

2. 在 frontmatter 里写好 `title` / `description` / `sidebar.order`：

   ```mdx
   ---
   title: 5. 一个新的章节
   description: 这一章讲什么。
   sidebar:
     order: 5
   ---
   ```

构建后这章会自动出现在「第一部」分组里，按文件名排序。要写理解章 / 创作者视角，建议加上 `chapterType`（见 [章节元数据](#章节元数据)）。

### 草稿

写到一半不想发布？加 `draft: true`：

```md
---
title: 待写章节
draft: true
---
```

`astro dev` 会显示，`astro build` 会跳过——本地写完才推上线。

### 隐藏页面

只想做内部演示页（比如 `/dev/components-demo/`），不让它出现在侧栏：

```md
---
title: 内部演示
sidebar:
  hidden: true
---
```

注意：`hidden: true` 只是不出现在侧栏，搜索引擎和站内搜索仍能找到。要彻底排除请用 `draft: true`。

---

## 2. Starlight 内置组件（MDX）

要用 `<Steps>` `<FileTree>` `<Tabs>` 这类组件，**文件后缀必须是 `.mdx`**（普通 `.md` 也能跑，但不能用组件）。改名不影响 URL。

文件顶部加 import：

```mdx
import { Steps, FileTree, Tabs, TabItem, CardGrid, Card, LinkCard, Aside, Badge, Icon } from '@astrojs/starlight/components';
```

### 速查

```mdx
{/* 步骤 */}
<Steps>
1. 第一步描述
2. 第二步描述
</Steps>

{/* 项目目录树 */}
<FileTree>
- Assets/
  - Scenes/
    - **MyFirstWorld.unity** ← 主场景
</FileTree>

{/* 平台 / 方案 Tab */}
<Tabs>
  <TabItem label="Windows">…</TabItem>
  <TabItem label="macOS">…</TabItem>
</Tabs>

{/* 卡片 / 链接卡 */}
<CardGrid>
  <Card title="标题" icon="rocket">描述。</Card>
  <LinkCard title="去某章" href="/getting-started/curiosity/" description="一句话提要。" />
</CardGrid>

{/* 徽章 */}
<Badge text="新" variant="tip" />
```

完整可对照渲染样例：本地启动 `npm run dev`，访问 `/dev/components-demo/`。所有组件在同一页活样例。

---

## 3. Asides（提示框）

四种语义，**Markdown 简写**优先（普通 `.md` 也能用），写法对应本书 `.codebuddy/rules.md` 的侧栏系统：

```md
:::note[扩展阅读]
中性的补充。
:::

:::tip[为什么是这样？]
讲设计原理、对比"如果不这样会怎样"。
:::

:::caution[踩坑预警]
具体到哪个按钮、哪个字段。
:::

:::danger[千万别]
真的会让数据丢失或上传失败的硬错误。
:::
```

> 单章里 callout 控制在 2–4 个。每节末尾都堆 callout 会变成背景噪音。

---

## 4. Expressive Code 代码块

代码块语言后追加 meta 即可，不需要任何额外组件。

````md
```cs title="LampToggle.cs" {3-5} ins={6-7} del={8} collapse={10-30} showLineNumbers
…代码…
```
````

| Meta | 作用 |
| :--- | :--- |
| `title="…"` | 文件名标题栏 |
| `{3-5}` | 高亮第 3–5 行 |
| `ins={6-7}` | 标为绿色「新增」 |
| `del={8}` | 标为红色「删除」 |
| `collapse={10-30}` | 默认折叠该范围 |
| `showLineNumbers` | 显示行号 |
| `"关键词"` | 行内关键字高亮 |
| `frame="terminal"` | 把代码块伪装成终端 |
| `frame="none"` | 关掉边框 |

---

## 5. Mermaid 图

无需安装新插件，本项目已注入 Mermaid 客户端运行时。**直接在 Markdown 里写一段 raw HTML**：

```html
<div class="mermaid">
flowchart LR
  A[Unity 场景] --> B[VRChat SDK]
  B --> C[Build & Test]
  B --> D[Build & Publish]
  D --> E[(VRChat 服务器)]
</div>
```

支持的图表类型：`flowchart`、`sequenceDiagram`、`stateDiagram`、`classDiagram`、`erDiagram`、`gantt`、`mindmap` 等。完整语法见 [Mermaid 官方文档](https://mermaid.js.org/intro/)。

实现细节：

- 仅当页面里出现 `.mermaid` 时才会动态 import 主包（约 600 KB），其他页面零成本。
- 自动跟随站点深色 / 浅色主题（监听 `data-theme` 切换重渲染）。
- 文件可以是 `.md` 或 `.mdx`，因为只用了原生 HTML。

---

## 6. Splash 模板与 Hero

适合「部入口页」「封面页」「展示页」。在 frontmatter 加：

```mdx
---
title: 第一部 · 先站进去再说
description: 一句话副标题
template: splash
hero:
  tagline: 从「这世界怎么做的」走到「我自己跑起来了」。
  actions:
    - text: 开始第 1 章
      link: ./curiosity/
      icon: right-arrow
      variant: primary
    - text: 直接看第一个世界怎么搭
      link: ./first-world/
      variant: minimal
sidebar:
  label: 第一部 · 总览
  order: 0
---
```

`template: splash` 会去掉右侧目录、加宽内容、用 hero 取代 H1。书的首页 `index.mdx` 与每"部"的 `index.mdx` 都是范例。

### 6.1 「减法」处理前言（重要）

`preface.mdx` 不走 splash 路线。前言的钩子是文字本身，加装饰会破坏「客观视角钩子」原则。这里反过来用减法——抽掉默认的"文档构件"，让正文回到读者面前：

```yaml
---
title: 前言：打开一扇门
description: 这本 VRChat 世界开发教程写给谁，以及它会怎样带你入门。
tableOfContents: false   # 前言不需要右侧目录
pagefind: false          # 不参与全文搜索（避免被切碎当结果出现）
editUrl: false           # 前言上不显示「修改本页」
lastUpdated: false       # 不显示「最后更新于」
prev: false              # 上面没有前页
next:                    # 显式接到第 1 章
  link: /getting-started/curiosity/
  label: 第 1 章 · 一个玩家的好奇心
sidebar:
  badge:
    text: 先读这页       # 侧栏小徽章
    variant: tip
---
```

效果：页面只剩 `title` + 正文 + 底部"下一章"按钮，读起来像一封信而不是一篇文档。这套写法适用于任何「以文字为主体、不希望被文档样式干扰」的页面（前言、致谢、结语）。

### 6.2 部入口页

每"部"在自己目录下放一个 `index.mdx`，做成 splash 入口。它会被 autogenerate 收为该 group 的第一项（靠 `sidebar.order: 0` 排序，靠 `sidebar.label` 改写显示标签避免与 group 标题重复）。

模板见 `getting-started/index.mdx` 与 `workbench/index.mdx`。要点：

- `template: splash` 让它真正像一张"扉页"
- `hero.actions` 给两个入口：顺序读 vs 直奔重点
- `tableOfContents: false` + `pagefind: false`：入口页本身不需要被搜索，搜到具体章节即可
- 用 `<CardGrid>` + `<LinkCard>` 列出该部所有章节，配 `description` 让读者扫一眼能选

部入口页之间互相用相对链接 `../workbench/` 跳转，末尾留一两句过渡，让一部读完能自然进下一部。

---

## 7. 章节元数据

写新章时，建议给 frontmatter 加这几个字段——本书的 `Footer.astro` 会自动渲染对应徽章。

```md
---
title: 4. 你的第一个世界
description: …
difficulty: 新手           # 新手 / 进阶 / 硬核
estimatedMinutes: 30       # 预估手把手时间。不写则按字数自动估。
chapterType: hands-on      # hands-on / concept / creator-view
requiresSDK: true          # 是否需要 VRChat SDK 已就绪
summary: 给 RSS / 卡片用的简短摘要
---
```

字段约束在 `src/content.config.ts` 里用 zod 强校验：写错难度档值或单位错误，构建会直接报错。

---

## 8. 底部反馈条

每页页脚自动生成两个按钮：

- **提个 Issue**：跳到 GitHub Issues，标题与内容已预填该页路径。
- **直接改文档**：跳到该页源文件的编辑界面（基于 frontmatter 的 `editLink.baseUrl`）。

实现在 `src/overrides/Footer.astro`，覆盖了 Starlight 默认 Footer，并在它下面追加章节元信息条 + 反馈条 + Mermaid 运行时。

要改 Issue 模板或反馈文案，编辑该文件即可。

---

## 9. 站内搜索（Pagefind）

Starlight 默认集成 Pagefind，**已支持中文**（CJK 分词）。注意：

- 中文不做词干化（英文 `run/running/runs` 共用根，中文不分词），所以搜「VRChat 世界」精确匹配优于搜「VRChat 世界开发」。
- 如发现搜索把侧栏内容也匹配进去，可在长边栏元素上加 `data-pagefind-ignore`。
- 若希望特定页面**不被索引**，frontmatter 设 `pagefind: false`。

---

## 10. RSS / Sitemap / robots

- RSS：访问 `/rss.xml` 自动生成；`<head>` 里也注入了 `link rel="alternate"`，让阅读器能自动发现。
- Sitemap：构建后生成 `dist/sitemap-index.xml`，提交搜索引擎用。
- robots.txt：在 `public/robots.txt`，已开放全站爬取并指向 sitemap。
- RSS 内容由 `src/pages/rss.xml.js` 控制——按文件名顺序输出，分类用 `chapterType + difficulty`。

---

## 11. 本地命令

```bash
npm run dev            # 开发模式，热重载，跳过死链检查
npm run build          # 生产构建（自动启用死链检查）
npm run build:strict   # 显式强制启用死链检查
npm run preview        # 预览生产构建结果
npm run check:links    # 同 build:strict，仅用于 CI 链接检查
```

死链检查由 [`starlight-links-validator`](https://github.com/HiDeoo/starlight-links-validator) 提供：

- 默认仅在生产构建启用，不打扰写作。
- 启用条件：`NODE_ENV === 'production'` 或环境变量 `CHECK_LINKS=1`。
- 检查范围：站内相对链接是否存在；锚点（hash）失败被降级为警告（避免误伤标题轻改）。

---

## 12. 部署到 Cloudflare Pages

站点已配置好 Cloudflare Pages 推送即部署。一些坑：

### 12.1 `lastUpdated` 显示错误时间

Starlight 的「最后更新于 X」从 git log 读取。Cloudflare Pages **默认 shallow clone（深度 1）**，拿不到完整历史，会显示部署时间。

**修法**：在 Cloudflare Pages 项目 → Settings → Environment variables → Production / Preview 下加：

```
GIT_DEPTH = 0
```

`0` 表示完整历史。改完再触发一次构建即可。

### 12.2 构建命令与输出目录

| 项 | 值 |
| :--- | :--- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` 或更新（Astro 5 要求 ≥ 18.20.8） |

### 12.3 站点 URL 配置

`astro.config.mjs` 里的 `site` 决定 RSS、sitemap 里的绝对 URL。换域名记得同步改这里。

---

## 13. 已安装的 Starlight 插件

| 插件 | 作用 | 配置 |
| :--- | :--- | :--- |
| `starlight-image-zoom` | 截图点击放大 | 默认全站启用 |
| `starlight-links-validator` | 构建时死链检查 | 仅在生产构建启用，参见 §11 |

未来想再加：

- `starlight-blog` —— 想把作者笔记 / 更新日志拆成博客分区时
- `starlight-versions` —— SDK 大改版后想保留旧版本文档
- `starlight-utils` —— 多侧栏 / 面包屑增强

---

## 14. 已做的组件覆盖

| 组件 | 文件 | 改了什么 |
| :--- | :--- | :--- |
| `Footer` | `src/overrides/Footer.astro` | 在默认页脚下追加：① 阅读时间 / 难度 / 章节类型徽章 ② 「提 Issue / 直接改文档」反馈条 ③ Mermaid 客户端运行时（懒加载）|

要改样式，看 `Footer.astro` 末尾的 `<style is:global>` 块；色板继承 `src/styles/custom.css` 里的 `--vrc-*` token。

---

## 15. 常见排错

### 「构建报 zod 校验错误」

frontmatter 字段写错了。常见：

- `difficulty` 只接受 `新手 / 进阶 / 硬核` 三个值。
- `estimatedMinutes` 必须是正整数，写 `30 分钟` 会失败。
- `chapterType` 只接受 `hands-on / concept / creator-view`。

### 「死链检查报某个内部链接 404」

链接里 slug 写错或目标文件被删。注意：

- Starlight 的内部链接是 `/章节-id/` 形式，**末尾要有斜杠**。
- `getting-started/curiosity` 不带斜杠会被判 404。

### 「Mermaid 图不渲染」

- F12 看 console 是否报语法错误，复制语法到 [mermaid.live](https://mermaid.live) 验证。
- 必须是 `<div class="mermaid">…</div>`，不能用 ```` ```mermaid ```` 代码块（会被 Expressive Code 拦截）。
- 切换深色 / 浅色主题没刷新？观察日志「[mermaid] render error」，如有 issue 可在 `Footer.astro` 调试。

### 「页面顶部出现 H1 重复」

正文不要写 `# 一级标题`。Starlight 自动从 frontmatter 的 `title` 渲染 H1。正文从 `##` 开始（已写入 `.codebuddy/rules.md`）。

### 「pagefind: doesn't support stemming for zh-cn」

不是错误，是提示。中文不做词干化，搜索仍可用。可忽略。

---

## 16. 参考链接

- [Starlight 文档](https://starlight.astro.build/)
- [Starlight 组件总览](https://starlight.astro.build/zh-cn/components/asides/)
- [Astro 5 文档](https://docs.astro.build/zh-cn/)
- [Expressive Code Meta 速查](https://expressive-code.com/key-features/text-markers/)
- [Mermaid 语法](https://mermaid.js.org/intro/)
- [Pagefind 文档](https://pagefind.app/)

---

更新这份文档：把改动写在这里，让未来的自己（或贡献者）省一次摸索。
