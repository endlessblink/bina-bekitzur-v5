'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GuideCard from '@/app/components/guides/GuideCard';
import LoadingAnimation from '@/app/components/shared/LoadingAnimation';
import GuideCardSkeleton from '@/app/components/guides/GuideCardSkeleton';
import { YouTubeVideo } from '@/app/api/youtube/guides/route';

const categories = [
  'הכל',
  'Python',
  'JavaScript',
  'React',
  'Next.js',
  'AI',
  'מתחילים',
  'כללי',
];

export default function GuidesPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/youtube/guides');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setVideos(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'הכל' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת המדריכים</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            מדריכי וידאו
          </h1>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <input
              type="search"
              placeholder="חיפוש מדריכים..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Videos Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <GuideCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <GuideCard video={video} />
                </motion.div>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {!loading && filteredVideos.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              לא נמצאו מדריכים התואמים את החיפוש
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
