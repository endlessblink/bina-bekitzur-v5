'use client';

import React, { useState } from 'react';
import { models } from '@/lib/data/models';
import ModelCard from '@/app/components/shared/ModelCard';

export default function ComparePage() {
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());

  const toggleModel = (modelId: string) => {
    const newSelected = new Set(selectedModels);
    if (newSelected.has(modelId)) {
      newSelected.delete(modelId);
    } else if (newSelected.size < 3) {
      newSelected.add(modelId);
    }
    setSelectedModels(newSelected);
  };

  const selectedModelDetails = Array.from(selectedModels)
    .map(id => models.find(m => m.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900" dir="rtl">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            השוואת מודלים
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/60">
            בחרו עד 3 מודלים להשוואה
          </p>
        </div>

        {/* Selected Models Comparison */}
        {selectedModelDetails.length > 0 && (
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {selectedModelDetails.map(model => model && (
                <div key={model.id} className="relative">
                  <button
                    onClick={() => toggleModel(model.id)}
                    className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    הסר
                  </button>
                  <div className="h-full">
                    <ModelCard model={model} />
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">יתרונות:</h3>
                      <ul className="mt-2 list-disc list-inside text-white/80">
                        {model.advantages.map((advantage, i) => (
                          <li key={i}>{advantage}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">חסרונות:</h3>
                      <ul className="mt-2 list-disc list-inside text-white/80">
                        {model.disadvantages.map((disadvantage, i) => (
                          <li key={i}>{disadvantage}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Models Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">כל המודלים</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {models.map(model => (
              <div
                key={model.id}
                className={`relative ${
                  selectedModels.has(model.id) ? 'ring-2 ring-purple-400 rounded-2xl' : ''
                }`}
              >
                <ModelCard
                  model={model}
                  onClick={() => toggleModel(model.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
