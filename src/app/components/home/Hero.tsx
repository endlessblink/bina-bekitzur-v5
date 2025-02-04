'use client';

import { motion } from 'framer-motion';
import { 
  BookOpenIcon, 
  MagnifyingGlassIcon, 
  MicrophoneIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const features = [
  {
    name: 'מדריכים',
    description: 'תוכן מקצועי להעשרת הידע',
    href: '/guides',
    icon: BookOpenIcon,
  },
  {
    name: 'השוואת כלים',
    description: 'סקירה והשוואה של כלי AI מובילים',
    href: '/models',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'פודקאסט חופרים בינה',
    description: 'שיחות מעמיקות עם מומחים בתחום',
    href: '/podcast',
    icon: MicrophoneIcon,
  },
  {
    name: 'ניוזלטר בינה בקיצור',
    description: 'עדכונים שבועיים על חידושים בתחום',
    href: '/newsletter',
    icon: EnvelopeIcon,
  },
];

export function Hero() {
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              בינה בקיצור
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/70">
              פלטפורמה מודרנית להצגת יישומי AI וכלים חדשניים בתחום הבינה המלאכותית
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-6 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.name} href={feature.href}>
                <motion.div
                  className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors rounded-xl p-6 h-full cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <dt>
                    <feature.icon className="absolute right-6 top-6 h-6 w-6 text-white/80" aria-hidden="true" />
                    <h3 className="pr-9 text-lg font-medium text-white">{feature.name}</h3>
                  </dt>
                  <dd className="mt-2 text-base text-white/60">{feature.description}</dd>
                </motion.div>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
