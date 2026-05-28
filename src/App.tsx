import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppsProvider } from "./context/AppsContext";
import { ToastProvider } from "./context/ToastContext";
import { ShellChromeProvider } from "./components/ShellChromeContext";
import AppShell from "./components/AppShell";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CreateApp from "./pages/CreateApp";
import AppDetail from "./pages/AppDetail";
import Teams from "./pages/Teams";
import Sandbox from "./pages/Sandbox";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
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
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
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
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/apps/new" element={<CreateApp />} />
                <Route path="/apps/:id" element={<AppDetail />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/sandbox" element={<Sandbox />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/admin"
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
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
