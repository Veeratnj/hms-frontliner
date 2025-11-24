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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Activity, Heart, Thermometer, Weight } from 'lucide-react';
import { toast } from 'sonner';

export default function Vitals() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [search, setSearch] = useState('');

    // Mock data
    const vitals = [
        { id: 1, patient: 'John Doe', bp: '120/80', heartRate: '72', temp: '98.6', weight: '75', date: '2024-03-20 09:00 AM' },
        { id: 2, patient: 'Jane Wilson', bp: '130/85', heartRate: '78', temp: '99.1', weight: '65', date: '2024-03-20 09:30 AM' },
        { id: 3, patient: 'Robert Brown', bp: '118/75', heartRate: '68', temp: '98.4', weight: '82', date: '2024-03-20 10:00 AM' },
    ];

    const handleAddVitals = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Vitals recorded successfully!');
        setIsAddDialogOpen(false);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Patient Vitals</h1>
                        <p className="text-muted-foreground">Record and monitor patient vital signs</p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Record Vitals
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Record Vitals</DialogTitle>
                                <DialogDescription>
                                    Enter current vital signs for the patient.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddVitals} className="space-y-4">
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bp">Blood Pressure</Label>
                                        <Input id="bp" placeholder="120/80" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hr">Heart Rate (bpm)</Label>
                                        <Input id="hr" placeholder="72" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="temp">Temperature (°F)</Label>
                                        <Input id="temp" placeholder="98.6" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="weight">Weight (kg)</Label>
                                        <Input id="weight" placeholder="75" required />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save Records</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg BP</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">120/80</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Heart Rate</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">72 bpm</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Temp</CardTitle>
                            <Thermometer className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">98.6°F</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Checkups Today</CardTitle>
                            <Weight className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search records..."
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
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>BP (mmHg)</TableHead>
                                    <TableHead>Heart Rate (bpm)</TableHead>
                                    <TableHead>Temp (°F)</TableHead>
                                    <TableHead>Weight (kg)</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vitals.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell className="font-medium">{record.patient}</TableCell>
                                        <TableCell>{record.bp}</TableCell>
                                        <TableCell>{record.heartRate}</TableCell>
                                        <TableCell>{record.temp}</TableCell>
                                        <TableCell>{record.weight}</TableCell>
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
