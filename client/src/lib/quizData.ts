/**
 * 《你的生活密碼》問卷數據
 * 設計風格：去功能化 × 加入內心戲 × 台灣口語化
 * 四型名稱：家庭防線型 × 邊界能量型 × 可能性試驗型 × 系統累積型
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
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '一個普通的早上，你最先想到什麼？',
    options: [
      { type: 'guardian', text: '家裡有沒有什麼需要我的' },
      { type: 'balancer', text: '今天要怎麼安排才不會太亂' },
      { type: 'explorer', text: '今天會有什麼新的可能' },
      { type: 'builder', text: '今天要推進什麼重要的事' },
    ],
  },
  {
    id: 2,
    question: '生活節奏被打亂時，你的感受是？',
    options: [
      { type: 'guardian', text: '計畫總是被打亂，久了有點心累' },
      { type: 'balancer', text: '忙了一整天，卻說不出今天留下了什麼' },
      { type: 'explorer', text: '反正計畫也趕不上變化，隨遇而安' },
      { type: 'builder', text: '被打亂很煩，但要想辦法找回節奏' },
    ],
  },
  {
    id: 3,
    question: '看到家人不開心時，你會？',
    options: [
      { type: 'guardian', text: '想辦法讓他們開心，這是我的責任' },
      { type: 'balancer', text: '陪著他們，但也要照顧自己的情緒' },
      { type: 'explorer', text: '聽他們說，給一些新的角度' },
      { type: 'builder', text: '分析問題，提出解決方案' },
    ],
  },
  {
    id: 4,
    question: '在家裡，你扮演什麼角色？',
    options: [
      { type: 'guardian', text: '習慣替全家多想一步的人' },
      { type: 'balancer', text: '調和家裡的氣氛，讓大家都舒服' },
      { type: 'explorer', text: '帶進新想法和新話題' },
      { type: 'builder', text: '生活講究派，家裡用什麼我都很在意' },
    ],
  },
  {
    id: 5,
    question: '和朋友相處，你最看重什麼？',
    options: [
      { type: 'guardian', text: '能陪他們度過困難的時刻' },
      { type: 'balancer', text: '有舒服的相處節奏，不用太費力' },
      { type: 'explorer', text: '有新話題，一起探索新東西' },
      { type: 'builder', text: '能互相成長，一起往前走' },
    ],
  },
  {
    id: 6,
    question: '天氣不好時，你的心情會？',
    options: [
      { type: 'guardian', text: '心情不太好，但事情還是會做完' },
      { type: 'balancer', text: '跟著天氣一起低落，需要時間調整' },
      { type: 'explorer', text: '無所謂，反正也改變不了' },
      { type: 'builder', text: '有點煩，但不會影響計畫' },
    ],
  },
  {
    id: 7,
    question: '感到疲憊時，你最需要什麼？',
    options: [
      { type: 'guardian', text: '有人陪，知道自己不是一個人' },
      { type: 'balancer', text: '真正的休息，而不是硬撐' },
      { type: 'explorer', text: '新的刺激，轉移注意力' },
      { type: 'builder', text: '一種對未來踏實的感覺' },
    ],
  },
  {
    id: 8,
    question: '面對突發狀況，你通常？',
    options: [
      { type: 'guardian', text: '先確保重要的人沒事' },
      { type: 'balancer', text: '停下來，深呼吸，再想辦法' },
      { type: 'explorer', text: '當下反應，邊走邊調整' },
      { type: 'builder', text: '快速評估，找最有效的解決方案' },
    ],
  },
  {
    id: 9,
    question: '工作上遇到挫折，你的第一反應是？',
    options: [
      { type: 'guardian', text: '會自責，覺得自己沒做好' },
      { type: 'balancer', text: '先消化情緒，再重新開始' },
      { type: 'explorer', text: '看看有沒有其他可能性' },
      { type: 'builder', text: '分析原因，改進方法' },
    ],
  },
  {
    id: 10,
    question: '如果有一天完全自由，你會？',
    options: [
      { type: 'guardian', text: '陪家人或幫助需要的人' },
      { type: 'balancer', text: '放空，讓自己真正休息' },
      { type: 'explorer', text: '去探索一個沒去過的地方' },
      { type: 'builder', text: '做一直想做但沒時間做的事' },
    ],
  },
  {
    id: 11,
    question: '面對改變時，你的態度是？',
    options: [
      { type: 'guardian', text: '擔心會不會影響現有的安定' },
      { type: 'balancer', text: '需要時間適應，但最後會接受' },
      { type: 'explorer', text: '興奮，想看看會發生什麼' },
      { type: 'builder', text: '評估利弊，決定要不要跟上' },
    ],
  },
  {
    id: 12,
    question: '在團隊裡，你通常是？',
    options: [
      { type: 'guardian', text: '照顧大家的人，確保沒人掉隊' },
      { type: 'balancer', text: '協調者，讓大家都能舒服地合作' },
      { type: 'explorer', text: '帶進新想法的人' },
      { type: 'builder', text: '推動進度的人，確保目標達成' },
    ],
  },
  {
    id: 13,
    question: '如果你有一個超能力，你希望是？',
    options: [
      { type: 'guardian', text: '治癒之手 - 讓重要的人安心' },
      { type: 'balancer', text: '絕對領域 - 一個誰都打擾不了的空間' },
      { type: 'explorer', text: '傳送門 - 去任何想去的地方' },
      { type: 'builder', text: '點石成金 - 付出的努力，都有回聲' },
    ],
  },
  {
    id: 14,
    question: '關於金錢，你最在乎的是？',
    options: [
      { type: 'guardian', text: '有足夠的安全感，能照顧家人' },
      { type: 'balancer', text: '夠用就好，不用太多但也不能太少' },
      { type: 'explorer', text: '能支持我去做想做的事' },
      { type: 'builder', text: '能看到增長，感受到進展' },
    ],
  },
  {
    id: 15,
    question: '在新環境裡，你會？',
    options: [
      { type: 'guardian', text: '先觀察，確認安全再行動' },
      { type: 'balancer', text: '慢慢適應，找到舒服的位置' },
      { type: 'explorer', text: '馬上去認識新的人和事' },
      { type: 'builder', text: '快速了解規則和邏輯' },
    ],
  },
  {
    id: 16,
    question: '你認為什麼是成功？',
    options: [
      { type: 'guardian', text: '重要的人都好好的，家庭穩定' },
      { type: 'balancer', text: '生活有節奏，每天都舒服' },
      { type: 'explorer', text: '有新的經驗和故事可以分享' },
      { type: 'builder', text: '看到自己一步步往上走' },
    ],
  },
  {
    id: 17,
    question: '面對忙碌，你的體會是？',
    options: [
      { type: 'guardian', text: '生活裡的變數太多，讓人很難真正放鬆' },
      { type: 'balancer', text: '沒做什麼重活，卻累在心裡' },
      { type: 'explorer', text: '忙碌也還好，至少不無聊' },
      { type: 'builder', text: '忙碌是因為有目標，這樣還好' },
    ],
  },
  {
    id: 18,
    question: '別人對你的評價，你在乎嗎？',
    options: [
      { type: 'guardian', text: '很在乎，希望大家都對我滿意' },
      { type: 'balancer', text: '有點在乎，但不會太受影響' },
      { type: 'explorer', text: '不太在乎，每個人想法都不同' },
      { type: 'builder', text: '只在乎有沒有達到目標' },
    ],
  },
  {
    id: 19,
    question: '當事情不如預期，你會？',
    options: [
      { type: 'guardian', text: '先確認沒有傷害到重要的人' },
      { type: 'balancer', text: '接受，然後慢慢調整' },
      { type: 'explorer', text: '看看有沒有其他可能的方向' },
      { type: 'builder', text: '找出問題，想辦法改善' },
    ],
  },
  {
    id: 20,
    question: '你對自己的期待是？',
    options: [
      { type: 'guardian', text: '能好好照顧身邊的人' },
      { type: 'balancer', text: '保持平衡，不要太累' },
      { type: 'explorer', text: '不斷學習，保持新鮮感' },
      { type: 'builder', text: '持續進步，達成目標' },
    ],
  },
  {
    id: 21,
    question: '起床時，你的第一個想法是？',
    options: [
      { type: 'guardian', text: '一醒來，就開始想家裡的事' },
      { type: 'balancer', text: '先躺一下，慢慢清醒' },
      { type: 'explorer', text: '今天會發生什麼呢' },
      { type: 'builder', text: '還沒下床，工作已經在腦中排隊' },
    ],
  },
  {
    id: 22,
    question: '面對選擇，你通常？',
    options: [
      { type: 'guardian', text: '考慮對家人的影響' },
      { type: 'balancer', text: '權衡各方面，找平衡點' },
      { type: 'explorer', text: '選擇更有趣的那個' },
      { type: 'builder', text: '選擇能往前走的那個' },
    ],
  },
  {
    id: 23,
    question: '你最害怕什麼？',
    options: [
      { type: 'guardian', text: '無法保護重要的人' },
      { type: 'balancer', text: '生活失去平衡，太混亂' },
      { type: 'explorer', text: '被困住，沒有新的可能' },
      { type: 'builder', text: '停滯不前，沒有進展' },
    ],
  },
  {
    id: 24,
    question: '看到別人成功時，你會？',
    options: [
      { type: 'guardian', text: '替他們開心，也想幫他們維持' },
      { type: 'balancer', text: '開心，但也想知道他們怎麼做到的' },
      { type: 'explorer', text: '羨慕，想試試看那條路' },
      { type: 'builder', text: '分析他們的方法，思考自己的策略' },
    ],
  },
  {
    id: 25,
    question: '面對壓力，你的紓解方式是？',
    options: [
      { type: 'guardian', text: '找人陪，或幫助別人' },
      { type: 'balancer', text: '放空，讓自己放鬆' },
      { type: 'explorer', text: '去做新的事，轉移注意力' },
      { type: 'builder', text: '運動或工作，把能量轉化' },
    ],
  },
  {
    id: 26,
    question: '對於未來，你的想像是？',
    options: [
      { type: 'guardian', text: '希望能安穩地照顧好家人' },
      { type: 'balancer', text: '希望生活保持舒服的節奏' },
      { type: 'explorer', text: '充滿新的冒險和可能' },
      { type: 'builder', text: '一步步往上走，看到成長' },
    ],
  },
  {
    id: 27,
    question: '在關係中，你最看重什麼？',
    options: [
      { type: 'guardian', text: '被需要，能為對方做點什麼' },
      { type: 'balancer', text: '相處舒服，互相尊重' },
      { type: 'explorer', text: '有新鮮感，一起去探索' },
      { type: 'builder', text: '一起成長，互相支持目標' },
    ],
  },
  {
    id: 28,
    question: '當有人需要幫助時，你會？',
    options: [
      { type: 'guardian', text: '馬上出手，這是我應該做的' },
      { type: 'balancer', text: '幫忙，但也要評估自己的狀況' },
      { type: 'explorer', text: '如果有時間就幫，沒時間就算' },
      { type: 'builder', text: '幫忙，但也會教他們怎麼自己解決' },
    ],
  },
  {
    id: 29,
    question: '你更想把時間累積成什麼？',
    options: [
      { type: 'guardian', text: '能留給家人的安心' },
      { type: 'balancer', text: '一套穩定運轉的生活節奏' },
      { type: 'explorer', text: '豐富的經驗和故事' },
      { type: 'builder', text: '智慧與歷練' },
    ],
  },
  {
    id: 30,
    question: '面對失敗，你會？',
    options: [
      { type: 'guardian', text: '自責，覺得讓別人失望了' },
      { type: 'balancer', text: '難受，但會慢慢走出來' },
      { type: 'explorer', text: '沒關係，下次再試' },
      { type: 'builder', text: '分析原因，準備下一次' },
    ],
  },
  {
    id: 31,
    question: '你認為生活的意義是？',
    options: [
      { type: 'guardian', text: '照顧好重要的人，家庭幸福' },
      { type: 'balancer', text: '每天都舒服，有節奏地過' },
      { type: 'explorer', text: '不斷發現新的東西，保持好奇' },
      { type: 'builder', text: '持續成長，達成想要的' },
    ],
  },
  {
    id: 32,
    question: '在人生的十字路口，你會？',
    options: [
      { type: 'guardian', text: '考慮家人的想法和需要' },
      { type: 'balancer', text: '權衡各方面，找最平衡的' },
      { type: 'explorer', text: '選擇更有趣的那條路' },
      { type: 'builder', text: '選擇能往上走的那條路' },
    ],
  },
  {
    id: 33,
    question: '你最希望被人記得什麼？',
    options: [
      { type: 'guardian', text: '是個可靠的人，能依靠' },
      { type: 'balancer', text: '是個舒服的人，好相處' },
      { type: 'explorer', text: '是個有趣的人，充滿故事' },
      { type: 'builder', text: '是個有想法的人，能帶領' },
    ],
  },
  {
    id: 34,
    question: '五年後，你最希望自己成為什麼樣的人？',
    options: [
      { type: 'guardian', text: '被理解，也被支持' },
      { type: 'balancer', text: '保持內心的平靜和自在' },
      { type: 'explorer', text: '擁有更多的自由和可能' },
      { type: 'builder', text: '擁有選擇生活的自由' },
    ],
  },
];

export const LIFE_TYPES: Record<OperatingStyle, { name: string; displayName: string; color: string; accentColor: string }> = {
  guardian: {
    name: 'guardian',
    displayName: '家庭防線型',
    color: '#C9A876',
    accentColor: '#A0826D',
  },
  balancer: {
    name: 'balancer',
    displayName: '邊界能量型',
    color: '#7BA89F',
    accentColor: '#5F8B84',
  },
  explorer: {
    name: 'explorer',
    displayName: '可能性試驗型',
    color: '#D4A574',
    accentColor: '#B88A5C',
  },
  builder: {
    name: 'builder',
    displayName: '系統累積型',
    color: '#8B9D6F',
    accentColor: '#6B7D54',
  },
};

export function calculateLifeType(answers: Record<number, OperatingStyle>): OperatingStyle {
  const counts: Record<OperatingStyle, number> = {
    guardian: 0,
    balancer: 0,
    explorer: 0,
    builder: 0,
  };

  Object.values(answers).forEach((type) => {
    counts[type]++;
  });

  let maxType: OperatingStyle = 'guardian';
  let maxCount = 0;

  Object.entries(counts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxType = type as OperatingStyle;
    }
  });

  return maxType;
}
