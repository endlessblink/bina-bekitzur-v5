'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Newsletter {
  title: string;
  summary: string;
  content: string;
  published_date: string;
  mailerlite_id: string;
}

async function getNewsletters(): Promise<Newsletter[]> {
  try {
    const response = await fetch('/api/newsletter/all');
    
    if (!response.ok) {
      throw new Error('Failed to fetch newsletters');
    }
    
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return [];
  }
}

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewsletters()
      .then(data => {
        setNewsletters(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              ניוזלטר בינה בקיצור
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              עדכונים שבועיים על חידושים בתחום הבינה המלאכותית
            </p>
            <div className="mt-16 p-8 rounded-2xl bg-white/5 backdrop-blur-xl shadow-xl ring-1 ring-white/10">
              <p className="text-gray-400">טוען...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!newsletters || newsletters.length === 0) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              ניוזלטר בינה בקיצור
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              עדכונים שבועיים על חידושים בתחום הבינה המלאכותית
            </p>
            <div className="mt-16 p-8 rounded-2xl bg-white/5 backdrop-blur-xl shadow-xl ring-1 ring-white/10">
              <p className="text-gray-400">אין ניוזלטרים זמינים כרגע. אנא נסו שוב מאוחר יותר.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [latest, ...previous] = newsletters;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            ניוזלטר בינה בקיצור
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            עדכונים שבועיים על חידושים בתחום הבינה המלאכותית
          </p>
        </div>

        {/* Featured Latest Newsletter */}
        {latest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl p-8 shadow-xl ring-1 ring-white/10 mb-16"
          >
            <div className="flex flex-col md:flex-row-reverse gap-8">
              {/* Newsletter Image */}
              <div className="relative w-full md:w-1/3 aspect-[4/3]">
                <Image
                  src="/newsletter-placeholder.svg"
                  alt={latest.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-x-4 text-xs mb-4">
                  <time className="text-gray-400">
                    {new Date(latest.published_date).toLocaleDateString('he-IL')}
                  </time>
                  <span className="relative z-10 rounded-full bg-purple-400/10 px-3 py-1.5 font-medium text-purple-400">
                    גיליון אחרון
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">
                  {latest.title}
                </h2>

                <p className="text-gray-300 mb-6 line-clamp-3">
                  {latest.summary}
                </p>

                <Link
                  href={`/newsletter/${latest.mailerlite_id}`}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                >
                  קרא עוד <span aria-hidden="true">←</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Previous Newsletters Grid */}
        {previous.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">גליונות קודמים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {previous.map((newsletter, index) => (
                <motion.div
                  key={newsletter.mailerlite_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl p-6 shadow-lg ring-1 ring-white/10 group hover:bg-white/10 transition-all duration-200"
                >
                  <div className="relative w-full aspect-[4/3] mb-4">
                    <Image
                      src="/newsletter-placeholder.svg"
                      alt={newsletter.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <time className="text-sm text-gray-400 mb-2 block">
                    {new Date(newsletter.published_date).toLocaleDateString('he-IL')}
                  </time>

                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {newsletter.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {newsletter.summary}
                  </p>

                  <Link
                    href={`/newsletter/${newsletter.mailerlite_id}`}
                    className="text-sm text-purple-400 hover:text-purple-300 group-hover:text-purple-300"
                  >
                    קרא עוד <span aria-hidden="true">←</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 