import EconetLogo from "../EconetLogo";

type LogoProps = {
  size?: number;
  className?: string;
  withWordmarkSuffix?: boolean;
};

export default function EconetWordmark({
  size = 140,
  className = "",
  withWordmarkSuffix = false,
}: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <EconetLogo size={size} />
      {withWordmarkSuffix ? (
        <span className="mt-1 text-[11px] font-bold uppercase tracking-[1px] text-slate-600 dark:text-white/70 font-display">
          Developer Platform
        </span>
      ) : null}
    </div>
  );
}
