import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Edit,
    AlertTriangle,
    ArrowRightLeft,
    Tag,
    Download,
    Printer
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

import { useData } from '@/contexts/DataContext';
import { Saree } from '@/types';
import { cn } from '@/lib/utils';

const Inventory: React.FC = () => {
    const { sarees, updateSaree } = useData();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    const [editingItem, setEditingItem] = useState<Saree | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState<Partial<Saree>>({});

    const handleMarkDamaged = async (id: string, barcode: string) => {
        if (confirm(`Mark ${barcode} as Damaged? This will move it to damaged stock.`)) {
            await updateSaree(id, { status: 'damaged' });
            toast.success(`Marked ${barcode} as Damaged`);
        }
    };

    const handleEditClick = (item: Saree) => {
        setEditingItem(item);
        setEditForm({
            name: item.name,
            category: item.category,
            rackLocation: item.rackLocation,
            purchasePrice: item.purchasePrice,
            sellingPrice: item.sellingPrice,
            mrp: item.mrp
        });
        setIsEditOpen(true);
    };

    const handleSaveEdit = async () => {
        if (editingItem && editingItem.id) {
            await updateSaree(editingItem.id, editForm);
            setIsEditOpen(false);
            setEditingItem(null);
            toast.success('Stock details updated');
        }
    };

    const handleTransfer = (barcode: string) => {
        toast.info(`Transfer feature pending for ${barcode}`);
    };

    const filteredItems = sarees.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.barcode.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col gap-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 left-0 w-96 h-96 bg-silk-gold/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
                <div>
                    <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Inventory <span className="text-silk-gold">& Stock</span>
                    </h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time Warehouse Tracking</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-indigo-100 hover:bg-slate-50 transition-all shadow-sm font-bold" onClick={() => navigate('/billing')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Quick Bill
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-indigo-100 hover:bg-slate-50 transition-all shadow-sm font-bold">
                        <Printer className="mr-2 h-4 w-4" />
                        Print Tags
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-indigo-100 hover:bg-slate-50 transition-all shadow-sm font-bold">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all font-bold group" onClick={() => navigate('/products')}>
                        <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                        Add New Stock
                    </Button>
                </div>
            </div>

            <Card className="glass-card border-0 rounded-[2.5rem] overflow-hidden shadow-xl shadow-indigo-500/5">
                <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="font-display text-2xl font-bold text-slate-900">Stock Directory</CardTitle>
                            <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                Total Items: <span className="text-indigo-600">{filteredItems.reduce((sum, item) => sum + (item.stockQty || 0), 0)}</span> | 
                                Valuation: <span className="text-silk-gold">₹{filteredItems.reduce((sum, item) => sum + ((item.purchasePrice || 0) * (item.stockQty || 0)), 0).toLocaleString()}</span>
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative w-full sm:w-72 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-silk-gold transition-colors" size={16} />
                                <Input
                                    placeholder="Scan barcode or search name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-10 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all"
                                />
                            </div>
                            <Select value={filterCategory} onValueChange={setFilterCategory}>
                                <SelectTrigger className="w-[160px] h-10 rounded-2xl border-indigo-50 bg-slate-50/50">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="Silk">Silk</SelectItem>
                                    <SelectItem value="Soft Silk">Soft Silk</SelectItem>
                                    <SelectItem value="Cotton">Cotton</SelectItem>
                                    <SelectItem value="Fancy">Fancy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-indigo-50 hover:bg-transparent">
                                    <TableHead className="w-[140px] text-[10px] font-black uppercase tracking-widest text-slate-400 pl-8">Identity</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Details</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Location</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Pricing (₹)</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Availability</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right pr-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.map((item) => (
                                    <TableRow key={item.barcode} className="border-b border-indigo-50/50 group transition-all hover:bg-slate-50/50">
                                        <TableCell className="pl-8 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-mono text-[10px] font-black text-slate-400 group-hover:text-silk-gold transition-colors">{item.barcode}</span>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <Badge variant="outline" className="rounded-lg text-[8px] font-black uppercase px-1.5 py-0 border-indigo-100 bg-white shadow-sm">
                                                        {item.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 group-hover:text-silk-gold transition-colors">{item.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">EST. {item.addedDate}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-50 border border-indigo-50 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                                                <Tag size={10} className="text-silk-gold" />
                                                {item.rackLocation || 'UNSET'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm font-bold text-slate-900">₹{item.sellingPrice.toLocaleString()}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cost: ₹{item.purchasePrice.toLocaleString()}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <span className={cn(
                                                    "text-sm font-black",
                                                    item.stockQty <= 2 ? 'text-red-500' : 'text-slate-900'
                                                )}>
                                                    {item.stockQty} Units
                                                </span>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "rounded-xl border-0 font-black text-[9px] uppercase px-2 py-0.5 shadow-sm",
                                                        item.stockQty <= 0 ? 'bg-red-50 text-red-600' : 
                                                        item.status === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                    )}
                                                >
                                                    {item.stockQty <= 0 ? 'Stockout' : item.status}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="pr-8">
                                            <div className="flex justify-end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-10 w-10 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="rounded-2xl border-0 shadow-2xl p-2 bg-white/95 backdrop-blur-xl min-w-[180px]">
                                                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 px-3">Inventory Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleEditClick(item)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50 focus:text-indigo-600">
                                                            <Tag className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Update Price</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleEditClick(item)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50 focus:text-indigo-600">
                                                            <Edit className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Manage Stock</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleTransfer(item.barcode)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50 focus:text-indigo-600">
                                                            <ArrowRightLeft className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Transfer Branch</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="my-2 bg-black/5" />
                                                        <DropdownMenuItem
                                                            onClick={() => handleMarkDamaged(item.id || (item as any)._id, item.barcode)}
                                                            className="rounded-xl px-3 py-2 cursor-pointer focus:bg-red-50 focus:text-red-600 text-red-500"
                                                        >
                                                            <AlertTriangle className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Mark Damaged</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-xl rounded-[2.5rem] border-0 p-10 shadow-3xl bg-white/95 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="font-display text-2xl font-bold text-slate-900">Refine Inventory</DialogTitle>
                        <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                            Updating Stock Reference: <span className="text-indigo-600">{editingItem?.barcode}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-8">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Product Designation</label>
                            <Input
                                value={editForm.name ?? ''}
                                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all font-bold"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Classification</label>
                                <Select
                                    value={editForm.category ?? ''}
                                    onValueChange={val => setEditForm({ ...editForm, category: val })}
                                >
                                    <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                        <SelectItem value="Silk">Silk</SelectItem>
                                        <SelectItem value="Soft Silk">Soft Silk</SelectItem>
                                        <SelectItem value="Cotton">Cotton</SelectItem>
                                        <SelectItem value="Fancy">Fancy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Warehouse Location</label>
                                <Input
                                    value={editForm.rackLocation ?? ''}
                                    onChange={e => setEditForm({ ...editForm, rackLocation: e.target.value })}
                                    className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all font-mono text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Acquisition</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                                    <Input
                                        type="number"
                                        value={editForm.purchasePrice || 0}
                                        onChange={e => setEditForm({ ...editForm, purchasePrice: Number(e.target.value) })}
                                        className="h-12 pl-6 rounded-2xl border-indigo-50 bg-slate-50/50 transition-all font-bold"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">M.R.P</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                                    <Input
                                        type="number"
                                        value={editForm.mrp || 0}
                                        onChange={e => setEditForm({ ...editForm, mrp: Number(e.target.value) })}
                                        className="h-12 pl-6 rounded-2xl border-indigo-50 bg-slate-50/50 transition-all font-bold"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Retail Price</label>
                                <div className="relative group">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-silk-gold text-xs font-bold">₹</span>
                                    <Input
                                        type="number"
                                        className="h-12 pl-6 rounded-2xl border-silk-gold/30 bg-gold-50/30 font-display font-bold text-silk-gold focus:ring-silk-gold transition-all"
                                        value={editForm.sellingPrice || 0}
                                        onChange={e => setEditForm({ ...editForm, sellingPrice: Number(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-3 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsEditOpen(false)} className="rounded-2xl font-bold text-slate-400 hover:text-slate-600 h-12">Discard Changes</Button>
                        <Button onClick={handleSaveEdit} className="h-12 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl transition-all font-bold">Sync Inventory</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default Inventory;
