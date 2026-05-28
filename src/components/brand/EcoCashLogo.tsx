type LogoProps = {
  size?: number;
  className?: string;
};

export default function EcoCashLogo({ size = 110, className }: LogoProps) {
  const ratio = 38 / 160;
  const h = Math.round(size * ratio);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 160 38"
      className={className}
      role="img"
      aria-label="EcoCash"
    >
      <title>EcoCash</title>
      <text
        x="0"
        y="28"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="-1"
        fill="#ED1C24"
      >
        EcoCash
      </text>
      <circle cx="6" cy="11" r="3" fill="#ED1C24" />
    </svg>
  );
}
