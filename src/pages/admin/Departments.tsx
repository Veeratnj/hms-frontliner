import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Building2, Users, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Departments() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [search, setSearch] = useState('');

    // Mock data
    const departments = [
        { id: 1, name: 'Cardiology', head: 'Dr. Sarah Smith', staffCount: 12, location: 'Block A, 2nd Floor' },
        { id: 2, name: 'Neurology', head: 'Dr. James Wilson', staffCount: 8, location: 'Block B, 1st Floor' },
        { id: 3, name: 'Pediatrics', head: 'Dr. Emily Chen', staffCount: 15, location: 'Block A, 1st Floor' },
        { id: 4, name: 'Orthopedics', head: 'Dr. Robert Brown', staffCount: 10, location: 'Block C, Ground Floor' },
        { id: 5, name: 'General Medicine', head: 'Dr. Mike Johnson', staffCount: 20, location: 'Block A, Ground Floor' },
    ];

    const handleAddDepartment = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Department added successfully!');
        setIsAddDialogOpen(false);
    };

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.head.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Departments</h1>
                        <p className="text-muted-foreground">Manage hospital departments and heads</p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Department
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Department</DialogTitle>
                                <DialogDescription>
                                    Create a new department in the hospital.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddDepartment} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Department Name</Label>
                                    <Input id="name" placeholder="e.g. Cardiology" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="head">Head of Department</Label>
                                    <Input id="head" placeholder="Select doctor..." required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" placeholder="e.g. Block A, 2nd Floor" required />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Add Department</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{departments.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {departments.reduce((acc, curr) => acc + curr.staffCount, 0)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Staff/Dept</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Math.round(departments.reduce((acc, curr) => acc + curr.staffCount, 0) / departments.length)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search departments..."
                                    className="pl-9"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Department Name</TableHead>
                                    <TableHead>Head of Department</TableHead>
                                    <TableHead>Staff Count</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDepartments.map((dept) => (
                                    <TableRow key={dept.id}>
                                        <TableCell className="font-medium">{dept.name}</TableCell>
                                        <TableCell>{dept.head}</TableCell>
                                        <TableCell>{dept.staffCount}</TableCell>
                                        <TableCell>{dept.location}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
