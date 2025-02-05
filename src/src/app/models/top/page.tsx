'use client';

import { motion } from 'framer-motion';
import { models } from '@/lib/data/models';
import { categories } from '@/lib/data/categories';
import ModelCard from '@/app/components/shared/ModelCard';
import { StarIcon } from '@heroicons/react/24/solid';

const TopModelsPage = () => {
  // Get top 5 models for each category based on features and technology rating
  const getTopModels = (categoryId: string) => {
    return models
      .filter(model => model.categories.includes(categoryId))
      .sort((a, b) => {
        const aScore = (a.rating.features + a.rating.technology) / 2;
        const bScore = (b.rating.features + b.rating.technology) / 2;
        return bScore - aScore;
      })
      .slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">מודלים מובילים לפי קטגוריה</h1>
      
      {categories.map((category) => {
        const topModels = getTopModels(category.id);
        if (topModels.length === 0) return null;

        const IconComponent = category.icon;
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center mb-4 gap-2">
              <div className="flex items-center justify-center w-8 h-8">
                {IconComponent.displayName?.includes('Heroicons') ? (
                  <IconComponent className="w-6 h-6 text-white" />
                ) : (
                  <IconComponent size={24} />
                )}
              </div>
              <h2 className="text-2xl font-semibold">{category.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {topModels.map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="relative">
                    <ModelCard model={model} />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">{model.rating.overall.toFixed(1)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TopModelsPage;
