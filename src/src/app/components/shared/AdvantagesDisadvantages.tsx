'use client';

import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  advantages: string[];
  disadvantages: string[];
}

export default function AdvantagesDisadvantages({ advantages, disadvantages }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-green-400">יתרונות</h2>
        <ul className="space-y-2">
          {advantages.map((advantage, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300"
            >
              <CheckIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-red-400">חסרונות</h2>
        <ul className="space-y-2">
          {disadvantages.map((disadvantage, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300"
            >
              <XMarkIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
              <span>{disadvantage}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
