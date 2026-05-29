---
title: 3. 装好工具，准备出发
description: 安装 VRChat 世界开发需要的工具：VRChat Creator Companion、Unity Hub、Unity 编辑器和 Worlds SDK。
---

# 3. 装好工具，准备出发

这一章我们把工具装好。

你先别急着打开 Unity 做世界。VRChat World 开发有几个东西必须版本配对：Unity 版本、VRChat SDK、项目模板、账号登录。版本对不上，后面会遇到很多奇怪的问题。

最省心的路线是：跟着 VRChat Creator Companion 走。

## 四样东西

你总共需要装四样东西。

第一个叫 VRChat Creator Companion，大家简称 VCC。它是 VRChat 官方出的项目管家，帮你创建项目、管理 SDK 包、提醒版本更新。以后打开项目也尽量从它开始。

第二个是 Unity Hub。它用来安装和管理不同版本的 Unity 编辑器。你以后可能同时装好几个 Unity 版本，Unity Hub 帮你切换。

第三个是 Unity Editor 本体。这是你真正搭世界的地方。摆物体、调灯光、写脚本、测试，全在这里面。

第四个是 VRChat SDK - Worlds。这个包装在 Unity 项目里，让你的 Unity 场景能被构建、测试和上传到 VRChat。VCC 创建 World 项目时会自动帮你装好它。

## 装 VCC

打开 VRChat 官方的 Creator Docs（[creators.vrchat.com/sdk](https://creators.vrchat.com/sdk/)），下载 VRChat Creator Companion，安装。

打开 VCC 后，它可能会提示你登录 VRChat 账号。登录就好。后面 Build & Test 和上传世界都会用到账号状态。

## 确认 Unity 版本

VRChat 对 Unity 版本有严格要求。不要凭感觉装最新版，也不要随便用别的教程里的旧版本。

正确做法是打开官方页面确认当前支持哪个版本：[Current Unity Version](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)。

然后用 Unity Hub 安装那个版本。安装时先把 Windows 平台的基础模块装上就行。Quest 或 Android 相关模块等你以后真正要做 Quest 版本时再补。

有一件小事值得现在就注意：Unity 安装路径和项目路径尽量用英文、短路径。比如 `D:\VRChatProjects\MyFirstWorld`。中文路径、嵌套太深的目录、OneDrive 这种网盘同步目录，都可能在后面给你带来莫名其妙的报错。

## 用 VCC 创建 World 项目

打开 VCC，进入 Projects 页面，选择创建新项目。项目类型选 World。

项目名先简单一点就好，比如 `MyFirstWorld`。放到一个专门的目录下面，比如 `D:\VRChatProjects\MyFirstWorld`。

VCC 会帮你准备好一个适合 VRChat World 的 Unity 项目，Worlds SDK 相关的包也会自动装进去。你可以把 VCC 理解成管家：以后升级 SDK、添加官方包、打开项目，都尽量从这里开始。

## 打开项目

在 VCC 的项目列表里找到刚创建的项目，点击打开 Unity。

第一次打开会比较慢。Unity 需要导入包、编译脚本、生成缓存。进度条会卡在右下角跑一会儿。你可以去倒杯水。

打开之后，先不要到处点。确认这几件事：Unity 顶部菜单里能看到 `VRChat SDK` 这个选项。Project 面板里能看到 SDK 相关的包。Console 面板没有一大片红色错误。场景能正常保存。

如果 Console 有红色报错，先不要继续做世界。把错误完整复制下来留着查。很多时候是包还没导完、脚本还在编译、或者 Unity 版本不匹配。

## 先不要装别的

新手很容易一口气装太多东西。Shader 包、模型插件、后处理效果、社区脚本库，感觉每个都有用。

先收住。

第一阶段只要 VCC、Unity Hub、官方要求的 Unity 版本、Worlds SDK，加一个干净的 World 项目。够了。

等第一个世界跑起来之后再加工具。原因很简单：工具越多，出错时越难判断是谁的问题。一个干净项目能跑起来，说明基础环境没问题。以后加了什么东西导致出错，你马上就能缩小范围。

## 如果卡住了

VCC 找不到 Unity？打开 Unity Hub 确认对应版本已经装好。再回到 VCC 设置里检查 Unity 路径。

Unity 打开项目很慢？第一次打开慢很正常。等右下角的进度条跑完再说。如果卡了超过十分钟还在转，可以关掉重开一次试试。

Console 里有红色错误？先保存完整错误信息。看里面有没有 `UdonSharp`、`VRChat SDK`、`package`、`version` 这些关键词。不要只截最后一行，完整的报错才能判断原因。

项目创建失败？换一个更短的英文路径试试。先避开桌面、下载目录、OneDrive、带中文的路径。

---

下一章，我们打开这个空项目，做出第一个能站进去的世界。

## 本章参考

- [VRChat SDK](https://creators.vrchat.com/sdk/)
- [Current Unity Version](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)
- [Creating Your First World](https://creators.vrchat.com/worlds/creating-your-first-world/)
