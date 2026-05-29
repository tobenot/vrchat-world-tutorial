---
title: 6. 组件，给物体装能力
description: 理解 Unity Component 系统：怎么看、怎么加、怎么调、怎么删，以及 VRChat SDK 组件的角色。
---

上一章你验证了：关掉 Mesh Renderer，物体隐形；拿掉 Collider，玩家穿过去。能力是由组件决定的，不是由物体本身决定的。

这一章正式来看 Component（组件）这套系统。

## 拆解一个 Cube

在 Unity 中新建一个 Cube，选中它看 Inspector，会发现四个组件叠在一起：

1. **Transform**：位置、旋转、大小。每个物体的标配，删不掉。
2. **Mesh Filter**：存储几何数据（「我是一个立方体」）。
3. **Mesh Renderer**：负责视觉成像（「把我画出来」）。
4. **Box Collider**：负责物理边界（「踩到我会停下来」）。

每个组件只管一件事（单一职责）。你可以只要视觉不要碰撞（天上飘着的装饰云），也可以只要碰撞不要视觉（隐形空气墙）。

## Add Component：按需加能力

Inspector 底部有一个 `Add Component` 按钮。点它，搜关键字，就能给物体加上新能力：

* `Light`：物体开始发光。
* `Audio Source`：物体能播放声音。
* `Rigidbody`（刚体）：物体获得重力，会下坠和碰撞。
* `Sphere Collider`：给物体加一个球形碰撞边界。

你不需要一开始就记住上千种组件。只要记住一个操作直觉：**想让物体有某种能力 → Add Component 搜对应的组件。**

VRChat 世界中常用的组件：

| 组件名称 | 职责 | 常见场景 |
| :--- | :--- | :--- |
| **Light** | 发光 | 灯具、霓虹、氛围光 |
| **Audio Source** | 播放声音 | 背景音乐、音效、环境音 |
| **Collider** (Box/Sphere/Mesh) | 物理碰撞与点击区域 | 地板、墙壁、按钮点击区 |
| **Rigidbody** | 重力与物理模拟 | 可推倒的杯子、可滚的球 |
| **Animator** | 平滑运动控制 | 开关门动画、电梯、风扇 |
| **Udon Behaviour** | 自定义交互逻辑 | 开关灯、传送玩家 |
| **VRC Pickup** | 可拾取 | 让玩家能拿起物品 |
| **VRC Object Sync** | 多人位置同步 | 所有人看到同一个被丢出去的物体 |

## 在 Inspector 里调参数

组件挂上后，需要在 Inspector 里调参数。

比如你给一个球加了 `Light` 组件，Inspector 会出现这些：

* **Type**：`Point` 像灯泡四周散光；`Spot` 像手电筒聚光；`Directional` 像太阳平行照亮一切。
* **Color**：光的颜色。
* **Intensity**：亮度。
* **Range**：照射半径。

再比如 `Audio Source`：

* **Audio Clip**：指定播放哪个音频文件。
* **Play On Awake**：场景加载时自动播放。
* **Loop**：循环播放（适合背景音乐和雨声）。
* **Spatial Blend**：0 = 2D（全场等响），1 = 3D（离远了声音变小）。

## 显式拖拽引用（重点，新手最容易卡在这里）

有些组件参数不是让你填数字，而是一个写着 `None (Object)` 的空槽。

比如你写了一个按钮脚本，脚本上有一个 `Target Light` 空槽。你必须把 Hierarchy 里那盏具体的灯**拖进**这个空槽，脚本才知道点按钮时该控制哪盏灯。

这叫**显式指定引用**。

::::tip[为什么是这样？]
场景里可能有十盏灯，Unity 不知道你想控制哪一盏。手动拖进去虽然多花几秒，但逻辑绝对清晰：你可以精确控制每一盏灯，加灯也不会影响已有的开关逻辑。
::::

::::caution[踩坑预警]
新手最常见的死因：脚本没问题、碰撞体也加了，但进去点按钮灯就是不亮。

第一件事去检查 Inspector 里是不是有空槽写着 `None (Object)`。**忘记拖引用，是新手踩得最多的无声陷阱。** 如果你有三个按钮分别控制三盏灯，每个按钮的引用槽都要单独拖对应的灯进去，一个都不能漏。
::::

## 删组件前停一下

不需要某个组件，可以点它右上角的三个点，选 `Remove Component` 卸载。

但先想一下：有没有别的逻辑在依赖它？

* 拿掉 Collider：玩家穿过去，点击触发也失效。
* 拿掉 Mesh Renderer：看不见了，材质特效也没了。
* 拿掉 Rigidbody：依赖它的物理行为全部消失。

不确定后果的话，先取消勾选（临时禁用）再测试，确认没问题再删。

## Play Mode 调参

Unity 顶部的三角形按钮可以进入 **Play Mode**，场景在编辑器里运行起来。

在 Play Mode 里你可以随便改参数看效果：灯光不够亮就拉 Intensity，声音太吵就调 Volume，画面立刻响应。

但有一条铁律：**退出 Play Mode 后，所有改动自动还原。**

所以正确的工作流是：

1. 进 Play Mode，调参数、观察效果。
2. 找到满意的数值，记下来。
3. 退出 Play Mode（数值还原）。
4. 在正常编辑状态下把记下的数值填回去，保存。

::::caution[踩坑预警]
Unity 在 Play Mode 下会让界面颜色变暗。如果你调了半小时参数退出后发现全没了，说明你在 Play Mode 下改的。建议去 `Edit` → `Preferences` → `Colors`，把 `Playmode tint` 改成显眼的颜色（如淡红），这样一眼就能分辨。
::::

## VRChat SDK 组件

引入 VRChat SDK 后，你的工具箱里多了一批 `VRC` 开头的组件：

* **VRC Pickup**：让玩家能拿起物品。
* **VRC Object Sync**：多人同步物体位置。
* **VRC Spatial Audio Source**：3D 空间音效，距离越远声音越小。
* **VRC Mirror Reflection**：生成镜子。
* **VRC Station**：让椅子、沙发可以坐下。

::::note[不同世界不同活法]
你做什么类型的世界，决定你跟哪些组件打交道。做休闲世界，主力是 Mirror、Spatial Audio 和灯光；做游戏世界，主力是 Pickup、Object Sync 和 Udon 脚本。
::::

---

下一章学 Prefab——怎么把配好的物体做成模具，改一处、全场同步。

## 本章参考

* [Unity 官方手册：使用与管理组件](https://docs.unity3d.com/Manual/UsingComponents.html)
* [Unity 官方手册：Inspector 详解](https://docs.unity3d.com/Manual/UsingTheInspector.html)
* [Unity 官方手册：Light 光源组件](https://docs.unity3d.com/Manual/class-Light.html)
* [VRChat 创作者文档：世界组件](https://creators.vrchat.com/worlds/components/)
