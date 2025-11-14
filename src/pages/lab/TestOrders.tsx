import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, FlaskConical, Upload } from 'lucide-react';

interface TestOrder {
  id: number;
  patientName: string;
  testName: string;
  orderedBy: string;
  status: 'pending' | 'completed' | 'in-progress';
  orderedAt: string;
}

export default function LabTestOrders() {
  const [orders, setOrders] = useState<TestOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const mockOrders: TestOrder[] = [
        { id: 1, patientName: 'John Doe', testName: 'Blood CBC', orderedBy: 'Dr. Smith', status: 'pending', orderedAt: '10:30 AM' },
        { id: 2, patientName: 'Maria Thomas', testName: 'Lipid Profile', orderedBy: 'Dr. Johnson', status: 'in-progress', orderedAt: '09:15 AM' },
        { id: 3, patientName: 'Robert Lee', testName: 'Thyroid Panel', orderedBy: 'Dr. Smith', status: 'completed', orderedAt: 'Yesterday' },
      ];

      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Test Orders</h1>
          <p className="text-muted-foreground">Manage laboratory test requests</p>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <Card><CardContent className="py-8 text-center">Loading orders...</CardContent></Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <FlaskConical className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{order.testName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{order.patientName}</span>
                        <span>•</span>
                        <span>Ordered by {order.orderedBy}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{order.orderedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        order.status === 'completed' ? 'default' :
                        order.status === 'in-progress' ? 'secondary' : 'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                    {order.status !== 'completed' && (
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Results
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
