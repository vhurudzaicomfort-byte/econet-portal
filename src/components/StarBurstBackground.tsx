type StarBurstBackgroundProps = {
  className?: string;
  opacity?: number;
};

export default function StarBurstBackground({
  className,
  opacity = 0.08,
}: StarBurstBackgroundProps) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <radialGradient id="globeFade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#001E96" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#001E96" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="640" cy="120" r="180" fill="url(#globeFade)" />
      <g stroke="#001E96" fill="none" strokeWidth="1">
        <circle cx="640" cy="120" r="120" />
        <circle cx="640" cy="120" r="90" />
        <circle cx="640" cy="120" r="60" />
        <ellipse cx="640" cy="120" rx="120" ry="40" />
        <ellipse cx="640" cy="120" rx="120" ry="80" />
        <line x1="520" y1="120" x2="760" y2="120" />
        <line x1="640" y1="0" x2="640" y2="240" />
      </g>
      <g stroke="#E2231A" strokeWidth="1.5" strokeLinecap="round">
        <line x1="640" y1="40" x2="640" y2="60" />
        <line x1="640" y1="180" x2="640" y2="200" />
        <line x1="560" y1="120" x2="580" y2="120" />
        <line x1="700" y1="120" x2="720" y2="120" />
        <line x1="585" y1="65" x2="600" y2="80" />
        <line x1="680" y1="160" x2="695" y2="175" />
        <line x1="680" y1="80" x2="695" y2="65" />
        <line x1="585" y1="175" x2="600" y2="160" />
      </g>
      <g stroke="#001E96" strokeWidth="1" fill="none">
        <circle cx="120" cy="480" r="80" />
        <circle cx="120" cy="480" r="55" />
        <circle cx="120" cy="480" r="30" />
      </g>
    </svg>
  );
}
