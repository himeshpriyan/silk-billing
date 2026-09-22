import React, { useState } from 'react';
import {
  Search,
  Filter,
  Printer,
  Download,
  MessageSquare,
  Ban,
  Eye,
  Calendar as CalendarIcon,
  CreditCard,
  User,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Assuming these exist or will use simple input for date
import { Calendar } from '@/components/ui/calendar'; // Assuming shadcn calendar
import { toast } from 'sonner';

// Mock Data
interface BillRecord {
  billNo: string;
  date: string;
  customerName: string;
  mobile: string;
  amount: number;
  paymentMode: 'Cash' | 'UPI' | 'Card' | 'Split';
  status: 'Completed' | 'Cancelled' | 'Held';
  salesman: string;
  itemCount: number;
}

const initialBills: BillRecord[] = [
  {
    billNo: 'SILK-001',
    date: '2024-03-10T10:30:00',
    customerName: 'Priya Mahalakshmi',
    mobile: '9876543210',
    amount: 25750,
    paymentMode: 'Card',
    status: 'Completed',
    salesman: 'Ramesh',
    itemCount: 3,
  },
  {
    billNo: 'SILK-002',
    date: '2024-03-10T11:15:00',
    customerName: 'Karthik Raja',
    mobile: '9988776655',
    amount: 4500,
    paymentMode: 'UPI',
    status: 'Completed',
    salesman: 'Suresh',
    itemCount: 1,
  },
  {
    billNo: 'SILK-003',
    date: '2024-03-10T12:00:00',
    customerName: 'Unknown',
    mobile: '-',
    amount: 1200,
    paymentMode: 'Cash',
    status: 'Cancelled',
    salesman: 'Ramesh',
    itemCount: 1,
  },
  {
    billNo: 'SILK-004',
    date: '2024-03-10T12:45:00',
    customerName: 'Anitha S',
    mobile: '8877665544',
    amount: 15600,
    paymentMode: 'Split',
    status: 'Completed',
    salesman: 'Meena',
    itemCount: 2,
  },
];

import { useData } from '@/contexts/DataContext';

// Mock Data removed
// interface BillRecord is locally defined, I'll map to it or use it.

const BillHistory: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { bills } = useData();
  // Map bills to local display format
  // We can just use filteredBills derived from context directly instead of local state 'bills'

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPayment, setFilterPayment] = useState<string>('all');

  const displayBills = bills.map(b => ({
    billNo: b.billNo || b.id,
    date: b.date,
    customerName: b.customerName || 'Unknown',
    mobile: b.customerMobile || '-',
    amount: b.grandTotal,
    paymentMode: b.paymentMethod,
    status: b.status,
    salesman: 'Admin', // Default for now
    itemCount: b.items.reduce((sum, i) => sum + i.qty, 0)
  }));

  const handleReprint = (billNo: string, type: 'thermal' | 'a4') => {
    toast.info(`Printing Bill ${billNo} in ${type.toUpperCase()} format...`);
  };

  const handleWhatsApp = (billNo: string, mobile: string) => {
    if (mobile === '-' || mobile.length < 10) {
      toast.error('Invalid mobile number for this bill');
      return;
    }
    toast.success(`Invoice ${billNo} sent to ${mobile} via WhatsApp!`);
  };

  const handleDownload = (billNo: string) => {
    toast.success(`Downloading PDF for ${billNo}...`);
  };

  const handleCancel = (billNo: string) => {
    // In real app, check permissions and ask for reason
    toast.warning(`Bill ${billNo} cancellation request sent to Admin`);
  };

  const filteredBills = displayBills.filter(bill => {
    const matchesSearch =
      bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.mobile.includes(searchTerm);

    const matchesStatus = filterStatus === 'all' || bill.status.toLowerCase() === filterStatus.toLowerCase();

    // Check if paymentMode exists before toLowerCase, defaulting to empty string if undefined (though my map ensures it)
    const matchesPayment = filterPayment === 'all' || (bill.paymentMode || '').toLowerCase() === filterPayment.toLowerCase();

    return matchesSearch && matchesStatus && matchesPayment;
  });


  return (
    <div className="flex flex-col gap-8 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-silk-gold/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-1">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Audit <span className="text-silk-gold">Archives</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Comprehensive Transactional Ledger</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/billing')} className="h-11 rounded-xl border-indigo-100 bg-white/50 backdrop-blur-sm font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">
            <Plus className="mr-2 h-4 w-4 text-silk-gold" />
            Initiate Transaction
          </Button>
          <Button variant="outline" className="h-11 rounded-xl border-indigo-100 bg-white/50 backdrop-blur-sm font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">
            <Download className="mr-2 h-4 w-4" />
            Export Ledger
          </Button>
          <Button className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 px-6">
            <Printer className="mr-2 h-4 w-4 text-silk-gold" />
            Generate Day Report
          </Button>
        </div>
      </div>

      <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 overflow-hidden">
        <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent bg-slate-50/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display text-xl font-bold text-slate-900">Transaction Ledger</CardTitle>
              <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Audit trail of all generated invoices</CardDescription>
            </div>
            <Badge variant="outline" className="rounded-xl px-3 py-1 bg-indigo-50 border-indigo-100 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
              {filteredBills.length} records
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end p-6 rounded-3xl bg-slate-50/50 border border-indigo-50">
            <div className="flex-1 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Search Audit</Label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-silk-gold transition-colors" />
                <Input
                  placeholder="ID, Customer, Mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 pl-11 rounded-2xl border-indigo-50 bg-white font-bold text-sm focus:ring-silk-gold transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="w-full lg:w-48 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status standing</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-white font-bold shadow-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                  <SelectItem value="all">ALL STATUS</SelectItem>
                  <SelectItem value="paid">PAID</SelectItem>
                  <SelectItem value="cancelled">CANCELLED</SelectItem>
                  <SelectItem value="held">HELD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full lg:w-48 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Payment Channel</Label>
              <Select value={filterPayment} onValueChange={setFilterPayment}>
                <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-white font-bold shadow-sm">
                  <SelectValue placeholder="All Modes" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                  <SelectItem value="all">ALL MODES</SelectItem>
                  <SelectItem value="cash">CASH</SelectItem>
                  <SelectItem value="upi">UPI / DIGITAL</SelectItem>
                  <SelectItem value="card">CARD</SelectItem>
                  <SelectItem value="split">SPLIT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full lg:w-auto">
              <Button variant="secondary" className="h-12 px-6 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-widest border-0 transition-all">
                <Filter className="mr-2 h-4 w-4" />
                Refine Search
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-[2rem] border border-indigo-50/50 overflow-hidden bg-white shadow-inner">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 border-b border-indigo-50 hover:bg-transparent">
                  <TableHead className="pl-8 h-14 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Ledger ID</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Timestamp</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Patron</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-center">Volume</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Valuation</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Channel</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Standing</TableHead>
                  <TableHead className="pr-8 h-14 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Audit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.billNo} className="border-b border-indigo-50/50 group transition-all hover:bg-indigo-50/30">
                    <TableCell className="pl-8 py-5 font-mono text-[10px] font-black text-slate-400 group-hover:text-silk-gold transition-colors">{bill.billNo}</TableCell>
                    <TableCell className="py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{format(new Date(bill.date), 'dd MMM yyyy')}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">{format(new Date(bill.date), 'hh:mm a')}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-silk-gold transition-colors">{bill.customerName}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{bill.mobile}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-[10px] font-black text-slate-600">
                        {bill.itemCount}
                      </span>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="text-sm font-black text-slate-900">₹{bill.amount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="py-5">
                      <Badge variant="outline" className="rounded-xl border-indigo-100 bg-white shadow-sm font-black text-[9px] uppercase px-2.5 py-1 gap-1.5 flex items-center w-fit group-hover:border-silk-gold/30 transition-colors">
                        {bill.paymentMode === 'Card' && <CreditCard className="h-3 w-3 text-silk-gold" />}
                        {bill.paymentMode}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-xl border-0 font-black text-[9px] uppercase px-2.5 py-1 shadow-sm",
                          bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                          bill.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600 font-black'
                        )}
                      >
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-10 w-10 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-0 shadow-2xl p-2 bg-white/95 backdrop-blur-xl min-w-[200px]">
                          <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 px-3">Transaction Options</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => { }} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50 focus:text-indigo-600">
                            <Eye className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Review Insights</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-2 bg-black/5" />
                          <DropdownMenuItem onClick={() => handleReprint(bill.billNo, 'thermal')} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50">
                            <Printer className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Thermal Reprint</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReprint(bill.billNo, 'a4')} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50">
                            <Printer className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Standard A4 Copy</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(bill.billNo)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50">
                            <Download className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Export PDF Archive</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleWhatsApp(bill.billNo, bill.mobile)} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-indigo-50">
                            <MessageSquare className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Notify Patron (WA)</span>
                          </DropdownMenuItem>
                          {bill.status !== 'Cancelled' && (
                            <>
                              <DropdownMenuSeparator className="my-2 bg-black/5" />
                              <DropdownMenuItem
                                className="rounded-xl px-3 py-2 cursor-pointer focus:bg-red-50 focus:text-red-600 text-red-500"
                                onClick={() => handleCancel(bill.billNo)}
                              >
                                <Ban className="mr-2 h-4 w-4" /> <span className="font-bold text-sm">Nullify Transaction</span>
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBills.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-64 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-20">
                        <Ban size={48} className="text-slate-400" />
                        <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">No matching audit logs found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillHistory;
