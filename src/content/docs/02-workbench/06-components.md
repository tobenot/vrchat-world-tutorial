---
title: 6. 组件，给物体装能力
description: 理解 Unity Component：怎么看、怎么加、怎么删，以及 VRChat SDK 组件为什么重要。
---

# 6. 组件，给物体装能力

上一章我们说 GameObject 是空壳。

这一章看看空壳里装的东西：Component，组件。

一个物体能被看见，是因为它身上有渲染组件。能被踩到，是因为有碰撞组件。能发光，是因为有 Light 组件。能被拿起来，是因为有 VRC Pickup 组件。你以后做 VRChat 世界，大部分时间就在做同一件事：找到对的物体，给它加上对的组件，然后调参数。

## 从一个 Cube 开始

在 Unity 里新建一个 Cube，选中它，看 Inspector 面板。

你会看到四个组件叠在一起。最上面是 Transform，决定位置和大小。下面是 Mesh Filter，它提供了立方体的形状数据。再往下是 Mesh Renderer，负责把那个形状真正画到画面里。最底下是 Box Collider，让这个方块有物理存在感，别人踩到它会停下来。

四个组件配合，一个能看见、能站上去的方块就出来了。

试试看：选中 Cube，把 Mesh Renderer 前面的勾取消。Cube 从画面里消失了，但 Hierarchy 里它还在。把勾打回来，它又出现了。这就是组件的意义：每个组件管一件事，关掉哪个，哪个能力就没了。

## Add Component：给物体加能力

选中任何一个 GameObject，在 Inspector 最下面有一个 `Add Component` 按钮。点它，会弹出搜索框。

输入 `Light`，回车，这个物体就会开始发光。输入 `Audio Source`，它就能播声音。输入 `Rigidbody`，它就会受重力往下掉。

你现在不需要记住所有组件的名字。你只需要记住这个动作：想给物体一个能力，去 Add Component 里搜。

后面你会渐渐熟悉常用的那十来个组件。Light 让东西发光。Audio Source 播声音。Collider 让东西有物理体积。Animator 控制动画。Udon Behaviour 挂逻辑脚本。VRC Pickup 让玩家能拿起物体。这些会在实际做功能的时候一个个碰到。

## Inspector 里调参数

组件加上去，通常还需要调参数。

比如你给一个球加了 Light 组件。Inspector 里会多出一片字段。Color 是光的颜色，你可以点开色板改成暖黄或冷蓝。Intensity 是强度，数字越大越亮。Range 是影响范围，太小了只照到脚底，太大了整个场景都被它笼罩。

再比如 Audio Source。你得告诉它播哪个声音文件（Audio Clip 字段），是不是一开场就播（Play On Awake），要不要循环（Loop），音量多大（Volume）。

以后你跟教程做功能时，步骤经常是这样的：选中某个物体，找到某个组件，把某个字段改成某个值。整个 Unity 的日常操作就藏在这里。

## 引用字段：把东西拖进去

有些字段比较特殊。它们不是填数字、改颜色或者打勾，而是一个空槽，要你指定场景里的某个对象。

比如你以后写一个开灯脚本，脚本里会有一个字段叫 `targetLight`。它想让你告诉它：你想控制哪盏灯？这时候你需要把 Hierarchy 里那盏灯拖到这个字段里。

这个动作叫做「赋引用」。新手最常见的问题之一就是：脚本写对了，组件也挂对了，最后功能没反应。一看 Inspector，那个字段还写着 `None`。

如果你发现某个功能不工作，第一件事就是去检查 Inspector 里有没有空着的引用字段。

## 删组件之前想一想

组件可以删。在 Inspector 里找到组件右上角的小齿轮或三个点的菜单，选 Remove Component。

但删之前想一下：别的东西有没有在依赖它？

删掉 Collider，玩家的点击和触发区域就不起作用了。删掉 Renderer，模型就看不见了。删掉 VRC Scene Descriptor，整个场景就不能作为 VRChat World 构建了。

如果你只是想测试「没有这个组件会怎样」，可以先把组件前面的勾取消掉（禁用），而不急着删掉它。确认真的不需要了，再动手。

## Play Mode 里试参数

Unity 有一个 Play Mode。点顶部的播放按钮，场景就会运行起来。

在 Play Mode 里你可以临时改组件参数，马上看到效果。灯太亮？把 Intensity 拖低一点，立刻就暗了。碰撞体太小？拉大一点，马上就能踩到。

但有一个陷阱：退出 Play Mode 之后，你刚才改的所有值都会消失，回到进入 Play Mode 之前的状态。

所以流程是这样的：进 Play Mode 试参数，找到一个满意的值，记下来（哪怕是写在纸上），退出 Play Mode，再把值填回去。

听起来笨，但所有 Unity 开发者都这样做。

## VRChat 的组件

除了 Unity 自带的组件，VRChat SDK 还会给你一批以 `VRC` 开头的专用组件。

`VRC Scene Descriptor` 你已经用过了，它让 Unity 场景能被 VRChat 识别为世界。以后你还会碰到 `VRC Pickup`，让玩家能拿起物体。`VRC Object Sync`，同步物体的位置给所有玩家看到。`VRC Spatial Audio Source`，让声音有空间感。`VRC Mirror Reflection`，做镜子。`VRC Portal Marker`，做传送门。

这些名字现在不用记。当你做到「我想让玩家能拿起这个东西」的时候，你自然会去搜 `VRC Pickup`。当你做到「我想做面镜子」的时候，你自然会搜 `VRC Mirror`。

你只需要知道一件事：VRC 开头的组件是 VRChat 专属的，它们处理的是玩家、网络、世界上传、客户端行为这些只有 VRChat 才有的事情。

## 动手：做一个会发光的球

回到你的项目。我们做一个简单的东西。

1. 在 Hierarchy 里创建一个 Sphere，命名为 `GlowBall`。
2. 把它的 Position 设成 `0, 1.5, 0`，让它浮在地板上方。
3. 选中它，点 Add Component，搜索 `Light`，加上去。
4. 在 Light 组件里，把 Type 改成 Point。
5. 颜色选一个浅蓝色。
6. Intensity 填 2。Range 填 5。
7. 进 Play Mode 看看效果。如果太亮就降 Intensity，太暗就升一点。
8. 记住满意的值，退出 Play Mode，把值填回去，保存场景。

做完之后你会看到：一个球体在地板上方发着柔和的蓝光。这个球身上有 Transform（位置大小）、Mesh Filter（球形形状）、Mesh Renderer（画出来）、Sphere Collider（碰撞体）和 Light（发光）。五个组件各管各的事，组合出一个有存在感的发光球。

---

下一章，我们把配置好的东西做成 Prefab，这样你就可以复制出很多份，还能统一管理。

## 本章参考

- [Unity Manual: Use components](https://docs.unity3d.com/Manual/UsingComponents.html)
- [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
- [VRChat Worlds Components](https://creators.vrchat.com/worlds/components/)
