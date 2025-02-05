'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
  link: string;
  artwork: string;
  duration: string;
}

export function LatestContent() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [podcast, setPodcast] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const response = await fetch('/api/newsletter/latest');
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Newsletter API Error:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            body: errorText
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data, error } = await response.json();
        
        if (error) {
          console.error('Newsletter API returned error:', error);
          throw new Error(error);
        }
        
        setNewsletter(data);
      } catch (error) {
        console.error('Error fetching newsletter:', error);
        setNewsletter(null);
      }
    };

    const fetchPodcast = async () => {
      try {
        const response = await fetch('/api/podcast/latest');
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Podcast API Error:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            body: errorText
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data, error } = await response.json();
        
        if (error) {
          console.error('Podcast API returned error:', error);
          throw new Error(error);
        }
        
        setPodcast(data);
      } catch (error) {
        console.error('Error fetching podcast:', error);
        setPodcast(null);
      }
    };

    fetchNewsletter();
    fetchPodcast();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
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
                <div className="flex flex-col items-stretch space-y-6">
                  {/* Header with artwork and title */}
                  <div className="flex items-start gap-4 mt-8">
                    {podcast.artwork && (
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={podcast.artwork}
                          alt={podcast.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h3 className="text-xl font-medium leading-8 tracking-tight text-white">
                        {podcast.title}
                      </h3>
                      <time className="text-sm leading-6 text-white/40 mt-1 block">
                        {new Date(podcast.published).toLocaleDateString('he-IL')}
                      </time>
                    </div>
                  </div>

                  {/* Description */}
                  <motion.div 
                    className="relative mb-16"
                    animate={{ height: showFullDescription ? 'auto' : '4.5rem' }}
                  >
                    <p className={`text-base leading-7 text-white/60 ${!showFullDescription && 'line-clamp-3'}`}>
                      {podcast.description}
                    </p>
                    {podcast.description.length > 150 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-2 text-sm text-purple-400 hover:text-purple-300"
                      >
                        {showFullDescription ? 'הצג פחות' : 'קרא עוד'}
                      </button>
                    )}
                  </motion.div>

                  {/* Player Controls */}
                  <div className="space-y-6">
                    <audio ref={audioRef} src={podcast.audioUrl} className="hidden" />
                    
                    {/* Play button and progress */}
                    <div className="flex flex-row-reverse items-center gap-6">
                      <button
                        onClick={togglePlay}
                        className="flex-shrink-0 rounded-full bg-purple-600/90 hover:bg-purple-600 w-14 h-14 flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
                        aria-label={isPlaying ? 'עצור' : 'נגן'}
                      >
                        <i className={`fas fa-${isPlaying ? 'pause' : 'play'} text-xl`}></i>
                      </button>
                      
                      <div className="flex-grow space-y-2">
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-1 bg-purple-200/20 rounded-full appearance-none cursor-pointer accent-purple-600"
                          style={{
                            background: `linear-gradient(to right, rgb(147, 51, 234) ${(currentTime / (duration || 100)) * 100}%, rgba(147, 51, 234, 0.2) ${(currentTime / (duration || 100)) * 100}%)`
                          }}
                        />
                        <div className="flex justify-between text-sm text-white/40 px-0.5">
                          <span>{formatTime(currentTime)}</span>
                          <span>{podcast.duration || formatTime(duration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end mt-6">
                    <Link
                      href="/podcast"
                      className="text-sm font-semibold leading-6 text-purple-400 hover:text-purple-300"
                    >
                      כל הפרקים <span aria-hidden="true">←</span>
                    </Link>
                  </div>
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
