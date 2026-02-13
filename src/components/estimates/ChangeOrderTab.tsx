import React from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCwIcon,
  PlusIcon,
  ChevronUpIcon,
  InboxIcon,
  CalendarIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function ChangeOrderTab() {
  const { designData } = useDesign();
  const changeOrders = designData.changeOrders;
  const layoutVariant = designData.layoutVariant;
  const totalAmount = changeOrders.reduce((sum, co) => sum + parseFloat(co.amount.replace(/[$,]/g, '') || '0'), 0).toFixed(2);

  const emptyState = (
    <div className="px-6 py-12 text-center border-t border-gray-100">
      <InboxIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <p className="text-sm text-gray-400">No change orders. Click the "Add" to create a new change order.</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
      {/* Design 1: table */}
      {layoutVariant === 'default' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-base font-semibold text-[#212529] flex items-center gap-2">
              <RefreshCwIcon className="w-4 h-4 text-gray-400" />
              Change Order
            </h2>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-[#0d6efd] rounded-lg hover:bg-[#0b5ed7] transition-colors">
                <PlusIcon className="w-4 h-4" /> Add
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" aria-label="Collapse section"><ChevronUpIcon className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Date</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">Order</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Type</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Desc.</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Status</th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Amount</th>
                  <th className="text-right px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {changeOrders.map((co, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-6 py-3 text-sm text-[#212529]">{co.date}</td>
                    <td className="px-3 py-3 text-sm font-medium text-[#212529]">{co.order}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{co.type}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{co.desc}</td>
                    <td className="px-3 py-3"><span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--bs-success-light)', color: 'var(--bs-success)' }}>{co.status}</span></td>
                    <td className="px-3 py-3 text-right font-semibold text-[#212529] tabular-nums">{co.amount}</td>
                    <td className="px-6 py-3 text-right text-gray-400"><button className="text-[#0d6efd] hover:underline text-xs">Edit</button></td>
                  </tr>
                ))}
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <td className="px-6 py-3"><span className="flex items-center gap-1.5 text-xs font-semibold text-[#212529]"><CalendarIcon className="w-3.5 h-3.5 text-[#0d6efd]" /> Total</span></td>
                  <td className="px-3 py-3" colSpan={4} />
                  <td className="px-3 py-3 text-right font-semibold text-[#212529] tabular-nums">${totalAmount}</td>
                  <td className="px-6 py-3" />
                </tr>
              </tbody>
            </table>
          </div>
          {changeOrders.length === 0 && emptyState}
        </div>
      )}

      {/* Design 2 (compact): card per change order */}
      {layoutVariant === 'compact' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#212529] flex items-center gap-2"><RefreshCwIcon className="w-4 h-4 text-gray-400" /> Change Order</h2>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-full" style={{ backgroundColor: 'var(--accent)' }}><PlusIcon className="w-3 h-3" /> Add</button>
          </div>
          {changeOrders.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 border-l-4 px-4 py-8 text-center" style={{ borderLeftColor: 'var(--accent)' }} data-card>
              <InboxIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400">No change orders. Click Add to create one.</p>
            </div>
          ) : (
            <>
              {changeOrders.map((co, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden border-l-4 pl-4 py-4" style={{ borderLeftColor: 'var(--accent)' }} data-card>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[#212529]">{co.order}</span>
                      <span className="text-xs text-gray-500">{co.date}</span>
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: 'var(--bs-success-light)', color: 'var(--bs-success)' }}>{co.status}</span>
                    </div>
                    <span className="text-sm font-bold text-[#212529] tabular-nums">{co.amount}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{co.type} — {co.desc}</p>
                  <button className="text-xs mt-2" style={{ color: 'var(--accent)' }}>Edit</button>
                </div>
              ))}
              <div className="bg-gray-50 rounded-lg px-4 py-2 flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span className="tabular-nums">${totalAmount}</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Design 3 (minimal): compact table */}
      {layoutVariant === 'minimal' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden" data-card>
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#212529]">Change Order</h2>
            <button className="text-xs font-medium px-2 py-1 rounded" style={{ color: 'var(--accent)' }}>+ Add</button>
          </div>
          {changeOrders.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-gray-400">No change orders.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-3 py-2 font-semibold text-gray-500">Date</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-500">Order</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-500">Type</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {changeOrders.map((co, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="px-3 py-2 text-[#212529]">{co.date}</td>
                      <td className="px-3 py-2 font-medium text-[#212529]">{co.order}</td>
                      <td className="px-3 py-2 text-gray-600">{co.type}</td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums">{co.amount}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50/50">
                    <td className="px-3 py-2 font-semibold" colSpan={3}>Total</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">${totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );

}