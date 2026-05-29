---
title: 4. 你的第一个世界
description: 创建一个最小 VRChat World：地板、出生点、VRC Scene Descriptor、Build & Test。理解每一步为什么要这样做。
---

# 4. 你的第一个世界

这一章的目标很简单：让你站进自己做的世界里。

它会很空。可能只有一块地板、一个出生点、默认天空和一盏灯。但你会第一次看到 VRChat 客户端打开你自己的场景，你站在里面，抬头能看天，低头能看地板。

这一步很重要。因为从这一刻起，Unity 里的那些方块就不再只是编辑器里的方块了。它们变成了一个你能走进去的空间。

## 三个问题

在动手之前，先想一想：一个"世界"最少需要什么？

VRChat 要回答三个问题才能让一个玩家进入：

1. **空间里有什么可以站的地方？** → 需要一块有碰撞体的地面
2. **玩家进来之后站在哪里、面朝哪里？** → 需要一个出生点
3. **这个 Unity 场景是 VRChat 世界吗？** → 需要一个 VRC Scene Descriptor

三个问题，三个对应的东西。我们逐个做。

## 保存一个新场景

打开上一章创建的 World 项目。

在 Unity 里新建一个场景（File → New Scene），然后马上保存它（Ctrl+S）。名字叫 `MyFirstWorld`，放在 `Assets/Scenes/` 下面。没有这个目录就建一个。

🤔 **为什么先保存？** Unity 里的东西大部分存在场景文件里。如果你做了半天没保存，Unity 崩了（它偶尔会），你的工作就没了。而且 VRChat SDK 在构建时需要知道当前场景的文件路径。先保存再开始做，是一个好习惯。

## 第一个问题：有什么可以站的地方

在 Hierarchy 面板里右键，Create → 3D Object → Cube。改名叫 `Floor`。

选中它，在 Inspector 里找到 Transform。把数值改成：

- Position：`0, 0, 0`
- Rotation：`0, 0, 0`
- Scale：`10, 0.2, 10`

它会变成一块 10 米宽、10 米长、0.2 米厚的扁板子。这就是你的地板。

材质先不用管。默认灰白色就行。第一版世界的重点是能跑，好看是下一步的事。

🤔 **为什么是 Cube 而不是 Plane？** Unity 有一个 Plane 对象，看起来更像"地面"。但 Plane 是单面的（只有上面），在某些角度看会消失。Cube 是六面都有的实体，作为地板更不容易出奇怪的视觉问题。而且 Cube 自带 Box Collider（碰撞体），玩家踩上去不会穿过去。

## 第二个问题：站在哪里、面朝哪里

VRChat 需要知道：玩家进来之后，站在哪里？面朝哪个方向？

在 Hierarchy 里创建一个空物体（右键 → Create Empty），改名叫 `Spawn`。

把它的 Position 设成 `0, 1, 0`。

为什么 Y 值是 1 而不是 0？因为地板的上表面在 Y = 0.1（地板厚度的一半）。出生点设在 Y = 1，玩家会从略高于地面的地方出现，然后自然落到地面上。如果设成 0，玩家可能卡在地板里面或者直接穿过去掉下去。

出生点的朝向也很重要。玩家进来后会面向这个空物体的 forward 方向（也就是蓝色 Z 轴箭头指向的方向）。现在先保持默认 Rotation `0, 0, 0`。

⚠️ **坑：** 以后做正式世界时，注意出生点面朝的方向。如果玩家一进来就面对一堵墙或者一片空无，第一印象会很差。好的出生点应该让玩家看到世界最吸引人的部分。这是一个体验设计的问题，我们在后面的章节会专门聊。

## 第三个问题：让 VRChat 认识这个场景

每个 VRChat World 场景都需要一个 VRC Scene Descriptor 组件。它的作用是告诉 VRChat SDK：这个 Unity 场景是一个要发布成 VRChat World 的场景。

创建另一个空物体，改名叫 `WorldDescriptor`。选中它，在 Inspector 里点 Add Component，搜索 `VRC Scene Descriptor`，加上去。

加好之后，在 Descriptor 组件里找到 Spawns 相关的设置，把刚才创建的 `Spawn` 拖进去。这样 VRChat 就知道玩家应该从这个位置进入世界。

🤔 **为什么需要这个组件？** Unity 是一个通用引擎，它不知道你在做 VRChat 世界还是在做单机游戏。VRC Scene Descriptor 是你跟 VRChat 说的第一句话："嗨，这是给你的。玩家从这里进来。" 没有它，SDK 的 Build & Test 按钮不会让你按。

## 让场景亮起来

新场景通常自带一个 Directional Light。先别删它。

如果你的场景看起来很暗，确认 Hierarchy 里有一个 Directional Light 存在。它的作用像太阳，不管放在哪里，都从一个方向把整个场景照亮。

现在不用研究光照系统，先让你能看清自己做了什么。

## Build & Test：站进去

在 Unity 顶部菜单里找到 `VRChat SDK`，打开控制面板。如果它提示你登录 VRChat 账号，就先登录。

然后点 **Build & Test**。

Unity 会开始构建本地测试版本。这个过程需要一两分钟。构建完成后会自动启动 VRChat 客户端。

如果一切顺利，你会进入一个很空的世界。脚下是一块地板。天空是默认的蓝色。四周什么都没有。

走两步。转一圈。看一下天空。

**恭喜你。这是你的第一个世界。**

它比你玩过的任何世界都简陋。但它是你做的。你可以回 Unity 改一点东西，再 Build & Test 一次，改动就会反映在里面。这个循环——改、构建、进去看——就是以后做世界的日常节奏。

## 如果没有成功

**看不到 VRChat SDK 菜单？** 回到 VCC，确认这个项目是 World 项目，并且 Worlds SDK 已经安装好了。

**SDK 面板提示缺少 Descriptor？** 检查当前打开的场景里有没有 `VRC Scene Descriptor` 组件。注意它要在当前场景里，在项目文件夹里有但没放进场景里是不行的。

**玩家进去之后直接往下掉？** 通常是地板的 Collider 被删了，或者出生点放到了地板下面。Cube 默认带 Box Collider，确认你没有手动删掉它。也确认 Spawn 的 Y 值大于地板上表面。

**构建失败了？** 打开 Console，先看红色错误。第一步是确认错误来自哪里：是 Unity 本身的报错，还是 VRChat SDK 的，还是你写的脚本的（现在还没写脚本，所以如果有脚本错误，可能是 SDK 包没装好）。

**进入后面朝的方向很奇怪？** 调整 `Spawn` 的 Rotation Y。玩家进入世界时会跟随出生点的朝向。

**Build & Test 之后 VRChat 客户端没有启动？** 确认你已经在 SDK 面板里登录了 VRChat 账号。也确认电脑上装了 VRChat 客户端（Steam 或官方版本都行）。

🤖 **AI 能帮忙：** 如果你遇到了上面没列出的问题，把完整的报错信息、你的 Unity 版本、SDK 版本一起贴给 AI，让它帮你排查。告诉它你在做最简单的第一个世界，场景里只有地板、出生点和 Descriptor。

## 你刚刚做了什么

回顾一下。你做了一个最小 VRChat World：

- 一个 Unity 场景文件（`MyFirstWorld.unity`）
- 一块有碰撞体的地板（`Floor`，Cube 缩放成扁板）
- 一个标记进入位置的空物体（`Spawn`）
- 一个告诉 VRChat "这是世界"的组件（`VRC Scene Descriptor`）
- 一次成功的 Build & Test

这几件事看起来很普通，但它们完成了一件重要的事：**把 Unity 场景变成了 VRChat 可以打开的世界。** 后面所有的内容，都是在这个基础上往上加东西：加材质、加灯光、加声音、加交互、加同步、加性能优化。

地基打好了。以后不管做多复杂的世界，底下都是同样的结构：一个场景、可以站的地面、出生点、Scene Descriptor。

## 自己改着玩

站进去之后，回到 Unity 试试这些：

- 把 Floor 的 Scale 改成 `20, 0.2, 20`，再 Build & Test，看看世界变大了是什么感觉
- 把 Spawn 的 Rotation Y 改成 180，进去看看是不是面朝反了
- 多创建几个 Cube 放在不同位置（别忘了它们也有 Collider），进去试试能不能跳到上面
- 把 Directional Light 删掉，进去看看世界变成什么样（然后再加回来）

每一次修改 → Build & Test → 进去感受，你都在建立对 Unity 和 VRChat 关系的直觉。

---

你已经站进去了。接下来，我们回头看看刚才那些东西到底是什么。下一部开始认识 Unity 这张工作台。

## 本章参考

- [Creating Your First World](https://creators.vrchat.com/worlds/creating-your-first-world/)
- [VRC Scene Descriptor](https://creators.vrchat.com/worlds/components/vrc_scenedescriptor/)
- [Using Build & Test](https://creators.vrchat.com/worlds/udon/using-build-test/)
- [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
- [Unity Manual: Primitive Objects](https://docs.unity3d.com/Manual/PrimitiveObjects.html)
