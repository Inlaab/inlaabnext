"use client";

import Link from "next/link";
import { useState } from "react";

interface TourCardProps {
  slug:     string;
  title:    string;
  subtitle: string;
  accent:   string;
  glow:     string;
}

export default function TourCard({ slug, title, subtitle, accent, glow }: TourCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/metryca/tours/${slug}`} className="group block">
      <div
        className="relative h-60 rounded-2xl p-7 flex flex-col justify-between transition-all duration-500 cursor-pointer"
        style={{
          background:  "linear-gradient(145deg, #1a1a1a 0%, #111111 100%)",
          border:      hovered ? `1px solid ${accent}40`                    : "1px solid rgba(255,255,255,0.07)",
          boxShadow:   hovered ? `0 8px 40px ${glow}, 0 2px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`
                               : "0 2px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          transform:   hovered ? "translateY(-3px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] uppercase font-medium" style={{ color: accent }}>
            360°
          </span>
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }}
          />
        </div>

        {/* Bottom */}
        <div>
          <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-2">{subtitle}</p>
          <div className="flex items-end justify-between">
            <h2
              className="text-2xl font-bold transition-colors duration-300"
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                color: hovered ? "#ffffff" : "rgba(255,255,255,0.85)",
              }}
            >
              {title}
            </h2>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 transition-all duration-300"
              style={{
                border:     hovered ? `1px solid ${accent}60` : "1px solid rgba(255,255,255,0.1)",
                background: hovered ? `${accent}15` : "transparent",
              }}
            >
              <span
                className="text-sm transition-colors duration-300"
                style={{ color: hovered ? accent : "rgba(255,255,255,0.3)" }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
