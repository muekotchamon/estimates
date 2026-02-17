import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileBarChartIcon,
  ChevronDownIcon,
  RefreshCwIcon,
  PencilIcon,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

type MeasureSubTab = 'roofing' | 'flat-roof' | 'roof-cleaning';

const measureTabs: { id: MeasureSubTab; label: string }[] = [
  { id: 'roofing', label: 'Roofing' },
  { id: 'flat-roof', label: 'Flat Roof' },
  { id: 'roof-cleaning', label: 'Roof Cleaning' },
];

export function MeasurementTab() {
  const { designData } = useDesign();
  const { siteMeasures, measurementData } = designData.workscopes;
  const [measureTab, setMeasureTab] = useState<MeasureSubTab>('roofing');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Roofing / Flat Roof / Roof Cleaning + measurement grid */}
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

      {/* Site/Measures (ซ้าย) | Message to production (ขวา) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Site/Measures — ซ้าย */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        </div>

        {/* Message to production — ขวา */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden" data-card>
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              Message to production
            </h4>
            <div className="flex items-center gap-1">
              <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Refresh">
                <RefreshCwIcon className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Edit">
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <textarea
              placeholder="Add a message for production... (e.g. Dumpster in driveway. We are only replacing the roofing system on the main home...)"
              defaultValue={siteMeasures.messageToProduction}
              rows={6}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-y"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
