import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Receipt, User, CreditCard, Download, Search } from 'lucide-react';

interface Bill {
  id: number;
  patientName: string;
  billNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'partial';
  date: string;
  type: 'OP' | 'IP';
}

export default function Billing() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const mockBills: Bill[] = [
        { id: 1, patientName: 'John Doe', billNumber: 'INV-2024-001', amount: 2500, status: 'paid', date: '2024-01-15', type: 'OP' },
        { id: 2, patientName: 'Maria Thomas', billNumber: 'INV-2024-002', amount: 15000, status: 'pending', date: '2024-01-16', type: 'IP' },
        { id: 3, patientName: 'Robert Lee', billNumber: 'INV-2024-003', amount: 3200, status: 'partial', date: '2024-01-16', type: 'OP' },
        { id: 4, patientName: 'Sarah Wilson', billNumber: 'INV-2024-004', amount: 1800, status: 'paid', date: '2024-01-17', type: 'OP' },
      ];

      setBills(mockBills);
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBills = bills.filter(bill =>
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0);
  const pendingAmount = bills.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.amount, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Billing & Invoices</h1>
          <p className="text-muted-foreground">Manage patient bills and payments</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Collected this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Receipt className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Due for collection</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <Receipt className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bills.length}</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or bill number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Receipt className="mr-2 h-4 w-4" />
            New Bill
          </Button>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <Card><CardContent className="py-8 text-center">Loading bills...</CardContent></Card>
          ) : (
            filteredBills.map((bill) => (
              <Card key={bill.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Receipt className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{bill.billNumber}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{bill.patientName}</span>
                        <span>•</span>
                        <span>{bill.date}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline">{bill.type}</Badge>
                        <span className="text-sm font-medium">₹{bill.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        bill.status === 'paid' ? 'default' :
                        bill.status === 'partial' ? 'secondary' : 'destructive'
                      }
                    >
                      {bill.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Invoice
                    </Button>
                    {bill.status !== 'paid' && (
                      <Button size="sm">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Collect
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
