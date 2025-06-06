// 游戏数据 - 包含完整的小说内容和错别字数据
const gameData = {
    user: { id: 1, username: "user", balance: "30.00", completed: 0 },
    texts: [
        {
            id: 1,
            content: "第1章 非强迫\n下午三点，正值盛夏最炎热的时间。太阳毒辣地烤着地面，空气里蔓延着阵阵灼意，即便是被绿荫层层环绕的翡翠湖，今天似乎也抵挡不住这份燥热。\n他狗偻着身体凑近，微顿几秒，忽地如临大敌地拔高了声音，我不是说了这里的鱼数量一定得是6的倍数吗？怎么只有13条！\n中年男人气得拍他头，雇主的要求轮得到你问为什么？赶紧去买5条来补上！\n被嗤了一顿，几个佣人讪讪朝外走。可刚拉开门，一辆黑色汽车已经缓缓驶到了门口。\n话音刚落，瞥见指缝里的一抹蓝色鱼尾，他动作顿住，倏地把手别到背后。",
            typos: [
                { start: 110, end: 111, incorrect: "狗", correct: "佝" },
                { start: 210, end: 211, incorrect: "嗤", correct: "斥" },
                { start: 310, end: 311, incorrect: "倏", correct: "霎" }
            ],
            difficulty: "medium"
        },
        {
            id: 2,
            content: "第2章 非强迫\n在京市坊间的传闻里，周时聿和裴祤宁的关系一直很差，甚至到了水火不容的地步。\n好事者们纷纷拿出手机往外递消息。\n拍卖会已经开始，但今晚大家的关注显然已经偏离重点。\n眼下两人同时出现在拍卖活动现场，视对方为空气，连招呼都不打一声的姿态也间接坐实了彼此不和的消息。",
            typos: [
                { start: 15, end: 16, incorrect: "坊", correct: "房" },
                { start: 115, end: 116, incorrect: "间", correct: "见" }
            ],
            difficulty: "medium"
        }
    ],
    tasks: []
};