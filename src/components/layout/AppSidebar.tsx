import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  History,
  PauseCircle,
  Users,
  Package,
  Warehouse,
  Settings2,
  ShoppingCart,
  Truck,
  RotateCcw,
  ArrowLeftRight,
  Scissors,
  CalendarCheck,
  CreditCard,
  DollarSign,
  UserCog,
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
  Shield,
  Database,
  Palette,
  ChevronDown,
  Store,
  Barcode,
  Heart,
  Zap,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface NavItem {
  title: string;
  titleKey: string;
  url: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { title: 'Dashboard', titleKey: 'nav.dashboard', url: '/dashboard', icon: LayoutDashboard },
      { title: 'New Bill', titleKey: 'nav.billing', url: '/billing', icon: Receipt },
      { title: 'AI Business Suite', titleKey: 'nav.aiBusinessSuite', url: '/ai-business-suite', icon: Zap },
      { title: 'Wedding Lookbook', titleKey: 'nav.weddingLookbook', url: '/wedding-lookbook', icon: Heart },
      { title: 'Bill History', titleKey: 'nav.billHistory', url: '/bill-history', icon: History },
      { title: 'Hold Bills', titleKey: 'nav.holdBills', url: '/hold-bills', icon: PauseCircle },
    ],
  },
  {
    label: 'Customers',
    items: [
      { title: 'Customers', titleKey: 'nav.customers', url: '/customers', icon: Users },
      { title: 'Due/Credit', titleKey: 'nav.dues', url: '/dues', icon: CreditCard },
    ],
  },
  {
    label: 'Inventory',
    items: [
      { title: 'Product Master', titleKey: 'nav.products', url: '/products', icon: Package },
      { title: 'Stock List', titleKey: 'nav.inventory', url: '/inventory', icon: Warehouse },
      { title: 'Stock Adjustment', titleKey: 'nav.stockAdjust', url: '/stock-adjustment', icon: Settings2 },
      { title: 'Barcode Generator', titleKey: 'nav.barcode', url: '/barcode-generator', icon: Barcode },
    ],
  },
  {
    label: 'Purchase',
    items: [
      { title: 'Purchase Entry', titleKey: 'nav.purchase', url: '/purchase', icon: ShoppingCart },
      { title: 'Suppliers', titleKey: 'nav.suppliers', url: '/suppliers', icon: Truck },
      { title: 'Purchase Return', titleKey: 'nav.purchaseReturn', url: '/purchase-return', icon: RotateCcw },
    ],
  },
  {
    label: 'Sales',
    items: [
      { title: 'Returns/Exchange', titleKey: 'nav.returns', url: '/returns', icon: ArrowLeftRight },
      { title: 'Alterations', titleKey: 'nav.alterations', url: '/alterations', icon: Scissors },
      { title: 'Order Booking', titleKey: 'nav.orders', url: '/orders', icon: CalendarCheck },
    ],
  },
  {
    label: 'Finance',
    items: [
      { title: 'Expenses', titleKey: 'nav.expenses', url: '/expenses', icon: DollarSign },
      { title: 'Staff & Commission', titleKey: 'nav.staff', url: '/staff', icon: UserCog },
    ],
  },
  {
    label: 'Reports',
    items: [
      { title: 'Reports', titleKey: 'nav.reports', url: '/reports', icon: BarChart3 },
      { title: 'GST Reports', titleKey: 'nav.gstReports', url: '/gst-reports', icon: FileText },
    ],
  },
  {
    label: 'Settings',
    items: [
      { title: 'WhatsApp', titleKey: 'nav.whatsapp', url: '/whatsapp', icon: MessageSquare },
      { title: 'Settings', titleKey: 'nav.settings', url: '/settings', icon: Settings },
      { title: 'Users & Roles', titleKey: 'nav.users', url: '/settings', icon: Shield },
      { title: 'Data Backup', titleKey: 'nav.backup', url: '/backup', icon: Database },
      { title: 'Smart Migration', titleKey: 'nav.migration', url: '/migration', icon: RotateCcw },
      { title: 'Customization', titleKey: 'nav.customize', url: '/admin-customization', icon: Palette },
    ],
  },
];

export const AppSidebar: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar className="border-r-0 bg-transparent flex flex-col h-screen">
      <div className="absolute inset-0 silk-pattern opacity-10 pointer-events-none" />
      <SidebarHeader className="border-b border-glass px-6 py-8 relative">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-silk-gold shadow-lg shadow-gold-500/20">
            <Store className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                VV SILK
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-silk-gold uppercase opacity-80">
                Premium Boutique
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6 glass-card border-0 m-2 rounded-3xl flex-1">
        {navGroups.map((group) => (
          <Collapsible key={group.label} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 hover:text-sidebar-foreground/70">
                  {!collapsed && group.label}
                  {!collapsed && (
                    <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.titleKey}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.url)}
                          tooltip={collapsed ? t(item.titleKey) : undefined}
                          className="h-11"
                        >
                          <NavLink
                            to={item.url}
                            className={cn(
                              'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 w-full',
                              isActive(item.url)
                                ? 'bg-silk-gold text-white shadow-lg shadow-gold-500/30 scale-[1.02] active-link'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white'
                            )}
                          >
                            <item.icon className={cn("h-5 w-5 shrink-0", isActive(item.url) ? "text-white" : "text-slate-400")} />
                            {!collapsed && <span className={cn(isActive(item.url) ? "text-white" : "")}>{t(item.titleKey)}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
