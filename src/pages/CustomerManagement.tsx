import React, { useState } from 'react';
import {
    Search,
    UserPlus,
    Filter,
    MoreHorizontal,
    Phone,
    MapPin,
    FileText,
    MessageSquare,
    Wallet,
    Download,
    Plus,
    Edit,
    Loader2,
    Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Customer } from '@/types';
import { useData } from '@/contexts/DataContext';

const CustomerManagement: React.FC = () => {
    const navigate = useNavigate();
    const { customers, addCustomer, updateCustomer } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        mobile: '',
        place: '',
        type: 'Retail'
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSaveCustomer = async () => {
        if (!newCustomer.name || !newCustomer.mobile) {
            toast.error('Name and Mobile are required');
            return;
        }

        try {
            if (editingId) {
                await updateCustomer(editingId, {
                    name: newCustomer.name,
                    mobile: newCustomer.mobile,
                    place: newCustomer.place,
                    type: newCustomer.type
                });
            } else {
                await addCustomer({
                    id: `cust_${Date.now()}`,
                    name: newCustomer.name,
                    mobile: newCustomer.mobile,
                    place: newCustomer.place || 'Local',
                    type: newCustomer.type || 'Retail',
                    totalPurchase: 0,
                    billsCount: 0,
                    pendingDue: 0,
                    lastPurchase: new Date().toISOString().split('T')[0]
                });
            }
            setIsAddOpen(false);
            resetForm();
        } catch (error) {
            toast.error('Error saving customer');
        }
    };

    const resetForm = () => {
        setNewCustomer({ name: '', mobile: '', place: '', type: 'Retail' });
        setEditingId(null);
    };

    const handleEdit = (customer: Customer) => {
        setNewCustomer({
            name: customer.name,
            mobile: customer.mobile,
            place: customer.place || '',
            type: customer.type || 'Retail'
        });
        setEditingId(customer.id);
        setIsAddOpen(true);
    };

    const handleSendOffer = (mobile: string) => {
        toast.success(`Offer sent to ${mobile} via WhatsApp`);
    };

    const handlePayment = (name: string) => {
        toast.info(`Opening payment collection for ${name}`);
    };

    const handleDownloadLedger = (name: string) => {
        toast.success(`Downloading ledger for ${name}`);
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.mobile.includes(searchTerm) ||
        (c.place && c.place.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalDue = customers.reduce((acc, curr) => acc + (curr.pendingDue || 0), 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-700 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Customer <span className="text-silk-gold">Management</span>
                    </h1>
                    <p className="mt-1 text-slate-500 font-medium">Manage customer profiles, history, and outstanding dues.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-indigo-100 hover:bg-slate-50 shadow-sm font-bold" onClick={() => navigate('/billing')}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Bill
                    </Button>
                    <Dialog
                        open={isAddOpen}
                        onOpenChange={(open) => {
                            setIsAddOpen(open);
                            if (!open) resetForm();
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button className="premium-btn text-white rounded-2xl px-6 font-bold shadow-gold-500/20" onClick={() => resetForm()}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Customer
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-[2.5rem] p-0 overflow-hidden">
                            <DialogHeader className="p-8 pb-4 bg-slate-50/50 border-b border-glass">
                                <DialogTitle className="font-display text-2xl font-bold">{editingId ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
                                <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                    Customer Identity & Classification
                                </DialogDescription>
                            </DialogHeader>
                            <div className="p-8 space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter customer name"
                                        className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all"
                                        value={newCustomer.name}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="mobile" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Mobile Number</Label>
                                    <Input
                                        id="mobile"
                                        placeholder="10-digit mobile number"
                                        className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all"
                                        value={newCustomer.mobile}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, mobile: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="place" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Place / City</Label>
                                    <Input
                                        id="place"
                                        placeholder="City name"
                                        className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all"
                                        value={newCustomer.place}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, place: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Customer Type</Label>
                                    <Select
                                        value={newCustomer.type}
                                        onValueChange={(val) => setNewCustomer({ ...newCustomer, type: val })}
                                    >
                                        <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Retail">Retail</SelectItem>
                                            <SelectItem value="Wholesale">Wholesale</SelectItem>
                                            <SelectItem value="VIP">VIP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter className="p-8 pt-0 gap-3">
                                <Button variant="ghost" className="rounded-2xl font-bold text-slate-500" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                                <Button className="premium-btn text-white rounded-2xl px-8 font-bold" onClick={handleSaveCustomer}>{editingId ? 'Update' : 'Save'} Profile</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
                {/* Main List */}
                <Card className="glass-card border-0 rounded-[2.5rem] overflow-hidden shadow-xl shadow-indigo-500/5">
                    <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="font-display text-2xl font-bold text-slate-900">Customer Directory</CardTitle>
                                <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                    Member Database & History
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-full sm:w-64 group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-silk-gold transition-colors" size={16} />
                                    <Input
                                        placeholder="Search customers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 h-10 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all"
                                    />
                                </div>
                                <Button variant="outline" size="icon" className="h-10 w-10 rounded-2xl border-indigo-100 hover:bg-slate-50">
                                    <Filter className="h-4 w-4 text-slate-500" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-indigo-50 hover:bg-transparent">
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-8">Customer</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 hidden md:table-cell text-center">Identity</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Revenue (₹)</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Outstanding</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right pr-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-20">
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="h-8 w-8 animate-spin text-silk-gold" />
                                                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Enriching Profiles...</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredCustomers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-20">
                                            <div className="flex flex-col items-center gap-2">
                                                <UserPlus className="h-12 w-12 text-slate-200" />
                                                <p className="font-display text-lg font-bold text-slate-400 mt-2">No customers found</p>
                                                <Button variant="link" className="text-silk-gold font-bold" onClick={() => setIsAddOpen(true)}>Add your first customer</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id} className="border-b border-indigo-50/50 group transition-all hover:bg-slate-50/50">
                                            <TableCell className="pl-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-1 ring-slate-100">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}&backgroundColor=f8f9fc&fontFamily=Inter&fontWeight=700`} />
                                                        <AvatarFallback className="bg-slate-50 text-slate-400 font-bold">{customer.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 group-hover:text-silk-gold transition-colors">{customer.name}</span>
                                                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                            <Phone className="h-3 w-3" /> {customer.mobile}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell text-center">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <Badge variant="outline" className={cn(
                                                        "rounded-xl font-black text-[10px] px-2.5 py-0.5 border-0 shadow-sm",
                                                        customer.type === 'VIP' ? "bg-amber-50 text-amber-600" : 
                                                        customer.type === 'Wholesale' ? "bg-purple-50 text-purple-600" : "bg-indigo-50 text-indigo-600"
                                                    )}>
                                                        {customer.type.toUpperCase()}
                                                    </Badge>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                                        <MapPin className="h-2.5 w-2.5" /> {customer.place || 'GLOBAL'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-base font-display font-bold text-slate-900">₹{(customer.totalPurchase || 0).toLocaleString()}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{customer.billsCount || 0} Transactions</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {customer.pendingDue > 0 ? (
                                                    <div className="inline-flex flex-col items-end">
                                                        <span className="font-black text-red-600 text-sm">₹{customer.pendingDue.toLocaleString()}</span>
                                                        <div className="h-1 w-full bg-red-100 rounded-full mt-1 overflow-hidden">
                                                            <div className="h-full bg-red-500 w-2/3" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-0 rounded-full text-[10px] font-black uppercase px-2">Cleared</Badge>
                                                )}
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
                                                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 px-3">Management</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => handleEdit(customer)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50 focus:text-indigo-600">
                                                                <Edit className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Edit Profile</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleSendOffer(customer.mobile)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-pink-50 focus:text-pink-600">
                                                                <MessageSquare className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Send Offer</span>
                                                            </DropdownMenuItem>
                                                            {customer.pendingDue > 0 && (
                                                                <DropdownMenuItem onClick={() => handlePayment(customer.name)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-emerald-50 focus:text-emerald-600">
                                                                    <Wallet className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Collect Payment</span>
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuSeparator className="my-2 bg-black/5" />
                                                            <DropdownMenuItem onClick={() => handleDownloadLedger(customer.name)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-100">
                                                                <FileText className="mr-2 h-4 w-4" /> <span className="font-bold text-sm text-slate-600">Financial Ledger</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Quick Stats Panel */}
                <div className="flex flex-col gap-6">
                    <Card className="glass-card border-0 rounded-[2rem] bg-slate-900 text-white shadow-2xl shadow-slate-900/10 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-silk-gold/20 rounded-full blur-3xl -z-10 transition-all group-hover:bg-silk-gold/30" />
                        <CardHeader className="pb-2">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Total Receivables</p>
                             <div className="flex items-center justify-between">
                                <CardTitle className="text-4xl font-display font-bold text-silk-gold">₹{totalDue.toLocaleString()}</CardTitle>
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                    <Wallet className="h-6 w-6 text-silk-gold" />
                                </div>
                             </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-silk-gold animate-pulse" />
                                Outstanding from {customers.filter(c => c.pendingDue > 0).length} Members
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-0 rounded-[2rem] shadow-xl shadow-indigo-500/5 overflow-hidden">
                        <CardHeader className="pb-4 border-b border-glass">
                            <CardTitle className="font-display text-xl font-bold flex items-center gap-2">
                                <Sparkles size={18} className="text-silk-gold" />
                                Top Customers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                             <div className="grid gap-4">
                                {[...customers]
                                    .sort((a, b) => (b.totalPurchase || 0) - (a.totalPurchase || 0))
                                    .slice(0, 5)
                                    .map((c, i) => (
                                        <div key={c.id} className="flex items-center justify-between group cursor-help" title={`Joined: ${c.lastPurchase || 'N/A'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "flex h-9 w-9 items-center justify-center rounded-xl font-black text-xs shadow-sm",
                                                    i === 0 ? "bg-amber-50 text-amber-600 ring-1 ring-amber-100" : 
                                                    i === 1 ? "bg-slate-50 text-slate-600 ring-1 ring-slate-100" : "bg-orange-50 text-orange-600"
                                                )}>
                                                    #{i + 1}
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-bold text-slate-900 group-hover:text-silk-gold transition-colors">{c.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.billsCount || 0} BILLS</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-slate-900 leading-none">₹{(c.totalPurchase || 0).toLocaleString()}</p>
                                                <div className="h-1 w-12 bg-slate-100 rounded-full mt-1.5 overflow-hidden ml-auto">
                                                    <div className="h-full bg-silk-gold w-3/4 opacity-50" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {customers.length === 0 && <p className="text-center py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">No data available</p>}
                             </div>
                        </CardContent>
                    </Card>

                    <Button 
                        variant="outline" 
                        className="h-14 rounded-[1.25rem] border-indigo-100 bg-white shadow-lg shadow-indigo-500/5 font-bold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all border-dashed group"
                        onClick={() => toast.info("Insights dashboard coming soon!")}
                    >
                        <Plus className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform" />
                        Explore AI Analytics
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomerManagement;
