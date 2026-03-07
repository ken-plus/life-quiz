import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { useLocation, useSearch } from 'wouter';
import { LIFE_TYPES, OperatingStyle, calculateLifeType } from '@/lib/quizData';
import { RESULT_CONTENTS } from '@/lib/resultContent';

// 定義分享卡片清單
export const cards = [
  {
    id: 'guardian',
    title: LIFE_TYPES.guardian.displayName,
    description: LIFE_TYPES.guardian.roleTitle,
    image: '/lifecode-result-guardian.jpg'
  },
  {
    id: 'balancer',
    title: LIFE_TYPES.balancer.displayName,
    description: LIFE_TYPES.balancer.roleTitle,
    image: '/lifecode-result-balancer.jpg'
  },
  {
    id: 'explorer',
    title: LIFE_TYPES.explorer.displayName,
    description: LIFE_TYPES.explorer.roleTitle,
    image: '/lifecode-result-explorer.jpg'
  },
  {
    id: 'builder',
    title: LIFE_TYPES.builder.displayName,
    description: LIFE_TYPES.builder.roleTitle,
    image: '/lifecode-result-builder.jpg'
  }
];

export function Card({ card, className, size }: { card: any, className?: string, size?: number }) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-sm border border-gray-100 ${className || ''}`} style={size ? { width: size } : {}}>
      <img src={card.image} alt={card.title} className="w-full h-auto object-cover" />
    </div>
  );
}

export default function ShareCards() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [lifeType, setLifeType] = useState<OperatingStyle | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1. 從 URL 取得測驗結果
  useEffect(() => {
    const params = new URLSearchParams(search);
    const typeParam = params.get('type') as OperatingStyle;
    
    if (typeParam && LIFE_TYPES[typeParam]) {
      setLifeType(typeParam);
    } else {
      const answersParam = params.get('answers');
      if (answersParam) {
        try {
          const parsedAnswers = JSON.parse(decodeURIComponent(answersParam));
          const result = calculateLifeType(parsedAnswers);
          setLifeType(result.primary);
        } catch (e) {
          console.error('無法解析測驗結果', e);
          setError('無法載入分享卡片');
          setIsGenerating(false);
        }
      } else {
        setError('無法載入分享卡片');
        setIsGenerating(false);
      }
    }
  }, [search]);

  // 2. 使用 Canvas 直接繪製高質感分享卡（避免跨域問題）
  useEffect(() => {
    if (!lifeType) return;

    const generateImage = async () => {
      try {
        setIsGenerating(true);
        setError(null);

        const typeData = LIFE_TYPES[lifeType];
        const resultContent = RESULT_CONTENTS[lifeType];
        
        // Canvas 尺寸
        const width = 1080;
        const height = 1440;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('無法獲取 Canvas 上下文');

        // 背景色
        ctx.fillStyle = '#FDFCFB';
        ctx.fillRect(0, 0, width, height);

        // 背景裝飾圓形（使用漸變）
        const gradient1 = ctx.createRadialGradient(width - 200, -200, 0, width - 200, -200, 400);
        gradient1.addColorStop(0, typeData.color + '30');
        gradient1.addColorStop(1, typeData.color + '00');
        ctx.fillStyle = gradient1;
        ctx.beginPath();
        ctx.arc(width - 200, -200, 400, 0, Math.PI * 2);
        ctx.fill();

        const gradient2 = ctx.createRadialGradient(100, height + 100, 0, 100, height + 100, 350);
        gradient2.addColorStop(0, typeData.accentColor + '20');
        gradient2.addColorStop(1, typeData.accentColor + '00');
        ctx.fillStyle = gradient2;
        ctx.beginPath();
        ctx.arc(100, height + 100, 350, 0, Math.PI * 2);
        ctx.fill();

        // 上方標題區
        ctx.font = "500 28px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = typeData.accentColor + 'B3';
        ctx.textAlign = 'center';
        ctx.fillText('GRAVITY OF HEART SYSTEM', width / 2, 80);

        // 分隔線
        ctx.strokeStyle = typeData.accentColor + '4D';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 40, 130);
        ctx.lineTo(width / 2 + 40, 130);
        ctx.stroke();

        // 身份名稱
        ctx.font = "700 96px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = '#2A2420';
        ctx.fillText(typeData.displayName, width / 2, 280);

        // 身份副標題
        ctx.font = "500 40px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = typeData.accentColor;
        ctx.fillText(typeData.roleTitle, width / 2, 360);

        // 中央插畫區（使用顏色方塊代替，避免跨域圖片問題）
        const cardHeight = 500;
        const cardWidth = 380;
        const cardX = (width - cardWidth) / 2;
        const cardY = 450;
        
        // 卡片邊框
        ctx.strokeStyle = typeData.accentColor + '80';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 30);
        ctx.stroke();

        // 卡片背景
        ctx.fillStyle = typeData.color + '15';
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 30);
        ctx.fill();

        // 卡片內文本
        ctx.font = "400 32px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = '#3D342E';
        ctx.textAlign = 'center';
        const lines = typeData.displayName.split('');
        ctx.fillText(typeData.displayName, width / 2, cardY + cardHeight / 2);

        // 主文案區
        ctx.font = "400 36px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = '#3D342E';
        const mainText = resultContent.nextStepsCTA.replace(' →', '');
        const textLines = mainText.split('\n');
        let textY = 1050;
        for (const line of textLines) {
          ctx.fillText(line, width / 2, textY);
          textY += 60;
        }

        // 底部品牌區
        ctx.font = "700 44px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = '#2A2420';
        ctx.textAlign = 'left';
        ctx.fillText('時光整理所', 60, 1320);

        ctx.font = "400 24px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = '#8C847E';
        ctx.fillText('探索屬於你的生活密碼', 60, 1370);

        // QR Code 提示文字（右下角）
        ctx.font = "400 20px 'Noto Serif TC', Georgia, serif";
        ctx.fillStyle = typeData.accentColor + '99';
        ctx.textAlign = 'right';
        ctx.fillText('掃碼開始整理', width - 60, 1370);

        // 底部分隔線
        ctx.strokeStyle = '#E0D5C8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(60, 1400);
        ctx.lineTo(width - 60, 1400);
        ctx.stroke();

        // 轉換為圖片 URL
        const imageData = canvas.toDataURL('image/png', 1.0);
        setImageUrl(imageData);
      } catch (error) {
        console.error('圖片生成失敗:', error);
        setError('圖片生成失敗，請重試');
      } finally {
        setIsGenerating(false);
      }
    };

    const timer = setTimeout(() => {
      generateImage();
    }, 500);

    return () => clearTimeout(timer);
  }, [lifeType]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center py-8 px-4">
        <div className="text-center space-y-4">
          <p className="text-gray-500">{error}</p>
          <Button onClick={() => navigate('/')} variant="outline">返回首頁</Button>
        </div>
      </div>
    );
  }

  if (!lifeType) return null;

  const typeData = LIFE_TYPES[lifeType];
  const shareUrl = `${window.location.origin}/cards?type=${lifeType}`;

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `時光整理所-${typeData.displayName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-md space-y-6">
        
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" onClick={() => window.history.back()} className="gap-2 text-gray-500 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4" /> 返回結果
          </Button>
          <div className="text-right">
            <h1 className="text-lg font-medium text-gray-800">分享你的生活型態</h1>
          </div>
        </div>

        <UICard className="overflow-hidden border-none shadow-xl bg-white rounded-2xl">
          <CardContent className="p-0 relative flex justify-center items-center min-h-[400px]">
            {isGenerating ? (
              <div className="flex flex-col items-center text-gray-400 space-y-4 p-12 text-center">
                <div className="w-10 h-10 border-3 border-gray-100 border-t-accent rounded-full animate-spin" />
                <p className="text-sm font-light tracking-widest">為您精心製作圖卡中...</p>
              </div>
            ) : (
              imageUrl && (
                <div className="relative w-full group">
                  <img 
                    src={imageUrl} 
                    alt="分享圖卡" 
                    className="w-full h-auto block shadow-inner"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center pointer-events-none space-y-2">
                    <span className="bg-black/60 text-white text-[10px] tracking-[0.2em] px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                      手機長按圖片可直接儲存
                    </span>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </UICard>

        <Button 
          onClick={handleDownload}
          disabled={!imageUrl}
          className="w-full py-6 text-sm font-medium tracking-wide transition-all bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl"
        >
          <Download className="w-4 h-4 mr-2" /> 儲存圖片
        </Button>
      </div>

      {/* 隱藏的 Canvas 參考 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
