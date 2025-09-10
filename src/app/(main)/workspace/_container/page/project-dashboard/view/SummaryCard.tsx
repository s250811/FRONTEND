'use client';

import { useCallback } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';

interface SummaryCardProps {
  id: string;
  name: string;
  points: number;
  percent: number;
  tone: 'green' | 'gray';
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

export function SummaryCard({
  id,
  name,
  points,
  percent,
  tone,
  isOpen,
  onToggle,
  children,
}: SummaryCardProps) {
  const handleClickOutside = useCallback(() => {
    if (isOpen) {
      onToggle(id);
    }
  }, [id, isOpen, onToggle]);

  const ref = useClickOutside<HTMLDivElement>(isOpen, handleClickOutside);

  return (
    <div className={statCard({ tone })}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-600">{name}</p>
          <div className="flex items-end gap-2">
            <div className={kpi()}>{points}</div>
            <span className="text-xs text-gray-400">{percent}%</span>
          </div>
        </div>
        <div className="relative" ref={ref}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Define the styles used in this component
const statCard = (props: { tone: 'green' | 'gray' }) =>
  `rounded-xl p-4 ${
    props.tone === 'green' ? 'bg-emerald-50' : 'bg-gray-50'
  }`;

const kpi = () =>
  'text-xl font-bold text-gray-900';
