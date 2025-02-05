'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import Card from './Card';

interface ModelCardProps {
  model: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    logoUrl?: string;
    websiteUrl?: string;
    pricing?: {
      type: 'free' | 'paid' | 'freemium';
      startingPrice?: number;
      currency?: string;
    };
  };
}

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Card isHoverable className="flex flex-col">
      <div className="flex items-start space-x-4 rtl:space-x-reverse p-6">
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
          <h3 className="text-lg font-semibold text-gray-900">
            <Link href={`/ai-tools/${model.slug}`} className="hover:underline">
              {model.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{model.shortDescription}</p>
        </div>
      </div>
      
      <div className="mt-auto border-t border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {model.pricing && (
              <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
                {model.pricing.type === 'free' && (
                  <span className="text-green-700 bg-green-50 px-2 py-1 rounded-full">חינם</span>
                )}
                {model.pricing.type === 'paid' && (
                  <span className="text-purple-700 bg-purple-50 px-2 py-1 rounded-full">
                    החל מ-{model.pricing.startingPrice}
                    {model.pricing.currency}
                  </span>
                )}
                {model.pricing.type === 'freemium' && (
                  <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded-full">חינמי + פרימיום</span>
                )}
              </span>
            )}
          </div>
          {model.websiteUrl && (
            <Button variant="outline" size="sm" className="ml-auto rtl:mr-auto">
              <Link href={model.websiteUrl} target="_blank" rel="noopener noreferrer">
                בקר באתר
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
