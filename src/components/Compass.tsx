import { SPECIALTIES, SPECIALTY_ORDER } from '../data/specialties';
import type { SpecialtyId } from '../types';
import './Compass.css';

interface Props {
  pointTo?: SpecialtyId | null;
  /** Вмикає драматичний lock-on (на result) замість плавного дрейфу (welcome) */
  locked?: boolean;
  size?: number;
  showLabels?: boolean;
}

const ANGLES: Record<SpecialtyId, number> = {
  se: 0,    // 12 o'clock — top
  cs: 120,  // 4 o'clock — bottom-right
  ce: 240,  // 8 o'clock — bottom-left
};

export function Compass({
  pointTo,
  locked = false,
  size = 320,
  showLabels = true,
}: Props) {
  const targetAngle = pointTo ? ANGLES[pointTo] : 0;

  return (
    <div
      className={`compass ${locked ? 'compass--locked' : 'compass--drift'}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="-160 -160 320 320"
        className="compass__svg"
        width={size}
        height={size}
      >
        <defs>
          <radialGradient id="cmp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124, 92, 255, 0.22)" />
            <stop offset="60%" stopColor="rgba(124, 92, 255, 0.04)" />
            <stop offset="100%" stopColor="rgba(124, 92, 255, 0)" />
          </radialGradient>
          <linearGradient id="cmp-needle" x1="0" y1="-140" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14110d" />
            <stop offset="100%" stopColor="rgba(20, 17, 13, 0.2)" />
          </linearGradient>
          <linearGradient id="cmp-grad-se" x1="0" y1="-160" x2="0" y2="160">
            <stop offset="0%" stopColor="#ff5e8a" />
            <stop offset="100%" stopColor="#ffb84d" />
          </linearGradient>
          <linearGradient id="cmp-grad-cs" x1="160" y1="0" x2="-160" y2="0">
            <stop offset="0%" stopColor="#7c5cff" />
            <stop offset="100%" stopColor="#38d4ff" />
          </linearGradient>
          <linearGradient id="cmp-grad-ce" x1="-160" y1="0" x2="160" y2="0">
            <stop offset="0%" stopColor="#2ee0a1" />
            <stop offset="100%" stopColor="#38d4ff" />
          </linearGradient>
          <filter
            id="cmp-blur"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Halo glow */}
        <circle cx="0" cy="0" r="160" fill="url(#cmp-glow)" />

        {/* Outer ring */}
        <circle
          cx="0"
          cy="0"
          r="140"
          fill="none"
          stroke="rgba(20,17,13,0.12)"
          strokeWidth="1"
        />

        {/* Tick marks (every 15deg) */}
        <g className="compass__ticks">
          {Array.from({ length: 24 }).map((_, i) => {
            const isMajor = i % 6 === 0;
            const len = isMajor ? 12 : 5;
            return (
              <line
                key={i}
                x1="0"
                y1="-140"
                x2="0"
                y2={`-${140 - len}`}
                stroke="rgba(20,17,13,0.22)"
                strokeWidth={isMajor ? 1.5 : 1}
                transform={`rotate(${i * 15})`}
              />
            );
          })}
        </g>

        {/* Inner dashed ring */}
        <circle
          cx="0"
          cy="0"
          r="100"
          fill="none"
          stroke="rgba(20,17,13,0.14)"
          strokeWidth="1"
          strokeDasharray="2 6"
          className="compass__inner-ring"
        />

        {/* Needle (rotates to target) */}
        <g
          className="compass__needle"
          style={{ transform: `rotate(${targetAngle}deg)` }}
        >
          {/* Needle blur trail */}
          <path
            d="M 0 -130 L 8 0 L 0 8 L -8 0 Z"
            fill="rgba(124, 92, 255, 0.35)"
            filter="url(#cmp-blur)"
          />
          {/* Main needle */}
          <path
            d="M 0 -130 L 6 0 L 0 6 L -6 0 Z"
            fill="url(#cmp-needle)"
          />
          {/* Counter-needle (back) */}
          <path
            d="M 0 60 L 4 0 L 0 -4 L -4 0 Z"
            fill="rgba(20, 17, 13, 0.22)"
          />
        </g>

        {/* Specialty markers (3 dots in their gradient colors) */}
        {SPECIALTY_ORDER.map((id) => {
          const angle = ANGLES[id];
          const rad = (angle - 90) * (Math.PI / 180);
          const x = Math.cos(rad) * 140;
          const y = Math.sin(rad) * 140;
          const isActive = pointTo === id;
          return (
            <g key={id} className={`compass__marker ${isActive ? 'is-active' : ''}`}>
              {/* Glow halo */}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 22 : 14}
                fill={`url(#cmp-grad-${id})`}
                opacity={isActive ? 0.6 : 0.25}
                filter="url(#cmp-blur)"
              />
              {/* Solid dot */}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 9 : 6}
                fill={`url(#cmp-grad-${id})`}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
              />
            </g>
          );
        })}

        {/* Hub */}
        <circle cx="0" cy="0" r="6" fill="#14110d" />
        <circle
          cx="0"
          cy="0"
          r="14"
          fill="none"
          stroke="rgba(20,17,13,0.3)"
          strokeWidth="1"
        />
      </svg>

      {showLabels && (
        <ul className="compass__labels">
          {SPECIALTY_ORDER.map((id) => {
            const s = SPECIALTIES[id];
            return (
              <li
                key={id}
                className={`compass__label compass__label--${id} ${pointTo === id ? 'is-active' : ''}`}
              >
                <span className="compass__label-en">{s.englishName}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
