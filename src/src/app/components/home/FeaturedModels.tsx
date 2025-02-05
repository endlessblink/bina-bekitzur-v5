'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface FeaturedModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
}

const featuredModels: FeaturedModel[] = [
  {
    id: 'gpt4',
    name: 'GPT-4',
    description: 'מודל השפה המתקדם ביותר של OpenAI',
    icon: 'lni lni-brain',
    href: '/models/gpt4',
  },
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    description: 'יצירת תמונות מטקסט בצורה מדויקת',
    icon: 'lni lni-image',
    href: '/models/dalle3',
  },
  {
    id: 'claude2',
    name: 'Claude 2',
    description: 'מודל השפה המתקדם של Anthropic',
    icon: 'lni lni-robot',
    href: '/models/claude2',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'יצירת אמנות דיגיטלית מטקסט',
    icon: 'lni lni-paint-bucket',
    href: '/models/midjourney',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'מודל קוד פתוח ליצירת תמונות',
    icon: 'lni lni-pencil-alt',
    href: '/models/stable-diffusion',
  },
  {
    id: 'palm2',
    name: 'PaLM 2',
    description: 'מודל השפה המתקדם של Google',
    icon: 'lni lni-google',
    href: '/models/palm2',
  },
];

export default function FeaturedModels() {
  const sliderRef = useRef<Slider>(null);

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
                <Link href={model.href}>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl px-6 pb-8 pt-16 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer h-full"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 transition-all hover:bg-white/20">
                      <i className={`${model.icon} text-xl text-white`}></i>
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
          </Slider>
        </div>
      </div>
    </section>
  );
}
