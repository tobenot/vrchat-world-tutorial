---
title: 5. Unity 里的一切都是物体
description: 用 GameObject、Scene、Hierarchy 和 Transform 理解 Unity 工作台。
---

# 5. Unity 里的一切都是物体

你已经做出了第一个世界：一块地板，一个出生点，一个 `VRC Scene Descriptor`。

现在回头看 Unity。刚才那些东西到底是什么？

答案先放一句话：Unity 场景里的东西，基本都从 GameObject 开始。

地板是 GameObject。出生点是 GameObject。灯光是 GameObject。摄像机是 GameObject。以后你放进来的椅子、门、按钮、镜子、传送门，也都会以 GameObject 的形式出现在场景里。

## Scene 是一个世界文件

Unity 的 Scene 可以理解成一个空间文件。你在里面摆物体，调位置，放灯光，挂脚本。保存之后，这些信息会写进一个 `.unity` 文件。

在 VRChat World 开发里，一个 Scene 通常对应一个准备构建成世界的场景。它还需要 `VRC Scene Descriptor` 告诉 SDK：这个 Unity 场景要作为 VRChat 世界来处理。

你上一章做的 `MyFirstWorld.unity`，就是一个 Scene。

## Hierarchy 是你的物体清单

Unity 左侧那个面板叫 Hierarchy。它列出了当前 Scene 里的所有 GameObject。

你可以把它想成目录。你的第一个世界里大概长这样：

```text
MyFirstWorld
├─ Floor
├─ Spawn
├─ WorldDescriptor
├─ Directional Light
└─ Main Camera
```

每一行就是一个 GameObject。选中哪一行，右侧 Inspector 就会展示它身上的详细信息。以后排查问题，你会反复做同一个动作：在 Hierarchy 里找到东西，去 Inspector 里看它身上挂了什么。

## GameObject 本身是个空壳

这是 Unity 里最重要的一个认知：GameObject 本身什么都做不了。

它像一个空盒子。你往里放什么，它就变成什么。

拿你做的 `Floor` 来说。它看起来是一块地板，但它之所以能被看见、能站上去，是因为身上挂着一组叫做 Component 的东西。`Mesh Filter` 给了它形状，`Mesh Renderer` 把它画出来，`Box Collider` 让玩家站上去不会掉。

如果你删掉 `Mesh Renderer`，地板还在 Hierarchy 里，但画面上看不见了。如果删掉 `Box Collider`，它还看得见，但你可能会直接穿过去掉下去。

所以以后看到一个物体，不要只看它叫什么名字。要看它身上挂了什么组件。名字可以骗你，组件不会。

## Transform：位置、旋转、缩放

每个 GameObject 都有一个叫 `Transform` 的组件。它删不掉，绕不开，永远在最上面。

Transform 只管三件事。Position 决定它在空间里的哪个位置。Rotation 决定它朝向哪里。Scale 决定它有多大。

你把 Cube 的 Scale Y 改成 0.2，它就变成一块薄板。你把出生点的 Rotation Y 改成 180，玩家进来就会面朝相反方向。

这三个值你以后会改无数次。改到最后你会发现，大部分操作都只是在找对的物体，改对的 Transform。

## 父子层级：一起动

Hierarchy 里的对象可以一层嵌套一层。把一个物体拖到另一个物体下面，它就变成了子物体。

假设你以后做一扇门。门有门框、门板、把手、开门的音效。你可以把它们都放到一个叫 `Door` 的空物体下面：

```text
Door
├─ DoorFrame
├─ DoorPanel
├─ Handle
└─ OpenSound
```

这样做有一个直接好处：移动 `Door`，底下所有东西跟着动。旋转 `Door`，底下所有东西跟着转。你不用一个一个挪。

以后你做按钮、家具、灯具、任何由好几块东西拼成的物件，都可以用这个思路来组织。

## 空物体很有用

空物体在场景里看不见，但它可能是整个世界里最忙碌的东西。

你上一章创建的 `Spawn` 就是一个空物体。它的工作是标记一个位置和一个朝向，让 VRChat 知道玩家该从哪里进来。

空物体的典型用法：当一组物体的父容器，用来整理层级。当旋转轴心，门绕着它转。当脚本挂载点，逻辑放在一个看不见的物体上。当标记点，触发区域的中心、路径的拐角、音乐播放的起点。

以后你看到 Hierarchy 里有一个空物体，先看看它的名字和位置。很多世界里的关键机制都藏在看不见的对象上。

## 命名这件小事

新手的场景打开之后经常长这样：

```text
Cube
Cube (1)
Cube (2)
GameObject
GameObject (1)
```

五个对象还好。二十个的时候你会开始骂自己：到底哪个 Cube 是地板、哪个是墙、哪个是按钮的底座？

从现在开始改名字。地板叫 `Floor`，出生点叫 `Spawn`，按钮叫 `Button_LightSwitch`，触发区域叫 `Trigger_MusicStart`。名字不用完美，但要让你半个月后还能找到它。

## 动手：给房间加两面墙

打开你的第一个世界项目，试着做这几件事：

1. 选中 `Floor`，按 Ctrl+D 复制一份。改名叫 `Wall_Left`。
2. 调整它的 Position、Rotation 和 Scale，让它竖起来变成一面墙，贴在地板左边缘。
3. 再复制一面墙，叫 `Wall_Right`，放到右边。
4. 在 Hierarchy 里新建一个空物体，命名为 `Room`。
5. 把 `Floor`、`Wall_Left`、`Wall_Right` 全部拖到 `Room` 下面。
6. 选中 `Room`，移动它。三块物体应该会一起跟着动。

做完这个练习，你就理解了 Transform、层级和命名这三件事为什么重要。

---

下一章，我们专门看 Component。你会发现 Unity 里的很多问题，最后都能变成一句话：这个对象身上少了哪个组件？

## 本章参考

- [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
- [Unity Manual: Use components](https://docs.unity3d.com/Manual/UsingComponents.html)
- [VRC Scene Descriptor](https://creators.vrchat.com/worlds/components/vrc_scenedescriptor/)
