/**
 * 《我的生活秘密》問卷數據
 * 設計風格：身體動作識別 × 去評判 × 能量型態校準
 * 四型映射：
 *   guardian  = 投射者能量（靠近、等待、保護）
 *   balancer  = 生產者能量（回應、跟進、投入）
 *   explorer  = 顯示者能量（發起、推進、率先）
 *   builder   = 反映者能量（感知、觀察、調整）
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
    question: '推開家門的那一刻',
    options: [
      { type: 'guardian', text: '靠近但沒進，眼睛先看向別人' },
      { type: 'balancer', text: '推開門，踏進去' },
      { type: 'explorer', text: '用力推門，大步走進' },
      { type: 'builder', text: '輕輕推，停頓感受一下環境' },
    ],
  },
  {
    id: 2,
    question: '在家裡遇見家人時',
    options: [
      { type: 'guardian', text: '目光集中在說話者，身體朝向他人' },
      { type: 'balancer', text: '點頭同意，跟進對話' },
      { type: 'explorer', text: '率先說話，帶頭講' },
      { type: 'builder', text: '靜靜觀察，感知他們的狀態' },
    ],
  },
  {
    id: 3,
    question: '當壓力浮起來的時候',
    options: [
      { type: 'guardian', text: '停下來，坐著休息' },
      { type: 'balancer', text: '動起來，做點什麼' },
      { type: 'explorer', text: '直接改變，推進行動' },
      { type: 'builder', text: '深呼吸，調整心態' },
    ],
  },
  {
    id: 4,
    question: '焦慮在身上蔓延時',
    options: [
      { type: 'guardian', text: '眼神尋求回應，停頓等答覆' },
      { type: 'balancer', text: '跟進，投入做事' },
      { type: 'explorer', text: '果決決定，直接行動' },
      { type: 'builder', text: '靜待，觀察自己的感受' },
    ],
  },
  {
    id: 5,
    question: '在家慢慢放鬆身體時',
    options: [
      { type: 'guardian', text: '安靜地停留，坐著休息' },
      { type: 'balancer', text: '一邊做事一邊放鬆' },
      { type: 'explorer', text: '自己調整方式，不等別人' },
      { type: 'builder', text: '調整位置，尋找最舒服的地方' },
    ],
  },
  {
    id: 6,
    question: '輾轉反側的夜裡',
    options: [
      { type: 'guardian', text: '躺著，蜷縮' },
      { type: 'balancer', text: '翻身，動來動去' },
      { type: 'explorer', text: '起身，改變環境' },
      { type: 'builder', text: '調整姿態，感知舒適度' },
    ],
  },
  {
    id: 7,
    question: '在家重複做著什麼時',
    options: [
      { type: 'guardian', text: '跟著對方步調走，間歇性活動' },
      { type: 'balancer', text: '循環做，一直做，完成' },
      { type: 'explorer', text: '照自己的方式做' },
      { type: 'builder', text: '適應節奏，隨著環境變化' },
    ],
  },
  {
    id: 8,
    question: '在忙碌裡，你會先',
    options: [
      { type: 'guardian', text: '停頓等答覆，看著對方反應' },
      { type: 'balancer', text: '馬上做，動起來' },
      { type: 'explorer', text: '直接決定，率先行動' },
      { type: 'builder', text: '觀察，靜待看情況' },
    ],
  },
  {
    id: 9,
    question: '突然發生的時刻',
    options: [
      { type: 'guardian', text: '停下來，眼睛看向別人' },
      { type: 'balancer', text: '馬上回應，跟進' },
      { type: 'explorer', text: '果決行動，直接推進' },
      { type: 'builder', text: '靜靜感知，調整反應' },
    ],
  },
  {
    id: 10,
    question: '不知道接下來的時候',
    options: [
      { type: 'guardian', text: '靠近確認，眼神尋求回應' },
      { type: 'balancer', text: '回應著走，跟著做' },
      { type: 'explorer', text: '自己決定，不等待' },
      { type: 'builder', text: '靜待，深呼吸，慢慢來' },
    ],
  },
  {
    id: 11,
    question: '鬧鐘響起的那一刻',
    options: [
      { type: 'guardian', text: '停下來，慢下來' },
      { type: 'balancer', text: '起身，馬上動' },
      { type: 'explorer', text: '直接起身，快速行動' },
      { type: 'builder', text: '深呼吸，調整自己再起' },
    ],
  },
  {
    id: 12,
    question: '踏進家門的瞬間',
    options: [
      { type: 'guardian', text: '眼睛掃過房間，視線跟著人走' },
      { type: 'balancer', text: '跟進，回應環境' },
      { type: 'explorer', text: '用力踏進，帶著態度' },
      { type: 'builder', text: '靜靜感知，調整位置' },
    ],
  },
  {
    id: 13,
    question: '坐下來的時刻',
    options: [
      { type: 'guardian', text: '安靜地停留，點頭' },
      { type: 'balancer', text: '坐著準備做事' },
      { type: 'explorer', text: '坐下決定事情' },
      { type: 'builder', text: '調整姿態，感受環境' },
    ],
  },
  {
    id: 14,
    question: '獨自在家時',
    options: [
      { type: 'guardian', text: '坐在角落，保持距離看' },
      { type: 'balancer', text: '做著什麼，投入' },
      { type: 'explorer', text: '自己安排，照意思行動' },
      { type: 'builder', text: '適應空間，觀察細節' },
    ],
  },
  {
    id: 15,
    question: '一天的時間裡，你在做',
    options: [
      { type: 'guardian', text: '間歇性活動，停下休息' },
      { type: 'balancer', text: '循環做，一直做，投入' },
      { type: 'explorer', text: '照自己規劃，推進' },
      { type: 'builder', text: '隨著變化調整，適應' },
    ],
  },
  {
    id: 16,
    question: '碰上新事情時',
    options: [
      { type: 'guardian', text: '停下來，眼睛看向別人' },
      { type: 'balancer', text: '馬上跟進，回應' },
      { type: 'explorer', text: '率先出手，帶頭改變' },
      { type: 'builder', text: '靜靜觀察，感知後適應' },
    ],
  },
  {
    id: 17,
    question: '身體很累的時候',
    options: [
      { type: 'guardian', text: '無力地坐著，躺著' },
      { type: 'balancer', text: '還是動著，堅持做' },
      { type: 'explorer', text: '直接休息，不妥協' },
      { type: 'builder', text: '調整休息，感知身體' },
    ],
  },
  {
    id: 18,
    question: '要陪伴別人之前',
    options: [
      { type: 'guardian', text: '靠近對方，看著對方反應' },
      { type: 'balancer', text: '點頭同意，準備跟進' },
      { type: 'explorer', text: '直接說，告知狀態' },
      { type: 'builder', text: '靜靜感受，觀察對方需求' },
    ],
  },
  {
    id: 19,
    question: '可以自己決定時',
    options: [
      { type: 'guardian', text: '眼神尋求回應，停頓等待' },
      { type: 'balancer', text: '回應內在，跟著做' },
      { type: 'explorer', text: '果決決定，說了算' },
      { type: 'builder', text: '靜待，慢慢感受，自然展開' },
    ],
  },
  {
    id: 20,
    question: '每次做某個動作時',
    options: [
      { type: 'guardian', text: '頭輕輕轉向，視線跟著' },
      { type: 'balancer', text: '持續做，循環做，完成' },
      { type: 'explorer', text: '按自己方式做' },
      { type: 'builder', text: '感受每次，隨著調整' },
    ],
  },
  {
    id: 21,
    question: '睡前',
    options: [
      { type: 'guardian', text: '蜷縮，躺著' },
      { type: 'balancer', text: '做完該做的，才睡' },
      { type: 'explorer', text: '自己決定睡眠時間' },
      { type: 'builder', text: '調整舒適，感受放鬆' },
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
