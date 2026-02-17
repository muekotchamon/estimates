import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileTextIcon, ChevronDown } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { StatusPipeline } from './StatusPipeline';

function formatMoney(val: string): string {
  if (!val) return '$0.00';
  const cleaned = val.replace(/[$,]/g, '').trim();
  const num = parseFloat(cleaned);
  if (Number.isNaN(num)) return val.startsWith('$') ? val : `$${val}`;
  const formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return num < 0 ? `-$${Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `$${formatted}`;
}

function parseMoney(val: string): number {
  if (!val) return 0;
  const cleaned = val.replace(/[$,]/g, '').trim();
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? 0 : num;
}

function SummaryPopoverContent({
  offeredFormatted,
  suggestFormatted,
  discountFormatted,
  totalPaidFormatted,
  remainingFormatted,
  isPaidInFull,
}: {
  offeredFormatted: string;
  suggestFormatted: string;
  discountFormatted: string;
  totalPaidFormatted: string;
  remainingFormatted: string;
  isPaidInFull: boolean;
}) {
  return (
    <div className="p-4 bg-white space-y-3 w-full">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Suggest Price</span>
        <span className="font-semibold tabular-nums text-[#212529]">{suggestFormatted}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Discount</span>
        <span className="font-semibold tabular-nums text-gray-500">{discountFormatted}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Sub Total</span>
        <span className="font-semibold tabular-nums text-[#212529]">{offeredFormatted}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Tax (8.38%)</span>
        <span className="font-semibold tabular-nums text-[#212529]">$0.00</span>
      </div>
      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
        <span className="text-sm font-semibold text-[#212529]">Offered Price</span>
        <span className="text-xl font-bold tabular-nums" style={{ color: 'var(--accent)' }}>
          {offeredFormatted}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Total paid</span>
        <span className="font-semibold tabular-nums text-[#212529]">{totalPaidFormatted}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Remaining</span>
        {isPaidInFull ? (
          <span
            className="text-xs font-bold uppercase px-2 py-1 rounded"
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
  );
}

export function PersistentSummary() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popoverOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popoverOpen]);

  const { designData } = useDesign();
  const { estimateTotal } = designData.workscopes;
  const { totalSavings, totalPaid, remaining } = designData.payment;

  const offeredNum = parseMoney(estimateTotal);
  const savingsNum = parseMoney(totalSavings);
  const suggestPriceNum = offeredNum + savingsNum;

  const offeredFormatted = formatMoney(estimateTotal);
  const suggestFormatted = formatMoney(String(suggestPriceNum));
  const discountFormatted = savingsNum > 0 ? `-${formatMoney(totalSavings).replace('-', '')}` : '$0.00';
  const remainingFormatted = formatMoney(remaining);
  const totalPaidFormatted = formatMoney(totalPaid);

  const isPaidInFull =
    !remaining ||
    remaining === '$0.00' ||
    String(remaining).replace(/[$,]/g, '').trim() === '0';

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1800px] mx-auto px-3 py-4">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
          <div className="lg:flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3">
            <StatusPipeline />
          </div>
          <div className="flex flex-col w-full lg:min-w-0" style={{ maxWidth: '360px' }} ref={popoverRef}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setPopoverOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 border-2 rounded-xl border-gray-200 text-left hover:bg-gray-100/80 transition-colors"
                style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent-light)' }}
                aria-expanded={popoverOpen}
                aria-haspopup="true"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileTextIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <span className="text-sm font-semibold text-[#212529]">Summary</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-lg font-bold tabular-nums" style={{ color: 'var(--accent)' }}>
                    {offeredFormatted}
                  </span>
                  <span
                    className={`p-0.5 rounded text-gray-500 transition-transform ${popoverOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {popoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden"
                    style={{ borderColor: 'var(--accent)' }}
                  >
                    <SummaryPopoverContent
                      offeredFormatted={offeredFormatted}
                      suggestFormatted={suggestFormatted}
                      discountFormatted={discountFormatted}
                      totalPaidFormatted={totalPaidFormatted}
                      remainingFormatted={remainingFormatted}
                      isPaidInFull={isPaidInFull}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
