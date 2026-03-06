import React, { useEffect, useRef, useState } from 'react';
import { Copy, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { LIFE_TYPES, OperatingStyle, calculateLifeType } from '@/lib/quizData';

// ============================================================================
// 修正：同步 LIFE_TYPES 的定義，確保名稱與圖片路徑一致
// ============================================================================
export const cards = [
  {
    id: 'builder',
    title: LIFE_TYPES.builder.displayName,
    description: LIFE_TYPES.builder.roleTitle,
    image: '/lifecode-result-builder.jpg'
  },
  {
    id: 'explorer',
    title: LIFE_TYPES.explorer.displayName,
    description: LIFE_TYPES.explorer.roleTitle,
    image: '/lifecode-result-explorer.jpg'
  },
  {
    id: 'balancer',
    title: LIFE_TYPES.balancer.displayName,
    description: LIFE_TYPES.balancer.roleTitle,
    image: '/lifecode-result-balancer.jpg'
  },
  {
    id: 'guardian',
    title: LIFE_TYPES.guardian.displayName,
    description: LIFE_TYPES.guardian.roleTitle,
    image: '/lifecode-result-guardian.jpg'
  }
];

export function Card({ card, className, size }: { card: any, className?: string, size?: number }) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-sm border border-gray-100 ${className || ''}`} style={size ? { width: size } : {}}>
      <img src={card.image} alt={card.title} className="w-full h-auto object-cover" />
    </div>
  );
}

// ============================================================================
// 主要的分享頁面元件邏輯 (從 URL 取得結果)
// ============================================================================
export default function ShareCards() {
  const [, navigate] = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [lifeType, setLifeType] = useState<OperatingStyle | null>(null);
  const [isHtml2CanvasLoaded, setIsHtml2CanvasLoaded] = useState(false);

  // 動態加載 html2canvas 腳本
  useEffect(() => {
    if ((window as any).html2canvas) {
      setIsHtml2CanvasLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.async = true;
    script.onload = () => setIsHtml2CanvasLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // 1. 從 URL 取得測驗結果 (與 Result.tsx 保持一致)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type') as OperatingStyle;
    
    if (typeParam && LIFE_TYPES[typeParam]) {
      setLifeType(typeParam);
    } else {
      // 如果沒有 type，試著從 answers 解析
      const answersParam = params.get('answers');
      if (answersParam) {
        try {
          const parsedAnswers = JSON.parse(decodeURIComponent(answersParam));
          const result = calculateLifeType(parsedAnswers);
          setLifeType(result.primary);
        } catch (e) {
          console.error('無法解析測驗結果', e);
          navigate('/');
        }
      } else {
        // 預設回首頁，不顯示隨機數據
        navigate('/');
      }
    }
  }, [navigate]);

  // 2. 自動產生圖片邏輯
  useEffect(() => {
    if (!lifeType || !printRef.current || !isHtml2CanvasLoaded) return;

    const generateImage = async () => {
      try {
        setIsGenerating(true);
        const canvas = await (window as any).html2canvas(printRef.current!, {
          useCORS: true, 
          scale: 2, 
          backgroundColor: '#ffffff',
          logging: false, 
        });
        
        setImageUrl(canvas.toDataURL('image/png'));
      } catch (error) {
        console.error('圖片生成失敗:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    const timer = setTimeout(() => {
      generateImage();
    }, 800);

    return () => clearTimeout(timer);
  }, [lifeType, isHtml2CanvasLoaded]);

  if (!lifeType) return null;

  const typeData = LIFE_TYPES[lifeType];
  const shareText = `我在【時光整理所】發現我的核心型態是【${typeData.displayName}】！\n\n「${typeData.roleTitle}」\n\n👉 快來發掘你的專屬型態：${window.location.origin}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyStatus('copied');
    } catch (err) {
      setCopyStatus('error');
    }
    setTimeout(() => setCopyStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-md space-y-6">
        
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> 返回
          </Button>
          <div className="text-right">
            <h1 className="text-xl font-bold text-gray-900">專屬分享卡</h1>
          </div>
        </div>

        <UICard className="overflow-hidden border-2 border-gray-100 shadow-md">
          <CardContent className="p-0 relative flex justify-center items-center min-h-[300px] bg-gray-100">
            {isGenerating ? (
              <div className="flex flex-col items-center text-gray-400 space-y-3 p-10 text-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-accent rounded-full animate-spin" />
                <p className="text-sm">為您生成專屬圖卡中...</p>
              </div>
            ) : (
              imageUrl && (
                <div className="relative w-full">
                  <img 
                    src={imageUrl} 
                    alt="分享圖卡" 
                    className="w-full h-auto block"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="bg-black/70 text-white text-xs px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                      👇 請長按圖片儲存至手機
                    </span>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </UICard>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
            <p className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{shareText}</p>
          </div>
          
          <Button 
            onClick={handleCopyText} 
            className="w-full py-6 text-lg font-medium tracking-wide transition-all bg-accent hover:bg-accent/90 text-accent-foreground"
            variant={copyStatus === 'copied' ? 'outline' : 'default'}
          >
            {copyStatus === 'idle' && <><Copy className="w-5 h-5 mr-2" /> 複製專屬文案</>}
            {copyStatus === 'copied' && <><CheckCircle2 className="w-5 h-5 mr-2 text-green-600" /> 已成功複製！</>}
            {copyStatus === 'error' && <><AlertCircle className="w-5 h-5 mr-2 text-red-500" /> 複製失敗，請手動複製</>}
          </Button>
        </div>
      </div>

      {/* 隱藏的渲染區域 */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none z-[-1]">
        <div 
          ref={printRef} 
          className="w-[800px] h-[1000px] bg-[#FDFCFB] flex flex-col items-center justify-between p-12 relative overflow-hidden"
          style={{ fontFamily: "'Noto Serif TC', serif" }}
        >
          {/* 背景裝飾 */}
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: typeData.color, opacity: 0.1 }} />
          <div style={{ position: 'absolute', bottom: -50, left: -50, width: 300, height: 300, borderRadius: '50%', background: typeData.accentColor, opacity: 0.08 }} />

          <div className="text-center z-10 w-full mt-8">
            <div style={{ fontSize: 14, letterSpacing: '0.3em', color: typeData.accentColor, opacity: 0.8, marginBottom: 12 }}>GRAVITY OF HEART SYSTEM</div>
            <div style={{ width: 60, height: 2, background: typeData.accentColor, margin: '0 auto 40px', opacity: 0.5 }} />
            
            <h1 style={{ fontSize: 64, fontWeight: 700, color: '#2A2420', marginBottom: 24, letterSpacing: '0.1em' }}>
              {typeData.displayName}
            </h1>
            
            <p style={{ fontSize: 24, color: typeData.accentColor, letterSpacing: '0.15em', fontStyle: 'italic' }}>
              {typeData.roleTitle}
            </p>
          </div>

          <div className="w-full max-w-xl bg-white/40 rounded-2xl p-10 z-10 border border-white/60 backdrop-blur-sm">
            <p style={{ fontSize: 22, lineHeight: 1.8, color: '#3D342E', textAlign: 'center', whiteSpace: 'pre-line' }}>
              生活中的每個選擇，<br />
              都是你在為自己整理出，<br />
              最舒適的生命節奏。
            </p>
          </div>

          <div className="w-full flex justify-between items-end z-10 mb-4 px-4">
            <div className="flex flex-col">
              <p style={{ fontSize: 28, fontWeight: 600, color: '#2A2420', marginBottom: 8 }}>時光整理所</p>
              <p style={{ fontSize: 16, color: '#8C847E' }}>掃描 QR Code，探索你的生活節奏</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=3D342E&data=${encodeURIComponent(window.location.origin)}`}
                alt="QR Code"
                className="w-24 h-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
