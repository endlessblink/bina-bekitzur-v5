'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { workshops } from '@/lib/data/workshops';

export default function WorkshopPage() {
  const { slug } = useParams();
  const workshop = workshops.find((w) => w.slug === slug);

  if (!workshop) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-white">הסדנה לא נמצאה</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="relative aspect-[2/1] mb-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <img
            src={workshop.coverImage}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 right-8 z-20 max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">{workshop.title}</h1>
            <p className="text-xl text-gray-300">{workshop.description}</p>
          </div>
        </div>

        {/* Meetings */}
        <div className="space-y-8">
          {workshop.meetings.map((meeting, index) => (
            <motion.div
              key={meeting.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{meeting.title}</h2>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  מפגש {meeting.number}
                </span>
              </div>

              <ul className="space-y-3">
                {meeting.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1.5">
                      <svg
                        className="w-3 h-3 text-purple-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
