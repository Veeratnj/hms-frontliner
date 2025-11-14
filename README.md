# MediCare HMS - Hospital Management System

A comprehensive Hospital Management System built with React, TypeScript, Tailwind CSS, and role-based access control (RBAC).

## 🚀 Features

### Multi-Role Support
- **Admin** - Full system access, user management, department management
- **Doctor** - Patient consultations, prescriptions, lab reports
- **Nurse** - Patient care, vitals monitoring
- **Receptionist** - Patient registration, appointment scheduling
- **Pharmacy Staff** - Medicine inventory, dispensing
- **Lab Technician** - Test orders, result uploads
- **Billing Staff** - Invoicing, payment management

### Core Modules
- ✅ JWT-based authentication with token refresh
- ✅ Role-based access control (RBAC)
- ✅ Protected routes with permission checks
- ✅ Responsive sidebar navigation
- ✅ Role-specific dashboards
- ✅ Patient management system
- ✅ Doctor appointment management
- ✅ Pharmacy inventory tracking
- ✅ Lab test order system

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **Shadcn UI** for component library
- **Zustand** for state management
- **Axios** for API calls with interceptors
- **React Router v6** for routing
- **Lucide React** for icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔐 Demo Accounts

Use these credentials to test different roles:

| Email | Role | Access Level |
|-------|------|--------------|
| admin@hospital.com | Admin | Full System Access |
| doctor@hospital.com | Doctor | Patient Care, Appointments |
| nurse@hospital.com | Nurse | Patient Monitoring |
| pharmacy@hospital.com | Pharmacy | Medicine Management |
| lab@hospital.com | Lab | Test Orders & Results |
| billing@hospital.com | Billing | Invoicing & Payments |
| receptionist@hospital.com | Receptionist | Registration & Scheduling |

Password: Any password (mock authentication)

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx      # Main layout with sidebar
│   │   └── AppSidebar.tsx     # Role-based navigation
│   ├── dashboard/
│   │   └── StatCard.tsx       # Dashboard statistics
│   ├── ui/                    # Shadcn UI components
│   └── ProtectedRoute.tsx     # Route protection
├── pages/
│   ├── Login.tsx              # Authentication
│   ├── Dashboard.tsx          # Role-specific dashboards
│   ├── Patients.tsx           # Patient management
│   ├── doctor/
│   │   └── Appointments.tsx   # Doctor appointments
│   ├── pharmacy/
│   │   └── Inventory.tsx      # Medicine inventory
│   └── lab/
│       └── TestOrders.tsx     # Lab test orders
├── services/
│   └── api.ts                 # Axios instance with interceptors
├── store/
│   └── authStore.ts           # Zustand auth store
└── App.tsx                    # Main app with routing
```

## 🔧 API Integration

The app uses Axios with automatic token management:

```typescript
// Example API call
import api from '@/services/api';

const fetchPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};
```

### API Endpoints (Mock Examples)

```typescript
// Authentication
POST /auth/login
POST /auth/refresh

// Patients
GET /patients
POST /patients
GET /patients/:id

// Doctor
GET /doctor/appointments/today
POST /doctor/prescriptions

// Lab
GET /lab/orders
POST /lab/reports

// Pharmacy
GET /pharmacy/medicines
POST /pharmacy/dispense
```

## 🎨 Design System

Healthcare-themed design with professional colors:

- **Primary**: Medical Blue (#0EA5E9)
- **Secondary**: Teal (#4FD1C5)
- **Success**: Green for positive status
- **Warning**: Amber for alerts
- **Destructive**: Red for errors

All colors use HSL format and are themeable through CSS variables in `src/index.css`.

## 🔒 Security Features

- JWT token authentication
- Automatic token refresh on 401
- Role-based route protection
- Secure token storage
- Request/response interceptors

## 📱 Responsive Design

Fully responsive design that works on:
- Desktop (1920px+)
- Laptop (1280px+)
- Tablet (768px+)
- Mobile (320px+)

## 🚦 Role-Based Navigation

Each role sees only relevant navigation items:

- Admin: All system features
- Doctor: Appointments, patients, prescriptions
- Pharmacy: Inventory, dispensing, stock
- Lab: Test orders, results, reports
- Others: Role-specific features

## 📊 Dashboard Features

Dynamic dashboards showing:
- Key metrics and statistics
- Recent activity feed
- Role-specific information
- Quick action buttons
- Status indicators

## 🔄 State Management

Using Zustand for lightweight state management:

```typescript
// Auth state
const { user, isAuthenticated, login, logout } = useAuthStore();
```

## 🎯 Next Steps

To connect to a real backend:

1. Update `VITE_API_URL` in `.env`
2. Replace mock data in pages with real API calls
3. Implement actual authentication endpoints
4. Add error handling and validation
5. Implement data caching with React Query

## 📝 License

MIT License - Feel free to use for your projects!

## 🤝 Contributing

Contributions welcome! Please follow the existing code structure and design patterns.

---

Built with ❤️ using React + TypeScript + Tailwind CSS
