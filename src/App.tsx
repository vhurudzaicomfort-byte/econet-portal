import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppsProvider } from "./context/AppsContext";
import { ToastProvider } from "./context/ToastContext";
import { ShellChromeProvider } from "./components/ShellChromeContext";
import { EnvProvider } from "./context/EnvContext";
import { ThemeProvider } from "./context/ThemeContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import AppShell from "./components/AppShell";
import Landing from "./pages/Landing";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const APIs = lazy(() => import("./pages/APIs"));
const Documentation = lazy(() => import("./pages/Documentation"));
const ApiExplorer = lazy(() => import("./pages/ApiExplorer"));
const SDKs = lazy(() => import("./pages/SDKs"));
const CreateApp = lazy(() => import("./pages/CreateApp"));
const AppDetail = lazy(() => import("./pages/AppDetail"));
const MyApps = lazy(() => import("./pages/MyApps"));
const Teams = lazy(() => import("./pages/Teams"));
const Webhooks = lazy(() => import("./pages/Webhooks"));
const AccessTokens = lazy(() => import("./pages/AccessTokens"));
const Environments = lazy(() => import("./pages/Environments"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Billing = lazy(() => import("./pages/Billing"));
const AuditLogs = lazy(() => import("./pages/AuditLogs"));
const Status = lazy(() => import("./pages/Status"));
const Sandbox = lazy(() => import("./pages/Sandbox"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const Support = lazy(() => import("./pages/Support"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Changelog = lazy(() => import("./pages/Changelog"));
const Community = lazy(() => import("./pages/Community"));
const SecurityCenter = lazy(() => import("./pages/SecurityCenter"));
const Compliance = lazy(() => import("./pages/Compliance"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ApiPolicies = lazy(() => import("./pages/ApiPolicies"));
const Sla = lazy(() => import("./pages/Sla"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

function RouteFallback() {
  return (
    <div
      className="flex h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-3 text-sm font-semibold text-econet-grey">
        <span
          className="h-2.5 w-2.5 rounded-full bg-econet-navy motion-safe:animate-pulse"
          aria-hidden="true"
        />
        Loading…
      </span>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <EnvProvider>
              <OnboardingProvider>
                <AppsProvider>
                  <Suspense fallback={<RouteFallback />}>
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route
                        element={
                          <RequireAuth>
                            <ShellChromeProvider>
                              <AppShell />
                            </ShellChromeProvider>
                          </RequireAuth>
                        }
                      >
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/apis" element={<APIs />} />
                        <Route path="/apis/:slug" element={<ProductDetail />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:slug" element={<ProductDetail />} />
                        <Route path="/docs" element={<Documentation />} />
                        <Route path="/docs/:slug" element={<Documentation />} />
                        <Route path="/api-explorer" element={<ApiExplorer />} />
                        <Route path="/sdks" element={<SDKs />} />
                        <Route path="/apps" element={<MyApps />} />
                        <Route path="/apps/new" element={<CreateApp />} />
                        <Route path="/apps/:id" element={<AppDetail />} />
                        <Route path="/teams" element={<Teams />} />
                        <Route path="/webhooks" element={<Webhooks />} />
                        <Route path="/tokens" element={<AccessTokens />} />
                        <Route path="/environments" element={<Environments />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/audit" element={<AuditLogs />} />
                        <Route path="/status" element={<Status />} />
                        <Route path="/sandbox" element={<Sandbox />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/faqs" element={<FAQs />} />
                        <Route path="/changelog" element={<Changelog />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/security" element={<SecurityCenter />} />
                        <Route path="/compliance" element={<Compliance />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/policies" element={<ApiPolicies />} />
                        <Route path="/sla" element={<Sla />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                          path="/admin"
                          element={
                            <RequireAdmin>
                              <Admin />
                            </RequireAdmin>
                          }
                        />
                        <Route
                          path="/admin/org"
                          element={
                            <RequireAdmin>
                              <Admin />
                            </RequireAdmin>
                          }
                        />
                      </Route>
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </AppsProvider>
              </OnboardingProvider>
            </EnvProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
