'use client';

import React from 'react';
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
import ModelCard from '../shared/ModelCard';

interface ModelDetailsProps {
  model: typeof models[0];
  onClose: () => void;
}

function ModelDetails({ model, onClose }: ModelDetailsProps) {
  return (
    <div className="text-white text-right" dir="rtl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
          <div className="w-8 h-8">
            <ModelCard.Icon model={model} />
          </div>
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

const FeaturedModels: React.FC = () => {
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
    pauseOnFocus: true,
    arrows: false,
    rtl: true,
    swipe: false,
    touchMove: false,
    variableWidth: false,
    adaptiveHeight: false,
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
          <div className="overflow-hidden">
            <Slider ref={sliderRef} {...settings}>
              {[...featuredModels, ...featuredModels].map((model, index) => (
                <div key={`${model.id}-${index}`} className="px-3">
                  <ModelCard 
                    model={model} 
                    onClick={() => setSelectedModel(model)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {selectedModel && (
        <Modal
          isOpen={!!selectedModel}
          onClose={() => setSelectedModel(null)}
        >
          <ModelDetails model={selectedModel} onClose={() => setSelectedModel(null)} />
        </Modal>
      )}
    </section>
  );
};

export default FeaturedModels;
