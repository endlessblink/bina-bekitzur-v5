'use client';

import { motion } from 'framer-motion';
import WorkshopCard from '@/app/components/workshops/WorkshopCard';
import { workshops } from '@/lib/data/workshops';

export default function WorkshopsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">קורס בינה קולנועית</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            קורס יצירת סרטים מקצועי למתקדמים חולמים על בינה מלאכותית
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
