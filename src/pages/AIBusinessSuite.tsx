import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  Loader2,
  Calendar,
  Package,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';

interface AuditResult {
  healthScore: number;
  status: string;
  keyInsights: string[];
  actionItems: { item: string; priority: string; reason: string }[];
  deadStockCount: number;
}

const AIBusinessSuite: React.FC = () => {
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAudit: AuditResult = {
        healthScore: 82,
        status: "Healthy",
        keyInsights: [
          "Sales velocity for Soft Silk has increased by 14% compared to previous month.",
          "Inventory levels for Kanchipuram Silk are optimal.",
          "Customers are showing high affinity for Maroon and Gold shades."
        ],
        actionItems: [
          { item: "Clearance for CS-2023-102", priority: "High", reason: "Item is in stock for over 90 days. Suggest 15% discount." },
          { item: "Restock Banarasi Silk", priority: "Medium", reason: "Current stock is low and demand is rising." },
          { item: "Marketing for Bridal Wear", priority: "Medium", reason: "Wedding season is approaching. Boost promotions." }
        ],
        deadStockCount: 2
      };
      
      setAudit(mockAudit);
    } catch (error) {
      console.error(error);
      toast.error("Audit service unavailable");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
            <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
        </div>
        <p className="text-sm font-medium text-slate-500">Gemini is auditing your stock health...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">AI Business Intelligence</h1>
        <p className="text-slate-500">Futuristic insights for your showroom growth</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score Card */}
        <Card className="lg:col-span-1 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
            <div className="relative h-40 w-40 flex items-center justify-center">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" 
                  strokeDasharray={`${audit?.healthScore ? audit.healthScore * 2.82 : 0} 282`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-display font-bold leading-none">{audit?.healthScore}%</span>
                <span className="text-[10px] uppercase tracking-widest opacity-70">Health Score</span>
              </div>
            </div>
            
            <div className="space-y-2">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 py-1 px-4 text-xs">
                    Status: {audit?.status}
                </Badge>
                <p className="text-sm opacity-80 leading-relaxed max-w-[200px]">
                    Your inventory health is primarily determined by stock rotation and velocity.
                </p>
            </div>

            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={fetchAudit}>
                <Zap className="mr-2 h-4 w-4" /> Re-Audit Inventory
            </Button>
          </CardContent>
        </Card>

        {/* Action Center */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ShieldCheck className="text-indigo-600" size={18} />
                            AI Action Center
                        </CardTitle>
                        <CardDescription>Strategic tasks suggested by AI to boost sales</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {audit?.actionItems.map((item, idx) => (
                        <div key={idx} className="group p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex items-start gap-4">
                            <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                                item.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'
                            }`}>
                                {item.priority === 'High' ? <AlertTriangle size={14} /> : <Zap size={14} />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-sm text-slate-800">{item.item}</h4>
                                    <Badge variant="outline" className="text-[9px] uppercase font-bold py-0 h-4">{item.priority}</Badge>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">{item.reason}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight size={14} />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <TrendingUp size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sales Forecast</p>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">+14% growth expected next week</p>
                        </div>
                        <ArrowUpRight className="text-slate-300 group-hover:text-emerald-400 transition-colors" size={16} />
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                            <Package size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dead Stock Risk</p>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{audit?.deadStockCount || 0} items pending clearance</p>
                        </div>
                        <ArrowUpRight className="text-slate-300 group-hover:text-orange-400 transition-colors" size={16} />
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>

      {/* Key Insights Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
            <CardTitle>Semantic Inventory Analysis</CardTitle>
            <CardDescription>Qualitative insights from AI Auditor</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {audit?.keyInsights.map((insight, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-600 leading-relaxed font-semibold">{insight}</p>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIBusinessSuite;
