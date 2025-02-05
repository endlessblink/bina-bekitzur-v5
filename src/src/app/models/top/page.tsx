'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { models } from '@/lib/data/models';
import { categories } from '@/lib/data/categories';
import ModelCard from '@/app/components/shared/ModelCard';
import LoadingAnimation from '@/app/components/shared/LoadingAnimation';

interface CategoryImages {
  [key: string]: string[];
}

const TopModelsPage = () => {
  const [categoryImages, setCategoryImages] = useState<CategoryImages>({});
  const [loadingImages, setLoadingImages] = useState<boolean>(true);

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

  // Fetch category images on mount
  useEffect(() => {
    const fetchImages = async () => {
      setLoadingImages(true);
      const images: CategoryImages = {};
      
      try {
        for (const category of categories) {
          const response = await fetch(`/api/images?category=${category.id}&count=5`);
          const data = await response.json();
          if (data.images) {
            images[category.id] = data.images;
          }
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
      
      setCategoryImages(images);
      setLoadingImages(false);
    };

    fetchImages();
  }, []);

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

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 8000, disableOnInteraction: false }}
              className="model-slider"
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
            >
              {topModels.map((model, index) => (
                <SwiperSlide key={model.id}>
                  <div className="aspect-w-16 aspect-h-9 mb-4 bg-white/5 rounded-lg overflow-hidden relative h-[200px]">
                    <AnimatePresence mode="wait">
                      {loadingImages ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                        >
                          <LoadingAnimation size="sm" />
                        </motion.div>
                      ) : categoryImages[category.id]?.[index] && (
                        <motion.div
                          key="image-container"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <img
                            src={categoryImages[category.id][index]}
                            alt={`${category.name} cover ${index + 1}`}
                            className="w-full h-full object-cover"
                            style={{ minHeight: '200px' }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <ModelCard model={model} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TopModelsPage;
