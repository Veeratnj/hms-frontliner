import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock login - replace with actual API call
      const mockResponse = {
        status: 'success',
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: 1,
          name: email.includes('admin') ? 'Admin User' : 
                email.includes('doctor') ? 'Dr. Smith' :
                email.includes('nurse') ? 'Nurse Johnson' :
                email.includes('pharmacy') ? 'Pharmacist Lee' :
                email.includes('lab') ? 'Lab Tech Kumar' :
                email.includes('billing') ? 'Billing Staff' : 'Receptionist',
          email: email,
          role: email.includes('admin') ? 'admin' :
                email.includes('doctor') ? 'doctor' :
                email.includes('nurse') ? 'nurse' :
                email.includes('pharmacy') ? 'pharmacy' :
                email.includes('lab') ? 'lab' :
                email.includes('billing') ? 'billing' : 'receptionist',
        },
      };

      // Uncomment for actual API call:
      // const response = await api.post('/auth/login', { email, password });
      // const data = response.data;

      login(mockResponse.user as any, mockResponse.token, mockResponse.refreshToken);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Activity className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">MediCare HMS</CardTitle>
          <CardDescription>
            Sign in to access the Hospital Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 space-y-2 rounded-lg bg-muted p-4 text-sm">
            <p className="font-medium">Demo Accounts:</p>
            <p className="text-muted-foreground">admin@hospital.com - Admin</p>
            <p className="text-muted-foreground">doctor@hospital.com - Doctor</p>
            <p className="text-muted-foreground">nurse@hospital.com - Nurse</p>
            <p className="text-muted-foreground">pharmacy@hospital.com - Pharmacy</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
