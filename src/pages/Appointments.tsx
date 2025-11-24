import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, Plus, Search, User, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Appointments() {
    const [date, setDate] = useState<Date>();
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);

    // Mock data
    const appointments = [
        {
            id: 1,
            patientName: 'John Doe',
            doctorName: 'Dr. Sarah Smith',
            date: '2024-03-20',
            time: '09:00 AM',
            type: 'Check-up',
            status: 'Scheduled',
        },
        {
            id: 2,
            patientName: 'Jane Wilson',
            doctorName: 'Dr. Mike Johnson',
            date: '2024-03-20',
            time: '10:30 AM',
            type: 'Follow-up',
            status: 'In Progress',
        },
        {
            id: 3,
            patientName: 'Robert Brown',
            doctorName: 'Dr. Sarah Smith',
            date: '2024-03-20',
            time: '02:00 PM',
            type: 'Consultation',
            status: 'Completed',
        },
    ];

    const handleBookAppointment = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        toast.success('Appointment booked successfully!');
        setIsNewAppointmentOpen(false);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Appointments</h1>
                        <p className="text-muted-foreground">Manage patient appointments and schedules</p>
                    </div>
                    <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New Appointment
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Book Appointment</DialogTitle>
                                <DialogDescription>
                                    Schedule a new appointment for a patient.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleBookAppointment} className="space-y-4">
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
                                    <Label htmlFor="doctor">Doctor</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select doctor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dr-smith">Dr. Sarah Smith (Cardiology)</SelectItem>
                                            <SelectItem value="dr-johnson">Dr. Mike Johnson (General)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time">Time</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="09:00">09:00 AM</SelectItem>
                                            <SelectItem value="10:00">10:00 AM</SelectItem>
                                            <SelectItem value="11:00">11:00 AM</SelectItem>
                                            <SelectItem value="14:00">02:00 PM</SelectItem>
                                            <SelectItem value="15:00">03:00 PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Book Appointment</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search appointments..." className="pl-9" />
                    </div>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {appointments.map((apt) => (
                        <Card key={apt.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {apt.type}
                                </CardTitle>
                                <Badge variant={
                                    apt.status === 'Scheduled' ? 'default' :
                                        apt.status === 'In Progress' ? 'secondary' :
                                            'outline'
                                }>
                                    {apt.status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 mt-2">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-semibold">{apt.patientName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                                        <span>{apt.doctorName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>{apt.date}</span>
                                        <Clock className="h-4 w-4 ml-2" />
                                        <span>{apt.time}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
