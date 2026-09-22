import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Store, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';
import { useLanguage } from '@/contexts/LanguageContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    branch: 'main',
    role: 'manager'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.username)) {
      toast.error("Please fill in your basic details");
      return;
    }
    if (step === 2 && (!formData.password || formData.password !== formData.confirmPassword)) {
      toast.error("Passwords must match and be provided");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Account created successfully! Please login.");
      navigate('/login');
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] relative overflow-hidden flex flex-col font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gold-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-maroon-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />

      <header className="flex justify-between items-center p-6 z-10">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-10 w-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:scale-105 transition-transform">
            <Store className="text-white h-6 w-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">vv collection <span className="text-amber-600">Pro</span></span>
        </div>
        <LanguageSwitch />
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-xl">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-3 tracking-tight">
              Create Your <span className="text-amber-600">Workspace</span>
            </h1>
            <p className="text-slate-500 max-w-xs mx-auto">Join the premium network of luxury silk retailers with AI-powered POS.</p>
          </div>

          <Card className="border-0 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            <div className="h-2 w-full bg-slate-100 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <CardHeader className="pt-10 pb-6 px-10">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl font-display font-bold">
                  {step === 1 && "Personal Identity"}
                  {step === 2 && "Security Setup"}
                  {step === 3 && "Access Level"}
                </CardTitle>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">Step {step} of 3</span>
              </div>
              <CardDescription className="text-slate-400 font-medium tracking-wide translate-y-[-2px]">
                {step === 1 && "Start by identifying yourself within the showroom."}
                {step === 2 && "Secure your account with a strong masterpiece."}
                {step === 3 && "Assign your role and primary branch location."}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-10 pb-10">
              <form onSubmit={handleRegister} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid gap-2 group">
                      <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 transition-colors group-focus-within:text-amber-600">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                        <Input 
                          id="name" 
                          placeholder="Ex: Rajesh Kumar" 
                          className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                          value={formData.name}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2 group">
                      <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 transition-colors group-focus-within:text-amber-600">Username</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                        <Input 
                          id="username" 
                          placeholder="Select a unique ID" 
                          className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono text-sm"
                          value={formData.username}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid gap-2 group">
                      <Label htmlFor="mobile" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 transition-colors group-focus-within:text-amber-600">Mobile Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                        <Input 
                          id="mobile" 
                          placeholder="Contact information" 
                          className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                          value={formData.mobile}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid gap-2 group">
                      <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 transition-colors group-focus-within:text-amber-600">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                          value={formData.password}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2 group">
                      <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 transition-colors group-focus-within:text-amber-600">Confirm Masterpiece</Label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          placeholder="Repeat password" 
                          className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50 mt-4">
                        <div className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-800 leading-relaxed font-medium">Use a combination of upper/lower case and symbols to ensure maximum security for your retail workspace.</p>
                        </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid gap-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Assigned Role</Label>
                        <Select value={formData.role} onValueChange={(v) => handleSelectChange('role', v)}>
                            <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white">
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-2">
                                <SelectItem value="admin" className="rounded-xl">Master Admin</SelectItem>
                                <SelectItem value="manager" className="rounded-xl">Branch Manager</SelectItem>
                                <SelectItem value="cashier" className="rounded-xl">Head Cashier</SelectItem>
                                <SelectItem value="salesman" className="rounded-xl">Sales Executive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Primary Branch</Label>
                        <Select value={formData.branch} onValueChange={(v) => handleSelectChange('branch', v)}>
                            <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-slate-400" />
                                    <SelectValue placeholder="Select location" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-2">
                                <SelectItem value="main" className="rounded-xl">Main Branch - Kanchipuram</SelectItem>
                                <SelectItem value="chennai" className="rounded-xl">Chennai Elite Showroom</SelectItem>
                                <SelectItem value="coimbatore" className="rounded-xl">Coimbatore Heritage Center</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-dashed border-slate-200 mt-4">
                        <MapPin size={18} className="text-slate-400" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Branch access will be restricted based on this selection.</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-6">
                  {step > 1 && (
                    <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={prevStep} 
                        className="h-12 rounded-2xl flex-1 font-bold text-slate-500 bg-slate-100/50 hover:bg-slate-100 transition-all"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                  )}
                  
                  {step < 3 ? (
                    <Button 
                        type="button" 
                        onClick={nextStep} 
                        className="h-12 rounded-2xl flex-[2] font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                        type="submit" 
                        className="h-12 rounded-2xl flex-[2] font-bold bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg shadow-amber-600/20 active:scale-95 transition-all group"
                        disabled={loading}
                    >
                      {loading ? (
                        <>
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Creating Account...
                        </>
                      ) : (
                        <>
                            Complete Registration <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            
            <div className="bg-slate-50/50 p-6 flex justify-center border-t border-slate-100">
                <p className="text-sm font-medium text-slate-500">
                    Already part of the network? <Link to="/login" className="text-amber-600 font-bold hover:underline">Sign In Instead</Link>
                </p>
            </div>
          </Card>
        </div>
      </div>

      <footer className="p-8 text-center relative z-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">© 2026 vv collection — Pure Luxury, Digitized.</p>
      </footer>
    </div>
  );
};

export default Register;
