import React, { useEffect, useRef, useState } from 'react';
import { Copy, CheckCircle2, AlertCircle, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { LIFE_TYPES, OperatingStyle, calculateLifeType } from '@/lib/quizData';

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

  // 1. 從 URL 取得測驗結果
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
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
          navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  }, [navigate]);

  // 2. 自動產生圖片邏輯 (確保能產生真正可長按儲存的 <img>)
  useEffect(() => {
    if (!lifeType || !printRef.current || !isHtml2CanvasLoaded) return;

    const generateImage = async () => {
      try {
        setIsGenerating(true);
        // 確保圖片已加載完成
        const images = printRef.current?.querySelectorAll('img');
        if (images) {
          await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
          }));
        }

        // 等待字體渲染
        await document.fonts.ready;

        const canvas = await (window as any).html2canvas(printRef.current!, {
          useCORS: true, 
          scale: 2, 
          backgroundColor: '#FDFCFB',
          logging: false,
          allowTaint: true,
        });
        
        setImageUrl(canvas.toDataURL('image/png', 1.0));
      } catch (error) {
        console.error('圖片生成失敗:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    const timer = setTimeout(() => {
      generateImage();
    }, 1200); // 給予足夠時間讓字體和圖片渲染

    return () => clearTimeout(timer);
  }, [lifeType, isHtml2CanvasLoaded]);

  if (!lifeType) return null;

  const typeData = LIFE_TYPES[lifeType];
  const shareUrl = `${window.location.origin}/cards?type=${lifeType}`;
  const shareText = `我是【${typeData.displayName}】，你現在是哪一型？\n\n探索你的生活節奏：${window.location.origin}\n分享圖卡：${shareUrl}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyStatus('copied');
    } catch (err) {
      setCopyStatus('error');
    }
    setTimeout(() => setCopyStatus('idle'), 3000);
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `時光整理所-你的生活密碼-${typeData.displayName}.png`;
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

        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleCopyText} 
            className="py-6 text-sm font-medium tracking-wide transition-all bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl"
            variant={copyStatus === 'copied' ? 'outline' : 'default'}
          >
            {copyStatus === 'idle' && <><Copy className="w-4 h-4 mr-2" /> 複製分享文案</>}
            {copyStatus === 'copied' && <><CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> 已複製</>}
            {copyStatus === 'error' && <><AlertCircle className="w-4 h-4 mr-2 text-red-500" /> 失敗</>}
          </Button>

          <Button 
            onClick={handleDownload}
            disabled={!imageUrl}
            className="py-6 text-sm font-medium tracking-wide transition-all bg-white border-2 border-accent text-accent hover:bg-accent/5 rounded-xl"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" /> 儲存圖片檔案
          </Button>
        </div>

        <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100 space-y-2">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">分享預覽文案</p>
          <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">{shareText}</p>
        </div>
      </div>

      {/* 隱藏的渲染區域 - 專門為了生成高畫質分享卡 */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none z-[-1]">
        <div 
          ref={printRef} 
          className="w-[800px] h-[1100px] bg-[#FDFCFB] flex flex-col items-center justify-between p-16 relative overflow-hidden"
          style={{ fontFamily: "'Noto Serif TC', serif" }}
        >
          {/* 藝術裝飾背景 */}
          <div style={{ position: 'absolute', top: -150, right: -150, width: 500, height: 500, borderRadius: '50%', background: typeData.color, opacity: 0.12, filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: typeData.accentColor, opacity: 0.08, filter: 'blur(50px)' }} />

          <div className="text-center z-10 w-full">
            <div style={{ fontSize: 16, letterSpacing: '0.4em', color: typeData.accentColor, opacity: 0.7, marginBottom: 16, fontWeight: 500 }}>GRAVITY OF HEART SYSTEM</div>
            <div style={{ width: 80, height: 1.5, background: typeData.accentColor, margin: '0 auto 50px', opacity: 0.3 }} />
            
            <h1 style={{ fontSize: 72, fontWeight: 700, color: '#2A2420', marginBottom: 24, letterSpacing: '0.15em' }}>
              {typeData.displayName}
            </h1>
            
            <p style={{ fontSize: 28, color: typeData.accentColor, letterSpacing: '0.2em', fontWeight: 500, fontStyle: 'normal' }}>
              {typeData.roleTitle}
            </p>
          </div>

          {/* 中央插畫預覽區 */}
          <div className="w-full flex justify-center items-center z-10 my-8">
            <div className="w-[450px] rounded-2xl overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src={cards.find(c => c.id === lifeType)?.image} 
                alt={typeData.displayName}
                className="w-full h-auto"
                crossOrigin="anonymous"
              />
            </div>
          </div>

          <div className="w-full max-w-xl z-10">
            <p style={{ fontSize: 24, lineHeight: 2.0, color: '#3D342E', textAlign: 'center', whiteSpace: 'pre-line', fontWeight: 400, letterSpacing: '0.05em' }}>
              生活中的每個選擇，<br />
              都是你在為自己整理出，<br />
              最舒適的生命節奏。
            </p>
          </div>

          <div className="w-full flex justify-between items-end z-10 mt-12 pt-12 border-t border-gray-100">
            <div className="flex flex-col">
              <p style={{ fontSize: 32, fontWeight: 700, color: '#2A2420', marginBottom: 8, letterSpacing: '0.1em' }}>時光整理所</p>
              <p style={{ fontSize: 18, color: '#8C847E', letterSpacing: '0.05em' }}>探索屬於你的生活密碼</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=3D342E&data=${encodeURIComponent(window.location.origin)}`}
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
