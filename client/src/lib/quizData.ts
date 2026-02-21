/**
 * 時光整理所問卷數據 v2
 * 設計風格：生活感 × 幽默 × 去評判 × 難以看穿
 * 四型映射：
 *   guardian  = 時光整理師（理順自己）
 *   balancer  = 能量建築師（理順關係）
 *   explorer  = 生命航行引水人（理順世界）
 *   builder   = 秩序累積者（理順未來）
 *
 * 每題 ABCD 對應的型態刻意打亂，避免被看穿
 */

export type OperatingStyle = 'guardian' | 'balancer' | 'explorer' | 'builder';

export interface QuizOption {
  type: OperatingStyle;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  weighted?: boolean;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '當你關上家門的那一刻，你的靈魂會...',
    options: [
      { type: 'guardian', text: '原地消失 🫠（兩分鐘內請當我不在地球上）' },
      { type: 'balancer', text: '找人取暖 📱（確認大家平安到家了嗎？）' },
      { type: 'explorer', text: '邊收邊罵 🧺（襪子在那邊我真的看不下去！）' },
      { type: 'builder',  text: 'CPU 過熱 📈（腦袋還在跑明天的 Excel...）' },
    ],
  },
  {
    id: 2,
    question: '進家門看到家人的瞬間，你的第一反應是？',
    weighted: true,
    options: [
      { type: 'balancer', text: '情感偵測 📡（看臉色模式啟動，先湊過去蹭蹭？）' },
      { type: 'builder',  text: '劇本預演 🎞️（這幕好熟悉，接下來 10 年大概也這樣過。）' },
      { type: 'guardian', text: '電量顯示 🪫（正在跑關機程序，請勿與我對話。）' },
      { type: 'explorer', text: '環境稽查 🔍（那個碗、那個灰塵...我的手在發抖！）' },
    ],
  },
  {
    id: 3,
    question: '壓力大到快滅頂時，你的身體會先發出什麼警告？',
    options: [
      { type: 'explorer', text: '瘋狂勞動 🧹（洗碗洗出節奏感，家裡變乾淨心就安了。）' },
      { type: 'guardian', text: '全面斷電 🔌（誰也不准叫我，我只想原地登出。）' },
      { type: 'builder',  text: '腦內風暴 🌪️（CPU 轉到冒煙，試圖算出壓力的破解率。）' },
      { type: 'balancer', text: '隔離警報 ⚠️（負能量快溢出來了，危險分子請遠離！）' },
    ],
  },
  {
    id: 4,
    question: '突然焦慮到坐立難安？哪一帖藥對你最有效？',
    options: [
      { type: 'builder',  text: '劇本校對 📅（翻開行事曆：都在掌控中，虛驚一場。）' },
      { type: 'guardian', text: '躺平口訣 🛋️（大聲唸：今天廢一點真的沒關係！）' },
      { type: 'balancer', text: '友誼萬歲 ☎️（找人噴垃圾話，聽到「我懂」立馬回血。）' },
      { type: 'explorer', text: '視覺清單 ✅（把焦慮寫下來再劃掉，成就感治百病。）' },
    ],
  },
  {
    id: 5,
    question: '當你崩潰喊出「我想回家」時，你真正渴望的是？',
    weighted: true,
    options: [
      { type: 'explorer', text: '視覺排毒 ✨（東西都在該在的位置，世界終於安靜了。）' },
      { type: 'guardian', text: '靈魂卸妝 👺（撕掉社會面具，當一坨軟爛的有機物。）' },
      { type: 'builder',  text: '安全軌道 🛤️（熟悉的節奏最美，不用擔心人生出軌。）' },
      { type: 'balancer', text: '歸屬雷達 🏠（有人迎接、有人接納，我的心不是孤島。）' },
    ],
  },
  {
    id: 6,
    question: '昨晚又在床上翻來覆去？通常讓你失眠的元兇是？',
    options: [
      { type: 'balancer', text: '社交後遺症 💬（白天那句玩笑，我是不是說錯話了？）' },
      { type: 'builder',  text: '腦內小劇場 🎬（明天要演的劇本，現在已經排練到第三場。）' },
      { type: 'guardian', text: '身體沒斷電 🔋（明明很累，神經卻還在跳迪斯可。）' },
      { type: 'explorer', text: '感官太敏銳 👁️（枕頭歪 1 度、冷氣聲太吵，全世界都在煩我！）' },
    ],
  },
  {
    id: 7,
    question: '閉上眼想像「理想的家」，你第一個看到的畫面是？',
    weighted: true,
    options: [
      { type: 'builder',  text: '高效指揮中心 🛰️（生活按部就班，一切都在精準規律中。）' },
      { type: 'explorer', text: '樣品屋範本 ✨（極簡、無雜物、視覺舒適度 100 分。）' },
      { type: 'balancer', text: '大型取暖現場 🫂（大家都在，抬頭就能對到溫暖眼神。）' },
      { type: 'guardian', text: '私人避難所 🕯️（一個聽得到呼吸聲、沒人打擾的角落。）' },
    ],
  },
  {
    id: 8,
    question: '忙到快往生時，你絕對不能被犧牲的「底線」是？',
    options: [
      { type: 'explorer', text: '生活基本尊嚴 🧹（家裡變垃圾堆我會瘋掉，環境不能亂！）' },
      { type: 'guardian', text: '發呆權力 😶‍🌫️（每天必須有「原地登出」的空白時段。）' },
      { type: 'builder',  text: '我的升級進度 📈（不想瞎忙，我要看到自己正在變強。）' },
      { type: 'balancer', text: '人類的溫存 ❤️（再忙也要跟喜歡的人好好講到話。）' },
    ],
  },
  {
    id: 9,
    question: '突發狀況發生！（如打破東西、趕不上車）你的本能反應是？',
    weighted: true,
    options: [
      { type: 'balancer', text: '先管別人 🙋（馬上看旁邊：「你還好嗎？嚇到了嗎？」）' },
      { type: 'guardian', text: '自我觀測 🧘（先停下 3 秒，感受一下心跳跟情緒。）' },
      { type: 'builder',  text: '計算後果 🧮（這件事會影響接下來幾點？該怎麼收尾？）' },
      { type: 'explorer', text: '身體先動 🛠️（抹布在哪？路線怎麼改？手比腦快！）' },
    ],
  },
  {
    id: 10,
    question: '面對全新的大挑戰，你心裡的獨白通常是？',
    options: [
      { type: 'guardian', text: '先穩住靈魂 🌬️（沒事，不知道也沒關係，先呼吸。）' },
      { type: 'explorer', text: '拆解怪獸 ⚔️（看起來很大，拆成小零件一個一個解決。）' },
      { type: 'balancer', text: '誰跟我一隊？🤝（我不孤單吧？找人一起面對比較安心。）' },
      { type: 'builder',  text: '調閱資料庫 📚（根據過往經驗，這題大概有三種解法。）' },
    ],
  },
  {
    id: 11,
    question: '鬧鐘響起的那一刻，你的「開機程序」通常是？',
    options: [
      { type: 'builder',  text: '跑馬燈預演 🖥️（眼皮還沒張開，今日行程表已跑完一遍。）' },
      { type: 'explorer', text: '軍事行動 💂（彈起、刷牙、出門，一秒都不拖延。）' },
      { type: 'balancer', text: '忍者模式 🥷（輕手輕腳，絕對不能吵醒枕邊人。）' },
      { type: 'guardian', text: '電量偵測 💤（賴床 5 分鐘，確認靈魂有沒有回填。）' },
    ],
  },
  {
    id: 12,
    question: '終於放假了！把時間「浪費」在哪裡你最心甘情願？',
    weighted: true,
    options: [
      { type: 'guardian', text: '身體維修 💆（按摩、睡死、發呆，修復度 100%。）' },
      { type: 'explorer', text: '空間排毒 🧹（大掃除、斷捨離，看著家裡變亮就爽。）' },
      { type: 'builder',  text: '自我升級 🆙（看書、上課，投資明天的自己不手軟。）' },
      { type: 'balancer', text: '情緒充電 🔋（跟喜歡的人講一整天廢話，超療癒。）' },
    ],
  },
  {
    id: 13,
    question: '現在、立刻、此時此刻！你腦袋裡佔比最大的是？',
    options: [
      { type: 'balancer', text: '關懷雷達 🛰️（某某某現在在幹嘛？他今天還好嗎？）' },
      { type: 'builder',  text: '下一步清單 ⚙️（測驗做完後，我接下來要幹嘛？）' },
      { type: 'guardian', text: '自我體感 🌊（我現在舒服嗎？情緒有沒有卡住？）' },
      { type: 'explorer', text: '五感稽查 ☕（咖啡的味道、椅子的硬度、室溫剛好嗎？）' },
    ],
  },
  {
    id: 14,
    question: '對你來說，所謂「高品質的獨處」是什麼樣子？',
    options: [
      { type: 'explorer', text: '物歸原位 🧘（專心整理衣櫃，心靈也跟著變整齊了。）' },
      { type: 'builder',  text: '航向校對 ⚓（拿著筆記本，規劃接下來的人生地圖。）' },
      { type: 'guardian', text: '靈魂洗澡 🛀（斷網、靜音，純粹地跟自己對話。）' },
      { type: 'balancer', text: '溫馨回甘 🧣（一個人待著，但心裡回味著剛才的聚會。）' },
    ],
  },
  {
    id: 15,
    question: '回顧目前為止的人生，你覺得自己最多的精力都花在？',
    options: [
      { type: 'builder',  text: '升級闖關 🏆（為了變強而奔跑，追求那個更好的版本。）' },
      { type: 'guardian', text: '挖掘自我 🕵️（搞清楚自己是誰，照顧那顆敏感的心。）' },
      { type: 'balancer', text: '織網維護 🕸️（經營各種關係，當大家最強的後盾。）' },
      { type: 'explorer', text: '生活精算 🧺（確保食衣住行都在最舒適的軌道上。）' },
    ],
  },
  {
    id: 16,
    question: '接到新挑戰時，你決定「要不要接」的終極標準是？',
    options: [
      { type: 'guardian', text: '內耗檢測 🔋（這件事會讓我心累嗎？我的電量夠燒嗎？）' },
      { type: 'builder',  text: '投資回報 📈（對我的目標有意義嗎？值得花時間嗎？）' },
      { type: 'balancer', text: '隊友特質 👯（誰跟我一起做？我能幫上誰的忙？）' },
      { type: 'explorer', text: '資源掃描 🛠️（具體怎麼執行？SOP 和資源夠清楚嗎？）' },
    ],
  },
  {
    id: 17,
    question: '若要選一個「絕對不能踩」的地雷區，那會是？',
    options: [
      { type: 'balancer', text: '信任崩壞 💔（背叛與誤解，是我們關係的終點站。）' },
      { type: 'explorer', text: '失控混亂 🌪️（隨意破壞我建立好的生活秩序，我會瘋掉。）' },
      { type: 'builder',  text: '路障干擾 🚧（打亂我專注前進的節奏，請保持距離。）' },
      { type: 'guardian', text: '情勒退散 🚫（強迫我忽視自己的感受，我會原地消失。）' },
    ],
  },
  {
    id: 18,
    question: '在你要「拯救世界（照顧別人）」之前，必做的確認是？',
    weighted: true,
    options: [
      { type: 'explorer', text: '地基檢查 🏗️（我的生活穩嗎？別為了救人自己先溺水。）' },
      { type: 'builder',  text: '脫軌風險 🛤️（這份熱心，會不會讓我偏離原本的航道？）' },
      { type: 'guardian', text: '杯水理論 🥛（我自己的杯子滿了嗎？還有餘裕給愛嗎？）' },
      { type: 'balancer', text: '需求對焦 🎯（這真的是對方要的嗎？還是我一廂情願？）' },
    ],
  },
  {
    id: 19,
    question: '你心目中定義的「真正的自由」，最接近哪種畫面？',
    options: [
      { type: 'balancer', text: '安全降落 ⚓（能毫無保留地愛與被愛，心中沒有恐懼。）' },
      { type: 'guardian', text: '靈魂裸奔 🦄（不用討好任何人，純粹做自己喜歡的樣子。）' },
      { type: 'builder',  text: '選擇特權 🎟️（有權拒絕不想要的路，堅定走向我的未來。）' },
      { type: 'explorer', text: '空間主權 🏰（對環境有絕對掌控權，我想怎麼擺就怎麼擺。）' },
    ],
  },
  {
    id: 20,
    question: '當你覺得最近「日子過得很順」，通常是因為？',
    options: [
      { type: 'builder',  text: '進度超前 🚀（每天都在進步，離目標又近了幾公分。）' },
      { type: 'explorer', text: '生活妥帖 🍱（家裡乾淨、雜事搞定，一切都在掌握中。）' },
      { type: 'guardian', text: '身心合一 🌊（情緒穩定，我能精準聽見身體的聲音。）' },
      { type: 'balancer', text: '人和政通 🤝（跟身邊的人溝通超順，到處都是愛。）' },
    ],
  },
  {
    id: 21,
    question: '最後一題！選一句話送給努力到現在的自己：',
    weighted: true,
    options: [
      { type: 'balancer', text: '愛與連結，是生命中最滋養的養分。❤️' },
      { type: 'builder',  text: '我不著急，因為我知道每一步都走在對的路上。🗺️' },
      { type: 'guardian', text: '懂自己，接納自己，這樣就已經足夠好了。✨' },
      { type: 'explorer', text: '我有能力把混亂變有序，創造我的舒適圈。🧹' },
    ],
  },
];

export const LIFE_TYPES: Record<OperatingStyle, {
  name: string;
  displayName: string;
  roleTitle: string;
  color: string;
  accentColor: string;
}> = {
  guardian: {
    name: 'guardian',
    displayName: '時光整理師',
    roleTitle: '把散落的碎片，放回它本來的位置',
    color: '#C9A876',
    accentColor: '#A0826D',
  },
  balancer: {
    name: 'balancer',
    displayName: '能量建築師',
    roleTitle: '先清出呼吸的空間，再談下一步的結構',
    color: '#7BA89F',
    accentColor: '#5F8B84',
  },
  explorer: {
    name: 'explorer',
    displayName: '生命航行引水人',
    roleTitle: '迷路也是一種抵達，願意就有路可走',
    color: '#D4A574',
    accentColor: '#B88A5C',
  },
  builder: {
    name: 'builder',
    displayName: '秩序累積者',
    roleTitle: '緩慢但篤定，每一步都在為未來鋪路',
    color: '#8B9D6F',
    accentColor: '#6B7D54',
  },
};

// 加權題 IDs
export const WEIGHTED_QUESTIONS = [2, 5, 7, 9, 12, 18, 21];

export function calculateLifeType(answers: Record<number, OperatingStyle>): {
  primary: OperatingStyle;
  secondary: OperatingStyle;
  confidence: number;
  isMixed: boolean;
} {
  const counts: Record<OperatingStyle, number> = {
    guardian: 0,
    balancer: 0,
    explorer: 0,
    builder: 0,
  };

  // 計算分數（加權題得 2 分）
  Object.entries(answers).forEach(([id, type]) => {
    const score = WEIGHTED_QUESTIONS.includes(Number(id)) ? 2 : 1;
    counts[type] += score;
  });

  // 排序
  const sorted = (Object.entries(counts) as [OperatingStyle, number][])
    .sort((a, b) => b[1] - a[1]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const primary = sorted[0][0];
  const secondary = sorted[1][0];
  const confidence = total > 0 ? (sorted[0][1] - sorted[1][1]) / total : 0;

  return {
    primary,
    secondary,
    confidence,
    isMixed: confidence < 0.12,
  };
}
