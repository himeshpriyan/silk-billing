# Silk Store Pro - Billing & Inventory Management System

A modern, full-featured retail billing, POS, and inventory management web application tailored for silk saree showrooms and textile retail businesses.

Built with **React, Vite, TypeScript, Tailwind CSS, and Shadcn UI**.

> **Note**: This application runs entirely as a **standalone client-side web application** using rich **mock data** with automatic browser **LocalStorage persistence**. No backend server or MongoDB database is required.

---

## Features

- **POS / Billing**: Fast barcode scanning, dual language (English & Tamil), discounts, GST calculation, print thermal / A4 receipts, hold & resume bills.
- **Saree & Stock Master**: Manage unique & bulk saree inventory, colors, weaves (Kanchipuram, Banarasi, Arani, Tussar, etc.), zari types, rack locations.
- **Customer Management**: VIP, Wholesale, and Retail customer directory with order history and due management.
- **Supplier & Purchase Management**: Track suppliers, inward purchase entries, and outstanding payables.
- **Alteration & Custom Order Service**: Track falls, pico, hemming, and custom bridal orders.
- **Reports & Analytics**: Daily sales, GST breakdown, stock status, and AI business insights.
- **Backup & Export**: Instant export of billing and stock data to Excel / PDF.
- **Role-Based Auth & Mock Users**: Pre-configured accounts for Admin, Manager, Cashier, and Salesman.

---

## Demo Credentials

| Role | Username | Password |
|---|---|---|
| **Admin** | `admin` | `admin` |
| **Manager** | `manager` | `manager` |
| **Cashier** | `cashier` | `cashier` |
| **Sales** | `sales` | `sales` |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run the local development server
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

### 3. Build for production
```bash
npm run build
```

---

## Data Architecture
All data is seeded from [`src/lib/mock-data.ts`](src/lib/mock-data.ts) and maintained reactively via [`src/contexts/DataContext.tsx`](src/contexts/DataContext.tsx) with automatic synchronization to browser `localStorage`. Any edits, new sarees, customers, or bills you create persist across page reloads.
