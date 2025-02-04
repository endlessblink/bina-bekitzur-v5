'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export function FeaturedVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/youtube/playlist');
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            סרטונים מומלצים
          </h2>
          <p className="mt-2 text-lg leading-8 text-white/60">
            צפו במדריכים, סקירות והדגמות של כלי AI חדשניים
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {videos.length > 0 ? (
            videos.map((video) => (
              <motion.div
                key={video.id}
                className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl shadow-xl ring-1 ring-white/10"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={`https://youtube.com/watch?v=${video.id}`} target="_blank">
                  <div className="aspect-video relative">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2">
                      <i className="fab fa-youtube text-red-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium leading-8 tracking-tight text-white">
                      {video.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-x-4">
                      <time className="text-sm leading-6 text-white/40">
                        {new Date(video.publishedAt).toLocaleDateString('he-IL')}
                      </time>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            // Loading state
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-video bg-white/10 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/4"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
