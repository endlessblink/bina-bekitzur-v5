'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AIModel {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  logoUrl?: string;
  categories: { name: string }[];
  tags: { name: string }[];
  hasAPI: boolean;
}

export default function ModelsComparison() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch('/api/models');
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchModels();
  }, []);

  if (isLoading) {
    return <div>טוען מודלים...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <Link
          key={model.id}
          href={`/models/${model.slug}`}
          className="block group"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6 h-full hover:bg-white/10 transition-all">
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              {model.logoUrl && (
                <div className="flex-shrink-0">
                  <Image
                    src={model.logoUrl}
                    alt={model.name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {model.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {model.shortDescription}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {model.categories.map((category) => (
                <span
                  key={category.name}
                  className="inline-flex items-center rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400"
                >
                  {category.name}
                </span>
              ))}
              {model.hasAPI && (
                <span className="inline-flex items-center rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400">
                  API
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {model.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="inline-flex items-center rounded-full bg-white/5 px-2 py-1 text-xs font-medium text-gray-400"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 