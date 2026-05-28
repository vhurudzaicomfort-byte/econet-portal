type EconetLogoProps = {
  size?: number;
  className?: string;
  withWordmarkSuffix?: boolean;
  title?: string;
};

export default function EconetLogo({
  size = 140,
  className,
  withWordmarkSuffix = false,
  title = "Econet",
}: EconetLogoProps) {
  const aspectRatio = 70 / 200;
  const height = Math.round(size * aspectRatio);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 200 70"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <text
        x="0"
        y="42"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="900"
        fontSize="36"
        letterSpacing="-1"
        fill="#001E96"
      >
        ECONET
      </text>
      <path
        d="M88 56 C 110 68, 146 66, 168 50"
        stroke="#E2231A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {withWordmarkSuffix ? (
        <text
          x="0"
          y="64"
          fontFamily="Helvetica Neue, Arial, sans-serif"
          fontWeight="400"
          fontSize="10"
          fill="#677A81"
          letterSpacing="2"
        >
          WIRELESS ZIMBABWE
        </text>
      ) : null}
    </svg>
  );
}
