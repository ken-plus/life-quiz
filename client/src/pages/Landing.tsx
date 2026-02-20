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
      name: '時光整理師',
      description: '把散落的碎片，放回位置',
      icon: '🕰️',
    },
    {
      name: '能量建築師',
      description: '先留出呼吸，再談結構',
      icon: '🏗️',
    },
    {
      name: '生命航行引水人',
      description: '迷路也是一種抵達',
      icon: '🧭',
    },
    {
      name: '秩序累積者',
      description: '緩慢但篤定，為未來鋪路',
      icon: '📐',
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
              這不是測驗你的能力，
              <br />
              而是一場把混亂整理成秩序的實驗
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              給自己七分鐘。
              <br />
              讓那些散落的時間碎片，慢慢浮出水面。
            </p>

            <Button
              onClick={() => navigate('/quiz')}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-lg px-8 py-6"
            >
              開始整理 <ArrowRight className="w-5 h-5" />
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
              整理成 21 個日常選擇
            </h2>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>沒有標準答案，也不評判對錯。</p>
              <p className="font-medium">
                只有屬於此刻的你，
                <br />
                最真實的運作方式。
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <Card className="p-6 sm:p-8 bg-card border-border">
            <div className="space-y-4 text-center">
              <p className="text-lg font-medium text-foreground">
                填寫時間：約 5-7 分鐘
              </p>
              <p className="text-foreground/70">
                用直覺作答，不用想太久。第一個浮現的感受，往往最準。
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
              完成後，你會看見此刻的自己，比較接近哪一型：
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
              你可能會發現，
              <br />
              <span className="font-medium">
                原來那些你以為是缺點的地方，
                <br />
                只是還沒被好好整理過的秩序。
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
            開始整理 <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-background/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            這份問卷沒有標籤，也沒有評價。
            <br />
            只有此刻最真實的你，
            <br />
            和一個讓混亂開始有秩序的起點。
          </p>
        </div>
      </div>
    </div>
  );
}
