import React, { useState } from 'react';
import {
    Barcode,
    Search,
    Plus,
    Trash2,
    Save,
    Printer,
    Truck,
    CalendarIcon,
    ArrowRightLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useData } from '@/contexts/DataContext';
import { PurchaseItem, Purchase } from '@/types';
import { useEffect } from 'react';
import { toast } from 'sonner';

const PurchaseEntry: React.FC = () => {
    const { suppliers, sarees, addPurchase } = useData();
    const [items, setItems] = useState<PurchaseItem[]>([]);
    const [supplier, setSupplier] = useState('');
    const [billNo, setBillNo] = useState('');
    const [purchaseType, setPurchaseType] = useState('gst');
    const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);

    // Item Entry State
    const [barcode, setBarcode] = useState('');
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [qty, setQty] = useState(1);
    const [costPrice, setCostPrice] = useState(0);
    const [mrp, setMrp] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);

    // Auto-fill on barcode match
    useEffect(() => {
        if (barcode) {
            const found = sarees.find(s => s.barcode === barcode || s.sareeCode === barcode);
            if (found) {
                setItemName(found.name);
                setCategory(found.category);
                setCostPrice(found.purchasePrice);
                setMrp(found.mrp);
                setSellingPrice(found.sellingPrice);
            }
        }
    }, [barcode, sarees]);

    const handleAddItem = () => {
        if (!itemName || costPrice <= 0) {
            toast.error('Please enter valid product details');
            return;
        }

        const newItem: PurchaseItem = {
            id: Math.random().toString(36).substr(2, 9),
            barcode: barcode || `GEN-${Date.now().toString().slice(-6)}`,
            name: itemName,
            category,
            qty,
            costPrice,
            mrp,
            sellingPrice,
            totalCost: qty * costPrice,
        };

        setItems([...items, newItem]);
        resetEntryForm();
        toast.success('Item added to purchase list');
    };

    const resetEntryForm = () => {
        setBarcode('');
        setItemName('');
        setCategory('');
        setQty(1);
        setCostPrice(0);
        setMrp(0);
        setSellingPrice(0);
    };

    const handleRemoveItem = (id: string) => {
        setItems(items.filter((i) => i.id !== id));
    };

    const [paidAmount, setPaidAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Filter/Search History
    const [historySearch, setHistorySearch] = useState('');

    // Fetch history
    const fetchHistory = async () => {
        setIsRefreshing(true);
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockHistory = [
                { id: 'p1', billNo: 'PUR-2024-001', date: '2024-03-15', supplierName: 'Kanchipuram Silks Ltd', totalAmount: 45000, paidAmount: 30000, paymentStatus: 'Partial' },
                { id: 'p2', billNo: 'PUR-2024-002', date: '2024-03-18', supplierName: 'Varanasi Weavers', totalAmount: 28000, paidAmount: 28000, paymentStatus: 'Paid' }
            ];
            
            setPurchaseHistory(mockHistory);
        } catch (error) {
            toast.error('Failed to load purchase history');
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleSavePurchase = async () => {
        if (items.length === 0 || !supplier || !billNo) {
            toast.error('Please fill all bill details and add items');
            return;
        }

        const supplierObj = suppliers.find(s => s.id === supplier);

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            toast.success('Purchase entry saved successfully! (Mock)');
            setItems([]);
            setSupplier('');
            setBillNo('');
            setPaidAmount(0);
            fetchHistory(); // Refresh history
        } catch (error) {
            toast.error('Network error while saving');
        }
    };

    const handleUpdatePayment = async (purchaseId: string, amount: number, method: string) => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success('Payment updated successfully (Mock)');
            fetchHistory();
        } catch (error) {
            toast.error('Error updating payment');
        }
    };

    const totalAmount = items.reduce((sum, item) => sum + (item.totalCost || 0), 0);

    return (
        <div className="flex flex-col gap-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 left-0 w-96 h-96 bg-silk-gold/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col gap-2 px-1">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Stock <span className="text-silk-gold">Acquisition</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Inward Ledger & Supplier Settlement</p>
            </div>

            <Tabs defaultValue="new" className="w-full">
                <TabsList className="h-14 p-1.5 rounded-2xl bg-slate-100/50 backdrop-blur-sm border border-white/20 shadow-sm mb-8 inline-flex">
                    <TabsTrigger 
                        value="new" 
                        className="rounded-xl px-8 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg transition-all"
                    >
                        New Purchase Entry
                    </TabsTrigger>
                    <TabsTrigger 
                        value="history" 
                        onClick={fetchHistory}
                        className="rounded-xl px-8 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg transition-all"
                    >
                        Acquisition History & Credits
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="new">
                    <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
                        <div className="space-y-6">
                            {/* Supplier & Bill Details */}
                            <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 overflow-hidden">
                                <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent">
                                    <CardTitle className="font-display text-xl font-bold flex items-center gap-3 text-slate-900">
                                        <Truck className="h-5 w-5 text-silk-gold" /> Supplier Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trade Partner</Label>
                                            <Select value={supplier} onValueChange={setSupplier}>
                                                <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold focus:bg-white focus:ring-silk-gold transition-all">
                                                    <SelectValue placeholder="Select Supplier" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                                    {suppliers.map(s => (
                                                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Invoice Reference</Label>
                                                <Input
                                                    placeholder="e.g. INV-9021"
                                                    value={billNo}
                                                    onChange={(e) => setBillNo(e.target.value)}
                                                    className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold focus:bg-white focus:ring-silk-gold transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Acquisition Date</Label>
                                                <div className="relative">
                                                    <CalendarIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                    <Input type="date" className="h-12 pl-11 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold focus:bg-white focus:ring-silk-gold transition-all" value={billDate} onChange={e => setBillDate(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                                <Plus size={14} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Taxation Preference</p>
                                                <p className="text-xs font-bold text-slate-600">Select how taxes are applied to this entry</p>
                                            </div>
                                        </div>
                                        <Select value={purchaseType} onValueChange={setPurchaseType}>
                                            <SelectTrigger className="w-48 h-10 rounded-xl border-indigo-100 bg-white font-black text-[10px] uppercase tracking-wider">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-0 shadow-2xl">
                                                <SelectItem value="gst">GST COMPLIANT</SelectItem>
                                                <SelectItem value="nongst">NON-GST / CASH</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Item Entry */}
                            <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 overflow-hidden">
                                <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent">
                                    <CardTitle className="font-display text-xl font-bold flex items-center gap-3 text-slate-900">
                                        <Plus className="h-5 w-5 text-silk-gold" /> Product Enrollment
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-1 space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 text-silk-gold">Identity Reference</Label>
                                                <div className="relative group">
                                                    <Barcode className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-silk-gold transition-colors" />
                                                    <Input
                                                        placeholder="Scan barcode..."
                                                        value={barcode}
                                                        onChange={(e) => setBarcode(e.target.value)}
                                                        className="h-12 pl-11 rounded-2xl border-silk-gold/20 bg-gold-50/10 font-mono text-sm focus:bg-white focus:ring-silk-gold transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Classification</Label>
                                                <Select value={category} onValueChange={setCategory}>
                                                    <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold">
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                                        <SelectItem value="Silk">Silk</SelectItem>
                                                        <SelectItem value="Cotton">Cotton</SelectItem>
                                                        <SelectItem value="Fancy">Fancy</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        
                                        <div className="lg:col-span-2 space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Designation & Description</Label>
                                                <Input
                                                    placeholder="Enter product details..."
                                                    value={itemName}
                                                    onChange={(e) => setItemName(e.target.value)}
                                                    className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold focus:bg-white focus:ring-silk-gold transition-all"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Acq. Cost</Label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                                                        <Input
                                                            type="number"
                                                            value={costPrice}
                                                            onChange={(e) => setCostPrice(Number(e.target.value))}
                                                            className="h-12 pl-6 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">M.R.P</Label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                                                        <Input
                                                            type="number"
                                                            value={mrp}
                                                            onChange={(e) => setMrp(Number(e.target.value))}
                                                            className="h-12 pl-6 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Retail</Label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-silk-gold text-xs font-bold">₹</span>
                                                        <Input
                                                            type="number"
                                                            value={sellingPrice}
                                                            onChange={(e) => setSellingPrice(Number(e.target.value))}
                                                            className="h-12 pl-6 rounded-2xl border-silk-gold/20 bg-gold-50/30 text-silk-gold font-bold"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantity</Label>
                                                    <Input
                                                        type="number"
                                                        value={qty}
                                                        onChange={(e) => setQty(Number(e.target.value))}
                                                        className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <Button onClick={handleAddItem} className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl transition-all active:scale-95">
                                            Append to Acquisition List
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Items Table */}
                            <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 overflow-hidden">
                                <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="font-display text-xl font-bold text-slate-900">Acquisition List</CardTitle>
                                        <Badge variant="outline" className="rounded-xl px-3 py-1 bg-indigo-50 border-indigo-100 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                                            {items.length} Entries
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-slate-50/50 border-b border-glass">
                                                <TableHead className="pl-8 h-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Reference</TableHead>
                                                <TableHead className="h-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Designation</TableHead>
                                                <TableHead className="h-12 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Acq. Cost</TableHead>
                                                <TableHead className="h-12 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Retail</TableHead>
                                                <TableHead className="h-12 text-center font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Qty</TableHead>
                                                <TableHead className="h-12 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Subtotal</TableHead>
                                                <TableHead className="pr-8 w-[60px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {items.map((item) => (
                                                <TableRow key={item.id} className="border-b border-indigo-50/50 group transition-all hover:bg-indigo-50/30">
                                                    <TableCell className="pl-8 py-4 font-mono text-[10px] font-black text-slate-400 group-hover:text-silk-gold transition-colors">{item.barcode}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-900 group-hover:text-silk-gold transition-colors">{item.name}</span>
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{item.category}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-xs font-bold text-slate-600">₹{item.costPrice.toLocaleString()}</span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-xs font-bold text-silk-gold">₹{item.sellingPrice.toLocaleString()}</span>
                                                    </TableCell>
                                                    <TableCell className="text-center font-black text-slate-900">{item.qty}</TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-sm font-black text-slate-900">₹{item.totalCost.toLocaleString()}</span>
                                                    </TableCell>
                                                    <TableCell className="pr-8">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                            onClick={() => handleRemoveItem(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {items.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="h-48 text-center">
                                                        <div className="flex flex-col items-center gap-3 opacity-20">
                                                            <Truck size={48} className="text-slate-400" />
                                                            <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Awaiting Product Enrollment</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Summary Panel */}
                        <div className="space-y-6">
                            <Card className="glass-card border-0 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 sticky top-20 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-silk-gold via-amber-200 to-silk-gold" />
                                <CardHeader className="p-8 pb-4">
                                    <CardTitle className="font-display text-xl font-bold flex items-center justify-between">
                                        Summary
                                        <Badge className="bg-slate-900 text-white border-0 font-black text-[9px] px-2">FINAL</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 pt-0 space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center group">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">Aggregate Qty</span>
                                            <span className="font-black text-slate-900">{items.reduce((sum, i) => sum + i.qty, 0)} Units</span>
                                        </div>
                                        <div className="flex justify-between items-end p-4 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/10 group overflow-hidden relative">
                                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent)]" />
                                            <div className="relative z-10 transition-transform group-hover:translate-x-1">
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Total Valuation</p>
                                                <p className="text-2xl font-black font-display tracking-tight mt-1">₹{(totalAmount || 0).toLocaleString()}</p>
                                            </div>
                                            <Truck size={40} className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 pt-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-silk-gold rounded-full" />
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-800">Settlement Details</Label>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-bold text-slate-500 ml-1">Initial Disbursement</Label>
                                            <div className="relative group">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold group-focus-within:text-silk-gold transition-colors">₹</span>
                                                <Input
                                                    type="number"
                                                    value={paidAmount}
                                                    onChange={e => setPaidAmount(Number(e.target.value))}
                                                    className="h-12 pl-8 rounded-2xl border-indigo-50 bg-slate-50/50 font-black text-lg focus:bg-white focus:ring-silk-gold transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-bold text-slate-500 ml-1">Payment Instrument</Label>
                                            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                                <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                                    <SelectItem value="Cash">LIQUID CASH</SelectItem>
                                                    <SelectItem value="UPI">UPI / DIGITAL</SelectItem>
                                                    <SelectItem value="Bank Transfer">BANK WIRE</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-4 rounded-2xl bg-red-50/50 border border-red-100 mt-6">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-red-400">Credit Balance</span>
                                                <span className="text-xl font-black text-red-600">₹{(totalAmount - paidAmount).toLocaleString()}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                                                <ArrowRightLeft size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Button size="lg" onClick={handleSavePurchase} className="premium-btn w-full h-14 rounded-2xl shadow-xl hover:shadow-silk-gold/20 transition-all active:scale-[0.98]">
                                            <Save className="mr-3 h-5 w-5" />
                                            Communicate Ledger
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 overflow-hidden">
                        <CardHeader className="p-8 pb-4 border-b border-glass bg-slate-50/30">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="font-display text-xl font-bold text-slate-900">Acquisition Ledger</CardTitle>
                                    <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Audit Trail & Credit Settlement</CardDescription>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="relative group">
                                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-silk-gold transition-colors" />
                                        <Input
                                            placeholder="Audit Search..."
                                            className="h-10 pl-11 w-64 rounded-xl border-indigo-50 bg-white font-bold text-sm focus:ring-silk-gold transition-all"
                                            value={historySearch}
                                            onChange={e => setHistorySearch(e.target.value)}
                                        />
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={fetchHistory} 
                                        disabled={isRefreshing}
                                        className="h-10 rounded-xl border-indigo-100 bg-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all"
                                    >
                                        {isRefreshing ? 'Syncing...' : 'Refresh Logs'}
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 border-b border-glass">
                                        <TableHead className="pl-8 h-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Date</TableHead>
                                        <TableHead className="h-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Reference</TableHead>
                                        <TableHead className="h-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Trade Partner</TableHead>
                                        <TableHead className="h-12 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Aggregate</TableHead>
                                        <TableHead className="h-12 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Disbursed</TableHead>
                                        <TableHead className="h-12 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Credit Balance</TableHead>
                                        <TableHead className="h-12 text-center font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Standing</TableHead>
                                        <TableHead className="pr-8 w-[120px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {purchaseHistory
                                        .filter(p => p.billNo.toLowerCase().includes(historySearch.toLowerCase()) || p.supplierName.toLowerCase().includes(historySearch.toLowerCase()))
                                        .map((p) => {
                                            const due = p.totalAmount - p.paidAmount;
                                            return (
                                                <TableRow key={p.id || p._id} className="border-b border-indigo-50/50 group transition-all hover:bg-slate-50/50">
                                                    <TableCell className="pl-8 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-slate-900">{p.date}</span>
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">POSTED</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-[10px] font-black text-slate-400 group-hover:text-silk-gold transition-colors">{p.billNo}</TableCell>
                                                    <TableCell>
                                                        <span className="font-bold text-slate-900">{p.supplierName}</span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-xs font-bold text-slate-600">₹{(p.totalAmount || 0).toLocaleString()}</span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-xs font-black text-emerald-600">₹{(p.paidAmount || 0).toLocaleString()}</span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className={cn(
                                                            "text-sm font-black",
                                                            due > 0 ? "text-red-500" : "text-slate-400"
                                                        )}>₹{(due || 0).toLocaleString()}</span>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge 
                                                            variant="outline"
                                                            className={cn(
                                                                "rounded-xl border-0 font-black text-[9px] uppercase px-3 py-1 shadow-sm",
                                                                p.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                                                                p.paymentStatus === 'Partial' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                                            )}
                                                        >
                                                            {p.paymentStatus}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="pr-8">
                                                        <div className="flex justify-end">
                                                            {due > 0 && (
                                                                <PaymentUpdateDialog purchase={p} onUpdate={handleUpdatePayment} />
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

const PaymentUpdateDialog: React.FC<{ purchase: any, onUpdate: (id: string, amt: number, method: string) => void }> = ({ purchase, onUpdate }) => {
    const [amount, setAmount] = useState(0);
    const [method, setMethod] = useState('UPI');
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-9 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest shadow-lg transition-all active:scale-95">Record Settlement</Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] border-0 shadow-2xl p-0 overflow-hidden max-w-md">
                <div className="h-2 bg-gradient-to-r from-silk-gold to-amber-200" />
                <div className="p-8">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <ArrowRightLeft size={20} />
                            </div>
                            <div>
                                <DialogTitle className="font-display text-xl font-bold">Inward Settlement</DialogTitle>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">CREDIT CLEARANCE: {purchase.billNo}</p>
                            </div>
                        </div>
                        <DialogDescription className="text-xs font-bold text-slate-600 leading-relaxed">
                            Recording disbursement to <span className="text-slate-900 underline decoration-silk-gold underline-offset-4">{purchase.supplierName}</span>. 
                            Outstanding Balance: <span className="text-red-600">₹{(purchase.totalAmount - purchase.paidAmount).toLocaleString()}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-8">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Disbursement Amount</Label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold group-focus-within:text-silk-gold transition-colors">₹</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="h-14 pl-8 rounded-2xl border-indigo-50 bg-slate-50/50 font-black text-2xl focus:bg-white focus:ring-silk-gold transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Settlement Channel</Label>
                            <Select value={method} onValueChange={setMethod}>
                                <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                    <SelectItem value="Cash">LIQUID CASH</SelectItem>
                                    <SelectItem value="UPI">UPI / DIGITAL</SelectItem>
                                    <SelectItem value="Bank Transfer">BANK WIRE</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="premium-btn w-full h-14 rounded-2xl shadow-xl transition-all active:scale-[0.98]" onClick={() => {
                            onUpdate(purchase.id || purchase._id, amount, method);
                            setOpen(false);
                        }}>
                            Confirm Disbursement
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PurchaseEntry;
