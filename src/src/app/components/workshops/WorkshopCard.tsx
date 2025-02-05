'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Workshop } from '@/lib/data/workshops';

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  return (
    <Link href={`/workshops/${workshop.slug}`}>
      <motion.div
        className="bg-white/5 rounded-lg overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Cover Image */}
        <div className="relative aspect-video">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          <img
            src={workshop.coverImage}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 z-20">
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
              {workshop.meetings.length} מפגשים
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-white">{workshop.title}</h3>
          
          {/* Description */}
          <p className="text-gray-400 text-sm mb-4">{workshop.description}</p>

          {/* Preview of first meeting */}
          <div className="text-gray-300">
            <p className="text-sm font-medium mb-2">מפגש ראשון: {workshop.meetings[0].title}</p>
            <ul className="space-y-1">
              {workshop.meetings[0].points.slice(0, 2).map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5">
                    <svg
                      className="w-2 h-2 text-purple-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </span>
                  <span className="text-xs">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default WorkshopCard;
