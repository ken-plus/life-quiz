import React, { useEffect, useRef, useState } from 'react';
import { Share2, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// 定義問卷結果的資料結構
interface QuizResult {
  primaryType: string;
  scores: Record<string, number>;
}

export default function ShareCards() {
  const printRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isHtml2CanvasLoaded, setIsHtml2CanvasLoaded] = useState(false);

  // 動態加載 html2canvas 腳本 (避免編譯器依賴錯誤)
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

  // 1. 取得使用者的問卷結果 (從 localStorage 或全局狀態取得)
  useEffect(() => {
    // 這裡替換為您專案實際儲存結果的方式
    const storedResult = localStorage.getItem('life_quiz_results');
    if (storedResult) {
      try {
        setQuizResult(JSON.parse(storedResult));
      } catch (e) {
        console.error('無法解析測驗結果', e);
      }
    } else {
      // 若無資料，提供預設假資料確保畫面不崩潰
      setQuizResult({
        primaryType: 'Builder', 
        scores: { Builder: 85, Explorer: 60, Balancer: 70, Guardian: 45 }
      });
    }
  }, []);

  // 2. 自動產生圖片邏輯
  useEffect(() => {
    if (!quizResult || !printRef.current || !isHtml2CanvasLoaded) return;

    const generateImage = async () => {
      try {
        setIsGenerating(true);
        // 使用動態加載的 html2canvas 擷取隱藏的 DOM 元素
        const canvas = await (window as any).html2canvas(printRef.current!, {
          useCORS: true, // 允許加載外部圖片(如 QR Code)
          scale: 2, // 提高圖片解析度
          backgroundColor: '#ffffff',
          logging: false, // 關閉日誌以提高效能
        });
        
        // 將 Canvas 轉換為 Base64 圖片網址
        setImageUrl(canvas.toDataURL('image/png'));
      } catch (error) {
        console.error('圖片生成失敗:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    // 稍微延遲確保 DOM 完全渲染
    const timer = setTimeout(() => {
      generateImage();
    }, 500);

    return () => clearTimeout(timer);
  }, [quizResult, isHtml2CanvasLoaded]);

  // 專屬動態文案組合
  const shareText = `我在這個測驗中發現我的核心型態是【${quizResult?.primaryType || '未知'}】！\n各項能力指數：\n📍 建造者: ${quizResult?.scores['Builder'] || 0}\n📍 探索者: ${quizResult?.scores['Explorer'] || 0}\n📍 平衡者: ${quizResult?.scores['Balancer'] || 0}\n📍 守護者: ${quizResult?.scores['Guardian'] || 0}\n\n👉 快來發掘你的專屬型態：${window.location.origin}`;

  // 3. 雙重保險複製機制
  const handleCopyText = async () => {
    try {
      // 優先嘗試現代 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareText);
        setCopyStatus('copied');
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch (err) {
      // 降級備案：使用傳統的 execCommand
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopyStatus('copied');
      } catch (fallbackErr) {
        console.error('Fallback copy failed', fallbackErr);
        setCopyStatus('error');
      } finally {
        textArea.remove();
      }
    }

    // 3秒後恢復按鈕狀態
    setTimeout(() => setCopyStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* 標題與指引 */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">專屬結果分享卡</h1>
          <p className="text-sm text-gray-500">已為您結合測驗分數與專屬分析</p>
        </div>

        {/* 圖片展示區塊 */}
        <Card className="overflow-hidden border-2 border-gray-100 shadow-md">
          <CardContent className="p-0 relative flex justify-center items-center min-h-[300px] bg-gray-100">
            {isGenerating ? (
              <div className="flex flex-col items-center text-gray-400 space-y-3">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
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
                  {/* 行動裝置優先的防呆提示：浮動在圖片上方 */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="bg-black/70 text-white text-xs px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                      👇 請長按圖片儲存至手機
                    </span>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>

        {/* 電腦版輔助提示 (僅在大螢幕顯示) */}
        {!isGenerating && imageUrl && (
          <p className="text-center text-xs text-gray-400 hidden sm:block">
            電腦版用戶請「點擊右鍵」選擇「另存圖片」
          </p>
        )}

        {/* 文案與按鈕區塊 */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
            <p className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{shareText}</p>
          </div>
          
          <Button 
            onClick={handleCopyText} 
            className="w-full py-6 text-lg font-medium tracking-wide transition-all"
            variant={copyStatus === 'copied' ? 'outline' : 'default'}
          >
            {copyStatus === 'idle' && <><Copy className="w-5 h-5 mr-2" /> 複製專屬文案</>}
            {copyStatus === 'copied' && <><CheckCircle2 className="w-5 h-5 mr-2 text-green-600" /> 已成功複製！快去貼上分享</>}
            {copyStatus === 'error' && <><AlertCircle className="w-5 h-5 mr-2 text-red-500" /> 複製失敗，請手動選取上方文字</>}
          </Button>
        </div>
      </div>

      {/* ========================================================
        隱藏的渲染模板 (這是不會顯示在畫面上，專門用來給 html2canvas 拍照的版型)
        ========================================================
      */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none z-[-1]">
        <div 
          ref={printRef} 
          className="w-[1080px] h-[1080px] bg-[#f8fafc] flex flex-col items-center justify-between p-16 relative overflow-hidden"
          style={{ fontFamily: '"Noto Sans TC", sans-serif' }}
        >
          {/* 背景裝飾 (避免使用導致 html2canvas 崩潰的漸層、濾鏡和混合模式) */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#dbeafe] rounded-full opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#f3e8ff] rounded-full opacity-60" />

          {/* 頂部標題 */}
          <div className="text-center z-10 w-full mt-10">
            <h2 className="text-4xl font-bold text-gray-500 tracking-widest mb-4">LIFE QUIZ</h2>
            <h1 className="text-7xl font-extrabold text-slate-800 mb-6 drop-shadow-sm">
              我的專屬型態：<span className="text-blue-600">{quizResult?.primaryType || '未知'}</span>
            </h1>
            <div className="w-32 h-2 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* 中央分數雷達 / 列表 */}
          <div className="w-full max-w-2xl bg-white/95 rounded-3xl p-12 shadow-xl z-10 border border-white">
            <h3 className="text-3xl font-bold text-center text-slate-700 mb-8 border-b pb-4">能力分佈權重</h3>
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(quizResult?.scores || {}).map(([key, value]) => (
                <div key={key} className="flex flex-col space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold text-slate-600">{key}</span>
                    <span className="text-3xl font-black text-blue-600">{value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-4 rounded-full" 
                      style={{ width: `${Math.min(100, Number(value))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 底部行動呼籲與免費公開的 QR Code 產生器 */}
          <div className="w-full flex justify-between items-end z-10 mb-8 px-8">
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-slate-800 mb-2">找到你的無限可能</p>
              <p className="text-xl text-slate-500">掃描右方 QR Code，開始你的測驗</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin)}&margin=10`}
                alt="QR Code"
                className="w-32 h-32"
                crossOrigin="anonymous" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
