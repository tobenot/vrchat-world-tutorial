---
title: 3. 装好工具，准备出发
description: 安装 VRChat 世界开发需要的工具：VRChat Creator Companion、Unity Hub、Unity 编辑器和 Worlds SDK。
---

# 3. 装好工具，准备出发

这一章我们把工具装好。

你先别急着打开 Unity 做世界。VRChat World 开发有几个东西必须配对：Unity 版本、VRChat SDK、项目模板、账号登录。版本对不上，后面会遇到很多奇怪问题。

最省心的路线是：跟着 VRChat Creator Companion 走。

## 你要装哪些东西

先把名字记住就行，暂时不用理解所有细节。

| 工具 | 用来做什么 |
|---|---|
| VRChat Creator Companion | 创建和管理 VRChat 项目，安装 SDK 包 |
| Unity Hub | 安装和管理 Unity 编辑器版本 |
| Unity Editor | 真正搭建世界的编辑器 |
| VRChat SDK - Worlds | 让 Unity 项目能构建、测试和上传 VRChat World |

Creator Companion 经常简称 VCC。后面我会直接叫它 VCC。

## 第一步：安装 VCC

打开 VRChat 官方的 Creator Docs，进入 SDK 相关页面，下载 VRChat Creator Companion。

> 官方入口：[VRChat SDK](https://creators.vrchat.com/sdk/)

安装完成后，打开 VCC。它会帮你管理项目，也会提醒你需要哪些包。

如果它提示你登录 VRChat 账号，就登录。后面 Build & Test、上传世界都会用到账号状态。

## 第二步：确认 Unity 版本

VRChat 对 Unity 版本有要求。这里不要凭感觉装最新版 Unity，也不要随便用教程里的旧版本。

正确做法是打开官方页面确认当前支持的版本：

> 官方入口：[Current Unity Version](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)

然后用 Unity Hub 安装对应版本。

安装 Unity 时，先装 Windows 平台需要的基础模块。Quest 或 Android 相关模块可以等你真正准备做 Quest 版本时再补。

> 小提醒：Unity 安装路径和项目路径尽量用英文、短路径。比如 `D:\VRChatProjects\MyFirstWorld`。中文路径、太深的目录、网盘同步目录，都可能带来额外麻烦。

## 第三步：用 VCC 创建 World 项目

打开 VCC，进入 Projects，选择创建新项目。

项目类型选择 World。项目名可以先简单一点，比如：

```text
MyFirstWorld
```

项目位置建议放到一个专门目录里：

```text
D:\VRChatProjects\MyFirstWorld
```

创建完成后，VCC 会为你准备一个适合 VRChat World 的 Unity 项目，并添加 Worlds SDK 相关包。

你可以把 VCC 理解成项目管家。以后升级 SDK、添加官方包、打开项目，都尽量从这里开始。

## 第四步：打开项目

在 VCC 的项目列表里找到刚刚创建的项目，点击打开 Unity。

第一次打开会比较慢。Unity 需要导入包、编译脚本、生成缓存。你可以去倒杯水。

打开后，先不要到处点。确认几件事：

- Unity 顶部菜单里能看到 `VRChat SDK`；
- Project 面板里能看到和 VRChat SDK 相关的包；
- Console 面板没有一大片红色错误；
- 场景能正常保存。

如果 Console 有红色错误，先不要继续做世界。把错误完整复制下来，留到排查。很多问题是包没导完、脚本还在编译、Unity 版本不匹配。

## 你现在不用装的东西

新手很容易一口气装太多东西：Shader、模型插件、地图工具、后处理包、各种社区脚本。

先收住。

第一阶段只要这些东西：

- VCC；
- Unity Hub；
- 官方要求的 Unity 版本；
- Worlds SDK；
- 一个干净的 World 项目。

等第一个世界跑起来，再加工具。工具越多，出错时越难判断是谁的问题。

## 一个干净项目长什么样

你现在的目标很小：能打开 Unity，能看到 VRChat SDK 菜单，能保存场景，Console 没有明显红色错误。

这就够了。

很多教程会在这一步开始导入模型、天空盒、材质包。我们先不做。下一章要做的第一个世界非常小，一块地板，一个出生点，一个能被 Build & Test 打开的场景。

## 如果卡住了

### VCC 找不到 Unity

打开 Unity Hub，确认对应版本已经安装。再回到 VCC 设置里检查 Unity 路径。

### Unity 打开项目很慢

第一次打开慢很正常。它要导入包和编译脚本。等右下角的进度条跑完，再判断有没有问题。

### Console 里有红色错误

先保存完整错误。看错误里有没有 `UdonSharp`、`VRChat SDK`、`package`、`version` 这些关键词。不要只截最后一行。

### 项目创建失败

换一个更短的英文路径。比如 `D:\VRChatProjects\TestWorld`。先避开桌面、下载目录、OneDrive、带中文的路径。

## 这一章你要带走的东西

- VRChat World 开发从 VCC 开始，别手动拼 SDK；
- Unity 版本以 VRChat 官方当前支持版本为准；
- 第一个项目保持干净，少装插件；
- 路径用英文短路径，后面少很多麻烦。

下一章，我们打开这个空项目，做出第一个能站进去的世界。

## 本章参考

- [VRChat SDK](https://creators.vrchat.com/sdk/)
- [Current Unity Version](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)
- [Creating Your First World](https://creators.vrchat.com/worlds/creating-your-first-world/)
