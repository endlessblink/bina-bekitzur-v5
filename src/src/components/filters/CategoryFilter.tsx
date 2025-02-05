import { Category } from '@/lib/types/models';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onChange,
}: CategoryFilterProps) {
  const handleCategoryClick = (categorySlug: string) => {
    if (selectedCategories.includes(categorySlug)) {
      onChange(selectedCategories.filter((slug) => slug !== categorySlug));
    } else {
      onChange([...selectedCategories, categorySlug]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">סינון לפי קטגוריה</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={`w-full text-right px-3 py-2 rounded-md transition-colors duration-200
              ${
                selectedCategories.includes(category.slug)
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">{category.name}</span>
              {selectedCategories.includes(category.slug) && (
                <svg
                  className="w-4 h-4 text-blue-800"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 