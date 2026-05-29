---
title: 4. 你的第一个世界
description: 创建一个最小 VRChat World：地板、出生点、VRC Scene Descriptor、Build & Test。
---

# 4. 你的第一个世界

这一章的目标很简单：让你站进自己做的世界里。

它会很空。可能只有一块地板、一个出生点、默认天空和一盏灯。但你会第一次看到 VRChat 打开你自己的场景。

这一步很重要。因为从这一刻开始，Unity 里的东西不再只是编辑器里的方块，它们会变成你能走进去的空间。

## 先保存一个新场景

打开上一章创建的 World 项目。

在 Unity 里新建一个场景，然后保存。名字可以叫：

```text
MyFirstWorld.unity
```

建议放在项目里的 `Assets/Scenes/` 目录。没有这个目录就新建一个。

```text
Assets/Scenes/MyFirstWorld.unity
```

先养成保存场景的习惯。Unity 里很多东西都在场景文件里，没保存就开始测试，很容易把自己绕晕。

## 放一块地板

在 Hierarchy 面板里创建一个 Cube。

把它改名为：

```text
Floor
```

在 Inspector 里设置 Transform：

| 属性 | 值 |
|---|---|
| Position | `0, 0, 0` |
| Rotation | `0, 0, 0` |
| Scale | `10, 0.2, 10` |

这样它会变成一块扁扁的大地板。

你也可以把材质先放着。默认白色或灰色都可以。第一版世界的重点是能跑，不是好看。

## 放一个出生点

VRChat 需要知道玩家进入世界时站在哪里。

创建一个空物体，改名为：

```text
Spawn
```

把它的位置设置成：

| 属性 | 值 |
|---|---|
| Position | `0, 1, 0` |
| Rotation | `0, 0, 0` |
| Scale | `1, 1, 1` |

这里的 `Y = 1` 是为了让出生点离地面有一点高度。后面你会更精细地调整玩家朝向和高度。现在先让它能用。

> 小提醒：出生点的朝向很重要。玩家进来后会面向这个物体的 forward 方向。以后做正式世界时，别让玩家一进来就面对墙。

## 添加 VRC Scene Descriptor

每个 VRChat World 场景都需要一个 VRC Scene Descriptor。它用来描述这个场景作为 VRChat 世界时的基本信息。

你可以创建一个空物体，改名为：

```text
WorldDescriptor
```

然后给它添加 `VRC Scene Descriptor` 组件。

在 Descriptor 里找到 Spawns 相关设置，把刚刚创建的 `Spawn` 放进去。这样 VRChat 就知道玩家从哪里进入世界。

官方文档里也会强调：每个要作为 VRChat World 使用的 Unity 场景，都需要 `VRC_SceneDescriptor`。

## 加一点光

新场景里通常会有默认 Directional Light。先保留它。

如果你的场景很暗，可以创建一个 Directional Light，名字叫：

```text
Sun
```

让它斜着照向地板。现在不用研究光照系统，先让你能看清地板。

## 打开 VRChat SDK 面板

在 Unity 顶部菜单里找到 `VRChat SDK`。

打开 Worlds 相关的控制面板。你会看到构建、测试、登录和校验相关的内容。

先登录你的 VRChat 账号。登录后，SDK 才能进行本地测试和后续上传。

## Build & Test

现在可以点 Build & Test。

Unity 会开始构建本地测试版本，然后启动 VRChat 客户端。如果一切顺利，你会进入一个很空的世界，脚下是一块地板。

走两步。转一圈。看一下天空。

这就是你的第一个世界。

## 如果没有成功

### 看不到 VRChat SDK 菜单

回到 VCC，确认这个项目是 World 项目，并且已经安装 Worlds SDK。

### SDK 面板提示缺少 Descriptor

检查场景里有没有 `VRC Scene Descriptor` 组件。它要在当前打开的场景里，不是只存在于项目文件夹里。

### 玩家掉下去了

通常是地板位置、Collider 或出生点位置有问题。Cube 默认带 Box Collider。确认地板没有被你删掉 Collider，也确认 Spawn 没有放到地板下面。

### 构建失败

打开 Console，先看红色错误。不要急着改一堆东西。第一步是确认错误来自哪里：Unity、VRChat SDK、UdonSharp，还是项目资源。

### 进入后朝向奇怪

调整 `Spawn` 的 Rotation。玩家进入世界时会跟随出生点方向。这个问题以后做空间动线时会反复遇到。

## 你刚刚做了什么

你做了一个最小 VRChat World。

它包含：

- 一个 Unity 场景；
- 一块作为地面的 GameObject；
- 一个作为出生位置的空物体；
- 一个 VRC Scene Descriptor；
- 一次 Build & Test。

这几件事看起来很普通，但它们已经把「Unity 场景」变成了「VRChat 可以打开的世界」。

后面的所有内容，都是在这个基础上往上加：加材质、加灯光、加声音、加交互、加同步、加性能优化。

## 这一章你要带走的东西

- 第一个世界越小越好，目标是跑起来；
- VRC Scene Descriptor 是世界入口，场景里必须有；
- Spawn 决定玩家进入世界的位置和朝向；
- Build & Test 是你最重要的反馈按钮，多按、多看、多记录。

下一部，我们开始认识 Unity 这张工作台。你已经站进去了，现在该回头看看刚才那些东西到底是什么。

## 本章参考

- [Creating Your First World](https://creators.vrchat.com/worlds/creating-your-first-world/)
- [VRC Scene Descriptor](https://creators.vrchat.com/worlds/components/vrc_scenedescriptor/)
- [Using Build & Test](https://creators.vrchat.com/worlds/udon/using-build-test/)
- [Unity GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
