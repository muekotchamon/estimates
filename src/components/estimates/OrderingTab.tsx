import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LinkIcon,
  RefreshCwIcon,
  MinusCircleIcon,
  PlusIcon,
  ChevronDownIcon,
  FileTextIcon,
  PackageIcon,
  WarehouseIcon,
  RadioTowerIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function OrderingTab() {
  const { designData } = useDesign();
  const orderingItems = designData.ordering;
  const orderingProducts = designData.orderingProducts ?? [];
  const layoutVariant = designData.layoutVariant;
  const [activeSource, setActiveSource] = useState<'beacon' | 'warehouse'>('beacon');
  const isCompact = layoutVariant === 'compact';
  const isMinimal = layoutVariant === 'minimal';
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
      {/* Header — Design 2 = left accent, Design 3 = minimal */}
      <div
        className={`bg-white border border-gray-200 ${isMinimal ? 'rounded-lg shadow-sm px-4 py-3' : isCompact ? 'rounded-lg border-l-4 px-4 py-3' : 'rounded-xl px-6 py-4'}`}
        style={isCompact ? { borderLeftColor: 'var(--accent)' } : undefined}
        data-card={isCompact || isMinimal ? true : undefined}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-semibold text-[#212529] flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-gray-400" />
              Ordering
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Color Selection</span>
              <div className="relative">
                <select className="appearance-none px-3 py-1.5 pr-8 text-sm border border-gray-200 rounded-lg bg-white text-[#212529] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]">
                  <option>Not Chosen</option>
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d6efd] transition-colors">
              <PackageIcon className="w-4 h-4" />
              Build
            </button>
            <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d6efd] transition-colors">
              <RefreshCwIcon className="w-4 h-4" />
              Status
            </button>
            <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d6efd] transition-colors">
              <MinusCircleIcon className="w-4 h-4" />
              Clear All
            </button>
            <button className="inline-flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-[#0d6efd] hover:text-[#0b5ed7] transition-colors">
              <PlusIcon className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Products table — อยู่บน Tab Beacon/Warehouse */}
      <div className={`bg-white border border-gray-200 overflow-hidden ${isMinimal ? 'rounded-lg shadow-sm' : 'rounded-xl'}`} data-card={isCompact || isMinimal ? true : undefined} style={isCompact ? { borderLeftWidth: 4, borderLeftColor: 'var(--accent)' } : undefined}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                  #
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  Products
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product Description
                </th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  Quantity
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  Unit
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  Vendor
                </th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  is Ordered
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  Order#
                </th>
              </tr>
            </thead>
            <tbody>
              {orderingProducts.length === 0
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="px-3 py-3" />
                      <td className="px-3 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-3 py-3" />
                      <td className="px-3 py-3" />
                      <td className="px-3 py-3" />
                      <td className="px-3 py-3" />
                      <td className="px-4 py-3" />
                    </tr>
                  ))
                : orderingProducts.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-3 py-3 tabular-nums font-medium text-[#212529]">{row.productNumber}</td>
                      <td className="px-3 py-3 text-gray-600">{row.productLabel}</td>
                      <td className="px-4 py-3 text-gray-700">{row.productDescription}</td>
                      <td className="px-3 py-3 text-right tabular-nums text-gray-600">{row.quantity}</td>
                      <td className="px-3 py-3 text-gray-600">{row.unit}</td>
                      <td className="px-3 py-3 text-gray-600">{row.vendor}</td>
                      <td className="px-3 py-3 text-center tabular-nums text-gray-600">{row.isOrdered || '—'}</td>
                      <td className="px-4 py-3 text-gray-700">{row.orderNumber || '—'}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Source tabs — Beacon / Warehouse */}
      <div className={`grid grid-cols-2 gap-0 border border-gray-200 overflow-hidden ${isMinimal ? 'rounded-lg' : 'rounded-xl'}`}>
        <button
          onClick={() => setActiveSource('beacon')}
          className={`py-4 text-center text-base font-bold transition-colors ${activeSource === 'beacon' ? 'bg-white text-[#212529]' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>

          <div className="flex items-center justify-center gap-2">
            <RadioTowerIcon className="w-5 h-5" />
            Beacon({orderingItems.length})
          </div>
        </button>
        <button
          onClick={() => setActiveSource('warehouse')}
          className={`py-4 text-center text-base font-bold transition-colors border-l border-gray-200 ${activeSource === 'warehouse' ? 'bg-white text-[#212529]' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>

          <div className="flex items-center justify-center gap-2">
            <WarehouseIcon className="w-5 h-5" />
            Warehouse(0)
          </div>
        </button>
      </div>

      {/* Item table (Color selection) */}
      <div className={`bg-white border border-gray-200 overflow-hidden ${isMinimal ? 'rounded-lg shadow-sm' : 'rounded-xl'}`} data-card={isCompact || isMinimal ? true : undefined} style={isCompact ? { borderLeftWidth: 4, borderLeftColor: 'var(--accent)' } : undefined}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                  Color
                </th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                  Unit Price
                </th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  Qty
                </th>
                <th className="text-right px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  Unit
                </th>
              </tr>
            </thead>
            <tbody>
              {orderingItems.length === 0
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="px-6 py-4" />
                      <td className="px-3 py-4" />
                      <td className="px-3 py-4" />
                      <td className="px-3 py-4" />
                      <td className="px-6 py-4" />
                    </tr>
                  ))
                : orderingItems.map((item, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="px-6 py-4 font-medium text-[#212529]">{item.itemName}</td>
                      <td className="px-3 py-4 text-gray-600">{item.color}</td>
                      <td className="px-3 py-4 text-right tabular-nums">${item.unitPrice}</td>
                      <td className="px-3 py-4 text-right tabular-nums">{item.qty}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{item.unit}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF button */}
      <div>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <FileTextIcon className="w-4 h-4 text-red-500" />
          PDF
        </button>
      </div>
    </motion.div>);

}