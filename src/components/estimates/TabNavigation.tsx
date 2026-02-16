import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboardIcon,
  CreditCardIcon,
  RefreshCwIcon,
  CalendarDaysIcon,
  PackageIcon,
  RulerIcon,
  ListChecksIcon,
  UsersIcon,
  DollarSignIcon,
  PercentIcon,
  WrenchIcon,
  Images,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';
import type { LayoutVariant } from '../../data/designSets';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}
const tabs: Tab[] = [
  { id: 'summary', label: 'General Info', icon: <LayoutDashboardIcon className="w-4 h-4" /> },
  { id: 'payment', label: 'Payment', icon: <CreditCardIcon className="w-4 h-4" /> },
  { id: 'change-order', label: 'Change Order', icon: <RefreshCwIcon className="w-4 h-4" /> },
  { id: 'ordering', label: 'Ordering', icon: <PackageIcon className="w-4 h-4" /> },
  { id: 'measurement', label: 'Measurement', icon: <RulerIcon className="w-4 h-4" /> },
  { id: 'workscopes', label: 'Work scope', icon: <ListChecksIcon className="w-4 h-4" /> },
  { id: 'sub-contractor', label: 'Sub Contractor', icon: <UsersIcon className="w-4 h-4" /> },
  { id: 'expenses', label: 'Expenses', icon: <DollarSignIcon className="w-4 h-4" /> },
  { id: 'commission', label: 'Commission', icon: <PercentIcon className="w-4 h-4" /> },
  { id: 'services', label: 'Services', icon: <WrenchIcon className="w-4 h-4" /> },
  { id: 'documents', label: 'Documents', icon: <Images className="w-4 h-4" /> },
  { id: 'schedules', label: 'Schedules', icon: <CalendarDaysIcon className="w-4 h-4" /> },
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  layoutVariant?: LayoutVariant;
}

export function TabNavigation({ activeTab, onTabChange, layoutVariant: layoutVariantProp }: TabNavigationProps) {
  const { designData } = useDesign();
  const layoutVariant = layoutVariantProp ?? designData.layoutVariant;

  // Design 1: horizontal underline tabs
  if (layoutVariant === 'default') {
    return (
      <nav className="border-b border-gray-200 bg-white shadow-sm" role="tablist" aria-label="Estimate sections">
        <div className="max-w-[1800px] mx-auto px-3">
          <div className="flex gap-0 overflow-x-auto no-scrollbar min-h-[52px]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${isActive ? '' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}
                  style={isActive ? { color: 'var(--accent)', borderColor: 'var(--accent)' } : undefined}
                >
                  <span className={isActive ? '' : 'text-gray-400'} style={isActive ? { color: 'var(--accent)' } : undefined}>{tab.icon}</span>
                  {tab.label}
                  {isActive && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'var(--accent)' }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  // Design 2: pill/chip style tabs
  if (layoutVariant === 'compact') {
    return (
      <nav className="border-b border-gray-200 bg-white" role="tablist" aria-label="Estimate sections">
        <div className="max-w-[1800px] mx-auto px-3 py-3">
          <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${isActive ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`}
                  style={isActive ? { backgroundColor: 'var(--accent)' } : undefined}
                >
                  <span className={isActive ? 'text-white' : 'text-gray-400'}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  // Design 3: minimal tabs
  return (
    <nav className="border-b border-gray-200 bg-white" role="tablist" aria-label="Estimate sections">
      <div className="max-w-[1800px] mx-auto px-3 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar md:overflow-visible md:justify-start">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors border ${isActive ? 'border-current' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                style={isActive ? { color: 'var(--accent)', borderColor: 'var(--accent)', backgroundColor: 'var(--accent-light)' } : undefined}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );

}