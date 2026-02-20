import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 3. 導入 Vercel 的分析組件
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    {/* 這裡讓 Vercel 開始幫你記錄網站數據 */}
    <SpeedInsights />
    <Analytics />
  </>
);
