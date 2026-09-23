import React from 'react';

interface TraceShieldLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customLogoUrl?: string | null;
  showText?: boolean;
  className?: string;
  subtitle?: string;
}

/**
 * TraceShield-AI — Original Mark Design
 *
 * Concept: "The Trace Node" — a dynamic geometric mark built around
 * intersecting data-flow arcs and a central AI core node. It reads as
 * both a shield (outer arc), a circuit trace (diagonal path), and an
 * AI neural node (center pulse). Clean, scalable, timeless.
 */
export const TraceShieldLogo: React.FC<TraceShieldLogoProps> = ({
  size = 'md',
  customLogoUrl,
  showText = true,
  className = '',
  subtitle,
}) => {
  const cfg = {
    sm: { iconPx: 30, titleCls: 'text-lg',   thin: 'text-lg',   tagCls: 'text-[8px]'  },
    md: { iconPx: 40, titleCls: 'text-2xl',  thin: 'text-2xl',  tagCls: 'text-[9px]'  },
    lg: { iconPx: 52, titleCls: 'text-3xl',  thin: 'text-3xl',  tagCls: 'text-[10px]' },
    xl: { iconPx: 96, titleCls: 'text-5xl',  thin: 'text-5xl',  tagCls: 'text-xs'     },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* ── Mark ── */}
      <div className="relative group shrink-0">
        {/* Ambient pulse halo */}
        <div
          className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-90 transition-opacity duration-700 blur-lg pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(234,179,8,0.28) 0%, transparent 72%)' }}
        />

        {customLogoUrl ? (
          <img
            src={customLogoUrl}
            alt="TraceShield-AI"
            style={{ width: cfg.iconPx, height: cfg.iconPx }}
            className="object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <OriginalMark size={cfg.iconPx} />
        )}
      </div>

      {/* ── Typography ── */}
      {showText && (
        <div className="flex flex-col leading-none">
          {/* App name — modern split weight treatment */}
          <div className="flex items-baseline gap-0" style={{ lineHeight: 1 }}>
            <span
              className={`${cfg.titleCls} font-light tracking-[-0.02em]`}
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Trace
            </span>
            <span
              className={`${cfg.titleCls} font-black tracking-[-0.03em]`}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                background: 'linear-gradient(110deg, #fde68a 0%, #f59e0b 45%, #d97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Shield
            </span>
            <span
              className="font-black tracking-tight ml-1"
              style={{
                fontSize: `calc(${cfg.iconPx * 0.38}px)`,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                background: 'linear-gradient(110deg, #fbbf24 0%, #92400e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                border: '1px solid rgba(251,191,36,0.30)',
                borderRadius: '6px',
                padding: '0 6px 1px 6px',
                lineHeight: '1.5',
                alignSelf: 'center',
              }}
            >
              AI
            </span>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <span
              className={`${cfg.tagCls} font-semibold tracking-[0.22em] uppercase mt-1`}
              style={{
                color: 'rgba(251,191,36,0.45)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   Original Mark: "The Trace Node"
   A hexagonal outer ring with a flowing diagonal trace
   line and an AI neural core node at center.
───────────────────────────────────────────────────── */
const OriginalMark: React.FC<{ size: number }> = ({ size }) => {
  const id = `tm-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gold radial for outer ring */}
        <linearGradient id={`${id}-g1`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#fef9c3" />
          <stop offset="35%"  stopColor="#fbbf24" />
          <stop offset="70%"  stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        {/* Gold for trace path */}
        <linearGradient id={`${id}-g2`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#d97706"  />
        </linearGradient>
        {/* Core glow */}
        <radialGradient id={`${id}-g3`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fef9c3" />
          <stop offset="60%"  stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        {/* Outer hex fill */}
        <radialGradient id={`${id}-bg`} cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#1c1508" />
          <stop offset="100%" stopColor="#050402" />
        </radialGradient>

        {/* Clip to hex */}
        <clipPath id={`${id}-clip`}>
          <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" />
        </clipPath>

        {/* Glow filter */}
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`${id}-coreGlow`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── 1. Hex body background ── */}
      <polygon
        points="40,4 72,22 72,58 40,76 8,58 8,22"
        fill={`url(#${id}-bg)`}
      />

      {/* ── 2. Outer hex ring (gold stroke) ── */}
      <polygon
        points="40,4 72,22 72,58 40,76 8,58 8,22"
        fill="none"
        stroke={`url(#${id}-g1)`}
        strokeWidth="3"
        strokeLinejoin="round"
        filter={`url(#${id}-glow)`}
      />

      {/* ── 3. Inner hex (thin, dim) ── */}
      <polygon
        points="40,14 64,27 64,53 40,66 16,53 16,27"
        fill="none"
        stroke="rgba(251,191,36,0.18)"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeDasharray="4 3"
      />

      {/* ── 4. Circuit corner nodes on outer hex ── */}
      {[
        [40, 4], [72, 22], [72, 58], [40, 76], [8, 58], [8, 22]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={`url(#${id}-g3)`} opacity="0.85"/>
      ))}

      {/* ── 5. Diagonal shield-trace line (the "T" path) ── */}
      {/* Vertical staff of T */}
      <path
        d="M40 20 L40 60"
        stroke={`url(#${id}-g2)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter={`url(#${id}-glow)`}
      />
      {/* Horizontal crossbar of T */}
      <path
        d="M28 30 L52 30"
        stroke={`url(#${id}-g2)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter={`url(#${id}-glow)`}
      />

      {/* ── 6. Branch nodes along trace ── */}
      {/* Left node on crossbar */}
      <circle cx="28" cy="30" r="3.5" fill={`url(#${id}-g3)`} filter={`url(#${id}-coreGlow)`} opacity="0.7"/>
      {/* Right node on crossbar */}
      <circle cx="52" cy="30" r="3.5" fill={`url(#${id}-g3)`} filter={`url(#${id}-coreGlow)`} opacity="0.7"/>
      {/* Bottom node on staff */}
      <circle cx="40" cy="60" r="3.5" fill={`url(#${id}-g3)`} filter={`url(#${id}-coreGlow)`} opacity="0.7"/>

      {/* Short connector ticks off branch nodes */}
      <line x1="28" y1="30" x2="21" y2="37" stroke="rgba(251,191,36,0.45)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="52" y1="30" x2="59" y2="37" stroke="rgba(251,191,36,0.45)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="40" y1="60" x2="33" y2="67" stroke="rgba(251,191,36,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="40" y1="60" x2="47" y2="67" stroke="rgba(251,191,36,0.35)" strokeWidth="1.2" strokeLinecap="round"/>

      {/* ── 7. Central AI Core Node ── */}
      {/* Outer pulse ring */}
      <circle
        cx="40" cy="40" r="10"
        fill="none"
        stroke="rgba(251,191,36,0.20)"
        strokeWidth="1"
      />
      {/* Mid ring */}
      <circle
        cx="40" cy="40" r="7"
        fill="rgba(251,191,36,0.06)"
        stroke={`url(#${id}-g1)`}
        strokeWidth="1.8"
        filter={`url(#${id}-glow)`}
      />
      {/* Core fill */}
      <circle
        cx="40" cy="40" r="4.5"
        fill={`url(#${id}-g3)`}
        filter={`url(#${id}-coreGlow)`}
      />
      {/* Specular glint */}
      <circle cx="38.5" cy="38.5" r="1.4" fill="rgba(255,255,255,0.75)"/>
    </svg>
  );
};
