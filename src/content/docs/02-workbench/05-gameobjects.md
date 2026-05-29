---
title: 5. Unity 里的一切都是物体
description: 用 GameObject、Scene、Hierarchy 和 Transform 理解 Unity 工作台的核心逻辑。
---

# 5. Unity 里的一切都是物体

你已经做出了第一个世界：一块地板，一个出生点，一个 `VRC Scene Descriptor`。

站进去了。看了看四周。然后你大概冒出一堆问号：

"我刚才拖进去的那个东西到底是什么？为什么 Hierarchy 面板里有好几行？Inspector 里那一堆参数是什么？我要是想加一面墙，该怎么做？"

这一章回答这些问题。做完这章之后，你会理解 Unity 组织空间的核心逻辑。这个逻辑一旦抓住了，以后碰到任何新东西，你都能知道往哪里看。

## 一个实验：把地板的 Mesh Renderer 关掉

在开始讲概念之前，先做一件事。

打开你的第一个世界项目。在 Hierarchy 里选中 `Floor`。看右侧 Inspector 面板，找到一个叫 `Mesh Renderer` 的组件，把它前面的勾取消掉。

看看 Scene 视图。

地板消失了。

但是 Hierarchy 里 `Floor` 还在。你的世界还能运行。只是……看不见地板了。

现在把勾打回去。地板回来了。

刚才发生了什么？为什么取消一个勾，一整块地板就不见了？它去哪了？

带着这个困惑往下看。

## GameObject 本身是个空壳

这是 Unity 里最重要的一个认知：**GameObject 本身什么都做不了。**

它像一个空盒子。你往里放什么，它就变成什么。

拿你做的 `Floor` 来说。它看起来是一块地板，但它之所以能被看见、能站上去，是因为身上挂着一组叫做 Component（组件）的东西：

- `Mesh Filter` 给了它形状（"我是一个扁平的方块"）
- `Mesh Renderer` 把它画出来（"让人看见我"）
- `Box Collider` 让玩家站上去不会掉下去（"我是实心的"）

刚才你取消 `Mesh Renderer` 的勾，就是告诉 Unity："别画它了。" 但形状还在（Mesh Filter），碰撞还在（Box Collider），所以如果你 Build & Test，玩家其实还是能站在那个看不见的地板上的。

所以以后看到一个物体，不要只看它叫什么名字。**要看它身上挂了什么组件。** 名字可以骗你，组件不会。

🤔 **为什么是这样？** Unity 为什么把一切都做成"空壳 + 组件"，而不是直接给你一个"地板类型"的物体？因为如果每种东西都是独立类型（灯是灯、门是门、地板是地板），你就没法自由组合。组件系统让你可以往任何空盒子里塞任意能力——一个 GameObject 可以同时是灯光、音源和触发区域，只要你给它挂上对应的组件。这跟乐高的思路一样：积木块本身没意义，但你可以拼出任何东西。

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

每一行就是一个 GameObject。选中哪一行，右侧 Inspector 就会展示它身上的详细信息。

以后排查问题，你会反复做同一个动作：在 Hierarchy 里找到东西 → 去 Inspector 里看它身上挂了什么。90% 的问题都能通过这个动作定位到原因。

## Transform：位置、旋转、缩放

每个 GameObject 都有一个叫 `Transform` 的组件。它删不掉，绕不开，永远在 Inspector 最上面。

Transform 只管三件事：

- **Position** — 它在空间里的哪个位置（X, Y, Z 三个数字）
- **Rotation** — 它朝向哪里（三个角度值）
- **Scale** — 它有多大（三个缩放倍数）

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

🤔 **为什么是这样？** 父子层级解决的是"一组东西要作为整体移动"的问题。不只是方便——它改变了你思考空间的方式。你开始用"这组东西是一个整体"来组织世界，而不是用"一堆散件恰好摆在附近"。以后你做按钮、家具、灯具、任何由好几块东西拼成的物件，都可以用这个思路来组织。

## 空物体很有用

空物体在场景里看不见，但它可能是整个世界里最忙碌的东西。

你上一章创建的 `Spawn` 就是一个空物体。它的工作是标记一个位置和一个朝向，让 VRChat 知道玩家该从哪里进来。

空物体的典型用法：

- 当一组物体的父容器，用来整理层级
- 当旋转轴心，门绕着它转
- 当脚本挂载点，逻辑放在一个看不见的物体上
- 当标记点，触发区域的中心、路径的拐角、音乐播放的起点

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

⚠️ **坑：** 名字对 VRChat 的运行没影响，它只影响你自己的工作效率。但一个月后你想改个功能，打开项目发现二十个 `GameObject (1)` 的时候，你会非常感谢现在花五秒钟改名字的自己。

## 动手：给房间加两面墙

打开你的第一个世界项目，试着做这几件事：

1. 选中 `Floor`，按 Ctrl+D 复制一份。改名叫 `Wall_Left`。
2. 调整它的 Position、Rotation 和 Scale，让它竖起来变成一面墙，贴在地板左边缘。
3. 再复制一面墙，叫 `Wall_Right`，放到右边。
4. 在 Hierarchy 里新建一个空物体（右键 → Create Empty），命名为 `Room`。
5. 把 `Floor`、`Wall_Left`、`Wall_Right` 全部拖到 `Room` 下面。
6. 选中 `Room`，移动它。三块物体应该会一起跟着动。

做完这个练习，你就亲手验证了 Transform、层级和命名这三件事。

## 自己改着玩

试试这些，不需要做对，只是感受一下：

- 把 `Wall_Left` 的 Scale X 改成 2，看看发生什么
- 把 `Room` 的 Rotation Y 改成 45，看看所有子物体怎么跟着转
- 给 `Wall_Left` 的 `Mesh Renderer` 取消勾，看看墙是不是"消失了但碰撞还在"
- 把 `Floor` 从 `Room` 底下拖出来（变回顶层），再移动 `Room`，看看地板还跟不跟着动

如果某个操作出了你没预期的结果，恭喜——你刚刚学到了一个不看教程学不到的东西。

## 回头看一眼

你现在知道了：

- Unity 里的一切都是 GameObject，它本身是空壳，组件决定它能做什么
- Scene 是世界文件，Hierarchy 是物体清单，Inspector 显示选中物体的详情
- Transform 管位置、旋转、缩放，父子层级让一组东西作为整体移动

下一章，我们专门看 Component。你会发现 Unity 里的很多问题，最后都能变成一句话：这个对象身上少了哪个组件，或者多了哪个不该有的组件？

## 本章参考

- [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
- [Unity Manual: Transforms](https://docs.unity3d.com/Manual/Transforms.html)
- [Unity Manual: Use components](https://docs.unity3d.com/Manual/UsingComponents.html)
- [VRC Scene Descriptor](https://creators.vrchat.com/worlds/components/vrc_scenedescriptor/)
