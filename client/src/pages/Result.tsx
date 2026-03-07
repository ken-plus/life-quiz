/*
 * 時光整理所 結果頁面
 * 設計骨架：原版質感
 * 修正：calculateLifeType 現在回傳 {primary, secondary, confidence, isMixed}
 * 新增：nextStepsCTA、lineOAUrl 欄位支援
 * 終極優化：分享卡直接可儲存，無需跳轉
 */

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LIFE_TYPES, calculateLifeType, OperatingStyle } from '@/lib/quizData';
import { RESULT_CONTENTS } from '@/lib/resultContent';
import { useLocation, useSearch } from 'wouter';
import { ArrowLeft, ChevronRight, ChevronLeft, Download } from 'lucide-react';
import QRCode from 'qrcode';

const typeConfig: Record<string, {
  zhName: string;
  enName: string;
  tagline: string;
  bg: string;
  accent: string;
  textColor: string;
  subColor: string;
  orb1: string;
  orb2: string;
  symbol: string;
  accentColor: string;
  color: string;
}> = {
  guardian: {
    zhName: '時光整理師',
    enName: 'THE ORGANIZER',
    tagline: '溫柔守護 · 穩定核心',
    bg: '#EDE6DC',
    accent: '#A0826D',
    textColor: '#3D2E26',
    subColor: '#A0826D',
    orb1: '#C9A876',
    orb2: '#D4B896',
    symbol: '◎',
    accentColor: '#A0826D',
    color: '#A0826D',
  },
  balancer: {
    zhName: '能量建築師',
    enName: 'THE ARCHITECT',
    tagline: '平衡協調 · 空間創造',
    bg: '#E8EEEB',
    accent: '#5F8B84',
    textColor: '#253430',
    subColor: '#5F8B84',
    orb1: '#7BA89F',
    orb2: '#A8C4BF',
    symbol: '◆',
    accentColor: '#5F8B84',
    color: '#5F8B84',
  },
  explorer: {
    zhName: '生命航行引水人',
    enName: 'THE NAVIGATOR',
    tagline: '好奇開放 · 新路先行',
    bg: '#EBE8E0',
    accent: '#B8956A',
    textColor: '#3D342E',
    subColor: '#B8956A',
    orb1: '#D4A574',
    orb2: '#E0B896',
    symbol: '◇',
    accentColor: '#B8956A',
    color: '#B8956A',
  },
  builder: {
    zhName: '秩序累積者',
    enName: 'THE BUILDER',
    tagline: '系統思考 · 深度累積',
    bg: '#E9EAE5',
    accent: '#7A8F7E',
    textColor: '#2F3A32',
    subColor: '#7A8F7E',
    orb1: '#9DB393',
    orb2: '#B8C9AD',
    symbol: '■',
    accentColor: '#7A8F7E',
    color: '#7A8F7E',
  },
};

export default function Result() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lifeType, setLifeType] = useState<OperatingStyle | null>(null);
  const [isMixed, setIsMixed] = useState(false);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);

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

  // 生成分享卡圖片
  useEffect(() => {
    if (!lifeType) return;

    const generateCardImage = async () => {
      setIsGeneratingCard(true);
      try {
        // 等待字體完全載入
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        } else {
          // 備用方案：等待 500ms 確保字體載入
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        const cfg = typeConfig[lifeType];
        const content = RESULT_CONTENTS[lifeType];
        const QUIZ_URL = window.location.origin;

        // 建立 Canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1440;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('無法獲取 Canvas 上下文');

        // 背景 - 使用明亮的品牌色調，確保不被 CSS 深色模式影響
        ctx.fillStyle = cfg.bg;
        ctx.globalAlpha = 1.0;  // 確保背景完全不透明
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;  // 重置 globalAlpha

        // 背景裝飾圓形 - 降低不透明度，增加明亮感
        const gradient1 = ctx.createRadialGradient(canvas.width - 100, -100, 0, canvas.width - 100, -100, 300);
        gradient1.addColorStop(0, cfg.orb1 + '15');  // 從 33 改為 15，更透明
        gradient1.addColorStop(1, cfg.orb1 + '00');
        ctx.fillStyle = gradient1;
        ctx.beginPath();
        ctx.arc(canvas.width - 100, -100, 300, 0, Math.PI * 2);
        ctx.fill();

        const gradient2 = ctx.createRadialGradient(50, canvas.height + 50, 0, 50, canvas.height + 50, 250);
        gradient2.addColorStop(0, cfg.orb2 + '12');  // 從 2E 改為 12，更透明
        gradient2.addColorStop(1, cfg.orb2 + '00');
        ctx.fillStyle = gradient2;
        ctx.beginPath();
        ctx.arc(50, canvas.height + 50, 250, 0, Math.PI * 2);
        ctx.fill();

        // 上方 Header - 確保字體已載入
        ctx.font = "500 32px 'Noto Serif TC', Georgia, serif";
        // 強制設定字體，確保系統使用正確的字體
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillStyle = cfg.subColor;  // 移除透明度，使用純色
        ctx.textAlign = 'left';
        ctx.fillText('Gravity of Heart System', 60, 80);

        ctx.font = "600 40px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = cfg.textColor;
        ctx.fillText(cfg.zhName, 60, 140);

        // 分隔線
        ctx.strokeStyle = cfg.accent + '80';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width - 80, 100);
        ctx.lineTo(canvas.width - 80, 160);
        ctx.stroke();

        // 主文案（sharingPrompt）- 動態置中排版
        ctx.font = "400 44px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = cfg.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const mainText = content.sharingPrompt || '探索你的生活節奏';
        const lines = mainText.split('\n');
        const lineHeight = 80;  // 行距
        const totalTextHeight = (lines.length - 1) * lineHeight;
        const canvasMiddle = canvas.height / 2;
        let textY = canvasMiddle - totalTextHeight / 2;  // 動態置中
        for (const line of lines) {
          ctx.fillText(line, canvas.width / 2, textY);
          textY += lineHeight;
        }

        // 底部區域
        // 左側：掃碼文案
        ctx.font = "400 28px 'Noto Serif TC', Georgia, serif";
        ctx.textBaseline = 'top';
        ctx.fillStyle = cfg.subColor;
        ctx.textAlign = 'left';
        const ctaText = content.nextStepsCTA.replace(' →', '') || '開始為未來佈局';
        ctx.fillText(ctaText, 60, 1200);

        // 底部分隔線
        ctx.strokeStyle = cfg.accent + '40';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(60, 1240);
        ctx.lineTo(canvas.width - 60, 1240);
        ctx.stroke();

        // 品牌名稱
        ctx.font = "600 48px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = cfg.textColor;
        ctx.textAlign = 'left';
        ctx.fillText('時光整理所', 60, 1320);

        ctx.font = "400 28px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = cfg.subColor;
        ctx.fillText('探索屬於你的生活密碼', 60, 1380);

        // 右下角：QR Code 區域
        const qrSize = 200;
        const qrX = canvas.width - qrSize - 60;
        const qrY = canvas.height - qrSize - 60;

        // QR Code 背景（白色方塊）- 增加陰影效果
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(qrX, qrY, qrSize, qrSize);

        // 邊框 - 使用深灰而非純色，融入品牌
        ctx.strokeStyle = cfg.accent + '40';  // 降低邊框不透明度
        ctx.lineWidth = 2;  // 減少邊框寬度
        ctx.strokeRect(qrX, qrY, qrSize, qrSize);

        // 生成 QR Code - 導向問卷首頁
        const qrUrl = QUIZ_URL;
        try {
          const qrCanvas = await QRCode.toCanvas(qrUrl, {
            width: qrSize,
            margin: 0,
            color: {
              dark: cfg.textColor,  // 使用品牌色而非純黑
              light: '#FFFFFF',
            },
          });
          ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
        } catch (qrError) {
          console.warn('QR Code 生成失敗，使用預設樣式:', qrError);
        }

        // 右下角：掃碼提示
        ctx.font = "400 24px 'Noto Serif TC', Georgia, serif";
        ctx.textBaseline = 'top';
        ctx.fillStyle = cfg.subColor;  // 移除透明度，使用純色
        ctx.textAlign = 'right';
        ctx.fillText('掃碼開始整理', canvas.width - 60, qrY - 20);

        // 轉換為圖片
        const imageData = canvas.toDataURL('image/png', 1.0);
        setCardImageUrl(imageData);
      } catch (error) {
        console.error('分享卡生成失敗:', error);
      } finally {
        setIsGeneratingCard(false);
      }
    };

    const timer = setTimeout(() => {
      generateCardImage();
    }, 300);

    return () => clearTimeout(timer);
  }, [lifeType]);

  if (!lifeType) return null;

  const cfg = typeConfig[lifeType];
  const content = RESULT_CONTENTS[lifeType];

  const handleDownloadCard = () => {
    if (!cardImageUrl) return;
    const link = document.createElement('a');
    link.href = cardImageUrl;
    link.download = `時光整理所-${cfg.zhName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoToLineOA = () => {
    window.open(content.lineOAUrl, '_blank');
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
              {(() => {
                return (
                  <div className="mb-12 p-8 rounded-lg" style={{ backgroundColor: cfg.bg }}>
                    <div className="space-y-4">
                      <div style={{
                        fontSize: 48, color: cfg.accent,
                        opacity: 0.25, lineHeight: 1,
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
                );
              })()}
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

        {/* Page 2: 分享與行動 */}
        {currentPage === 2 && (
          <>
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

            {/* 分享卡片區 - 直接可儲存 */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">分享你的日常</h2>
              <Card className="p-8 border-border bg-card">
                <div className="mb-6 flex justify-center">
                  {cardImageUrl ? (
                    <div className="relative group max-w-md w-full">
                      <img
                        src={cardImageUrl}
                        alt="分享卡片"
                        className="w-full h-auto rounded-lg shadow-lg border border-border"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                        <span className="text-xs text-white/80 bg-black/40 px-3 py-1 rounded-full">
                          手機長按圖片可直接儲存
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">{isGeneratingCard ? '生成中...' : '無法生成卡片'}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  手機長按或電腦右鍵即可儲存分享
                </div>
              </Card>
            </div>

            {/* 下一步行動 */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">下一步</h2>
              <Card className="p-8 border-border bg-card">
                <p className="text-foreground leading-relaxed mb-8">{content.nextSteps}</p>
                <Button
                  onClick={handleGoToLineOA}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base"
                >
                  {content.nextStepsCTA}
                </Button>
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

      {/* 隱藏的 Canvas 參考 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
