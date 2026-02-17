import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileTextIcon, ChevronDown, ChevronUp } from 'lucide-react';
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

export function PersistentSummary() {
  const [detailExpanded, setDetailExpanded] = useState(false);
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
          <div className="flex flex-col w-full lg:min-w-0" style={{ maxWidth: '360px' }}>
            {/* Summary แสดงตลอด — กดเพื่อขยาย/ย่อรายละเอียดแบบใบเสนอราคา */}
            <button
              type="button"
              onClick={() => setDetailExpanded((e) => !e)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 border-2 bg-gray-50 border-gray-200 text-left hover:bg-gray-100/80 transition-colors ${detailExpanded ? 'rounded-t-xl border-b-0' : 'rounded-xl'}`}
              style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent-light)' }}
              aria-expanded={detailExpanded}
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileTextIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-semibold text-[#212529]">Summary</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-lg font-bold tabular-nums" style={{ color: 'var(--accent)' }}>
                  {offeredFormatted}
                </span>
                <span className="p-0.5 rounded text-gray-500" aria-hidden>
                  {detailExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {detailExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden rounded-b-xl border-2 border-t-0 border-gray-200"
                  style={{ borderColor: 'var(--accent)' }}
                >
                  <div className="p-4 bg-white space-y-3 border-t border-gray-100">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
