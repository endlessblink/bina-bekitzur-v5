'use client';

import { motion } from 'framer-motion';

const ProjectCardSkeleton = () => {
  return (
    <motion.div
      className="bg-white/5 rounded-lg overflow-hidden"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-white/10" />
      
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <div className="h-6 bg-white/10 rounded mb-2" />
        <div className="w-3/4 h-6 bg-white/10 rounded mb-3" />
        
        {/* Description */}
        <div className="h-4 bg-white/10 rounded mb-1" />
        <div className="w-2/3 h-4 bg-white/10 rounded mb-3" />
        
        {/* Date */}
        <div className="w-24 h-4 bg-white/10 rounded" />
      </div>
    </motion.div>
  );
};

export default ProjectCardSkeleton;
