import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Role-specific pages
import DoctorAppointments from "./pages/doctor/Appointments";
import PharmacyInventory from "./pages/pharmacy/Inventory";
import LabTestOrders from "./pages/lab/TestOrders";
import Billing from "./pages/billing/Billing";
import AdminUsers from "./pages/admin/Users";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes - Common */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
            <Patients />
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor/appointments"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorAppointments />
          </ProtectedRoute>
        }
      />

      {/* Pharmacy Routes */}
      <Route
        path="/pharmacy/inventory"
        element={
          <ProtectedRoute allowedRoles={['pharmacy', 'admin']}>
            <PharmacyInventory />
          </ProtectedRoute>
        }
      />

      {/* Lab Routes */}
      <Route
        path="/lab/orders"
        element={
          <ProtectedRoute allowedRoles={['lab', 'admin']}>
            <LabTestOrders />
          </ProtectedRoute>
        }
      />

      {/* Billing Routes */}
      <Route
        path="/billing"
        element={
          <ProtectedRoute allowedRoles={['billing', 'admin']}>
            <Billing />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
