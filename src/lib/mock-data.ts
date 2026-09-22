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

export const MOCK_SAREES: Saree[] = [
    {
        id: '1',
        sareeCode: 'KJS001',
        barcode: '100001',
        name: 'Kanchipuram Silk Saree - Bridal Red',
        nameTamil: 'காஞ்சிபுரம் பட்டு சேலை - மணமகள் சிவப்பு',
        category: 'Silk',
        department: 'Saree',
        brand: 'Temple Collection',
        material: 'Pure Silk',
        zariType: 'Gold Zari',
        borderType: 'Big Border',
        color: 'Maroon',
        designType: 'Traditional',
        length: '6.2m',
        weight: '750g',
        blouseIncluded: true,
        blousePiece: 'Contrast',
        purchasePrice: 12000,
        sellingPrice: 18500,
        mrp: 22000,
        gstPercent: 5,
        stockType: 'unique',
        stockQty: 3,
        rackLocation: 'A1-R1',
        supplier: 'Ethical Weaves',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d3752c?q=80&w=400&auto=format&fit=crop'],
        description: 'Handwoven Kanchipuram silk saree with intricate gold zari work and korvai border.',
        status: 'available',
        addedDate: '2024-03-01T10:00:00.000Z'
    },
    {
        id: '2',
        sareeCode: 'BS002',
        barcode: '100002',
        name: 'Banarasi Brocade Silk Saree',
        nameTamil: 'பனாரசி புரோகேட் பட்டு சேலை',
        category: 'Silk',
        department: 'Saree',
        brand: 'Varanasi Heritage',
        material: 'Pure Silk',
        zariType: 'Silver Zari',
        borderType: 'Medium Border',
        color: 'Royal Blue',
        designType: 'Floral Butta',
        length: '6.2m',
        weight: '800g',
        blouseIncluded: true,
        blousePiece: 'Running',
        purchasePrice: 8500,
        sellingPrice: 13500,
        mrp: 16000,
        gstPercent: 5,
        stockType: 'unique',
        stockQty: 2,
        rackLocation: 'A1-R2',
        supplier: 'Banaras Hub',
        images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=400&auto=format&fit=crop'],
        description: 'Elegant Banarasi silk saree with kadhwa weave and silver floral motifs.',
        status: 'available',
        addedDate: '2024-03-05T11:30:00.000Z'
    },
    {
        id: '3',
        sareeCode: 'ARS003',
        barcode: '100003',
        name: 'Arani Pure Soft Silk Saree',
        nameTamil: 'ஆரணி சாப்ட் சில்க் சேலை',
        category: 'Soft Silk',
        department: 'Saree',
        brand: 'Arani Handlooms',
        material: 'Soft Silk',
        zariType: 'Copper Zari',
        borderType: 'Contrast Border',
        color: 'Mustard Yellow & Teal',
        designType: 'Geometric Butta',
        length: '6.2m',
        weight: '550g',
        blouseIncluded: true,
        blousePiece: 'Contrast',
        purchasePrice: 5500,
        sellingPrice: 8900,
        mrp: 11000,
        gstPercent: 5,
        stockType: 'bulk',
        stockQty: 8,
        rackLocation: 'B2-R3',
        supplier: 'Arani Silk Weavers',
        images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop'],
        description: 'Lightweight soft silk saree ideal for festive events and wedding functions.',
        status: 'available',
        addedDate: '2024-03-10T14:20:00.000Z'
    },
    {
        id: '4',
        sareeCode: 'TSS004',
        barcode: '100004',
        name: 'Tussar Silk Embroidered Saree',
        nameTamil: 'தசர் பட்டு எம்பிராய்டரி சேலை',
        category: 'Tussar',
        department: 'Saree',
        brand: 'Tribal Weaves',
        material: 'Tussar Silk',
        zariType: 'Thread Work',
        borderType: 'Embroidered Border',
        color: 'Natural Beige',
        designType: 'Kantha Stitch',
        length: '6.3m',
        weight: '600g',
        blouseIncluded: true,
        blousePiece: 'Contrast',
        purchasePrice: 4200,
        sellingPrice: 6800,
        mrp: 8500,
        gstPercent: 5,
        stockType: 'bulk',
        stockQty: 5,
        rackLocation: 'C1-R1',
        supplier: 'Desi Loom Collective',
        images: ['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=400&auto=format&fit=crop'],
        description: 'Handcrafted Tussar silk saree with authentic kantha hand-embroidery.',
        status: 'available',
        addedDate: '2024-03-12T09:15:00.000Z'
    },
    {
        id: '5',
        sareeCode: 'DHS005',
        barcode: '100005',
        name: 'Dharmavaram Wedding Pattu Saree',
        nameTamil: 'தர்மவரம் திருமண பட்டு சேலை',
        category: 'Silk',
        department: 'Saree',
        brand: 'Andhra Silks',
        material: 'Pure Silk',
        zariType: 'Gold Zari',
        borderType: 'Double Border',
        color: 'Emerald Green',
        designType: 'Peacock Motif',
        length: '6.2m',
        weight: '820g',
        blouseIncluded: true,
        blousePiece: 'Attached',
        purchasePrice: 14000,
        sellingPrice: 21500,
        mrp: 26000,
        gstPercent: 5,
        stockType: 'unique',
        stockQty: 2,
        rackLocation: 'A2-R1',
        supplier: 'Ethical Weaves',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d3752c?q=80&w=400&auto=format&fit=crop'],
        description: 'Heavy grand bridal saree with rich peacock pallu and embossed body motifs.',
        status: 'available',
        addedDate: '2024-03-15T16:00:00.000Z'
    }
];

export const MOCK_SUPPLIERS: Supplier[] = [
    {
        id: 's1',
        name: 'Ethical Weaves',
        contactPerson: 'Ramesh Sundaram',
        mobile: '9876543210',
        gstin: '33AAAAA0000A1Z5',
        location: 'Kanchipuram, Tamil Nadu',
        pendingDue: 50000
    },
    {
        id: 's2',
        name: 'Banaras Hub',
        contactPerson: 'Suresh Agarwal',
        mobile: '9876543211',
        gstin: '09BBBBB1111B1Z6',
        location: 'Varanasi, Uttar Pradesh',
        pendingDue: 25000
    },
    {
        id: 's3',
        name: 'Arani Silk Weavers Co-op',
        contactPerson: 'K. Balaji',
        mobile: '9443322110',
        gstin: '33CCCCC2222C1Z7',
        location: 'Arani, Tamil Nadu',
        pendingDue: 18000
    },
    {
        id: 's4',
        name: 'Desi Loom Collective',
        contactPerson: 'Manish Verma',
        mobile: '9123456780',
        gstin: '20DDDDD3333D1Z8',
        location: 'Bhagalpur, Bihar',
        pendingDue: 0
    }
];

export const MOCK_CUSTOMERS: Customer[] = [
    {
        id: 'c1',
        name: 'Ananya Sharma',
        mobile: '9876543210',
        place: 'Chennai',
        type: 'VIP',
        totalPurchase: 85000,
        billsCount: 12,
        pendingDue: 0,
        lastPurchase: '2024-03-20'
    },
    {
        id: 'c2',
        name: 'Rajesh Kumar',
        mobile: '9001122334',
        place: 'Salem',
        type: 'Wholesale',
        totalPurchase: 125000,
        billsCount: 5,
        pendingDue: 15000,
        lastPurchase: '2024-03-18'
    },
    {
        id: 'c3',
        name: 'Priya Mani',
        mobile: '9884455667',
        place: 'Madurai',
        type: 'Retail',
        totalPurchase: 18500,
        billsCount: 2,
        pendingDue: 0,
        lastPurchase: '2024-03-15'
    },
    {
        id: 'c4',
        name: 'Kavitha S.',
        mobile: '9765432109',
        place: 'Coimbatore',
        type: 'VIP',
        totalPurchase: 48000,
        billsCount: 4,
        pendingDue: 0,
        lastPurchase: '2024-03-10'
    }
];

export const MOCK_STAFF: Staff[] = [
    {
        id: 'st1',
        name: 'Anand Kumar',
        role: 'admin',
        commissionType: 'Percentage',
        commissionValue: 2,
        active: true,
        salesThisMonth: 150000
    },
    {
        id: 'st2',
        name: 'Priya Lakshmi',
        role: 'salesman',
        commissionType: 'Fixed',
        commissionValue: 50,
        active: true,
        salesThisMonth: 85000
    },
    {
        id: 'st3',
        name: 'Karthik Raja',
        role: 'cashier',
        commissionType: 'Percentage',
        commissionValue: 1,
        active: true,
        salesThisMonth: 45000
    }
];

export const MOCK_BILLS: Bill[] = [
    {
        id: 'b1',
        billNo: 'BILL-2024-001',
        customerName: 'Ananya Sharma',
        customerMobile: '9876543210',
        customerPlace: 'Chennai',
        customerType: 'VIP',
        items: [
            {
                sareeId: '1',
                barcode: '100001',
                name: 'Kanchipuram Silk Saree - Bridal Red',
                qty: 1,
                sellingPrice: 18500,
                mrp: 22000,
                total: 18500
            }
        ],
        subtotal: 18500,
        discountPercent: 5,
        discountAmount: 925,
        gstAmount: 878.75,
        roundOff: 0.25,
        grandTotal: 18454,
        paymentMethod: 'UPI',
        status: 'Paid',
        dueAmount: 0,
        date: '2024-03-20T11:45:00.000Z'
    },
    {
        id: 'b2',
        billNo: 'BILL-2024-002',
        customerName: 'Priya Mani',
        customerMobile: '9884455667',
        customerPlace: 'Madurai',
        customerType: 'Retail',
        items: [
            {
                sareeId: '2',
                barcode: '100002',
                name: 'Banarasi Brocade Silk Saree',
                qty: 1,
                sellingPrice: 13500,
                mrp: 16000,
                total: 13500
            }
        ],
        subtotal: 13500,
        discountPercent: 0,
        discountAmount: 0,
        gstAmount: 675,
        roundOff: 0,
        grandTotal: 14175,
        paymentMethod: 'Cash',
        status: 'Paid',
        dueAmount: 0,
        date: '2024-03-15T15:20:00.000Z'
    }
];

export const MOCK_EXPENSES: Expense[] = [
    {
        id: 'exp1',
        _id: 'exp1',
        title: 'Showroom Electricity Bill',
        category: 'Utilities',
        amount: 8500,
        date: '2024-03-15',
        paymentMode: 'Net Banking',
        notes: 'Electricity bill for showroom main floor'
    },
    {
        id: 'exp2',
        _id: 'exp2',
        title: 'Premium Saree Gift Packaging Bags',
        category: 'Packaging',
        amount: 4200,
        date: '2024-03-18',
        paymentMode: 'UPI',
        notes: '200 branded luxury carry bags with gold foil print'
    },
    {
        id: 'exp3',
        _id: 'exp3',
        title: 'Store Refreshments & Tea',
        category: 'Pantry',
        amount: 1450,
        date: '2024-03-20',
        paymentMode: 'Cash',
        notes: 'Customer coffee and staff snacks'
    }
];

export const MOCK_ADJUSTMENTS: AdjustmentItem[] = [
    {
        id: 'adj1',
        barcode: '100003',
        name: 'Arani Pure Soft Silk Saree',
        currentStock: 9,
        adjustQty: -1,
        reason: 'Sample display damage',
        date: '2024-03-18',
        status: 'approved'
    }
];

export const MOCK_PURCHASES: Purchase[] = [
    {
        id: 'p1',
        billNo: 'PUR-2024-001',
        date: '2024-03-15',
        supplierId: 's1',
        supplierName: 'Ethical Weaves',
        items: [
            {
                id: 'pi1',
                barcode: '100001',
                name: 'Kanchipuram Silk Saree - Bridal Red',
                category: 'Silk',
                qty: 5,
                costPrice: 12000,
                mrp: 22000,
                sellingPrice: 18500,
                totalCost: 60000
            }
        ],
        totalAmount: 60000,
        paidAmount: 40000,
        dueAmount: 20000,
        paymentStatus: 'Partial',
        status: 'completed',
        purchaseType: 'gst'
    }
];

export const MOCK_ALTERATIONS: AlterationJob[] = [
    {
        id: 'alt1',
        customer: 'Ananya Sharma',
        mobile: '9876543210',
        items: 'Kanchipuram Silk Saree',
        services: ['Fall Stitching', 'Pico Hemming', 'Blouse Custom Tailoring'],
        status: 'Ready',
        deliveryDate: '2024-03-22',
        amount: 650
    },
    {
        id: 'alt2',
        customer: 'Kavitha S.',
        mobile: '9765432109',
        items: 'Banarasi Silk Saree',
        services: ['Fall Stitching', 'Zigzag Hemming'],
        status: 'In Progress',
        deliveryDate: '2024-03-25',
        amount: 250
    }
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ord1',
        customerName: 'Sangeetha R.',
        customerMobile: '9444123456',
        description: 'Bridal Muhurtham Saree in Mustard & Magenta custom weaving',
        deliveryDate: '2024-04-10',
        totalEstimated: 35000,
        advancePaid: 15000,
        status: 'Booked',
        orderDate: '2024-03-18'
    }
];

export const MOCK_SETTINGS = {
    storeName: 'Silk Store Pro',
    tagline: 'Authentic Handwoven Silks & Sarees',
    address: '123, Gandhi Road, Kanchipuram - 631501, Tamil Nadu',
    phone: '+91 44 2722 1234',
    email: 'contact@silkstorepro.com',
    gstNo: '33AAAAA0000A1Z5',
    currency: 'INR',
    language: 'en',
    taxRate: 5,
    enableThermalPrint: true,
    enableA4Print: true,
    footerMessage: 'Thank you for shopping with us! Pure Silk Pure Tradition.'
};

export const MOCK_USERS = [
    {
        id: 'u1',
        username: 'admin',
        password: 'admin',
        name: 'Admin User',
        role: 'admin' as const,
        branch: 'Main Branch'
    },
    {
        id: 'u2',
        username: 'manager',
        password: 'manager',
        name: 'Branch Manager',
        role: 'manager' as const,
        branch: 'West End'
    },
    {
        id: 'u3',
        username: 'cashier',
        password: 'cashier',
        name: 'Billing Cashier',
        role: 'cashier' as const,
        branch: 'Main Branch'
    },
    {
        id: 'u4',
        username: 'sales',
        password: 'sales',
        name: 'Sales Associate',
        role: 'salesman' as const,
        branch: 'Main Branch'
    }
];
