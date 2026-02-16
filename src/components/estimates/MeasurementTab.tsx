import React from 'react';
import { motion } from 'framer-motion';
import {
  FileBarChartIcon,
  ChevronDownIcon,
  RefreshCwIcon,
  PencilIcon,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function MeasurementTab() {
  const { designData } = useDesign();
  const { siteMeasures } = designData.workscopes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Site/Measures — โครงตามรูป: ชื่อโปรเจกต์, Installed Type, Contract Type, ... */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm" data-card>
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#212529] flex items-center gap-2">
            <FileBarChartIcon className="w-4 h-4 text-gray-400" />
            Site/Measures
          </h3>
          <a href="#" className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-90" style={{ color: 'var(--accent)' }}>
            <FileBarChartIcon className="w-3.5 h-3.5" />
            View Reports
          </a>
        </div>

        <div className="p-4 space-y-4">
          <input
            type="text"
            defaultValue={siteMeasures.projectName}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
            placeholder="Project name"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Installed Type</label>
              <div className="relative">
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 appearance-none pr-8" defaultValue={siteMeasures.installedType}>
                  <option>Roof Repair</option>
                  <option>Roof Replacement</option>
                  <option>Coating</option>
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Contract Type</label>
              <input type="text" readOnly className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-[#212529]" value={siteMeasures.contractType} />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Property Type</label>
              <input type="text" readOnly className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-[#212529]" value={siteMeasures.propertyType} />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Selection</label>
              <input type="text" readOnly className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-[#212529]" value={siteMeasures.selection} />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Rating</label>
              <input type="text" readOnly className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-[#212529]" value={siteMeasures.rating} />
            </div>
          </div>
        </div>

        {/* MESSAGE TO PRODUCTION — หัวข้อสีน้ำเงิน ตัวพิมพ์ใหญ่ (ส่วน Roofing/Flat Roof/Roof Cleaning + กริด อยู่หน้า Work scope) */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              Message to production
            </h4>
            <div className="flex items-center gap-1">
              <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 rounded" aria-label="Refresh">
                <RefreshCwIcon className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 rounded" aria-label="Edit">
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <textarea
            placeholder="Add a message for production..."
            defaultValue={siteMeasures.messageToProduction}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-y"
          />
        </div>
      </div>
    </motion.div>
  );
}
