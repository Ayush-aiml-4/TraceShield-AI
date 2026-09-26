import React from 'react';

/**
 * GoldArchitecturalFlow
 *
 * Restrained brand-integration motif translating the flowing gold
 * architectural/circuit visual language from the authentication screens
 * into the main workspace behind and around the Decision Hero.
 *
 * Features:
 * - Subordinate to semantic security decision colors (Information Level #7)
 * - Fine architectural circuit traces and hexagonal corner brackets
 * - Very slow, gentle ambient breathing (respects prefers-reduced-motion)
 * - Non-interactive, zero text interference, responsive scaling
 */
export const GoldArchitecturalFlow: React.FC<{ className?: string; enabled?: boolean }> = ({
  className = '',
  enabled = true,
}) => {
  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`absolute -inset-4 sm:-inset-6 lg:-inset-8 pointer-events-none select-none z-0 overflow-hidden sm:overflow-visible transition-opacity duration-500 ${className}`}
    >
      {/* 1. Ultra-subtle ambient gold aura node centered behind the hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none blur-3xl opacity-40 gold-ambient-node"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.045) 0%, rgba(217,119,6,0.02) 45%, transparent 70%)',
        }}
      />

      {/* 2. Architectural Circuit & Flow Geometry SVG */}
      <svg
        className="w-full h-full opacity-60 sm:opacity-75 gold-flow-motion"
        viewBox="0 0 600 400"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Authentic TraceShield gold gradient for circuit paths */}
          <linearGradient id="gold-hero-flow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#d97706" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.05" />
          </linearGradient>

          {/* Reverse gradient for right-side architectural traces */}
          <linearGradient id="gold-hero-flow-rev" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#92400e" stopOpacity="0.04" />
          </linearGradient>

          {/* Node radial glow */}
          <radialGradient id="gold-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── TOP-LEFT ARCHITECTURAL BUS (Flowing from Evidence toward Decision) ── */}
        <g className="opacity-70">
          {/* Main horizontal bus line with 45-deg descent */}
          <path
            d="M 10 35 L 140 35 L 190 85 L 320 85"
            stroke="url(#gold-hero-flow)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Parallel secondary offset trace */}
          <path
            d="M 40 22 L 130 22 L 175 67 L 260 67"
            stroke="url(#gold-hero-flow)"
            strokeWidth="0.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          {/* Circuit nodes at intersection corners */}
          <circle cx="140" cy="35" r="2" fill="#fbbf24" opacity="0.6" />
          <circle cx="190" cy="85" r="1.5" fill="#fef9c3" opacity="0.7" />
          <circle cx="130" cy="22" r="1.5" fill="#fbbf24" opacity="0.5" />
          <circle cx="175" cy="67" r="1.5" fill="#d97706" opacity="0.5" />

          {/* Faint corner bracket - Hexagonal reference to Trace Node */}
          <path
            d="M 5 60 L 5 25 L 35 25"
            stroke="#f59e0b"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
        </g>

        {/* ── TOP-RIGHT CORNER ARCHITECTURAL FLOW ── */}
        <g className="opacity-65">
          <path
            d="M 590 40 L 460 40 L 415 85 L 350 85"
            stroke="url(#gold-hero-flow-rev)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M 560 26 L 470 26 L 430 66 L 380 66"
            stroke="url(#gold-hero-flow-rev)"
            strokeWidth="0.5"
            strokeDasharray="5 7"
            strokeLinecap="round"
          />
          <circle cx="460" cy="40" r="2" fill="#fbbf24" opacity="0.6" />
          <circle cx="415" cy="85" r="1.5" fill="#fef9c3" opacity="0.7" />

          {/* Top right corner bracket */}
          <path
            d="M 595 65 L 595 25 L 565 25"
            stroke="#f59e0b"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
        </g>

        {/* ── BOTTOM-LEFT TRACE (Toward Independent Verification) ── */}
        <g className="opacity-60">
          <path
            d="M 20 370 L 160 370 L 210 320 L 290 320"
            stroke="url(#gold-hero-flow)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="160" cy="370" r="1.8" fill="#fbbf24" opacity="0.6" />
          <circle cx="210" cy="320" r="1.5" fill="#fef9c3" opacity="0.65" />

          <path
            d="M 5 340 L 5 375 L 40 375"
            stroke="#f59e0b"
            strokeWidth="1"
            strokeOpacity="0.22"
            strokeLinecap="round"
          />
        </g>

        {/* ── BOTTOM-RIGHT TRACE (Toward Controlled Release Gate) ── */}
        <g className="opacity-60">
          <path
            d="M 580 365 L 450 365 L 405 320 L 330 320"
            stroke="url(#gold-hero-flow-rev)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="450" cy="365" r="1.8" fill="#fbbf24" opacity="0.6" />
          <circle cx="405" cy="320" r="1.5" fill="#fef9c3" opacity="0.65" />

          <path
            d="M 595 335 L 595 375 L 560 375"
            stroke="#f59e0b"
            strokeWidth="1"
            strokeOpacity="0.22"
            strokeLinecap="round"
          />
        </g>

        {/* ── CENTRAL SUB-HERO ARCHITECTURAL RING SEGMENTS (Faint Shield Silhouette) ── */}
        <g className="opacity-30">
          {/* Subtle upper hexagonal contour */}
          <path
            d="M 260 20 L 300 8 L 340 20"
            stroke="#fbbf24"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <circle cx="300" cy="8" r="2" fill="url(#gold-node-glow)" />

          {/* Subtle lower hexagonal keel contour */}
          <path
            d="M 270 380 L 300 392 L 330 380"
            stroke="#fbbf24"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <circle cx="300" cy="392" r="2" fill="url(#gold-node-glow)" />
        </g>
      </svg>

      {/* Ambient slow drift animation style */}
      <style>{`
        @keyframes subtleGoldDrift {
          0% {
            opacity: 0.65;
            transform: translateY(0px) scale(1);
          }
          50% {
            opacity: 0.85;
            transform: translateY(-2px) scale(1.008);
          }
          100% {
            opacity: 0.65;
            transform: translateY(0px) scale(1);
          }
        }

        .gold-flow-motion {
          animation: subtleGoldDrift 22s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .gold-flow-motion {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
