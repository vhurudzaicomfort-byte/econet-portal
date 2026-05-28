import clsx from "clsx";
import IconCheck from "../icons/IconCheck";

export type StepperStep = {
  id: string;
  label: string;
  description?: string;
};

type StepperProps = {
  steps: StepperStep[];
  activeIndex: number;
  className?: string;
};

export default function Stepper({ steps, activeIndex, className }: StepperProps) {
  return (
    <ol
      className={clsx(
        "flex flex-col gap-4 md:flex-row md:items-start md:gap-0",
        className
      )}
      aria-label="Progress"
    >
      {steps.map((step, idx) => {
        const isComplete = idx < activeIndex;
        const isActive = idx === activeIndex;
        const isLast = idx === steps.length - 1;
        return (
          <li
            key={step.id}
            className={clsx(
              "flex md:flex-1 md:flex-col md:items-stretch",
              !isLast && "md:pr-2"
            )}
            aria-current={isActive ? "step" : undefined}
          >
            <div className="flex items-center gap-3 md:flex-col md:items-stretch md:gap-2">
              <div className="flex items-center gap-3 md:gap-3">
                <div
                  className={clsx(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-150",
                    isComplete
                      ? "bg-econet-navy border-econet-navy text-white"
                      : isActive
                      ? "bg-white border-econet-red text-econet-red"
                      : "bg-white border-econet-border text-econet-grey"
                  )}
                  aria-hidden="true"
                >
                  {isComplete ? <IconCheck size={16} /> : idx + 1}
                </div>
                <div className="md:hidden">
                  <p
                    className={clsx(
                      "text-sm font-semibold",
                      isActive ? "text-econet-ink" : "text-econet-grey"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description ? (
                    <p className="text-xs text-econet-grey">{step.description}</p>
                  ) : null}
                </div>
              </div>
              {!isLast ? (
                <div
                  className={clsx(
                    "hidden md:block h-0.5 mt-4 flex-1",
                    isComplete ? "bg-econet-navy" : "bg-econet-border"
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <div className="hidden md:flex flex-col mt-2 pr-3">
              <p
                className={clsx(
                  "text-sm font-semibold",
                  isActive
                    ? "text-econet-ink"
                    : isComplete
                    ? "text-econet-navy"
                    : "text-econet-grey"
                )}
              >
                {step.label}
              </p>
              {step.description ? (
                <p className="text-xs text-econet-grey">{step.description}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
