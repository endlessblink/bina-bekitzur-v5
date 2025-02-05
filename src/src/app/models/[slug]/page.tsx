'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import ModelCard from '@/app/components/shared/ModelCard';
import AdvantagesDisadvantages from '@/app/components/shared/AdvantagesDisadvantages';
import { models } from '@/lib/data/models';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default function ModelPage({ params }: Props) {
  const { slug } = use(params);
  // Find the model from our static data
  const model = models.find(m => m.slug === slug);

  if (!model) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-8">
          {/* Header */}
          <div className="flex items-start space-x-6 rtl:space-x-reverse">
            <div className="flex-shrink-0 w-20 h-20">
              <ModelCard.Icon 
                model={model}
                className="w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold">{model.name}</h1>
              <p className="mt-2 text-xl text-gray-400">
                {model.shortDescription}
              </p>
            </div>
          </div>

          {/* Categories and Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {model.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-sm font-medium text-blue-400"
              >
                {category}
              </span>
            ))}
            {model.hasAPI && (
              <span className="inline-flex items-center rounded-full bg-green-400/10 px-3 py-1 text-sm font-medium text-green-400">
                API
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-8 prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">תיאור</h2>
            <div className="text-gray-300 whitespace-pre-wrap">
              {model.description}
            </div>
          </div>

          {/* Advantages and Disadvantages */}
          <div className="mt-8">
            <AdvantagesDisadvantages 
              advantages={model.advantages}
              disadvantages={model.disadvantages}
            />
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">תגיות</h2>
            <div className="flex flex-wrap gap-2">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-sm font-medium text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing */}
          {model.pricing && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">מחיר</h2>
              <div className="bg-white/5 rounded-lg p-4">
                {model.pricing.type === 'free' && (
                  <span className="text-green-400">חינם</span>
                )}
                {model.pricing.type === 'paid' && (
                  <span className="text-purple-400">
                    החל מ-{model.pricing.startingPrice}
                    {model.pricing.currency}
                  </span>
                )}
                {model.pricing.type === 'freemium' && (
                  <span className="text-blue-400">חינמי + פרימיום</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}