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

Unity 的 Scene 可以理解成一个空间文件。

你在 Scene 里摆物体，调位置，放灯光，挂脚本，保存之后，这些信息会写进 `.unity` 场景文件。

在 VRChat World 开发里，一个 Scene 通常对应一个准备构建成世界的场景。它还需要 `VRC Scene Descriptor` 这样的 VRChat 组件，告诉 SDK：这个 Unity 场景要作为 VRChat 世界来处理。

第一章你做的 `MyFirstWorld.unity`，就是一个 Scene。

## Hierarchy 是场景里的物体清单

Unity 左侧的 Hierarchy 面板，是当前 Scene 里的 GameObject 清单。

你可以把它想成一个目录：

```text
MyFirstWorld
├─ Floor
├─ Spawn
├─ WorldDescriptor
├─ Directional Light
└─ Main Camera
```

每一行都是一个 GameObject。

选中某一行，右侧 Inspector 就会显示它身上有哪些东西。你以后排查问题，很多时候就是在 Hierarchy 里找到对象，再去 Inspector 里看组件和参数。

## GameObject 是容器

Unity 官方文档里对 GameObject 的解释很关键：GameObject 是 Unity 场景中的基础对象，它本身作为组件的容器存在，具体功能由挂在它身上的 Component 决定。

这句话刚开始有点抽象。我们拿你已经做过的 `Floor` 来看。

`Floor` 看起来是一块地板，但它能成为地板，是因为它身上有一组组件：

| 组件 | 作用 |
|---|---|
| Transform | 决定它在哪里、多大、朝向哪里 |
| Mesh Filter | 提供立方体的形状数据 |
| Mesh Renderer | 把它画出来 |
| Box Collider | 让玩家站在上面，不会掉下去 |

删掉 `Mesh Renderer`，它还在场景里，但你看不见。

删掉 `Box Collider`，它还看得见，但你可能会掉下去。

改 `Transform` 的 Scale，它就从小方块变成大地板。

所以你要建立一个习惯：看到物体时，不只看它叫什么，还要看它身上挂了什么组件。

## Transform 是每个物体都有的组件

每个 GameObject 都有 `Transform`。它删不掉，也绕不开。

`Transform` 负责三件事：

| 字段 | 意思 |
|---|---|
| Position | 位置 |
| Rotation | 旋转 |
| Scale | 缩放 |

你移动地板，改的是 Position。

你让出生点面向另一个方向，改的是 Rotation。

你把 Cube 拉成一块地板，改的是 Scale。

先把这三个字段练熟，后面学灯光、摄像机、按钮、触发区域都会用到它们。

## Parent 和 Child 是层级关系

Hierarchy 里的对象可以一层套一层。

例如你以后做一扇门，可能会有这样的结构：

```text
Door
├─ DoorModel
├─ DoorHandle
└─ OpenSound
```

`Door` 是父物体，下面三个是子物体。

父物体移动时，子物体会跟着移动。父物体旋转时，子物体也会跟着转。这个规则很适合整理复杂对象。

比如你做一个按钮，不妨把模型、碰撞体、脚本都整理到同一个父物体下面。以后移动按钮时，只动父物体就行。

## Empty GameObject 有什么用

空物体没有模型，看起来像什么都没有。它依然很有用。

你上一章创建的 `Spawn` 就可以是空物体。它的作用是提供一个位置和方向。

空物体常见用途：

- 作为出生点；
- 作为一组物体的父物体；
- 作为旋转轴心；
- 作为脚本挂载点；
- 作为触发逻辑的标记点。

以后你看到一个空物体，不要急着删。先看它的名字、位置、子物体和组件。很多世界里的关键逻辑都挂在看不见的对象上。

## 命名会救你很多次

新手常见场景长这样：

```text
Cube
Cube (1)
Cube (2)
GameObject
GameObject (1)
```

一开始还能忍。对象一多，你就找不到谁是谁。

从现在开始养成命名习惯：

| 对象 | 推荐名字 |
|---|---|
| 地板 | `Floor` |
| 出生点 | `Spawn` |
| 世界描述器 | `WorldDescriptor` |
| 门 | `Door_Main` |
| 按钮 | `Button_LightSwitch` |
| 触发区域 | `Trigger_MusicStart` |

名字不用完美，但要能让半个月后的你看懂。

## 这一章的小练习

打开上一章的项目，做这几件事：

1. 把 `Floor` 复制两份，改名为 `Wall_Left` 和 `Wall_Right`；
2. 调整它们的 Position、Rotation、Scale，摆成两面墙；
3. 创建一个空物体，命名为 `Room`；
4. 把 `Floor`、`Wall_Left`、`Wall_Right` 拖到 `Room` 下面；
5. 移动 `Room`，观察三块物体是否一起移动。

做完后，你会真正理解父子层级的意义。

## 这一章你要带走的东西

- Scene 是场景文件，Hierarchy 是场景里的 GameObject 清单；
- GameObject 是容器，功能来自它身上的 Component；
- Transform 决定位置、旋转和缩放，每个 GameObject 都有它；
- 父子层级能帮你整理复杂对象；
- 命名是项目变大后的第一道防线。

下一章，我们专门看 Component。你会发现 Unity 里的很多问题，最后都能变成一句话：这个对象身上少了哪个组件？

## 本章参考

- [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
- [Unity Manual: Use components](https://docs.unity3d.com/Manual/UsingComponents.html)
- [VRC Scene Descriptor](https://creators.vrchat.com/worlds/components/vrc_scenedescriptor/)
