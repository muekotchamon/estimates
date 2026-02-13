import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileTextIcon,
  PackageIcon,
  UploadIcon,
  PlusIcon,
  XIcon,
  ChevronDownIcon,
  FileIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function SubcontractorTab() {
  const { designData } = useDesign();
  const sub = designData.subcontractor;
  const layoutVariant = designData.layoutVariant;
  const [activeScr, setActiveScr] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'submit' | 'paid' | null>(null);
  const scrTabs = ['SCR1', 'SCR2', 'SCR3'];
  const isCompact = layoutVariant === 'compact';
  const isMinimal = layoutVariant === 'minimal';
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
      {/* Header */}
      <div
        className={`bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${isMinimal ? 'rounded-lg shadow-sm px-4 py-3' : isCompact ? 'rounded-lg border-l-4 px-4 py-3' : 'rounded-xl px-6 py-4'}`}
        style={isCompact ? { borderLeftColor: 'var(--accent)' } : undefined}
        data-card={isCompact || isMinimal ? true : undefined}
      >
        <h2 className={`font-semibold text-[#212529] flex items-center gap-2 ${isMinimal ? 'text-sm' : 'text-base'}`}>
          <FileTextIcon className="w-4 h-4 text-gray-400" />
          Subcontractor Compensation Report
        </h2>
        <div className="flex items-center gap-2">
          <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d6efd] transition-colors">
            <PackageIcon className="w-4 h-4" />
            Build
          </button>
          <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d6efd] transition-colors">
            <UploadIcon className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* SCR Tabs */}
      <div className={`grid grid-cols-3 gap-0 border border-gray-200 overflow-hidden ${isMinimal ? 'rounded-lg' : 'rounded-xl'}`}>
        {scrTabs.map((tab, i) =>
        <button
          key={tab}
          onClick={() => setActiveScr(i)}
          className={`py-3 text-center text-sm font-bold transition-colors ${i > 0 ? 'border-l border-gray-200' : ''} ${activeScr === i ? 'bg-white text-[#212529]' : 'bg-gray-100 text-gray-400 hover:bg-gray-50'}`}>

            {tab}
          </button>
        )}
      </div>

      {/* Crew selector + table */}
      <div className={`bg-white border border-gray-200 overflow-hidden ${isMinimal ? 'rounded-lg shadow-sm' : 'rounded-xl'}`} data-card={isCompact || isMinimal ? true : undefined} style={isCompact ? { borderLeftWidth: 4, borderLeftColor: 'var(--accent)' } : undefined}>
        {/* Crew selector */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="relative">
              <select className="appearance-none px-3 py-2 pr-8 text-sm border border-gray-200 rounded-lg bg-white text-[#212529] w-56 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]">
                <option>{sub.crewName}</option>
              </select>
              <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Clear selection">

              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-[#0d6efd] border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <PlusIcon className="w-4 h-4" />
            Add Work
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                  Service
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                  Install/QTY
                </th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  QTY
                </th>
                <th className="text-right px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                  Install Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {sub.rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="px-6 py-4 font-medium text-[#212529]">{row.service}</td>
                  <td className="px-3 py-4 text-gray-600">{row.description}</td>
                  <td className="px-3 py-4 text-right tabular-nums">{row.installQty}</td>
                  <td className="px-3 py-4 text-right tabular-nums">{row.qty}</td>
                  <td className="px-6 py-4 text-right font-semibold tabular-nums">${row.installCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom section: Documents + Cost summary */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Documents */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1">
          <div className="px-5 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500">Documents</h3>
          </div>
          <div className="p-5 space-y-3">
            <a
              href="#"
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0d6efd] transition-colors group">

              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                <FileIcon className="w-4 h-4 text-gray-400 group-hover:text-[#0d6efd]" />
              </div>
              Subcontractor Compensation Agreement
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0d6efd] transition-colors group">

              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                <FileIcon className="w-4 h-4 text-gray-400 group-hover:text-[#0d6efd]" />
              </div>
              WAIVER AND RELEASE OF LIEN UPON FINAL PAYMENT
            </a>
          </div>
        </div>

        {/* Cost summary */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full lg:w-80">
          <div className="p-5 space-y-4">
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Installation Cost
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-500">Total Cost</p>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Based On Contract
                </p>
                <p className="text-xl font-bold text-[#212529]">${sub.totalCost}</p>
              </div>
            </div>

            {/* Payment status */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment-status"
                  checked={paymentStatus === 'submit'}
                  onChange={() => setPaymentStatus('submit')}
                  className="w-4 h-4 text-[#0d6efd] border-gray-300 focus:ring-[#0d6efd]" />

                <span className="text-sm text-gray-600">Submit</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment-status"
                  checked={paymentStatus === 'paid'}
                  onChange={() => setPaymentStatus('paid')}
                  className="w-4 h-4 text-[#0d6efd] border-gray-300 focus:ring-[#0d6efd]" />

                <span className="text-sm text-gray-600">Paid</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>);

}