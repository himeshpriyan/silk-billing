import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Store, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  Building2, 
  LogIn, 
  ArrowRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from 'sonner';

const branches = [
  { id: 'main', name: 'Main Branch - Kanchipuram' },
  { id: 'chennai', name: 'Chennai Elite Showroom' },
  { id: 'coimbatore', name: 'Coimbatore Heritage' },
];

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsRole } = useAuth();
  const { t } = useLanguage();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [branch, setBranch] = useState('main');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuickAccess = (role: 'admin' | 'manager' | 'cashier' | 'salesman') => {
    loginAsRole(role);
    toast.success(`Access granted as ${role.toUpperCase()}!`);
    navigate('/dashboard');
  };

  // Forgot Password State
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [resetForm, setResetForm] = useState({
    username: '',
    adminSecret: '',
    newPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(username, password, branch);
      if (success) {
        toast.success('Welcome back to vv collection!');
        navigate('/dashboard');
      } else {
        toast.error('Identity mismatch. Please check your credentials.');
      }
    } catch (error) {
      toast.error('Authentication gate error.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetForm.username || !resetForm.adminSecret || !resetForm.newPassword) {
      toast.error('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (resetForm.adminSecret === 'master123') {
        toast.success('Credential masterpiece updated successfully!');
        setIsForgotOpen(false);
        setResetForm({ username: '', adminSecret: '', newPassword: '' });
      } else {
        toast.error('Invalid Master Administrative Secret');
      }
    } catch (error) {
      toast.error('System reset error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] relative overflow-hidden flex flex-col font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-slate-900/5 rounded-full blur-[140px] -z-10" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 silk-pattern opacity-[0.03] pointer-events-none -z-10" />

      <header className="flex justify-between items-center p-6 z-10">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-10 w-10 bg-gradient-to-br from-slate-800 to-slate-950 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Store className="text-white h-6 w-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-950">vv collection <span className="text-amber-600">Pro</span></span>
        </div>
        <LanguageSwitch />
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-0 bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.08)] overflow-hidden border border-white/50 animate-in fade-in zoom-in-95 duration-1000">
          
          {/* Left Side: Brand Experience */}
          <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white relative">
            <div className="absolute inset-0 opacity-20 silk-pattern mix-blend-overlay" />
            
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8">
                    <Sparkles size={14} className="text-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">The Future of Silk POS</span>
                </div>
                <h2 className="text-5xl font-display font-bold leading-[1.1] mb-6">
                    Manage your <span className="text-amber-500 italic">masterpieces</span> with precision.
                </h2>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
                    Access the industry's most advanced AI-powered retail management suite. Fast, secure, and beautiful.
                </p>
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Live POS Network</p>
                        <p className="text-sm text-slate-300">Over <span className="text-white font-bold">120+</span> active terminals across Kerala.</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="mb-6 text-center lg:text-left">
              <h3 className="text-3xl font-display font-bold text-slate-950 mb-2">Welcome Back</h3>
              <p className="text-slate-500 font-medium">Please enter your gateway credentials or click below for instant demo access.</p>
            </div>

            {/* Quick 1-Click Access Card */}
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80">
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-900 mb-2.5 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-600" /> Instant Demo Access (1-Click)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleQuickAccess('admin')} 
                  className="bg-white hover:bg-amber-100/70 border-amber-200 text-xs font-bold text-slate-900 h-10 rounded-xl justify-start gap-2 shadow-xs"
                >
                  <span>👑</span> Admin (Full Access)
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleQuickAccess('manager')} 
                  className="bg-white hover:bg-amber-100/70 border-amber-200 text-xs font-bold text-slate-900 h-10 rounded-xl justify-start gap-2 shadow-xs"
                >
                  <span>👔</span> Manager
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleQuickAccess('cashier')} 
                  className="bg-white hover:bg-amber-100/70 border-amber-200 text-xs font-bold text-slate-900 h-10 rounded-xl justify-start gap-2 shadow-xs"
                >
                  <span>💳</span> Cashier
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleQuickAccess('salesman')} 
                  className="bg-white hover:bg-amber-100/70 border-amber-200 text-xs font-bold text-slate-900 h-10 rounded-xl justify-start gap-2 shadow-xs"
                >
                  <span>🛍️</span> Sales Associate
                </Button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2.5 group">
                <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 group-focus-within:text-amber-600 transition-colors">Credential ID</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                  <Input
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono text-sm uppercase tracking-wider"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2.5 group">
                <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-amber-600 transition-colors">{t('login.password')}</Label>
                    <button
                        type="button"
                        className="text-[10px] font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors"
                        onClick={() => setIsForgotOpen(true)}
                    >
                        {t('login.forgot')}
                    </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 px-1 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 group">
                <Label htmlFor="branch" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 group-focus-within:text-amber-600 transition-colors">{t('login.branch')}</Label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all pl-4">
                    <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-slate-400" />
                        <SelectValue placeholder="Select branch" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-2 bg-white/95 backdrop-blur-xl">
                    {branches.map((b) => (
                      <SelectItem key={b.id} value={b.id} className="rounded-xl focus:bg-amber-50 focus:text-amber-900 transition-colors">
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white font-bold text-lg shadow-xl shadow-slate-900/20 hover:from-black hover:to-slate-900 transition-all active:scale-[0.98] group"
                disabled={loading}
              >
                {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        Enter Workspace <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                )}
              </Button>

              <div className="pt-6 text-center border-t border-slate-100">
                <p className="text-sm font-medium text-slate-500">
                    New to the network? <Link to="/register" className="text-amber-600 font-bold hover:underline ml-1">Establish Workspace</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={isForgotOpen} onOpenChange={setIsForgotOpen}>
        <DialogContent className="rounded-[2.5rem] border-0 shadow-2xl overflow-hidden p-0 max-w-md bg-white/95 backdrop-blur-xl">
          <div className="bg-amber-600 p-8 text-white relative">
            <div className="absolute top-0 right-0 p-6 opacity-20"><ShieldAlert size={80} /></div>
            <DialogHeader className="relative z-10 text-left">
                <DialogTitle className="text-2xl font-display font-bold text-white">Security Recovery</DialogTitle>
                <DialogDescription className="text-amber-100 font-medium">Verify your administrative authority to reset access.</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-8 space-y-5">
            <div className="space-y-2 group">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Identity ID</Label>
              <Input
                placeholder="Ex: ADMIN_01"
                value={resetForm.username}
                onChange={e => setResetForm({ ...resetForm, username: e.target.value })}
                className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">New Masterpiece</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={resetForm.newPassword}
                onChange={e => setResetForm({ ...resetForm, newPassword: e.target.value })}
                className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Master Admin Secret</Label>
              <Input
                type="password"
                placeholder="Recovery Key"
                value={resetForm.adminSecret}
                onChange={e => setResetForm({ ...resetForm, adminSecret: e.target.value })}
                className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
              />
            </div>
          </div>
          <DialogFooter className="p-8 pt-0 flex-col sm:flex-row gap-3">
            <Button variant="ghost" onClick={() => setIsForgotOpen(false)} className="rounded-xl flex-1 font-bold text-slate-400">Cancel</Button>
            <Button onClick={handleResetPassword} className="rounded-xl flex-[2] font-bold bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-600/20" disabled={loading}>
              {loading ? "Revalidating..." : "Confirm Recovery"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="p-8 text-center relative z-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">Digitized by vv collection AI Labs — © 2026</p>
      </footer>
    </div>
  );
};

export default Login;

