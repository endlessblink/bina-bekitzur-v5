'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

interface Category {
  id: string;
  name: string;
}

export default function ModelsFilters() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [apiOnly, setApiOnly] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/models/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-lg px-4 py-2 w-full md:w-48"
      >
        <option value="all">הכל</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="חיפוש מודלים..."
          className="w-full bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-lg px-4 py-2"
        />
      </div>

      {/* API Toggle */}
      <div className="flex items-center gap-2">
        <Switch
          checked={apiOnly}
          onChange={setApiOnly}
          className={`${
            apiOnly ? 'bg-blue-600' : 'bg-white/5'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
        >
          <span
            className={`${
              apiOnly ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        <span className="text-sm text-gray-400">רק מודלים עם API</span>
      </div>
    </div>
  );
} 