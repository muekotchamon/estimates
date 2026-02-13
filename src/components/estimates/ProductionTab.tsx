import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  CalendarIcon,
  BellIcon,
  FlagIcon,
  CheckCircle2Icon,
  WrenchIcon,
  ShieldIcon,
  PackageIcon,
  StickyNoteIcon,
  TruckIcon,
  SaveIcon,
  FileWarningIcon,
  CalendarDaysIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';

const PHASE_ICONS: Record<number, { icon: React.ReactNode; iconBg: string; iconBgStyle?: React.CSSProperties }> = {
  1: { icon: <PhoneIcon className="w-4 h-4 text-white" />, iconBg: 'bg-[#0d6efd]' },
  2: { icon: <CalendarIcon className="w-4 h-4 text-white" />, iconBg: '', iconBgStyle: { backgroundColor: 'var(--bs-success)' } },
  3: { icon: <BellIcon className="w-4 h-4 text-white" />, iconBg: 'bg-amber-500' },
  4: { icon: <FlagIcon className="w-4 h-4 text-white" />, iconBg: 'bg-[#0d6efd]' },
  5: { icon: <CheckCircle2Icon className="w-4 h-4 text-white" />, iconBg: '', iconBgStyle: { backgroundColor: 'var(--bs-success)' } },
};

export function ProductionTab() {
  const { designData } = useDesign();
  const production = designData.production;
  const layoutVariant = designData.layoutVariant;
  const phases = production.phases.map((p, i) => ({
    ...p,
    ...PHASE_ICONS[i + 1],
  }));
  const isCompact = layoutVariant === 'compact';
  const isMinimal = layoutVariant === 'minimal';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Top bar — ต่างกันตาม design */}
      <div
        className={`bg-white border border-gray-200 flex items-center justify-between ${isMinimal ? 'rounded-lg shadow-sm px-4 py-3' : isCompact ? 'rounded-lg border-l-4 px-4 py-3' : 'rounded-xl px-6 py-4'}`}
        style={isCompact ? { borderLeftColor: 'var(--accent)' } : undefined}
        data-card={isCompact || isMinimal ? true : undefined}
      >
        <h2 className={isMinimal ? 'text-sm font-semibold text-[#212529]' : 'text-base font-semibold text-[#212529]'}>Production</h2>
        <button className={`inline-flex items-center gap-1.5 text-white rounded-lg ${isMinimal ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`} style={{ backgroundColor: 'var(--accent)' }}>
          <SaveIcon className={isMinimal ? 'w-3 h-3' : 'w-4 h-4'} />
          Save Changes
        </button>
      </div>

      {/* Main two-column layout — minimal = single column */}
      <div className={`grid gap-4 ${isMinimal ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-5'}`}>
        {/* Left column - Production Checklist */}
        <div className={`space-y-4 ${isMinimal ? '' : 'lg:col-span-3'}`}>
          <div className={`bg-white border border-gray-200 overflow-hidden ${isMinimal ? 'rounded-lg shadow-sm' : 'rounded-xl'}`} data-card={isCompact || isMinimal ? true : undefined} style={isCompact ? { borderLeftWidth: 4, borderLeftColor: 'var(--accent)' } : undefined}>
            {/* Section header */}
            <div className={`flex items-center gap-3 ${isMinimal ? 'px-4 py-3' : 'px-6 py-4'}`}>
              <WrenchIcon className="w-4 h-4 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Production Checklist
              </h3>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Phases */}
            <div className="px-6 pb-6 space-y-1">
              {phases.map((phase, i) =>
              <motion.div
                key={phase.name}
                initial={{
                  opacity: 0,
                  x: -8
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.05 + i * 0.05,
                  duration: 0.25
                }}
                className="flex items-center gap-4 py-3">

                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-full ${phase.iconBg} flex items-center justify-center flex-shrink-0`}
                    style={phase.iconBgStyle}
                  >
                    {phase.icon}
                  </div>

                  {/* Name */}
                  <div className="w-28 flex-shrink-0">
                    <p className="text-sm font-semibold text-[#212529]">
                      {phase.name}
                    </p>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                      {phase.phaseNum}
                    </p>
                  </div>

                  {/* Date input */}
                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <input
                      type="text"
                      readOnly
                      value={phase.date}
                      placeholder="dd/mm/yyyy"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-[#212529] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]" />

                      <CalendarDaysIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Notes input */}
                  <div className="flex-1 min-w-0">
                    <input
                    type="text"
                    readOnly
                    value={phase.notes}
                    placeholder="Activity progress notes..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-[#212529] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]" />

                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Notes cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                <StickyNoteIcon className="w-3.5 h-3.5 text-gray-400" />
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Internal Production Notes
                </h4>
              </div>
              <div className="p-5">
                <textarea
                  readOnly
                  value={production.internalNotes}
                  className="w-full h-28 text-sm text-[#212529] border border-gray-200 rounded-lg px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]" />

              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                <TruckIcon className="w-3.5 h-3.5 text-gray-400" />
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Material & Logistics
                </h4>
              </div>
              <div className="p-5">
                <textarea
                  readOnly
                  value={production.materialLogistics}
                  placeholder="Special handling, delivery access, or fastener requirements..."
                  className="w-full h-28 text-sm text-[#212529] border border-gray-200 rounded-lg px-3 py-2 resize-y placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]" />

              </div>
            </div>
          </div>
        </div>

        {/* Right column - Regulatory & Supply Chain */}
        <div className="lg:col-span-2 space-y-4">
          {/* Regulatory & Compliance */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 flex items-center gap-2">
              <ShieldIcon className="w-4 h-4 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Regulatory & Compliance
              </h3>
            </div>
            <div className="px-5 pb-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-1.5">
                  Permit Allocation
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                    $
                  </span>
                  <input
                    type="text"
                    readOnly
                    value={production.permitAllocation}
                    className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-[#212529] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]" />

                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-1.5">
                  Requirement Details
                </label>
                <textarea
                  readOnly
                  value={production.requirementDetails}
                  placeholder="Jurisdiction permits, HOA codes..."
                  className="w-full h-20 text-sm border border-gray-200 rounded-lg px-3 py-2 resize-y placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]" />

              </div>
            </div>
          </div>

          {/* Supply Chain */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 flex items-center gap-2">
              <PackageIcon className="w-4 h-4 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Supply Chain
              </h3>
            </div>
            <div className="px-5 pb-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-1.5">
                  Order Placed
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={production.orderPlaced}
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]" />

                  <CalendarDaysIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-1.5">
                  Expected Delivery
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={production.expectedDelivery}
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]" />

                  <CalendarDaysIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Finance Exclusion */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <FileWarningIcon className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#212529]">
                    Finance Exclusion
                  </p>
                  <p className="text-xs text-gray-400">
                    Skip Change Order calculations
                  </p>
                </div>
              </div>
              <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>);

}