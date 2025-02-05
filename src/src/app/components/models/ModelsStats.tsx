'use client';

import { useEffect, useState } from 'react';

interface CategoryStats {
  name: string;
  count: number;
}

export default function ModelsStats() {
  const [stats, setStats] = useState<CategoryStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/models/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return <div>טוען סטטיסטיקות...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white/5 backdrop-blur-xl p-4 rounded-lg text-center"
        >
          <div className="text-2xl font-bold">{stat.count}</div>
          <div className="text-sm text-gray-400">{stat.name}</div>
        </div>
      ))}
    </div>
  );
} 