type LogoProps = {
  size?: number;
  className?: string;
  withWordmarkSuffix?: boolean;
  darkMode?: boolean;
};

export default function EconetWordmark({
  size = 140,
  className,
  withWordmarkSuffix = false,
}: LogoProps) {
  const aspectRatio = 70 / 200;
  const height = Math.round(size * aspectRatio);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 200 70"
      className={className}
      role="img"
      aria-label="Econet"
    >
      <title>Econet</title>
      <text
        x="0"
        y="42"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontWeight="900"
        fontSize="36"
        letterSpacing="-1"
        className="fill-econet-navy dark:fill-white"
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
          letterSpacing="2"
          className="fill-econet-grey dark:fill-white/70"
        >
          DEVELOPER PLATFORM
        </text>
      ) : null}
    </svg>
  );
}
