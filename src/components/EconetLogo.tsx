type EconetLogoProps = {
  size?: number;
  className?: string;
  /** Force a variant; otherwise the dark/light variant follows the theme via the `dark` class. */
  variant?: "auto" | "color" | "white";
  title?: string;
};

const ASPECT_RATIO = 900 / 225;

export default function EconetLogo({
  size = 140,
  className = "",
  variant = "auto",
  title = "Econet Wireless",
}: EconetLogoProps) {
  const height = Math.round(size / ASPECT_RATIO);
  const style = { width: size, height };

  if (variant === "color") {
    return (
      <img
        src="/econet-logo-color.svg"
        alt={title}
        style={style}
        className={className}
        decoding="async"
      />
    );
  }
  if (variant === "white") {
    return (
      <img
        src="/econet-logo-white.svg"
        alt={title}
        style={style}
        className={className}
        decoding="async"
      />
    );
  }

  return (
    <span
      className={`inline-block align-middle ${className}`}
      style={style}
      role="img"
      aria-label={title}
    >
      <img
        src="/econet-logo-color.svg"
        alt=""
        style={style}
        className="block dark:hidden"
        decoding="async"
      />
      <img
        src="/econet-logo-white.svg"
        alt=""
        style={style}
        className="hidden dark:block"
        decoding="async"
      />
    </span>
  );
}
