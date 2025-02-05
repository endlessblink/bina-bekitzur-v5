import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const model = await prisma.aIModel.findUnique({
    where: { slug: params.slug },
  });

  if (!model) {
    return {
      title: 'מודל לא נמצא - בינה בקיצור',
    };
  }

  return {
    title: `${model.name} - בינה בקיצור`,
    description: model.shortDescription,
  };
}

export default async function ModelPage({ params }: Props) {
  const model = await prisma.aIModel.findUnique({
    where: { slug: params.slug },
    include: {
      categories: true,
      tags: true,
    },
  });

  if (!model) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-8">
          {/* Header */}
          <div className="flex items-start space-x-6 rtl:space-x-reverse">
            {model.logoUrl && (
              <div className="flex-shrink-0">
                <Image
                  src={model.logoUrl}
                  alt={model.name}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
            )}
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
                key={category.id}
                className="inline-flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-sm font-medium text-blue-400"
              >
                {category.name}
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">
                יתרונות
              </h2>
              <ul className="space-y-2">
                {model.advantages.map((advantage, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-300"
                  >
                    <span className="text-green-400 mr-2">✓</span>
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-red-400">
                חסרונות
              </h2>
              <ul className="space-y-2">
                {model.disadvantages.map((disadvantage, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-300"
                  >
                    <span className="text-red-400 mr-2">✗</span>
                    {disadvantage}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">תגיות</h2>
            <div className="flex flex-wrap gap-2">
              {model.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-sm font-medium text-gray-400"
                >
                  {tag.name}
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