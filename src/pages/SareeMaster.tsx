import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  Printer,
  Copy,
  Save,
  RotateCcw,
  Image as ImageIcon,
  Barcode,
  Tag,
  Package,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  X,
  Check,
  Sparkles,
  Loader2,
  Share2,
  Instagram,
  Smartphone,
} from 'lucide-react';
import ReactBarcode from 'react-barcode';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { Saree } from '@/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Saree attribute options
const categories = [
  { value: 'kanchipuram', label: 'Kanchipuram Silk', labelTa: 'காஞ்சிபுரம் பட்டு' },
  { value: 'banarasi', label: 'Banarasi Silk', labelTa: 'பனாரஸ் பட்டு' },
  { value: 'mysore', label: 'Mysore Silk', labelTa: 'மைசூர் பட்டு' },
  { value: 'chanderi', label: 'Chanderi Silk', labelTa: 'சந்தேரி பட்டு' },
  { value: 'tussar', label: 'Tussar Silk', labelTa: 'துஸ்ஸர் பட்டு' },
  { value: 'patola', label: 'Patola Silk', labelTa: 'பட்டோலா பட்டு' },
  { value: 'paithani', label: 'Paithani Silk', labelTa: 'பைதானி பட்டு' },
  { value: 'cotton', label: 'Cotton Silk', labelTa: 'காட்டன் பட்டு' },
];

const zariTypes = [
  { value: 'pure_gold', label: 'Pure Gold Zari', labelTa: 'தூய தங்க ஜரி' },
  { value: 'pure_silver', label: 'Pure Silver Zari', labelTa: 'தூய வெள்ளி ஜரி' },
  { value: 'tested_zari', label: 'Tested Zari', labelTa: 'டெஸ்டட் ஜரி' },
  { value: 'half_fine', label: 'Half Fine Zari', labelTa: 'ஹாஃப் ஃபைன் ஜரி' },
  { value: 'imitation', label: 'Imitation Zari', labelTa: 'இமிடேஷன் ஜரி' },
  { value: 'copper', label: 'Copper Zari', labelTa: 'காப்பர் ஜரி' },
];

const borderTypes = [
  { value: 'temple', label: 'Temple Border', labelTa: 'கோவில் பார்டர்' },
  { value: 'peacock', label: 'Peacock Border', labelTa: 'மயில் பார்டர்' },
  { value: 'mango', label: 'Mango Border', labelTa: 'மாங்காய் பார்டர்' },
  { value: 'checks', label: 'Checks Border', labelTa: 'செக்ஸ் பார்டர்' },
  { value: 'plain', label: 'Plain Border', labelTa: 'ப்ளெயின் பார்டர்' },
  { value: 'contrast', label: 'Contrast Border', labelTa: 'கான்ட்ராஸ்ட் பார்டர்' },
  { value: 'heavy', label: 'Heavy Border', labelTa: 'ஹெவி பார்டர்' },
];

const designTypes = [
  { value: 'traditional', label: 'Traditional', labelTa: 'பாரம்பரியம்' },
  { value: 'contemporary', label: 'Contemporary', labelTa: 'நவீன' },
  { value: 'bridal', label: 'Bridal', labelTa: 'மணப்பெண்' },
  { value: 'party', label: 'Party Wear', labelTa: 'பார்ட்டி வேர்' },
  { value: 'casual', label: 'Casual', labelTa: 'கேஷுவல்' },
  { value: 'festive', label: 'Festive', labelTa: 'பண்டிகை' },
];

const colors = [
  { value: 'maroon', label: 'Maroon', labelTa: 'மரூன்', hex: '#800000' },
  { value: 'red', label: 'Red', labelTa: 'சிவப்பு', hex: '#DC143C' },
  { value: 'green', label: 'Green', labelTa: 'பச்சை', hex: '#228B22' },
  { value: 'blue', label: 'Blue', labelTa: 'நீலம்', hex: '#000080' },
  { value: 'purple', label: 'Purple', labelTa: 'ஊதா', hex: '#800080' },
  { value: 'pink', label: 'Pink', labelTa: 'இளஞ்சிவப்பு', hex: '#FF69B4' },
  { value: 'orange', label: 'Orange', labelTa: 'ஆரஞ்சு', hex: '#FF8C00' },
  { value: 'yellow', label: 'Yellow', labelTa: 'மஞ்சள்', hex: '#FFD700' },
  { value: 'gold', label: 'Gold', labelTa: 'தங்கம்', hex: '#DAA520' },
  { value: 'cream', label: 'Cream', labelTa: 'க்ரீம்', hex: '#FFFDD0' },
  { value: 'white', label: 'White', labelTa: 'வெள்ளை', hex: '#FFFAFA' },
  { value: 'black', label: 'Black', labelTa: 'கருப்பு', hex: '#1a1a1a' },
];

const materials = [
  { value: 'pure_silk', label: 'Pure Silk', labelTa: 'தூய பட்டு' },
  { value: 'art_silk', label: 'Art Silk', labelTa: 'ஆர்ட் சில்க்' },
  { value: 'silk_cotton', label: 'Silk Cotton', labelTa: 'பட்டு காட்டன்' },
  { value: 'organza', label: 'Organza Silk', labelTa: 'ஆர்கன்சா' },
  { value: 'crepe', label: 'Crepe Silk', labelTa: 'க்ரேப் சில்க்' },
];

const departments = [
  { value: 'Saree', label: 'Saree' },
  { value: 'Mens', label: 'Mens Wear' },
  { value: 'Kids', label: 'Kids Wear' },
  { value: 'Womens', label: 'Womens Wear' },
  { value: 'Other', label: 'Other' },
];

// Interface Imported from types

// Sample data removed


export const SareeMaster: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { sarees, addSaree, updateSaree } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [selectedForPrint, setSelectedForPrint] = useState<string[]>([]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [printQty, setPrintQty] = useState<number>(1);

  const handleDownloadTemplate = () => {
    const headers = [
      'sareeCode',
      'barcode',
      'name',
      'nameTamil',
      'category',
      'brand',
      'material',
      'zariType',
      'borderType',
      'color',
      'designType',
      'length',
      'weight',
      'blouseIncluded',
      'blousePiece',
      'purchasePrice',
      'sellingPrice',
      'mrp',
      'gstPercent',
      'stockType',
      'stockQty',
      'rackLocation',
      'supplier',
      'description',
    ];

    // Create a sample row to help users
    const sampleRow = [
      'KS-2024-001', '8901234567890', 'Kanchipuram Silk', 'காஞ்சிபுரம் பட்டு', 'kanchipuram', 'Sri Kumaran', 'pure_silk', 'pure_gold', 'temple', 'maroon', 'bridal', '6.3 meters', '850 grams', 'true', '0.8 meters', '18000', '22500', '25000', '5', 'unique', '1', 'A1-01', 'Kanchipuram Weavers', 'Premium silk saree'
    ];

    const csvContent = [
      headers.join(','),
      sampleRow.join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saree_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      try {
        const lines = text.split('\n');
        // Simple CSV parser handling quotes
        const parseCSVLine = (line: string) => {
          const result = [];
          let current = '';
          let inQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result;
        };

        const headers = parseCSVLine(lines[0]).map(h => h.trim());

        const newSarees: Saree[] = [];

        // Starting from 1 to skip header
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = parseCSVLine(lines[i]);
          if (values.length < 5) continue;

          const sareeData: Record<string, string | number | boolean> = {};
          headers.forEach((header, index) => {
            let value: string | number | boolean = values[index];
            // Remove quotes if present
            if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
              value = value.substring(1, value.length - 1);
            }

            if (['purchasePrice', 'sellingPrice', 'mrp', 'gstPercent', 'stockQty'].includes(header)) {
              value = Number(value) || 0;
            } else if (header === 'blouseIncluded') {
              value = String(value).toLowerCase() === 'true';
            }
            sareeData[header] = value;
          });

          // Add default/missing required fields
          const newSaree: Saree = {
            id: Date.now().toString() + i,
            images: [],
            status: 'available',
            addedDate: new Date().toISOString().split('T')[0],
            // Fill defaults for required fields if missing
            sareeCode: (sareeData.sareeCode as string) || `IMP-${Date.now()}-${i}`,
            barcode: (sareeData.barcode as string) || `890${Date.now()}${i}`,
            name: (sareeData.name as string) || 'Imported Saree',
            nameTamil: (sareeData.nameTamil as string) || '',
            category: (sareeData.category as string) || 'kanchipuram',
            brand: (sareeData.brand as string) || '',
            material: (sareeData.material as string) || 'pure_silk',
            zariType: (sareeData.zariType as string) || 'pure_gold',
            borderType: (sareeData.borderType as string) || 'temple',
            color: (sareeData.color as string) || 'maroon',
            designType: (sareeData.designType as string) || 'traditional',
            length: (sareeData.length as string) || '6.3 meters',
            weight: (sareeData.weight as string) || '',
            blouseIncluded: (sareeData.blouseIncluded as boolean) ?? true,
            blousePiece: (sareeData.blousePiece as string) || '0.8 meters',
            purchasePrice: (sareeData.purchasePrice as number) || 0,
            sellingPrice: (sareeData.sellingPrice as number) || 0,
            mrp: (sareeData.mrp as number) || 0,
            gstPercent: (sareeData.gstPercent as number) || 5,
            stockType: (sareeData.stockType as any) || 'unique',
            stockQty: (sareeData.stockQty as number) || 1,
            rackLocation: (sareeData.rackLocation as string) || '',
            supplier: (sareeData.supplier as string) || '',
            description: (sareeData.description as string) || '',
            ...(sareeData as unknown as Partial<Saree>)
          };

          newSarees.push(newSaree);
        }

        if (newSarees.length > 0) {
          // Bulk add
          newSarees.forEach(s => addSaree(s));
          toast.success(`Imported ${newSarees.length} sarees successfully`);
          setIsImportDialogOpen(false);
        } else {
          toast.error('No valid data found in file');
        }
      } catch (error) {
        toast.error('Error parsing CSV file');
        console.error(error);
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  const handleEdit = (saree: Saree) => {
    setFormData({ ...saree });
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };

  // Form state for new/edit saree
  // Form state for new/edit saree
  const [formData, setFormData] = useState<Partial<Saree>>({
    sareeCode: '',
    barcode: '',
    department: 'Saree',
    name: '',
    nameTamil: '',
    category: 'kanchipuram',
    brand: '',
    material: 'pure_silk',
    zariType: 'pure_gold',
    borderType: 'temple',
    color: 'maroon',
    designType: 'traditional',
    length: '6.3 meters',
    weight: '',
    blouseIncluded: true,
    blousePiece: '0.8 meters',
    purchasePrice: 0,
    sellingPrice: 0,
    mrp: 0,
    gstPercent: 5,
    stockType: 'unique',
    stockQty: 1,
    rackLocation: '',
    supplier: '',
    description: '',
  });

  const generateBarcode = () => {
    const barcode = '890' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    setFormData({ ...formData, barcode });
  };

  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const handleMagicDescribe = async () => {
    if (!formData.category || !formData.material) {
      toast.error('Please select Category and Material first');
      return;
    }

    setIsGeneratingDescription(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockDescription = `This elegant ${formData.category} saree, crafted from premium ${formData.material}, features a stunning ${formData.designType} design. Perfect for ${formData.designType === 'bridal' ? 'weddings' : 'special occasions'}, it comes in a beautiful ${formData.color} shade with a ${formData.borderType} border and ${formData.zariType}.`;
      
      setFormData(prev => ({ ...prev, description: mockDescription }));
      toast.success('Magic Description generated! (Mock)');
    } catch (error) {
      console.error(error);
      toast.error('Failed to connect to AI service');
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const [isGeneratingSocial, setIsGeneratingSocial] = useState(false);
  const [socialContent, setSocialContent] = useState<{ instagram: string; whatsapp: string } | null>(null);
  const [socialDialogOpen, setSocialDialogOpen] = useState(false);

  const handleGenerateSocial = async (barcode: string) => {
    setIsGeneratingSocial(true);
    setSocialDialogOpen(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSocial = {
        instagram: `✨ New Arrival! ✨\nCheck out our latest ${formData.name || 'Saree'} collection.\n#SilkStore #SareeLove #TraditionalWear`,
        whatsapp: `Hello! We've just added a new ${formData.name || 'Saree'} to our collection. View details: [Mock URL]`
      };
      
      setSocialContent(mockSocial);
      toast.success('Social post generated! (Mock)');
    } catch (error) {
      console.error(error);
      toast.error('Social service unavailable');
      setSocialDialogOpen(false);
    } finally {
      setIsGeneratingSocial(false);
    }
  };

  const generateSareeCode = () => {
    const deptPrefix = formData.department ? formData.department.substring(0, 1).toUpperCase() : 'S';
    const catPrefix = formData.category?.substring(0, 2).toUpperCase() || 'XX';
    const year = new Date().getFullYear();
    const num = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    setFormData({ ...formData, sareeCode: `${deptPrefix}${catPrefix}-${year}-${num}` });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Uploading image (Mock)...");
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use a placeholder image for mock
      const mockImageUrl = "https://images.unsplash.com/photo-1610030469983-98e550d3752c?q=80&w=300&auto=format&fit=crop";
      
      setFormData(prev => ({ ...prev, images: [...(prev.images || []), mockImageUrl] }));
      toast.dismiss();
      toast.success("Image uploaded successfully (Mock)");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  const handleSave = async () => {
    // If barcode is empty, use sareeCode as barcode
    const finalBarcode = formData.barcode || formData.sareeCode;

    if (!formData.name || !formData.sareeCode) {
      toast.error('Please fill required fields (Name and Product Code)');
      return;
    }

    const newSaree: Saree = {
      id: isEditing ? (formData.id || '') : Date.now().toString(),
      sareeCode: formData.sareeCode || '',
      barcode: finalBarcode || '',
      name: formData.name || '',
      nameTamil: formData.nameTamil || '',
      category: formData.category || 'kanchipuram',
      brand: formData.brand || '',
      material: formData.material || 'pure_silk',
      zariType: formData.zariType || 'pure_gold',
      borderType: formData.borderType || 'temple',
      color: formData.color || 'maroon',
      designType: formData.designType || 'traditional',
      length: formData.length || '6.3 meters',
      weight: formData.weight || '',
      blouseIncluded: formData.blouseIncluded ?? true,
      blousePiece: formData.blousePiece || '',
      purchasePrice: formData.purchasePrice || 0,
      sellingPrice: formData.sellingPrice || 0,
      mrp: formData.mrp || 0,
      gstPercent: formData.gstPercent || 5,
      stockType: formData.stockType || 'unique',
      stockQty: formData.stockQty || 1,
      rackLocation: formData.rackLocation || '',
      supplier: formData.supplier || '',
      description: formData.description || '',
      status: formData.status || 'available',
      addedDate: formData.addedDate || new Date().toISOString().split('T')[0],
      images: formData.images || [], // Ensure images are preserved
    };

    let result = null;
    if (isEditing && formData.id) {
      result = await updateSaree(formData.id, newSaree);
      if (result) setIsEditing(false);
    } else {
      result = await addSaree(newSaree);
    }

    if (result) {
      setIsAddDialogOpen(false);
      resetForm();
    }
  };

  const handleSaveAndPrint = async () => {
    const finalBarcode = formData.barcode || formData.sareeCode;

    if (!formData.name || !formData.sareeCode) {
      toast.error('Please fill required fields (Name and Product Code)');
      return;
    }

    const newId = isEditing ? (formData.id || '') : Date.now().toString();
    const newSaree: Saree = {
      id: newId,
      sareeCode: formData.sareeCode || '',
      barcode: finalBarcode || '',
      name: formData.name || '',
      nameTamil: formData.nameTamil || '',
      category: formData.category || 'kanchipuram',
      brand: formData.brand || '',
      material: formData.material || 'pure_silk',
      zariType: formData.zariType || 'pure_gold',
      borderType: formData.borderType || 'temple',
      color: formData.color || 'maroon',
      designType: formData.designType || 'traditional',
      length: formData.length || '6.3 meters',
      weight: formData.weight || '',
      blouseIncluded: formData.blouseIncluded ?? true,
      blousePiece: formData.blousePiece || '',
      purchasePrice: formData.purchasePrice || 0,
      sellingPrice: formData.sellingPrice || 0,
      mrp: formData.mrp || 0,
      gstPercent: formData.gstPercent || 5,
      stockType: formData.stockType || 'unique',
      stockQty: formData.stockQty || 1,
      rackLocation: formData.rackLocation || '',
      supplier: formData.supplier || '',
      description: formData.description || '',
      status: formData.status || 'available',
      addedDate: formData.addedDate || new Date().toISOString().split('T')[0],
      images: formData.images || [],
    };

    let result = null;
    if (isEditing && formData.id) {
      result = await updateSaree(formData.id, newSaree);
      setIsEditing(false);
    } else {
      result = await addSaree(newSaree);
    }

    if (!result) return; // Don't proceed if it failed

    const finalSaree = result;
    const finalId = finalSaree.id || finalSaree._id;

    setIsAddDialogOpen(false);

    // Setup print dialog
    setSelectedForPrint([finalId]);
    setPrintQty(finalSaree.stockQty || 1);
    setIsPrintDialogOpen(true);

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      sareeCode: '',
      barcode: '',
      name: '',
      nameTamil: '',
      category: 'kanchipuram',
      brand: '',
      material: 'pure_silk',
      zariType: 'pure_gold',
      borderType: 'temple',
      color: 'maroon',
      designType: 'traditional',
      length: '6.3 meters',
      weight: '',
      blouseIncluded: true,
      blousePiece: '0.8 meters',
      purchasePrice: 0,
      sellingPrice: 0,
      mrp: 0,
      gstPercent: 5,
      stockType: 'unique',
      stockQty: 1,
      rackLocation: '',
      supplier: '',
      description: '',
    });
    setIsEditing(false);
  };

  const filteredSarees = sarees.filter((saree) => {
    const matchesSearch =
      saree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.sareeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.barcode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || saree.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || saree.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const togglePrintSelection = (id: string) => {
    setSelectedForPrint((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-success/10 text-success border-success/20">Available</Badge>;
      case 'sold':
        return <Badge className="bg-muted text-muted-foreground">Sold</Badge>;
      case 'reserved':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Reserved</Badge>;
      case 'damaged':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Damaged</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryLabel = (value: string) => {
    const cat = categories.find((c) => c.value === value);
    return language === 'ta' ? cat?.labelTa : cat?.label;
  };

  const getColorHex = (value: string) => {
    return colors.find((c) => c.value === value)?.hex || '#000';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('nav.products')} <span className="text-silk-gold">Catalogue</span>
          </h1>
          <p className="mt-1 text-slate-500 font-medium">
            Manage your boutique inventory and product details
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-2xl border-indigo-100 hover:bg-slate-50 shadow-sm font-bold" onClick={() => navigate('/billing')}>
            <Plus className="mr-2 h-4 w-4" />
            New Bill
          </Button>
          <Button variant="outline" className="rounded-2xl border-indigo-100 hover:bg-slate-50 shadow-sm font-bold" onClick={() => setIsImportDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="rounded-2xl border-indigo-100 hover:bg-slate-50 shadow-sm font-bold" onClick={() => toast.info('Export functionality coming soon')}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Import Sarees</DialogTitle>
                <DialogDescription>
                  Upload a CSV file to import saree data. Please use the template format.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" onClick={handleDownloadTemplate} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="csvFile">Upload CSV</Label>
                    <Input id="csvFile" type="file" accept=".csv" onChange={handleFileUpload} />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <Button className="premium-btn text-white rounded-2xl px-6 font-bold shadow-gold-500/20" onClick={() => { resetForm(); setIsEditing(false); setIsAddDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-[2.5rem] p-0 overflow-hidden">
              <DialogHeader className="p-8 pb-4 bg-slate-50/50 border-b border-glass">
                <DialogTitle className="font-display text-2xl font-bold">{isEditing ? 'Edit Saree' : 'Add New Saree'}</DialogTitle>
                <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Product Identity & Attributes
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  {(formData.department === 'Saree' || !formData.department) && <TabsTrigger value="attributes">Saree Attributes</TabsTrigger>}
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">

                  {/* Department & Stock Type */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(val: any) => setFormData({ ...formData, department: val })}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {departments.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Stock Type</Label>
                      <Select
                        value={formData.stockType}
                        onValueChange={(val: any) => setFormData({ ...formData, stockType: val, stockQty: val === 'unique' ? 1 : formData.stockQty })}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unique">Unique (Single Piece)</SelectItem>
                          <SelectItem value="bulk">Bulk (Quantity Based)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-1">
                    <div className="space-y-2">
                      <Label>Product Code *</Label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.sareeCode}
                          onChange={(e) => setFormData({ ...formData, sareeCode: e.target.value })}
                          placeholder="Enter or generate code"
                        />
                        <Button variant="outline" size="icon" onClick={generateSareeCode}>
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">
                        The Product Code will be used as the Barcode for scanning and label printing.
                      </p>
                    </div>
                  </div>

                  {/* Names */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Saree Name (English) *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Kanchipuram Pure Silk - Temple Border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-tamil">சேலை பெயர் (தமிழ்)</Label>
                      <Input
                        value={formData.nameTamil}
                        onChange={(e) => setFormData({ ...formData, nameTamil: e.target.value })}
                        placeholder="காஞ்சிபுரம் தூய பட்டு"
                        className="font-tamil"
                      />
                    </div>
                  </div>

                  {/* Category & Brand */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) => setFormData({ ...formData, category: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Brand / Weaver</Label>
                      <Input
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="Sri Kumaran Silks"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Description</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-[10px] gap-1 bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300"
                        onClick={handleMagicDescribe}
                        disabled={isGeneratingDescription}
                      >
                        {isGeneratingDescription ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3" />
                        )}
                        Magic Describe
                      </Button>
                    </div>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed description of the saree..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="attributes" className="space-y-4 mt-4">
                  {/* Material & Zari */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Material</Label>
                      <Select
                        value={formData.material}
                        onValueChange={(v) => setFormData({ ...formData, material: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {materials.map((mat) => (
                            <SelectItem key={mat.value} value={mat.value}>
                              {mat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Zari Type</Label>
                      <Select
                        value={formData.zariType}
                        onValueChange={(v) => setFormData({ ...formData, zariType: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {zariTypes.map((zari) => (
                            <SelectItem key={zari.value} value={zari.value}>
                              {zari.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Border & Design */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Border Type</Label>
                      <Select
                        value={formData.borderType}
                        onValueChange={(v) => setFormData({ ...formData, borderType: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {borderTypes.map((border) => (
                            <SelectItem key={border.value} value={border.value}>
                              {border.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Design Type</Label>
                      <Select
                        value={formData.designType}
                        onValueChange={(v) => setFormData({ ...formData, designType: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {designTypes.map((design) => (
                            <SelectItem key={design.value} value={design.value}>
                              {design.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Color */}
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, color: color.value })}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all ${formData.color === color.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                            }`}
                        >
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm">{color.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Length & Weight */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Length</Label>
                      <Select
                        value={formData.length}
                        onValueChange={(v) => setFormData({ ...formData, length: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="5.5 meters">5.5 meters</SelectItem>
                          <SelectItem value="6.0 meters">6.0 meters</SelectItem>
                          <SelectItem value="6.3 meters">6.3 meters (Standard)</SelectItem>
                          <SelectItem value="6.5 meters">6.5 meters</SelectItem>
                          <SelectItem value="9 meters">9 meters (Madisar)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Weight (grams)</Label>
                      <Input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="850"
                      />
                    </div>
                  </div>

                  {/* Blouse */}
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Blouse Piece Included</p>
                        <p className="text-sm text-muted-foreground">
                          Does this saree come with blouse material?
                        </p>
                      </div>
                      <Switch
                        checked={formData.blouseIncluded}
                        onCheckedChange={(v) => setFormData({ ...formData, blouseIncluded: v })}
                      />
                    </div>
                    {formData.blouseIncluded && (
                      <div className="mt-3">
                        <Label>Blouse Piece Length</Label>
                        <Select
                          value={formData.blousePiece}
                          onValueChange={(v) => setFormData({ ...formData, blousePiece: v })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            <SelectItem value="0.8 meters">0.8 meters (Running)</SelectItem>
                            <SelectItem value="1.0 meters">1.0 meter</SelectItem>
                            <SelectItem value="attached">Attached Blouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4 mt-4">
                  {/* Pricing */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Purchase Price (₹) *</Label>
                      <Input
                        type="number"
                        value={formData.purchasePrice}
                        onChange={(e) =>
                          setFormData({ ...formData, purchasePrice: Number(e.target.value) })
                        }
                        placeholder="18000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Selling Price (₹) *</Label>
                      <Input
                        type="number"
                        value={formData.sellingPrice}
                        onChange={(e) =>
                          setFormData({ ...formData, sellingPrice: Number(e.target.value) })
                        }
                        placeholder="22500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>MRP (₹) *</Label>
                      <Input
                        type="number"
                        value={formData.mrp}
                        onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                        placeholder="25000"
                      />
                    </div>
                  </div>

                  {/* Profit Calculation */}
                  {formData.purchasePrice && formData.sellingPrice && (
                    <div className="rounded-lg bg-success/10 p-4">
                      <p className="text-sm text-muted-foreground">Estimated Profit</p>
                      <p className="text-2xl font-bold text-success">
                        ₹{((formData.sellingPrice || 0) - (formData.purchasePrice || 0)).toLocaleString()}
                        <span className="ml-2 text-sm font-normal">
                          ({(
                            (((formData.sellingPrice || 0) - (formData.purchasePrice || 0)) /
                              (formData.purchasePrice || 1)) *
                            100
                          ).toFixed(1)}
                          % margin)
                        </span>
                      </p>
                    </div>
                  )}

                  {/* GST */}
                  <div className="space-y-2">
                    <Label>GST %</Label>
                    <Select
                      value={formData.gstPercent?.toString()}
                      onValueChange={(v) => setFormData({ ...formData, gstPercent: Number(v) })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Stock */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Stock Type</Label>
                      <Select
                        value={formData.stockType}
                        onValueChange={(v: 'unique' | 'bulk') =>
                          setFormData({ ...formData, stockType: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="unique">Unique (1 Piece)</SelectItem>
                          <SelectItem value="bulk">Bulk Quantity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={formData.stockQty}
                        disabled={formData.stockType === 'unique'}
                        onChange={(e) =>
                          setFormData({ ...formData, stockQty: Number(e.target.value) })
                        }
                        placeholder="10"
                      />
                    </div>
                  </div>

                  {/* Location & Supplier */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Rack Location</Label>
                      <Input
                        value={formData.rackLocation}
                        onChange={(e) => setFormData({ ...formData, rackLocation: e.target.value })}
                        placeholder="A1-01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Supplier</Label>
                      <Input
                        value={formData.supplier}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                        placeholder="Kanchipuram Weavers Co-op"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-4 mt-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center relative hover:bg-muted/50 transition-colors">
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 font-medium">Add Image</p>
                      <p className="text-sm text-muted-foreground">
                        Click to upload
                      </p>
                      <Input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </div>
                    {/* Uploaded Images Preview */}
                    {formData.images && formData.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        {formData.images.map((img, i) => (
                          <div key={i} className="relative group">
                            <img
                              src={img}
                              alt={`Uploaded ${i + 1}`}
                              className="h-24 w-full object-cover rounded-lg border"
                            />
                            <button
                              className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                const newImages = [...(formData.images || [])];
                                newImages.splice(i, 1);
                                setFormData({ ...formData, images: newImages });
                              }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6 gap-2">
                <Button variant="outline" onClick={resetForm}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button variant="outline" onClick={() => {
                  const current = { ...formData };
                  resetForm();
                  setFormData({ ...current, sareeCode: '', barcode: '', id: '' });
                  toast.info('Form duplicated - modify and save as new');
                }}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button variant="default" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="gold" onClick={handleSaveAndPrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Save & Print Tag
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-0 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total Inventory</p>
              <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Package className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-display font-bold text-slate-900">{sarees.length}</p>
              <p className="text-xs font-medium text-slate-400">Total Saree Types</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Available Stock</p>
              <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-display font-bold text-slate-900">
                {sarees.reduce((sum, s) => sum + (s.status === 'available' ? (s.stockQty || 0) : 0), 0)}
              </p>
              <p className="text-xs font-medium text-slate-400">Ready for Sale</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Stock Valuation</p>
              <div className="rounded-xl bg-amber-50 p-2 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <Tag className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-display font-bold text-slate-900 text-silk-gold">
                ₹{sarees.reduce((sum, s) => sum + (s.purchasePrice || 0) * (s.stockQty || 0), 0).toLocaleString()}
              </p>
              <p className="text-xs font-medium text-slate-400">Inventory At Cost</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Unique Design</p>
              <div className="rounded-xl bg-purple-50 p-2 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Barcode className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-display font-bold text-slate-900">
                {sarees.filter((s) => s.stockType === 'unique').length}
              </p>
              <p className="text-xs font-medium text-slate-400">Signature Pieces</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions & Filters */}
      <div className="glass-card p-6 rounded-[2rem] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-silk-gold transition-colors" size={18} />
          <Input
            placeholder="Search by name, code or barcode..."
            className="pl-10 h-12 rounded-2xl border-indigo-50 bg-slate-50/50 focus:bg-white focus:ring-silk-gold transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px] h-12 rounded-2xl border-indigo-50 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-400" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {language === 'ta' ? c.labelTa : c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-[150px] h-12 rounded-2xl border-indigo-50 bg-slate-50/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      <Card className="glass-card border-0 rounded-[2.5rem] overflow-hidden shadow-xl shadow-indigo-500/5">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-indigo-50 hover:bg-transparent">
                <TableHead className="w-12 pl-6">
                  <input
                    type="checkbox"
                    className="rounded-md border-slate-300 text-silk-gold focus:ring-silk-gold"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedForPrint(filteredSarees.map((s) => s.id));
                      } else {
                        setSelectedForPrint([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specifications</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Pricing (₹)</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">In-Stock</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-right pr-6">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSarees.map((saree) => (
                <TableRow key={saree.id} className="border-b border-indigo-50/50 group transition-all hover:bg-slate-50/50">
                  <TableCell className="pl-6">
                    <input
                      type="checkbox"
                      className="rounded-md border-slate-300 text-silk-gold focus:ring-silk-gold"
                      checked={selectedForPrint.includes(saree.id)}
                      onChange={() => togglePrintSelection(saree.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4 py-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300 shadow-sm">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{saree.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{saree.sareeCode}</span>
                          <span className="text-[10px] font-mono font-medium text-slate-400">{saree.barcode}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-xl border-indigo-100 bg-indigo-50/30 text-indigo-700 font-bold text-[10px] uppercase tracking-wider px-2.5">
                      {getCategoryLabel(saree.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full border border-white shadow-sm ring-1 ring-slate-100"
                          style={{ backgroundColor: getColorHex(saree.color) }}
                          title={saree.color}
                        />
                        <span className="text-xs font-medium text-slate-600">
                          {zariTypes.find((z) => z.value === saree.zariType)?.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 ml-5">
                         <span className="text-[10px] text-slate-400 font-medium">{saree.material} • {saree.borderType}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-display font-bold text-slate-900 leading-none">₹{saree.sellingPrice.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-slate-400 line-through mt-1">₹{saree.mrp.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex flex-col items-center">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded-xl font-black text-[10px] px-2.5 py-1 mb-1 border-0 shadow-sm",
                          saree.stockQty < 3 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                        )}
                      >
                        {saree.stockQty} {saree.stockType === 'unique' ? 'PC' : 'PCS'}
                      </Badge>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{saree.rackLocation || 'NO LOC'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                        onClick={() => {
                          setSelectedSaree(saree);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 text-slate-400 hover:text-silk-gold hover:bg-gold-50 rounded-2xl transition-all" 
                        onClick={() => handleEdit(saree)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                        onClick={() => handleGenerateSocial(saree.barcode)}
                        title="Generate Social Media Post"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
                        onClick={() => {
                          setSelectedForPrint([saree.id]);
                          setIsPrintDialogOpen(true);
                        }}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl bg-background">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Saree Details</DialogTitle>
          </DialogHeader>
          {selectedSaree && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Saree Code</p>
                  <p className="font-mono font-semibold">{selectedSaree.sareeCode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Barcode</p>
                  <p className="font-mono font-semibold">{selectedSaree.barcode}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{selectedSaree.name}</p>
                <p className="text-sm font-tamil text-muted-foreground">{selectedSaree.nameTamil}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{getCategoryLabel(selectedSaree.category)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Zari Type</p>
                  <p className="font-medium">
                    {zariTypes.find((z) => z.value === selectedSaree.zariType)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Border</p>
                  <p className="font-medium">
                    {borderTypes.find((b) => b.value === selectedSaree.borderType)?.label}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Price</p>
                  <p className="font-medium">₹{selectedSaree.purchasePrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Selling Price</p>
                  <p className="font-semibold text-primary">
                    ₹{selectedSaree.sellingPrice.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">MRP</p>
                  <p className="font-medium line-through">₹{selectedSaree.mrp.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Print Tags Dialog */}
      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent className="max-w-lg bg-background">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Print Barcode Tags</DialogTitle>
            <DialogDescription>
              Preview and print barcode tags for selected items
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-inner flex justify-center">
              {selectedForPrint.length > 0 && (
                (() => {
                  const s = sarees.find((s) => s.id === selectedForPrint[0]);
                  if (!s) return null;
                  return (
                    <div className="w-[50mm] min-h-[25mm] border border-gray-400 p-2 text-center flex flex-col items-center justify-center bg-white text-black">
                      <p className="font-bold text-[10px] uppercase tracking-tight truncate w-full">MY SILK STORE</p>
                      <p className="text-[9px] truncate w-full">{s.name}</p>
                      <div className="my-1">
                        <ReactBarcode
                          value={s.barcode}
                          width={1.2}
                          height={30}
                          fontSize={10}
                          margin={0}
                        />
                      </div>
                      <div className="flex justify-between w-full px-2 mt-1">
                        <span className="text-[10px] font-bold">₹{s.sellingPrice.toLocaleString()}</span>
                        <span className="text-[10px] font-mono">{s.sareeCode}</span>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>

            <div className="grid gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Print Quantity</Label>
                  <p className="text-xs text-muted-foreground">Total labels to generate</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    className="w-20 text-center font-bold"
                    value={printQty}
                    onChange={e => setPrintQty(Math.max(1, Number(e.target.value)))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Selected Item</Label>
                  <p className="text-xs text-muted-foreground">
                    {selectedForPrint.length > 0
                      ? sarees.find(s => s.id === selectedForPrint[0])?.name.substring(0, 30) + '...'
                      : 'None'}
                  </p>
                </div>
                <Badge variant="secondary">Item 1 of {selectedForPrint.length}</Badge>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrintDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="gold"
              onClick={() => {
                toast.success(`Sent ${printQty} label(s) to barcode printer!`);
                setIsPrintDialogOpen(false);
                setSelectedForPrint([]);
              }}
            >
              <Printer className="mr-2 h-4 w-4" />
              Start Printing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Social Media Post Dialog */}
      <Dialog open={socialDialogOpen} onOpenChange={setSocialDialogOpen}>
        <DialogContent className="max-w-md bg-background">
          <DialogHeader>
            <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg">
                    <Share2 size={18} className="text-white" />
                </div>
                <DialogTitle>AI Social Media Post</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            {isGeneratingSocial ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                    <p className="text-sm text-slate-500 font-medium">Gemini is drafting your posts...</p>
                </div>
            ) : socialContent && (
                <>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2">
                                <Instagram size={16} className="text-pink-600" />
                                Instagram Caption
                            </Label>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-[10px]"
                                onClick={() => {
                                    navigator.clipboard.writeText(socialContent.instagram);
                                    toast.success("Instagram caption copied!");
                                }}
                            >
                                <Copy size={12} className="mr-1" /> Copy
                            </Button>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border text-sm leading-relaxed text-slate-700 whitespace-pre-wrap dark:bg-slate-900">
                            {socialContent.instagram}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2">
                                <Smartphone size={16} className="text-emerald-600" />
                                WhatsApp Status
                            </Label>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-[10px]"
                                onClick={() => {
                                    navigator.clipboard.writeText(socialContent.whatsapp);
                                    toast.success("WhatsApp status copied!");
                                }}
                            >
                                <Copy size={12} className="mr-1" /> Copy
                            </Button>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border text-sm leading-relaxed text-slate-700 whitespace-pre-wrap dark:bg-slate-900">
                            {socialContent.whatsapp}
                        </div>
                    </div>
                </>
            )}
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setSocialDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SareeMaster;
