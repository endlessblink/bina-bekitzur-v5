'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Newsletter {
  title: string;
  summary: string;
  published_date: string;
  mailerlite_id: string;
}

interface PodcastEpisode {
  title: string;
  description: string;
  audioUrl: string;
  published: string;
}

export function LatestContent() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [podcast, setPodcast] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const response = await fetch('/api/newsletter/latest');
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setNewsletter(data);
      } catch (error) {
        console.error('Error fetching newsletter:', error);
      }
    };

    const fetchPodcast = async () => {
      try {
        const response = await fetch('/api/podcast/latest');
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setPodcast(data);
      } catch (error) {
        console.error('Error fetching podcast:', error);
      }
    };

    fetchNewsletter();
    fetchPodcast();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Newsletter Card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl p-8 shadow-xl ring-1 ring-white/10"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30">
                ניוזלטר
              </span>
            </div>
            {newsletter ? (
              <>
                <h3 className="mt-8 text-xl font-medium leading-8 tracking-tight text-white">
                  {newsletter.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/60">
                  {newsletter.summary}
                </p>
                <div className="mt-6 flex items-center gap-x-4">
                  <time className="text-sm leading-6 text-white/40">
                    {new Date(newsletter.published_date).toLocaleDateString('he-IL')}
                  </time>
                  <Link
                    href={`/newsletter/${newsletter.mailerlite_id}`}
                    className="text-sm font-semibold leading-6 text-purple-400 hover:text-purple-300"
                  >
                    קרא עוד <span aria-hidden="true">←</span>
                  </Link>
                </div>
              </>
            ) : (
              <div className="animate-pulse">
                <div className="h-6 bg-white/10 rounded w-3/4 mt-8"></div>
                <div className="h-20 bg-white/10 rounded w-full mt-4"></div>
              </div>
            )}
          </motion.div>

          {/* Podcast Card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl p-8 shadow-xl ring-1 ring-white/10"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30">
                פודקאסט
              </span>
            </div>
            {podcast ? (
              <>
                <h3 className="mt-8 text-xl font-medium leading-8 tracking-tight text-white">
                  {podcast.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/60">
                  {podcast.description}
                </p>
                <div className="mt-6">
                  <audio ref={audioRef} src={podcast.audioUrl} className="hidden" />
                  <button
                    onClick={togglePlay}
                    className="inline-flex items-center gap-x-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  >
                    {isPlaying ? (
                      <>
                        <i className="fas fa-pause"></i>
                        <span>עצור</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-play"></i>
                        <span>נגן פרק</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-x-4">
                  <time className="text-sm leading-6 text-white/40">
                    {new Date(podcast.published).toLocaleDateString('he-IL')}
                  </time>
                  <Link
                    href="/podcast"
                    className="text-sm font-semibold leading-6 text-purple-400 hover:text-purple-300"
                  >
                    כל הפרקים <span aria-hidden="true">←</span>
                  </Link>
                </div>
              </>
            ) : (
              <div className="animate-pulse">
                <div className="h-6 bg-white/10 rounded w-3/4 mt-8"></div>
                <div className="h-20 bg-white/10 rounded w-full mt-4"></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
