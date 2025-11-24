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
import DoctorPrescriptions from "./pages/doctor/Prescriptions";
import DoctorLabReports from "./pages/doctor/LabReports";
import NurseVitals from "./pages/nurse/Vitals";
import PharmacyDispense from "./pages/pharmacy/Dispense";
import PharmacyStock from "./pages/pharmacy/Stock";
import PharmacyInventory from "./pages/pharmacy/Inventory";
import LabTestOrders from "./pages/lab/TestOrders";
import Billing from "./pages/billing/Billing";
import AdminUsers from "./pages/admin/Users";
import AdminDepartments from "./pages/admin/Departments";
import RegisterPatient from "./pages/RegisterPatient";
import PatientDetails from "./pages/PatientDetails";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Settings from "./pages/Settings";

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
      <Route
        path="/patients/register"
        element={
          <ProtectedRoute allowedRoles={['admin', 'receptionist']}>
            <RegisterPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:id"
        element={
          <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
            <PatientDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <Doctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
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
      <Route
        path="/doctor/prescriptions"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorPrescriptions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/lab-reports"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorLabReports />
          </ProtectedRoute>
        }
      />

      {/* Nurse Routes */}
      <Route
        path="/nurse/vitals"
        element={
          <ProtectedRoute allowedRoles={['nurse', 'admin']}>
            <NurseVitals />
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
      <Route
        path="/pharmacy/dispense"
        element={
          <ProtectedRoute allowedRoles={['pharmacy', 'admin']}>
            <PharmacyDispense />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pharmacy/stock"
        element={
          <ProtectedRoute allowedRoles={['pharmacy', 'admin']}>
            <PharmacyStock />
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
      <Route
        path="/admin/departments"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDepartments />
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
