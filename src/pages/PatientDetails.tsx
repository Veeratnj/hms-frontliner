import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, FileText, Activity, Phone, Mail, MapPin, Edit } from 'lucide-react';

export default function PatientDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data - replace with API call
    const patient = {
        id: id,
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        phone: '9876543210',
        email: 'john.doe@example.com',
        address: '123 Main St, Cityville, State, 12345',
        bloodGroup: 'O+',
        status: 'Active',
        emergencyContact: {
            name: 'Jane Doe',
            phone: '9876543211',
            relation: 'Spouse'
        },
        lastVisit: '2024-03-15',
        nextAppointment: '2024-04-20',
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">{patient.name}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span>Patient ID: #{patient.id}</span>
                                <span>•</span>
                                <span>{patient.age} years</span>
                                <span>•</span>
                                <span>{patient.gender}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                        </Button>
                        <Button>
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Appointment
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Quick Info Card */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{patient.email}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                <span>{patient.address}</span>
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="font-semibold mb-2">Emergency Contact</h4>
                                <div className="space-y-1 text-sm">
                                    <p className="font-medium">{patient.emergencyContact.name}</p>
                                    <p className="text-muted-foreground">{patient.emergencyContact.relation}</p>
                                    <p>{patient.emergencyContact.phone}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="font-semibold mb-2">Medical Info</h4>
                                <div className="flex gap-2">
                                    <Badge variant="outline">Blood Group: {patient.bloodGroup}</Badge>
                                    <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                                        {patient.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content Tabs */}
                    <div className="md:col-span-2">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                                <TabsTrigger value="history">Medical History</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4 mt-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{patient.lastVisit}</div>
                                            <p className="text-xs text-muted-foreground">General Checkup</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{patient.nextAppointment}</div>
                                            <p className="text-xs text-muted-foreground">Follow-up with Dr. Smith</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Vitals</CardTitle>
                                        <CardDescription>Recorded on {patient.lastVisit}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">BP</p>
                                                <p className="font-semibold">120/80</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Heart Rate</p>
                                                <p className="font-semibold">72 bpm</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Temperature</p>
                                                <p className="font-semibold">98.6°F</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Weight</p>
                                                <p className="font-semibold">75 kg</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="appointments" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Appointment History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 text-muted-foreground">
                                            No past appointments found.
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="history" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Medical History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 text-muted-foreground">
                                            No medical history records found.
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
