import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2Icon,
  CircleDotIcon,
  CircleIcon,
  ClockIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function ProgressTimeline() {
  const { designData } = useDesign();
  const events = designData.progressTimeline;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.35,
        delay: 0.2
      }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      data-card>

      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#212529] flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-gray-400" />
          Progress
        </h3>
        <button className="text-xs font-medium transition-colors hover:opacity-90" style={{ color: 'var(--accent)' }}>
          Edit
        </button>
      </div>
      <div className="p-5">
        <ol className="relative" aria-label="Estimate progress timeline">
          {events.map((event, i) => {
            const isLast = i === events.length - 1;
            const isCompleted = event.status === 'completed';
            const isCurrent = event.status === 'current';
            return (
              <motion.li
                key={event.label}
                initial={{
                  opacity: 0,
                  x: -8
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.25 + i * 0.04,
                  duration: 0.25
                }}
                className={`flex gap-3 ${!isLast ? 'pb-4' : ''}`}>

                {/* Icon + connector */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {isCompleted ?
                  <CheckCircle2Icon className="w-5 h-5" style={{ color: 'var(--bs-success)' }} /> :
                  isCurrent ?
                  <CircleDotIcon className="w-5 h-5" style={{ color: 'var(--accent)' }} /> :

                  <CircleIcon className="w-5 h-5 text-gray-300" />
                  }
                  {!isLast &&
                  <div
                    className={`w-px flex-1 mt-1 ${isCompleted ? '' : isCurrent ? '' : 'bg-gray-200'}`}
                    style={isCompleted ? { backgroundColor: 'var(--bs-success)' } : isCurrent ? { backgroundColor: 'var(--accent)' } : undefined}
                  />

                  }
                </div>

                {/* Content */}
                <div className={`min-w-0 ${!isLast ? 'pb-1' : ''}`}>
                  <p
                    className={`text-sm font-medium leading-tight ${isCompleted ? '' : isCurrent ? '' : 'text-gray-400'}`}
                    style={isCompleted ? { color: 'var(--bs-success)' } : isCurrent ? { color: 'var(--accent)' } : undefined}
                  >
                    {event.label}
                  </p>
                  {event.date ?
                  <p className="text-xs text-gray-400 mt-0.5">{event.date}</p> :

                  <p className="text-xs text-gray-300 mt-0.5 italic">
                      No activity
                    </p>
                  }
                </div>
              </motion.li>);

          })}
        </ol>
      </div>
    </motion.div>);

}