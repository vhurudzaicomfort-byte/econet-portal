type LogoProps = {
  size?: number;
  className?: string;
};

export default function CassavaLogo({ size = 120, className }: LogoProps) {
  const ratio = 38 / 160;
  const h = Math.round(size * ratio);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 160 38"
      className={className}
      role="img"
      aria-label="Cassava"
    >
      <title>Cassava</title>
      <text
        x="0"
        y="28"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="800"
        fontSize="26"
        letterSpacing="-0.5"
        fill="#1E7A3C"
      >
        Cassava
      </text>
    </svg>
  );
}
