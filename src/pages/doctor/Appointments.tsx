import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, FileText } from 'lucide-react';
import api from '@/services/api';

interface Appointment {
  id: number;
  patientName: string;
  time: string;
  reason: string;
  status?: string;
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // Mock data
      const mockAppointments: Appointment[] = [
        { id: 1, patientName: 'John Doe', time: '10:30 AM', reason: 'Fever & Cough', status: 'pending' },
        { id: 2, patientName: 'Maria Thomas', time: '11:00 AM', reason: 'Diabetes Followup', status: 'pending' },
        { id: 3, patientName: 'Robert Lee', time: '11:30 AM', reason: 'Blood Pressure Check', status: 'completed' },
        { id: 4, patientName: 'Sarah Wilson', time: '02:00 PM', reason: 'Annual Checkup', status: 'pending' },
      ];

      // Uncomment for API: const response = await api.get('/doctor/appointments/today');
      setAppointments(mockAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Today's Appointments</h1>
          <p className="text-muted-foreground">Manage your patient consultations</p>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <Card><CardContent className="py-8 text-center">Loading appointments...</CardContent></Card>
          ) : (
            appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.patientName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{appointment.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={appointment.status === 'completed' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                    {appointment.status !== 'completed' && (
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Start Consultation
                      </Button>
                    )}
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
