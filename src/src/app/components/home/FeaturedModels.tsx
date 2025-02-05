'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { models } from '@/lib/data/models';
import Modal from '../shared/Modal';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { 
  AzureIcon, 
  ChatGPTIcon, 
  ClaudeIcon, 
  GeminiIcon, 
  MistralIcon, 
  LlamaIcon 
} from '@lobehub/icons';

const modelIcons: { [key: string]: React.ComponentType<any> } = {
  'chatgpt': ChatGPTIcon,
  'claude': ClaudeIcon,
  'gemini': GeminiIcon,
  'azure': AzureIcon,
  'mistral': MistralIcon,
  'llama': LlamaIcon,
};

interface ModelDetailsProps {
  model: typeof models[0];
  onClose: () => void;
}

function ModelDetails({ model, onClose }: ModelDetailsProps) {
  return (
    <div className="text-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
          {modelIcons[model.icon.toLowerCase()] ? (
            React.createElement(modelIcons[model.icon.toLowerCase()], {
              className: "w-8 h-8",
              style: { color: 'white' }
            })
          ) : (
            <img 
              src={model.logoUrl} 
              alt={`${model.name} logo`}
              className="w-8 h-8 object-contain"
            />
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{model.name}</h3>
          <p className="text-white/60">{model.categories.join(', ')}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-white/80">{model.description}</p>
        
        <div>
          <h4 className="font-medium mb-2">יתרונות:</h4>
          <ul className="list-disc list-inside space-y-1 text-white/80">
            {model.advantages.map((advantage, index) => (
              <li key={index}>{advantage}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">חסרונות:</h4>
          <ul className="list-disc list-inside space-y-1 text-white/80">
            {model.disadvantages.map((disadvantage, index) => (
              <li key={index}>{disadvantage}</li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4">
          <Link 
            href="/models/compare" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            השווה מודלים
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedModels() {
  const sliderRef = useRef<Slider>(null);
  const [selectedModel, setSelectedModel] = useState<typeof models[0] | null>(null);
  
  // Get featured models from data file
  const featuredModels = models.filter(model => model.featured);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    rtl: true,
    swipe: false,
    touchMove: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            מודלים מובילים
          </h2>
          <p className="mt-2 text-lg leading-8 text-white/60">
            הכירו את המודלים המובילים בתחום הבינה המלאכותית
          </p>
        </div>

        {/* Full width carousel */}
        <div className="w-screen relative -mx-[50vw] right-[50%] mt-16">
          <Slider ref={sliderRef} {...settings}>
            {[...featuredModels, ...featuredModels].map((model, index) => (
              <div key={`${model.id}-${index}`} className="px-3">
                <motion.div
                  onClick={() => setSelectedModel(model)}
                  className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl px-6 pb-8 pt-16 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer h-[280px] flex flex-col"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 transition-all hover:bg-white/20">
                    {modelIcons[model.icon.toLowerCase()] ? (
                      React.createElement(modelIcons[model.icon.toLowerCase()], {
                        className: "w-5 h-5",
                        style: { color: 'white' }
                      })
                    ) : (
                      <img 
                        src={model.logoUrl} 
                        alt={`${model.name} logo`}
                        className="w-5 h-5 object-contain"
                        loading="lazy"
                      />
                    )}
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
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Modal
        isOpen={!!selectedModel}
        onClose={() => setSelectedModel(null)}
        title={selectedModel?.name}
      >
        {selectedModel && (
          <ModelDetails
            model={selectedModel}
            onClose={() => setSelectedModel(null)}
          />
        )}
      </Modal>
    </section>
  );
}
