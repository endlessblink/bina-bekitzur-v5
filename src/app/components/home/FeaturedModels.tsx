'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const featuredModels = [
  {
    id: 'gpt4',
    name: 'GPT-4',
    description: 'מודל השפה המתקדם ביותר של OpenAI',
    logo: '/models/gpt4.png',
    href: '/models/gpt4',
    Icon: () => <div className="w-8 h-8 text-white/80" />
  },
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    description: 'יצירת תמונות מטקסט בצורה מדויקת',
    logo: '/models/dalle3.png',
    href: '/models/dalle3',
    Icon: () => <div className="w-8 h-8 text-white/80" />
  },
  {
    id: 'stable-video',
    name: 'Stable Video',
    description: 'יצירת סרטוני וידאו מטקסט',
    logo: '/models/stable-video.png',
    href: '/models/stable-video',
    Icon: () => <div className="w-8 h-8 text-white/80" />
  },
  {
    id: 'anthropic-claude',
    name: 'Claude',
    description: 'מודל שפה מתקדם עם יכולות ניתוח מסמכים',
    logo: '/models/claude.png',
    href: '/models/claude',
    Icon: () => <div className="w-8 h-8 text-white/80" />
  }
];

export function FeaturedModels() {
  return (
    <div className="relative">
      <div className="relative py-24 sm:py-32">
        {/* Title section with padding */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">מודלים נבחרים</h2>
            <p className="mt-4 text-lg leading-8 text-white/60">
              הכירו את המודלים המובילים והחדשניים ביותר בתחום הבינה המלאכותית
            </p>
          </div>
        </div>

        {/* Full width carousel */}
        <div className="w-screen relative">
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 animate-slide"
              style={{
                width: 'fit-content',
                animation: 'slide 60s linear infinite'
              }}
            >
              {[...featuredModels, ...featuredModels, ...featuredModels].map((model, index) => (
                <div
                  key={`${model.id}-${index}`}
                  className="w-[300px] flex-none"
                >
                  <Link href={model.href}>
                    <motion.div
                      className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl px-6 pb-8 pt-16 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer h-full"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute top-4 right-4">
                        <model.Icon className="w-8 h-8 text-white/80" />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="mt-8 text-lg font-medium leading-8 tracking-tight text-white">
                          {model.name}
                        </h3>
                        <p className="mt-2 text-base leading-7 text-white/60">
                          {model.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
