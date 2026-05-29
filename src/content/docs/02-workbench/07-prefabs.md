---
title: 7. Prefab，把东西做成模具
description: 理解 Prefab、Prefab Instance、Override，并用它整理可复用的世界物件。
---

# 7. Prefab，把东西做成模具

你做了一个发光球。颜色调好了，光照范围调好了，看起来不错。

然后你想在房间另外三个角落各放一个。

复制粘贴当然行。但假设你复制了二十个，半小时后你觉得光的范围应该再大一点。二十个球，每个都要手动改一遍。改漏了一个，灯光就不一致。

Prefab 解决的就是这个问题。

## 做一个模具

Prefab 这个词你可以理解成「模具」。你先精心配置好一个物体，然后把它变成模具保存起来。以后想用，从模具里压出来一份，就是一个完全配置好的实例。

操作非常简单。在 Project 面板里建一个 `Assets/Prefabs/` 目录，然后把 Hierarchy 里配好的 `GlowBall` 直接拖进去。

拖完之后你会注意到：Project 面板里多了一个 `GlowBall.prefab` 文件，Hierarchy 里 `GlowBall` 的名字变成了蓝色。蓝色名字意味着它现在是 Prefab Instance，和 Project 里那个模板有关联。

## 从模具压出新东西

现在你可以从 Project 面板里把 `GlowBall.prefab` 往场景里拖。每拖一次就会多一个实例。拖三次，你就有了四个一模一样的发光球（算上原来那个）。

把它们分别放到房间的四个角落。改一下名字：`GlowBall_A`、`GlowBall_B`、`GlowBall_C`、`GlowBall_D`。

## 改模具，所有实例一起变

双击 Project 里的 `GlowBall.prefab`，Unity 会进入 Prefab 编辑模式。

在这里把 Light 的 Range 从 5 改成 8。保存，退出。

回到场景看看。四个发光球的灯光范围全都变成了 8。你只改了一次，所有实例都跟着更新了。

这就是 Prefab 的核心价值。二十个同类物体的共同配置，只在模具里维护一次。

## 改实例，做一点差异

有时候你希望大部分球都一样，但有一个特别的是绿色。

在场景里选中 `GlowBall_C`，直接改它的 Light 颜色为绿色。改完后 Inspector 里这个字段旁边会多一个小蓝条，表示这里有一个 Override，跟模具不同。

Override 很灵活，但也容易乱。如果你发现一个实例身上的 Override 多得快看不懂了，说明可能该做一个新的 Prefab 了。

## 什么时候做 Prefab

简单说：当你发现自己在复制粘贴同一组配置的时候。

门适合做 Prefab，因为每扇门都有模型、碰撞体、脚本和音效。按钮适合做 Prefab，因为交互逻辑可以复用。灯具适合，椅子适合，传送点适合，提示牌适合。

大型世界里，Prefab 是让项目维护得下去的前提。用好 Prefab 的项目像一盒乐高，零件清楚，拆装方便。没有 Prefab 的项目像一堆散件，改一个地方要翻二十个对象。

## Unpack：断开关联

如果你想把一个 Prefab Instance 变回普通物体，右键选 Unpack。

断开之后，修改模具不会再影响这个物体。这适合你研究别人的资源结构，或者做一个完全独立的变种。正式项目里不要随便 Unpack，因为你会失去统一更新的能力。

## 文件夹也要整理

Project 面板最终会放很多 Prefab。从一开始分好目录：

```text
Assets/
├─ Scenes/
├─ Prefabs/
├─ Materials/
├─ Audio/
└─ Scripts/
```

Prefabs 里面还可以再分。按功能分也好，按房间分也好，只要你半个月后还能找到东西就行。

## 动手：把发光球变成 Prefab

如果你还没做，现在就试一下：

1. 把配好的 `GlowBall` 拖进 `Assets/Prefabs/`。
2. 从 Project 面板往场景里再拖出两三份。
3. 双击 Prefab，改一下 Light 的 Range，保存，观察所有实例是否一起变化。
4. 选一个实例，只改它的颜色。看看 Inspector 里会不会出现 Override 标记。

做完这些，你就理解了 Prefab 是怎么回事。

---

下一章，我们碰一碰材质和光。你会看到，同样一块地板和几面墙，换一下颜色和光照方向，整个空间的感觉就完全变了。

## 本章参考

- [Unity Manual: Prefabs](https://docs.unity3d.com/Manual/Prefabs.html)
- [Unity Manual: GameObjects](https://docs.unity3d.com/Manual/GameObjects.html)
