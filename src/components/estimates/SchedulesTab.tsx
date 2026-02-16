import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, CalendarDaysIcon } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function SchedulesTab() {
  const { designData } = useDesign();
  const layoutVariant = designData.layoutVariant;
  const isCompact = layoutVariant === 'compact';
  const isMinimal = layoutVariant === 'minimal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div
        className={`bg-white border border-gray-200 flex items-center justify-between ${isMinimal ? 'rounded-lg shadow-sm px-4 py-3' : isCompact ? 'rounded-lg border-l-4 px-4 py-3' : 'rounded-xl px-6 py-4'}`}
        style={isCompact ? { borderLeftColor: 'var(--accent)' } : undefined}
        data-card={isCompact || isMinimal ? true : undefined}
      >
        <h2 className={isMinimal ? 'text-sm font-semibold text-[#212529]' : 'text-base font-semibold text-[#212529]'}>
          Plan
        </h2>
        <button
          className={`inline-flex items-center gap-1.5 text-white rounded-lg ${isMinimal ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <PlusIcon className={isMinimal ? 'w-3 h-3' : 'w-4 h-4'} />
          Add schedule
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
          <CalendarDaysIcon className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-sm font-medium text-gray-600 mb-1">Plan / Schedule</p>
          <p className="text-xs text-gray-400">Add schedule items to see them here.</p>
        </div>
      </div>
    </motion.div>
  );
}
