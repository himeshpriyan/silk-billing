import React, { useEffect, useState } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  Users, 
  PackageSearch, 
  Sparkles, 
  ArrowRight,
  TrendingDown,
  Percent
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface AIInsightData {
  deadStock: Array<{ name: string; barcode: string; price: number; daysInStock: number }>;
  customerSegments: { vipCount: number; frequentCount: number; newCount: number };
  salesTrend: Array<{ date: string; total: number }>;
  prediction: number;
  insights: string[];
}

export const AIInsights: React.FC = () => {
  const [data, setData] = useState<AIInsightData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: AIInsightData = {
          deadStock: [
            { name: 'Pure Silk Saree - Maroon', barcode: 'KS-2023-089', price: 15000, daysInStock: 120 },
            { name: 'Cotton Silk - Blue', barcode: 'CS-2023-102', price: 4500, daysInStock: 95 }
          ],
          customerSegments: { vipCount: 15, frequentCount: 42, newCount: 28 },
          salesTrend: [
            { date: '2024-03-20', total: 120000 },
            { date: '2024-03-21', total: 145000 }
          ],
          prediction: 135000,
          insights: [
            "Predicting a 15% surge in Soft Silk demand this weekend.",
            "High engagement from VIP segment on Banarasi collection.",
            "Inventory turnover for Kanchipuram is faster than average.",
            "Suggested clearance for stock older than 90 days."
          ]
        };
        
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch AI insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAIInsights();
  }, []);

  if (loading) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 animate-pulse">
        <CardContent className="p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-950 dark:to-indigo-950/20">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <BrainCircuit size={120} className="text-indigo-600" />
      </div>
      
      <CardHeader className="pb-2 relative">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="font-display text-xl flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
              AI Business Intelligence
            </CardTitle>
            <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70">
              Personalized growth recommendations for your showroom
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Sales Forecast */}
          <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Forecast</Badge>
            </div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Tomorrow's Sales</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{data.prediction.toLocaleString()}</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <Plus size={12} /> Predicted 5% up
            </p>
          </div>

          {/* Customer Insights */}
          <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <Users className="h-5 w-5 text-indigo-500" />
              <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0">Loyalty</Badge>
            </div>
            <p className="text-xs text-slate-500 uppercase font-semibold">VIP Customers</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.customerSegments.vipCount}</p>
            <p className="text-xs text-slate-500 mt-1">
              {data.customerSegments.frequentCount} frequent buyers
            </p>
          </div>

          {/* Inventory Risk */}
          <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <PackageSearch className="h-5 w-5 text-amber-500" />
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">Stock Risk</Badge>
            </div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Dead Stock Items</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.deadStock.length}</p>
            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
               Requires Attention
            </p>
          </div>
        </div>

        {/* Actionable Insights List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            Action Items <ArrowRight size={14} className="text-indigo-500" />
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.insights.map((insight, i) => (
              <div 
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-indigo-600/5 border border-indigo-600/10 hover:bg-indigo-600/10 transition-colors"
              >
                <div className="mt-1 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Suggestion */}
        {data.deadStock.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                <Percent size={18} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Clearance Opportunity</p>
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Item <span className="font-bold">{data.deadStock[0].barcode}</span> is in stock for {data.deadStock[0].daysInStock} days. 
                  AI suggests a 15% promotional discount.
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-100 dark:border-amber-800 dark:hover:bg-amber-900/50">
                Create Promotion
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14"/></svg>
);
