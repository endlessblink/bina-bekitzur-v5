'use client';

import React from 'react';
import { CheckIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  advantages: string[];
  disadvantages: string[];
}

export default function AdvantagesDisadvantages({ advantages, disadvantages }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-green-400">
          <CheckCircleIcon className="h-5 w-5" />
          יתרונות
        </h3>
        <ul className="space-y-2">
          {advantages.map((advantage, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckIcon className="h-5 w-5 text-green-400 mt-0.5" />
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-red-400">
          <XMarkIcon className="h-5 w-5" />
          חסרונות
        </h3>
        <ul className="space-y-2">
          {disadvantages.map((disadvantage, index) => (
            <li key={index} className="flex items-start gap-2">
              <XMarkIcon className="h-5 w-5 text-red-400 mt-0.5" />
              <span>{disadvantage}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
