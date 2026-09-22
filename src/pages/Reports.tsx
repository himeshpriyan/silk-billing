import React, { useState, useEffect } from 'react';
import {
    BarChart,
    LineChart,
    Calendar,
    Download,
    Printer,
    Filter,
    Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { cn } from '@/lib/utils';

interface ReportSummary {
    totalSales: number;
    billsCount: number;
    avgBillValue: number;
    profitEstimate: number;
}

interface DetailedReportItem {
    id: string;
    date: string;
    category: string;
    cash: number;
    card: number;
    totalAmount: number;
}

const Reports: React.FC = () => {
    const navigate = useNavigate();
    const [reportType, setReportType] = useState('dailysales');
    const [summary, setSummary] = useState<ReportSummary>({ totalSales: 0, billsCount: 0, avgBillValue: 0, profitEstimate: 0 });
    const [detailed, setDetailed] = useState<DetailedReportItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));
                
                const mockSummary: ReportSummary = {
                    totalSales: 2450000,
                    billsCount: 154,
                    avgBillValue: 15909,
                    profitEstimate: 490000
                };
                
                const mockDetailed: DetailedReportItem[] = [
                    { id: '1', date: '2024-03-20', category: 'Kanchipuram Silk', cash: 45000, card: 85000, totalAmount: 130000 },
                    { id: '2', date: '2024-03-21', category: 'Soft Silk', cash: 12000, card: 25000, totalAmount: 37000 },
                    { id: '3', date: '2024-03-22', category: 'Banarasi Silk', cash: 35000, card: 45000, totalAmount: 80000 },
                    { id: '4', date: '2024-03-23', category: 'Cotton Silk', cash: 8000, card: 15000, totalAmount: 23000 },
                    { id: '5', date: '2024-03-24', category: 'Traditional Wear', cash: 15000, card: 20000, totalAmount: 35000 }
                ];
                
                setSummary(mockSummary);
                setDetailed(mockDetailed);
            } catch (error) {
                console.error('Error loading reports:', error);
                toast.error('Error loading reports');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 left-0 w-96 h-96 bg-silk-gold/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-1">
                <div>
                    <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Intelligence <span className="text-silk-gold">Hub</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Strategic Analytics & Performance Metrics</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" onClick={() => navigate('/billing')} className="h-11 rounded-xl border-indigo-100 bg-white/50 backdrop-blur-sm font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">
                        <Plus className="mr-2 h-4 w-4 text-silk-gold" />
                        Initiate Transaction
                    </Button>
                    <Button variant="outline" onClick={() => toast.info('Export functionality coming soon')} className="h-11 rounded-xl border-indigo-100 bg-white/50 backdrop-blur-sm font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">
                        <Download className="mr-2 h-4 w-4" />
                        Export Insights
                    </Button>
                    <Button className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 px-6">
                        <Printer className="mr-2 h-4 w-4 text-silk-gold" />
                        Executive Print
                    </Button>
                </div>
            </div>

            {/* Command Center (Filters) */}
            <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 overflow-hidden">
                <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent bg-slate-50/30">
                    <CardTitle className="font-display text-xl font-bold text-slate-900">Query Command</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-end p-6 rounded-3xl bg-slate-50/50 border border-indigo-50">
                        <div className="w-full lg:w-[300px] space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Analytical Framework</Label>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-white font-bold shadow-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                    <SelectItem value="dailysales">TEMPORAL SALES AUDIT</SelectItem>
                                    <SelectItem value="stock">INVENTORY EQUITY ANALYSIS</SelectItem>
                                    <SelectItem value="category">SEGMENTATION PERFORMANCE</SelectItem>
                                    <SelectItem value="staff">HUMAN CAPITAL METRICS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full lg:w-[220px] space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Temporal Start</Label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input type="date" className="h-12 pl-11 rounded-2xl border-indigo-50 bg-white font-bold focus:ring-silk-gold transition-all shadow-sm" />
                            </div>
                        </div>
                        <div className="w-full lg:w-[220px] space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Temporal End</Label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input type="date" className="h-12 pl-11 rounded-2xl border-indigo-50 bg-white font-bold focus:ring-silk-gold transition-all shadow-sm" />
                            </div>
                        </div>
                        <Button className="premium-btn w-full lg:w-auto h-12 px-8 rounded-2xl shadow-lg transition-all active:scale-[0.98]" onClick={() => toast.success('Insights synchronized!')}>
                            <Filter className="mr-2 h-4 w-4" />
                            Execute Query
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card border-0 rounded-[2rem] shadow-xl shadow-indigo-500/5 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-all duration-500">
                        <LineChart size={40} className="text-indigo-600" />
                    </div>
                    <CardHeader className="p-6 pb-2">
                        <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="text-2xl font-black text-slate-900 tracking-tight">₹{summary.totalSales.toLocaleString()}</div>
                        <p className="text-[9px] font-bold text-indigo-400 mt-1 uppercase tracking-tighter">Boutique Lifetime Valuation</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0 rounded-[2rem] shadow-xl shadow-indigo-500/5 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-all duration-500">
                        <Plus size={40} className="text-indigo-600" />
                    </div>
                    <CardHeader className="p-6 pb-2">
                        <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Volume</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="text-2xl font-black text-slate-900 tracking-tight">{summary.billsCount}</div>
                        <p className="text-[9px] font-bold text-indigo-400 mt-1 uppercase tracking-tighter">Total Invoices Dispatched</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0 rounded-[2rem] shadow-xl shadow-indigo-500/5 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-all duration-500">
                        <BarChart size={40} className="text-indigo-600" />
                    </div>
                    <CardHeader className="p-6 pb-2">
                        <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mean Ticket Value</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="text-2xl font-black text-slate-900 tracking-tight">₹{summary.avgBillValue.toLocaleString()}</div>
                        <p className="text-[9px] font-bold text-indigo-400 mt-1 uppercase tracking-tighter">Standard Per-Patron Yield</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0 rounded-[2rem] shadow-2xl shadow-emerald-500/10 group overflow-hidden relative bg-slate-900 text-white">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]" />
                    <CardHeader className="p-6 pb-2">
                        <CardTitle className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Projected Surplus</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="text-2xl font-black text-white tracking-tight">₹{summary.profitEstimate.toLocaleString()}</div>
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mt-1">~20% OPERATIONAL MARGIN</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 overflow-hidden flex-1 mb-8">
                <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent bg-slate-50/30">
                    <CardTitle className="font-display text-xl font-bold text-slate-900">Precision Audit Ledger</CardTitle>
                    <CardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Granular breakdown of sales performance across channels</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 border-b border-glass h-12">
                                <TableHead className="pl-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Date</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Classification</TableHead>
                                <TableHead className="text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Liquid Equity (Cash)</TableHead>
                                <TableHead className="text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Digital / Credit</TableHead>
                                <TableHead className="pr-6 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Aggregate Yield</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center py-8">
                                        <div className="flex items-center justify-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest opacity-50">
                                            <div className="w-2 h-2 rounded-full bg-silk-gold animate-ping" />
                                            Synchronizing Data...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : detailed.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center py-8">
                                        <div className="flex flex-col items-center gap-3 opacity-20">
                                            <LineChart size={48} className="text-slate-400" />
                                            <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">No report entries generated</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                detailed.map((item) => (
                                    <TableRow key={item.id} className="border-b border-indigo-50/50 group transition-all hover:bg-indigo-50/30">
                                        <TableCell className="pl-6 py-5">
                                            <span className="text-xs font-black text-slate-900">{item.date}</span>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <Badge variant="outline" className="rounded-xl border-indigo-100 bg-white font-black text-[9px] uppercase px-3 py-1 group-hover:border-silk-gold/30 transition-colors">
                                                {item.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-5 text-right font-bold text-slate-600">₹{item.cash.toLocaleString()}</TableCell>
                                        <TableCell className="py-5 text-right font-bold text-slate-600">₹{item.card.toLocaleString()}</TableCell>
                                        <TableCell className="pr-6 py-5 text-right">
                                            <span className="text-sm font-black text-slate-900 tracking-tight">₹{item.totalAmount.toLocaleString()}</span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Reports;
