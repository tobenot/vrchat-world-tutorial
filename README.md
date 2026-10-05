# 你的第一个 VRChat 世界：从零到发布的完全手册

> Unity 场景、VRChat SDK、UdonSharp、多人同步与世界发布的中文教程。

本书介绍 Unity 基础、VRChat SDK、UdonSharp 编程、多人同步、空间设计、性能检查与发布维护。基础章节从工具安装和场景组件讲起，不要求已有 Unity、C# 或 SDK 使用经验。

👉 **开始学习：<https://vrchat-world-tutorial.pages.dev>**

[![Astro](https://img.shields.io/badge/Astro-5.18-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Starlight-0.35-7E22CE)](https://starlight.astro.build)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](./LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://vrchat-world-tutorial.pages.dev)

## 这是什么

这是一份学习笔记，整理官方文档、社区经验和作者的实践记录。制作过程中使用了 AI 辅助整理，保留此说明作为真实来源记录。

主要供作者复习，并向有相同资料需求的读者开放。

## 内容目录

- **第一部 · 工具与第一个世界**：工具链、VRChat SDK 和最小场景的本地测试。
- **第二部 · 场景物体与组件**：理解 GameObject、Component、Prefab、Material、Light，看懂 Unity 的"组合式"设计思路。
- **第三部 · C# 与 UdonSharp 基础**：从零开始学 UdonSharp，写出第一段能在世界里跑起来的代码。
- **第四部 · 交互与状态**：交互事件、按钮、触发区域、拾取物、座椅、镜子与状态控制。
- **第五部 · 世界类型与设计**：展示型、游戏型、社交型……不同类型世界的设计思路与实现方式。
- **第六部 · 多人同步**：多人同步、网络事件、变量同步——理解 VRChat 的多人架构。
- **第七部 · 空间、音画与性能**：灯光、材质、声音、UI、空间布局与性能条件。
- **第八部 · 调试、测试与资源管理**：调试、测试、版本管理与素材许可。
- **第九部 · 发布与维护**：发布、更新、维护、资料检索与创作者经济。
- **附录 · 速查与参考**：术语表、快捷键、常见错误、资源链接——随时翻阅的工具箱。

完整路线图见线上的 [前言](https://vrchat-world-tutorial.pages.dev/preface/)。

## 适合谁读

- 需要从 Unity、C# 或 Udon 基础操作开始的读者
- 想把"我想做个地方"的想法落地成一个能进去玩的世界
- 需要按目录学习或按问题查阅的操作说明

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

## 本书写作公约

### 文风与事实

1. 直接说明机制、操作、结果和适用条件。参数建议同时说明测试环境与检查方法；不把示例数值写成通用最佳值。
2. 不代入或编造读者的情绪、能力、习惯与失败经历。不使用训诫、读者分级、诗化比喻或静态／动态世界的价值排序。
3. 无来源的“最常见”“头号”“大部分世界”等频率或人气判断，改为可观察的条件和结果。有必要保留统计时给出来源及范围。
4. **不写未来内容预告**：正文、章末、提示框、代码注释、frontmatter 的 `summary` / `description` 与卡片描述均适用。当前操作依赖的机制应当在当前段落解释完整。侧栏、目录卡片、上一页／下一页导航和有用的追溯链接保留。
5. 不写 AI 使用教学、工作流、练习、推荐或提示，也不保留这些内容的旧入口。关于页、Credits、素材来源和许可证中真实的 AI 制作来源记录必须保留；来源披露与教学内容分别审阅。
6. 先核对现有版本，保留已正确的修改。场景进度只能描述本章已建立的对象和能力，不假定还未创建的家具、音频或脚本存在。
7. SDK、Unity 和输入行为用官方资料核对，写清版本与平台差异。区分编辑器效果、客户端运行结果和多人同步结果；不能用网站构建通过代替 Unity／VRChat 实测。
8. `difficulty` 字段使用“基础／进阶／专题”，表示章节内容范围，不评价读者水平。修改字段值时同步 schema、页面徽章、CSS、RSS、OG 卡和写作示例。
9. 精简不以字数或代码块数量为目标。保留独立示例、操作、练习与正常导航；一个可操作单元需交代输入与前提、对象与引用、执行步骤、预期结果和验证入口。词条定义或同名 API 不等于完成了原来的学习目标。
10. 跨章复用时，检查目标内容是否覆盖相同前提、行为和测试结果，再给准确回链。部分覆盖应补齐缺少的步骤；技术纠错应同时检查是否意外改变了权限、状态恢复、反馈或输入处理。明确区分文档构建、代码编译与客户端实测。

### 章节引用

1. **frontmatter `title` 是章名与章号的唯一真源**。链接标签与目录卡片和它保持一致。
2. 正文优先使用稳定 slug 链接和明确的机制名称；链接描述概括目标资料，不用“后面会讲”作为解释。
3. 必须写章号时使用 Markdown 链接 `[第 N 章：章名](slug)` 或 `<LinkCard>`，便于工具同步。
4. 目录、附录和组件速查中的章号保持结构化；修改章名或顺序后运行严格检查。

工具：

```bash
# 检查章号引用是否过期、漂移或冲突
npm run check:chapters

# 文风回归扫描：只检查可识别模式，不能替代逐章审阅
npm run check:copy

# 自动同步可识别的链接 / LinkCard
npm run fix:chapters

# 整体顺移：插一章前一行命令搞定（自动改 frontmatter + LinkCard + 散文 + 链接，再跑 strict 校验）
npm run shift:chapters -- --from 5 --by +1            # 预览
npm run shift:chapters -- --from 5 --by +1 --write    # 写入
```

`npm run build` 默认会跑 `check:chapters:strict`，章号引用错误会阻断构建——CI 也是这条命令。

## 项目文档

| 文档 | 说明 |
|------|------|
| [docs/PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) | 项目全景：设计、技术栈、章节结构、资料导航审阅、审阅清单 |
| [STARLIGHT-FEATURES.md](./STARLIGHT-FEATURES.md) | 写作者手册：Starlight 组件、部署、排错 |

## 目录结构

```text
src/content/docs/      网站的 MDX 正文、入口页与附录
src/overrides/         Starlight 组件覆盖（Head / SiteTitle / PageTitle / Footer）
src/components/        自定义 Astro 组件（字数统计、海报等）
src/pages/             非文档页（rss.xml / 404）
src/styles/            自定义样式
src/assets/images/     教程配图目录
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
