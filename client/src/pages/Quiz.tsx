/**
 * 《你的生活密碼》問卷頁面
 * 設計風格：繼承時光整理所的知性溫度
 * 核心特性：選答案自動跳轉、底部返回箭頭、無評價、心理安全
 */

import { useState, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { QUIZ_QUESTIONS, OperatingStyle } from '@/lib/quizData';
import { useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';

export default function Quiz() {
  const [, navigate] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, OperatingStyle>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;

  const handleSelectOption = useCallback((type: OperatingStyle) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: type,
    };
    setAnswers(newAnswers);

    // 自動跳轉下一題（延遲一下讓用戶看到選中效果）
    setTimeout(() => {
      setAnimationDirection('forward');
      setIsAnimating(true);
      setTimeout(() => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setIsAnimating(false);
        } else {
          // 最後一題，導向結果頁
          navigate(`/result?answers=${encodeURIComponent(JSON.stringify(newAnswers))}`);
        }
      }, 250);
    }, 400);
  }, [answers, currentQuestion.id, currentQuestionIndex, navigate]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setAnimationDirection('backward');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsAnimating(false);
      }, 250);
    }
  };

  const getAnimationClass = () => {
    if (!isAnimating) return 'opacity-100 translate-x-0';
    if (animationDirection === 'forward') return 'opacity-0 -translate-x-8';
    return 'opacity-0 translate-x-8';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold text-foreground">時光整理所</h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container py-10">
        <div className="max-w-2xl mx-auto">
          {/* Question */}
          <div
            className={`transition-all duration-250 ease-out ${getAnimationClass()}`}
          >
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleSelectOption(option.type)}
                  disabled={isAnimating}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                    answers[currentQuestion.id] === option.type
                      ? 'border-accent bg-accent/10 scale-[0.98]'
                      : 'border-border hover:border-accent/50 bg-card active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
                        answers[currentQuestion.id] === option.type
                          ? 'border-accent bg-accent'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {answers[currentQuestion.id] === option.type && (
                        <span className="text-[10px] font-bold text-accent-foreground">✓</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-base text-foreground leading-relaxed">{option.text}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - 只有返回箭頭 */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <div className="container py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            {currentQuestionIndex > 0 ? (
              <button
                onClick={handlePrevious}
                disabled={isAnimating}
                className="flex items-center gap-2 text-foreground hover:text-accent transition-colors py-3 px-4 -ml-4 rounded-lg active:bg-accent/10"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="text-base font-medium">上一題</span>
              </button>
            ) : (
              <div />
            )}
            {isLastQuestion && answers[currentQuestion.id] !== undefined && (
              <button
                onClick={() => navigate(`/result?answers=${encodeURIComponent(JSON.stringify(answers))}`)}
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors py-2 px-3 rounded-lg"
              >
                查看結果 →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
