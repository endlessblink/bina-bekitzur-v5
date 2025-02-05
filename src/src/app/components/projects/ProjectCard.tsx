'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { YouTubeVideo } from '@/app/api/youtube/projects/route';

interface ProjectCardProps {
  video: YouTubeVideo;
}

const ProjectCard = ({ video }: ProjectCardProps) => {
  const formattedDate = new Date(video.publishedAt).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="bg-white/5 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative group"
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <PlayCircleIcon className="w-16 h-16 text-white" />
          </div>
          {/* Duration */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
            {video.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
            {video.description}
          </p>

          {/* Date */}
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </a>
    </motion.div>
  );
};

export default ProjectCard;
