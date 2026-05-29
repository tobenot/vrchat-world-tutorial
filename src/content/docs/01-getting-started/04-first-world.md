---
title: 4. 你的第一个世界
description: 创建一个最小 VRChat 世界：地板、出生点、VRC Scene Descriptor、Build & Test。理解每一步为什么要这样做。
---

这一章的目标很明确：让你站进自己做的世界里。

场景会很空——一块地板、一个出生点、默认蓝天和一盏太阳灯。但当你在 VRChat 客户端里看到它，用键盘走在上面时，你会发现：Unity 里的几何方块变成了一个可以走进去的空间。

## 场景搭建的核心三问

在开始动手之前，我们先来理清：一个最基础的虚拟世界，到底需要什么？

VRChat 在允许玩家加入之前，必须先解答以下三个核心问题：

1. **玩家可以站在哪？** —— 需要一块带有物理碰撞体的地面，防止玩家悬空或掉落。
2. **玩家进来时处于什么位置、面朝哪里？** —— 需要一个明确的出生点。
3. **这个 Unity 场景是一个合法的 VRChat 世界吗？** —— 需要一个叫做 `VRC Scene Descriptor` 的描述组件。

针对这三个问题，我们分别去 Unity 里制作对应的物体。

## 第一步：新建并保存场景

打开你在上一章中创建的 `MyFirstWorld` 项目。

在 Unity 菜单栏中选择 `File` → `New Scene` 新建一个场景，并在弹出的面板中选择 `Basic`。然后立即按下 `Ctrl+S` 将场景命名为 `MyFirstWorld`，保存在 `Assets/Scenes/` 目录下（如果该目录不存在，可以右键新建一个）。

:::tip[为什么是这样？]
为什么第一件事是保存场景？因为 Unity 场景里的所有物体和灯光信息都存在场景文件里。不保存就崩溃，搭建的东西全没了。VRChat SDK 打包测试时也需要知道当前场景文件的路径。先保存再开工，是必须养成的习惯。
:::

## 第二步：解决踩地问题（创建地板）

在左侧 Hierarchy（层级）面板的空白处右键，选择 `3D Object` → `Cube`（立方体）。将这个新物体改名为 `Floor`。

选中 `Floor`，在右侧 Inspector 面板的最上方找到 `Transform`（变换）组件，将参数修改为：

* **Position**（位置）：`0, 0, 0`
* **Rotation**（旋转）：`0, 0, 0`
* **Scale**（缩放）：`10, 0.2, 10`

修改后，原本的小方块会变成一块长宽均为 10 米、厚度为 0.2 米的扁平地板。

:::tip[为什么是这样？]
为什么选择 Cube 而不是 Unity 自带的 Plane（平面）作为地板？因为 Plane 是单面的（只有上表面渲染），在某些角度会消失。Cube 六面都有实体，不易穿帮。更关键的是，Cube 默认自带 `Box Collider`（碰撞体），能阻挡玩家的物理实体，踩上去不会穿透。
:::

## 第三步：解决定位问题（指定出生位置）

我们需要告诉 VRChat，当玩家进入这个场景时，应该出现在哪里，面朝哪个方向。

在 Hierarchy 面板的空白处右键，选择 `Create Empty` 创建一个空物体，并将其改名为 `Spawn`。

在 Inspector 面板中，将 `Spawn` 的 Position 设为 `0, 1, 0`，Rotation 保持默认的 `0, 0, 0`。

:::caution[体验设计建议]
为什么要把出生点的 Y 值设为 1 而不是 0？因为我们刚才创建的地板厚度是 0.2 米，其上表面实际上处于 Y = 0.1 的位置。如果我们将出生点设在 Y = 0，玩家进入时就会卡在地板里面，甚至由于重力错位直接掉落到虚无深渊中。将其设为 Y = 1，能让玩家在高于地面的空中出现，然后自然而平稳地降落到地板上。
:::

## 第四步：解决身份问题（添加描述组件）

现在，我们需要向 VRChat SDK 提交这个场景的"身份证"。

在 Hierarchy 面板空白处右键，选择 `Create Empty` 创建另一个空物体，命名为 `WorldDescriptor`。

选中它，在 Inspector 面板最下方点击 `Add Component` 按钮，在搜索框中输入 `VRC Scene Descriptor`，在搜索结果中点击并加上它。

加好组件后，在它的属性列表里找到 `Spawns` 字段（这是一个控制玩家出生点的数组列表）。直接将 Hierarchy 面板里的 `Spawn` 物体**拖拽**并放入 `Spawns` 下方的 `Element 0` 空槽里。这样，VRChat 就知道该将进入场景的玩家传送到哪个位置了。

:::tip[为什么是这样？]
为什么必须手动挂这个组件并拖拽引用？因为 Unity 是通用三维引擎，它不知道你是在做 VRChat 世界还是单机游戏。`VRC Scene Descriptor` 就是你对 SDK 说的第一句话：「这是一个 VRChat 场景，请把玩家带到这里。」没有它，SDK 面板上的测试按钮会是灰色的。
:::

## 第五步：Build & Test 站进你的世界

在 Unity 顶部菜单栏中，找到并点击 `VRChat SDK` → `Show Control Panel` 打开 SDK 控制面板。如果提示未登录，请先输入你的账号进行登录。

在控制面板的 `Builder` 标签页下方，找到并点击 **Build & Test** 按钮。

Unity 会在后台开始打包并构建本地测试数据，这个过程通常需要一两分钟。构建完成后，它会自动唤起你电脑上的 VRChat 客户端。

等画面加载完毕，你会发现自己站在一个很空的世界里：脚下是灰白色地板，四周是默认蓝天，一盏太阳灯照着。

尝试按 `W` `A` `S` `D` 走动，晃动鼠标看看天。

**这就是你做出来的第一个世界。**

虽然简陋，但它是你搭出来的空间。你随时可以回 Unity 修改参数，再 Build & Test，新改动立刻生效。这种「修改 → 构建 → 进去体验」的循环，就是 VRChat 世界开发的日常节奏。

:::caution[常见运行卡点排查]
* **在顶部菜单找不到 VRChat SDK 选项**：请回到 VCC 中，确认当前项目模板是 World，并且 Worlds SDK 包确实处于最新安装状态。
* **SDK 面板提示缺少 Scene Descriptor 报错**：请仔细检查你当前打开的场景里是否放了 `WorldDescriptor` 物体，并且其上确实挂载了 `VRC Scene Descriptor` 组件。
* **进入世界后，身体一直无限向下掉落**：请检查你是否不小心删掉了 Floor 物体身上的 `Box Collider` 组件，或者检查 `Spawn` 物体的 Y 值是否不小心设在了地板下方。
* **Build & Test 之后没有任何反应**：请确保你已经在 SDK 控制面板里成功登录了你的 VRChat 账号，且电脑中已经安装了 Steam 版或官方版的 VRChat 客户端。
:::

:::note[AI 小助手]
在进行第一次构建时，如果 Console 控制台弹出了红字报错，请不要气馁。直接把完整的报错行复制下来，发送给 AI 问它：「我在做我的第一个 VRChat 极简世界，场景里只有一块地板和一个出生点，但在 Build & Test 时遇到了这个错误，请问这可能是由于什么引起的？」
:::

## 你刚才完成了什么

让我们静下心来，理一理刚才这几步的逻辑：

* **一个场景文件**（`MyFirstWorld.unity`）：你存放所有空间数据和资源的文件实体。
* **一个地板**（`Floor`）：一个自带物理碰撞体（Box Collider）的几何物体，解决了玩家在空间里的踩地和承载问题。
* **一个出生标记**（`Spawn`）：一个空物体，用来标记玩家进入世界时的精准坐标与面向方向。
* **一个描述标记**（`WorldDescriptor`）：通过挂载 `VRC Scene Descriptor`，成功向 SDK 证明了该场景是一个合法的 VRChat 世界。

地基搭好了。不管以后你的世界多大多复杂，最底下的骨架永远是这四个元素。

## 变式练习

在你进入下一章之前，试着在 Unity 里改动几样参数，并重新 Build & Test 一次，亲手建立起你对 Unity 与 VRChat 互动机制的直觉：

* 尝试选中 Floor，在 Inspector 里将 Scale 改为 `20, 0.2, 20`，进去看看世界是不是变宽广了。
* 尝试将 Spawn 的 Rotation Y 值改为 `180`，进去后看看自己出生的面向是否正好相反。
* 尝试复制（Ctrl+D）出几个新的 Cube，把它们缩放并错落摆放在地板周围（充当高矮不一的凳子），进去试试能不能跳到它们上面。

---

现在你站进去了。下一章搞懂 Unity 和组件系统底层是怎么运转的。

## 本章参考

* [创建你的第一个 VRChat 世界官方教程](https://creators.vrchat.com/worlds/creating-your-first-world/)
* [VRC Scene Descriptor 字段详解](https://creators.vrchat.com/worlds/components/vrc_scenedescriptor/)
* [Build & Test 使用指南](https://creators.vrchat.com/worlds/udon/using-build-test/)
* [Unity 官方文档：GameObject 物体系统](https://docs.unity3d.com/Manual/GameObjects.html)
