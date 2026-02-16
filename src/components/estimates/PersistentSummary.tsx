import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

interface PersistentSummaryProps {
  collapsed: boolean;
  onToggle: () => void;
}

function formatMoney(val: string): string {
  if (!val) return '$0.00';
  const cleaned = val.replace(/[$,]/g, '').trim();
  const num = parseFloat(cleaned);
  if (Number.isNaN(num)) return val.startsWith('$') ? val : `$${val}`;
  const formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return num < 0 ? `-$${Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `$${formatted}`;
}

export function PersistentSummary({ collapsed, onToggle }: PersistentSummaryProps) {
  const { designData } = useDesign();
  const offeredPrice = designData.workscopes.estimateTotal;
  const remaining = designData.payment.remaining;
  const totalPaid = designData.payment.totalPaid;
  const isPaidInFull =
    !remaining ||
    remaining === '$0.00' ||
    remaining === '0.00' ||
    String(remaining).replace(/[$,]/g, '') === '0';

  const offeredFormatted = formatMoney(offeredPrice);
  const remainingFormatted = isPaidInFull ? null : formatMoney(remaining);

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1800px] mx-auto px-3">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 py-3 text-left hover:bg-gray-50/50 transition-colors"
          aria-expanded={!collapsed}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold text-[#212529]">General Info</span>
            <span className="text-sm font-bold tabular-nums truncate" style={{ color: 'var(--accent)' }}>
              {offeredFormatted}
            </span>
            {isPaidInFull && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{ backgroundColor: 'var(--bs-success-light)', color: 'var(--bs-success)' }}
              >
                PAID IN FULL
              </span>
            )}
            {!isPaidInFull && remainingFormatted && (
              <span className="text-xs text-gray-500">Remaining {remainingFormatted}</span>
            )}
          </div>
          <span className="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600">
            {collapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4 pt-0 flex flex-col sm:flex-row gap-6">
                <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimate total</span>
                    <span className="font-semibold tabular-nums text-[#212529]">{offeredFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total paid</span>
                    <span className="font-semibold tabular-nums text-[#212529]">{formatMoney(totalPaid)}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-gray-500">Remaining</span>
                    {isPaidInFull ? (
                      <span
                        className="font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: 'var(--bs-success-light)', color: 'var(--bs-success)' }}
                      >
                        PAID IN FULL
                      </span>
                    ) : (
                      <span className="font-semibold tabular-nums" style={{ color: 'var(--bs-success)' }}>
                        {remainingFormatted}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div
                    className="px-4 py-3 rounded-xl border-2 min-w-[160px]"
                    style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent-light)' }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--accent)' }}>
                      Offered Price
                    </p>
                    <p className="text-xl font-bold tabular-nums" style={{ color: 'var(--accent)' }}>
                      {offeredFormatted}
                    </p>
                  </div>
                  <div
                    className="px-4 py-3 rounded-xl border-2 min-w-[160px]"
                    style={{
                      borderColor: 'var(--bs-success-border)',
                      backgroundColor: 'var(--bs-success-light)',
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5 text-[var(--bs-success)]">
                      Remaining
                    </p>
                    <p className="text-lg font-bold">
                      {isPaidInFull ? (
                        <span style={{ color: 'var(--bs-success)' }}>PAID IN FULL</span>
                      ) : (
                        <span className="tabular-nums" style={{ color: 'var(--bs-success)' }}>
                          {remainingFormatted}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
