import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_USERS } from '@/lib/mock-data';

export type UserRole = 'admin' | 'manager' | 'cashier' | 'salesman' | 'stock_manager';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  branch?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, branch?: string) => Promise<boolean>;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  updateUserData: (data: Partial<User>) => void;
}

const rolePermissions: Record<UserRole, string[]> = {
  admin: ['*'], // All permissions
  manager: [
    'view_dashboard', 'create_bill', 'edit_bill', 'delete_bill', 'view_reports',
    'manage_customers', 'manage_inventory', 'manage_staff', 'view_profit',
    'apply_discount', 'process_return', 'approve_credit'
  ],
  cashier: [
    'view_dashboard', 'create_bill', 'view_bills', 'manage_customers',
    'apply_discount', 'process_payment'
  ],
  salesman: [
    'view_dashboard', 'create_bill', 'view_bills', 'add_customer'
  ],
  stock_manager: [
    'view_dashboard', 'manage_inventory', 'view_stock', 'stock_adjustment',
    'purchase_entry', 'manage_suppliers'
  ],
};

const AUTH_STORAGE_KEY = 'silk_store_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Automatically initialize with full Admin access by default or saved user from localStorage
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      // Grant full access by default as Admin
      const defaultAdmin = MOCK_USERS[0];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _p, ...userData } = defaultAdmin;
      return userData as User;
    } catch {
      const { password: _p, ...userData } = MOCK_USERS[0];
      return userData as User;
    }
  });

  const login = async (username: string, password: string, branch?: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const mockUser = MOCK_USERS.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );

      if (mockUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...userData } = mockUser;
        const loggedInUser = { ...userData, branch: branch || 'main' } as User;
        setUser(loggedInUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const loginAsRole = (role: UserRole) => {
    const mockUser = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...userData } = mockUser;
    const activeUser = { ...userData, branch: 'Main Branch' } as User;
    setUser(activeUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(activeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    const permissions = rolePermissions[user.role];
    return permissions.includes('*') || permissions.includes(permission);
  };

  const updateUserData = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAsRole, logout, hasPermission, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
