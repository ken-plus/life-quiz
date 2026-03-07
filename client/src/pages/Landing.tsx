/**
 * 時光整理所 著陸頁面
 * 設計骨架：原版質感與架構
 * 內容：v3 新版首頁概念圖 + 統一文案
 */

import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { LIFE_TYPES } from '@/lib/quizData';

export default function Landing() {
  const [, navigate] = useLocation();

  const lifeTypes = [
    {
      name: LIFE_TYPES.guardian.displayName,
      description: LIFE_TYPES.guardian.roleTitle,
      icon: '🕰️',
    },
    {
      name: LIFE_TYPES.balancer.displayName,
      description: LIFE_TYPES.balancer.roleTitle,
      icon: '🏗️',
    },
    {
      name: LIFE_TYPES.explorer.displayName,
      description: LIFE_TYPES.explorer.roleTitle,
      icon: '⚓',
    },
    {
      name: LIFE_TYPES.builder.displayName,
      description: LIFE_TYPES.builder.roleTitle,
      icon: '🧱',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - 簡潔文字導入 */}
      <div className="relative py-16 px-4 sm:py-24 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Noto Serif TC', Georgia, serif" }}>
              我們把生活中那些日常的小瞬間，
              <br />
              整理成 21 個生活選擇
            </h1>

            <p className="text-base sm:text-lg text-foreground/80 mb-8 leading-relaxed">
              沒有對錯，沒有標準答案。
              <br />
              只有當下這一刻屬於你的感受、你的邏輯還有你的生活節奏。
            </p>

            <Button
              onClick={() => navigate('/quiz')}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-base px-8 py-6"
            >
              開始一場實驗 <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Concept Image Section */}
      <div className="container py-12 sm:py-20">
        <div className="max-w-2xl mx-auto">
          {/* 概念圖卡 - 時光整理所的靈魂呈現 */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-white">
            <img 
              src="/hero-landing-concept.png" 
              alt="時光整理所：這不是測驗你的能力，而是一場把混亂整理成秩序的實驗。" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 補充說明 */}
          <Card className="p-6 sm:p-8 bg-card border-border mt-8">
            <div className="space-y-4 text-center">
              <p className="text-lg font-medium text-foreground" style={{ fontFamily: "'Noto Serif TC', Georgia, serif" }}>
                填寫時間：約 3–5 分鐘
              </p>
              <p className="text-foreground/70">
                跟隨直覺的指南針，不用想太久。
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Life Types Preview */}
      <div className="bg-secondary/30 py-16 sm:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-4" style={{ fontFamily: "'Noto Serif TC', Georgia, serif" }}>
              完成後，你會知道貼近現在的是哪一型：
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 mt-8">
              {lifeTypes.map((type) => (
                <div key={type.name} className="text-center">
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
                    {type.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/60">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Discovery Message */}
          <Card className="p-6 sm:p-8 bg-card border-border max-w-3xl mx-auto">
            <p className="text-center text-foreground leading-relaxed" style={{ fontFamily: "'Noto Serif TC', Georgia, serif" }}>
              你可能會發現
              <br />
              <span className="font-medium">
                原來你不是想太多，
                <br />
                只是每個當下的你感受不同。
              </span>
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Button
            onClick={() => navigate('/quiz')}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-base px-8 py-6"
          >
            開始一段時光之旅 <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-background/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p style={{ fontFamily: "'Noto Serif TC', Georgia, serif" }}>
            這份問卷僅用於自我探索。
            <br />
            沒有標籤，沒有評價。
            <br />
            只有現在的自己跟自己。
          </p>
        </div>
      </div>
    </div>
  );
}
