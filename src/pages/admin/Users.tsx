import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Shield, UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import { UserRole } from '@/store/authStore';

interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  department?: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const mockUsers: SystemUser[] = [
        { id: 1, name: 'Dr. Sarah Smith', email: 'sarah.smith@hospital.com', role: 'doctor', status: 'active', department: 'Cardiology' },
        { id: 2, name: 'Nurse Emma Johnson', email: 'emma.j@hospital.com', role: 'nurse', status: 'active', department: 'Emergency' },
        { id: 3, name: 'John Receptionist', email: 'john.r@hospital.com', role: 'receptionist', status: 'active', department: 'Front Desk' },
        { id: 4, name: 'Mike Pharmacy', email: 'mike.p@hospital.com', role: 'pharmacy', status: 'active', department: 'Pharmacy' },
        { id: 5, name: 'Lab Tech Alice', email: 'alice.lab@hospital.com', role: 'lab', status: 'active', department: 'Laboratory' },
        { id: 6, name: 'Billing Staff Robert', email: 'robert.b@hospital.com', role: 'billing', status: 'active', department: 'Billing' },
        { id: 7, name: 'Dr. Michael Brown', email: 'michael.b@hospital.com', role: 'doctor', status: 'inactive', department: 'Neurology' },
        { id: 8, name: 'Admin User', email: 'admin@hospital.com', role: 'admin', status: 'active', department: 'Administration' },
      ];

      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'default';
      case 'doctor': return 'secondary';
      default: return 'outline';
    }
  };

  const activeUsers = users.filter(u => u.status === 'active').length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-info" />
                <div>
                  <p className="text-sm text-muted-foreground">Doctors</p>
                  <p className="text-2xl font-bold">{users.filter(u => u.role === 'doctor').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Staff</p>
                  <p className="text-2xl font-bold">{users.filter(u => u.role !== 'doctor' && u.role !== 'admin').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <Card><CardContent className="py-8 text-center">Loading users...</CardContent></Card>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      {user.department && (
                        <p className="text-sm text-muted-foreground mt-1">{user.department}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
