import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaletteIcon } from 'lucide-react';
import { useDesign } from '../context/DesignContext';
import { EstimateHeader } from '../components/estimates/EstimateHeader';
import { TabNavigation } from '../components/estimates/TabNavigation';
import { ContactSidebar } from '../components/estimates/ContactSidebar';
import { EstimateDetails } from '../components/estimates/EstimateDetails';
import { WorkscopesSection } from '../components/estimates/WorkscopesSection';
import { StatusPipeline } from '../components/estimates/StatusPipeline';
import { NotesActivities } from '../components/estimates/NotesActivities';
import { ChangeOrderTab } from '../components/estimates/ChangeOrderTab';
import { ProductionTab } from '../components/estimates/ProductionTab';
import { OrderingTab } from '../components/estimates/OrderingTab';
import { ExpensesTab } from '../components/estimates/ExpensesTab';
import { SubcontractorTab } from '../components/estimates/SubcontractorTab';
import { PaymentTab } from '../components/estimates/PaymentTab';
import { CommissionTab } from '../components/estimates/CommissionTab';
import { ServicesTab } from '../components/estimates/ServicesTab';
import { ConstructionIcon } from 'lucide-react';
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
  const { designId, setDesignId, designData } = useDesign();
  const theme = designData.theme;
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5]" data-theme={theme} data-layout={designData.layoutVariant}>
      {/* Design selector tabs — each design has its own accent */}
      <div className="sticky top-0 z-40 bg-[#212529] border-b border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-1 py-2">
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
      {/* Sticky Header */}
      <div className="sticky top-[45px] z-30">
        <EstimateHeader />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'summary' && (
            <motion.div key="summary" {...tabTransition}>
              {designData.layoutVariant === 'default' && (
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 min-w-0 space-y-4">
                    <EstimateDetails />
                    <WorkscopesSection />
                  </div>
                  <div className="w-full lg:w-[340px] flex-shrink-0">
                    <ContactSidebar />
                  </div>
                </div>
              )}
              {designData.layoutVariant === 'compact' && (
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-[300px] flex-shrink-0 order-2 lg:order-1">
                    <ContactSidebar />
                  </div>
                  <div className="flex-1 min-w-0 space-y-4 order-1 lg:order-2">
                    <EstimateDetails />
                    <WorkscopesSection />
                  </div>
                </div>
              )}
              {designData.layoutVariant === 'minimal' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
                    <StatusPipeline />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <EstimateDetails />
                      <WorkscopesSection />
                    </div>
                    <div className="lg:col-span-1">
                      <ContactSidebar />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'notes' &&
          <motion.div key="notes" {...tabTransition}>
              <NotesActivities />
            </motion.div>
          }

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

          {activeTab === 'production' &&
          <motion.div key="production" {...tabTransition}>
              <ProductionTab />
            </motion.div>
          }

          {activeTab === 'ordering' &&
          <motion.div key="ordering" {...tabTransition}>
              <OrderingTab />
            </motion.div>
          }

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

          {![
          'summary',
          'notes',
          'payment',
          'change-order',
          'production',
          'ordering',
          'sub-contractor',
          'expenses',
          'commission',
          'services'].
          includes(activeTab) &&
          <motion.div
            key="placeholder"
            {...tabTransition}
            className="bg-white rounded-xl border border-gray-200 px-6 py-16 text-center">

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
    </div>);

}