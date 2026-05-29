---
title: 4. 你的第一个世界
description: 创建一个最小 VRChat World：地板、出生点、VRC Scene Descriptor、Build & Test。
---

# 4. 你的第一个世界

这一章的目标很简单：让你站进自己做的世界里。

它会很空。可能只有一块地板、一个出生点、默认天空和一盏灯。但你会第一次看到 VRChat 客户端打开你自己的场景，你站在里面，抬头能看天，低头能看地板。

这一步很重要。因为从这一刻起，Unity 里的那些方块就不再只是编辑器里的方块了。它们变成了一个你能走进去的空间。

## 保存一个新场景

打开上一章创建的 World 项目。

在 Unity 里新建一个场景（File → New Scene），然后马上保存它。名字叫 `MyFirstWorld`，放在 `Assets/Scenes/` 下面。没有这个目录就建一个。

先养成保存场景的习惯。Unity 里的东西大部分存在场景文件里，没保存就开始测试，很容易把自己绕晕。

## 放一块地板

在 Hierarchy 面板里右键，Create → 3D Object → Cube。改名叫 `Floor`。

选中它，在 Inspector 里找到 Transform。把 Position 设成 `0, 0, 0`，Rotation 设成 `0, 0, 0`，Scale 设成 `10, 0.2, 10`。

它会变成一块扁扁的大板子。这就是你的地板。

材质先不用管。默认灰白色就行。第一版世界的重点是能跑，好看是下一步的事。

## 放一个出生点

VRChat 需要知道：玩家进来之后，站在哪里？面朝哪个方向？

在 Hierarchy 里创建一个空物体（Create Empty），改名叫 `Spawn`。把它的 Position 设成 `0, 1, 0`。Y 值设为 1 是为了让出生点离地面有一点高度，避免玩家卡在地板里。

出生点的朝向也很重要。玩家进来后会面向这个空物体的 forward 方向（也就是蓝色箭头指向的方向）。以后做正式世界时，别让玩家一进来就面朝一堵墙。现在先保持默认 Rotation `0, 0, 0`。

## 添加 VRC Scene Descriptor

每个 VRChat World 场景都需要一个 VRC Scene Descriptor。它告诉 VRChat SDK：这个 Unity 场景是一个世界，不只是普通 Unity 项目。

创建另一个空物体，改名叫 `WorldDescriptor`。选中它，在 Inspector 里点 Add Component，搜索 `VRC Scene Descriptor`，加上去。

加好之后，在 Descriptor 组件里找到和 Spawns 相关的设置，把刚才创建的 `Spawn` 拖进去。这样 VRChat 就知道玩家应该从哪里进入世界。

## 让场景亮起来

新场景通常自带一个 Directional Light。先别删它。如果你的场景看起来很暗，确认 Hierarchy 里有一个 Directional Light 存在，让它斜着照向地板就行。现在不用研究光照系统，先让你能看清自己做了什么。

## Build & Test

在 Unity 顶部菜单里找到 `VRChat SDK`，打开控制面板。如果它提示你登录 VRChat 账号，就先登录。

然后点 Build & Test。

Unity 会开始构建本地测试版本，构建完成后会自动启动 VRChat 客户端。如果一切顺利，你会进入一个很空的世界。脚下是一块地板。天空是默认的蓝色。四周什么都没有。

走两步。转一圈。看一下天空。

恭喜你。这是你的第一个世界。

## 如果没有成功

看不到 VRChat SDK 菜单？回到 VCC，确认这个项目是 World 项目，并且 Worlds SDK 已经安装好了。

SDK 面板提示缺少 Descriptor？检查当前打开的场景里有没有 `VRC Scene Descriptor` 组件。注意它要在当前场景里，在项目文件夹里有但没放进场景里是不行的。

玩家进去之后直接往下掉？通常是地板的 Collider 被删了，或者出生点放到了地板下面。Cube 默认带 Box Collider，确认你没有手动删掉它。也确认 Spawn 的 Y 值大于 0（地板的上表面）。

构建失败了？打开 Console，先看红色错误。不要急着到处改东西。第一步是确认错误来自哪里：是 Unity 本身的报错，还是 VRChat SDK 的，还是你写的脚本的。

进入后面朝的方向很奇怪？调整 `Spawn` 的 Rotation Y。玩家进入世界时会跟随出生点的朝向。

## 你刚刚做了什么

你做了一个最小 VRChat World。一个 Unity 场景，一块地板，一个出生点，一个 VRC Scene Descriptor，一次 Build & Test。

这几件事看起来很普通，但它们已经把「Unity 场景」变成了「VRChat 可以打开的世界」。后面所有的内容，都是在这个基础上往上加东西：加材质、加灯光、加声音、加交互、加同步、加性能优化。

你已经站进去了。接下来，我们回头看看刚才那些东西到底是什么。

---

下一部，我们开始认识 Unity 这张工作台。

## 本章参考

- [Creating Your First World](https://creators.vrchat.com/worlds/creating-your-first-world/)
- [VRC Scene Descriptor](https://creators.vrchat.com/worlds/components/vrc_scenedescriptor/)
- [Using Build & Test](https://creators.vrchat.com/worlds/udon/using-build-test/)
- [Unity GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
