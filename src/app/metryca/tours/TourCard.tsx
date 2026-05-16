"use client";

import Link from "next/link";
import { useState } from "react";

interface TourCardProps {
  slug:     string;
  title:    string;
  subtitle: string;
  accent:   string;
  glow:     string;
  delay?:   number;
}

export default function TourCard({ slug, title, subtitle, accent, glow, delay = 0 }: TourCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/metryca/tours/${slug}`} className="block">
      <div
        className="relative h-60 rounded-2xl p-7 flex flex-col justify-between cursor-pointer"
        style={{
          background:  'linear-gradient(145deg, #1a1a1a 0%, #111111 100%)',
          border:      hovered ? `1px solid ${accent}35`                                                          : '1px solid rgba(255,255,255,0.06)',
          boxShadow:   hovered ? `0 12px 48px ${glow}, 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)` : '0 2px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
          transform:   hovered ? 'translateY(-4px)'  : 'translateY(0)',
          transition:  'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          animation:   `slideUp 0.65s ease ${delay}s both`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Accent line top */}
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] tracking-[0.45em] uppercase font-medium transition-all duration-400"
            style={{ color: hovered ? accent : `${accent}80` }}
          >
            360°
          </span>
          <div
            className="h-px flex-1 transition-all duration-500"
            style={{ background: hovered ? `linear-gradient(90deg, ${accent}50, transparent)` : `linear-gradient(90deg, rgba(255,255,255,0.08), transparent)` }}
          />
        </div>

        {/* Content bottom */}
        <div>
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-2 transition-colors duration-300"
            style={{ color: hovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)' }}
          >
            {subtitle}
          </p>
          <div className="flex items-end justify-between gap-4">
            <h2
              className="text-2xl font-bold leading-tight transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                color:      hovered ? '#ffffff' : 'rgba(255,255,255,0.75)',
              }}
            >
              {title}
            </h2>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5 transition-all duration-400"
              style={{
                border:     hovered ? `1px solid ${accent}50` : '1px solid rgba(255,255,255,0.08)',
                background: hovered ? `${accent}12`           : 'transparent',
              }}
            >
              <span
                className="text-sm transition-all duration-300"
                style={{
                  color:     hovered ? accent : 'rgba(255,255,255,0.2)',
                  transform: hovered ? 'translateX(1px)' : 'translateX(0)',
                  display:   'inline-block',
                }}
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
