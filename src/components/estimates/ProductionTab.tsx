import React, { useState, useEffect } from 'react';
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

interface ProductionTabProps {
  /** เมื่อใช้ในหน้า Summary ให้ซ่อน top bar และแสดงเป็น section */
  embedded?: boolean;
}

export function ProductionTab({ embedded }: ProductionTabProps) {
  const { designData } = useDesign();
  const production = designData.production;
  const layoutVariant = designData.layoutVariant;

  const [permitAllocation, setPermitAllocation] = useState(production.permitAllocation);
  const [requirementDetails, setRequirementDetails] = useState(production.requirementDetails);
  const [orderPlaced, setOrderPlaced] = useState(production.orderPlaced);
  const [expectedDelivery, setExpectedDelivery] = useState(production.expectedDelivery);
  const [financeExclusion, setFinanceExclusion] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setPermitAllocation(production.permitAllocation);
    setRequirementDetails(production.requirementDetails);
    setOrderPlaced(production.orderPlaced);
    setExpectedDelivery(production.expectedDelivery);
  }, [production.permitAllocation, production.requirementDetails, production.orderPlaced, production.expectedDelivery]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
      className={embedded ? 'space-y-4' : 'space-y-4'}
    >
      {/* Top bar — ไม่แสดงเมื่อ embedded (อยู่ใต้ Summary) */}
      {!embedded && (
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
      )}

      {/* Main two-column layout — minimal = single column */}
      <div className={`grid gap-4 ${isMinimal ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-5'}`}>
        {/* Left column - Production Checklist */}
        <div className={`space-y-4 ${isMinimal ? '' : 'lg:col-span-3'}`}>
          <div className={`bg-white border overflow-hidden ${embedded ? 'border-gray-100 rounded-xl shadow-sm' : isMinimal ? 'rounded-lg shadow-sm border-gray-200' : 'rounded-xl border-gray-200'}`} data-card={isCompact || isMinimal ? true : undefined} style={isCompact && !embedded ? { borderLeftWidth: 4, borderLeftColor: 'var(--accent)' } : undefined}>
            {/* Section header */}
            <div className={`flex items-center gap-3 ${embedded ? 'px-4 py-3' : isMinimal ? 'px-4 py-3' : 'px-6 py-4'}`}>
              <WrenchIcon className="w-4 h-4 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Production Checklist
              </h3>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Phases */}
            <div className={`space-y-1 ${embedded ? 'px-4 pb-4' : 'px-6 pb-6'}`}>
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
        </div>

        {/* Right column — หนึ่งการ์ดเมื่อ embedded, แยกการ์ดเมื่อไม่ embedded */}
        <div className={`lg:col-span-2 ${embedded ? 'space-y-0' : 'space-y-4'}`}>
          {embedded ? (
            <div className="bg-gray-50/80 rounded-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                <div className="p-4 sm:border-r sm:border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <ShieldIcon className="w-3.5 h-3.5" /> Regulatory
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 shrink-0">Permit</span>
                      <div className="relative flex-1 min-w-0">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                        <input
                          type="text"
                          value={permitAllocation}
                          onChange={(e) => setPermitAllocation(e.target.value)}
                          className="w-full pl-6 pr-2.5 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <textarea
                      value={requirementDetails}
                      onChange={(e) => setRequirementDetails(e.target.value)}
                      placeholder="Jurisdiction permits, HOA codes..."
                      rows={2}
                      className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 resize-y bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]"
                    />
                  </div>
                </div>
                <div className="p-4 sm:border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <PackageIcon className="w-3.5 h-3.5" /> Supply
                  </p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Order</span>
                      <input
                        type="text"
                        value={orderPlaced}
                        onChange={(e) => setOrderPlaced(e.target.value)}
                        placeholder="dd/mm/yyyy"
                        className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Delivery</span>
                      <input
                        type="text"
                        value={expectedDelivery}
                        onChange={(e) => setExpectedDelivery(e.target.value)}
                        placeholder="dd/mm/yyyy"
                        className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between bg-white border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <FileWarningIcon className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-[#212529]">Finance Exclusion</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={financeExclusion}
                  onClick={() => setFinanceExclusion((v) => !v)}
                  className={`w-9 h-5 rounded-full relative transition-colors ${financeExclusion ? '' : 'bg-gray-200'}`}
                  style={financeExclusion ? { backgroundColor: 'var(--accent)' } : undefined}
                >
                  <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" style={{ transform: financeExclusion ? 'translateX(1rem)' : 'none' }} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                  <ShieldIcon className="w-4 h-4 text-gray-400" />
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Regulatory & Compliance</h3>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Permit Allocation</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                      <input type="text" readOnly value={production.permitAllocation} className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Requirement Details</label>
                    <textarea readOnly value={production.requirementDetails} placeholder="Jurisdiction permits, HOA codes..." className="w-full h-16 text-sm border border-gray-200 rounded-lg px-3 py-2 resize-y placeholder:text-gray-300" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                  <PackageIcon className="w-4 h-4 text-gray-400" />
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Supply Chain</h3>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Order Placed</label>
                    <div className="relative">
                      <input type="text" readOnly value={production.orderPlaced} placeholder="dd/mm/yyyy" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-300" />
                      <CalendarDaysIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Expected Delivery</label>
                    <div className="relative">
                      <input type="text" readOnly value={production.expectedDelivery} placeholder="dd/mm/yyyy" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-300" />
                      <CalendarDaysIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                      <FileWarningIcon className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#212529]">Finance Exclusion</p>
                      <p className="text-xs text-gray-400">Skip Change Order calculations</p>
                    </div>
                  </div>
                  <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ปุ่ม Save Changes เมื่อ embedded */}
      {embedded && (
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors hover:opacity-90 disabled:opacity-70"
            style={{ backgroundColor: saved ? 'var(--bs-success)' : 'var(--accent)' }}
            disabled={saved}
          >
            <SaveIcon className="w-4 h-4" />
            {saved ? 'Saved' : 'Save Changes'}
          </button>
        </div>
      )}
    </motion.div>);

}