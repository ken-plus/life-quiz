/**
 * 《時光整理所》結果頁面
 * 設計風格：入戲落地、心理安全、分享誘因
 * 布局：圖片置頂 → 標題與圖視覺合一 → 分頁展示（核心內容 / 行動建議）
 * 視覺：四種類型的代表插圖 + 卡片風格分享設計
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LIFE_TYPES, calculateLifeType, QUIZ_QUESTIONS, OperatingStyle } from '@/lib/quizData';
import { RESULT_CONTENTS, LINE_OA_URL } from '@/lib/resultContent';
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
    const text = `${content.shareText}\n\n探索時光整理所：`;
    if (navigator.share) {
      navigator.share({
        title: '時光整理所',
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
    const text = `${content.shareText}\n\n探索時光整理所：${window.location.origin}`;
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
                  <p className="text-base italic mb-2" style={{ color: type.color }}>{type.roleTitle}</p>
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

              {/* Sharing Section - Improved Card Design */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">分享你的發現</h2>
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed mb-8 whitespace-pre-line">
                    {content.sharingPrompt.replace(/試試看/g, '陪你探索')}
                  </p>
                  
                  {/* Share Card Preview */}
                  <div className="mb-8 p-6 rounded-lg bg-background border-2 border-dashed border-border">
                    <p className="text-center text-foreground font-semibold mb-4">{content.shareText}</p>
                    <p className="text-center text-sm text-muted-foreground">陪你探索時光整理所</p>
                  </div>

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

              {/* Next Steps - LINE OA CTA */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">下一步</h2>
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed mb-8 whitespace-pre-line">{content.nextSteps}</p>
                  <a
                    href={LINE_OA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      className="w-full py-6 text-base gap-2"
                      style={{ backgroundColor: '#06C755', color: '#fff' }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .631.285.631.63v4.141h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                      </svg>
                      {content.nextStepsCTA}
                    </Button>
                  </a>
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
