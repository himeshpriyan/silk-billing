import React, { useState } from 'react';
import {
  Search,
  Barcode,
  User,
  Phone,
  MapPin,
  Plus,
  Minus,
  Trash2,
  Save,
  Printer,
  MessageSquare,
  Pause,
  X,
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
  Gift,
  Scissors,
  Sparkles,
  Loader2,
  History,
  CirclePause as PauseCircle,
  ArrowRight,
  Receipt,
  LayoutGrid,
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import ReactBarcode from 'react-barcode';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Saree } from '@/types';
import { AIStylist } from '@/components/AIStylist';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { cn } from '@/lib/utils';

interface BillItem {
  id: string;
  barcode: string;
  name: string;
  designType: string;
  color: string;
  borderType: string;
  zariType: string;
  blouseIncluded: boolean;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  qty: number;
  stockType: 'unique' | 'bulk';
}

interface ExtraService {
  id: string;
  name: string;
  nameTamil: string;
  price: number;
  enabled: boolean;
}

const extraServices: ExtraService[] = [
  { id: 'fallpico', name: 'Fall + Pico', nameTamil: 'ஃபால் + பிகோ', price: 250, enabled: false },
  { id: 'blouse', name: 'Blouse Stitching', nameTamil: 'பிளவுஸ் தையல்', price: 500, enabled: false },
  { id: 'aari', name: 'Aari Work', nameTamil: 'ஆரி வேலை', price: 1500, enabled: false },
  { id: 'gift', name: 'Gift Packing', nameTamil: 'பரிசு பேக்கிங்', price: 150, enabled: false },
];

const paymentMethods = [
  { id: 'cash', name: 'Cash', nameTamil: 'ரொக்கம்', icon: Banknote },
  { id: 'upi', name: 'UPI', nameTamil: 'UPI', icon: Smartphone },
  { id: 'card', name: 'Card', nameTamil: 'கார்டு', icon: CreditCard },
  { id: 'bank', name: 'Bank', nameTamil: 'வங்கி', icon: Building2 },
  { id: 'credit', name: 'Credit', nameTamil: 'கடன்', icon: CreditCard },
];

export const Billing: React.FC = () => {
  const { t, language } = useLanguage();
  const { sarees, addBill, settings } = useData();
  const navigate = useNavigate();
  const [items, setItems] = useState<BillItem[]>([]);
  const [services, setServices] = useState<ExtraService[]>(extraServices);
  const [barcodeInput, setBarcodeInput] = useState('');
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  // Search Dialog State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Saree[]>([]);

  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerPlace, setCustomerPlace] = useState('');
  const [customerType, setCustomerType] = useState('retail');
  const [customerGst, setCustomerGst] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Print Preview State
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [lastBill, setLastBill] = useState<any>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${lastBill?.billNo || lastBill?.id || 'new'}`,
    onAfterPrint: () => setIsPrintPreviewOpen(false),
  });

  // Fetch Customer Details
  useEffect(() => {
    const fetchCustomer = async () => {
      if (customerMobile.length === 10) {
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Mock customer lookup
          const mockCustomers = [
            { mobile: '9876543210', name: 'Ananya Sharma', place: 'Chennai', type: 'retail' },
            { mobile: '9001122334', name: 'Rajesh Kumar', place: 'Salem', type: 'wholesale' }
          ];
          
          const customer = mockCustomers.find(c => c.mobile === customerMobile);
          
          if (customer) {
            setCustomerName(customer.name);
            setCustomerPlace(customer.place);
            if (customer.type) setCustomerType(customer.type);
            toast.success('Customer details found! (Mock)');
          }
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      }
    };

    // Debounce slightly or just run on length check
    const timeoutId = setTimeout(() => {
      fetchCustomer();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [customerMobile]);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.sellingPrice * item.qty, 0);
  const servicesTotal = services.filter((s) => s.enabled).reduce((sum, s) => sum + s.price, 0);
  const totalBeforeDiscount = subtotal + servicesTotal;
  const discountValue = discountAmount || (totalBeforeDiscount * discountPercent) / 100;
  const gstAmount = 0; // GST logic can be added based on settings
  const roundOff = Math.round(totalBeforeDiscount - discountValue + gstAmount) - (totalBeforeDiscount - discountValue + gstAmount);
  const grandTotal = Math.round(totalBeforeDiscount - discountValue + gstAmount);

  // Auto-focus barcode input on mount
  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // F1: Focus Barcode
      if (e.key === 'F1') {
        e.preventDefault();
        barcodeInputRef.current?.focus();
      }
      // F2: Save & Print
      if (e.key === 'F2') {
        e.preventDefault();
        handleSaveBill(true);
      }
      // F3: Save Only
      if (e.key === 'F3') {
        e.preventDefault();
        handleSaveBill(false);
      }
      // F4: Hold Bill
      if (e.key === 'F4') {
        e.preventDefault();
        handleHoldBill();
      }
      // F10: New Bill
      if (e.key === 'F10') {
        e.preventDefault();
        setItems([]);
        setCustomerName('');
        setCustomerMobile('');
        setCustomerPlace('');
        setDiscountPercent(0);
        setPaymentMethod('cash');
        toast.info('Form cleared for new bill');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, customerMobile, discountPercent]); // Added dependencies for keydown actions to reflect latest state

  const addItemToBill = (saree: Saree) => {
    if (saree.stockQty <= 0) {
      toast.error(`${saree.name} is out of stock!`);
      return;
    }

    const existingItem = items.find(i => i.barcode === saree.barcode);

    if (existingItem) {
      if (existingItem.stockType === 'unique') {
        toast.warning('Unique items cannot have quantity > 1');
        return;
      }

      if (existingItem.qty + 1 > saree.stockQty) {
        toast.error(`Only ${saree.stockQty} units available in stock`);
        return;
      }

      updateItemQty(existingItem.id, 1);
      toast.success(`Quantity updated for ${saree.name}`);
    } else {
      const newProduct: BillItem = {
        id: saree.id,
        barcode: saree.barcode,
        name: saree.name,
        designType: saree.designType,
        color: saree.color,
        borderType: saree.borderType,
        zariType: saree.zariType,
        blouseIncluded: saree.blouseIncluded,
        mrp: saree.mrp,
        sellingPrice: saree.sellingPrice,
        discountPercent: 0,
        qty: 1,
        stockType: saree.stockType
      };
      setItems((prev) => [...prev, newProduct]);
      toast.success(`${saree.name} added`);
    }
    setSearchOpen(false);
    setBarcodeInput(''); // Clear barcode input after adding item

    // Maintain focus
    setTimeout(() => {
      if (barcodeInputRef.current) {
        barcodeInputRef.current.focus();
      }
    }, 100);
  };

  const handleBarcodeSearch = () => {
    if (barcodeInput) {
      // 1. Try Exact Match
      const exactMatch = sarees.find(s => s.barcode.toLowerCase() === barcodeInput.toLowerCase() || (s.sareeCode && s.sareeCode.toLowerCase() === barcodeInput.toLowerCase()));

      if (exactMatch) {
        addItemToBill(exactMatch);
        setBarcodeInput('');
        return;
      }

      // 2. Try Search by Name/Category
      const partialMatches = sarees.filter(s =>
        s.name.toLowerCase().includes(barcodeInput.toLowerCase()) ||
        (s.category && s.category.toLowerCase().includes(barcodeInput.toLowerCase())) ||
        s.color.toLowerCase().includes(barcodeInput.toLowerCase())
      );

      if (partialMatches.length > 0) {
        setSearchResults(partialMatches);
        setSearchOpen(true);
      } else {
        toast.error('No matching products found');
        setBarcodeInput(''); // Clear if nothing at all
      }
    }
  };

  const updateItemQty = (id: string, delta: number) => {
    const saree = sarees.find(s => s.id === id);
    if (!saree && delta > 0) return;

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.stockType === 'unique' && delta > 0) {
            toast.warning('Unique items cannot have quantity > 1');
            return item;
          }

          if (delta > 0 && item.qty + delta > (saree?.stockQty || 0)) {
            toast.error(`Only ${saree?.stockQty} units available in stock`);
            return item;
          }

          return { ...item, qty: Math.max(1, item.qty + delta) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSaveBill = async (print: boolean) => {
    if (items.length === 0) {
      toast.error("No items in bill");
      return;
    }

    const billData: any = { // Using any to bypass local interface vs global interface mismatch for now
      id: Date.now().toString(),
      items: items.map(item => ({
        sareeId: item.id,
        barcode: item.barcode,
        name: item.name,
        qty: item.qty,
        sellingPrice: item.sellingPrice,
        mrp: item.mrp,
        total: item.sellingPrice * item.qty
      })),
      customerName,
      customerMobile,
      customerPlace,
      customerType,
      customerGst,
      subtotal,
      discountPercent,
      discountAmount: discountValue,
      gstAmount,
      roundOff,
      grandTotal,
      paymentMethod,
      status: 'Paid',
      date: new Date().toISOString() // Changed to ISO string for better date handling
    };

    try {
      await addBill(billData);
      setLastBill(billData);

      if (print) {
        setIsPrintPreviewOpen(true);
        toast.success('Bill saved! Opening print preview...');
      } else {
        toast.success('Bill saved successfully!');
      }

      // Clear form
      setItems([]);
      setCustomerName('');
      setCustomerMobile('');
      setCustomerPlace('');
      setDiscountPercent(0);
      setPaymentMethod('cash');
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save bill. Please try again.");
    }
  };

  const handleSavePrint = () => handleSaveBill(true);
  const handleSaveOnly = () => handleSaveBill(false);

  const handleWhatsApp = async () => {
    if (!customerMobile || customerMobile.length < 10) {
      toast.error("Valid customer mobile required for WhatsApp");
      return;
    }

    setIsGeneratingMessage(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const personalizedMessage = `Namaste ${customerName || 'Customer'}! 🙏 Thank you for choosing My Silk Store. We've just processed your bill for ₹${grandTotal.toLocaleString()}. Your exquisite collection of ${items.length} sarees is now ready. We hope to see you again soon! ✨`;

      window.open(`https://wa.me/91${customerMobile}?text=${encodeURIComponent(personalizedMessage)}`, '_blank');
      toast.success('AI-Personalized WhatsApp link opened! (Mock)');
    } catch (error) {
      console.error(error);
      const fallbackText = `Namaste ${customerName || 'Customer'}! Thank you for shopping with My Silk Store. Your bill for ₹${grandTotal} has been generated.`;
      window.open(`https://wa.me/91${customerMobile}?text=${encodeURIComponent(fallbackText)}`, '_blank');
      toast.info('WhatsApp opened with default message');
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  const handleHoldBill = () => {
    if (items.length === 0) {
      toast.error("No items to hold");
      return;
    }

    const billData: any = {
      items: items.map(item => ({
        sareeId: item.id,
        barcode: item.barcode,
        name: item.name,
        qty: item.qty,
        sellingPrice: item.sellingPrice,
        mrp: item.mrp,
        total: item.sellingPrice * item.qty
      })),
      customerName,
      customerMobile,
      customerPlace,
      customerType,
      subtotal,
      grandTotal,
      status: 'Hold',
      date: new Date().toISOString().split('T')[0]
    };

    addBill(billData);
    toast.info('Bill has been put on hold');

    // Clear form
    setItems([]);
    setCustomerName('');
    setCustomerMobile('');
    setCustomerPlace('');
  };

  const handleVoiceAction = (action: string, data: any) => {
    switch (action) {
      case 'ADD_TO_BILL':
        if (data.barcode) {
          const saree = sarees.find(s => s.barcode.toLowerCase() === data.barcode.toLowerCase());
          if (saree) {
            addItemToBill(saree);
          } else {
            toast.error(`Saree with barcode ${data.barcode} not found`);
          }
        }
        break;
      case 'SEARCH':
        if (data.query) {
          setBarcodeInput(data.query);
          // Small delay to ensure state update before search
          setTimeout(() => handleBarcodeSearch(), 100);
        }
        break;
      case 'CLEAR_FORM':
        setItems([]);
        setCustomerName('');
        setCustomerMobile('');
        setCustomerPlace('');
        setDiscountPercent(0);
        toast.info("Form cleared by voice command");
        break;
      case 'GENERATE_BILL':
        handleSaveBill(true);
        break;
      case 'APPLY_DISCOUNT':
        if (data.percentage) setDiscountPercent(Number(data.percentage));
        break;
      default:
        console.log("Unknown voice action:", action);
    }
  };


  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] animate-in fade-in duration-700 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      {/* Top Navigation / Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Elite <span className="text-silk-gold">Boutique POS</span>
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Workspace 01 • Active Transaction</p>
        </div>

        <div className="flex items-center gap-3">
          <VoiceAssistant onAction={handleVoiceAction} />
          <AIStylist onSelectProduct={addItemToBill} availableSarees={sarees.filter(s => s.status === 'available')} />
          <div className="h-10 w-[1px] bg-indigo-100 mx-2" />
          <Button variant="outline" size="lg" className="rounded-2xl gap-2 font-bold border-indigo-100 hover:bg-slate-50 transition-all shadow-sm" onClick={() => navigate('/bill-history')}>
            <History size={18} /> {t('nav.billHistory')}
          </Button>
          <Button variant="outline" size="lg" className="rounded-2xl gap-2 font-bold border-indigo-100 hover:bg-slate-50 transition-all shadow-sm" onClick={() => navigate('/hold-bills')}>
            <PauseCircle size={18} /> {t('nav.holdBills')}
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        {/* Left Side: Product Selection & Table */}
        <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
          {/* Customer & Search Panel */}
          <div className="glass-card p-6 rounded-[2rem] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Customer Selection</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-silk-gold transition-colors" size={18} />
                  <Input
                    placeholder={t('billing.searchCustomer')}
                    className="pl-10 h-12 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all"
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Barcode / Product Search</label>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-silk-gold transition-colors" size={18} />
                  <Input
                    ref={barcodeInputRef}
                    placeholder={t('billing.scanBarcode')}
                    className="pl-10 h-12 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleBarcodeSearch()}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="flex-1 glass-card rounded-[2.5rem] p-4 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto rounded-2xl">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-indigo-50 hover:bg-transparent">
                    <TableHead className="w-[120px] text-[10px] font-black uppercase tracking-widest text-slate-400 pl-6">Identity</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Details</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Price (₹)</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Qty</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right pr-6">Subtotal</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} className="border-b border-indigo-50/50 group transition-all hover:bg-slate-50/50">
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                            <span className="font-mono text-[10px] font-black text-slate-400 group-hover:text-silk-gold transition-colors">{item.barcode}</span>
                            <Badge variant="outline" className="w-fit text-[8px] font-black uppercase px-1.5 py-0 border-indigo-100 bg-white shadow-sm mt-1">
                                {item.stockType}
                            </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="py-2">
                          <p className="font-bold text-slate-900 text-sm group-hover:text-silk-gold transition-colors">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {item.color}
                              </span>
                              <span className="h-1 w-1 rounded-full bg-slate-200" />
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {item.designType}
                              </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                            <span className="font-bold text-slate-900 text-sm">₹{item.sellingPrice.toLocaleString()}</span>
                            {item.mrp > item.sellingPrice && (
                                <span className="text-[10px] line-through text-slate-400 font-medium">₹{item.mrp.toLocaleString()}</span>
                            )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-3">
                          <button
                            className="h-9 w-9 rounded-2xl border border-indigo-100 flex items-center justify-center text-slate-500 hover:bg-white hover:text-silk-gold hover:shadow-xl hover:shadow-gold-500/10 transition-all shadow-sm active:scale-90"
                            onClick={() => updateItemQty(item.id, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-black text-sm text-slate-900">{item.qty}</span>
                          <button
                            className="h-9 w-9 rounded-2xl border border-indigo-100 flex items-center justify-center text-slate-500 hover:bg-white hover:text-silk-gold hover:shadow-xl hover:shadow-gold-500/10 transition-all shadow-sm active:scale-90"
                            onClick={() => updateItemQty(item.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <span className="text-sm font-display font-bold text-indigo-600">
                            ₹{(item.sellingPrice * item.qty).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {items.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center space-y-6 opacity-40">
                            <div className="p-6 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                                <Barcode size={48} className="text-slate-300" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-display text-xl font-bold text-slate-400">Your basket is empty</p>
                                <p className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400">Scan products to begin transaction</p>
                            </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Right Side: Services & Summary */}
        <div className="flex flex-col gap-6">
          {/* Services Card */}
          <div className="glass-card p-8 rounded-[2.5rem] space-y-6 shadow-xl shadow-indigo-500/5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Scissors size={18} className="text-silk-gold" />
                    <h3 className="font-display text-lg font-bold text-slate-900 tracking-tight">Add-on Services</h3>
                </div>
                <Badge variant="outline" className="rounded-xl font-black text-[10px] uppercase border-indigo-100 text-slate-400 px-2.5">OPTIONAL</Badge>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {services.map((service) => (
                <div
                    key={service.id}
                    className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
                        service.enabled ? 'border-silk-gold bg-gold-50/20 shadow-lg shadow-gold-500/5' : 'border-indigo-50 bg-slate-50/30 hover:border-indigo-100 hover:bg-slate-50/50'
                    )}
                    onClick={() => toggleService(service.id)}
                >
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "h-6 w-6 rounded-lg border flex items-center justify-center transition-all duration-300",
                            service.enabled ? 'bg-silk-gold border-silk-gold text-white rotate-0' : 'border-indigo-100 bg-white group-hover:border-silk-gold text-transparent -rotate-12'
                        )}>
                            <Save size={12} className={cn(service.enabled ? 'scale-100' : 'scale-75')} />
                        </div>
                        <div>
                            <p className={cn("text-sm font-bold transition-colors", service.enabled ? 'text-slate-900' : 'text-slate-600')}>{service.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service.nameTamil}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={cn("text-sm font-black transition-colors", service.enabled ? 'text-silk-gold' : 'text-slate-400')}>₹{service.price}</span>
                    </div>
                </div>
                ))}
            </div>
          </div>

          {/* Checkout Card */}
          <div className="glass-card p-8 rounded-[2.5rem] flex-1 flex flex-col shadow-2xl shadow-indigo-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-silk-gold/5 rounded-full blur-3xl -z-10" />
            
            <div className="flex items-center gap-3 mb-8">
                <CreditCard size={18} className="text-silk-gold" />
                <h3 className="font-display text-xl font-bold text-slate-900 tracking-tight">Summary & Checkout</h3>
            </div>
            
            <div className="space-y-6 flex-1">
                <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Merchandise Subtotal</span>
                        <span className="text-sm font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bespoke Services</span>
                        <span className="text-sm font-bold text-slate-900">₹{servicesTotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-900/10 relative group transition-all hover:bg-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <Sparkles size={14} className="text-silk-gold" />
                                <span className="text-[10px] font-black text-silk-gold uppercase tracking-[0.2em]">Member Reward</span>
                            </div>
                            <div className="flex items-center gap-1 font-black text-silk-gold">
                                <span className="text-xs">- ₹</span>
                                <span className="text-lg">{discountValue.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={discountPercent}
                                onChange={(e) => {
                                    setDiscountPercent(Number(e.target.value));
                                    setDiscountAmount(0);
                                }}
                                className="h-10 text-sm font-bold rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:ring-silk-gold transition-all"
                                placeholder="Reward %"
                            />
                            <div className="h-10 px-4 rounded-xl bg-silk-gold/10 border border-silk-gold/20 flex items-center justify-center font-black text-xs text-silk-gold">%</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-[40px]" />

                <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000">
                        <Receipt size={140} />
                    </div>
                    <div className="relative z-10 space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 mb-2">Grand Total Payable</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-display font-medium opacity-80">₹</span>
                            <span className="text-6xl font-display font-bold tracking-tighter">{grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                    <Button 
                        className="h-20 rounded-[2rem] bg-silk-gold hover:bg-silk-gold/90 text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-gold-500/20 transition-all active:scale-95 group overflow-hidden relative"
                        onClick={() => handleSaveBill(true)}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Complete Transaction <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                        <Button 
                            variant="outline"
                            className="h-14 rounded-2xl border-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-50 transition-all shadow-sm group"
                            onClick={() => handleHoldBill()}
                        >
                            <PauseCircle size={16} className="mr-2 group-hover:scale-110 transition-transform" /> Hold
                        </Button>
                        <Button 
                            variant="outline"
                            className="h-14 rounded-2xl border-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm group"
                            onClick={handleWhatsApp}
                            disabled={isGeneratingMessage}
                        >
                            <MessageSquare size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                            {isGeneratingMessage ? '...' : 'WhatsApp'}
                        </Button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto rounded-[2.5rem] p-8 border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Search Marketplace</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {searchResults.map((saree) => (
              <div
                key={saree.id}
                className="group glass-card p-6 rounded-3xl border border-indigo-50 hover:border-silk-gold cursor-pointer transition-all"
                onClick={() => addItemToBill(saree)}
              >
                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-silk-gold mb-1">{saree.category}</p>
                  <h4 className="font-bold text-slate-900 truncate">{saree.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{saree.sareeCode}</p>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-lg font-display font-bold text-indigo-600">₹{saree.sellingPrice.toLocaleString()}</span>
                  <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <Plus size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Print Preview Dialog */}
      <Dialog open={isPrintPreviewOpen} onOpenChange={setIsPrintPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0 border-0 rounded-3xl shadow-2xl">
            <div className="sticky top-0 z-50 p-4 border-b border-glass flex justify-between bg-white/80 backdrop-blur-md">
                <h3 className="font-bold uppercase tracking-widest text-xs">Invoice Preview</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsPrintPreviewOpen(false)} className="rounded-xl">Close</Button>
                    <Button className="bg-silk-gold text-white font-bold rounded-xl px-6" onClick={() => handlePrint()}>Print Invoice</Button>
                </div>
            </div>
            <div className="p-8">
                {/* Invoice Component Ref */}
                <div ref={invoiceRef} className="bg-white">
                    {/* Minimalist Invoice Design */}
                    <div className="p-10 border-[10px] border-slate-50 rounded-xl relative">
                        <div className="absolute top-0 right-0 p-10">
                            <h2 className="text-4xl font-display font-bold text-slate-200">INVOICE</h2>
                        </div>
                        <div className="mb-12">
                            <h1 className="text-3xl font-display font-black tracking-tight text-slate-900">VV SILK STORE</h1>
                            <p className="text-xs font-bold text-silk-gold uppercase tracking-widest">Premium Boutique POS</p>
                        </div>

                        <div className="grid grid-cols-2 gap-20 mb-12">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Billed To</p>
                                <p className="font-bold text-slate-800">{customerName || 'Walk-in Customer'}</p>
                                <p className="text-sm font-medium text-slate-500">{customerMobile}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Status</p>
                                <p className="font-bold text-emerald-600 uppercase tracking-widest">{lastBill?.status || 'PAID'}</p>
                                <p className="text-sm font-medium text-slate-500 mt-1">{lastBill?.date}</p>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-2 border-slate-900 border-t-0 hover:bg-transparent">
                                    <TableHead className="text-slate-900 font-black">ITEM</TableHead>
                                    <TableHead className="text-right text-slate-900 font-black">PRICE</TableHead>
                                    <TableHead className="text-center text-slate-900 font-black">QTY</TableHead>
                                    <TableHead className="text-right text-slate-900 font-black">TOTAL</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id} className="border-b border-slate-100 hover:bg-transparent">
                                        <TableCell className="font-bold py-4">
                                            {item.name}
                                            <p className="text-[10px] text-slate-400 font-medium">{item.barcode}</p>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">₹{item.sellingPrice.toLocaleString()}</TableCell>
                                        <TableCell className="text-center font-bold">{item.qty}</TableCell>
                                        <TableCell className="text-right font-black">₹{(item.sellingPrice * item.qty).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="mt-12 flex justify-end">
                            <div className="w-64 space-y-4">
                                <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-silk-gold font-bold uppercase tracking-widest text-[10px]">
                                    <span>Savings</span>
                                    <span>- ₹{discountValue.toLocaleString()}</span>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                    <span className="font-black text-slate-900 uppercase tracking-[0.2em] text-xs">Total Amount</span>
                                    <span className="text-2xl font-display font-black text-slate-900">₹{grandTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 pt-10 border-t border-slate-50 text-center">
                            <p className="font-display font-bold text-slate-400 italic">Thank you for choosing high fashion.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
