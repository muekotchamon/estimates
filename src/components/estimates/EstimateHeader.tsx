import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronDownIcon } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { StatusPipeline } from './StatusPipeline';
function ActionsDropdowns({
  actionsRef,
  statusRef,
  actionsOpen,
  setActionsOpen,
  statusOpen,
  setStatusOpen,
  actionOptions,
  statusOptions,
}: {
  actionsRef: React.RefObject<HTMLDivElement | null>;
  statusRef: React.RefObject<HTMLDivElement | null>;
  actionsOpen: boolean;
  setActionsOpen: (v: boolean) => void;
  statusOpen: boolean;
  setStatusOpen: (v: boolean) => void;
  actionOptions: string[];
  statusOptions: string[];
}) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="relative" ref={actionsRef}>
        <button
          onClick={() => { setActionsOpen(!actionsOpen); setStatusOpen(false); }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
          Actions
          <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${actionsOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {actionsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-1.5 w-44 bg-white rounded-lg border border-gray-200 shadow-lg z-50 py-1.5 overflow-hidden"
            >
              {actionOptions.map((option) => (
                <button key={option} onClick={() => setActionsOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative" ref={statusRef}>
        <button
          onClick={() => { setStatusOpen(!statusOpen); setActionsOpen(false); }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
          Update Status
          <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${statusOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {statusOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-1.5 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50 py-1.5 overflow-hidden"
            >
              {statusOptions.map((option) => (
                <button key={option} onClick={() => setStatusOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function EstimateHeader() {
  const { designData } = useDesign();
  const { estimateNumber, title, status, createdDate } = designData.header;
  const layoutVariant = designData.layoutVariant;
  const [actionsOpen, setActionsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (actionsRef.current && !actionsRef.current.contains(e.target as Node)) setActionsOpen(false);
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setStatusOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  const statusOptions = ['Open', 'Quoted', 'Sold', 'Contracted', 'Closed'];
  const actionOptions = ['Duplicate', 'Quick Book'];

  // ——— Design 1: default — full header with pipeline below ———
  if (layoutVariant === 'default') {
    return (
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-3 py-5">
          <motion.nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-3" aria-label="Breadcrumb">
            <a href="#" className="transition-colors hover:opacity-90" style={{ color: 'var(--accent)' }}>Estimates</a>
            <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-700 font-medium">{estimateNumber}</span>
          </motion.nav>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <motion.div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-bold text-[#212529] truncate">{title}</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border flex-shrink-0" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--accent-border)' }}>{status}</span>
              </div>
              <p className="text-sm text-gray-500">Estimate #{estimateNumber} · Created {createdDate}</p>
            </motion.div>
            <ActionsDropdowns actionsRef={actionsRef} statusRef={statusRef} actionsOpen={actionsOpen} setActionsOpen={setActionsOpen} statusOpen={statusOpen} setStatusOpen={setStatusOpen} actionOptions={actionOptions} statusOptions={statusOptions} />
          </div>
          <motion.div className="mt-5 bg-gray-50 rounded-lg px-5 py-3 border border-gray-100">
            <StatusPipeline />
          </motion.div>
        </div>
      </header>
    );
  }

  // ——— Design 2: compact — single row, pipeline inline ———
  if (layoutVariant === 'compact') {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-3 py-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500" aria-label="Breadcrumb">
              <a href="#" className="transition-colors hover:opacity-90" style={{ color: 'var(--accent)' }}>Estimates</a>
              <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              <span className="text-gray-600 font-medium">{estimateNumber}</span>
            </nav>
            <h1 className="text-lg font-bold text-[#212529] truncate">{title}</h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--accent-border)' }}>{status}</span>
            <span className="text-xs text-gray-400 hidden sm:inline">· {createdDate}</span>
            <div className="flex-1 min-w-0" />
            <div className="flex items-center gap-2">
              <div className="hidden md:block bg-gray-100 rounded-md px-3 py-1.5 border border-gray-200">
                <StatusPipeline compact />
              </div>
              <ActionsDropdowns actionsRef={actionsRef} statusRef={statusRef} actionsOpen={actionsOpen} setActionsOpen={setActionsOpen} statusOpen={statusOpen} setStatusOpen={setStatusOpen} actionOptions={actionOptions} statusOptions={statusOptions} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // ——— Design 3: minimal — no pipeline in header, slim ———
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1800px] mx-auto px-3 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5" aria-label="Breadcrumb">
              <a href="#" className="transition-colors hover:opacity-90" style={{ color: 'var(--accent)' }}>Estimates</a>
              <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              <span className="text-gray-600 font-medium">{estimateNumber}</span>
            </nav>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-[#212529] truncate">{title}</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--accent-border)' }}>{status}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{createdDate}</p>
          </div>
          <ActionsDropdowns actionsRef={actionsRef} statusRef={statusRef} actionsOpen={actionsOpen} setActionsOpen={setActionsOpen} statusOpen={statusOpen} setStatusOpen={setStatusOpen} actionOptions={actionOptions} statusOptions={statusOptions} />
        </div>
      </div>
    </header>
  );

}