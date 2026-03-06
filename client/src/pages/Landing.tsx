/**
 * 時光整理所 著陸頁面
 * 設計骨架：原版質感與架構
 * 內容：v2 新版文案與型態
 */

import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { LIFE_TYPES } from '@/lib/quizData';
import { Card as ShareCard, cards as shareCards } from './ShareCards';

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
      {/* Hero Section */}
      <div
        className="relative py-20 px-4 sm:py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              你的生活，其實有一套
              <br />
              默默運作的邏輯與節奏
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              這不是考試，沒有標準答案。
              <br />
              只是當邏輯與感受對話時，你想著什麼？
            </p>

            <Button
              onClick={() => navigate('/quiz')}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-lg px-8 py-6"
            >
              開始一場實驗 <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container py-16 sm:py-24">
        <div className="max-w-2xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
              我們把生活中那些日常的小瞬間，
              <br />
              整理成 21 個生活選擇
            </h2>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>沒有對錯，沒有標準答案。</p>
              <p className="font-medium">
                只有當下這一刻屬於你的感受
                <br />
                你的邏輯還有你的生活節奏。
              </p>
            </div>
          </div>

          {/* 入口總卡 */}
          <div className="flex justify-center mb-12">
<div className="grid grid-cols-2 gap-4 sm:gap-6 mb-12">
            {shareCards.map((card) => (
              <div key={card.id} style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(100,80,60,0.1)' }}>
                <ShareCard card={card} />
              </div>
            ))}
          </div>
          </div>

          {/* Quick Info */}
          <Card className="p-6 sm:p-8 bg-card border-border">
            <div className="space-y-4 text-center">
              <p className="text-lg font-medium text-foreground">
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
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-4">
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
            <p className="text-center text-foreground leading-relaxed">
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
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-lg px-8 py-6"
          >
            開始一段時光之旅 <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-background/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
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