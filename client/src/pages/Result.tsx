/**
 * 時光整理所 結果頁面
 * 設計骨架：原版質感
 * 修正：calculateLifeType 現在回傳 {primary, secondary, confidence, isMixed}
 * 新增：nextStepsCTA、lineOAUrl 欄位支援
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LIFE_TYPES, calculateLifeType, OperatingStyle } from '@/lib/quizData';
import { RESULT_CONTENTS } from '@/lib/resultContent';
import { useLocation } from 'wouter';
import { Share2, ArrowLeft, ChevronRight, ChevronLeft, Copy, Check } from 'lucide-react';
import { Card as ShareCard, cards as shareCards } from './ShareCards';

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
    symbol: '⟡',
  },
  explorer: {
    zhName: '生命航行引水人',
    enName: 'THE NAVIGATOR',
    tagline: '好奇探索 · 開放前行',
    bg: '#EDE8DF',
    accent: '#B88A5C',
    textColor: '#352B1E',
    subColor: '#B88A5C',
    orb1: '#D4A574',
    orb2: '#E8C89A',
    symbol: '◈',
  },
  builder: {
    zhName: '秩序累積者',
    enName: 'THE BUILDER',
    tagline: '系統思維 · 長期佈局',
    bg: '#E9EDE4',
    accent: '#6B7D54',
    textColor: '#2A3020',
    subColor: '#6B7D54',
    orb1: '#8B9D6F',
    orb2: '#B0C090',
    symbol: '▣',
  },
};

export default function Result() {
  const [, navigate] = useLocation();
  const [lifeType, setLifeType] = useState<OperatingStyle | null>(null);
  const [isMixed, setIsMixed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const answersParam = params.get('answers');

    if (answersParam) {
      try {
        const parsedAnswers = JSON.parse(decodeURIComponent(answersParam));
        const result = calculateLifeType(parsedAnswers);
        setLifeType(result.primary);
        setIsMixed(result.isMixed);
      } catch (error) {
        console.error('Failed to parse answers:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }

    setIsLoading(false);
  }, [navigate]);

  if (isLoading || !lifeType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">載入中...</p>
      </div>
    );
  }

  const type = LIFE_TYPES[lifeType];
  const content = RESULT_CONTENTS[lifeType];

  const handleShare = () => {
    const cardsUrl = `${window.location.origin}/cards?type=${lifeType}`;
    const text = `${content.shareText}\n\n探索你的生活節奏：${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: '時光整理所',
        text: text,
        url: cardsUrl,
      });
    } else {
      navigator.clipboard.writeText(`${text}\n分享圖卡：${cardsUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyShareText = () => {
    const cardsUrl = `${window.location.origin}/cards?type=${lifeType}`;
    const text = `${content.shareText}\n\n探索你的生活節奏：${window.location.origin}\n分享圖卡：${cardsUrl}`;
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
              {/* Result Type Card */}
              <div className="mb-12">
                {(() => {
                  const cfg = typeConfig[lifeType];
                  return (
                    <div style={{
                      background: cfg.bg,
                      borderRadius: 20,
                      padding: '48px 40px',
                      position: 'relative',
                      overflow: 'hidden',
                      fontFamily: "'Noto Serif TC', Georgia, serif",
                      boxShadow: '0 8px 40px rgba(100,80,60,0.12)',
                    }}>
                      {/* 背景裝飾圓 */}
                      <div style={{
                        position: 'absolute', top: -60, right: -60,
                        width: 220, height: 220, borderRadius: '50%',
                        background: cfg.orb1, opacity: 0.2,
                      }} />
                      <div style={{
                        position: 'absolute', bottom: -40, left: -40,
                        width: 160, height: 160, borderRadius: '50%',
                        background: cfg.orb2, opacity: 0.18,
                      }} />

                      {/* 上方英文標籤 */}
                      <div style={{
                        fontSize: 11, letterSpacing: '0.22em',
                        color: cfg.subColor, opacity: 0.8,
                        marginBottom: 8, position: 'relative',
                      }}>
                        Gravity of Heart System
                      </div>

                      {/* 裝飾線 */}
                      <div style={{
                        width: 40, height: 1.5,
                        background: cfg.accent, opacity: 0.5,
                        marginBottom: 28,
                      }} />

                      {/* 主符號 */}
                      <div style={{
                        fontSize: 48, color: cfg.accent,
                        opacity: 0.25, lineHeight: 1,
                        marginBottom: 16, position: 'relative',
                      }}>
                        {cfg.symbol}
                      </div>

                      {/* 英文類型名 */}
                      <div style={{
                        fontSize: 12, letterSpacing: '0.2em',
                        color: cfg.subColor, marginBottom: 12,
                        position: 'relative',
                      }}>
                        {cfg.enName}
                      </div>

                      {/* 中文類型名 */}
                      <div style={{
                        fontSize: 40, fontWeight: 600,
                        color: cfg.textColor, letterSpacing: '0.08em',
                        lineHeight: 1.3, marginBottom: 16,
                        position: 'relative',
                      }}>
                        {cfg.zhName}
                      </div>

                      {/* tagline */}
                      <div style={{
                        fontSize: 14, color: cfg.subColor,
                        letterSpacing: '0.12em', opacity: 0.85,
                        position: 'relative',
                      }}>
                        {cfg.tagline}
                      </div>
                    </div>
                  );
                })()}

                <div className="mt-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{content.title}</h1>
                  <p className="text-lg text-muted-foreground">{content.subtitle}</p>
                  {isMixed && (
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      你的答案非常均衡，這個型態是最接近的傾向。
                    </p>
                  )}
                </div>
              </div>

              {/* Introduction */}
              <div className="mb-10">
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {content.introduction}
                  </p>
                </Card>
              </div>

              {/* Self Awareness */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-6">你的生活節奏與感受</h2>
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {content.selfAwareness}
                  </p>
                </Card>
              </div>

              {/* Inner Quote */}
              <div className="mb-12 text-center">
                <div className="inline-block border-l-4 pl-6" style={{ borderColor: type.color }}>
                  <p className="text-xl font-semibold text-foreground italic">
                    {content.selfAwareness.split('\n').filter(Boolean).pop()}
                  </p>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <div className="text-sm text-muted-foreground">第 1 / 2 頁</div>
                <Button
                  onClick={() => { setCurrentPage(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
              {/* Tips */}
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
                <h2 className="text-2xl font-semibold text-foreground mb-6">分享你的日常</h2>
                <Card className="p-8 border-border bg-card">

                  {/* 個人化分享卡 - sharingPrompt 在卡片內 */}
                  <div className="mb-4 flex justify-center">
                    {(() => {
                      const cfg = typeConfig[lifeType];
                      const QUIZ_URL = window.location.origin;
                      const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=8B7355&bgcolor=F5F0E8&data=${encodeURIComponent(QUIZ_URL)}`;
                      return (
                        <div style={{
                          width: '100%', maxWidth: 480, position: 'relative', overflow: 'hidden',
                          borderRadius: 16, fontFamily: "'Noto Serif TC', Georgia, serif",
                          boxShadow: '0 4px 24px rgba(100,80,60,0.15)',
                          background: cfg.bg,
                        }}>
                          {/* 背景裝飾 */}
                          <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: cfg.orb1, opacity: 0.2 }} />
                          <div style={{ position: 'absolute', bottom: -30, left: -30, width: 130, height: 130, borderRadius: '50%', background: cfg.orb2, opacity: 0.18 }} />

                          <div style={{ padding: '32px 28px', position: 'relative' }}>
                            {/* 上方 header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                              <div>
                                <div style={{ fontSize: 10, letterSpacing: '0.18em', color: cfg.subColor, opacity: 0.8, marginBottom: 4 }}>
                                  Gravity of Heart System
                                </div>
                                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.08em', color: cfg.textColor }}>
                                  {cfg.zhName}
                                </div>
                              </div>
                              <div style={{ width: 30, height: 1.5, background: cfg.accent, opacity: 0.5, marginTop: 14 }} />
                            </div>

                            {/* 主文字：sharingPrompt */}
                            <div style={{ fontSize: 15, lineHeight: 1.9, color: cfg.textColor, letterSpacing: '0.04em', marginBottom: 28, whiteSpace: 'pre-line' }}>
                              {content.sharingPrompt}
                            </div>

                            {/* 底部：分隔線 + QR */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                              <div>
                                <div style={{ fontSize: 11, color: cfg.subColor, letterSpacing: '0.1em', opacity: 0.75, marginBottom: 6 }}>
                                  {cfg.tagline}
                                </div>
                                <div style={{ width: 30, height: 1, background: cfg.accent, opacity: 0.35 }} />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <div style={{ padding: 5, background: cfg.bg, borderRadius: 6, border: `1px solid ${cfg.accent}33` }}>
                                  <img src={QR_URL} width={60} height={60} alt="QR" style={{ display: 'block' }} />
                                </div>
                                <div style={{ fontSize: 8, color: cfg.subColor, letterSpacing: '0.1em', opacity: 0.6 }}>掃碼開始整理</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <p className="text-center text-sm text-muted-foreground mb-8">手機截圖或電腦截圖，都可以分享給朋友</p>

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

              {/* Next Steps */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">了解更多</h2>
                <Card className="p-8 border-border bg-card">
                  <p className="text-foreground leading-relaxed mb-8">{content.nextSteps}</p>
                  <Button
                    onClick={() => window.open(content.lineOAUrl, '_blank')}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base"
                  >
                    {content.nextStepsCTA}
                  </Button>
                </Card>
              </div>

              {/* Footer Note */}
              <div className="text-center text-sm text-muted-foreground mb-12 p-6 rounded-lg bg-background border border-border">
                <p>
                  這份問卷基於你的生活傾向設計，
                  <br />
                  呈現你在日常中自然展現的節奏與你的感受。
                </p>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => { setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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