import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  ChevronRight, 
  ShoppingBag, 
  Info,
  Users,
  Palmtree,
  Moon,
  Sun,
  Loader2,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface LookbookSet {
  role: string;
  barcode: string;
  reason: string;
  product: any;
}

const THEMES = [
  { id: 'temple', name: 'Temple Tradition', icon: Sun, color: 'bg-amber-100 text-amber-700' },
  { id: 'pastel', name: 'Pastel Garden', icon: Palmtree, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'night', name: 'Royal Midnight', icon: Moon, color: 'bg-indigo-100 text-indigo-700' },
  { id: 'fusion', name: 'Modern Fusion', icon: Sparkles, color: 'bg-purple-100 text-purple-700' },
];

const WeddingLookbook: React.FC = () => {
  const { t } = useLanguage();
  const [theme, setTheme] = useState('');
  const [colors, setColors] = useState('');
  const [loading, setLoading] = useState(false);
  const [lookbook, setLookbook] = useState<{ themeName: string; sets: LookbookSet[] } | null>(null);

  const generateLookbook = async () => {
    if (!theme || !colors) {
      toast.error("Please provide a theme and preferred colors.");
      return;
    }

    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult = {
        themeName: theme,
        sets: [
          {
            role: 'Bride',
            barcode: 'KS-2023-089',
            reason: 'This maroon silk saree perfectly complements your traditional theme with its rich gold zari work.',
            product: { name: 'Pure Silk Saree - Maroon', sellingPrice: 15000, barcode: 'KS-2023-089', color: 'Maroon', material: 'Pure Silk' }
          },
          {
            role: 'Bridesmaid',
            barcode: 'KS-2023-112',
            reason: 'A lighter shade of mustard yellow for the bridesmaids to coordinate with the bride while maintaining a distinct look.',
            product: { name: 'Soft Silk - Mustard', sellingPrice: 8500, barcode: 'KS-2023-112', color: 'Mustard', material: 'Soft Silk' }
          }
        ]
      };

      setLookbook(mockResult);
      toast.success("AI Lookbook curated successfully! (Mock)");
    } catch (error) {
      console.error(error);
      toast.error("AI Stylist is currently unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight flex items-center gap-2">
            <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
            AI Wedding Lookbook
          </h1>
          <p className="text-muted-foreground mt-1">Coordinate the perfect saree sets for your special event with Gemini AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left - Input Section */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Sparkles size={120} />
            </div>
            <CardHeader>
              <CardTitle>Lookbook Preferences</CardTitle>
              <CardDescription>Tell the AI about your wedding theme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Select a Base Theme</Label>
                <div className="grid grid-cols-2 gap-3">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.name)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                        theme === t.name 
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20' 
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <t.icon className={`h-6 w-6 mb-2 ${theme === t.name ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-semibold">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customTheme">Or Describe Your Theme</Label>
                <Input 
                  id="customTheme"
                  placeholder="e.g., Traditional South Indian Brahmin Wedding"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="colors">Preferred Colors</Label>
                <Input 
                  id="colors"
                  placeholder="e.g., Maroon, Gold, Mustard Yellow"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                />
              </div>

              <Button 
                onClick={generateLookbook} 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12"
                disabled={loading}
              >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Curating Styles...
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate AI Lookbook
                    </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right - Lookbook Result Area */}
        <div className="lg:col-span-8">
          {lookbook ? (
            <div className="space-y-6 animate-in slide-in-from-right duration-700">
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100 shadow-sm">
                    <div className="p-3 bg-indigo-600 rounded-xl text-white">
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold font-display">{lookbook.themeName} Lookbook</h2>
                        <p className="text-sm text-slate-500">Curated specifically from your available inventory.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lookbook.sets.map((item, idx) => (
                        <Card key={idx} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900">
                            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                                {item.product?.images?.[0] ? (
                                    <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-slate-300">
                                        <ShoppingBag size={64} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-white/90 text-indigo-600 backdrop-blur-md px-3 py-1 text-sm font-bold shadow-sm">
                                        {item.role}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="sm" variant="secondary" className="gap-1 shadow-lg">
                                        View Details <ChevronRight size={14} />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg line-clamp-1">{item.product?.name || 'Saree Not Found'}</h3>
                                    <span className="text-indigo-600 font-bold">₹{item.product?.sellingPrice.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px] uppercase">{item.product?.barcode}</Badge>
                                    <span>{item.product?.color} • {item.product?.material}</span>
                                </p>
                                <Separator className="my-3 opacity-50" />
                                <div className="flex gap-2 items-start">
                                    <Info className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-slate-600 italic leading-relaxed">
                                        "{item.reason}"
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center pt-4">
                    <Button variant="outline" className="gap-2 h-12 px-8 rounded-full border-slate-200">
                        <Share2 size={18} />
                        Share Lookbook with Customer
                    </Button>
                </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 text-slate-400 p-12 text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
                    <Palmtree size={48} className="opacity-20" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600">No Lookbook Generated</h3>
                <p className="max-w-xs mt-2">
                    Enter your wedding details on the left to see coordinated saree sets curated by AI.
                </p>
                <div className="mt-8 flex gap-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeddingLookbook;
