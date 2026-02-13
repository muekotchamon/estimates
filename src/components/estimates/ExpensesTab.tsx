import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSignIcon,
  RefreshCwIcon,
  PlusCircleIcon,
  UploadIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function ExpensesTab() {
  const { designData } = useDesign();
  const expenses = designData.expenses;
  const layoutVariant = designData.layoutVariant;
  const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.total.replace(/[$,]/g, '') || '0'), 0).toFixed(2);
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
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 ${isMinimal ? 'px-4 py-3' : 'px-6 py-4'}`}>
        <h2 className={`font-semibold text-[#212529] flex items-center gap-2 ${isMinimal ? 'text-sm' : 'text-base'}`}>
          <DollarSignIcon className="w-4 h-4 text-gray-400" />
          Expenses
        </h2>
        <div className="flex items-center gap-2">
          <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d6efd] transition-colors">
            <RefreshCwIcon className="w-4 h-4" />
            Update Expenses
          </button>
          <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d6efd] transition-colors">
            <PlusCircleIcon className="w-4 h-4" />
            New Expense
          </button>
          <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d6efd] transition-colors">
            <UploadIcon className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Vendor Name
              </th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">
                Invoice Date
              </th>
              <th className="text-right px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-6 py-4" />
                    <td className="px-3 py-4" />
                    <td className="px-6 py-4" />
                  </tr>
                ))
              : expenses.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-6 py-4 font-medium text-[#212529]">{row.vendorName}</td>
                    <td className="px-3 py-4 text-gray-600">{row.invoiceDate}</td>
                    <td className="px-6 py-4 text-right font-semibold tabular-nums">{row.total.startsWith('$') ? row.total : `$${row.total}`}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Footer total */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 text-right">
        <p className="text-xs text-gray-400 uppercase tracking-wider">Total</p>
        <p className="text-lg font-bold text-[#212529]">${totalExpenses}</p>
      </div>
    </motion.div>);

}