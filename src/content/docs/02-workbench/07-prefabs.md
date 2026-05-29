---
title: 7. Prefab，把东西做成模具
description: 理解 Prefab、Prefab Instance、Override，并用它整理可复用的世界物件。
---

# 7. Prefab，把东西做成模具

## 先感受一下没有 Prefab 的痛苦

你做了一个发光球。颜色调好了，Light 的 Range 调成 5，Intensity 调成 2。看起来不错。

然后你想在房间另外三个角落各放一个。你按 Ctrl+D 复制，拖到位置，调好。四个球。

半小时后你觉得 Range 5 太小了，应该改成 8。

你选中第一个球，改。选中第二个球，改。选中第三个球，改。选中第四个球，改。

四个还好。

现在想象你做了一个走廊灯，走廊有二十盏。你要改灯的颜色。二十次。改到第十五个的时候你会开始想：**有没有一种办法，改一次，所有灯都跟着变？**

有。这就是 Prefab。

## 做一个模具

Prefab 这个词你可以理解成「模具」。你先精心配置好一个物体，然后把它变成模具保存起来。以后想用，从模具里压出来一份，就是一个完全配置好的实例。

操作非常简单：

1. 在 Project 面板里建一个 `Assets/Prefabs/` 目录（右键 → Create → Folder）
2. 把 Hierarchy 里配好的 `GlowBall` 直接拖进 `Assets/Prefabs/`

拖完之后你会注意到两件事：

- Project 面板里多了一个 `GlowBall.prefab` 文件
- Hierarchy 里 `GlowBall` 的名字变成了**蓝色**

蓝色名字意味着：它现在是 Prefab Instance（模具的实例），和 Project 里那个模板有关联。

🤔 **为什么是这样？** Prefab 的本质是"单一数据源"。二十个灯的配置信息只存在一个地方（`.prefab` 文件），每个灯只存"我在哪个位置"和"我跟模具有什么不同"。这跟编程里的"不要重复自己（DRY）"原则是同一个思想：一份信息只在一个地方维护，其他地方只是引用。

## 从模具压出新东西

现在你可以从 Project 面板里把 `GlowBall.prefab` 往场景里拖。每拖一次就会多一个实例。拖三次，你就有了四个一模一样的发光球（算上原来那个）。

把它们分别放到房间的四个角落。改一下名字：`GlowBall_A`、`GlowBall_B`、`GlowBall_C`、`GlowBall_D`。

## 改模具，所有实例一起变

现在来解决刚才那个痛点。

双击 Project 里的 `GlowBall.prefab`，Unity 会进入 Prefab 编辑模式（画面会变，只显示这一个物体）。

在这里把 Light 的 Range 从 5 改成 8。保存（Ctrl+S），点左上角的箭头退出 Prefab 编辑模式。

回到场景看看。四个发光球的灯光范围**全都变成了 8**。你只改了一次。

这就是 Prefab 的核心价值。二十个同类物体的共同配置，只在模具里维护一次。一次修改，全部更新。

## 改实例，做一点差异

有时候你希望大部分球都一样，但有一个特别的是绿色。

在场景里选中 `GlowBall_C`，直接改它的 Light 颜色为绿色。

改完后 Inspector 里这个字段旁边会多一个小蓝条，表示这里有一个 **Override**（覆盖）——这个实例在这个属性上跟模具不同。

下次你改模具的 Range，`GlowBall_C` 的 Range 会跟着变（因为你没覆盖 Range），但颜色不会变回去（因为你覆盖了颜色）。

⚠️ **坑：** Override 很灵活，但也容易乱。如果你发现一个实例身上的 Override 多得快看不懂了，说明可能该做一个新的 Prefab 了。经验法则：如果一个实例跟模具的差异超过三四个属性，考虑做成单独的 Prefab 或 Prefab Variant。

## 什么时候做 Prefab

简单说：当你发现自己在复制粘贴同一组配置的时候。

门适合做 Prefab，因为每扇门都有模型、碰撞体、脚本和音效。按钮适合做 Prefab，因为交互逻辑可以复用。灯具适合，椅子适合，传送点适合，提示牌适合。

大型世界里，Prefab 是让项目维护得下去的前提。用好 Prefab 的项目像一盒乐高，零件清楚，拆装方便。没有 Prefab 的项目像一堆散件，改一个地方要翻二十个对象。

🔀 **不同世界不同活法：** Chill 世界可能有几十盏装饰灯 → Prefab 让你一次调好全部氛围。Game 世界可能有几十个复活点 → Prefab 保证每个复活点的配置一致。Gallery 可能有几十个画框 → Prefab 让你统一调整画框样式。

## Unpack：断开关联

如果你想把一个 Prefab Instance 变回普通物体，右键选 Unpack Prefab。

断开之后，修改模具不会再影响这个物体。这适合你研究别人的资源结构，或者做一个完全独立的变种。

⚠️ **坑：** 正式项目里不要随便 Unpack，因为你会失去统一更新的能力。如果以后想改所有同类物体的某个参数，Unpack 掉的那个就得单独手动改。

## 文件夹也要整理

Project 面板最终会放很多 Prefab。从一开始分好目录：

```text
Assets/
├─ Scenes/
├─ Prefabs/
│   ├─ Lighting/
│   ├─ Furniture/
│   └─ Interactive/
├─ Materials/
├─ Audio/
└─ Scripts/
```

Prefabs 里面还可以再分。按功能分也好，按房间分也好，只要你半个月后还能找到东西就行。

## 动手：把发光球变成 Prefab

如果你还没做，现在就试一下：

1. 做一个发光球（创建 Sphere，加 Point Light 作为子物体，调颜色和范围）
2. 把它拖进 `Assets/Prefabs/`
3. 从 Project 面板往场景里再拖出三份
4. 双击 Prefab，改 Light 的 Range，保存，观察四个实例是否一起变化
5. 选一个实例，只改它的颜色。看看 Inspector 里的 Override 标记

## 自己改着玩

- 试试在 Prefab 编辑模式里加一个新的子物体（比如一个小立方体当底座），看看所有实例会不会都多出一个底座
- 试试右键一个实例 → Unpack Prefab，然后再改模具，看这个被 Unpack 的实例还会不会跟着变
- 想一想：如果你要做一排路灯（灯杆 + 灯头 + 点光源），这个 Prefab 的层级结构应该长什么样？

## 回头看一眼

你现在知道了：

- Prefab 是模具，Instance 是从模具压出来的实例。改模具，所有实例跟着变
- Override 让单个实例在某些属性上跟模具不同，其他属性仍然跟着模具走
- 当你发现自己在重复配置同一组东西的时候，就是该做 Prefab 的时候

下一章，我们碰一碰材质和光。你会看到，同样一块地板和几面墙，换一下颜色和光照方向，整个空间的感觉就完全变了。

## 本章参考

- [Unity Manual: Prefabs](https://docs.unity3d.com/Manual/Prefabs.html)
- [Unity Manual: Prefab Variants](https://docs.unity3d.com/Manual/PrefabVariants.html)
- [VRChat SDK Prefabs](https://creators.vrchat.com/worlds/sdk-prefabs/)
