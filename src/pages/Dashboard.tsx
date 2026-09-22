import React from 'react';
import {
  TrendingUp,
  Receipt,
  Banknote,
  Smartphone,
  CreditCard,
  Clock,
  RotateCcw,
  Package,
  AlertTriangle,
  Star,
  Plus,
  ShoppingCart,
  ArrowLeftRight,
  BarChart3,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { AIInsights } from '@/components/AIInsights';
import { cn } from '@/lib/utils';

interface StatCard {
  titleKey: string;
  value: string;
  subValue?: string;
  icon: React.ElementType;
  trend?: { value: string; positive: boolean };
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'destructive';
}

const quickActions = [
  { label: 'New Bill', icon: Plus, path: '/billing', variant: 'gold' as const },
  { label: 'Purchase Entry', icon: ShoppingCart, path: '/purchase', variant: 'maroon' as const },
  { label: 'Add Stock', icon: Package, path: '/products', variant: 'default' as const },
  { label: 'Return/Exchange', icon: ArrowLeftRight, path: '/returns', variant: 'outline' as const },
  { label: 'Reports', icon: BarChart3, path: '/reports', variant: 'outline' as const },
  { label: 'Order Booking', icon: CalendarCheck, path: '/orders', variant: 'outline' as const },
];

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bills, sarees, orders, settings } = useData();

  // Statistics Calculation
  const today = new Date().toISOString().split('T')[0];
  const todaysBills = bills.filter(b => b.date === today && (b.status === 'Paid' || b.status === 'Due'));
  const totalSalesToday = todaysBills.reduce((sum, b) => sum + (b.grandTotal || 0), 0);

  const totalStockValue = sarees.reduce((sum, s) => sum + ((s.purchasePrice || 0) * (s.stockQty || 0)), 0);
  const totalStockCount = sarees.reduce((sum, s) => sum + (s.stockQty || 0), 0);

  const lowStockItems = sarees
    .filter(s => s.stockQty < 3 && s.status === 'available')
    .slice(0, 5);

  const recentBillsData = bills
    .slice(0, 5)
    .map(b => ({
      id: b.billNo || b.id,
      customer: b.customerName || 'Unknown',
      amount: `₹${b.grandTotal.toLocaleString()}`,
      time: b.date,
      status: b.status
    }));

  const [bestSelling, setBestSelling] = React.useState<{ name: string; sales: number; revenue: string }[]>([]);

  React.useEffect(() => {
    // Simulate fetching best selling data
    const mockBestSelling = [
        { name: 'Kanchipuram Silk', sales: 45, revenue: '₹8,32,500' },
        { name: 'Banarasi Silk', sales: 32, revenue: '₹4,32,000' },
        { name: 'Soft Silk', sales: 28, revenue: '₹2,10,000' },
        { name: 'Traditional Cotton', sales: 15, revenue: '₹45,000' }
    ];
    setBestSelling(mockBestSelling);
  }, []);

  const stats: StatCard[] = [
    {
      titleKey: 'dashboard.todaySales',
      value: `₹${totalSalesToday.toLocaleString()}`,
      subValue: `${todaysBills.length} bills`,
      icon: TrendingUp,
      color: 'primary',
      visible: settings?.visibleWidgets?.todaySales !== false
    },
    {
      titleKey: 'dashboard.stockValue',
      value: `₹${totalStockValue.toLocaleString()}`,
      subValue: `${totalStockCount} items`,
      icon: Package,
      color: 'success',
      visible: true // Always visible
    },
    {
      titleKey: 'dashboard.orders',
      value: `${orders.filter(o => o.status === 'Booked').length}`,
      subValue: 'Pending Orders',
      icon: ShoppingCart,
      color: 'warning',
      visible: true // Always visible
    },
    {
      titleKey: 'dashboard.lowStock',
      value: `${lowStockItems.length}`,
      subValue: 'Items need reorder',
      icon: AlertTriangle,
      color: 'destructive',
      visible: settings?.visibleWidgets?.lowStock !== false
    }
  ].filter(s => (s as any).visible) as StatCard[];

  const getColorClasses = (color: StatCard['color']) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'secondary':
        return 'bg-secondary/20 text-secondary-foreground';
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'info':
        return 'bg-info/10 text-info';
      case 'destructive':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back, <span className="text-silk-gold">{user?.name}</span>
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            Strategic overview of <span className="text-indigo-600 font-bold uppercase tracking-widest text-[10px]">VV Silk Store</span>
          </p>
        </div>
        <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-2xl border-indigo-100 shadow-sm">
          <Clock className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'short'
            })}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => (
            <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="glass-card group flex flex-col items-center justify-center p-6 gap-3 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
                <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
                    action.variant === 'gold' ? 'bg-silk-gold text-white shadow-lg shadow-gold-500/20' : 
                    action.variant === 'maroon' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                )}>
                    <action.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-900">{action.label}</span>
            </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.titleKey}
            className="group glass-card border-0 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1 overflow-hidden"
          >
            <CardContent className="p-6 relative">
              <div className="absolute bottom-0 right-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <stat.icon size={80} />
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  {t(stat.titleKey)}
                </p>
                <div className={`rounded-xl p-2 ${getColorClasses(stat.color)}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-display font-bold text-slate-900 dark:text-white">{stat.value}</p>
                {stat.subValue && (
                  <p className="text-xs font-medium text-slate-400">{stat.subValue}</p>
                )}
              </div>
              {stat.trend && (
                <div className="mt-4 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                        "border-0 px-2 py-0 text-[10px] font-bold",
                        stat.trend.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    )}
                  >
                    {stat.trend.positive ? '+' : ''}{stat.trend.value}
                  </Badge>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Trend</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* AI Business Intelligence */}
      <AIInsights />

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Bills */}
        <Card className="glass-card border-0 lg:col-span-2 overflow-hidden">
          <CardHeader className="pb-4 border-b border-glass">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-xl font-bold">Recent Transactions</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Live Sales Feed</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-silk-gold font-bold hover:text-silk-gold hover:bg-gold-50" onClick={() => navigate('/billing')}>
                View Ledger <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-glass">
              {recentBillsData.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-5 transition-all hover:bg-slate-50/50 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Receipt className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{bill.id}</p>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{bill.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-lg font-display font-bold text-slate-900">{bill.amount}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{bill.time}</span>
                    </div>
                    <Badge
                        variant="outline"
                        className={cn(
                            "border-0 px-3 py-1 font-bold text-[10px] uppercase tracking-wider",
                            bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        )}
                    >
                        {bill.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {recentBillsData.length === 0 && <p className="p-10 text-center text-slate-400 font-medium">No transactions recorded today</p>}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        {settings?.visibleWidgets?.lowStock !== false && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <CardTitle className="font-display text-lg">{t('dashboard.lowStock')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-warning/30 bg-warning/5 p-3"
                  >
                    <p className="font-medium text-foreground">{item.name}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Stock: <span className="font-semibold text-warning">{item.stockQty}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Type: {item.stockType}
                      </span>
                    </div>
                  </div>
                ))}
                {lowStockItems.length === 0 && <p className="text-center text-muted-foreground">No stock alerts</p>}
              </div>
              <Button variant="outline" className="mt-4 w-full" onClick={() => navigate('/products')}>
                View All Stock
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Best Selling */}
      <Card className="glass-card border-0 overflow-hidden">
        <CardHeader className="pb-6 border-b border-glass">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Star className="h-5 w-5 fill-current" />
            </div>
            <div>
                <CardTitle className="font-display text-xl font-bold">Top Performing Categories</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Inventory Performance</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSelling.map((item, index) => (
              <div
                key={item.name}
                className="group relative flex flex-col p-6 rounded-3xl border border-slate-100 hover:border-silk-gold/30 hover:bg-gold-50/20 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-4xl font-display font-black text-slate-100 group-hover:text-gold-100 transition-colors">
                  0{index + 1}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Category</p>
                <h4 className="text-lg font-bold text-slate-900 mb-4">{item.name}</h4>
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{item.sales} sold</span>
                    <span className="text-sm font-bold text-silk-gold">{item.revenue}</span>
                </div>
              </div>
            ))}
            {bestSelling.length === 0 && (
              <div className="col-span-full text-center text-slate-400 py-12 font-medium">
                Sufficient sales data not yet available for ranking
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
