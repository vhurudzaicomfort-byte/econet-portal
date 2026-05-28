type SignalPulseBackgroundProps = {
  className?: string;
  opacity?: number;
};

export default function SignalPulseBackground({
  className,
  opacity = 0.07,
}: SignalPulseBackgroundProps) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      style={{ opacity }}
    >
      <g stroke="#001B8D" fill="none" strokeWidth="1">
        <circle cx="640" cy="140" r="220" />
        <circle cx="640" cy="140" r="160" />
        <circle cx="640" cy="140" r="100" />
        <circle cx="640" cy="140" r="48" />
      </g>
      <g stroke="#001B8D" strokeWidth="1" strokeLinecap="round" opacity="0.6">
        <line x1="520" y1="140" x2="540" y2="140" />
        <line x1="740" y1="140" x2="760" y2="140" />
        <line x1="640" y1="20" x2="640" y2="40" />
        <line x1="640" y1="240" x2="640" y2="260" />
      </g>
      <circle cx="640" cy="140" r="4" fill="#E2231A" />

      <g stroke="#001B8D" strokeWidth="1" fill="none">
        <circle cx="140" cy="460" r="100" />
        <circle cx="140" cy="460" r="64" />
        <circle cx="140" cy="460" r="30" />
      </g>
      <circle cx="140" cy="460" r="3" fill="#001B8D" />
    </svg>
  );
}
