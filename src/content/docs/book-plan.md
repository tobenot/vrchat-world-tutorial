---
title: 附录：全书规划
description: 《你的第一个 VRChat 世界：从零到发布的完全手册》的章节骨架、写作节奏和参考资料。
sidebar:
  label: 附录：全书规划
---

# 《打开一扇门》：书规划

> 带你从"这世界怎么做的"走到"我做了一个世界快来玩"的创作手册

---

## 起因

某天深夜，大概凌晨两三点，你在 VRChat 里瞎逛。走进一个世界，地板踩上去会泛光。雨滴打在铁皮屋顶上真有声音。你顺手抄起一把剑挥了一下，手柄居然震了一下。

"这是怎么做出来的？"

然后你打开浏览器开始搜。Unity。C#。SDK。Udon。同步。网络变量。一堆词你一个都没见过，教程散落各处：有的在 Discord 深处，有的是三年前的 YouTube 视频，评论区还有人写"这方法已经不能用了"。

你可能跟着做了一半然后彻底迷路了。也可能看到第一页就关掉了。

嗯。这本书就是写给那个凌晨两三点的你的。

不管你是肝了三千小时的老 VRC 玩家，还是昨天刚下的客户端；不管你想做个朋友们能窝着的小屋，还是脑子里有个宏大的游戏想法；不管你会不会写代码，我都假设你啥都不会。然后一步一步地，像你坐我旁边我指着屏幕跟你讲一样，走到你自己做了一个世界、拉朋友进来转了一圈的那天。

入门之后我也不会把你扔下。整本读完，你会对 VRChat 世界开发有一个完整的认知：搭场景、写逻辑、处理多人同步、让东西好看、让东西跑得流畅、发布出去、让人愿意下次还来。你会变成一个**清楚自己在做什么**的人。这比什么都重要。

---

## 这本书做一件事

**把碎在十几个地方的知识铺成一条路。**  
你不用再猜"现在该学啥"，不用再纠结"这个视频是不是过期了"。跟着走就行。

它不会替代 API 文档，接口说明用到了再翻官方的，他们比谁都了解自己的 API。

它不会替代系统的 Unity 教材。Unity Learn 写得挺好，那是给所有游戏开发者的资源。你的需求更具体："我就想做 VRChat 世界。"我们砍掉八成你用不上的内容。

它不会替代 C# 语言课。要用的语法我会教你，但不会从"Hello World"开始走完一本五百页的编程书。那是另一件事。

另外，这书也聊体验。VRChat 世界是一个**别人会走进去待着的空间**。所以我们会花不少篇幅聊"感受"：这地方进来什么感觉？玩家会不会一脸蒙？为什么有些世界你愿意泡一个小时，有些世界你进去十秒就退了？这些问题比代码重要得多。

---

## 读起来像什么

想象你认识一个人，他比你早摸了两年 VRChat 世界开发，踩坑无数，熬夜无数。有天你跟他说"我也想试试"，他搬了把椅子过来说"坐，我从头带你过一遍"。

他说话直接。你问"这是啥"，他说"这叫 Prefab，你可以把它理解成零件的模具：做了一把椅子，用 Prefab 一拖就能复制出十把一模一样的。"

碰到真难的地方他会直说，"这块确实容易懵。没关系，我们一块一块拆。"然后他真的动手拆了，不会甩个链接让你自己悟。

他还会讲自己的蠢事。"我当年这地方卡了整整一天，最后发现是一个勾忘了打。一个勾。整整一天。"他是在告诉你：**卡住了很正常，这东西确实反直觉**。很多人卡在跟你一模一样的地方。

每章结束你手里都有个**做出来的成品**。能跑、能看、能让朋友说"嚯这你做的？"的小东西。

先做出来，后面再解释为什么。先让你看见灯亮了，再聊亮的原理。

---

## 你大概是什么样的人

**"我玩了好多世界，突然想自己做一个。"**  
你也不确定自己行不行。Unity 没碰过，C# 在你看来就是个带井号的字母。但你心里有个画面：可能是下雨天的咖啡厅，可能是太空站的驾驶舱，也可能就是"一个能和朋友安安静静待着的地方"。画面很模糊，但它就是不走。

**"我试过，半路弃了。"**  
你装过 Unity，打开来看了一眼，面板密密麻麻，像是一整面你不认识的仪表盘。或者你跟了个教程跟到一半，发现人家用的 SDK 版本跟你不一样，然后全线崩盘。

**"我做过一些东西了，但好多地方还是黑盒。"**  
你会复制粘贴脚本，会摆物体，但要你解释"同步"是怎么回事你就支支吾吾。别人问你"这功能怎么做的"你只能说"……反正它能跑"。

**"纯好奇。"**  
你不一定真的要做世界。但你想知道这些东西怎么运作的。就像看完一部厉害的电影想知道特效怎么做的一样，不一定要转行当导演，就是想知道。

以上四种人，全都欢迎。这书从零开始。你跟到哪里算哪里，没人催你。

**已经很有经验的人：** 你已经有三五年 Unity 经验了。直接读 VRChat 官方文档和 SDK 源码吧，这书的节奏对你来说会慢到烦人。

---

## 全书骨架

九个大部分。前四部是地基，从零到能做交互。第五部是岔路口，帮你想清楚自己要往哪走。后四部深入：多人同步、空间体验设计、实战生存技巧、发布和后续。

记不住没关系，随时翻目录就行。

---

### 第一部：先站进去再说

从"做"开始。

整个第一部就一个目的：让你尽快站进自己做的世界里。什么原理都先放着。装工具、建项目、拖一块地板进去、放个出生点、点测试按钮，然后你就站在里面了。

头一次站在自己做的空间里，抬头看看天，哪怕天空是默认那个灰扑扑的蓝色，那感觉比我写多少字的开场白都管用。

之后再倒回来聊：刚才发生了什么？这个"世界"跟你平时玩的游戏关卡有什么本质区别？它存在哪？别人怎么进来？

还有一章专门聊 AI 辅助开发。2026 年了，很多人从第一天起就在用 AI 写代码、查问题。一开始就把话说清楚：AI 能帮你什么、帮不了你什么、怎么问它才不会被它唬住。

**章节：**

- 第 1 章：一个玩家的好奇心
- 第 2 章：AI 是你的创作搭档
- 第 3 章：装好工具，准备出发
- 第 4 章：你的第一个世界

---

### 第二部：认识你的工作台

做完第一个世界之后，你脑子里大概全是问号：

"Scene 是啥？那些面板干嘛用的？为什么有个东西是蓝色的？为什么我改了这个球的颜色那边那个球也跟着变了？？？"

这一部就是回答这些。但我们只教：**作为 VRChat 世界创作者，你必须搞懂 Unity 的哪些部分。** 系统学 Unity 得另写一本比这还厚的书。用不上的，等用到了再说。

核心就一句话：Unity 里万物皆 GameObject，GameObject 的行为取决于你给它挂了什么 Component。

听着像废话对吧？做过几次你会发现，之前不理解的那些事，九成都能被这句话解释。

这部分还会让你第一次碰碰材质和光照。只浅浅一碰，让你感觉一下"为什么有的世界看起来那么舒服，我的看起来像塑料"。答案没你想的那么玄。

**章节：**

- 第 5 章：Unity 里的一切都是物体
- 第 6 章：组件，给物体装能力
- 第 7 章：Prefab，把东西做成模具
- 第 8 章：材质和光的第一印象

---

### 第三部：学一点编程

深呼吸。

如果你完全没写过代码，看到"编程"两个字可能已经开始焦虑了。

放心。

编程是手艺活。就像烹饪：你不需要先搞明白美拉德反应才能做一顿饭，你只需要知道下一步放什么、火开多大。我们学编程也是这个路子：从"我想让灯亮"这个看得见的需求出发，一步步把语法和概念带出来。

如果你已经会写代码？快速过一遍就行。重点看"UdonSharp 跟标准 C# 有什么区别"那章，那些坑你大概率会踩。

这部分结束后你能打开一段 UdonSharp 脚本看懂它在干什么，知道改哪行能让灯变红，而且敢自己动手改。

够了。剩下的后面边做边学。

**章节：**

- 第 9 章：写给完全没编过程的你
- 第 10 章：刚好够用的 C#
- 第 11 章：UdonSharp，长得像 C# 但它有脾气

---

### 第四部：让世界活过来

好。你知道 Unity 怎么用了，代码大概能读了。接下来，让这个死板的空间*活*过来。

全书最密集的动手章节在这。每一章就一个小主题，每个主题小到一个晚上就能做完：

按按钮，灯亮了。走进一片区域，音乐响了。拿起一个东西，扔出去。坐到椅子上视角自动切了。门开了。计时器在倒数。

每一个单拆出来都挺简单。但它们组合起来就是 VRChat 世界交互的全部基本功。做完这部分你手里会有十来个随时能用的小组件，像乐高积木一样，后面做大项目直接往里塞。

**章节：**

- 第 12 章：按一下，灯亮了
- 第 13 章：走进去，事情发生了
- 第 14 章：拿起来，丢出去
- 第 15 章：坐下来，照镜子，走过去
- 第 16 章：门、机关和状态

---

### 第五部：你想做什么样的世界？

恭喜你，走到岔路口了。

到这你已经会做基础交互了。可 VRChat 世界类型太多了。一个让人放松聊天的 Chill 小屋跟一个四人对战的射击游戏，虽然都叫"世界"，设计重点、技术痛点、审美方向完全不同。就像同样跟食物打交道，自己在家做顿饭和开一家餐厅需要的能力完全是两回事。

这部分更像一份**创作者的选课指南**。每种世界类型我们聊几件事：

- 这种世界的核心体验是什么感觉？
- 玩家走进来的时候心里在期待什么？
- 设计上最容易翻车的坑在哪？
- 技术上你该优先补哪块？

读完之后你得能回答一个关键问题：**我接下来该把时间砸在哪个方向？**

想做 Chill 世界？优先搞光照、声音、空间感、性能。同步可以晚点再学。  
想做游戏世界？优先啃状态机、网络同步、UI、调试方法。美术先拿现成素材顶着。  
想做展览空间？优先研究动线、灯光、材质、性能。复杂脚本你可能压根用不上。

路不同，花时间的方式自然不同。

**章节：**

- 第 17 章：Chill World，让人愿意留下来的房间
- 第 18 章：Game World，让规则跑起来
- 第 19 章：Social Hub，给社群一个家
- 第 20 章：Gallery，让作品被看见
- 第 21 章：Narrative World，让玩家走进一段故事
- 第 22 章：Event World，舞台、活动和聚会
- 第 23 章：Tool World，做一个好用的工具
- 第 24 章：Commercial World，商品、赞助和创作者经济

---

### 第六部：和别人一起

VRChat 世界是多人体验。别人会走进来。

这一件事，"有别人"，是 VRChat 世界开发里最独特也最让人抓狂的部分。

你在自己电脑上按了个按钮，灯亮了。你拉朋友进来看，他那边灯是暗的。

"？？？为什么？？？"

欢迎来到网络同步的世界。

这部分从这个最基础的困惑起步，一点点把 VRChat 的网络模型拆给你看。我们先做个实验：做一盏灯，让两个人都能看到它亮灭。做的过程中自然就会蹦出所有问题：

谁"拥有"这个物体？什么信息会传给对方？什么时候传？后加入的人怎么知道之前发生过什么？

一个问题一个小实验。做完这部分你能搞同步灯、同步门、计分板，甚至一个简单的多人小游戏。

**章节：**

- 第 25 章：你看到的，别人不一定看到
- 第 26 章：谁说了算，Ownership
- 第 27 章：告诉别人发生了什么
- 第 28 章：后来的人怎么办
- 第 29 章：做一个多人小游戏

---

### 第七部：让世界变成一个*地方*

技术上能跑的世界，跟玩家愿意在里面待半小时的世界，中间隔着"体验感"。一种"这里好像是个真实存在的地方"的感觉，说不清楚但进去就知道有没有。

这部分聊的是把一个"场景"变成一个"地方"的东西：

出生点面朝哪个方向？（面朝墙壁的出生点会让人第一秒就想退出，毫不夸张。）走廊多宽 VR 玩家才不觉得压抑？镜子该放哪？背景音乐会不会吵到想安静说话的人？玩家一进来知不知道该往哪里走？

然后是视觉。为什么你的世界看着那么"平"？什么叫"光照做对了"？材质怎么让一面墙看起来像石头、像有重量，像真的在那里？

最后是性能。什么操作是"贵"的？怎么在好看和跑得动之间找到平衡？PC 用户和 Quest 用户看到的是同一个世界吗？

**章节：**

- 第 30 章：玩家进来的前三十秒
- 第 31 章：空间、比例和舒适
- 第 32 章：声音和氛围
- 第 33 章：UI、提示和反馈
- 第 34 章：传送门和世界之间的连接
- 第 35 章：光
- 第 36 章：表面和材质
- 第 37 章：性能，跑得动才是好
- 第 38 章：PC 和 Quest

---

### 第八部：做着做着你会撞上的事

前面七部讲的是"怎么做"。这部分讲做着做着你会遇到什么意外。

东西突然坏了怎么查？怎么测试"两个人同时在房间里"的场景？项目越来越大怎么不把文件搞丢？模型去哪找？下载的素材能不能拿来用、会不会侵权？

这些话题一点也不酷炫。但它们决定了你**能不能撑过前三个月**。

真的，好多人做完第一个世界就消失了。原因通常是一个 bug 找了三小时找不到人崩溃了；一次手滑把两天的活全删了；用了个不该用的素材然后收到 takedown notice 被吓退了。

这部分就是提前帮你绕开那些让人放弃的坑。

**章节：**

- 第 39 章：坏了怎么办，调试的思路
- 第 40 章：测试你的世界
- 第 41 章：版本管理和备份
- 第 42 章：素材、插件和版权

---

### 第九部：发出去，然后继续走

世界做好了。你点了发布。它出现在 VRChat 世界列表里了。

……然后呢？

发布是另一段路的开头。玩家会来，有人夸你，有人报 bug，有人说"能不能加个 XXX"。你得决定什么时候更新、怎么维护、怎么让这个世界不变成上传之后再没人去的废墟。

如果你想靠创作弄点收入：Creator Economy 是怎么回事？赞助按钮放哪才不让人反感？商品展示怎么做才有格调、清楚、有秩序？

最后聊"书读完了接下来干嘛"。官方文档那么庞大你怎么消化？社区里老手们写的深度帖子你怎么读？碰到书里没覆盖的问题你怎么自己找到答案？怎么跟 AI 建立一种长期靠谱的合作关系？

学完这本书是另一段旅程的起点。做完第一个世界也是。

等你开始做第二个的时候就会明白，创作这件事没有终点。这是好消息。

**章节：**

- 第 43 章：发布你的世界
- 第 44 章：赞助、商品和创作者经济
- 第 45 章：维护一个世界
- 第 46 章：继续学习，官方文档、社区和 AI 协作

---

### 附录

- A. 术语表
- B. Unity 编辑器速查
- C. VRChat SDK 组件速查
- D. UdonSharp 常见限制和踩坑集
- E. 网络同步决策表
- F. 常见报错排查手册
- G. 性能检查清单
- H. 发布前检查清单
- I. AI 提示词参考
- J. 官方文档和社区资料导航

---

## 贯穿全书的设计

### 每章的节奏

一种呼吸感。每章大致走一个五步弧线：

1. **制造渴望。** 不是"本章学习目标 1、2、3"，而是先让你碰到一个问题或好奇心。"你复制了二十个发光球，现在要改光的范围。改了第一个。还有十九个。有没有办法改一次就全部跟着变？"你渴了。好。
2. **带着问题动手。** 你知道自己在试图解决什么。步骤有引导，但你不是在盲目跟着点。
3. **解释为什么这样设计。** 做完后我告诉你底层发生了什么、为什么要这样设计、不这样做会怎样。你带着实践经验来听，能听进去。
4. **自己改着玩。** 换个颜色？故意删掉一个组件看看会怎样？不给完整答案，给方向。这一步是从"照着做"跨到"我真的懂了"的桥。
5. **回头看，向前连。** 你刚做了什么，你现在会什么，下一章要干什么。三句话结束。

### 理解章

每一部的末尾有一节短的理解章。不要求动手操作，专门帮你建立更完整的心智模型：把前面做过的操作抽象成可迁移的通用原理，回答"为什么是这样"。

### 正文中间会冒出来的东西

像书页空白处的手写笔记。保持主线叙事流畅，同时给你侧面的视角：

- **🤔「为什么是这样？」** 设计故事，展示专家思维。每个"为什么"都包含"如果不这样会怎样"的对比。
- **⚠️「坑」** 一个大量人踩过的具体错误。先让你想想原因，再给答案。
- **🤖「AI 能帮忙」** 当前这个具体情境下，你可以怎么问 AI、怎么判断它给的答案靠不靠谱。
- **🔀「不同世界不同活法」** 同一个技术点在不同类型世界里侧重点完全两样。

### 按需跳读

第五部讲完世界类型之后，书里会给几条路线。

想做 Chill 世界？先跳去光照和空间设计那几章。网络同步等你真需要了再回来。  
想做游戏世界？先去啃网络同步和状态机。美术后面慢慢磨。

帮你确定**此刻**最该花时间在哪。创作者的时间永远不够用，我不想浪费你的。

---

## 写作时我在想什么

动笔之前我先问自己五件事：

1. 读者翻到这一页的时候，脑子里最大的困惑或渴望是什么？
2. 做完这一章他能拿出一个什么东西给朋友看？
3. 他做完之后应该理解什么原理，而不只是记住步骤？
4. 哪些概念必须现在讲清楚、哪些可以先搁着，等他需要了再来看？
5. 我得去翻哪些官方文档，确认自己没有凭记忆瞎写？

写完之后回头检查：

1. 一个完全的新手，在深夜，只有这本书和一个 Unity 编辑器，他能跟到底吗？
2. 语气有没有不自觉地滑向"技术文档"模式？读出声来像人说话吗？
3. 有没有甩了个术语然后忘了解释就跑了？
4. 有没有只列了要点、没给画面感？

章节长度不固定。"你的第一个世界"可能很短，重点在动手。"Ownership"可能长一些，因为这个概念确实得换好几个角度才能吃透。

---

## 关于准确性

VRChat SDK 一直在更新。这书写的时候是 2026 年中的 SDK。

技术这东西，会过时的。API 会改名，组件会新增，某些行为在你读到的时候可能已经变了。所以：

- 涉及具体 API 和组件行为的地方，我会标上当时的 SDK 版本号
- 附录里放了官方文档链接，SDK 更新了你可以自己去对照
- 如果某个说法来自社区经验或我个人的感觉，我会明确告诉你"这是经验谈不是官方机制"

我没办法保证这书永远对。但我能保证的是：每一句写技术的内容，我写的时候都去翻过文档了。我不确定的地方，我会说"我不确定"。

---

## 读完了你会变成什么样

说点实际的：

- **第 4 章之后**，你站在自己做的世界里了。地板是灰的，天空是默认那个朴素的蓝，什么都没有。但你环顾四周的时候大概会笑一下，因为这是*你做的*。
- **第 16 章之后**，你在世界里放了扇门，门能开。灯能按按钮切换。你捡起一个球扔了出去。很基础的东西，但你知道它们为什么能动了。
- **第 24 章之后**，你开始知道自己想做什么类型的世界了。能说出"我想做一个……"后面接出具体的话。
- **第 29 章之后**，你朋友进了你的世界，他按了个按钮，你这边也看到灯亮了。你理解了为什么"让两个人看到同一件事"比"只让自己看到"难那么多。
- **第 38 章之后**，你的世界开始像个*地方*了。有光影，有声音，有让人想走过去看看的角落。
- **第 46 章之后**，你知道怎么继续往下走了。知道去哪翻答案，知道哪些答案能信，知道怎么跟 AI 合作又不被它带偏。

你是一个**知道自己在做什么的创作者**。碰到问题的时候你不会完全无助，因为你知道怎么把不会的东西变成会的。

然后呢？继续做东西。做一个世界，再做一个。每个都比上一个好一点。

这就够了。剩下的交给时间。

---

## 参考资料映射表

写每一章的时候需要查的东西。确保内容准确，也方便 SDK 更新后回头校对。

---

### 第一部：先站进去再说

| 章 | 需要查的资料 |
|---|---|
| 第 1 章：一个玩家的好奇心 | 不涉及具体技术，不需要对照文档 |
| 第 2 章：AI 是你的创作搭档 | 不涉及 VRChat 具体 API，但要确认当前主流 AI 工具的能力边界 |
| 第 3 章：装好工具 | VRChat Creator Companion 官方指南 `creators.vrchat.com/sdk/` <br> 推荐 Unity 版本 `creators.vrchat.com/sdk/upgrade/current-unity-version/` <br> World 模板创建流程 |
| 第 4 章：你的第一个世界 | VRCSceneDescriptor `creators.vrchat.com/worlds/components/vrc_scenedescriptor` <br> Build & Test 流程 `creators.vrchat.com/worlds/udon/using-build-test/` |

---

### 第二部：认识你的工作台

| 章 | 需要查的资料 |
|---|---|
| 第 5 章：一切都是物体 | Unity 官方 Manual: GameObjects, Transforms, Hierarchy <br> 不需要 VRChat 特定文档 |
| 第 6 章：组件 | Unity Manual: Components <br> VRChat SDK 组件总览 `creators.vrchat.com/worlds/components/` |
| 第 7 章：Prefab | Unity Manual: Prefabs, Prefab Variants <br> SDK Prefabs `creators.vrchat.com/worlds/sdk-prefabs/` |
| 第 8 章：材质和光的第一印象 | Unity Manual: Materials, Lighting, Standard Shader <br> 不深入 VRChat 特定限制（后面性能章再讲） |

---

### 第三部：学一点编程

| 章 | 需要查的资料 |
|---|---|
| 第 9 章：写给没编过程的人 | 不涉及 VRChat 文档，纯编程概念教学 |
| 第 10 章：刚好够用的 C# | 不涉及 VRChat 文档，C# 基础语法 |
| 第 11 章：UdonSharp 的脾气 | UdonSharp 官方文档 `udonsharp.docs.vrchat.com/` <br> UdonSharp GitHub README 和 Known Issues <br> Class Exposure Tree（确认哪些 .NET API 可用） <br> 项目内 `Docs/pitfalls/udonSharpPitfall.md`（我们自己积累的坑点） |

---

### 第四部：让世界活过来

| 章 | 需要查的资料 |
|---|---|
| 第 12 章：按钮和灯 | Udon 事件列表 `creators.vrchat.com/worlds/udon/graph/event-nodes/` <br> Interact 事件说明 |
| 第 13 章：Trigger 区域 | Unity Manual: Colliders, Triggers, Rigidbody <br> VRChat Player 事件 `OnPlayerTriggerEnter` 等 |
| 第 14 章：Pickup | VRC_Pickup `creators.vrchat.com/worlds/components/vrc_pickup` <br> VRCObjectSync `creators.vrchat.com/worlds/components/vrc_objectsync` |
| 第 15 章：Station / Mirror / Teleport | VRCStation `creators.vrchat.com/worlds/components/vrc_station` <br> VRCMirrorReflection `creators.vrchat.com/worlds/components/vrc_mirrorreflection` <br> Teleport 相关方法 `Networking.LocalPlayer.TeleportTo()` |
| 第 16 章：门和状态机 | 不涉及新的官方组件，综合前面章节 <br> 可参考社区状态机实现方式 |

---

### 第五部：世界类型

| 章 | 需要查的资料 |
|---|---|
| 第 17-24 章（世界类型） | 各类型不需要具体 API 文档 <br> 可参考 VRChat World 排名中各类型热门世界作为案例 <br> Creator Economy 章需查 `creators.vrchat.com/economy/` <br> 社区关于各类型世界的经验帖（标注日期和可信度） |

---

### 第六部：和别人一起

| 章 | 需要查的资料 |
|---|---|
| 第 25 章：别人看不到 | Udon Networking 概述 `creators.vrchat.com/worlds/udon/networking/` |
| 第 26 章：Ownership | Network Components `creators.vrchat.com/worlds/udon/networking/network-components` <br> `Networking.SetOwner` / `Networking.IsOwner` / `Networking.GetOwner` |
| 第 27 章：同步变量和网络事件 | `[UdonSynced]` 说明 <br> `RequestSerialization` / `OnDeserialization` <br> `SendCustomNetworkEvent` <br> Manual vs Continuous Sync |
| 第 28 章：Late Joiner | 同上文档中 Late Joiner 相关段落 <br> 社区网络同步系列中关于 Late Joiner 的文章 |
| 第 29 章：多人小游戏 | 综合前面章节，不涉及新 API <br> 可参考官方 SDK 示例场景 UdonExampleScene |

---

### 第七部：让世界变成一个地方

| 章 | 需要查的资料 |
|---|---|
| 第 30 章：前三十秒 | 不涉及具体 API，体验设计讨论 |
| 第 31 章：空间和比例 | VRChat 玩家高度参考 <br> VR 晕动相关社区经验 |
| 第 32 章：声音 | VRCSpatialAudioSource `creators.vrchat.com/worlds/components/vrc_spatialaudiosource` <br> Unity Manual: Audio Source, Audio Listener |
| 第 33 章：UI 和反馈 | Unity Manual: Canvas, World Space UI <br> VRChat UI 限制（不支持 Screen Space Overlay） |
| 第 34 章：传送门 | VRC Portal Marker `creators.vrchat.com/worlds/components/vrc_portalmarker` <br> Avatar Pedestal |
| 第 35 章：光 | Unity Manual: Lighting, Lightmapping, Light Probes, Reflection Probes <br> VRChat 光照建议（社区经验为主） |
| 第 36 章：材质 | Unity Manual: Standard Shader, PBR 工作流 <br> VRChat 推荐 Shader（如 Standard, poiyomi 等社区 Shader 的适用性） |
| 第 37 章：性能 | VRChat 性能排名系统 `creators.vrchat.com/worlds/performance-tips/` <br> Unity Profiler / Stats 窗口 <br> Draw Call / Batching / Occlusion 原理 |
| 第 38 章：PC 和 Quest | Quest 限制文档 `creators.vrchat.com/platforms/android/` <br> Quest 内容限制（Shader、Realtime Light、面数等） |

---

### 第八部：做着做着会撞上的事

| 章 | 需要查的资料 |
|---|---|
| 第 39 章：调试 | Unity Console 使用 <br> UdonSharp 编译错误类型 <br> ClientSim 文档 `creators.vrchat.com/worlds/udon/using-build-test/` |
| 第 40 章：测试 | ClientSim vs Build & Test 区别 <br> 多人测试方法（开多实例） |
| 第 41 章：版本管理 | Unity 项目 Git 最佳实践（.gitignore、.meta 文件、LFS） <br> 不涉及 VRChat 特定文档 |
| 第 42 章：素材和版权 | Booth / Gumroad / Unity Asset Store 授权说明 <br> VRChat ToS 中关于第三方内容的部分 <br> Creative Commons 各协议简要说明 |

---

### 第九部：发出去，然后继续走

| 章 | 需要查的资料 |
|---|---|
| 第 43 章：发布 | World Upload 流程 `creators.vrchat.com/worlds/submitting-a-world/` <br> World Metadata / Tags / Thumbnail 要求 |
| 第 44 章：Creator Economy | `creators.vrchat.com/economy/` 全部 <br> SDK Prefabs 中 Economy 相关 Prefab |
| 第 45 章：维护 | 不涉及新文档，经验为主 |
| 第 46 章：继续学习 | VRChat Creator Docs 结构导航 <br> UdonSharp Docs 结构 <br> 社区资料消化方法（我们之前讨论的内容） <br> AI 协作提示词方法 |

---

### 附录

| 附录 | 需要查的资料 |
|---|---|
| A. 术语表 | 全书涉及的术语汇总，定义参考官方文档 |
| B. Unity 编辑器速查 | Unity Manual |
| C. SDK 组件速查 | `creators.vrchat.com/worlds/components/` 全部组件 |
| D. UdonSharp 限制 | UdonSharp Docs + 项目内 pitfall 文档 + GitHub Issues |
| E. 网络同步决策表 | 基于官方 Networking 文档 + 社区经验整理 |
| F. 报错排查 | UdonSharp 常见编译错误 + Unity Console 常见错误 |
| G. 性能检查清单 | 官方 performance tips + 社区经验 |
| H. 发布检查清单 | 官方 submission 文档 + 社区经验 |
| I. AI 提示词 | 不涉及外部文档，基于我们的实践总结 |
| J. 资料导航 | 官方文档入口汇总 + 中文翻译站 + 社区推荐资源 |

---

### 关键外部资料一览

方便写作时快速跳转：

**官方文档主站**
- VRChat Creator Docs: `https://creators.vrchat.com`
- Worlds 入口: `https://creators.vrchat.com/worlds/`
- SDK Components: `https://creators.vrchat.com/worlds/components/`
- Udon: `https://creators.vrchat.com/worlds/udon/`
- Networking: `https://creators.vrchat.com/worlds/udon/networking/`
- SDK Prefabs: `https://creators.vrchat.com/worlds/sdk-prefabs/`
- Creator Economy: `https://creators.vrchat.com/economy/`
- Android/Quest: `https://creators.vrchat.com/platforms/android/`
- World Submission: `https://creators.vrchat.com/worlds/submitting-a-world/`

**UdonSharp**
- UdonSharp Docs: `https://udonsharp.docs.vrchat.com/`
- UdonSharp GitHub: `https://github.com/MerlinVR/UdonSharp`
- VRChat API (UdonSharp): `https://udonsharp.docs.vrchat.com/vrchat-api`

**中文资料（辅助参考，以英文官方为准）**
- VRChat 汉化文档中心: `https://docs.vrczh.org/creators.vrchat.com/worlds/`
- VRCD 文档库: `https://docs.vrcd.org.cn/`

**社区资源**
- VR Creators 文档站: `https://vrcreators.net/docs/vrchat`
- DeepWiki VRChat 解析: `https://deepwiki.com/vrchat-community/creator-docs/`
- DeepWiki UdonSharp API: `https://deepwiki.com/vrchat-community/UdonSharp/4-api-reference`
- VRChat 官方包列表: `https://vrchat.github.io/packages-official/`

**项目内参考**
- UdonSharp 坑点: `Docs/pitfalls/udonSharpPitfall.md`
- Shader 开发笔记: `Docs/pitfalls/vrchat-shader-dev-notes.md`

