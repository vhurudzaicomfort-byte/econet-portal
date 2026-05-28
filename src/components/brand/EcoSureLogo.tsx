type LogoProps = {
  size?: number;
  className?: string;
};

export default function EcoSureLogo({ size = 110, className }: LogoProps) {
  const ratio = 38 / 160;
  const h = Math.round(size * ratio);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 160 38"
      className={className}
      role="img"
      aria-label="EcoSure"
    >
      <title>EcoSure</title>
      <path d="M6 5l5 9-5 9-5-9z" fill="#001E96" />
      <text
        x="18"
        y="28"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="900"
        fontSize="26"
        letterSpacing="-0.5"
        fill="#001E96"
      >
        EcoSure
      </text>
    </svg>
  );
}
