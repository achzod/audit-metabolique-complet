'use client';

import { ReactNode } from 'react';

interface Props {
  number: number;
  title: string;
  children: ReactNode;
  critical?: boolean;
  description?: string;
}

export default function QuestionCard({ number, title, children, critical, description }: Props) {
  return (
    <div
      className={`
        p-6 rounded-xl border-2 transition-all
        ${critical
          ? 'bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/50'
          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
        }
      `}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
            ${critical
              ? 'bg-red-500 text-white'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
            }
          `}
        >
          {number}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">
            {title}
            {critical && (
              <span className="ml-3 text-sm bg-red-500 text-white px-2 py-1 rounded">
                🚨 CRITIQUE
              </span>
            )}
          </h3>
          {description && (
            <p className="text-gray-400 text-sm mb-4">{description}</p>
          )}
        </div>
      </div>
      <div className="ml-14">
        {children}
      </div>
    </div>
  );
}
