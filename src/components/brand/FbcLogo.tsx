type LogoProps = {
  size?: number;
  className?: string;
};

export default function FbcLogo({ size = 130, className }: LogoProps) {
  const ratio = 38 / 180;
  const h = Math.round(size * ratio);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 180 38"
      className={className}
      role="img"
      aria-label="FBC Holdings"
    >
      <title>FBC Holdings</title>
      <text
        x="0"
        y="28"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="-0.5"
        fill="#CB1F2A"
      >
        FBC
      </text>
      <text
        x="70"
        y="28"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="600"
        fontSize="18"
        letterSpacing="0"
        fill="#677A81"
      >
        Holdings
      </text>
    </svg>
  );
}
