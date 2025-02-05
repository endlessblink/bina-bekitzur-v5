'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { models } from '@/lib/data/models';
import { 
  ChatBubbleBottomCenterTextIcon,
  CpuChipIcon,
  SparklesIcon,
  PhotoIcon,
  MusicalNoteIcon,
  CommandLineIcon,
  BeakerIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import { 
  OpenAI, 
  Anthropic, 
  Google, 
  Midjourney, 
  StableDiffusion,
  Hugging,
  Mistral
} from '@lobehub/icons';

const modelIcons: { [key: string]: React.ComponentType<any> } = {
  'chatgpt': OpenAI,
  'gpt-4': OpenAI,
  'claude': Anthropic,
  'gemini': Google,
  'mistral': Mistral,
  'llama': Hugging,
  'stable-diffusion': StableDiffusion,
  'dalle': OpenAI,
  'midjourney': Midjourney,
  'musicgen': MusicalNoteIcon,
  'bard': Google,
  'anthropic': Anthropic,
  'huggingface': Hugging
};

interface ModelCardProps {
  model: typeof models[0];
  onClick?: () => void;
  className?: string;
}

interface IconProps {
  model: typeof models[0];
  className?: string;
}

const Icon: React.FC<IconProps> = ({ model, className = '' }) => {
  const IconComponent = modelIcons[model.id];
  const iconUrl = model.websiteUrl ? `https://twenty-icons.com/${new URL(model.websiteUrl).hostname}/64` : null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {IconComponent ? (
        <IconComponent className="w-full h-full text-white" />
      ) : iconUrl ? (
        <img 
          src={iconUrl} 
          alt={`${model.name} logo`}
          className="w-full h-full object-contain p-1"
          loading="lazy"
          onError={() => {}}
        />
      ) : (
        <CloudIcon className="w-full h-full text-white" />
      )}
    </div>
  );
};

const ModelCard: React.FC<ModelCardProps> & { Icon: typeof Icon } = ({ model, onClick, className = '' }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl px-6 pb-8 pt-16 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer h-[280px] flex flex-col ${className}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 transition-all hover:bg-white/20">
        <Icon model={model} className="w-8 h-8" />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-medium leading-8 tracking-tight text-white">
          {model.name}
        </h3>
        <p className="mt-2 text-base leading-7 text-white/60 line-clamp-4 flex-grow">
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
      </div>
    </motion.div>
  );
};

ModelCard.Icon = Icon;

export default ModelCard;
