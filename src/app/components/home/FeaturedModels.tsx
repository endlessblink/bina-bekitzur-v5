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
    href: '/models/gpt4'
  },
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    description: 'יצירת תמונות מטקסט בצורה מדויקת',
    logo: '/models/dalle3.png',
    href: '/models/dalle3'
  },
  {
    id: 'stable-video',
    name: 'Stable Video',
    description: 'יצירת סרטוני וידאו מטקסט',
    logo: '/models/stable-video.png',
    href: '/models/stable-video'
  },
  {
    id: 'anthropic-claude',
    name: 'Claude',
    description: 'מודל שפה מתקדם עם יכולות ניתוח מסמכים',
    logo: '/models/claude.png',
    href: '/models/claude'
  }
];

export function FeaturedModels() {
  return (
    <div className="relative bg-black/80">
      <div className="absolute inset-0 bg-gradient-to-t from-deep-purple-950/30 to-transparent" />
      <div className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">מודלים נבחרים</h2>
            <p className="mt-4 text-lg leading-8 text-white/60">
              הכירו את המודלים המובילים והחדשניים ביותר בתחום הבינה המלאכותית
            </p>
          </div>
          
          <motion.div 
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {featuredModels.map((model) => (
              <Link key={model.id} href={model.href}>
                <motion.div
                  className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl px-6 pb-8 pt-16 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute top-4 right-4">
                    {model.logo && (
                      <Image
                        src={model.logo}
                        alt={model.name}
                        width={40}
                        height={40}
                        className="rounded-lg bg-white/10 p-1"
                      />
                    )}
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
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
