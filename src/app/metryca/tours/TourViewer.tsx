"use client";

import Link from "next/link";
import { useState } from "react";

interface TourViewerProps {
  url:   string;
  title: string;
}

export default function TourViewer({ url, title }: TourViewerProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      {/* Header flotante */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          50,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          padding:         "0 1.5rem",
          height:          "48px",
          background:      hovered ? "rgba(10,10,10,0.75)" : "transparent",
          backdropFilter:  hovered ? "blur(20px)"           : "none",
          borderBottom:    hovered ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          opacity:         hovered ? 1 : 0.3,
          transition:      "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Link
          href="/metryca/tours"
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "0.5rem",
            color:          "rgba(255,255,255,0.7)",
            textDecoration: "none",
            fontSize:       "11px",
            letterSpacing:  "0.15em",
            textTransform:  "uppercase",
            transition:     "color 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
        >
          <span style={{ fontSize: "14px" }}>←</span>
          Tours
        </Link>

        <span style={{
          fontSize:      "10px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.35)",
        }}>
          {title}
        </span>

        <span style={{
          fontSize:      "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.2)",
        }}>
          360°
        </span>
      </div>

      {/* Tour iframe */}
      <iframe
        src={url}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        allow="fullscreen; gyroscope; accelerometer"
        title={title}
      />
    </div>
  );
}
