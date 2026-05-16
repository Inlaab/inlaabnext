"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface TourViewerProps {
  url:   string;
  title: string;
}

export default function TourViewer({ url, title }: TourViewerProps) {
  const [visible,   setVisible]   = useState(true);
  const [isTouch,   setIsTouch]   = useState(false);
  const [hideTimer, setHideTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Detectar dispositivo táctil
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // En desktop: auto-ocultar tras 3s de inactividad
  function showAndScheduleHide() {
    setVisible(true);
    if (hideTimer) clearTimeout(hideTimer);
    const t = setTimeout(() => setVisible(false), 3000);
    setHideTimer(t);
  }

  // En touch: toggle al tocar el header
  function handleTouch() {
    setVisible(v => !v);
  }

  return (
    <div
      style={{ position: "fixed", inset: 0 }}
      onMouseMove={!isTouch ? showAndScheduleHide : undefined}
    >
      {/* Header */}
      <div
        onClick={isTouch ? handleTouch : undefined}
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         50,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 1.25rem",
          height:         "52px",
          background:     visible ? "rgba(10,10,10,0.8)"    : "transparent",
          backdropFilter: visible ? "blur(20px)"             : "none",
          borderBottom:   visible ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
          opacity:        visible ? 1 : (isTouch ? 0.5 : 0),
          transition:     "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          cursor:         isTouch ? "pointer" : "default",
        }}
      >
        <Link
          href="/metryca/tours"
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "0.4rem",
            color:          "rgba(255,255,255,0.75)",
            textDecoration: "none",
            fontSize:       "12px",
            letterSpacing:  "0.12em",
            textTransform:  "uppercase",
            padding:        "0.75rem 0",
            minWidth:       "44px",
          }}
        >
          <span style={{ fontSize: "16px", lineHeight: 1 }}>←</span>
          Tours
        </Link>

        <span style={{
          fontSize:      "11px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.4)",
          position:      "absolute",
          left:          "50%",
          transform:     "translateX(-50%)",
        }}>
          {title}
        </span>

        <span style={{
          fontSize:      "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.25)",
          minWidth:      "44px",
          textAlign:     "right",
        }}>
          360°
        </span>
      </div>

      {/* Hint táctil (solo móvil, desaparece tras 4s) */}
      {isTouch && (
        <div
          style={{
            position:   "fixed",
            bottom:     "1.5rem",
            left:       "50%",
            transform:  "translateX(-50%)",
            zIndex:     50,
            fontSize:   "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:      "rgba(255,255,255,0.3)",
            animation:  "fadeIn 0.5s ease 1s both, fadeOut 0.5s ease 4s both",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          Toca la barra superior para navegar
        </div>
      )}

      {/* Iframe — fix para iOS Safari */}
      <div style={{
        position:                   "absolute",
        inset:                      0,
        overflow:                   "auto",
        WebkitOverflowScrolling:    "touch" as React.CSSProperties["WebkitOverflowScrolling"],
      }}>
        <iframe
          src={url}
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allow="fullscreen; gyroscope; accelerometer; xr-spatial-tracking; camera; microphone; vr; web-share"
          referrerPolicy="origin"
          title={title}
        />
      </div>
    </div>
  );
}
