---
title: 7. Prefab，把东西做成模具
description: 理解 Prefab、Prefab Instance、Override，并用它整理可复用的世界物件。
---

## 先感受一下没有 Prefab 的痛苦

你做了一个发光球。颜色调好了，Light 的 Range 设成 5，Intensity 设成 2。看着不错。

然后你在房间另外三个角落各放一个，`Ctrl+D` 复制三份拖到位。四个球了。

半小时后你觉得 Range 5 太小，照不亮房间，应该统一改成 8。于是你逐个点击四个球，改四次。

四个还行。现在想象一下：赛博朋克走廊，两侧二十盏壁灯，要统一微调霓虹颜色。改二十次。改到第十五盏你就会想：**有没有办法改一次，所有同类灯一起变？**

有。这就是 **Prefab（预制体）**。

## 制作模具

Prefab 可以理解为「生产模具」。你配好一个物体，把它存成模具。以后需要时从模具里压出新实例，配置完全一致。

操作：

1. 在 Project 面板的 Assets 下新建文件夹 `Prefabs`。
2. 把 Hierarchy 里配好的 `GlowBall` **直接拖进** `Prefabs` 文件夹。

拖完后你会看到两个变化：

* Project 面板里多了一个蓝色的 `GlowBall.prefab` 文件。
* Hierarchy 里 `GlowBall` 的名字和图标变成了**蓝色**——它现在是一个 Prefab Instance（预制体实例），和磁盘上的模具绑定了。

::::tip[为什么是这样？]
Prefab 的设计思路是「单一数据源」：二十盏灯的配置只存一份在 `.prefab` 文件里，每个实例只记录自己的位置和跟模具不同的地方。改模具一处，全场同步。
::::

## 从模具压出实例

把 Project 面板里的 `GlowBall.prefab` 拖进场景，每拖一次多一个配置好的球。拖三次，加上原来那个，四个球。

## 修改模具，全场同步

双击 Project 面板里的 `GlowBall.prefab`，进入 Prefab 编辑模式（四周变暗，只剩这个球）。

把 Light 的 Range 从 5 改成 8，`Ctrl+S` 保存，点左上角箭头退出。

回到场景——四个球的灯光范围全都自动变成了 8。改一次，全部生效。

## Override：允许个别实例有差异

二十盏灯都一样，但你想让其中一盏亮绿色。

选中场景里的 `GlowBall_C`，直接把 Light 颜色改成绿色。改完后这个字段旁边出现一条蓝色小标记，Inspector 右上角会多出 `Overrides` 下拉——这代表该实例在这个参数上和模具不同了。

此后：

* 你改模具的 Range → `GlowBall_C` 的 Range 跟着变（没被 Override）。
* 你改模具的颜色 → `GlowBall_C` 颜色不变（已被 Override）。

::::caution[踩坑预警]
Override 太多会让实例和模具的关系变得混乱。如果一个实例身上蓝条多到你自己看不懂了，说明它已经严重偏离模具。这时应该把它做成一个新的独立 Prefab，或者用 Prefab Variant（预制体变体）来管理。
::::

## 什么时候该做成 Prefab

判断法则：**你发现自己要复制同一组配置两次以上，就该做成 Prefab。**

门（模型 + 碰撞体 + 音效 + 脚本）、交互按钮、椅子、篝火、路灯、传送点——凡是有重复性质的物件，诞生时就做成 Prefab。

## Unpack：断开和模具的关系

右键一个 Prefab 实例，选 `Unpack Prefab`，它的名字会从蓝色变回黑色。此后模具怎么改都不再影响它。

适合你引入了别人的 Prefab 想拆开研究的时候。但在自己的项目里慎用——解包后就失去了全局一键更新的能力。

## 项目目录结构

随着项目推进，文件会越来越多。从第一天就建好目录：

```text
Assets/
├─ Scenes/       (场景文件)
├─ Prefabs/      (预制体)
├─ Materials/    (材质)
├─ Audio/        (音频)
└─ Scripts/      (脚本)
```

---

下一章给灰白色小屋穿件衣服——认识 Material（材质）和 Light（灯光），用最少的概念调出空间氛围。

## 本章参考

* [Unity 官方手册：Prefab 系统](https://docs.unity3d.com/Manual/Prefabs.html)
* [Unity 官方手册：Prefab Variants](https://docs.unity3d.com/Manual/PrefabVariants.html)
* [VRChat 创作者文档：SDK 预制体](https://creators.vrchat.com/worlds/sdk-prefabs/)
