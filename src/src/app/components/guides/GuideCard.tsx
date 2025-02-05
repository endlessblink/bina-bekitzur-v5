'use client';

import { motion } from 'framer-motion';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { YouTubeVideo } from '@/app/api/youtube/guides/route';

interface GuideCardProps {
  video: YouTubeVideo;
}

const GuideCard = ({ video }: GuideCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <PlayCircleIcon className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-purple-500/20 text-purple-400 text-sm px-2 py-1 rounded">
            {video.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {video.description}
        </p>
        <time className="text-gray-500 text-sm">
          {formatDate(video.publishedAt)}
        </time>
      </div>
    </motion.a>
  );
};

export default GuideCard;
