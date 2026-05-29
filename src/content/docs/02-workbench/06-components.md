---
title: 6. 组件，给物体装能力
description: 理解 Unity Component：怎么看、怎么加、怎么删，以及 VRChat SDK 组件为什么重要。
---

# 6. 组件，给物体装能力

上一章我们说：GameObject 是容器。

这一章看容器里真正干活的东西：Component。

一个物体能被看见、能碰撞、能发光、能播放声音、能响应点击，靠的都是组件。你以后做 VRChat 世界，大部分时间都在做三件事：选中物体，添加组件，调整组件参数。

## 先从一个 Cube 看起

在 Unity 里创建一个 Cube。选中它，看 Inspector。

你通常会看到这些组件：

| 组件 | 它让 Cube 拥有什么能力 |
|---|---|
| Transform | 有位置、旋转和大小 |
| Mesh Filter | 有立方体的形状 |
| Mesh Renderer | 能被画到画面里 |
| Box Collider | 能参与碰撞 |

这四个组件组合起来，Cube 才像一个能站上去的方块。

如果你把它拉扁，它可以是地板。如果你把它竖起来，它可以是墙。如果你删掉渲染组件，它还在，只是看不见。如果你删掉碰撞组件，它还看得见，但玩家可能穿过去。

## Add Component 是你的工具箱

选中一个 GameObject，在 Inspector 里点击 `Add Component`。

你会看到一个搜索框。输入组件名，就能把组件加到当前物体上。

常见组件先记这些：

| 组件 | 常见用途 |
|---|---|
| Light | 让物体发出光照 |
| Audio Source | 播放声音 |
| Box Collider | 做方形碰撞或触发区域 |
| Mesh Renderer | 显示模型表面 |
| Animator | 播放动画 |
| Udon Behaviour | 挂 Udon 或 UdonSharp 逻辑 |
| VRC Scene Descriptor | 描述 VRChat 世界 |
| VRC Pickup | 让物体可以被玩家拿起 |
| VRC Spatial Audio Source | 调整 VRChat 里的空间音频 |

你不用现在记全。先知道：要给物体能力，就去找组件。

## Inspector 是参数面板

组件加上去之后，还要调参数。

比如 `Light` 组件里会有：

| 字段 | 作用 |
|---|---|
| Type | 光源类型 |
| Color | 光的颜色 |
| Intensity | 光的强度 |
| Range | 点光源和聚光灯的影响范围 |

`Box Collider` 里会有：

| 字段 | 作用 |
|---|---|
| Is Trigger | 勾上后变成触发区域 |
| Center | 碰撞体中心偏移 |
| Size | 碰撞体大小 |

`Audio Source` 里会有：

| 字段 | 作用 |
|---|---|
| Audio Clip | 要播放的声音资源 |
| Play On Awake | 场景开始时自动播放 |
| Loop | 循环播放 |
| Volume | 音量 |

以后你跟教程做功能，很多步骤会写成：选中某个物体，在某个组件里，把某个字段改成某个值。

这就是 Unity 的日常。

## 引用字段：把对象拖进去

有些组件字段是对象槽，需要你指定场景里的对象、组件或项目资源。

比如脚本里可能有一个字段叫：

```text
Target Light
```

它想要你指定一盏灯。你就把 Hierarchy 里的灯拖到这个字段里。

这个动作很重要。很多新手脚本写对了，组件也挂对了，最后功能没反应，就是忘了把目标对象拖进字段。

你可以这样检查：

- 字段是不是显示 `None`；
- 拖进去的是 GameObject 还是某个 Component；
- 目标对象是不是在当前场景里；
- 目标对象有没有被删掉或改名。

## Remove Component 要小心

组件可以删。点击组件右上角的菜单，选择 `Remove Component`。

删之前先问自己：这个组件是不是别的组件依赖的？

比如：

- 没有 Collider，玩家点击和触发可能失效；
- 没有 Renderer，模型看不见；
- 没有 Descriptor，场景无法作为 VRChat World 构建；
- 没有 Udon Behaviour，脚本逻辑不会跑。

你可以先把组件折叠起来，或者取消某些勾选做测试。确认没用之后再删。

## Play Mode 里的修改会恢复

Unity 进入 Play Mode 后，你可以临时调组件参数。

这很适合测试：灯太亮了，调低一点；按钮范围太小了，把 Collider 放大一点；音量太吵了，先降到 0.3。

但要记住：Play Mode 里改的值，退出后通常会恢复。

所以你在 Play Mode 里试出一个好参数，要记下来。退出 Play Mode 后，再把它填回去。

我建议你用最笨但有效的方法：旁边开个文本文件，写下今天试出来的数值。

## VRChat SDK 组件是什么

Unity 自带很多组件，VRChat SDK 也会给你一批组件。

这些组件让 Unity 场景能和 VRChat 的世界系统接上。

比如：

| VRChat 组件 | 它大概负责什么 |
|---|---|
| VRC Scene Descriptor | 让当前 Scene 成为 VRChat World |
| VRC Pickup | 让物体可以被玩家拿起 |
| VRC Object Sync | 同步物体位置和物理状态 |
| VRC Spatial Audio Source | 调整 VRChat 空间音频表现 |
| VRC Portal Marker | 创建通往其他世界的传送门 |
| VRC Mirror Reflection | 创建镜子 |

先不用深入。你只要知道：看到 `VRC` 开头的组件，就要把它放回 VRChat 的语境里理解。它们通常关系到玩家、网络、世界上传、VRChat 客户端行为。

## 这一章的小练习

回到你的第一个世界，做一个「会发光的球」。

1. 创建一个 Sphere，命名为 `GlowBall`；
2. 把它放到地板上方，Position 设为 `0, 1.5, 0`；
3. 给它添加一个 Point Light；
4. 把 Light 的 Color 改成浅蓝色；
5. 把 Intensity 调到 `2`；
6. 把 Range 调到 `5`；
7. 进入 Play Mode 或 Build & Test 看效果。

如果场景太亮或太暗，回来调 Intensity 和 Range。先用眼睛判断，不急着追求完美。

## 这一章你要带走的东西

- Component 决定 GameObject 的能力；
- Add Component 是给物体加能力的入口；
- Inspector 是调整组件参数的地方；
- 引用字段需要把对象或资源拖进去；
- Play Mode 里的修改适合试参数，最终值要退出后再保存；
- VRChat SDK 组件负责把 Unity 场景接到 VRChat 世界系统。

下一章，我们把一组配置好的物体做成 Prefab。那会让你少做很多重复劳动。

## 本章参考

- [Unity Manual: Use components](https://docs.unity3d.com/Manual/UsingComponents.html)
- [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
- [VRChat Worlds Components](https://creators.vrchat.com/worlds/components/)
