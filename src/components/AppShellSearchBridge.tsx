import { useEffect, type ReactNode } from "react";
import { useShellChrome } from "./ShellChromeContext";

type Props = {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  primaryAction?: ReactNode;
  showDemoToggle?: boolean;
  children: ReactNode;
};

export default function AppShellSearchBridge({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  primaryAction,
  showDemoToggle,
  children,
}: Props) {
  const { setChrome } = useShellChrome();

  useEffect(() => {
    setChrome({
      searchPlaceholder,
      searchValue,
      onSearchChange,
      primaryAction,
      showDemoToggle,
    });
    return () => setChrome({});
  }, [
    setChrome,
    searchPlaceholder,
    searchValue,
    onSearchChange,
    primaryAction,
    showDemoToggle,
  ]);

  return <>{children}</>;
}
