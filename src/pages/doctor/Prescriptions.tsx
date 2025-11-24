import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, FileText, Pill, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function Prescriptions() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [search, setSearch] = useState('');

    // Mock data
    const prescriptions = [
        { id: 'RX-2024-001', patient: 'John Doe', date: '2024-03-20', medicines: 'Amoxicillin 500mg', status: 'Active' },
        { id: 'RX-2024-002', patient: 'Jane Wilson', date: '2024-03-19', medicines: 'Paracetamol 650mg', status: 'Completed' },
        { id: 'RX-2024-003', patient: 'Robert Brown', date: '2024-03-18', medicines: 'Metformin 500mg', status: 'Active' },
    ];

    const handleAddPrescription = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Prescription created successfully!');
        setIsAddDialogOpen(false);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Prescriptions</h1>
                        <p className="text-muted-foreground">Manage patient prescriptions</p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New Prescription
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Create Prescription</DialogTitle>
                                <DialogDescription>
                                    Issue a new prescription for a patient.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddPrescription} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="patient">Patient</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select patient" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">John Doe</SelectItem>
                                            <SelectItem value="2">Jane Wilson</SelectItem>
                                            <SelectItem value="3">Robert Brown</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="medicines">Medicines</Label>
                                    <Textarea id="medicines" placeholder="Enter medicines and dosage..." required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea id="notes" placeholder="Additional instructions..." />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Issue Prescription</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Prescriptions</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{prescriptions.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active</CardTitle>
                            <Pill className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {prescriptions.filter(p => p.status === 'Active').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Today's Issues</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search prescriptions..."
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
                                    <TableHead>Prescription ID</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Medicines</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {prescriptions.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.id}</TableCell>
                                        <TableCell>{p.patient}</TableCell>
                                        <TableCell>{p.date}</TableCell>
                                        <TableCell>{p.medicines}</TableCell>
                                        <TableCell>{p.status}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">View</Button>
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
