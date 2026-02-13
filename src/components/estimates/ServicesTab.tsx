import React from 'react';
import { motion } from 'framer-motion';
import { WrenchIcon } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function ServicesTab() {
  const { designData } = useDesign();
  const services = designData.services;
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
      <div className={`border-b border-gray-100 ${isMinimal ? 'px-4 py-3' : 'px-6 py-4'}`}>
        <h2 className={`font-semibold text-[#212529] flex items-center gap-2 ${isMinimal ? 'text-sm' : 'text-base'}`}>
          <WrenchIcon className="w-4 h-4 text-gray-400" />
          Services
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                Service ID
              </th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Installed Type
              </th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                Status
              </th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">
                PM Name
              </th>
              <th className="text-right px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                Total Value
              </th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-6 py-4" />
                    <td className="px-3 py-4" />
                    <td className="px-3 py-4" />
                    <td className="px-3 py-4" />
                    <td className="px-6 py-4" />
                  </tr>
                ))
              : services.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-6 py-4 font-mono text-sm text-[#212529]">{row.serviceId}</td>
                    <td className="px-3 py-4 font-medium text-[#212529]">{row.installedType}</td>
                    <td className="px-3 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-[#0d6efd]">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-gray-600">{row.pmName}</td>
                    <td className="px-6 py-4 text-right font-semibold tabular-nums">{row.totalValue}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </motion.div>);

}