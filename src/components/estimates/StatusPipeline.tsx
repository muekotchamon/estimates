import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, CircleIcon } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

interface StatusPipelineProps {
  compact?: boolean;
}

export function StatusPipeline({ compact }: StatusPipelineProps) {
  const { designData } = useDesign();
  const steps = designData.statusPipeline;
  const currentIndex = steps.findIndex((s) => s.status === 'current');
  const size = compact ? 'w-5 h-5' : 'w-7 h-7';
  const iconSize = compact ? 'w-2.5 h-2.5' : 'w-3 h-3';
  const labelClass = compact ? 'text-[10px]' : 'text-xs';
  return (
    <div className="flex items-center w-full gap-0.5">
      {steps.map((step, i) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';
        return (
          <div key={step.label} className="flex items-center flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className={`flex items-center ${compact ? 'gap-1' : 'gap-2'} flex-1 min-w-0`}
            >
              <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                {isCompleted ? (
                  <div className={`${size} rounded-full flex items-center justify-center`} style={{ backgroundColor: 'var(--bs-success)' }}>
                    <CheckCircleIcon className={compact ? 'w-2.5 h-2.5 text-white' : 'w-4 h-4 text-white'} />
                  </div>
                ) : isCurrent ? (
                  <div className={`${size} rounded-full flex items-center justify-center ${compact ? 'ring-2' : 'ring-4'}`} style={{ backgroundColor: 'var(--accent)', boxShadow: `0 0 0 ${compact ? 2 : 4}px var(--accent-light)` }}>
                    <CircleIcon className={`${iconSize} text-white fill-white`} />
                  </div>
                ) : (
                  <div className={`${size} rounded-full border-2 border-gray-300 bg-white flex items-center justify-center`}>
                    <CircleIcon className={`${iconSize} text-gray-300`} />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className={`${labelClass} font-semibold leading-tight truncate ${isCompleted ? '' : isCurrent ? '' : 'text-gray-400'}`} style={isCompleted ? { color: 'var(--bs-success)' } : isCurrent ? { color: 'var(--accent)' } : undefined}>
                  {step.label}
                </p>
                {!compact && step.date && <p className="text-[10px] text-gray-400 leading-tight">{step.date}</p>}
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-1 h-0.5 min-w-[8px]">
                <div className={`h-full rounded-full ${i < currentIndex ? '' : i === currentIndex ? '' : 'bg-gray-200'}`} style={i < currentIndex ? { backgroundColor: 'var(--bs-success)' } : i === currentIndex ? { backgroundColor: 'var(--accent)' } : undefined} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

}