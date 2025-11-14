import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, AlertTriangle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Medicine {
  id: number;
  name: string;
  stock: number;
  unit: string;
  lowStockThreshold?: number;
}

export default function PharmacyInventory() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      // Mock data
      const mockMedicines: Medicine[] = [
        { id: 10, name: 'Paracetamol 500mg', stock: 120, unit: 'tablet', lowStockThreshold: 50 },
        { id: 11, name: 'Amoxicillin 250mg', stock: 60, unit: 'capsule', lowStockThreshold: 40 },
        { id: 12, name: 'Aspirin 75mg', stock: 25, unit: 'tablet', lowStockThreshold: 30 },
        { id: 13, name: 'Ibuprofen 400mg', stock: 85, unit: 'tablet', lowStockThreshold: 50 },
        { id: 14, name: 'Metformin 500mg', stock: 15, unit: 'tablet', lowStockThreshold: 40 },
      ];

      setMedicines(mockMedicines);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  const isLowStock = (stock: number, threshold: number = 50) => stock < threshold;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Medicine Inventory</h1>
          <p className="text-muted-foreground">Manage pharmacy stock levels</p>
        </div>

        <Card>
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center">Loading inventory...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium">#{medicine.id}</TableCell>
                      <TableCell>{medicine.name}</TableCell>
                      <TableCell className="font-semibold">{medicine.stock}</TableCell>
                      <TableCell>{medicine.unit}</TableCell>
                      <TableCell>
                        {isLowStock(medicine.stock, medicine.lowStockThreshold) ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge variant="default">In Stock</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
