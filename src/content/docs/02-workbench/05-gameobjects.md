---
title: 5. Unity 里的一切都是物体
description: 用 GameObject、Scene、Hierarchy 和 Transform 理解 Unity 工作台的核心逻辑。
---

你已经站进了自己做的世界。但你大概有一堆问号：Spawn 到底是什么？Hierarchy 里那几行又是什么？Inspector 里的参数在控制什么？

这一章把这些问题一次讲清。核心只有一件事：Unity 是怎么组织三维空间的。

## 一个探究实验：让地板消失

打开你的第一个世界项目。在 Hierarchy 面板中点击选中 `Floor`。然后看右侧 Inspector 面板，找到 `Mesh Renderer` 组件，把组件名称前面的小勾取消掉。

看看 Scene 视图——地板消失了。但 Hierarchy 里 `Floor` 还在，`Build & Test` 进去玩家照样站得住。

把小勾打回去，地板重新出现。

为什么取消一个勾就能让地板隐形，而物理碰撞还在？

## GameObject 本身只是一个空壳

这就引出了 Unity 里最核心的认知：**GameObject（游戏物体）本身没有任何能力，它只是一个空壳子。**

你往这个壳子里放什么组件，它就变成什么东西。

拿 `Floor` 来说，它之所以能看见、能踩、能定位，是因为身上挂了三个 Component（组件）：

* **Mesh Filter**：赋予它几何形状（「我是一个扁平的方块」）。
* **Mesh Renderer**：把它画出来（「让别人看见我」）。
* **Box Collider**：赋予它物理实体（「让玩家站在我上面」）。

你关掉了 Mesh Renderer，等于告诉 Unity「不用画它了」。但 Box Collider 还在，所以玩家照样踩得住。

观察任何物体，**先看它挂了什么组件，别只看名字。**

::::tip[为什么是这样？]
Unity 为什么不直接给你一个「地板类型」「大门类型」，而是拆成「空壳 + 组件」？因为世界上的物品组合无穷无尽，写死类型行不通。组件系统像乐高：零件本身没有固定用途，拼法由你决定。一个 GameObject 可以同时是光源、音响和按钮，只要你挂上对应的组件。
::::

## 场景、层级面板与检视面板

日常开发中，你的视线会在这三者之间切换：

* **Scene（场景）**：一个 `.unity` 文件，你在里面摆放物品、调灯光。
* **Hierarchy（层级面板）**：当前场景中所有 GameObject 的目录清单。
* **Inspector（检视面板）**：点击 Hierarchy 中某个物体，这里展示它身上的所有组件和参数。

排查问题的标准动作：在 Hierarchy 中找到目标物体 → 去 Inspector 看它挂了什么组件、填了什么数值。

## Transform：每个物体的标配

每个 GameObject 一出生就自带 Transform，删不掉。它只管三件事：**在哪（Position）、朝哪（Rotation）、多大（Scale）**。

你把 Cube 的 Scale Y 改成 0.2，它就变成了扁平地板；把出生点的 Rotation Y 改成 180，玩家出生朝向就反了。后面绝大部分基础搭建，就是找对物体、改对 Transform。

## 父子层级：让一组物体一起动

在 Hierarchy 中，把一个物体拖到另一个物体下面，它就变成对方的「子物体（Child）」。

以后你做一扇门（门框 + 门板 + 把手），不用层级就得逐个拖零件。用了层级：建一个空物体 `Door` 当父级，零件拖进去：

```text
Door (父物体)
├─ DoorFrame (门框)
├─ DoorPanel (门板)
└─ Handle (把手)
```

移动 `Door`，底下所有子物体跟着走。你开始把「一堆零散几何体」看作「一个完整物件」，Hierarchy 也因此保持清晰。

## 空物体：看不见但有用

空物体（Empty GameObject）不挂渲染组件，画面里看不见。但它在项目里用处很大。

你搭的出生点 `Spawn` 就是一个空物体——没有外观，只用 Transform 的位置和朝向标记玩家出生的锚点。

空物体常见用法：

* **父级容器**：打包整理一堆零散模型。
* **旋转轴心**：让门板绕着一侧的点开启。
* **逻辑挂载点**：挂脚本和触发区域。

## 规范命名

新手的 Hierarchy 一周后通常长这样：

```text
Cube
Cube (1)
Cube (2)
GameObject
GameObject (1)
```

五个物体还好，上百个时你根本分不清哪个 `Cube (14)` 是地板、哪个是灯座。

从今天开始养成随手改名的习惯：地板叫 `Floor`，出生点叫 `Spawn`，灯光开关叫 `Button_LightSwitch`。名字乱起不会报错，但两周后你自己都分不清东西在哪，改一处要翻半天。现在花五秒改名，省的是以后的时间。

## 变式练习：给你的世界加上墙壁

打开项目，动手试试：

1. 选中 `Floor`，`Ctrl+D` 复制一份，改名为 `Wall_Left`。
2. 在 Transform 中修改数值，让它竖起来贴在地板左边缘当墙壁。
3. 再 `Ctrl+D` 复制这面墙，改名 `Wall_Right`，平移到右边缘。
4. Hierarchy 空白处右键 `Create Empty`，命名为 `Room`。
5. 把 `Floor`、`Wall_Left`、`Wall_Right` 全拖入 `Room` 之下。
6. 拖动 `Room`，观察三块板子是不是一起动了。

做完你会发现：拖一下 Room，三块板一起动。这就是层级的意义。

---

下一章看组件系统——怎么给物体加上发光、播声音、被玩家拿起来的能力。

## 本章参考

* [Unity 官方手册：GameObject 物体基础](https://docs.unity3d.com/Manual/GameObjects.html)
* [Unity 官方手册：Transform 变换组件](https://docs.unity3d.com/Manual/Transforms.html)
* [使用组件](https://docs.unity3d.com/Manual/UsingComponents.html)
* [VRChat 官方世界组件大纲](https://creators.vrchat.com/worlds/components/)
