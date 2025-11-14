import { useAuthStore } from '@/store/authStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Users, Calendar, Activity, DollarSign, ClipboardList, Pill } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { user } = useAuthStore();

  const getDashboardData = () => {
    switch (user?.role) {
      case 'admin':
        return {
          stats: [
            { title: 'Total Patients', value: '2,847', icon: Users, trend: { value: '12% from last month', isPositive: true } },
            { title: 'Today\'s Appointments', value: '48', icon: Calendar },
            { title: 'Active Doctors', value: '23', icon: Activity },
            { title: 'Revenue (Month)', value: '$124,580', icon: DollarSign, trend: { value: '8% from last month', isPositive: true } },
          ],
          recentActivity: [
            { patient: 'John Doe', action: 'New admission', time: '10 mins ago', status: 'success' },
            { patient: 'Sarah Smith', action: 'Lab report ready', time: '25 mins ago', status: 'info' },
            { patient: 'Mike Johnson', action: 'Discharge pending', time: '1 hour ago', status: 'warning' },
          ],
        };
      case 'doctor':
        return {
          stats: [
            { title: 'Today\'s Patients', value: '12', icon: Users },
            { title: 'Pending Consultations', value: '5', icon: ClipboardList },
            { title: 'Completed Today', value: '7', icon: Activity, trend: { value: '3 more than yesterday', isPositive: true } },
          ],
          recentActivity: [
            { patient: 'John Doe', action: 'Scheduled at 10:30 AM', time: 'Upcoming', status: 'info' },
            { patient: 'Maria Thomas', action: 'Scheduled at 11:00 AM', time: 'Upcoming', status: 'info' },
            { patient: 'Robert Lee', action: 'Completed consultation', time: '30 mins ago', status: 'success' },
          ],
        };
      case 'pharmacy':
        return {
          stats: [
            { title: 'Medicine Stock', value: '1,240', icon: Pill },
            { title: 'Low Stock Items', value: '8', icon: Activity, trend: { value: 'Needs attention', isPositive: false } },
            { title: 'Dispensed Today', value: '45', icon: ClipboardList },
          ],
          recentActivity: [
            { patient: 'Prescription #1234', action: 'Paracetamol dispensed', time: '5 mins ago', status: 'success' },
            { patient: 'Prescription #1235', action: 'Amoxicillin dispensed', time: '15 mins ago', status: 'success' },
            { patient: 'Stock Alert', action: 'Aspirin running low', time: '1 hour ago', status: 'warning' },
          ],
        };
      default:
        return {
          stats: [
            { title: 'Today\'s Tasks', value: '8', icon: ClipboardList },
            { title: 'Pending', value: '3', icon: Activity },
            { title: 'Completed', value: '5', icon: Users, trend: { value: '2 more than yesterday', isPositive: true } },
          ],
          recentActivity: [
            { patient: 'Task #1', action: 'Completed', time: '10 mins ago', status: 'success' },
            { patient: 'Task #2', action: 'In Progress', time: '30 mins ago', status: 'info' },
          ],
        };
    }
  };

  const data = getDashboardData();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Here's what's happening today</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium">{activity.patient}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                    <Badge variant={
                      activity.status === 'success' ? 'default' :
                      activity.status === 'warning' ? 'destructive' : 'secondary'
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
