/**
 * 《你的生活密碼》結果頁面
 * 設計風格：入戲落地、心理安全、分享誘因
 * 布局：圖片置頂 → 標題與圖視覺合一 → 分頁展示（核心內容 / 行動建議）
 * 視覺：四種類型的代表插圖 + 卡片風格分享設計
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LIFE_TYPES, calculateLifeType, QUIZ_QUESTIONS, OperatingStyle } from '@/lib/quizData';
import { RESULT_CONTENTS } from '@/lib/resultContent';
import { useLocation } from 'wouter';
import { Share2, ArrowLeft, ChevronRight, ChevronLeft, Copy, Check } from 'lucide-react';

const resultImages: Record<string, string> = {
  guardian: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663308784142/TxuoMhDJoinJriHT.png',
  balancer: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663308784142/xVMFxelvLByPoDQF.png',
  explorer: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663308784142/gWtddQHmLXBrIAVS.png',
  builder: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663308784142/OnEDXHYGpnMVDoVS.jpeg',
};

export default function Result() {
  const [, navigate] = useLocation();
  const [lifeType, setLifeType] = useState<OperatingStyle | null>(null);
  const [answers, setAnswers] = useState<Record<number, OperatingStyle> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // 1: 核心內容, 2: 行動建議
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 從URL參數中獲取答案
    const params = new URLSearchParams(window.location.search);
    const answersParam = params.get('answers');

    if (answersParam) {
      try {
        const parsedAnswers = JSON.parse(decodeURIComponent(answersParam));
        setAnswers(parsedAnswers);
        const type = calculateLifeType(parsedAnswers);
        setLifeType(type);
      } catch (error) {
        console.error('Failed to parse answers:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }

    setIsLoading(false);
  }, [navigate]);

  if (isLoading || !lifeType || !answers) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">載入中...</p>
      </div>
    );
  }

  const type = LIFE_TYPES[lifeType as OperatingStyle];
  const content = RESULT_CONTENTS[lifeType];

  const handleShare = () => {
    const text = `${content.shareText}\n\n探索你的生活密碼：`;
    if (navigator.share) {
      navigator.share({
        title: '你的生活密碼',
        text: text,
        url: window.location.origin,
      });
    } else {
      // Fallback: 複製到剪貼板
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyShareText = () => {
    const text = `${content.shareText}\n\n探索你的生活密碼：${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            重新開始
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page 1: Core Identity */}
          {currentPage === 1 && (
            <>
              {/* Result Image - Positioned at top with title overlay */}
              <div className="mb-12 relative">
                <img
                  src={resultImages[lifeType]}
                  alt={content.title}
                  className="w-full rounded-xl shadow-lg"
                />
                {/* Title merged with image - positioned at bottom of image */}
                <div className="mt-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{content.title}</h1>
                  <p className="text-lg text-muted-foreground">{content.subtitle}</p>
                </div>
              </div>

              {/* Identity Locking - Introduction */}
              <div className="mb-10">
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {content.introduction.replace(/試試看/g, '陪你探索')}
                  </p>
                </Card>
              </div>

              {/* Life Recognition - Self Awareness */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-6">你的生活樣貌</h2>
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {content.selfAwareness.replace(/不上不下/g, '穩定且有力量')}
                  </p>
                </Card>
              </div>

              {/* Emotional Depth - Inner Quote */}
              <div className="mb-12 text-center">
                <div className="inline-block border-l-4 pl-6" style={{ borderColor: type.color }}>
                  <p className="text-xl font-semibold text-foreground italic">
                    {content.selfAwareness.split('\n').pop()}
                  </p>
                </div>
              </div>

              {/* Pagination Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <div className="text-sm text-muted-foreground">第 1 / 2 頁</div>
                <Button
                  onClick={() => setCurrentPage(2)}
                  className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  下一步
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}

          {/* Page 2: Action & Sharing */}
          {currentPage === 2 && (
            <>
              {/* Tips - Small Changes */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-8">三步微行動</h2>
                <div className="space-y-6">
                  {content.tips.map((tip, index) => (
                    <Card key={index} className="p-6 border-border bg-card hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: type.accentColor }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2 text-lg">{tip.title}</h3>
                          <p className="text-foreground/80 mb-3 leading-relaxed">{tip.description}</p>
                          <p className="text-sm font-medium" style={{ color: type.color }}>
                            {tip.timeframe}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sharing Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">分享你的發現</h2>
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed mb-8 whitespace-pre-line">
                    {content.sharingPrompt.replace(/試試看/g, '陪你探索')}
                  </p>

                  {/* Visual Share Card */}
                  <div
                    className="mb-8 rounded-2xl overflow-hidden relative"
                    style={{ aspectRatio: '1/1', background: type.color + '22' }}
                  >
                    {/* Background blobs */}
                    <div style={{
                      position: 'absolute', top: '-20%', left: '-10%',
                      width: '60%', height: '60%', borderRadius: '50%',
                      background: type.color, opacity: 0.2, filter: 'blur(40px)',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: '-20%', right: '-10%',
                      width: '55%', height: '55%', borderRadius: '50%',
                      background: type.accentColor, opacity: 0.18, filter: 'blur(40px)',
                    }} />

                    {/* Card content */}
                    <div style={{
                      position: 'absolute', inset: 0, padding: '10%',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    }}>
                      {/* Top */}
                      <div>
                        <div style={{
                          fontSize: '0.65rem', letterSpacing: '0.2em',
                          color: type.accentColor, marginBottom: '6px', opacity: 0.8,
                          fontFamily: 'Noto Serif TC, serif',
                        }}>
                          時光整理所 · SHÍGUĀNG ZHĚNGLǏ SuǑ
                        </div>
                        <div style={{
                          width: '32px', height: '1.5px',
                          background: type.accent, opacity: 0.5,
                          backgroundColor: type.accentColor,
                        }} />
                      </div>

                      {/* Center */}
                      <div>
                        <div style={{
                          fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
                          fontWeight: 500, lineHeight: 1.6,
                          color: 'var(--foreground)',
                          fontFamily: 'Noto Serif TC, serif',
                        }}>
                          {content.shareText.replace('，你現在是哪一型？', '').replace('，你是哪一型？', '').replace('，你是哪一型？', '')}
                        </div>
                        <div style={{
                          marginTop: '12px',
                          fontSize: '0.8rem',
                          color: type.color,
                          fontFamily: 'Noto Serif TC, serif',
                          letterSpacing: '0.08em',
                        }}>
                          {type.roleTitle}
                        </div>
                      </div>

                      {/* Bottom: QR */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{
                          fontSize: '0.65rem', color: 'var(--muted-foreground)',
                          letterSpacing: '0.1em',
                        }}>
                          掃碼，找到你的型態
                        </div>
                        <div style={{
                          padding: '6px', borderRadius: '8px',
                          background: 'rgba(255,255,255,0.7)',
                          border: `1px solid ${type.color}44`,
                        }}>
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=72x72&color=${type.accentColor.replace('#','')}&bgcolor=ffffff&data=${encodeURIComponent('https://quiz.kenplus.tw')}`}
                            width={56} height={56}
                            alt="QR"
                            style={{ display: 'block' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-center text-muted-foreground mb-6">
                    截圖這張卡片，發到 IG / LINE / 朋友圈，讓他們也來找自己的型態
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleShare}
                      className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base"
                    >
                      <Share2 className="w-5 h-5" />
                      分享給朋友
                    </Button>
                    <Button
                      onClick={handleCopyShareText}
                      variant="outline"
                      className="w-full gap-2 py-6 text-base"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" />
                          已複製
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          複製分享文案
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Next Steps - Learn More */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">了解更多</h2>
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed mb-8">{content.nextSteps}</p>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base">
                    探索完整指南
                  </Button>
                </Card>
              </div>

              {/* Footer Note - Improved */}
              <div className="text-center text-sm text-muted-foreground mb-12 p-6 rounded-lg bg-background border border-border">
                <p>
                  這份問卷基於你的天賦與傾向設計，
                  <br />
                  呈現你在生活中自然展現的力量與陪伴感。
                </p>
              </div>

              {/* Pagination Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(1)}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  上一步
                </Button>
                <div className="text-sm text-muted-foreground">第 2 / 2 頁</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
