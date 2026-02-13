import React from 'react';
import { motion } from 'framer-motion';
import { PercentIcon, RefreshCwIcon, PlusCircleIcon } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function CommissionTab() {
  const { designData } = useDesign();
  const commissionRows = designData.commission;
  const layoutVariant = designData.layoutVariant;
  const isCompact = layoutVariant === 'compact';
  const isMinimal = layoutVariant === 'minimal';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white border border-gray-200 overflow-hidden ${isMinimal ? 'rounded-lg shadow-sm' : isCompact ? 'rounded-lg border-l-4' : 'rounded-xl'}`}
      style={isCompact ? { borderLeftColor: 'var(--accent)' } : undefined}
      data-card={isCompact || isMinimal ? true : undefined}
    >
      {/* Header */}
      <div className={`flex items-center justify-between border-b border-gray-100 ${isMinimal ? 'px-4 py-3' : 'px-6 py-4'}`}>
        <h2 className={`font-semibold text-[#212529] flex items-center gap-2 ${isMinimal ? 'text-sm' : 'text-base'}`}>
          <PercentIcon className="w-4 h-4 text-gray-400" />
          Commission
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-400 hover:text-[#0d6efd] rounded-md hover:bg-blue-50 transition-colors"
            aria-label="Refresh commissions">

            <RefreshCwIcon className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-[#0d6efd] rounded-md hover:bg-blue-50 transition-colors"
            aria-label="Add commission">

            <PlusCircleIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                Pay
              </th>
              <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                Adjust
              </th>
              <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                Net
              </th>
              <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                Paid
              </th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                Paid Date
              </th>
              <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                Remaining
              </th>
              <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {commissionRows.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-6 py-5" />
                    <td className="px-3 py-5" />
                    <td className="px-3 py-5" />
                    <td className="px-3 py-5" />
                    <td className="px-3 py-5" />
                    <td className="px-3 py-5" />
                    <td className="px-3 py-5" />
                    <td className="px-6 py-5" />
                  </tr>
                ))
              : commissionRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-6 py-5 font-medium text-[#212529]">{row.name}</td>
                    <td className="px-3 py-5 text-right tabular-nums">${row.pay}</td>
                    <td className="px-3 py-5 text-right tabular-nums">${row.adjust}</td>
                    <td className="px-3 py-5 text-right font-semibold tabular-nums">${row.net}</td>
                    <td className="px-3 py-5 text-right tabular-nums">${row.paid}</td>
                    <td className="px-3 py-5 text-gray-600">{row.paidDate}</td>
                    <td className="px-3 py-5 text-right tabular-nums">${row.remaining}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${row.status === 'Paid' ? '' : 'bg-amber-50 text-amber-600'}`} style={row.status === 'Paid' ? { backgroundColor: 'var(--bs-success-light)', color: 'var(--bs-success)' } : undefined}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </motion.div>);

}