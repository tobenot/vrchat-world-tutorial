---
title: 3. 装好工具，准备出发
description: 安装 VRChat 世界开发需要的工具链，理解每个工具的角色和它们之间的关系。
---

这一章我们把工具装好。

你可能想直接打开 Unity 做世界。但 VRChat 世界开发有一条关键原则：**版本必须配对。** Unity 版本、VRChat SDK 版本、项目模板，三者必须对得上。版本不匹配，后面会遇到各种诡异的报错，而且你很难定位原因。

最省心的路线是：跟着 VRChat Creator Companion 走。它帮你管版本。

## 工具链全景图

在开始装之前，先理解你即将用到的工具各自扮演什么角色：

```text
VRChat Creator Companion (VCC)
  │  项目管家：创建项目、管理 SDK 包、提醒更新
  │
  ├─► Unity Hub
  │     安装和管理不同版本的 Unity 编辑器
  │
  ├─► Unity Editor
  │     你真正搭世界的地方：摆物体、调灯光、写脚本、测试
  │
  └─► VRChat SDK - Worlds
        装在 Unity 项目里的一组工具，让场景能被 VRChat 识别
```

你可以把这个关系想象成：VCC 是领班，Unity Hub 是工具柜，Unity Editor 是工作台，SDK 是工作台上的一套专用工具。

🤔 **为什么需要这么多层？** 因为 VRChat 世界借用了 Unity 这个存在二十年的专业游戏引擎来搭建。SDK 是一座桥，把 Unity 的能力（3D 渲染、物理、脚本）接到 VRChat 的系统（多人、世界上传、玩家控制）上。VCC 则帮你确保这座桥两头的版本对得上。

## 第一步：装 VCC

打开 VRChat 官方的 Creator Docs：[creators.vrchat.com/sdk](https://creators.vrchat.com/sdk/)

下载 VRChat Creator Companion，安装。打开后它可能会提示你登录 VRChat 账号。登录就好。后面 Build & Test 和上传世界都会用到账号状态。

VCC 装好后，你以后打开项目都尽量从它开始。它知道你的每个项目用了什么版本的 SDK，哪些包需要更新，版本是否匹配。

## 第二步：确认 Unity 版本

这一步非常重要：**一定要装 VRChat 官方指定的那个 Unity 版本。**

VRChat 对 Unity 版本有严格要求。官方只支持一个特定版本（包括次版本号）。装错了版本，轻则 SDK 不工作，重则项目损坏。

正确做法：打开官方页面确认当前支持哪个版本 → [Current Unity Version](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)

然后用 Unity Hub 安装**那个精确版本**。安装时把 Windows 平台的基础模块装上就行。Quest 或 Android 相关模块等你以后真正要做 Quest 版本时再补。

⚠️ **坑：** Unity 的版本号长这样：`2022.3.22f1`。注意最后的 `f1` 也是版本号的一部分。装了 `2022.3.21f1` 而不是 `2022.3.22f1`，就可能出问题。一定要跟官方页面上写的完全一致。

## 第三步：用 VCC 创建世界项目

打开 VCC，进入 Projects 页面，选择创建新项目。项目类型选 **World**（我们做的是世界，Avatar 是做模型用的）。

项目名先简单一点就好，比如 `MyFirstWorld`。放到一个专门的目录下面，比如 `D:\VRChatProjects\MyFirstWorld`。

VCC 会帮你准备好一个适合 VRChat World 的 Unity 项目，Worlds SDK 相关的包也会自动装进去。

### 项目路径注意事项

这是个小事但能帮你避免很多莫名其妙的问题：

- 用英文路径。`D:\VRChatProjects\` ✓，`D:\我的项目\` ✗
- 路径保持短。`D:\a\b\c\d\e\f\g\MyWorld` 可能触发 Windows 的路径长度限制
- 避开网盘同步目录。OneDrive、iCloud、Google Drive 会跟 Unity 的文件监视冲突
- 避开桌面。桌面路径往往包含用户名，有时候用户名里有特殊字符

## 第四步：打开项目

在 VCC 的项目列表里找到刚创建的项目，点击打开 Unity。

第一次打开会比较慢。Unity 需要导入包、编译脚本、生成缓存。进度条会卡在右下角跑一会儿。正常情况下 3–10 分钟。你可以去倒杯水。

打开之后，确认这几件事：

1. Unity 顶部菜单里能看到 `VRChat SDK` 这个选项
2. Project 面板里能看到 Packages 下的 SDK 相关包
3. Console 面板没有一大片红色错误（黄色警告可以先忽略）
4. 场景能正常保存（Ctrl+S）

如果 Console 有红色报错，先停下来。把错误完整复制下来留着查。很多时候是包还没导完、脚本还在编译、或者 Unity 版本不匹配。

## Unity 编辑器：初次见面

第一次打开 Unity，你会看到一个由很多面板组成的界面。看着密密麻麻的，但你眼下只需要认识四块区域：

- **Scene 视图**（中间大区域）— 你搭世界的画布，3D 视角看场景
- **Hierarchy**（左侧）— 场景里所有物体的列表
- **Inspector**（右侧）— 选中物体的详细信息
- **Project**（下方）— 你的所有文件：模型、材质、脚本、声音等

以后还有 Console（显示报错）、Game 视图（模拟玩家视角）等面板。但第一天，先认识这四块就够了。

🤔 **为什么是这样？** Unity 的界面为什么这么复杂？因为它是一个通用游戏引擎，能做 2D 游戏、3D 游戏、VR、AR、影视预览、建筑可视化……它的面板和功能要服务所有这些场景。你做 VRChat 世界只会用到其中一小部分。这本书的工作就是帮你在这片密密麻麻的面板里找到「你需要的那 20%」。

## 先不要装别的

新手很容易一口气装太多东西。Shader 包、模型插件、后处理效果、社区脚本库，感觉每个都有用。

先收住。

第一阶段只要 VCC、Unity Hub、官方要求的 Unity 版本、Worlds SDK，加一个干净的世界项目。够了。

等第一个世界跑起来之后再加工具。原因很简单：工具越多，出错时越难判断是谁的问题。一个干净项目能跑起来，说明基础环境没问题。以后加了什么东西导致出错，你马上就能缩小范围。

🤔 **为什么是这样？** 这是开发中非常重要的思维方式，叫做「隔离变量」。当你一次只加入一个新东西，出了问题你立刻知道是它引起的。一次加入十个新东西再出问题？祝你好运找原因。这个思路以后调试 bug 也会反复用到。

## 如果卡住了

**VCC 找不到 Unity？** 打开 Unity Hub 确认对应版本已经装好。再回到 VCC 设置里检查 Unity 路径是否正确。

**Unity 打开项目很慢？** 第一次打开慢很正常。等右下角的进度条跑完再说。如果卡了超过十分钟还在转，可以关掉重开一次。

**Console 里有红色错误？** 先保存完整错误信息。看里面有没有 `UdonSharp`、`VRChat SDK`、`package`、`version` 这些关键词。尽量截完整的报错，只有最后一行往往判断不了原因。

**项目创建失败？** 换一个更短的英文路径试试。先避开桌面、下载目录、OneDrive 和带中文的路径。

**Unity Hub 提示需要 License？** Unity 个人版是免费的（Personal License）。按提示激活就好，只需要一个 Unity 账号。

🤖 **AI 能帮忙：** 如果你遇到了一个看不懂的报错，把完整错误信息和你的 Unity 版本号、SDK 版本号一起贴给 AI。让它帮你判断是环境问题还是项目问题。

---

下一章，我们打开这个空项目，做出第一个能站进去的世界。

## 本章参考

- [VRChat SDK](https://creators.vrchat.com/sdk/)
- [Current Unity Version](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)
- [Creating Your First World](https://creators.vrchat.com/worlds/creating-your-first-world/)
- [Unity Hub](https://unity.com/unity-hub)
