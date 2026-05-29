---
title: 8. 材质和光的第一印象
description: 用最少概念理解材质、颜色和 Unity 光源，让第一个世界开始有气氛。
---

# 8. 材质和光的第一印象

你的世界现在能跑了。但进去看一眼，大概会觉得哪里不对。灰色地板，白色墙壁，默认天空。像一个刚搭好框架的样板间，干净但毫无感觉。

这一章我们只碰两件事：材质和光。

目标很小：让你体会到同一个空间，换一下颜色和光的角度，氛围就会完全不同。

## 材质是表面的外衣

Unity 里，模型的形状由 Mesh 决定，但表面看起来是什么样子，靠 Material。

同一个 Cube，穿上深色材质就像金属盒子，穿上暖色材质就像木块，穿上半透明材质就像玻璃。形状没变，感觉完全两回事。

现在我们只做最简单的事：给地板换一个颜色。

## 给地板换件衣服

在 Project 面板里新建一个 `Assets/Materials/` 目录。右键，Create，Material。给它起个名字，比如 `Mat_Floor_WarmGray`。

选中这个材质，Inspector 里会出现一堆选项。先别管别的，只找颜色。在不同 Unity 版本里它可能叫 Albedo、Base Map 或 Base Color，都是同一个意思：这个表面最基本的颜色。

点开色板，选一个偏暖的灰色。如果你想要精确一点，试试 `#8A8178`。

然后把这个材质从 Project 面板拖到场景里的 `Floor` 上。

地板立刻变色了。

就这么简单。你给一个物体换材质，就是把另一件衣服拖到它身上。

## 颜色先于一切细节

新手阶段先只用纯色。不贴纹理，不调粗糙度，不管金属感。

原因是：纯色最容易控制整体调性。你用暖灰色做地板，米白色做墙壁，浅蓝做发光球，三个颜色放在一起就已经有了「安静小屋」的雏形。一旦你开始贴纹理，细节太多，反而容易把空间搞得很乱。

给墙壁也做一个材质吧。叫 `Mat_Wall_OffWhite`，颜色设成 `#D8D2C4`。给 `GlowBall` 也做一个，叫 `Mat_GlowBall_Cyan`，颜色设成 `#6EE7F9`。

把材质拖上去。你的房间从「默认方块」变成了有一点设计的空间。

## 光决定你怎么看见这些颜色

材质给了表面颜色，但你能看见颜色，靠的是光。

同样一面米白色的墙，在冷白色的光下像办公室，在暖黄色的光下像咖啡馆，在低角度的橙光下像黄昏。材质没变，光变了，整个空间的感觉就变了。

## Directional Light：场景里的太阳

新场景通常自带一个 Directional Light。你可以把它想成太阳。

Directional Light 有一个特点：它的位置不重要，方向很重要。不管它放在场景的哪个角落，光都是平行照过来的。决定光线方向的是它的 Rotation。

选中 Directional Light，试着改它的 Rotation。

如果让光从正上方照下来，场景看起来很平，像正午。把 X 轴改到 50 左右，光从侧上方照来，地面会出现阴影，场景立刻有了层次感。再把 Y 轴加一点偏移，光就不再是正面打过来的，物体侧面会有明暗变化。

试试 Rotation 设为 `50, -30, 0`。如果场景太亮，把 Intensity 从 1 降到 0.6 左右。

你会发现：只是改了光的角度和强度，同一个场景看起来就从「白天办公室」变成了「午后小屋」。

## Point Light：局部的灯

Directional Light 是全局的，照亮整个场景。Point Light 是局部的，像一个灯泡。

你的 `GlowBall` 身上已经有 Point Light 了。它从一个点向四周发光，照亮附近的物体。

调 Point Light 的感觉很直觉。颜色决定氛围，浅蓝色偏科幻，暖黄色偏家居，浅紫色偏神秘。Intensity 决定亮度，1 到 3 之间通常够用。Range 决定能照多远，3 到 6 的范围适合小型物件。

但要记住一件事：实时灯是「贵」的。你每多放一盏实时灯，Unity 就要多算一遍光照。VRChat 世界尤其在意性能。第一阶段不用太紧张，但养成意识：灯很好用，也不能随便堆。

## 动手：调出「雨夜小屋」第一版

现在试一件事。不加新模型，不加新脚本，只改材质和光，看看能不能让你的房间开始有一点点「雨夜小屋」的感觉。

1. 地板用暖灰色材质。
2. 墙壁用偏米色材质。
3. 把 Directional Light 的 Intensity 降到 0.4，Rotation 调成偏低角度，模拟黄昏或阴天。
4. 把 `GlowBall` 放到房间一个角落，光色设为浅蓝，Intensity 设为 2，Range 设为 5。
5. Build & Test，进 VRChat 里走一圈。

你会发现：模型几乎没变，地板还是那块地板，墙还是那面墙。但空间的感觉已经不同了。角落里有一团柔和的蓝光，整个房间暗下来了，像一个安静的夜晚。

这就是材质和光的力量。它们改变的是感受，而感受决定了玩家愿不愿意在你的世界里多待一会儿。

## 以后会更复杂，现在先到这里

光照这个话题以后会变得很深：实时光和烘焙光的区别、Lightmap 的烘焙流程、Reflection Probe 做反射、Light Probe 给动态物体补光、Quest 平台上的光照限制。

这些全都会在后面的章节里慢慢展开。

现在你只需要带走一个认知：材质和光是 VRChat 世界感觉的基础。你可以没有复杂交互，没有多人同步，但只要颜色和光对了，一个空房间就能让人想待着。

---

第二部到这里结束。你已经认识了 Unity 工作台上最常碰的东西：GameObject、Component、Prefab、Material 和 Light。

下一部，我们开始碰一点编程。先别怕。我们只学刚好够让灯亮起来的那部分。

## 本章参考

- [Unity Manual: Set the color of a material](https://docs.unity3d.com/Manual/StandardShaderMaterialParameterAlbedoColor.html)
- [Unity Manual: Types of Light component](https://docs.unity3d.com/Manual/Lighting.html)
- [Unity Manual: Materials](https://docs.unity3d.com/Manual/Materials.html)
- [VRChat Performance Tips](https://creators.vrchat.com/worlds/performance-tips/)
