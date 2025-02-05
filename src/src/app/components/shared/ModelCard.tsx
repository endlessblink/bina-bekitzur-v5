'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AIModel } from '@/lib/types/models';
import { motion } from 'framer-motion';
import { CloudIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface ModelCardProps {
  model: AIModel;
  showDetails?: boolean;
  onClick?: () => void;
}

interface ModelIconProps extends React.HTMLAttributes<HTMLDivElement> {
  model: AIModel;
}

const Icon = ({ model, className = '', ...props }: ModelIconProps) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkIcon = async () => {
      if (!model.websiteUrl) {
        setError(true);
        return;
      }

      try {
        const response = await fetch(model.logoUrl);
        if (response.ok) {
          setIconUrl(model.logoUrl);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    };

    checkIcon();
  }, [model.websiteUrl, model.logoUrl]);

  if (error || !iconUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`} {...props}>
        <CloudIcon className="w-12 h-12 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} {...props}>
      <Image
        src={iconUrl}
        alt={`${model.name} icon`}
        className="object-contain rounded-lg"
        fill
      />
    </div>
  );
};

const AdvantagesDisadvantages = ({ advantages, disadvantages }: { advantages: string[], disadvantages: string[] }) => {
  return (
    <div className="mt-6 space-y-4">
      <div>
        <h4 className="text-sm font-medium text-white mb-2">יתרונות</h4>
        <ul className="space-y-2">
          {advantages.map((advantage, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-white/80">{advantage}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-medium text-white mb-2">חסרונות</h4>
        <ul className="space-y-2">
          {disadvantages.map((disadvantage, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-white/80">{disadvantage}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ModelCard = ({ model, showDetails = false, onClick }: ModelCardProps) => {
  const content = (
    <motion.div 
      className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl px-6 pb-8 pt-16 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer ${showDetails ? 'h-auto' : 'h-[280px]'} flex flex-col`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 transition-all hover:bg-white/20">
        <Icon model={model} className="w-8 h-8" />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-medium leading-8 tracking-tight text-white">
          {model.name}
        </h3>
        <p className={`mt-2 text-base leading-7 text-white/60 ${showDetails ? '' : 'line-clamp-4'} flex-grow`}>
          {model.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-purple-400/10 px-2.5 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30">
            {model.pricing.type === 'free' ? 'חינם' : 
             model.pricing.type === 'freemium' ? 'Freemium' : 
             'בתשלום'}
          </span>
          {model.categories.slice(0, 2).map((category) => (
            <span 
              key={category}
              className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70"
            >
              {category}
            </span>
          ))}
        </div>

        {showDetails && (
          <>
            {model.advantages && model.disadvantages && (
              <AdvantagesDisadvantages 
                advantages={model.advantages} 
                disadvantages={model.disadvantages} 
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );

  if (onClick) {
    return content;
  }

  return (
    <Link href={`/models/${model.id}`}>
      {content}
    </Link>
  );
};

ModelCard.Icon = Icon;

export default ModelCard;
