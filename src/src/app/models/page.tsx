'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ModelCard from '@/app/components/shared/ModelCard';
import { models } from '@/lib/data/models';
import { categories } from '@/lib/data/categories';
import { useDebounce } from '@/lib/hooks/useDebounce';

const pricingOptions = [
  { id: 'all', name: 'הכל' },
  { id: 'free', name: 'חינם' },
  { id: 'freemium', name: 'Freemium' },
  { id: 'paid', name: 'בתשלום' },
];

export default function ModelsPage() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedPricing, setSelectedPricing] = useState('all');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredModels = models.filter(model => {
    const matchesSearch = !debouncedSearch || 
      model.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      model.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      model.categories.some(cat => cat.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
      model.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));

    const matchesCategory = !selectedCategory || model.categories.includes(selectedCategory);
    const matchesSubcategory = !selectedSubcategory || model.subcategories?.includes(selectedSubcategory);
    const matchesPricing = selectedPricing === 'all' || model.pricing.type === selectedPricing;

    return matchesSearch && matchesCategory && matchesSubcategory && matchesPricing;
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
            className="text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            השוואת מודלים
          </motion.h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            השתמשו בפילטרים כדי למצוא את המודל המתאים לכם. ניתן לסנן לפי קטגוריה, תמחור, ולחפש לפי מילות מפתח. 
            לחצו על כרטיס המודל כדי לראות פרטים נוספים כמו יתרונות, חסרונות ודוגמאות שימוש.
          </p>
        </div>
        
        {/* Search and Pricing Filter */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="חיפוש מודלים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <div className="flex gap-2">
            {pricingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedPricing(option.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedPricing === option.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories and Subcategories */}
        <div className="mt-8 space-y-4">
          {/* Main Categories */}
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center w-8 h-8">
                    {IconComponent.displayName?.includes('Heroicons') ? (
                      <IconComponent className="w-6 h-6 text-white" />
                    ) : (
                      <IconComponent size={24} />
                    )}
                  </div>
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Subcategories */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap gap-4 pr-8"
            >
              {categories
                .find(cat => cat.id === selectedCategory)
                ?.subcategories.map((subcategory) => (
                  <motion.button
                    key={subcategory}
                    onClick={() => setSelectedSubcategory(
                      selectedSubcategory === subcategory ? null : subcategory
                    )}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                      selectedSubcategory === subcategory
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {subcategory}
                  </motion.button>
                ))}
            </motion.div>
          )}
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