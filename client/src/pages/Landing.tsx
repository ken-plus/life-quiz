/**
 * 《你的生活密碼》著陸頁面
 * 設計風格：繼承時光整理所的知性溫度 + 微創新
 * 核心特性：神秘感 × 引流鉤子 × 心理安全
 */

import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  const [, navigate] = useLocation();

  const lifeTypes = [
    {
      name: '家庭防線型',
      description: '優先安心，守護家人',
      icon: '🛡️',
    },
    {
      name: '邊界能量型',
      description: '重視狀態，保護自己',
      icon: '⚡',
    },
    {
      name: '可能性試驗型',
      description: '開放心態，願意嘗試',
      icon: '🌱',
    },
    {
      name: '系統累積型',
      description: '長期視角，複利思維',
      icon: '🏗️',
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
              默默運作的邏輯
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              這不是考試，也沒有標準答案。
              <br />
              只是當世界很吵的時候，你最自然守護的是什麼？
            </p>

            <Button
              onClick={() => navigate('/quiz')}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-lg px-8 py-6"
            >
              開始看看我的生活邏輯 <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container py-16 sm:py-24">
        <div className="max-w-2xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
              我們把生活中那些真實的小瞬間，
              <br />
              整理成 34 個日常選擇
            </h2>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>沒有對錯，也沒有標準答案。</p>
              <p className="font-medium">
                只有屬於現在的生活節奏
                <br />
                和優先順序。
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <Card className="p-6 sm:p-8 bg-card border-border">
            <div className="space-y-4 text-center">
              <p className="text-lg font-medium text-foreground">
                填寫時間：約 4-6 分鐘
              </p>
              <p className="text-foreground/70">
                建議：用直覺作答，不用想太久。
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
              完成後，你會知道自己比較接近哪一型：
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
          <Card className="p-6 sm:p-8 bg-card border-border">
            <p className="text-center text-foreground leading-relaxed">
              你可能會發現
              <br />
              <span className="font-medium">
                原來你不是想太多，
                <br />
                你只是看事情的角度不同。
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
            開始看看我的生活邏輯 <ArrowRight className="w-5 h-5" />
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
            只有更理解自己。
          </p>
        </div>
      </div>
    </div>
  );
}
