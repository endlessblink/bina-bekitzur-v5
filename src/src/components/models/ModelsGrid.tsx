import { AIModel } from '@/lib/types/models';
import Link from 'next/link';

interface ModelsGridProps {
  models: AIModel[];
}

export function ModelsGrid({ models }: ModelsGridProps) {
  if (models.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">לא נמצאו מודלים מתאימים</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {models.map((model) => (
        <Link
          key={model.id}
          href={`/models/${model.slug}`}
          className="block group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{model.description}</p>
              
              {/* Pricing Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                  ${model.pricing.type === 'free' ? 'bg-green-100 text-green-800' :
                    model.pricing.type === 'paid' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'}`}
                >
                  {model.pricing.type === 'free' ? 'חינמי' :
                   model.pricing.type === 'paid' ? 'בתשלום' : 'פרימיום'}
                </span>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {model.categories.slice(0, 3).map((category) => (
                  <span
                    key={category}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                  >
                    {category}
                  </span>
                ))}
                {model.categories.length > 3 && (
                  <span className="text-gray-500 text-sm">+{model.categories.length - 3}</span>
                )}
              </div>

              {/* Advantages/Disadvantages Preview */}
              <div className="space-y-2">
                {model.advantages.length > 0 && (
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-600 line-clamp-1">{model.advantages[0]}</p>
                  </div>
                )}
                {model.disadvantages.length > 0 && (
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <p className="text-gray-600 line-clamp-1">{model.disadvantages[0]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 