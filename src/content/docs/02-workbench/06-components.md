---
title: 6. 组件，给物体装能力
description: 理解 Unity Component 系统：怎么看、怎么加、怎么调、怎么删，以及 VRChat SDK 组件的角色。
---

上一章我们说 GameObject 是空壳。你也亲手验证了：关掉 `Mesh Renderer`，物体就看不见了；删掉 Collider，就踩不到了。

这一章我们正式认识空壳里装的东西：Component，组件。

## 一个思想实验

假设你想做一个有声音的发光按钮。

如果 Unity 用传统的「固定类型」设计，它可能需要提供一个叫「发光音响按钮」的对象类型。但世界上有多少种物体组合？发光的、不发光的、有声音的、没声音的、能点击的、不能点击的、有物理重力的、没有的……排列组合无穷无尽。

所以 Unity 选了另一条路：**给你一个空盒子，让你自己往里装能力。** 想发光？加 Light。想有声音？加 Audio Source。想能被点击？加 Collider。想受重力？加 Rigidbody。

这就是组件系统。你以后做 VRChat 世界，大部分时间就在做同一件事：**找到对的物体，给它加上对的组件，然后调参数。**

## 从一个 Cube 开始观察

在 Unity 里新建一个 Cube，选中它，看 Inspector 面板。

你会看到四个组件叠在一起：

1. **Transform** — 位置、旋转、缩放。每个 GameObject 都有，删不掉
2. **Mesh Filter** — 存储形状数据（「我是一个立方体」）
3. **Mesh Renderer** — 把形状画到画面里（「让别人看见我」）
4. **Box Collider** — 物理碰撞体（「别人踩我会停下来」）

四个组件配合，一个能看见、能站上去的方块就出来了。

每个组件只管一件事。关掉哪个，哪个能力就没了。这种「一个组件一个职责」的设计在软件工程里叫**单一职责原则**。好处是灵活：你可以只要形状不要碰撞（飘在空中的装饰物），也可以只要碰撞不要形状（看不见的隐形墙）。

## Add Component：给物体加能力

选中任何一个 GameObject，在 Inspector 最下面有一个 `Add Component` 按钮。点它，会弹出搜索框。

- 输入 `Light`，回车 → 这个物体会发光
- 输入 `Audio Source` → 它能播声音
- 输入 `Rigidbody` → 它会受重力往下掉
- 输入 `Sphere Collider` → 它有一个球形的碰撞区域

你现在不需要记住所有组件的名字。你只需要记住这个动作：**想给物体一个能力，去 Add Component 里搜。**

后面你会渐渐熟悉常用的十几个组件。这里先列出最常碰到的几个：

| 组件 | 做什么 | 什么时候用 |
|------|--------|-----------|
| Light | 发光 | 灯具、发光物体、氛围光 |
| Audio Source | 播声音 | 背景音乐、音效、环境音 |
| Collider（Box/Sphere/Mesh） | 物理碰撞 | 让物体能被踩、能阻挡、能被点击 |
| Rigidbody | 物理模拟 | 让物体受重力、能被推动 |
| Animator | 播放动画 | 门开关、物体移动、角色动作 |
| UdonBehaviour | 自定义逻辑 | 做任何交互功能（后面会学） |
| VRC Pickup | VRChat 拾取 | 让玩家能拿起物体 |
| VRC Object Sync | 网络同步 | 让所有玩家看到同样位置 |

不用背。用到的时候自然会记住。

## Inspector 里调参数

组件加上去之后，通常还需要调参数才能达到你想要的效果。

比如你给一个球加了 Light 组件。Inspector 里会多出一片字段：

- **Type** — 灯的类型。Point 像灯泡从一个点向四周发光，Spot 像手电筒，Directional 像太阳
- **Color** — 光的颜色。点开色板，暖黄像台灯，冷蓝像月光
- **Intensity** — 强度。数字越大越亮。通常 1–3 之间就够
- **Range** — 影响范围（只对 Point 和 Spot 有效）。太小只照脚底，太大笼罩整个场景

再比如 Audio Source：

- **Audio Clip** — 播哪个声音文件
- **Play On Awake** — 是否场景一开始就播
- **Loop** — 是否循环播放
- **Volume** — 音量
- **Spatial Blend** — 0 是 2D 声音（不管玩家在哪都一样大），1 是 3D 声音（离远了会变小）

以后你跟教程做功能时，步骤经常是这样的：选中某个物体 → 找到某个组件 → 把某个字段改成某个值。整个 Unity 的日常操作就藏在这里。

## 引用字段：把东西拖进去

有些字段比较特殊。它们不是填数字、改颜色或者打勾，而是一个空槽，要你指定场景里的某个对象。

比如你以后写一个开灯脚本，脚本里会有一个字段叫 `targetLight`。它想让你告诉它：你想控制哪盏灯？这时候你需要把 Hierarchy 里那盏灯**拖到**这个字段里。

这个动作叫做「赋引用」。你在告诉这个组件：「嗨，你要控制的对象在这里。」

⚠️ **坑：** 新手最常见的问题之一——脚本写对了，组件也挂对了，最后功能没反应。一看 Inspector，那个字段还写着 `None（Object）`。十有八九是忘了拖引用。**如果某个功能不工作，第一件事就是检查 Inspector 里有没有空着的引用字段。**

🤔 **为什么要手动拖？** 为什么 Unity 不自动帮你找到场景里的灯？因为场景里可能有十盏灯，Unity 不知道你想控制哪一盏。引用字段让你明确指定「就是这一个」。这种显式指定比自动查找更可靠——你不会因为多加了一盏灯就让旧功能乱掉。

## 删组件之前想一想

组件可以删。在 Inspector 里找到组件右上角的三个点菜单（或者右键组件标题），选 Remove Component。

但删之前想一下：别的东西有没有在依赖它？

- 删掉 Collider → 玩家的点击和触发区域不起作用了
- 删掉 Renderer → 模型看不见了
- 删掉 VRC Scene Descriptor → 整个场景不能作为 VRChat World 构建了
- 删掉 Rigidbody → 依赖它的物理效果全部失效

如果你只是想测试「没有这个组件会怎样」，可以先把组件前面的勾取消掉（禁用），而不急着删掉它。确认真的不需要了，再动手删除。

## Play Mode 里试参数

Unity 有一个 Play Mode。点顶部的播放按钮（三角形），场景就会运行起来。

在 Play Mode 里你可以临时改组件参数，马上看到效果。灯太亮？把 Intensity 拖低一点，立刻就暗了。碰撞体太小？拉大一点，马上就能踩到。

但有一个陷阱：**退出 Play Mode 之后，你刚才改的所有值都会消失，回到进入 Play Mode 之前的状态。**

所以流程是这样的：

1. 进 Play Mode 试参数
2. 找到满意的值，记下来（哪怕写在纸上）
3. 退出 Play Mode
4. 把值填回去
5. 保存场景

听起来笨，但所有 Unity 开发者都这样做。Unity 这样设计是为了安全：让你自由实验而不怕搞坏东西。

⚠️ **坑：** Play Mode 时 Unity 编辑器的颜色会稍微变化（通常是变暗或者加一层颜色）。如果你发现改了参数退出后全部消失了，检查一下你改的时候是不是还在 Play Mode 里。这是新手最常踩的坑之一。你可以在 `Edit → Preferences → Colors` 里把 Playmode tint 设成一个更明显的颜色（比如浅红），这样一眼就能看出是否在 Play Mode。

## VRChat 的组件

除了 Unity 自带的组件，VRChat SDK 还会给你一批以 `VRC` 开头的专用组件。

`VRC Scene Descriptor` 你已经用过了，它让 Unity 场景能被 VRChat 识别为世界。以后你还会碰到：

- **VRC Pickup** — 让玩家能拿起物体（第 14 章）
- **VRC Object Sync** — 同步物体位置给所有玩家看到（第六部）
- **VRC Spatial Audio Source** — 让声音有空间感，离远了变小（第 32 章）
- **VRC Mirror Reflection** — 做镜子（第 15 章）
- **VRC Portal Marker** — 做传送门到其他世界（第 34 章）
- **VRC Station** — 让玩家坐下来（第 15 章）

这些名字现在不用背。等你真的想做「让玩家能拿起这个东西」的功能时，自然会去搜 `VRC Pickup`。

你只需要知道一件事：**VRC 开头的组件是 VRChat 专属的，它们处理的是玩家、网络、世界上传这些只有 VRChat 才有的事情。** Unity 自带的组件处理通用的 3D 引擎功能（渲染、物理、声音、动画），VRC 组件在上面加了一层「多人在线虚拟世界」的逻辑。

🔀 **不同世界不同活法：** 休闲世界可能只用 `VRC Scene Descriptor` + `VRC Mirror Reflection` + `VRC Spatial Audio Source` 就够了。游戏世界可能需要 `VRC Pickup` + `VRC Object Sync` + 大量 UdonBehaviour。展览世界可能几乎不用 VRC 交互组件，主要靠光照和材质。你做什么类型的世界，决定了你常用哪些组件。

## 动手：做一个会发光的球

回到你的项目。我们做一个有层次感的小东西：

1. 在 Hierarchy 里创建一个 Sphere（Create → 3D Object → Sphere），命名为 `GlowBall`
2. 把它的 Position 设成 `0, 1.5, 0`，让它浮在地板上方
3. 选中它，点 Add Component，搜索 `Light`，加上去
4. 在 Light 组件里，把 Type 改成 **Point**（从一个点向四周发光）
5. Color 选一个浅蓝色
6. Intensity 填 `2`
7. Range 填 `5`
8. 进 Play Mode 看看效果。灯光是否照亮了附近的地板和墙壁？
9. 如果太亮就降 Intensity，太暗就升一点。Range 太小就加大
10. 记住满意的值，退出 Play Mode，把值填回去，保存场景

做完之后看看 Inspector：这个球身上有 Transform（位置大小）、Mesh Filter（球形形状）、Mesh Renderer（画出来）、Sphere Collider（碰撞体）和 Light（发光）。五个组件各管各的事，组合出一个有存在感的发光球。

## 自己改着玩

- 试试给 `GlowBall` 再加一个 Audio Source。随便拖一个声音文件进 Audio Clip（如果没有声音文件，可以先跳过这一步）。打勾 Play On Awake 和 Loop。进 Play Mode 听听是否有声音
- 试试给 `Floor` 加一个 Rigidbody。进 Play Mode。地板掉下去了对吧？因为 Rigidbody 让它受重力了。退出 Play Mode（值会恢复），把 Rigidbody 删掉
- 想一想：如果你想做一个「隐形的地板」（踩得到但看不见），应该关掉哪个组件？
- 想一想：如果你想做一个「只能看不能踩的全息投影」，应该关掉哪个组件？

## 回头看一眼

你现在知道了：

- 组件是 GameObject 的能力来源。每个组件管一件事
- `Add Component` 给物体加能力，Inspector 调参数，引用字段指定「控制哪个对象」
- Play Mode 可以实时试参数，但退出后会恢复。记得把满意的值手动填回去
- VRC 开头的组件是 VRChat 专属的，处理多人世界特有的事情
- 大部分 VRChat 世界开发的日常操作就是：找到物体 → 加组件 → 调参数 → 测试

---

下一章，我们把配置好的东西做成 Prefab，这样你就可以复制出很多份，还能统一管理。

## 本章参考

- [Unity Manual: Use components](https://docs.unity3d.com/Manual/UsingComponents.html)
- [Unity Manual: Inspector Window](https://docs.unity3d.com/Manual/UsingTheInspector.html)
- [Unity Manual: Light component](https://docs.unity3d.com/Manual/class-Light.html)
- [VRChat Worlds Components](https://creators.vrchat.com/worlds/components/)
