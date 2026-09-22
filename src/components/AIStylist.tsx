import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Loader2, 
  ShoppingBag, 
  X,
  ArrowRight,
  Star,
  Users,
  Info
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Saree } from '@/types';
import { toast } from 'sonner';

interface AIStylistProps {
  onSelectProduct: (saree: Saree) => void;
  availableSarees: Saree[];
}

export const AIStylist: React.FC<AIStylistProps> = ({ onSelectProduct, availableSarees }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<'natural' | 'celebrity'>('natural');

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const lowerQuery = query.toLowerCase();
      
      // Simple mock filter logic
      const matchedSarees = availableSarees
          .filter(s => {
              const nameMatch = s.name.toLowerCase().includes(lowerQuery);
              const colorMatch = s.color.toLowerCase().includes(lowerQuery);
              const categoryMatch = s.category.toLowerCase().includes(lowerQuery);
              return nameMatch || colorMatch || categoryMatch;
          })
          .map(s => ({ 
              ...s, 
              aiReason: searchMode === 'natural' 
                ? `Matches your request for ${query}` 
                : `This ${s.category} saree replicates the iconic look with similar drapes and borders.` 
          }));

      setResults(matchedSarees);
      if (matchedSarees.length === 0) {
        toast.info("No exact matches found in current inventory. (Mock)");
      } else {
        toast.success(`Found ${matchedSarees.length} recommendations! (Mock)`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Stylist service unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 border-indigo-200 bg-indigo-50/50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/10 dark:text-indigo-300 dark:border-indigo-900/50">
          <Sparkles className="h-4 w-4" />
          AI Stylist
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <SheetTitle className="font-display text-xl">AI Showroom Stylist</SheetTitle>
          </div>
          <SheetDescription>
            Switch modes to find the perfect saree for your customer.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex p-1 bg-slate-100 rounded-xl space-x-1">
            <button
                onClick={() => setSearchMode('natural')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    searchMode === 'natural' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                <Users size={14} /> Natural Search
            </button>
            <button
                onClick={() => setSearchMode('celebrity')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    searchMode === 'celebrity' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                <Star size={14} /> Celebrity Matcher
            </button>
          </div>

          <div className="flex gap-2">
            <Input 
              placeholder={searchMode === 'natural' ? "e.g., Green bridal silk saree..." : "e.g., Priyanka Chopra's wedding look"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-250px)] pr-4">
            <div className="space-y-4">
              {results.length > 0 ? (
                results.map((saree) => (
                  <div 
                    key={saree.id}
                    className="group relative flex items-center gap-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer dark:bg-slate-900/40 dark:border-slate-800 dark:hover:border-indigo-900"
                    onClick={() => {
                        onSelectProduct(saree);
                        setIsOpen(false);
                    }}
                  >
                    <div className="h-16 w-16 rounded-lg bg-white overflow-hidden flex-shrink-0 border flex items-center justify-center">
                        {saree.images && saree.images[0] ? (
                            <img src={saree.images[0]} alt={saree.name} className="h-full w-full object-cover" />
                        ) : (
                            <ShoppingBag className="h-8 w-8 text-indigo-200" />
                        )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{saree.name}</h4>
                        <Badge variant="outline" className="text-[10px] font-mono">{saree.barcode}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {saree.color} • {saree.material} • {saree.category}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-bold text-indigo-600">₹{saree.sellingPrice.toLocaleString()}</span>
                        <div className="flex items-center text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Add to Bill <ArrowRight size={12} className="ml-1" />
                        </div>
                      </div>
                      {saree.aiReason && (
                        <div className="mt-2 p-2 bg-white/50 rounded-lg border border-indigo-50 text-[10px] text-indigo-700 italic flex gap-2 items-start">
                            <Info size={12} className="shrink-0 mt-0.5" />
                            <span>{saree.aiReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                !loading && query && (
                  <div className="text-center py-12 text-slate-400">
                    <Search className="mx-auto h-8 w-8 mb-2 opacity-20" />
                    <p>No matches found yet. Try a different request.</p>
                  </div>
                )
              )}
              
              {!query && (
                <div className="space-y-4 py-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {searchMode === 'natural' ? 'Try searching for:' : 'Try these icons:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(searchMode === 'natural' 
                        ? ["Pastel bridal silk", "Red Kanchipuram under 50k", "Yellow silk for Haldi"]
                        : ["Deepika Padukone Reception", "Alia Bhatt Wedding Saree", "Nayanthara Bridal Look"]
                    ).map(suggestion => (
                      <button 
                        key={suggestion}
                        onClick={() => {setQuery(suggestion);}}
                        className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors dark:bg-slate-800 dark:text-slate-400"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
