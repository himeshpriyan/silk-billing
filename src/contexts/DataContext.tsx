import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { 
    Saree, 
    Supplier, 
    Customer,
    AdjustmentItem, 
    Purchase, 
    AlterationJob, 
    Order, 
    Staff, 
    Bill,
    Expense 
} from '@/types';
import { 
    MOCK_SAREES, 
    MOCK_SUPPLIERS, 
    MOCK_CUSTOMERS,
    MOCK_BILLS, 
    MOCK_STAFF, 
    MOCK_EXPENSES,
    MOCK_ADJUSTMENTS,
    MOCK_PURCHASES,
    MOCK_ALTERATIONS,
    MOCK_ORDERS,
    MOCK_SETTINGS 
} from '@/lib/mock-data';

const STORAGE_KEYS = {
    SAREES: 'silk_store_sarees',
    SUPPLIERS: 'silk_store_suppliers',
    CUSTOMERS: 'silk_store_customers',
    ADJUSTMENTS: 'silk_store_adjustments',
    PURCHASES: 'silk_store_purchases',
    ALTERATIONS: 'silk_store_alterations',
    ORDERS: 'silk_store_orders',
    STAFF: 'silk_store_staff',
    BILLS: 'silk_store_bills',
    EXPENSES: 'silk_store_expenses',
    SETTINGS: 'silk_store_settings',
};

function loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
    } catch (e) {
        console.warn(`Error reading ${key} from localStorage:`, e);
    }
    return defaultValue;
}

function saveToStorage<T>(key: string, value: T) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn(`Error writing ${key} to localStorage:`, e);
    }
}

interface DataContextType {
    sarees: Saree[];
    suppliers: Supplier[];
    customers: Customer[];
    adjustments: AdjustmentItem[];
    purchases: Purchase[];
    alterations: AlterationJob[];
    orders: Order[];
    staffList: Staff[];
    bills: Bill[];
    expenses: Expense[];
    settings: any;

    addSaree: (saree: Saree) => Promise<Saree>;
    updateSaree: (id: string, updates: Partial<Saree>) => Promise<boolean>;
    deleteSaree: (id: string) => Promise<void>;

    addSupplier: (supplier: Supplier) => Promise<void>;
    updateSupplier: (id: string, updates: Partial<Supplier>) => Promise<void>;
    deleteSupplier: (id: string) => Promise<void>;

    addCustomer: (customer: Customer) => Promise<Customer>;
    updateCustomer: (id: string, updates: Partial<Customer>) => Promise<boolean>;
    deleteCustomer: (id: string) => Promise<void>;

    addAdjustment: (adjustment: AdjustmentItem) => Promise<void>;
    addPurchase: (purchase: Purchase) => Promise<void>;

    addAlteration: (job: AlterationJob) => Promise<void>;
    updateAlteration: (id: string, updates: Partial<AlterationJob>) => Promise<void>;

    addOrder: (order: Order) => Promise<void>;
    updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;

    addStaff: (staff: Staff) => Promise<void>;
    updateStaff: (id: string, updates: Partial<Staff>) => Promise<void>;

    addBill: (bill: Bill) => Promise<Bill>;
    
    addExpense: (expense: any) => void;
    deleteExpense: (id: string) => void;

    updateSettings: (updates: any) => Promise<void>;
    resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sarees, setSarees] = useState<Saree[]>(() => loadFromStorage(STORAGE_KEYS.SAREES, MOCK_SAREES));
    const [suppliers, setSuppliers] = useState<Supplier[]>(() => loadFromStorage(STORAGE_KEYS.SUPPLIERS, MOCK_SUPPLIERS));
    const [customers, setCustomers] = useState<Customer[]>(() => loadFromStorage(STORAGE_KEYS.CUSTOMERS, MOCK_CUSTOMERS));
    const [adjustments, setAdjustments] = useState<AdjustmentItem[]>(() => loadFromStorage(STORAGE_KEYS.ADJUSTMENTS, MOCK_ADJUSTMENTS));
    const [purchases, setPurchases] = useState<Purchase[]>(() => loadFromStorage(STORAGE_KEYS.PURCHASES, MOCK_PURCHASES));
    const [alterations, setAlterations] = useState<AlterationJob[]>(() => loadFromStorage(STORAGE_KEYS.ALTERATIONS, MOCK_ALTERATIONS));
    const [orders, setOrders] = useState<Order[]>(() => loadFromStorage(STORAGE_KEYS.ORDERS, MOCK_ORDERS));
    const [staffList, setStaffList] = useState<Staff[]>(() => loadFromStorage(STORAGE_KEYS.STAFF, MOCK_STAFF));
    const [bills, setBills] = useState<Bill[]>(() => loadFromStorage(STORAGE_KEYS.BILLS, MOCK_BILLS));
    const [expenses, setExpenses] = useState<Expense[]>(() => loadFromStorage(STORAGE_KEYS.EXPENSES, MOCK_EXPENSES));
    const [settings, setSettings] = useState<any>(() => loadFromStorage(STORAGE_KEYS.SETTINGS, MOCK_SETTINGS));

    // Save state changes to localStorage
    useEffect(() => { saveToStorage(STORAGE_KEYS.SAREES, sarees); }, [sarees]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.SUPPLIERS, suppliers); }, [suppliers]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.CUSTOMERS, customers); }, [customers]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.ADJUSTMENTS, adjustments); }, [adjustments]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.PURCHASES, purchases); }, [purchases]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.ALTERATIONS, alterations); }, [alterations]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.ORDERS, orders); }, [orders]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.STAFF, staffList); }, [staffList]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.BILLS, bills); }, [bills]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.EXPENSES, expenses); }, [expenses]);
    useEffect(() => { saveToStorage(STORAGE_KEYS.SETTINGS, settings); }, [settings]);

    const addSaree = async (saree: Saree) => {
        const newSaree = { 
            ...saree, 
            id: saree.id || `saree_${Date.now()}`,
            addedDate: saree.addedDate || new Date().toISOString()
        };
        setSarees((prev) => [newSaree, ...prev]);
        toast.success("Saree added successfully");
        return newSaree;
    };

    const updateSaree = async (id: string, updates: Partial<Saree>) => {
        setSarees((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
        toast.success("Saree updated successfully");
        return true;
    };

    const deleteSaree = async (id: string) => {
        setSarees((prev) => prev.filter((saree) => saree.id !== id));
        toast.success("Saree deleted successfully");
    };

    const addSupplier = async (supplier: Supplier) => {
        const newSupplier = { ...supplier, id: supplier.id || `sup_${Date.now()}` };
        setSuppliers(prev => [...prev, newSupplier]);
        toast.success("Supplier added successfully");
    };

    const updateSupplier = async (id: string, updates: Partial<Supplier>) => {
        setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
        toast.success("Supplier updated successfully");
    };

    const deleteSupplier = async (id: string) => {
        setSuppliers(prev => prev.filter(s => s.id !== id));
        toast.success("Supplier deleted successfully");
    };

    const addCustomer = async (customer: Customer) => {
        const newCustomer: Customer = {
            ...customer,
            id: customer.id || `cust_${Date.now()}`,
            totalPurchase: customer.totalPurchase || 0,
            billsCount: customer.billsCount || 0,
            pendingDue: customer.pendingDue || 0,
            lastPurchase: customer.lastPurchase || new Date().toISOString().split('T')[0]
        };
        setCustomers(prev => [newCustomer, ...prev]);
        toast.success("Customer added successfully");
        return newCustomer;
    };

    const updateCustomer = async (id: string, updates: Partial<Customer>) => {
        setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
        toast.success("Customer updated successfully");
        return true;
    };

    const deleteCustomer = async (id: string) => {
        setCustomers(prev => prev.filter(c => c.id !== id));
        toast.success("Customer deleted successfully");
    };

    const addAdjustment = async (adjustment: AdjustmentItem) => {
        const newAdj = { ...adjustment, id: adjustment.id || `adj_${Date.now()}` };
        setAdjustments(prev => [newAdj, ...prev]);
        // Also update stock quantity of affected saree if found
        setSarees(prev => prev.map(s => {
            if (s.barcode === adjustment.barcode) {
                return { ...s, stockQty: Math.max(0, s.stockQty + adjustment.adjustQty) };
            }
            return s;
        }));
        toast.success("Stock adjustment recorded");
    };

    const addPurchase = async (purchase: Purchase) => {
        const newPurchase = { ...purchase, id: purchase.id || `pur_${Date.now()}` };
        setPurchases(prev => [newPurchase, ...prev]);
        // Increment stock for purchased items
        setSarees(prev => prev.map(s => {
            const purchased = purchase.items.find(pi => pi.barcode === s.barcode);
            if (purchased) {
                return { ...s, stockQty: s.stockQty + purchased.qty };
            }
            return s;
        }));
        toast.success("Purchase entry added successfully");
    };

    const addAlteration = async (job: AlterationJob) => {
        const newJob = { ...job, id: job.id || `alt_${Date.now()}` };
        setAlterations(prev => [newJob, ...prev]);
        toast.success("Alteration job created");
    };

    const updateAlteration = async (id: string, updates: Partial<AlterationJob>) => {
        setAlterations(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
        toast.success("Alteration job updated");
    };

    const addOrder = async (order: Order) => {
        const newOrder = { ...order, id: order.id || `ord_${Date.now()}` };
        setOrders(prev => [newOrder, ...prev]);
        toast.success("Custom order booked successfully");
    };

    const updateOrder = async (id: string, updates: Partial<Order>) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
        toast.success("Order updated successfully");
    };

    const addStaff = async (staff: Staff) => {
        const newStaff = { ...staff, id: staff.id || `staff_${Date.now()}` };
        setStaffList(prev => [...prev, newStaff]);
        toast.success("Staff member added successfully");
    };

    const updateStaff = async (id: string, updates: Partial<Staff>) => {
        setStaffList(prev => prev.map(st => st.id === id ? { ...st, ...updates } : st));
        toast.success("Staff updated successfully");
    };

    const addBill = async (bill: Bill) => {
        const newBill = { 
            ...bill, 
            id: bill.id || `bill_${Date.now()}`,
            billNo: bill.billNo || `BILL-${new Date().getFullYear()}-${String(bills.length + 1).padStart(3, '0')}`,
            date: bill.date || new Date().toISOString()
        };
        setBills(prev => [newBill, ...prev]);

        // Automatically deduct stock for items sold
        setSarees(prev => prev.map(s => {
            const soldItem = newBill.items.find(item => item.barcode === s.barcode || item.sareeId === s.id);
            if (soldItem) {
                const newQty = Math.max(0, s.stockQty - soldItem.qty);
                return { 
                    ...s, 
                    stockQty: newQty,
                    status: newQty === 0 && s.stockType === 'unique' ? 'sold' : s.status
                };
            }
            return s;
        }));

        // Enforce or update customer purchase summary
        if (newBill.customerMobile) {
            setCustomers(prev => {
                const existingIndex = prev.findIndex(c => c.mobile === newBill.customerMobile);
                if (existingIndex >= 0) {
                    const existing = prev[existingIndex];
                    const updated = {
                        ...existing,
                        totalPurchase: (existing.totalPurchase || 0) + newBill.grandTotal,
                        billsCount: (existing.billsCount || 0) + 1,
                        lastPurchase: new Date().toISOString().split('T')[0]
                    };
                    const next = [...prev];
                    next[existingIndex] = updated;
                    return next;
                } else if (newBill.customerName) {
                    const newCust: Customer = {
                        id: `cust_${Date.now()}`,
                        name: newBill.customerName,
                        mobile: newBill.customerMobile,
                        place: newBill.customerPlace || 'Local',
                        type: newBill.customerType || 'Retail',
                        totalPurchase: newBill.grandTotal,
                        billsCount: 1,
                        pendingDue: newBill.dueAmount || 0,
                        lastPurchase: new Date().toISOString().split('T')[0]
                    };
                    return [newCust, ...prev];
                }
                return prev;
            });
        }

        toast.success("Bill generated successfully");
        return newBill;
    };

    const addExpense = (expense: any) => {
        const newExpense: Expense = { 
            ...expense, 
            id: expense.id || expense._id || `exp_${Date.now()}`,
            _id: expense._id || expense.id || `exp_${Date.now()}`,
            date: expense.date || new Date().toISOString().split('T')[0]
        };
        setExpenses(prev => [newExpense, ...prev]);
        toast.success("Expense recorded successfully");
    };

    const deleteExpense = (id: string) => {
        setExpenses(prev => prev.filter(e => (e.id !== id && e._id !== id)));
        toast.success("Expense deleted");
    };

    const updateSettings = async (updates: any) => {
        setSettings(prev => ({ ...prev, ...updates }));
        toast.success('Settings updated successfully');
    };

    const resetToDefaults = () => {
        setSarees(MOCK_SAREES);
        setSuppliers(MOCK_SUPPLIERS);
        setCustomers(MOCK_CUSTOMERS);
        setAdjustments(MOCK_ADJUSTMENTS);
        setPurchases(MOCK_PURCHASES);
        setAlterations(MOCK_ALTERATIONS);
        setOrders(MOCK_ORDERS);
        setStaffList(MOCK_STAFF);
        setBills(MOCK_BILLS);
        setExpenses(MOCK_EXPENSES);
        setSettings(MOCK_SETTINGS);

        Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
        toast.success('Reset all data to default mock records');
    };

    return (
        <DataContext.Provider
            value={{
                sarees,
                suppliers,
                customers,
                adjustments,
                purchases,
                alterations,
                orders,
                staffList,
                bills,
                expenses,
                settings,
                addSaree,
                updateSaree,
                deleteSaree,
                addSupplier,
                updateSupplier,
                deleteSupplier,
                addCustomer,
                updateCustomer,
                deleteCustomer,
                addAdjustment,
                addPurchase,
                addAlteration,
                updateAlteration,
                addOrder,
                updateOrder,
                addStaff,
                updateStaff,
                addBill,
                addExpense,
                deleteExpense,
                updateSettings,
                resetToDefaults
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
