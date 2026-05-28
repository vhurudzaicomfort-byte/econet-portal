import { useMemo, useState } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import CodeBlock from "../components/CodeBlock";
import IconExternal from "../icons/IconExternal";
import IconArrowRight from "../icons/IconArrowRight";
import IconCheck from "../icons/IconCheck";
import IconShield from "../icons/IconShield";
import { useToast } from "../context/ToastContext";

type SdkPlatform = "Server" | "Mobile" | "CLI";

type Sdk = {
  id: string;
  name: string;
  language: string;
  platform: SdkPlatform;
  version: string;
  releasedOn: string;
  install: string;
  importLine: string;
  github: string;
  tarball: string;
  minRuntime: string;
  signed: boolean;
};

const sdks: Sdk[] = [
  {
    id: "node",
    name: "@econet/sdk",
    language: "Node.js",
    platform: "Server",
    version: "1.8.0",
    releasedOn: "2026-05-22",
    install: "npm install @econet/sdk",
    importLine: 'import { EconetClient } from "@econet/sdk";',
    github: "https://github.com/econet-developer/sdk-node",
    tarball: "https://cdn.econet.co.zw/sdk/node/econet-sdk-1.8.0.tgz",
    minRuntime: "Node.js 18+",
    signed: true,
  },
  {
    id: "python",
    name: "econet-sdk",
    language: "Python",
    platform: "Server",
    version: "1.7.4",
    releasedOn: "2026-05-18",
    install: "pip install econet-sdk",
    importLine: "from econet import EconetClient",
    github: "https://github.com/econet-developer/sdk-python",
    tarball: "https://cdn.econet.co.zw/sdk/python/econet_sdk-1.7.4.tar.gz",
    minRuntime: "Python 3.10+",
    signed: true,
  },
  {
    id: "php",
    name: "econet/sdk",
    language: "PHP",
    platform: "Server",
    version: "1.6.2",
    releasedOn: "2026-04-30",
    install: "composer require econet/sdk",
    importLine: "$econet = new Econet\\Client(getenv('ECONET_TOKEN'));",
    github: "https://github.com/econet-developer/sdk-php",
    tarball: "https://cdn.econet.co.zw/sdk/php/econet-sdk-1.6.2.zip",
    minRuntime: "PHP 8.1+",
    signed: true,
  },
  {
    id: "go",
    name: "github.com/econet/sdk-go",
    language: "Go",
    platform: "Server",
    version: "1.5.0",
    releasedOn: "2026-04-12",
    install: "go get github.com/econet/sdk-go",
    importLine: 'import "github.com/econet/sdk-go"',
    github: "https://github.com/econet-developer/sdk-go",
    tarball: "https://cdn.econet.co.zw/sdk/go/econet-sdk-go-1.5.0.tar.gz",
    minRuntime: "Go 1.22+",
    signed: true,
  },
  {
    id: "java",
    name: "co.zw.econet:sdk",
    language: "Java",
    platform: "Server",
    version: "1.4.1",
    releasedOn: "2026-03-25",
    install: 'implementation "co.zw.econet:sdk:1.4.1"',
    importLine: "import co.zw.econet.sdk.EconetClient;",
    github: "https://github.com/econet-developer/sdk-java",
    tarball: "https://cdn.econet.co.zw/sdk/java/econet-sdk-1.4.1.jar",
    minRuntime: "JDK 17+",
    signed: true,
  },
  {
    id: "dotnet",
    name: "Econet.Sdk",
    language: ".NET",
    platform: "Server",
    version: "1.3.0",
    releasedOn: "2026-03-04",
    install: "dotnet add package Econet.Sdk",
    importLine: "using Econet.Sdk;",
    github: "https://github.com/econet-developer/sdk-dotnet",
    tarball: "https://cdn.econet.co.zw/sdk/dotnet/Econet.Sdk.1.3.0.nupkg",
    minRuntime: ".NET 8.0+",
    signed: true,
  },
  {
    id: "android",
    name: "co.zw.econet:sdk-android",
    language: "Android (Kotlin)",
    platform: "Mobile",
    version: "0.9.3",
    releasedOn: "2026-05-10",
    install: 'implementation "co.zw.econet:sdk-android:0.9.3"',
    importLine: "import co.zw.econet.android.EconetClient",
    github: "https://github.com/econet-developer/sdk-android",
    tarball: "https://cdn.econet.co.zw/sdk/android/econet-sdk-android-0.9.3.aar",
    minRuntime: "minSdk 24 (Android 7+)",
    signed: true,
  },
  {
    id: "ios",
    name: "EconetSDK (Swift)",
    language: "iOS (Swift)",
    platform: "Mobile",
    version: "0.9.1",
    releasedOn: "2026-05-08",
    install: '.package(url: "https://github.com/econet-developer/sdk-ios.git", from: "0.9.1")',
    importLine: "import EconetSDK",
    github: "https://github.com/econet-developer/sdk-ios",
    tarball: "https://cdn.econet.co.zw/sdk/ios/EconetSDK-0.9.1.xcframework.zip",
    minRuntime: "iOS 15+",
    signed: true,
  },
  {
    id: "cli",
    name: "econet-cli",
    language: "CLI",
    platform: "CLI",
    version: "0.6.0",
    releasedOn: "2026-05-20",
    install: "curl -fsSL https://cdn.econet.co.zw/cli/install.sh | sh",
    importLine: "econet auth login\neconet apps list",
    github: "https://github.com/econet-developer/cli",
    tarball: "https://cdn.econet.co.zw/cli/econet-cli-0.6.0.tar.gz",
    minRuntime: "macOS / Linux / Windows",
    signed: true,
  },
];

const platforms: ("All" | SdkPlatform)[] = ["All", "Server", "Mobile", "CLI"];

const checksums = [
  { name: "GPG signing key", value: "0x4F2E A1B3 D9C7 8E15 6B0A 9F32 7D4E 8C61", action: "Download key" },
  { name: "Release checksum file", value: "SHA-256 manifest, signed weekly", action: "View manifest" },
  { name: "Trusted publishers", value: "npm 'econet', PyPI 'econet', Maven 'co.zw.econet'", action: "Verify on Sigstore" },
];

export default function SDKs() {
  const { showToast } = useToast();
  const [platformFilter, setPlatformFilter] = useState<"All" | SdkPlatform>("All");
  const [selected, setSelected] = useState<string>(sdks[0].id);

  const filtered = useMemo(
    () => (platformFilter === "All" ? sdks : sdks.filter((s) => s.platform === platformFilter)),
    [platformFilter]
  );

  const activeSdk = sdks.find((s) => s.id === selected) ?? sdks[0];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "SDK downloads" }]} />

      <header className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Official client libraries
        </p>
        <h1 className="text-econet-ink dark:text-white">SDK downloads</h1>
        <p className="text-sm text-econet-grey dark:text-white/70 max-w-2xl">
          First-party SDKs for the Econet API. All packages are signed, published to public registries
          and mirrored on cdn.econet.co.zw for air-gapped environments.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        {platforms.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlatformFilter(p)}
            className={clsx(
              "h-8 px-3 rounded-full text-xs font-semibold border focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30",
              platformFilter === p
                ? "bg-econet-navy text-white border-econet-navy"
                : "bg-white dark:bg-econet-dark-surface text-econet-ink dark:text-white border-econet-border dark:border-econet-dark-border hover:border-econet-grey"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {filtered.map((sdk) => {
          const isActive = sdk.id === selected;
          return (
            <button
              key={sdk.id}
              type="button"
              onClick={() => setSelected(sdk.id)}
              className={clsx(
                "text-left rounded-xl border p-5 bg-white dark:bg-econet-dark-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30",
                isActive
                  ? "border-econet-navy ring-1 ring-econet-navy"
                  : "border-econet-border dark:border-econet-dark-border hover:border-econet-grey"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center rounded-full text-[10px] font-bold uppercase tracking-wider border border-econet-navy/30 text-econet-navy bg-econet-navy/5 px-2 py-0.5">
                  {sdk.platform}
                </span>
                {sdk.signed ? (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-econet-success"
                    title="Package signed with GPG and verified on Sigstore"
                  >
                    <IconShield size={12} /> Signed
                  </span>
                ) : null}
              </div>
              <h3 className="text-econet-ink dark:text-white mb-1">{sdk.language}</h3>
              <p className="text-xs text-econet-grey dark:text-white/60 font-mono break-all">
                {sdk.name}
              </p>
              <div className="flex items-center justify-between mt-4 text-xs">
                <span className="font-semibold text-econet-ink dark:text-white">
                  v{sdk.version}
                </span>
                <span className="text-econet-grey dark:text-white/60">
                  {new Date(sdk.releasedOn).toLocaleDateString("en-ZW", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <Card>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
                Selected SDK
              </p>
              <h2 className="text-econet-ink dark:text-white">
                {activeSdk.language} · v{activeSdk.version}
              </h2>
              <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
                Runtime: {activeSdk.minRuntime} · Released{" "}
                {new Date(activeSdk.releasedOn).toLocaleDateString("en-ZW", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="md"
                iconRight={<IconExternal size={16} />}
                onClick={() =>
                  showToast({
                    kind: "info",
                    title: "GitHub",
                    body: "Source at " + activeSdk.github,
                  })
                }
              >
                View on GitHub
              </Button>
              <Button
                variant="primary"
                size="md"
                iconRight={<IconArrowRight size={16} />}
                onClick={() =>
                  showToast({
                    kind: "success",
                    title: "Download started",
                    body: activeSdk.tarball.split("/").pop() ?? "package",
                  })
                }
              >
                Download tarball
              </Button>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60 mb-2">
              Install
            </p>
            <CodeBlock code={activeSdk.install} language="bash" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60 mb-2">
              Import / use
            </p>
            <CodeBlock code={activeSdk.importLine} language={activeSdk.language.toLowerCase()} />
          </div>

          <ul className="grid sm:grid-cols-3 gap-3 text-sm">
            <li className="flex items-start gap-2 p-3 rounded-lg bg-econet-surface dark:bg-econet-dark-bg">
              <span className="text-econet-success mt-0.5">
                <IconCheck size={16} />
              </span>
              <div>
                <p className="font-semibold text-econet-ink dark:text-white">Idempotency built in</p>
                <p className="text-xs text-econet-grey dark:text-white/60">
                  Auto-retries with exponential backoff and idempotency keys.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2 p-3 rounded-lg bg-econet-surface dark:bg-econet-dark-bg">
              <span className="text-econet-success mt-0.5">
                <IconCheck size={16} />
              </span>
              <div>
                <p className="font-semibold text-econet-ink dark:text-white">Webhook verification</p>
                <p className="text-xs text-econet-grey dark:text-white/60">
                  HMAC signature helper ships in the box.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2 p-3 rounded-lg bg-econet-surface dark:bg-econet-dark-bg">
              <span className="text-econet-success mt-0.5">
                <IconCheck size={16} />
              </span>
              <div>
                <p className="font-semibold text-econet-ink dark:text-white">Typed responses</p>
                <p className="text-xs text-econet-grey dark:text-white/60">
                  Strict types for every API resource and error shape.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Supply-chain verification</h3>
        <ul className="divide-y divide-econet-border dark:divide-econet-dark-border">
          {checksums.map((c) => (
            <li key={c.name} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex-1">
                <p className="text-sm font-semibold text-econet-ink dark:text-white">{c.name}</p>
                <p className="text-xs text-econet-grey dark:text-white/60 font-mono break-all">
                  {c.value}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => showToast({ kind: "info", title: c.action })}
              >
                {c.action}
              </Button>
            </li>
          ))}
        </ul>
        <p className="text-xs text-econet-grey dark:text-white/60 mt-3">
          Every SDK release is reproducible from source. The checksum manifest is signed weekly with the
          Econet GPG release key and published to Sigstore for transparency.
        </p>
      </Card>
    </div>
  );
}
