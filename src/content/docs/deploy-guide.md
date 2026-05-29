---
title: 附录：网站搭建与部署
description: 从本地预览、GitHub 推送到 Cloudflare Pages 部署的操作清单。
sidebar:
  label: 附录：部署指南
---

# 网站搭建与部署

操作检查清单。以后忘了怎么更新网站，回来看这里。

## 本地写作流程

### 1. 启动预览

在项目根目录运行：

```bash
npm run dev
```

打开终端提示里的地址，通常是：

```text
http://localhost:4321
```

### 2. 新建章节

所有正式网页文章都放在：

```text
src/content/docs/
```

建议按章节建目录，例如：

```text
src/content/docs/01-getting-started/01-curiosity.md
```

图片、截图和 GIF 放在：

```text
src/assets/images/
```

### 3. 更新侧边栏

新增章节后，打开 `astro.config.mjs`，在 `sidebar` 里增加对应链接。

例如：

```js
{ label: '2. AI 是你的创作搭档', link: '/01-getting-started/02-ai-partner/' }
```

### 4. 提交并推送

```bash
git add .
git commit -m "docs: 新增章节内容"
git push
```

推送后，Cloudflare Pages 会自动重新构建并更新网站。

## Cloudflare Pages 部署设置

进入 Cloudflare Pages 后选择连接 Git 仓库，核心设置如下：

| 项目 | 填写 |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | 留空，使用仓库根目录 |
| Production branch | `main` |

部署成功后，站点地址：

```text
https://vrchat-world-tutorial.pages.dev
```

## 避坑提醒

- `node_modules/`、`dist/` 不要提交到仓库。
- 大于 25MB 的超大 GIF、UnityPackage 或素材包不要直接塞进仓库，放到 GitHub Releases 再在文章里贴下载链接。
- 技术章节写完后，尽量标注使用的 Unity、VRChat SDK、UdonSharp 版本。
