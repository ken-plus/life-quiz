import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";


function Router() {
  return (
    <Switch>
      <Route path={"\\"} component={Landing} />
      <Route path={"/quiz"} component={Quiz} />
      <Route path={"/result"} component={Result} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: Design Philosophy - 《你的生活密碼》
// - 品牌色彩：米色主色 + 鼠尾草綠輔助色 + 暗金色點綴色
// - 設計風格：繼承時光整理所的知性溫度
// - 核心特性：無評價、心理安全、入戲落地
// - 問卷邏輯：基於人類圖骨架 + MBTI 風格，四種生活運作方式

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
