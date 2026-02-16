import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

const MOCK_SCHEDULES = [
  { id: '1', title: 'Site inspection', date: '15/01/2026', time: '09:00', status: 'confirmed' },
  { id: '2', title: 'Material delivery', date: '28/01/2026', time: '08:00', status: 'scheduled' },
  { id: '3', title: 'Installation start', date: '05/02/2026', time: '07:00', status: 'scheduled' },
  { id: '4', title: 'Final walkthrough', date: '12/02/2026', time: '14:00', status: 'tentative' },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function parseDate(ddmmyyyy: string): { d: number; m: number; y: number } {
  const [d, m, y] = ddmmyyyy.split('/').map(Number);
  return { d, m, y };
}

function getDaysInMonth(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const days: Date[] = [];
  for (let i = 0; i < startPad; i++) {
    days.push(new Date(year, month, 1 - (startPad - i)));
  }
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push(new Date(year, month + 1, i));
  }
  return days;
}

export function SchedulesTab() {
  const { designData } = useDesign();
  const layoutVariant = designData.layoutVariant;
  const isCompact = layoutVariant === 'compact';
  const isMinimal = layoutVariant === 'minimal';

  const [viewDate, setViewDate] = useState(() => new Date(2026, 0, 1));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const eventsByDay = useMemo(() => {
    const map: Record<string, typeof MOCK_SCHEDULES> = {};
    MOCK_SCHEDULES.forEach((ev) => {
      const { d, m, y } = parseDate(ev.date);
      const key = `${y}-${m}-${d}`;
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }, []);

  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);

  const goPrev = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  const goNext = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));

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
          Schedules
        </h2>
        <button
          className={`inline-flex items-center gap-1.5 text-white rounded-lg ${isMinimal ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <PlusIcon className={isMinimal ? 'w-3 h-3' : 'w-4 h-4'} />
          Add schedule
        </button>
      </div>

      <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${isMinimal ? 'rounded-lg shadow-sm' : ''}`} data-card={isCompact || isMinimal ? true : undefined}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button
            type="button"
            onClick={goPrev}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <h3 className="text-base font-semibold text-[#212529]">
            {MONTHS[month]} {year}
          </h3>
          <button
            type="button"
            onClick={goNext}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Next month"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg overflow-hidden">
            {WEEKDAYS.map((day) => (
              <div key={day} className="bg-gray-50 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
            {days.map((date, i) => {
              const isCurrentMonth = date.getMonth() === month;
              const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
              const events = eventsByDay[key] || [];
              const isToday =
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear();

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className={`min-h-[80px] sm:min-h-[96px] p-1.5 bg-white flex flex-col ${!isCurrentMonth ? 'opacity-40' : ''}`}
                >
                  <span
                    className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-medium flex-shrink-0 ${
                      isToday ? 'text-white' : 'text-[#212529]'
                    }`}
                    style={isToday ? { backgroundColor: 'var(--accent)' } : undefined}
                  >
                    {date.getDate()}
                  </span>
                  <div className="mt-1 space-y-0.5 flex-1 min-h-0 overflow-hidden">
                    {events.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[10px] sm:text-xs truncate px-1.5 py-0.5 rounded ${ev.status === 'scheduled' ? 'bg-gray-100 text-gray-700' : ''}`}
                        style={{
                          backgroundColor: ev.status === 'confirmed' ? 'var(--bs-success-light)' : ev.status === 'tentative' ? 'var(--accent-light)' : undefined,
                          color: ev.status === 'confirmed' ? 'var(--bs-success)' : ev.status === 'tentative' ? 'var(--accent)' : undefined,
                        }}
                        title={`${ev.title} ${ev.time}`}
                      >
                        {ev.time} {ev.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-[10px] text-gray-500 px-1">+{events.length - 2} more</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
