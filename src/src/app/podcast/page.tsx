'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PodcastPlayer } from '../components/podcast/PodcastPlayer';
import { motion } from 'framer-motion';

interface PodcastEpisode {
  title: string;
  description: string;
  audioUrl: string;
  published: string;
  link: string;
  artwork: string;
  duration: string;
}

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('/api/podcast/episodes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data, error } = await response.json();
        
        if (error) {
          throw new Error(error);
        }
        
        setEpisodes(data);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setError('Failed to load podcast episodes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-white/5 rounded-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">שגיאה בטעינת הפרקים</h2>
            <p className="mt-2 text-white/60">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const [latestEpisode, ...olderEpisodes] = episodes;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            חופרים בינה
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            הפודקאסט שחופר עמוק לתוך עולם הבינה המלאכותית. בכל פרק נארח מומחים ונדון בנושאים מרתקים מעולם ה-AI.
          </p>
          {/* Subscription buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://open.spotify.com/show/your-show-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-white rounded-full hover:bg-[#1ed760] transition-colors duration-200"
            >
              <i className="fab fa-spotify text-xl"></i>
              <span>האזינו ב-Spotify</span>
            </a>
            <a
              href="https://podcasts.apple.com/podcast/your-show-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#872EC4] text-white rounded-full hover:bg-[#9332ea] transition-colors duration-200"
            >
              <i className="fab fa-apple text-xl"></i>
              <span>האזינו ב-Apple Podcasts</span>
            </a>
          </div>
        </div>

        {/* Latest Episode */}
        {latestEpisode && (
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl p-8 pb-16 shadow-xl ring-1 ring-white/10"
            >
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30">
                  פרק חדש
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-64 h-64 flex-shrink-0">
                  <Image
                    src={latestEpisode.artwork}
                    alt={latestEpisode.title}
                    fill
                    priority
                    className="object-cover rounded-lg"
                    sizes="(min-width: 768px) 16rem, 100vw"
                  />
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="absolute -bottom-8 right-0 text-sm text-purple-400 hover:text-purple-300"
                  >
                    {showFullDescription ? 'הצג פחות' : 'קרא עוד'}
                  </button>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white">
                    {latestEpisode.title}
                  </h3>
                  <time className="mt-2 block text-sm text-white/60">
                    {new Date(latestEpisode.published).toLocaleDateString('he-IL')}
                  </time>
                  
                  <motion.div 
                    animate={{ height: showFullDescription ? 'auto' : '4.5rem' }}
                    className="mt-4"
                  >
                    <p className={`text-base text-white/80 ${!showFullDescription && 'line-clamp-3'}`}>
                      {latestEpisode.description}
                    </p>
                  </motion.div>
                  
                  <div className="mt-6">
                    <PodcastPlayer episode={latestEpisode} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Older Episodes Grid */}
        {olderEpisodes.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-white mb-8">פרקים קודמים</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {olderEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl p-6 shadow-xl ring-1 ring-white/10"
                >
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={episode.artwork}
                      alt={episode.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  
                  <h4 className="text-lg font-medium text-white line-clamp-2">
                    {episode.title}
                  </h4>
                  
                  <time className="mt-2 block text-sm text-white/60">
                    {new Date(episode.published).toLocaleDateString('he-IL')}
                  </time>
                  
                  <p className="mt-2 text-sm text-white/80 line-clamp-3">
                    {episode.description}
                  </p>
                  
                  <div className="mt-4">
                    <PodcastPlayer episode={episode} compact />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
