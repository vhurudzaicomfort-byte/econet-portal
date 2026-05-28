import { useNavigate } from "react-router-dom";
import EconetLogo from "../components/EconetLogo";
import StarBurstBackground from "../components/StarBurstBackground";
import Button from "../components/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden p-6">
      <StarBurstBackground
        className="pointer-events-none absolute inset-0 h-full w-full"
        opacity={0.08}
      />
      <div className="relative z-10 max-w-lg text-left flex flex-col gap-5">
        <EconetLogo size={140} />
        <p className="text-xs font-bold uppercase tracking-wider text-econet-red">
          Error 404
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-econet-navy">
          Page not found
        </h1>
        <p className="text-base leading-7 text-econet-ink">
          The page you tried to reach is no longer here or has moved. Head back
          to your dashboard or browse the products catalogue.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" onClick={() => navigate("/dashboard")}>
            Go to dashboard
          </Button>
          <Button variant="ghost" onClick={() => navigate("/products")}>
            Browse products
          </Button>
        </div>
      </div>
    </div>
  );
}
