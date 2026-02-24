/**
 * 《你的生活密碼》結果頁文案
 * 設計風格：入戲落地 × 心理安全 × 分享誘因
 */

import { OperatingStyle } from './quizData';

export interface ResultContent {
  title: string;
  subtitle: string;
  introduction: string;
  selfAwareness: string;
  tips: Array<{
    title: string;
    description: string;
    timeframe: string;
  }>;
  sharingPrompt: string;
  shareText: string;
  nextSteps: string;
}

export const RESULT_CONTENTS: Record<OperatingStyle, ResultContent> = {
  guardian: {
    title: '你的生活運作方式是 家庭防線型',
    subtitle: '你不是多慮。你只是比別人早一步看到風險。',
    introduction:
      '很多人覺得你想太多。但其實，是你在幫整個家想得更遠。\n\n你大概會：\n出門前確認家人有沒有帶水\n用產品前會看成分\n看到新聞會想，這會影響我們嗎\n花錢時心裡會問，這樣安全嗎\n\n如果這些畫面讓你點頭，這型很準。',
    selfAwareness:
      '你其實很少真正放鬆。因為你的腦中總有一道防線在運作。\n\n但別忘了，守護別人之前，你也值得被守護。\n\n內心語錄：安心，比便宜重要。',
    tips: [
      {
        title: '挑一樣家人天天用的東西，重新檢視一次',
        description: '也許你會發現有更好的選擇，也許會確認現在的選擇是對的。要點是：你的用心會被看見。',
        timeframe: '今天',
      },
      {
        title: '寫下你對安心生活的三個標準',
        description: '這不是清單，是提醒。提醒自己什麼是真正重要的，什麼可以放下。',
        timeframe: '這週',
      },
      {
        title: '想想，有沒有更聰明的方式守護，而不是更辛苦',
        description: '守護不一定要累。有時候，教會家人自己守護自己，才是最聰明的守護。',
        timeframe: '這個月',
      },
    ],
    sharingPrompt: '接下來三天，觀察你做選擇時，內心跳出的那句話。\n\n當你再次聽見那句話，你就會知道，這不是測驗。是你。',
    shareText: '我是家庭防線型，你呢？',
    nextSteps:
      '我們整理了一份更聰明的家庭防線清單，幫你守護得更輕鬆。點開看看。',
  },

  balancer: {
    title: '你的生活運作方式是 邊界能量型',
    subtitle: '你很清楚一件事：狀態不好，什麼都做不好。',
    introduction:
      '你可能會：\n需要獨處時間才能恢復\n很在意產品的質感和舒服度\n一天中一定要有安靜時刻\n對消耗你能量的人特別敏感\n\n這些都不是自私。這是你對自己的了解。',
    selfAwareness:
      '你不是自私。你只是知道，沒有能量，就沒有長期。\n\n當你照顧好自己的邊界，你才能真正陪伴別人。\n\n內心語錄：狀態不好，什麼都不重要。',
    tips: [
      {
        title: '給自己 20 分鐘完全不被打擾的時間',
        description: '不用做什麼，就是讓自己靜一靜。這 20 分鐘會決定接下來的 24 小時。',
        timeframe: '今天',
      },
      {
        title: '檢查三樣每天接觸的東西，它們有讓你舒服嗎',
        description: '床單、杯子、手機殼，這些小東西累積起來，決定了你的日常舒服度。',
        timeframe: '這週',
      },
      {
        title: '思考：什麼消費是真正幫你恢復，而不是消耗',
        description: '有時候花錢在舒服上，比省錢更划算。因為舒服的人，才能做出更好的決定。',
        timeframe: '這個月',
      },
    ],
    sharingPrompt: '接下來三天，觀察你做選擇時，內心跳出的那句話。\n\n當你再次聽見那句話，你就會知道，這不是測驗。是你。',
    shareText: '我是邊界能量型，你是哪型？',
    nextSteps:
      '我們準備了一份能量邊界的生活調整指南，陪你找到最舒服的節奏。點開看看。',
  },

  explorer: {
    title: '你的生活運作方式是 可能性試驗型',
    subtitle: '你不喜歡被困住。你相信：很多事情，不試怎麼知道？',
    introduction:
      '你可能會：\n對新東西充滿好奇\n願意小規模嘗試\n喜歡聽別人怎麼做\n對或許可以更好特別有感\n\n你的人生，就是一場溫和的實驗。',
    selfAwareness:
      '你害怕的不是失敗。是停滯。\n\n那些試試看的小決定，累積起來就是你的人生。\n\n內心語錄：先試試看。',
    tips: [
      {
        title: '試一件你猶豫很久的小改變',
        description: '不用大改變，一個小東西就好。看看會發生什麼。',
        timeframe: '今天',
      },
      {
        title: '觀察：哪個消費其實可以有不同玩法',
        description: '你習慣的方式不一定是最好的。有時候換個角度，會發現新的可能。',
        timeframe: '這週',
      },
      {
        title: '想一想，有沒有機會把體驗變成價值',
        description: '你試過的東西，別人也想知道。你的故事，可能正好幫助別人。',
        timeframe: '這個月',
      },
    ],
    sharingPrompt: '接下來三天，觀察你做選擇時，內心跳出的那句話。\n\n當你再次聽見那句話，你就會知道，這不是測驗。是你。',
    shareText: '我是可能性試驗型，你是？',
    nextSteps:
      '我們整理了一些低風險的入門提案，適合你這種喜歡試試看的人。點開看看。',
  },

  builder: {
    title: '你的生活運作方式是 系統累積型',
    subtitle: '你看事情，很少只看現在。你習慣問：這能不能長期？',
    introduction:
      '你可能會：\n計算長期效益\n思考多元收入\n喜歡流程清楚的模式\n對複利有直覺感\n\n你的人生，是一場長期的佈局。',
    selfAwareness:
      '你真正想要的不是快。是穩。\n\n那些看起來慢的選擇，其實是在為未來鋪路。\n\n內心語錄：能不能變成長期？',
    tips: [
      {
        title: '算一次你每月固定支出的總額',
        description: '知道自己的基數，才能規劃。這不是為了省錢，是為了更清楚。',
        timeframe: '今天',
      },
      {
        title: '想想哪些支出其實是資源',
        description: '有些錢花出去，會帶回更多。區分消費和投資，改變整個人生軌跡。',
        timeframe: '這週',
      },
      {
        title: '研究一種能讓時間幫你工作的方式',
        description: '複利的力量就在這裡。一個小系統，十年後會變成什麼樣子？',
        timeframe: '這個月',
      },
    ],
    sharingPrompt: '接下來三天，觀察你做選擇時，內心跳出的那句話。\n\n當你再次聽見那句話，你就會知道，這不是測驗。是你。',
    shareText: '我是系統累積型，你是哪一型？',
    nextSteps:
      '我們整理了一份長期佈局的思考清單，幫你把生活變成可累積的系統。點開看看。',
  },
};
