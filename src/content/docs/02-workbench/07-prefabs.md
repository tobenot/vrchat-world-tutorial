---
title: 7. Prefab，把东西做成模具
description: 理解 Prefab、Prefab Instance、Override，并用它整理可复用的世界物件。
---

# 7. Prefab，把东西做成模具

你做了一个按钮。它有模型、有碰撞体、有脚本、有音效。

然后你想在房间另一边再放一个一样的按钮。

复制粘贴当然可以。复制两三个还行。复制二十个之后，你会开始痛苦：其中一个脚本参数改了，其他按钮要不要一起改？某个 Collider 大小错了，是不是每个都要手动调？

Prefab 就是用来解决这类问题的。

你可以把它理解成模具。

## Prefab 是保存好的 GameObject 模板

Unity 官方文档里说，Prefab Asset 可以作为模板，在 Scene 里创建新的 Prefab Instance。

翻成我们现在用得上的话：

Prefab 是保存在 Project 面板里的对象模板。它可以包含：

- GameObject 本身；
- 挂在它身上的组件；
- 组件参数；
- 子物体；
- 子物体身上的组件和参数。

比如一个按钮 Prefab 可以长这样：

```text
Button_LightSwitch.prefab
├─ Button_Model
├─ Button_Collider
├─ ClickSound
└─ Udon Behaviour
```

以后你把这个 Prefab 拖进场景，就能得到一个配置好的按钮。

## Asset 和 Instance 的区别

Prefab 有两个词要分清：Asset 和 Instance。

| 名字 | 在哪里 | 含义 |
|---|---|---|
| Prefab Asset | Project 面板 | 模板本体 |
| Prefab Instance | Hierarchy 面板 | 从模板拖到场景里的具体对象 |

你可以这样想：

```text
Project 里的 Door.prefab 是模具
Scene 里的 Door_A、Door_B、Door_C 是模具压出来的物体
```

如果你修改 Prefab Asset，很多 Instance 会跟着更新。

如果你只修改某个 Instance，它会形成自己的差异。Unity 里常叫 Override。

## 做一个简单 Prefab

我们用上一章的 `GlowBall` 做练习。

先确认它包含这些东西：

```text
GlowBall
├─ Transform
├─ Mesh Filter
├─ Mesh Renderer
├─ Sphere Collider
└─ Light
```

然后在 Project 面板里建一个目录：

```text
Assets/Prefabs/
```

把 Hierarchy 里的 `GlowBall` 拖到 `Assets/Prefabs/` 里。

你会得到一个 Prefab Asset：

```text
Assets/Prefabs/GlowBall.prefab
```

现在你可以把它从 Project 面板拖回 Scene，放出多个发光球。

## 修改模板，所有实例一起变

双击 Project 里的 `GlowBall.prefab`，进入 Prefab 编辑模式。

把 Light 的颜色改成紫色，保存。

回到场景，你会发现来自这个 Prefab 的实例也更新了。

这就是 Prefab 的价值：同类东西的共同部分，放在模板里维护。

你以后做门、按钮、装饰灯、椅子、提示牌，都可以这样处理。

## 修改实例，做一点差异

有时候你想保留同一个模板，但让某个实例有一点不同。

比如三个发光球都来自 `GlowBall.prefab`：

```text
GlowBall_A：蓝色
GlowBall_B：紫色
GlowBall_C：绿色
```

你可以在场景里选中 `GlowBall_C`，只改它的 Light 颜色。这个改动就是 Instance Override。

Override 很方便，但也容易乱。

我的建议是：

- 大部分对象保持 Prefab 默认值；
- 少数需要变化的字段才做 Override；
- Override 多到看不懂时，考虑做新的 Prefab 或 Prefab Variant；
- 命名写清楚，比如 `GlowBall_Green`。

## Unpack 是断开模具关系

你可以把 Prefab Instance 变回普通 GameObject，这叫 Unpack。

Unpack 后，它就不再跟 Prefab Asset 保持关联。

这个操作适合临时拆东西、研究别人资源的结构。正式项目里要谨慎。因为断开之后，模板更新就管不到它了。

如果你只是想改某个字段，先用 Override。真的要完全拆开，再 Unpack。

## VRChat 世界里哪些东西适合做 Prefab

VRChat 世界里，Prefab 很适合这些对象：

| 对象 | 为什么适合做 Prefab |
|---|---|
| 门 | 模型、碰撞、脚本、音效经常成组出现 |
| 按钮 | 交互逻辑和反馈可以复用 |
| 灯具 | 模型、Light、材质可以一起保存 |
| 椅子 | 模型、Collider、Station 组件可以成套配置 |
| 传送点 | 视觉标记、触发区域、脚本可以组合 |
| 提示牌 | 文字、背景、摆放结构可以统一 |

以后你做大型世界，Prefab 会直接影响项目是否还能维护。

不用 Prefab 的项目，越做越像一堆复制粘贴的散件。

用好 Prefab 的项目，看起来更像一盒整理好的乐高。

## 文件夹也要整理

Prefab 多了之后，Project 面板也会乱。

我建议从一开始就分目录：

```text
Assets/
├─ Scenes/
├─ Prefabs/
│  ├─ Interactions/
│  ├─ Props/
│  ├─ Lights/
│  └─ UI/
├─ Materials/
├─ Audio/
└─ Scripts/
```

不用一次建完。用到哪个建哪个。

重点是让你半个月后还能找到东西。

## 这一章的小练习

把你的 `GlowBall` 做成 Prefab，然后完成这几步：

1. 从 Prefab 拖出三个实例；
2. 把它们分别放在房间三个角落；
3. 修改 Prefab Asset 的 Light Range，观察三个实例是否一起变化；
4. 只修改其中一个实例的颜色；
5. 给这个实例改名为 `GlowBall_Green`。

做完后，你就理解了模板和实例的关系。

## 这一章你要带走的东西

- Prefab 是可复用的 GameObject 模板；
- Prefab Asset 在 Project 里，Prefab Instance 在 Scene 里；
- 修改 Asset 会影响来自它的实例；
- 修改 Instance 会形成 Override；
- Override 要少而清楚，复杂差异可以拆成新的 Prefab；
- VRChat 世界里的门、按钮、椅子、灯具都适合做 Prefab。

下一章，我们碰一碰材质和光。你会看到，同样一块地板，换个颜色和光照，感觉会完全不同。

## 本章参考

- [Unity Manual: Prefabs](https://docs.unity3d.com/Manual/Prefabs.html)
- [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
