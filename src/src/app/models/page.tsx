'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleBottomCenterTextIcon,
  CubeIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import ModelCard from '@/app/components/shared/ModelCard';
import { models } from '@/lib/data/models';
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

export default function ModelsPage() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredModels = models.filter(model => {
    const matchesSearch = !debouncedSearch || 
      model.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      model.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      model.categories.some(cat => cat.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
      model.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));

    const matchesCategory = !selectedCategory || model.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleModelClick = (modelId: string) => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      }
      if (prev.length < 2) {
        return [...prev, modelId];
      }
      return prev;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-7xl w-full">
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
        
        {/* Search Bar */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="חיפוש מודלים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Models Comparison */}
        {selectedModels.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">השוואת מודלים</h2>
              <button
                onClick={() => setSelectedModels([])}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
              >
                נקה השוואה
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedModels.map(modelId => {
                const model = models.find(m => m.id === modelId);
                if (!model) return null;
                return (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ModelCard 
                      model={model} 
                      showDetails={true}
                      onClick={() => handleModelClick(model.id)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Models */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 text-white">מודלים זמינים</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredModels.map((model) => (
              <ModelCard 
                key={model.id} 
                model={model}
                onClick={() => handleModelClick(model.id)}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredModels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">לא נמצאו מודלים מתאימים לחיפוש שלך</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}