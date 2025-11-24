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
import { Badge } from '@/components/ui/badge';
import { Search, AlertTriangle, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StockManagement() {
    const [search, setSearch] = useState('');

    // Mock data
    const stockItems = [
        { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotics', quantity: 500, unit: 'strips', status: 'In Stock', lastUpdated: '2024-03-15' },
        { id: 2, name: 'Paracetamol 650mg', category: 'Analgesics', quantity: 1200, unit: 'strips', status: 'In Stock', lastUpdated: '2024-03-18' },
        { id: 3, name: 'Insulin Glargine', category: 'Diabetes', quantity: 15, unit: 'vials', status: 'Low Stock', lastUpdated: '2024-03-20' },
        { id: 4, name: 'Aspirin 75mg', category: 'Blood Thinners', quantity: 50, unit: 'strips', status: 'Low Stock', lastUpdated: '2024-03-10' },
        { id: 5, name: 'Vitamin D3', category: 'Supplements', quantity: 300, unit: 'bottles', status: 'In Stock', lastUpdated: '2024-03-12' },
    ];

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Stock Management</h1>
                        <p className="text-muted-foreground">Monitor inventory levels and stock movements</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <ArrowDownRight className="mr-2 h-4 w-4" />
                            Stock In
                        </Button>
                        <Button variant="outline">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Stock Out
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stockItems.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-destructive">
                                {stockItems.filter(i => i.status === 'Low Stock').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search stock..."
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
                                    <TableHead>Item Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stockItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.status === 'In Stock' ? 'default' : 'destructive'}>
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{item.lastUpdated}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Update</Button>
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
