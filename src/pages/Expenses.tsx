import React, { useState, useEffect } from 'react';
import {
    Receipt,
    Plus,
    Trash2,
    FileText,
    Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
import { toast } from 'sonner';
import { useData } from '@/contexts/DataContext';
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Expense {
    _id: string;
    id?: string; // For backward compatibility or mapped _id
    type: string;
    amount: number;
    date: string;
    note: string;
}

const Expenses: React.FC = () => {
    const { expenses, addExpense, deleteExpense } = useData();

    // Form state
    const [type, setType] = useState('Tea/Coffee');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleAdd = async () => {
        if (!amount) return;

        addExpense({
            type,
            amount: Number(amount),
            date,
            note
        });
        
        setAmount('');
        setNote('');
    };

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        deleteExpense(deleteId);
        setDeleteId(null);
    };

    const todayExpenses = expenses.reduce((s, e) => {
        const expenseDate = new Date(e.date).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        return s + (expenseDate === today ? e.amount : 0);
    }, 0);

    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

    return (
        <div className="flex flex-col gap-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 left-0 w-96 h-96 bg-silk-gold/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col gap-2 px-1">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Operational <span className="text-silk-gold">Ledger</span>
                </h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Cash Flow & Overhead Management</p>
            </div>

            <div className="grid gap-6 md:grid-cols-[350px_1fr]">
                {/* Entry Form */}
                <Card className="glass-card border-0 rounded-[2.5rem] shadow-2xl shadow-silk-gold/5 overflow-hidden h-fit sticky top-20">
                    <div className="h-1.5 bg-gradient-to-r from-silk-gold via-amber-200 to-silk-gold" />
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="font-display text-xl font-bold flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Plus size={20} />
                            </div>
                            Disbursement
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Classification</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger className="h-12 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                    <SelectItem value="Rent">ESTABLISHMENT RENT</SelectItem>
                                    <SelectItem value="Salary">PAYROLL / STIPEND</SelectItem>
                                    <SelectItem value="Electricity">UTILITY / ENERGY</SelectItem>
                                    <SelectItem value="Transport">LOGISTICS / TRANSIT</SelectItem>
                                    <SelectItem value="Packaging">INVENTORY PACKING</SelectItem>
                                    <SelectItem value="Tea/Coffee">HOSPITALITY / SNACKS</SelectItem>
                                    <SelectItem value="Marketing">PROMOTION / ADS</SelectItem>
                                    <SelectItem value="Others">MISCELLANEOUS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Valuation (₹)</Label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold group-focus-within:text-silk-gold transition-colors">₹</span>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="h-12 pl-8 rounded-2xl border-indigo-50 bg-slate-50/50 font-black text-lg focus:bg-white focus:ring-silk-gold transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Entry Date</Label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="h-12 pl-11 rounded-2xl border-indigo-50 bg-slate-50/50 font-bold focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Contextual Notes</Label>
                            <Textarea
                                placeholder="Describe the disbursement..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="min-h-[100px] rounded-2xl border-indigo-50 bg-slate-50/50 font-medium focus:bg-white transition-all resize-none"
                            />
                        </div>
                        <Button className="premium-btn w-full h-14 rounded-2xl shadow-xl shadow-silk-gold/10 transition-all active:scale-[0.98]" onClick={handleAdd}>
                            <FileText className="mr-3 h-5 w-5" />
                            Serialize Expense
                        </Button>
                    </CardContent>
                </Card>

                {/* List */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                        <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                                <Calendar size={60} className="text-indigo-600" />
                            </div>
                            <CardContent className="p-8 relative z-10">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-600 transition-colors">Daily Overhead</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-slate-900 tracking-tight">₹{todayExpenses.toLocaleString()}</span>
                                    <Badge variant="outline" className="border-emerald-100 bg-emerald-50 text-emerald-600 font-black text-[9px] px-2 py-0">TODAY</Badge>
                                </div>
                                <div className="mt-4 w-12 h-1 bg-indigo-50 group-hover:w-full transition-all duration-700" />
                            </CardContent>
                        </Card>
                        <Card className="glass-card border-0 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 group overflow-hidden relative bg-slate-900 text-white">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                                <Receipt size={60} className="text-silk-gold" />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent)]" />
                            <CardContent className="p-8 relative z-10">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Aggregate Disbursement</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-white tracking-tight">₹{totalExpenses.toLocaleString()}</span>
                                    <span className="text-[9px] font-black text-silk-gold">TOTAL</span>
                                </div>
                                <div className="mt-4 w-12 h-1 bg-silk-gold/30 group-hover:w-full transition-all duration-700" />
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="glass-card border-0 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 overflow-hidden">
                        <CardHeader className="p-8 pb-4 border-b border-glass hover:bg-transparent bg-slate-50/30">
                            <CardTitle className="font-display text-xl font-bold text-slate-900">Expense History</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 border-b border-glass">
                                        <TableHead className="pl-8 h-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Date</TableHead>
                                        <TableHead className="h-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Category</TableHead>
                                        <TableHead className="h-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Memo</TableHead>
                                        <TableHead className="h-12 text-right font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Valuation</TableHead>
                                        <TableHead className="pr-8 w-[60px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {expenses.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                                <div className="flex flex-col items-center gap-3 opacity-20">
                                                    <Receipt size={48} className="text-slate-400" />
                                                    <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">No disbursements recorded</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        expenses.map((expense) => (
                                            <TableRow key={expense._id || expense.id} className="border-b border-indigo-50/50 group transition-all hover:bg-indigo-50/30">
                                                <TableCell className="pl-8 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-slate-900">{new Date(expense.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">{new Date(expense.date).getFullYear()}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <Badge variant="outline" className="rounded-xl border-indigo-100 bg-white font-black text-[9px] uppercase px-3 py-1 text-slate-600 shadow-sm group-hover:border-silk-gold/30 transition-colors">
                                                        {expense.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{expense.note || <span className="opacity-30 italic">No memo</span>}</span>
                                                </TableCell>
                                                <TableCell className="py-5 text-right">
                                                    <span className="text-sm font-black text-slate-900 tracking-tight">₹{expense.amount.toLocaleString()}</span>
                                                </TableCell>
                                                <TableCell className="pr-8 py-5">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                        onClick={() => handleDeleteClick(expense._id || expense.id || '')}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the expense record.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Expenses;
