import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Pill, Search, CheckCircle } from 'lucide-react';

export default function DispenseMedicine() {
    const [prescriptionId, setPrescriptionId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API search
        setTimeout(() => {
            setLoading(false);
            if (prescriptionId) {
                toast.success('Prescription found!');
            } else {
                toast.error('Please enter a prescription ID');
            }
        }, 1000);
    };

    const handleDispense = () => {
        toast.success('Medicine dispensed successfully!');
        setPrescriptionId('');
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Dispense Medicine</h1>
                    <p className="text-muted-foreground">Process prescriptions and dispense medication</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Prescription</CardTitle>
                            <CardDescription>Enter the prescription ID to view details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="prescriptionId" className="sr-only">Prescription ID</Label>
                                    <Input
                                        id="prescriptionId"
                                        placeholder="Enter Prescription ID (e.g. RX-2024-001)"
                                        value={prescriptionId}
                                        onChange={(e) => setPrescriptionId(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" disabled={loading}>
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {prescriptionId && !loading && (
                        <Card className="border-primary">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Pill className="h-5 w-5 text-primary" />
                                    Prescription Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Patient Name</p>
                                        <p className="font-medium">John Doe</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Doctor</p>
                                        <p className="font-medium">Dr. Sarah Smith</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Date</p>
                                        <p className="font-medium">2024-03-20</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Status</p>
                                        <p className="font-medium text-green-600">Active</p>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-muted p-4">
                                    <p className="font-semibold mb-2">Medicines:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>Amoxicillin 500mg - 1 strip</li>
                                        <li>Paracetamol 650mg - 10 tablets</li>
                                        <li>Vitamin C - 1 bottle</li>
                                    </ul>
                                </div>

                                <Button className="w-full" onClick={handleDispense}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Confirm & Dispense
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
