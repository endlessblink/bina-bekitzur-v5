import { motion } from 'framer-motion';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const LoadingAnimation = ({ size = 'md', className = '' }: Props) => {
  const sizeClass = sizes[size];
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClass} relative`}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Outer Circle */}
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/30" />
        
        {/* Animated Arc */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500" />
        </div>
        
        {/* Inner Gradient */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-900/50 to-purple-600/50 backdrop-blur-sm" />
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
