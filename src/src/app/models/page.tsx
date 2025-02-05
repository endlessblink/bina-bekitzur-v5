'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleBottomCenterTextIcon,
  CubeIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  MusicalNoteIcon,
  PhotoIcon,
  VideoCameraIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { getAllModels, searchModels } from '@/lib/utils/models';
import { AIModel } from '@/lib/types/models';
import { useDebounce } from '@/lib/hooks/useDebounce';

const categories = [
  { 
    id: 'language',
    name: 'מודל שפה',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    id: 'chat',
    name: 'שיחה',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    id: 'text',
    name: 'טקסט',
    icon: DocumentTextIcon,
  },
  {
    id: 'code',
    name: 'קוד',
    icon: CodeBracketIcon,
  },
  {
    id: 'audio',
    name: 'שמע',
    icon: MusicalNoteIcon,
  },
  {
    id: 'visual',
    name: 'ויזואלי',
    icon: VideoCameraIcon,
  },
  {
    id: '3d',
    name: 'תלת מימד',
    icon: CubeIcon,
  },
  {
    id: 'art',
    name: 'אומנות',
    icon: PaintBrushIcon,
  }
];

const subcategories = {
  language: [
    { id: 'lip_sync', name: 'סנכרון שפתיים' },
    { id: 'text_to_speech', name: 'הקראה' },
    { id: 'music', name: 'יצירת מוזיקה' },
    { id: 'video', name: 'יצירת וידאו' },
    { id: 'image', name: 'יצירת תמונות' }
  ],
  chat: [
    { id: 'chatbots', name: 'בוטים' },
    { id: 'conversational_ai', name: 'AI לשיחה' }
  ],
  text: [
    { id: 'text_generation', name: 'יצירת טקסט' },
    { id: 'text_analysis', name: 'ניתוח טקסט' }
  ],
  code: [
    { id: 'code_generation', name: 'יצירת קוד' },
    { id: 'code_review', name: 'ביקורת קוד' }
  ],
  audio: [
    { id: 'lip_sync', name: 'סנכרון שפתיים' },
    { id: 'text_to_speech', name: 'הקראה' },
    { id: 'music', name: 'יצירת מוזיקה' }
  ],
  visual: [
    { id: 'video', name: 'יצירת וידאו' },
    { id: 'image', name: 'יצירת תמונות' }
  ],
  '3d': [
    { id: '3d_modeling', name: 'דגמי 3D' },
    { id: '3d_rendering', name: 'הדמיית 3D' }
  ],
  art: [
    { id: 'art_generation', name: 'יצירת אומנות' },
    { id: 'art_style', name: 'סגנונות אומנות' }
  ]
};

const pricingTypes = [
  { id: 'free', name: 'חינם', icon: CurrencyDollarIcon },
  { id: 'freemium', name: 'Freemium', icon: CurrencyDollarIcon },
  { id: 'paid', name: 'בתשלום', icon: CurrencyDollarIcon },
];

export default function ModelsPage() {
  const [selectedModels, setSelectedModels] = useState<AIModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [displayedModels, setDisplayedModels] = useState<AIModel[]>(getAllModels());
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Count models per subcategory
  const subcategoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    getAllModels().forEach(model => {
      model.subcategories.forEach(subcat => {
        counts[subcat] = (counts[subcat] || 0) + 1;
      });
    });
    return counts;
  }, []);

  useEffect(() => {
    const filteredModels = searchModels(debouncedSearchTerm, {
      categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
      subcategoryId: selectedSubcategory === 'all' ? undefined : selectedSubcategory,
      pricingType: selectedPricing === 'all' ? undefined : selectedPricing as any
    });
    setDisplayedModels(filteredModels);
  }, [debouncedSearchTerm, selectedCategory, selectedSubcategory, selectedPricing]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <motion.h1 
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            השוואת מודלים
          </motion.h1>
        </div>

        {/* Search */}
        <div className="mt-8">
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חיפוש מודלים..."
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Categories and Subcategories */}
        <div className="mt-8">
          <h3 className="text-white/80 mb-4 text-sm font-medium">סינון לפי קטגוריה</h3>
          <div className="flex flex-col gap-4">
            {/* Main Categories */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                הכל
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubcategory('all');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <category.icon className="h-5 w-5" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Subcategories - only show when a category is selected */}
            {selectedCategory !== 'all' && subcategories[selectedCategory as keyof typeof subcategories] && (
              <div className="flex items-center gap-4">
                {subcategories[selectedCategory as keyof typeof subcategories].map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span>{subcategory.name}</span>
                    <span className="text-sm text-white/50">({subcategoryCounts[subcategory.id] || 0})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pricing Filter */}
        <div className="mt-8">
          <h3 className="text-white/80 mb-4 text-sm font-medium">סינון לפי מחיר</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedPricing('all')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedPricing === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              הכל
            </button>
            {pricingTypes.map((pricing) => (
              <button
                key={pricing.id}
                onClick={() => setSelectedPricing(pricing.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedPricing === pricing.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <pricing.icon className="h-5 w-5" />
                <span>{pricing.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Model Comparison Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedModels.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-white/60">בחר מודלים להשוואה</p>
            </div>
          ) : (
            <>
              <div className="col-span-full flex justify-end mb-4">
                <button
                  onClick={() => setSelectedModels([])}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
                >
                  צא ממצב השוואה
                </button>
              </div>
              {selectedModels.map((model) => (
                <motion.div
                  key={model.id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-white">{model.name}</h3>
                    {model.hasAPI && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-600/20 text-purple-400">
                        API
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-white/60">{model.description}</p>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">יתרונות</h4>
                      <ul className="space-y-2">
                        {model.advantages.map((advantage, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                            <span className="text-green-400">✓</span>
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-red-400 mb-2">חסרונות</h4>
                      <ul className="space-y-2">
                        {model.disadvantages.map((disadvantage, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                            <span className="text-red-400">✗</span>
                            {disadvantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Available Models List */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 text-white">מודלים זמינים</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedModels.map((model) => (
              <motion.button
                key={model.id}
                onClick={() => {
                  if (selectedModels.find(m => m.id === model.id)) {
                    setSelectedModels(selectedModels.filter(m => m.id !== model.id));
                  } else if (selectedModels.length < 2) {
                    setSelectedModels([...selectedModels, model]);
                  }
                }}
                className={`text-right p-4 rounded-lg transition-all ${
                  selectedModels.find(m => m.id === model.id)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white/80'
                }`}
                whileHover={{ scale: 1.02 }}
                disabled={selectedModels.length >= 2 && !selectedModels.find(m => m.id === model.id)}
              >
                <h3 className="font-medium">{model.name}</h3>
                <p className="text-sm text-white/60 line-clamp-2 mt-1">{model.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}