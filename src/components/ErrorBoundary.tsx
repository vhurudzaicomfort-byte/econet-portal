import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (reset: () => void, error: Error | null) => ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.reset, this.state.error);
      }
      return <DefaultFallback reset={this.reset} error={this.state.error} />;
    }
    return this.props.children;
  }
}

function DefaultFallback({
  reset,
  error,
}: {
  reset: () => void;
  error: Error | null;
}) {
  return (
    <div
      role="alert"
      className="min-h-screen flex items-center justify-center bg-econet-surface dark:bg-econet-dark-bg px-4"
    >
      <div className="max-w-lg w-full bg-white dark:bg-econet-dark-surface border border-econet-border dark:border-econet-dark-border rounded-xl shadow-lift p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-econet-red">
          Something went wrong
        </p>
        <h1 className="text-2xl font-bold text-econet-ink dark:text-white mt-2">
          The portal hit an unexpected error.
        </h1>
        <p className="text-sm text-econet-grey dark:text-white/70 mt-2 leading-6">
          Your session is safe. You can try again, or return to the developer
          dashboard. If the problem persists, the developer support desk can
          help.
        </p>
        {error && import.meta.env.DEV ? (
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-econet-navy text-white text-xs p-3 font-mono">
            {error.message}
          </pre>
        ) : null}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-econet-navy text-white text-sm font-semibold hover:bg-econet-navy/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/40"
          >
            Try again
          </button>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-econet-border dark:border-econet-dark-border text-econet-ink dark:text-white text-sm font-semibold hover:bg-econet-surface dark:hover:bg-econet-dark-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          >
            Back to dashboard
          </a>
          <a
            href="mailto:developers@econet.co.zw"
            className="inline-flex items-center justify-center h-10 px-4 rounded-md text-econet-grey dark:text-white/70 text-sm font-semibold hover:text-econet-ink dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
