'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PodcastEpisode {
  title: string;
  description: string;
  audioUrl: string;
  published: string;
  link: string;
  artwork: string;
  duration: string;
}

interface PodcastPlayerProps {
  episode: PodcastEpisode;
  compact?: boolean;
}

export function PodcastPlayer({ episode, compact = false }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout>();

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
        // Pause all other audio elements before playing
        document.querySelectorAll('audio').forEach(audio => {
          if (audio !== audioRef.current) {
            audio.pause();
          }
        });
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleVolumeIconClick = () => {
    setIsVolumeVisible(true);
    // Hide volume slider after 3 seconds of inactivity
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    volumeTimeoutRef.current = setTimeout(() => {
      setIsVolumeVisible(false);
    }, 3000);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.volume > 0) {
        audioRef.current.volume = 0;
        setVolume(0);
      } else {
        audioRef.current.volume = 1;
        setVolume(1);
      }
    }
  };

  return (
    <div className={`space-y-8 ${compact ? 'scale-90 -mr-4 -ml-4' : ''}`}>
      <audio ref={audioRef} src={episode.audioUrl} className="hidden" />
      
      {/* Controls */}
      <div className="flex flex-row-reverse items-start gap-8 mb-12 px-2">
        {/* Volume Control */}
        <div className="relative flex items-center">
          <button
            onClick={handleVolumeIconClick}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {volume === 0 ? (
              <SpeakerXMarkIcon className="h-6 w-6" />
            ) : volume < 0.5 ? (
              <SpeakerWaveIcon className="h-6 w-6" />
            ) : (
              <SpeakerWaveIcon className="h-6 w-6" />
            )}
          </button>

          <AnimatePresence>
            {isVolumeVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute bottom-12 right-1 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 z-10"
                onMouseEnter={() => {
                  if (volumeTimeoutRef.current) {
                    clearTimeout(volumeTimeoutRef.current);
                  }
                }}
                onMouseLeave={() => {
                  volumeTimeoutRef.current = setTimeout(() => {
                    setIsVolumeVisible(false);
                  }, 1000);
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="h-24 w-1.5 bg-purple-200/20 rounded-full appearance-none cursor-pointer accent-purple-600 hover:bg-purple-200/30 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-purple-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:bg-purple-300"
                  style={{
                    writingMode: 'bt-lr',
                    WebkitAppearance: 'slider-vertical',
                    background: `linear-gradient(to top, rgb(147, 51, 234) ${volume * 100}%, rgba(147, 51, 234, 0.2) ${volume * 100}%)`
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-grow space-y-4">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-purple-200/20 rounded-full appearance-none cursor-pointer accent-purple-600"
            style={{
              background: `linear-gradient(to right, rgb(147, 51, 234) ${(currentTime / (duration || 100)) * 100}%, rgba(147, 51, 234, 0.2) ${(currentTime / (duration || 100)) * 100}%)`
            }}
          />
          <div className="flex justify-between text-sm text-white/40 px-2">
            <span>{formatTime(currentTime)}</span>
            <span>{episode.duration || formatTime(duration)}</span>
          </div>
        </div>

        <motion.button
          onClick={togglePlay}
          className={`flex-shrink-0 rounded-full bg-purple-600/90 hover:bg-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-200 ${
            compact ? 'w-12 h-12' : 'w-16 h-16'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? 'עצור' : 'נגן'}
        >
          <i className={`fas fa-${isPlaying ? 'pause' : 'play'} ${compact ? 'text-lg' : 'text-2xl'}`}></i>
        </motion.button>
      </div>
    </div>
  );
}
