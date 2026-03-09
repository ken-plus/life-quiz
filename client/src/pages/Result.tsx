/*
 * 時光整理所 結果頁面
 * 簡化版：靜態品牌圖卡 + 原生長按/右鍵儲存
 * 結構：第一頁（結果介紹） / 第二頁（三步行動 + 圖卡 + Line OA）
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { calculateLifeType, OperatingStyle } from '@/lib/quizData';
import { RESULT_CONTENTS } from '@/lib/resultContent';
import { useLocation, useSearch } from 'wouter';
import { ArrowLeft, ChevronRight, ChevronLeft, Download, Share2 } from 'lucide-react';

// 類型視覺配置
const typeConfig: Record<string, {
  zhName: string;
  enName: string;
  tagline: string;
  bg: string;
  accent: string;
  textColor: string;
  subColor: string;
  symbol: string;
  accentColor: string;
  color: string;
  cardImage: string;
}> = {
  guardian: {
    zhName: '時光整理師',
    enName: 'THE ORGANIZER',
    tagline: '溫柔守護 · 穩定核心',
    bg: '#EDE6DC',
    accent: '#A0826D',
    textColor: '#3D2E26',
    subColor: '#A0826D',
    symbol: '◎',
    accentColor: '#A0826D',
    color: '#A0826D',
    cardImage: '/share-card-guardian.png',
  },
  balancer: {
    zhName: '能量建築師',
    enName: 'THE ARCHITECT',
    tagline: '平衡協調 · 空間創造',
    bg: '#E8EEEB',
    accent: '#5F8B84',
    textColor: '#253430',
    subColor: '#5F8B84',
    symbol: '◆',
    accentColor: '#5F8B84',
    color: '#5F8B84',
    cardImage: '/share-card-balancer.png',
  },
  explorer: {
    zhName: '生命航行引水人',
    enName: 'THE NAVIGATOR',
    tagline: '好奇開放 · 新路先行',
    bg: '#EBE8E0',
    accent: '#B8956A',
    textColor: '#3D342E',
    subColor: '#B8956A',
    symbol: '◇',
    accentColor: '#B8956A',
    color: '#B8956A',
    cardImage: '/share-card-explorer.png',
  },
  builder: {
    zhName: '秩序累積者',
    enName: 'THE BUILDER',
    tagline: '系統思考 · 深度累積',
    bg: '#E9EAE5',
    accent: '#7A8F7E',
    textColor: '#2F3A32',
    subColor: '#7A8F7E',
    symbol: '■',
    accentColor: '#7A8F7E',
    color: '#7A8F7E',
    cardImage: '/share-card-builder.png',
  },
};

// Line OA 統一網址
const LINE_OA_URL = 'https://line.me/R/ti/p/@221kknol';

export default function Result() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [lifeType, setLifeType] = useState<OperatingStyle | null>(null);
  const [isMixed, setIsMixed] = useState(false);

  // 解析 URL 參數
  useEffect(() => {
    const params = new URLSearchParams(search);
    const answersStr = params.get('answers');
    if (!answersStr) {
      navigate('/');
      return;
    }

    try {
      const answers = JSON.parse(decodeURIComponent(answersStr));
      const result = calculateLifeType(answers);
      setLifeType(result.primary);
      setIsMixed(result.isMixed);
    } catch (error) {
      console.error('解析答案失敗:', error);
      navigate('/');
    }
  }, [search, navigate]);

  if (!lifeType) return null;

  const cfg = typeConfig[lifeType];
  const content = RESULT_CONTENTS[lifeType];

  // 下載圖卡
  const handleDownloadCard = async () => {
    try {
      const response = await fetch(cfg.cardImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `時光整理所-${cfg.zhName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // 備用方案：直接開啟圖片
      window.open(cfg.cardImage, '_blank');
    }
  };

  // 分享圖卡（使用 Web Share API，不支援則觸發下載）
  const handleShareCard = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(cfg.cardImage);
        const blob = await response.blob();
        const file = new File([blob], `時光整理所-${cfg.zhName}.png`, { type: 'image/png' });
        await navigator.share({
          title: `我是${cfg.zhName}`,
          text: content.shareText,
          files: [file],
        });
      } catch {
        // 使用者取消分享，不做處理
      }
    } else {
      handleDownloadCard();
    }
  };

  const handleGoToLineOA = () => {
    window.open(LINE_OA_URL, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> 返回首頁
          </Button>
        </div>

        {/* Page 1: 結果介紹 */}
        {currentPage === 1 && (
          <>
            <div className="mb-12">
              <div className="mb-12 p-8 rounded-lg" style={{ backgroundColor: cfg.bg }}>
                <div className="space-y-4">
                  <div style={{
                    fontSize: 48, color: cfg.accentColor,
                    marginBottom: 16,
                  }}>
                    {cfg.symbol}
                  </div>

                  <h1 style={{
                    fontSize: 56, fontWeight: 600,
                    color: cfg.textColor, letterSpacing: '0.08em',
                    lineHeight: 1.3, marginBottom: 16,
                  }}>
                    {cfg.zhName}
                  </h1>

                  <div style={{
                    fontSize: 16, color: cfg.subColor,
                    letterSpacing: '0.12em', opacity: 0.85,
                  }}>
                    {cfg.tagline}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h1 className="text-3xl font-bold text-foreground mb-2">{content.title}</h1>
              <p className="text-lg text-muted-foreground">{content.subtitle}</p>
              {isMixed && (
                <p className="text-sm text-muted-foreground mt-2 italic">
                  你的答案非常均衡，這個型態是最接近的傾向。
                </p>
              )}
            </div>

            <div className="mb-10">
              <Card className="p-8 border-border bg-card">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {content.introduction}
                </p>
              </Card>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-6">你的生活節奏與感受</h2>
              <Card className="p-8 border-border bg-card">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {content.selfAwareness}
                </p>
              </Card>
            </div>
          </>
        )}

        {/* Page 2: 行動 + 圖卡 + Line OA */}
        {currentPage === 2 && (
          <>
            {/* 三步微行動 */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-8">三步微行動</h2>
              <div className="space-y-6">
                {content.tips.map((tip, index) => (
                  <Card key={index} className="p-6 border-border bg-card hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: cfg.accentColor }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 text-lg">{tip.title}</h3>
                        <p className="text-foreground/80 mb-3 leading-relaxed">{tip.description}</p>
                        <p className="text-sm font-medium" style={{ color: cfg.color }}>
                          {tip.timeframe}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* 專屬圖卡 - 靜態圖片，原生支援長按/右鍵儲存 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">你的專屬圖卡</h2>
              <div className="flex justify-center">
                <div className="relative max-w-sm w-full">
                  <img
                    src={cfg.cardImage}
                    alt={`${cfg.zhName} 專屬圖卡`}
                    className="w-full h-auto rounded-xl shadow-lg"
                    style={{ border: `1px solid ${cfg.accent}30` }}
                  />
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="text-xs text-white/90 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      長按圖片即可儲存
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 儲存 / 分享按鈕 */}
            <div className="flex gap-3 justify-center mb-12">
              <Button
                onClick={handleDownloadCard}
                className="gap-2 px-6 py-5 text-base"
                style={{ backgroundColor: cfg.accentColor, color: '#FFFFFF' }}
              >
                <Download className="w-5 h-5" />
                儲存圖卡
              </Button>
              <Button
                onClick={handleShareCard}
                variant="outline"
                className="gap-2 px-6 py-5 text-base"
                style={{ borderColor: cfg.accentColor, color: cfg.accentColor }}
              >
                <Share2 className="w-5 h-5" />
                分享圖卡
              </Button>
            </div>

            {/* 下一步 - 各類型專屬文案 + 統一 Line OA 導向 */}
            <div className="mb-12">
              <Card className="p-8 border-border bg-card">
                <p className="text-foreground leading-relaxed mb-8 whitespace-pre-line text-lg">
                  {content.nextSteps}
                </p>
                <div className="text-center">
                  <p className="text-foreground leading-relaxed mb-6 text-lg font-medium">
                    如果你準備好了，我在 LINE 這裡等你。
                  </p>
                  <Button
                    onClick={handleGoToLineOA}
                    className="w-full py-6 text-base font-medium"
                    style={{ backgroundColor: cfg.accentColor, color: '#FFFFFF' }}
                  >
                    開始下一步對話
                  </Button>
                </div>
              </Card>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground mb-12 p-6 rounded-lg bg-background border border-border">
              <p>
                這份問卷基於你的生活傾向設計，
                <br />
                呈現你在日常中自然展現的節奏與你的感受。
              </p>
            </div>
          </>
        )}

        {/* 分頁控制 */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentPage(1);
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
            disabled={currentPage === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> 上一頁
          </Button>

          <div className="text-sm text-muted-foreground">
            第 {currentPage} / 2 頁
          </div>

          <Button
            onClick={() => {
              setCurrentPage(2);
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
            disabled={currentPage === 2}
            className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            下一頁 <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
