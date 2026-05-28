type LogoProps = {
  size?: number;
  className?: string;
};

export default function StewardBankLogo({ size = 150, className }: LogoProps) {
  const ratio = 38 / 200;
  const h = Math.round(size * ratio);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 200 38"
      className={className}
      role="img"
      aria-label="Steward Bank"
    >
      <title>Steward Bank</title>
      <path
        d="M8 5c-3 4-3 10 0 15 3-5 7-5 10 0 3-5 3-11 0-15-3 5-7 5-10 0z"
        fill="#0A6E33"
      />
      <text
        x="24"
        y="22"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="800"
        fontSize="16"
        letterSpacing="-0.4"
        fill="#0A6E33"
      >
        Steward Bank
      </text>
      <text
        x="24"
        y="33"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="500"
        fontSize="8"
        letterSpacing="2"
        fill="#677A81"
      >
        TRUSTED PARTNER
      </text>
    </svg>
  );
}
