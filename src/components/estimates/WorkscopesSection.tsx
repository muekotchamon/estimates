import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PencilIcon,
  Trash2Icon,
  ChevronDownIcon,
  PlusIcon,
  FileIcon,
  LayoutTemplateIcon,
  GripVerticalIcon,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

type MeasureSubTab = 'roofing' | 'flat-roof' | 'roof-cleaning';

const measureTabs: { id: MeasureSubTab; label: string }[] = [
  { id: 'roofing', label: 'Roofing' },
  { id: 'flat-roof', label: 'Flat Roof' },
  { id: 'roof-cleaning', label: 'Roof Cleaning' },
];

export function WorkscopesSection() {
  const { designData } = useDesign();
  const { measurementData, lineItems, estimateTotal, workscopeLabel } = designData.workscopes;
  const [measureTab, setMeasureTab] = useState<MeasureSubTab>('roofing');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(
    new Set(lineItems.map((i) => i.sort))
  );
  const toggleRow = (sort: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(sort)) {
        next.delete(sort);
      } else {
        next.add(sort);
      }
      return next;
    });
  };

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
        delay: 0.25
      }}
      className="space-y-4">

      {/* ส่วน Measurement — แท็บ Roofing / Flat Roof / Roof Cleaning + กริดตัวเลข (อยู่หน้า Work scope เหมือนเดิม) */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm" data-card>
        <div className="px-4 pt-2 border-b border-gray-100">
          <div className="flex gap-0">
            {measureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMeasureTab(tab.id)}
                className={`relative px-4 py-2 text-xs font-medium transition-colors border-b-2 ${measureTab === tab.id ? '' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                style={measureTab === tab.id ? { color: 'var(--accent)', borderColor: 'var(--accent)' } : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(measurementData[measureTab] ?? measurementData.roofing).map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">{m.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-[#212529]">{m.value}</span>
                  <span className="text-xs text-gray-400">{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work scope table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm" data-card>
        <div className="px-4 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[#212529]">
              Work scope
              <span className="text-gray-400 font-normal ml-1.5">
                ({workscopeLabel})
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border" style={{ color: 'var(--bs-success)', backgroundColor: 'var(--bs-success-light)', borderColor: 'var(--bs-success-border)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--bs-success)' }} />
              Contract
            </span>
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors">
              <LayoutTemplateIcon className="w-3 h-3" />
              Templates
            </button>
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-white rounded-md transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
              <PlusIcon className="w-3 h-3" />
              Add
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">
                  <span className="inline-flex items-center gap-1">
                    <GripVerticalIcon className="w-3.5 h-3.5 text-gray-400" aria-hidden />
                    Sort
                  </span>
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  <span className="inline-flex items-center gap-1">
                    <GripVerticalIcon className="w-3.5 h-3.5 text-gray-400" aria-hidden />
                    Type
                  </span>
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  QTY Cost
                </th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  QTY
                </th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  Total
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  Order
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  Unit Name
                </th>
                <th className="text-right px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item) => {
                const isExpanded = expandedRows.has(item.sort);
                return (
                  <motion.tr
                    key={item.sort}
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1
                    }}
                    className="group border-b border-gray-50 last:border-b-0">

                    <td colSpan={9} className="p-0">
                      <div>
                        {/* Main row */}
                        <div
                          className="flex items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                          onClick={() => toggleRow(item.sort)}>

                          <div className="px-3 py-3 w-12 flex items-center gap-0.5 text-gray-500 font-mono text-xs">
                            <GripVerticalIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" aria-hidden />
                            {item.sort}
                          </div>
                          <div className="px-3 py-3 w-24">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${item.type === 'Services' ? '' : item.type === 'Materials' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'}`}
                              style={item.type === 'Services' ? { backgroundColor: 'var(--accent-light)', color: 'var(--accent)' } : undefined}
                            >
                              <GripVerticalIcon className="w-3 h-3 text-current opacity-60" aria-hidden />
                              {item.type}
                            </span>
                          </div>
                          <div className="px-3 py-3 flex-1 font-medium text-[#212529] min-w-0 truncate">
                            {item.product}
                          </div>
                          <div className="px-3 py-3 w-24 text-right text-gray-600 tabular-nums">
                            {item.qtyCost}
                          </div>
                          <div className="px-3 py-3 w-20 text-right">
                            <span
                              className={`tabular-nums ${parseInt(item.qty.replace(',', '')) > 1 ? 'font-medium' : 'text-gray-600'}`}
                              style={parseInt(item.qty.replace(',', '')) > 1 ? { color: 'var(--accent)' } : undefined}
                            >
                              {item.qty}
                            </span>
                          </div>
                          <div className="px-3 py-3 w-24 text-right font-semibold text-[#212529] tabular-nums">
                            {item.total}
                          </div>
                          <div className="px-3 py-3 w-20 text-gray-600 text-sm">
                            {item.order}
                          </div>
                          <div className="px-3 py-3 w-24 text-gray-600 text-sm">
                            {item.unitName}
                          </div>
                          <div className="px-5 py-3 w-24 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                className="p-1.5 text-gray-400 rounded transition-colors hover:opacity-80"
                                style={{ color: 'var(--accent)' }}
                                aria-label={`Edit ${item.product}`}
                                onClick={(e) => e.stopPropagation()}>

                                <PencilIcon className="w-3.5 h-3.5" />
                              </button>
                              <button
                                className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-red-50 transition-colors"
                                aria-label={`Delete ${item.product}`}
                                onClick={(e) => e.stopPropagation()}>

                                <Trash2Icon className="w-3.5 h-3.5" />
                              </button>
                              <ChevronDownIcon
                                className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />

                            </div>
                          </div>
                        </div>

                        {/* Expanded description */}
                        <AnimatePresence>
                          {isExpanded &&
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0
                            }}
                            animate={{
                              height: 'auto',
                              opacity: 1
                            }}
                            exit={{
                              height: 0,
                              opacity: 0
                            }}
                            transition={{
                              duration: 0.2
                            }}
                            className="overflow-hidden">

                              <div className="px-5 pb-3 pl-[68px]">
                                <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-md px-3 py-2 border-l-2" style={{ borderColor: 'var(--accent-border)' }}>
                                  <FileIcon className="w-3 h-3 mt-0.5 flex-shrink-0 text-gray-400" />
                                  <p className="leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          }
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>);

              })}
            </tbody>
          </table>
        </div>

        {/* Summary footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between">
          <p className="text-xs text-gray-500">{lineItems.length} line items</p>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Estimate Total
            </p>
            <p className="text-lg font-bold text-[#212529]">{estimateTotal.startsWith('$') ? estimateTotal : `$${estimateTotal}`}</p>
          </div>
        </div>
      </div>
    </motion.div>);

}