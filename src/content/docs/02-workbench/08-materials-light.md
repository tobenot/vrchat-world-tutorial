---
title: 8. 材质和光的第一印象
description: 用最少概念理解材质、颜色、贴图和 Unity 光源，让第一个世界开始有气氛。
---

# 8. 材质和光的第一印象

你现在的世界能跑，但可能很像默认样板间：灰地板、白墙、默认天空。

这一章我们只碰一点材质和光。

目标很小：让你知道为什么同样一块地板，换个材质和光照之后，感觉会变很多。

## 材质决定表面看起来像什么

Unity 里的 Material 可以理解成物体表面的外观设置。

一个模型的形状由 Mesh 决定，但表面颜色、质感、纹理，通常由 Material 决定。

同一个 Cube，换不同材质，可以变成：

- 白色塑料块；
- 深色金属盒；
- 木头地板；
- 发光按钮；
- 半透明玻璃。

第一阶段先不追求真实。你只要会创建材质、改颜色、拖到物体上，就够用了。

## 创建一个地板材质

在 Project 面板里建一个目录：

```text
Assets/Materials/
```

在里面创建一个 Material，命名为：

```text
Mat_Floor_WarmGray
```

选中材质，在 Inspector 里找到基础颜色。不同 Unity 版本和渲染管线里名字可能略有差异，常见叫 `Albedo`、`Base Map` 或 `Base Color`。

先把颜色改成暖一点的灰色。

比如：

```text
#8A8178
```

然后把这个材质拖到场景里的 `Floor` 上。

地板立刻就会变色。

## Albedo 是基础颜色

Unity 的 Standard Shader 文档里，`Albedo` 用来控制材质的基础颜色和透明度。

你可以把它理解成「这个表面最基本的颜色」。

它可以是一种纯色，也可以是一张贴图。

| 设置方式 | 效果 |
|---|---|
| 纯色 | 整个表面使用一个基础颜色 |
| 贴图 | 用图片决定表面颜色细节 |
| 贴图 + 颜色 | 图片会被颜色轻微染色 |
| Alpha | 控制透明度相关表现 |

新手阶段先从纯色开始。纯色最容易理解，也最容易控制整体气氛。

## 给墙和球也加材质

继续创建两个材质：

```text
Mat_Wall_OffWhite
Mat_GlowBall_Cyan
```

建议颜色：

| 材质 | 颜色 |
|---|---|
| `Mat_Wall_OffWhite` | `#D8D2C4` |
| `Mat_GlowBall_Cyan` | `#6EE7F9` |

把墙体材质拖到墙上，把球材质拖到 `GlowBall` 上。

现在你的场景会从「默认方块」变成一个稍微有点设计的空间。

## 光决定你怎么看见它

材质是表面，光是观看方式。

同样一面墙，在冷白光下会像办公室，在暖黄光下会像小屋，在低角度光下会有傍晚的感觉。

Unity 常见光源类型先记四个：

| 光源 | 适合模拟什么 |
|---|---|
| Directional Light | 太阳、月光、大方向光 |
| Point Light | 灯泡、蜡烛、发光球 |
| Spot Light | 手电筒、舞台灯、车灯 |
| Area Light | 面光源，常用于更柔和的烘焙光照 |

你现在最常用的是 Directional Light 和 Point Light。

## 调整 Directional Light

新场景通常自带一个 Directional Light。

它很像太阳。它的位置影响不大，旋转方向很重要。

选中 `Directional Light`，试着改 Rotation：

| 方向 | 感觉 |
|---|---|
| 从上往下 | 白天、清楚、普通 |
| 从侧面斜照 | 傍晚、有阴影、有层次 |
| 从下往上 | 怪异、舞台感、恐怖感 |

先试一个柔和的角度：

```text
Rotation: 50, -30, 0
```

如果场景太亮，把 Intensity 调低一点。

## Point Light 做局部气氛

`GlowBall` 身上的 Point Light 可以做局部氛围。

选中它，试这些参数：

| 字段 | 建议值 |
|---|---|
| Color | 浅蓝或浅紫 |
| Intensity | `1.5` 到 `3` |
| Range | `3` 到 `6` |

Point Light 会从一个点向四周发光。它很适合做灯泡、魔法球、小夜灯。

但不要一口气放很多实时灯。灯光会影响性能。VRChat 世界尤其要在好看和跑得动之间找平衡。

第一阶段，你只要知道：灯很好用，也要省着用。

## 一个小小的气氛练习

试着把你的房间调成「雨夜小屋」的第一版。

只做这些事：

1. 地板换成暖灰色；
2. 墙换成偏米色；
3. Directional Light 调暗一点；
4. 放一个浅蓝色 `GlowBall` 当作小灯；
5. 把小灯放在房间角落；
6. Build & Test 进去看感觉。

你会发现：模型几乎没变，气氛已经变了。

这就是材质和光的力量。

## VRChat 里要注意性能

以后做正式世界时，光照会变复杂：实时光、烘焙光、Lightmap、Reflection Probe、Quest 限制，全都会出现。

现在先记一个原则：先让场景看得舒服，再慢慢学习更省性能的做法。

几个早期习惯：

- 实时灯不要随便堆；
- 能用少量大方向光解决的，就先别放十几个点光；
- 材质命名清楚，别让 `New Material 1` 到处都是；
- 颜色先统一，再做细节；
- 每次大改光照后，都进 VRChat 里看一眼。

Unity Scene 视图里的效果和 VRChat 客户端里的体感可能不一样。最终还是要进去看。

## 这一章你要带走的东西

- Material 决定物体表面看起来像什么；
- Albedo 或 Base Color 是材质的基础颜色入口；
- Directional Light 像太阳，方向比位置重要；
- Point Light 像灯泡，适合局部气氛；
- 材质和光能快速改变空间感；
- VRChat 世界要一直记着性能，实时灯别滥用。

第二部到这里，你已经认识了 Unity 工作台上最常碰的东西：GameObject、Component、Prefab、Material 和 Light。

下一部，我们开始碰一点编程。先别怕，我们只学刚好够用的那部分。

## 本章参考

- [Unity Manual: Set the color of a material in the Standard Shader](https://docs.unity3d.com/Manual/StandardShaderMaterialParameterAlbedoColor.html)
- [Unity Manual: Types of Light component](https://docs.unity3d.com/Manual/Lighting.html)
- [Unity Manual: Materials](https://docs.unity3d.com/Manual/Materials.html)
- [VRChat Performance Tips](https://creators.vrchat.com/worlds/performance-tips/)
