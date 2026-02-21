import { useState } from "react";

// 🔧 換成你的問卷網址
const QUIZ_URL = "https://quiz.kenplus.tw";
const QR_URL = (url) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=8B7355&bgcolor=F5F0E8&data=${encodeURIComponent(url)}`;

const cards = [
  {
    id: "entry",
    label: "入口總卡",
    bg: "#F0EBE1",
    accent: "#A89070",
    textColor: "#3D3228",
    subColor: "#8B7355",
    tag: "時光整理所",
    tagEn: "SHÍGUĀNG ZHĚNGLǏ SuǑ",
    headline: "這不是測驗你的能力，",
    headline2: "而是一場把混亂",
    headline3: "整理成秩序的實驗。",
    sub: "給自己七分鐘。掃碼開始。",
    orb1: "#C9B8A0",
    orb2: "#8BA888",
    shape: "circle",
  },
  {
    id: "guardian",
    label: "時光整理師",
    bg: "#EDE6DC",
    accent: "#A0826D",
    textColor: "#3D2E26",
    subColor: "#A0826D",
    tag: "時光整理師",
    tagEn: "THE ORGANIZER",
    headline: "你不是想太多。",
    headline2: "你只是比別人更早感知到，",
    headline3: "什麼東西快要散了。",
    sub: "掃碼，找到屬於你的整理起點。",
    orb1: "#C9A876",
    orb2: "#D4B896",
    shape: "sweep",
  },
  {
    id: "balancer",
    label: "能量建築師",
    bg: "#E8EEEB",
    accent: "#5F8B84",
    textColor: "#253430",
    subColor: "#5F8B84",
    tag: "能量建築師",
    tagEn: "THE ARCHITECT",
    headline: "先清出呼吸的空間，",
    headline2: "才能談",
    headline3: "接下來的結構。",
    sub: "掃碼，看見你的能量藍圖。",
    orb1: "#7BA89F",
    orb2: "#A8C4BF",
    shape: "wave",
  },
  {
    id: "explorer",
    label: "生命航行引水人",
    bg: "#EDE8DF",
    accent: "#B88A5C",
    textColor: "#352B1E",
    subColor: "#B88A5C",
    tag: "生命航行引水人",
    tagEn: "THE NAVIGATOR",
    headline: "迷路，",
    headline2: "也是一種",
    headline3: "抵達。",
    sub: "掃碼，找到你的下一個座標。",
    orb1: "#D4A574",
    orb2: "#E8C89A",
    shape: "arch",
  },
  {
    id: "builder",
    label: "秩序累積者",
    bg: "#E9EDE4",
    accent: "#6B7D54",
    textColor: "#2A3020",
    subColor: "#6B7D54",
    tag: "秩序累積者",
    tagEn: "THE BUILDER",
    headline: "你的眼睛，",
    headline2: "天生長在",
    headline3: "三年後的位置。",
    sub: "掃碼，開始為未來佈局。",
    orb1: "#8B9D6F",
    orb2: "#B0C090",
    shape: "grid",
  },
];

function CardBackground({ card }) {
  const { bg, orb1, orb2, shape } = card;
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      viewBox="0 0 540 540"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`g1-${card.id}`} cx="30%" cy="25%" r="55%">
          <stop offset="0%" stopColor={orb1} stopOpacity="0.35" />
          <stop offset="100%" stopColor={bg} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`g2-${card.id}`} cx="75%" cy="80%" r="50%">
          <stop offset="0%" stopColor={orb2} stopOpacity="0.28" />
          <stop offset="100%" stopColor={bg} stopOpacity="0" />
        </radialGradient>
        <filter id={`noise-${card.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <rect width="540" height="540" fill={bg} />
      <rect width="540" height="540" fill={`url(#g1-${card.id})`} />
      <rect width="540" height="540" fill={`url(#g2-${card.id})`} />

      {shape === "circle" && (
        <>
          <circle cx="270" cy="270" r="200" fill="none" stroke={orb1} strokeWidth="0.5" opacity="0.4" />
          <circle cx="270" cy="270" r="150" fill="none" stroke={orb1} strokeWidth="0.3" opacity="0.25" />
          <ellipse cx="430" cy="110" rx="120" ry="120" fill={orb2} opacity="0.12" />
          <ellipse cx="110" cy="430" rx="100" ry="100" fill={orb1} opacity="0.1" />
        </>
      )}
      {shape === "sweep" && (
        <>
          <path d="M0 180 Q 180 80 540 220" fill="none" stroke={orb1} strokeWidth="0.6" opacity="0.35" />
          <path d="M0 220 Q 200 110 540 260" fill="none" stroke={orb1} strokeWidth="0.3" opacity="0.2" />
          <ellipse cx="450" cy="100" rx="140" ry="140" fill={orb1} opacity="0.11" />
          <ellipse cx="90" cy="450" rx="90" ry="90" fill={orb2} opacity="0.09" />
        </>
      )}
      {shape === "wave" && (
        <>
          <path d="M-50 320 Q 130 240 270 290 Q 410 340 590 260" fill="none" stroke={orb1} strokeWidth="0.7" opacity="0.4" />
          <path d="M-50 360 Q 150 280 290 330 Q 430 380 610 300" fill="none" stroke={orb1} strokeWidth="0.35" opacity="0.22" />
          <ellipse cx="480" cy="80" rx="130" ry="130" fill={orb2} opacity="0.13" />
        </>
      )}
      {shape === "arch" && (
        <>
          <path d="M 100 540 Q 270 200 440 540" fill="none" stroke={orb1} strokeWidth="0.6" opacity="0.35" />
          <path d="M 140 540 Q 270 250 400 540" fill="none" stroke={orb1} strokeWidth="0.3" opacity="0.2" />
          <ellipse cx="270" cy="100" rx="160" ry="80" fill={orb2} opacity="0.13" />
        </>
      )}
      {shape === "grid" && (
        <>
          {[120, 240, 360, 480].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="540" stroke={orb1} strokeWidth="0.4" opacity="0.18" />
          ))}
          {[120, 240, 360, 480].map((y) => (
            <line key={y} x1="0" y1={y} x2="540" y2={y} stroke={orb1} strokeWidth="0.4" opacity="0.18" />
          ))}
          <ellipse cx="420" cy="120" rx="120" ry="120" fill={orb1} opacity="0.1" />
          <ellipse cx="120" cy="430" rx="90" ry="90" fill={orb2} opacity="0.09" />
        </>
      )}

      {/* grain overlay */}
      <rect width="540" height="540" fill="transparent"
        style={{ filter: `url(#noise-${card.id})`, opacity: 0.04 }} />
    </svg>
  );
}

function Card({ card, size = 540 }) {
  const scale = size / 540;
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        overflow: "hidden",
        borderRadius: size * 0.025,
        fontFamily: "'Noto Serif TC', 'Noto Serif SC', Georgia, serif",
        flexShrink: 0,
      }}
    >
      <CardBackground card={card} />

      {/* Content layer */}
      <div style={{
        position: "absolute", inset: 0,
        padding: `${44 * scale}px`,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Top: brand */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: `${13 * scale}px`,
              letterSpacing: "0.18em",
              color: card.subColor,
              opacity: 0.85,
              marginBottom: `${4 * scale}px`,
            }}>
              {card.tagEn}
            </div>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: `${22 * scale}px`,
              letterSpacing: "0.08em",
              color: card.textColor,
              fontWeight: 600,
            }}>
              {card.tag}
            </div>
          </div>

          {/* Decorative line */}
          <div style={{
            width: `${40 * scale}px`,
            height: `${1.5 * scale}px`,
            background: card.accent,
            opacity: 0.5,
            marginTop: `${18 * scale}px`,
          }} />
        </div>

        {/* Center: headline */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          padding: `${20 * scale}px 0`,
        }}>
          <div>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: `${38 * scale}px`,
              lineHeight: 1.5,
              color: card.textColor,
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}>
              {card.headline}
              <br />
              {card.headline2}
              <br />
              {card.headline3}
            </div>
          </div>
        </div>

        {/* Bottom: QR + sub */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}>
          <div>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: `${13 * scale}px`,
              color: card.subColor,
              letterSpacing: "0.12em",
              marginBottom: `${8 * scale}px`,
              opacity: 0.8,
            }}>
              {card.sub}
            </div>
            <div style={{
              width: `${40 * scale}px`,
              height: `${1 * scale}px`,
              background: card.accent,
              opacity: 0.4,
            }} />
          </div>

          {/* QR code block */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: `${5 * scale}px`,
          }}>
            <div style={{
              padding: `${6 * scale}px`,
              background: card.bg,
              borderRadius: `${6 * scale}px`,
              border: `1px solid ${card.accent}33`,
            }}>
              <img
                src={QR_URL(QUIZ_URL)}
                width={80 * scale}
                height={80 * scale}
                alt="QR Code"
                style={{ display: "block", imageRendering: "pixelated" }}
              />
            </div>
            <div style={{
              fontSize: `${9 * scale}px`,
              color: card.subColor,
              letterSpacing: "0.1em",
              opacity: 0.6,
            }}>
              掃碼開始整理
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShareCards() {
  const [active, setActive] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F3EE",
      fontFamily: "'Noto Serif TC', Georgia, serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 13, letterSpacing: "0.2em", color: "#A89070", marginBottom: 8 }}>
          SHÍGUĀNG ZHĚNGLǏ SuǑ
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#3D3228", letterSpacing: "0.08em", margin: 0 }}>
          時光整理所 · 分享圖卡
        </h1>
        <p style={{ fontSize: 12, color: "#8B7355", marginTop: 8, letterSpacing: "0.1em" }}>
          截圖即可使用 · 1:1 正方形 · 適合分享與桌布
        </p>
      </div>

      {/* Tab selector */}
      <div style={{
        display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap", justifyContent: "center",
      }}>
        {cards.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: `1px solid ${active === i ? c.accent : "#C9B8A0"}`,
              background: active === i ? c.accent : "transparent",
              color: active === i ? "#fff" : "#8B7355",
              fontSize: 12,
              letterSpacing: "0.1em",
              cursor: "pointer",
              fontFamily: "'Noto Serif TC', serif",
              transition: "all 0.2s",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main card preview */}
      <div style={{
        boxShadow: "0 8px 40px rgba(100,80,60,0.12)",
        borderRadius: 16,
        overflow: "hidden",
      }}>
        <Card card={cards[active]} size={480} />
      </div>

      {/* Instruction */}
      <div style={{
        marginTop: 28,
        padding: "16px 28px",
        background: "#EDE8DF",
        borderRadius: 12,
        textAlign: "center",
        maxWidth: 420,
      }}>
        <p style={{ fontSize: 12, color: "#8B7355", letterSpacing: "0.08em", margin: 0, lineHeight: 1.8 }}>
          長按圖卡儲存（手機）或右鍵另存（電腦）<br />
          QR 碼指向問卷入口 · 換網址只需改第 4 行 <code style={{ background: "#D4C8B8", padding: "1px 5px", borderRadius: 4 }}>QUIZ_URL</code>
        </p>
      </div>

      {/* All 5 mini previews */}
      <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {cards.map((c, i) => (
          <div
            key={c.id}
            onClick={() => setActive(i)}
            style={{
              cursor: "pointer",
              opacity: active === i ? 1 : 0.55,
              transform: active === i ? "scale(1.05)" : "scale(1)",
              transition: "all 0.2s",
              boxShadow: active === i ? "0 4px 16px rgba(100,80,60,0.18)" : "none",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <Card card={c} size={90} />
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32, fontSize: 11, color: "#B0A090", letterSpacing: "0.1em" }}>
        © 時光整理所 · 系統複製系統，見證複製見證
      </p>
    </div>
  );
}
