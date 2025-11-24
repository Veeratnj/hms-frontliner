import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Stethoscope, Star, Clock, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Doctors() {
    const doctors = [
        {
            id: 1,
            name: 'Dr. Sarah Smith',
            specialty: 'Cardiology',
            experience: '12 years',
            rating: 4.8,
            patients: '1.2k+',
            availability: 'Available Today',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop',
        },
        {
            id: 2,
            name: 'Dr. Mike Johnson',
            specialty: 'General Medicine',
            experience: '8 years',
            rating: 4.5,
            patients: '800+',
            availability: 'Next Available: Tomorrow',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
        },
        {
            id: 3,
            name: 'Dr. Emily Chen',
            specialty: 'Pediatrics',
            experience: '15 years',
            rating: 4.9,
            patients: '2k+',
            availability: 'Available Today',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop',
        },
        {
            id: 4,
            name: 'Dr. James Wilson',
            specialty: 'Neurology',
            experience: '20 years',
            rating: 4.9,
            patients: '1.5k+',
            availability: 'On Leave',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&h=200&auto=format&fit=crop',
        },
    ];

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Our Doctors</h1>
                        <p className="text-muted-foreground">Meet our team of specialized healthcare professionals</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search by name or specialty..." className="pl-9" />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {doctors.map((doctor) => (
                        <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardHeader className="p-0">
                                <div className="h-32 bg-primary/10 relative">
                                    <div className="absolute -bottom-12 left-6">
                                        <Avatar className="h-24 w-24 border-4 border-background">
                                            <AvatarImage src={doctor.image} alt={doctor.name} />
                                            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-14 pb-6 px-6 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Stethoscope className="h-4 w-4" />
                                        <span className="text-sm">{doctor.specialty}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-medium">{doctor.rating}</span>
                                    </div>
                                    <div className="text-muted-foreground">{doctor.experience} Exp.</div>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className={doctor.availability.includes('Available Today') ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
                                        {doctor.availability}
                                    </span>
                                </div>

                                <Button className="w-full" variant="outline">View Profile</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
