import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaletteIcon } from 'lucide-react';
import { useDesign } from '../context/DesignContext';
import { EstimateHeader } from '../components/estimates/EstimateHeader';
import { TabNavigation } from '../components/estimates/TabNavigation';
import { ContactSidebar } from '../components/estimates/ContactSidebar';
import { EstimateDetails } from '../components/estimates/EstimateDetails';
import { MeasurementTab } from '../components/estimates/MeasurementTab';
import { WorkscopesSection } from '../components/estimates/WorkscopesSection';
import { NotesActivities } from '../components/estimates/NotesActivities';
import { ChangeOrderTab } from '../components/estimates/ChangeOrderTab';
import { ProductionTab } from '../components/estimates/ProductionTab';
import { SchedulesTab } from '../components/estimates/SchedulesTab';
import { OrderingTab } from '../components/estimates/OrderingTab';
import { ExpensesTab } from '../components/estimates/ExpensesTab';
import { SubcontractorTab } from '../components/estimates/SubcontractorTab';
import { PaymentTab } from '../components/estimates/PaymentTab';
import { CommissionTab } from '../components/estimates/CommissionTab';
import { ServicesTab } from '../components/estimates/ServicesTab';
import { DocumentsTab } from '../components/estimates/DocumentsTab';
import { PersistentSummary } from '../components/estimates/PersistentSummary';
import { ConstructionIcon, HardHatIcon, XIcon } from 'lucide-react';
import type { DesignId } from '../data/designSets';
const tabTransition = {
  initial: {
    opacity: 0,
    y: 6
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -6
  },
  transition: {
    duration: 0.2
  }
};
const DESIGN_TABS: { id: DesignId; label: string }[] = [
  { id: 1, label: 'Design 1' },
  { id: 2, label: 'Design 2' },
  { id: 3, label: 'Design 3' },
];

export function EstimatePage() {
  const [activeTab, setActiveTab] = useState('summary');
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesUnread, setNotesUnread] = useState(2);
  const { designId, setDesignId, designData } = useDesign();
  const theme = designData.theme;

  const handleOpenNotes = () => {
    setNotesOpen(true);
    setNotesUnread(0);
  };

  return (
    <div className="h-screen w-full bg-[#f0f2f5] flex overflow-hidden" data-theme={theme} data-layout={designData.layoutVariant}>
      {/* ซ้าย: หน้าเดิม — เลื่อนแค่คอลัมน์นี้ Notes อยู่ขวาไม่เลื่อนตาม */}
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto min-h-0">
        {/* Design selector tabs — each design has its own accent */}
        <div className="sticky top-0 z-40 bg-[#212529] border-b border-gray-700">
          <div className="max-w-[1800px] mx-auto px-3">
            <div className="flex items-center gap-2 py-2.5">
              <PaletteIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-4">Estimate set</span>
              {DESIGN_TABS.map((tab) => {
                const isActive = designId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDesignId(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#0d6efd] text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Sticky Header → Status + Summary → Tabs */}
        <div className="sticky top-[45px] z-30 bg-white">
          <EstimateHeader notesUnread={notesUnread} onOpenNotes={handleOpenNotes} />
          <PersistentSummary />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="max-w-[1800px] mx-auto px-3 py-8 flex-1 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'summary' && (
            <motion.div key="summary" {...tabTransition} className="space-y-6">
              {/* Default: main column = Details on top, Overview below; sidebar right */}
              {designData.layoutVariant === 'default' && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
                  <div className="min-w-0 space-y-6">
                    <EstimateDetails />
                    <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden" aria-label="General Info">
                      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
                        <HardHatIcon className="w-4 h-4 text-gray-400" />
                        <h2 className="text-sm font-semibold text-[#212529]">Overview & delivery</h2>
                      </div>
                      <div className="p-5">
                        <ProductionTab embedded />
                      </div>
                    </section>
                  </div>
                  <div className="lg:sticky lg:top-[180px]">
                    <ContactSidebar hideProgress />
                  </div>
                </div>
              )}
              {/* Compact: sidebar left; main = Details on top, Overview below */}
              {designData.layoutVariant === 'compact' && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
                  <div className="lg:sticky lg:top-[160px]">
                    <ContactSidebar hideProgress />
                  </div>
                  <div className="min-w-0 space-y-6">
                    <EstimateDetails />
                    <section className="bg-white rounded-xl border border-gray-200 overflow-hidden" data-card aria-label="General Info">
                      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
                        <HardHatIcon className="w-4 h-4 text-gray-400" />
                        <h2 className="text-sm font-semibold text-[#212529]">Overview & delivery</h2>
                      </div>
                      <div className="p-5">
                        <ProductionTab embedded />
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {/* Minimal: main column (Details on top, Overview below) + sidebar — Status moved to PersistentSummary */}
              {designData.layoutVariant === 'minimal' && (
                <>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px] lg:items-start">
                    <div className="min-w-0 space-y-6">
                      <EstimateDetails />
                      <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden" aria-label="General Info">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                          <HardHatIcon className="w-4 h-4 text-gray-400" />
                          <h2 className="text-sm font-semibold text-[#212529]">Overview & delivery</h2>
                        </div>
                        <div className="p-5">
                          <ProductionTab embedded />
                        </div>
                      </section>
                    </div>
                    <div className="lg:sticky lg:top-[160px]">
                      <ContactSidebar hideProgress />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'payment' &&
          <motion.div key="payment" {...tabTransition}>
              <PaymentTab />
            </motion.div>
          }

          {activeTab === 'change-order' &&
          <motion.div key="change-order" {...tabTransition}>
              <ChangeOrderTab />
            </motion.div>
          }

          {activeTab === 'schedules' && (
            <motion.div key="schedules" {...tabTransition}>
              <SchedulesTab />
            </motion.div>
          )}

          {activeTab === 'ordering' &&
          <motion.div key="ordering" {...tabTransition}>
              <OrderingTab />
            </motion.div>
          }

          {activeTab === 'measurement' && (
            <motion.div key="measurement" {...tabTransition}>
              <MeasurementTab />
            </motion.div>
          )}

          {activeTab === 'workscopes' && (
            <motion.div key="workscopes" {...tabTransition}>
              <WorkscopesSection />
            </motion.div>
          )}

          {activeTab === 'sub-contractor' &&
          <motion.div key="sub-contractor" {...tabTransition}>
              <SubcontractorTab />
            </motion.div>
          }

          {activeTab === 'expenses' &&
          <motion.div key="expenses" {...tabTransition}>
              <ExpensesTab />
            </motion.div>
          }

          {activeTab === 'commission' &&
          <motion.div key="commission" {...tabTransition}>
              <CommissionTab />
            </motion.div>
          }

          {activeTab === 'services' &&
          <motion.div key="services" {...tabTransition}>
              <ServicesTab />
            </motion.div>
          }

          {activeTab === 'documents' && (
            <motion.div key="documents" {...tabTransition}>
              <DocumentsTab />
            </motion.div>
          )}

          {![
          'summary',
          'schedules',
          'measurement',
          'workscopes',
          'payment',
          'change-order',
          'ordering',
          'sub-contractor',
          'expenses',
          'commission',
          'services',
          'documents',
          ].
          includes(activeTab) &&
          <motion.div
            key="placeholder"
            {...tabTransition}
            className="bg-white rounded-xl border border-gray-200 px-4 py-16 text-center">

              <ConstructionIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-[#212529] mb-1">
                Coming Soon
              </h3>
              <p className="text-sm text-gray-400">
                This section is under development.
              </p>
            </motion.div>
          }
        </AnimatePresence>
      </main>
      </div>

      {/* ขวา: Notes sidebar — แทรกเข้ามา หน้าเดิมหดซ้าย */}
      <AnimatePresence>
        {notesOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 384 }}
            exit={{ width: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="flex-shrink-0 h-screen bg-white border-l border-gray-200 shadow-lg flex flex-col overflow-hidden min-w-0"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
              <h2 className="text-base font-semibold text-[#212529]">Notes & Activities</h2>
              <button
                type="button"
                onClick={() => setNotesOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4">
              <NotesActivities />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}