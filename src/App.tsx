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
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import APIs from "./pages/APIs";
import Documentation from "./pages/Documentation";
import ApiExplorer from "./pages/ApiExplorer";
import CreateApp from "./pages/CreateApp";
import AppDetail from "./pages/AppDetail";
import MyApps from "./pages/MyApps";
import Teams from "./pages/Teams";
import Webhooks from "./pages/Webhooks";
import AccessTokens from "./pages/AccessTokens";
import Environments from "./pages/Environments";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import AuditLogs from "./pages/AuditLogs";
import Status from "./pages/Status";
import Sandbox from "./pages/Sandbox";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Support from "./pages/Support";
import FAQs from "./pages/FAQs";
import Changelog from "./pages/Changelog";
import Community from "./pages/Community";
import SecurityCenter from "./pages/SecurityCenter";
import Compliance from "./pages/Compliance";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ApiPolicies from "./pages/ApiPolicies";
import Sla from "./pages/Sla";
import NotFound from "./pages/NotFound";

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

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <EnvProvider>
              <OnboardingProvider>
                <AppsProvider>
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
                </AppsProvider>
              </OnboardingProvider>
            </EnvProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
