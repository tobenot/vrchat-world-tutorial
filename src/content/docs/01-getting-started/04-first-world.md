---
title: 4. 你的第一个世界
description: 创建一个最小 VRChat 世界：地板、出生点、VRC Scene Descriptor、Build & Test。理解每一步在做什么。
---

这一章的目标很明确：让你站进自己做的世界里。

场景会很空：一块地板、一个出生点、默认蓝天和一盏太阳灯。但当你在 VRChat 客户端里看到它、用键盘走在上面，会发现 Unity 里那些几何方块变成了一个真的可以走进去的空间。

## 一个最基础的世界要回答三件事

VRChat 把玩家放进世界之前，必须先得到这三件事的答案：

1. 玩家可以站在哪？需要一块带物理碰撞的地面，不然进来就掉。
2. 玩家进来时落在哪个位置、面朝哪边？需要一个明确的出生点。
3. 这个 Unity 场景到底是不是 VRChat 世界？需要一个叫 `VRC Scene Descriptor` 的描述组件。

接下来的四步分别解决它们。

## 第一步：新建并保存场景

打开你在上一章建好的 `MyFirstWorld` 项目。

菜单栏 `File` → `New Scene`，弹出的面板里选 `Basic`。然后按 `Ctrl+S`，把场景命名为 `MyFirstWorld`，保存到 `Assets/Scenes/` 目录下。如果这个目录不存在，右键新建一个。

:::tip[为什么是这样？]
Unity 场景里所有物体和灯光的信息都存在场景文件里。不保存就崩溃，搭的东西全没。VRChat SDK 打包测试时也需要场景文件路径。先保存再开工，是必须养成的习惯。
:::

## 第二步：解决踩地（创建地板）

左侧 Hierarchy 面板的空白处右键，`3D Object` → `Cube`。把新物体改名为 `Floor`。

选中 `Floor`，右侧 Inspector 最上方找到 `Transform`，把参数改成：

- **Position**：`0, 0, 0`
- **Rotation**：`0, 0, 0`
- **Scale**：`10, 0.2, 10`

原本的小方块就变成了一块 10 米见方、20 厘米厚的扁平地板。

为什么用 Cube 不用 Plane？Plane 是单面的，只有上表面会被渲染，从下往上看会消失。Cube 六面都有实体，怎么看都不穿帮。更关键的是 Cube 默认带 `Box Collider`（盒子碰撞体），玩家踩上去不会掉下去。Plane 自带的碰撞体是单面的，处理边缘和角落更容易出意外。

## 第三步：标记出生位置

需要告诉 VRChat：玩家进场景时，应该出现在哪儿、面朝哪边。

Hierarchy 空白处右键，`Create Empty`，新物体改名 `Spawn`。

Inspector 里把 `Spawn` 的 Position 设为 `0, 1, 0`，Rotation 保持默认 `0, 0, 0`。

为什么 Y 设成 1 而不是 0？因为地板厚度 0.2 米，它的上表面在 Y = 0.1。Y = 0 会让玩家卡在地板内部，甚至直接掉下去。Y = 1 让玩家在地面上方一米处出现，然后自然落到地板上。

## 第四步：给场景一张身份证

Hierarchy 空白处右键，`Create Empty`，命名 `WorldDescriptor`。

选中它，Inspector 最下面点 `Add Component`，搜索 `VRC Scene Descriptor`，从结果里点上它。

加好后，在它的属性里找到 `Spawns` 字段，这是一个用来登记出生点的数组。把 Hierarchy 里的 `Spawn` 物体直接拖进 `Spawns` 下方的 `Element 0` 空槽。这样 VRChat 就知道该把玩家送到哪个位置了。

:::tip[为什么是这样？]
Unity 是通用三维引擎，它不知道你在做 VRChat 世界还是单机游戏。`VRC Scene Descriptor` 是你对 SDK 说的第一句话：「这是 VRChat 场景，把玩家带到这里。」没有它，SDK 控制面板上的测试按钮会是灰色的，根本点不动。
:::

## 第五步：Build & Test

顶部菜单栏 `VRChat SDK` → `Show Control Panel`，打开 SDK 控制面板。如果还没登录，先登一下账号。

`Builder` 标签页下面，找到 **Build & Test** 按钮，点。

Unity 会在后台打包并构建本地测试数据，一两分钟。打包完成后会自动唤起你电脑上的 VRChat 客户端。

画面加载好，你会发现自己站在一个很空的世界里：脚下灰白地板，四周默认蓝天，一盏太阳灯照着。

按 `W` `A` `S` `D` 走两步，晃一下鼠标看看天。

这就是你做出来的第一个世界。

简陋，但它是你搭出来的空间。回 Unity 改参数，再 Build & Test，新改动立刻就能进去看。「改 → 构建 → 进去看」这个循环，是 VRChat 世界开发的日常节奏。

:::caution[Build & Test 不工作时的检查清单]
- **顶部菜单找不到 VRChat SDK**：回 VCC 检查项目模板是不是 World，Worlds SDK 包是不是装好了。
- **SDK 面板报缺少 Scene Descriptor**：检查当前打开的场景里有没有 `WorldDescriptor` 物体，它身上是不是真的挂了 `VRC Scene Descriptor` 组件。
- **进世界后一直往下掉**：看 `Floor` 身上的 `Box Collider` 是不是被你删掉了，或者 `Spawn` 的 Y 值是不是设到了地板下面。
- **点了 Build & Test 没反应**：确认 SDK 控制面板里登录过账号，电脑里装了 VRChat 客户端（Steam 版或官方版都行）。
:::

## 整个骨架其实只有四件东西

刚才一路下来，骨架其实很简单：

- 一个场景文件 `MyFirstWorld.unity`，存所有空间数据。
- 一块带物理碰撞的地板 `Floor`，解决玩家在哪站。
- 一个空物体 `Spawn`，标记玩家进来的位置和朝向。
- 一个挂了 `VRC Scene Descriptor` 的 `WorldDescriptor`，告诉 SDK 这是 VRChat 世界。

后面世界做得再大、交互再复杂，最底下的骨架永远是这四样。

## 自己改两个值看看

进下一章之前，回 Unity 改几样参数，重新 Build & Test 一次，亲手建立起对 Unity 和 VRChat 之间这条链条的直觉：

- 把 `Floor` 的 Scale 改成 `20, 0.2, 20`，进去看看是不是变宽了。
- 把 `Spawn` 的 Rotation Y 改成 `180`，进去看看出生方向是不是反了。
- 复制（`Ctrl+D`）几个 Cube，缩小后错落摆在地板周围当凳子，进去试试能不能跳上去。

这种「改一个参数 → 进去看效果」的回路，比读十遍文档管用。

---

下一章往里看一层：Unity 凭什么能让一块 Cube 当地板用。

## 本章参考

- [创建你的第一个 VRChat 世界（官方）](https://creators.vrchat.com/worlds/creating-your-first-world/)
- [VRC Scene Descriptor 字段详解](https://creators.vrchat.com/worlds/components/vrc_scenedescriptor/)
- [Build & Test 使用指南](https://creators.vrchat.com/worlds/udon/using-build-test/)
