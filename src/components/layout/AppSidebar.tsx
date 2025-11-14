import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope,
  FlaskConical,
  Pill,
  Receipt,
  Settings,
  UserCog,
  Building2,
  ClipboardList,
  FileText,
  Activity
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuthStore } from '@/store/authStore';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const roleBasedRoutes = {
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Patients', url: '/patients', icon: Users },
    { title: 'Appointments', url: '/appointments', icon: Calendar },
    { title: 'Doctors', url: '/doctors', icon: Stethoscope },
    { title: 'Manage Users', url: '/admin/users', icon: UserCog },
    { title: 'Departments', url: '/admin/departments', icon: Building2 },
    { title: 'Settings', url: '/settings', icon: Settings },
  ],
  doctor: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'My Appointments', url: '/doctor/appointments', icon: Calendar },
    { title: 'Patients', url: '/patients', icon: Users },
    { title: 'Prescriptions', url: '/doctor/prescriptions', icon: FileText },
    { title: 'Lab Reports', url: '/doctor/lab-reports', icon: FlaskConical },
  ],
  nurse: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Patients', url: '/patients', icon: Users },
    { title: 'Appointments', url: '/appointments', icon: Calendar },
    { title: 'Vitals', url: '/nurse/vitals', icon: Activity },
  ],
  receptionist: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Appointments', url: '/appointments', icon: Calendar },
    { title: 'Patients', url: '/patients', icon: Users },
    { title: 'Registration', url: '/patients/register', icon: ClipboardList },
  ],
  pharmacy: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Inventory', url: '/pharmacy/inventory', icon: Pill },
    { title: 'Dispense Medicine', url: '/pharmacy/dispense', icon: Receipt },
    { title: 'Stock Management', url: '/pharmacy/stock', icon: ClipboardList },
  ],
  lab: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Test Orders', url: '/lab/orders', icon: ClipboardList },
    { title: 'Upload Results', url: '/lab/upload', icon: FlaskConical },
    { title: 'Reports', url: '/lab/reports', icon: FileText },
  ],
  billing: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'OP Billing', url: '/billing/op', icon: Receipt },
    { title: 'IP Billing', url: '/billing/ip', icon: FileText },
    { title: 'Invoices', url: '/billing/invoices', icon: ClipboardList },
  ],
};

export function AppSidebar() {
  const { open } = useSidebar();
  const { user } = useAuthStore();
  
  const routes = user ? roleBasedRoutes[user.role] : [];

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">MediCare HMS</span>
              <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3"
                      activeClassName="bg-accent text-accent-foreground"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
