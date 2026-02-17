import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MailIcon,
  MoreVerticalIcon,
  MessageSquareIcon,
  FileTextIcon,
  ActivityIcon,
  ListIcon,
  BotIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';
type SubTab = 'all' | 'conversations' | 'documents' | 'activities';

const subTabs: {
  id: SubTab;
  label: string;
  icon: React.ReactNode;
}[] = [
{
  id: 'all',
  label: 'All',
  icon: <ListIcon className="w-3.5 h-3.5" />
},
{
  id: 'conversations',
  label: 'Conversations',
  icon: <MessageSquareIcon className="w-3.5 h-3.5" />
},
{
  id: 'documents',
  label: 'Documents',
  icon: <FileTextIcon className="w-3.5 h-3.5" />
},
{
  id: 'activities',
  label: 'Activities',
  icon: <ActivityIcon className="w-3.5 h-3.5" />
}];

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.06,
      duration: 0.3
    }
  })
};
export function NotesActivities() {
  const { designId, designData } = useDesign();
  const entries = designData.notes;
  const layoutVariant = designData.layoutVariant;
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('all');
  const isCompact = layoutVariant === 'compact';
  const isMinimal = layoutVariant === 'minimal';
  // Design 3 always uses Design 1 note layout in this panel
  const notesUseDefaultLayout = layoutVariant === 'default' || designId === 3;

  const feedContentCompactMinimal = (
    <>
      {entries.map((entry, i) => (
        <motion.div key={entry.id} custom={i} initial="hidden" animate="visible" variants={itemVariants} className={isMinimal ? 'px-4 py-2 border-l-2 pl-4 ml-2' : 'px-6 py-4'} style={isMinimal ? { borderLeftColor: 'var(--accent)' } : undefined}>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${entry.author === 'System' ? 'bg-gray-400' : 'bg-[#0d6efd]'}`}>{entry.initials}</div>
            <div className="flex-1 min-w-0">
              {!isMinimal && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-gray-100 text-gray-500 mr-2">
                  {entry.type === 'auto-log' ? <BotIcon className="w-2.5 h-2.5" /> : <MessageSquareIcon className="w-2.5 h-2.5" />}
                  {entry.type === 'auto-log' ? 'Auto' : 'Manual'}
                </span>
              )}
              <p className={`text-[#212529] leading-relaxed ${isMinimal ? 'text-xs' : 'text-sm'}`}>{entry.message}</p>
              <p className="text-xs text-gray-400 mt-0.5">{entry.author} · {entry.timestamp}</p>
            </div>
          </div>
        </motion.div>
      ))}
      {entries.length === 0 && (
        <div className={isMinimal ? 'px-4 py-8 text-center' : 'px-6 py-12 text-center'}>
          <MessageSquareIcon className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No messages yet</p>
        </div>
      )}
    </>
  );

  const feedContentDefault = (
    <>
      {entries.map((entry, i) => (
        <motion.div key={entry.id} custom={i} initial="hidden" animate="visible" variants={itemVariants} className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-500">
              {entry.type === 'auto-log' ? <BotIcon className="w-3 h-3" /> : <MessageSquareIcon className="w-3 h-3" />}
              {entry.type === 'auto-log' ? 'Auto Log' : 'Manual'}
            </span>
            <div className="flex items-center gap-1">
              {entry.hasEmail && <span className="p-1.5 text-gray-400" aria-label="Sent via email"><MailIcon className="w-4 h-4" /></span>}
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" aria-label="More options"><MoreVerticalIcon className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${entry.author === 'System' ? 'bg-gray-400' : 'bg-gradient-to-br from-blue-400 to-blue-600'}`}>{entry.initials}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#212529] leading-relaxed">{entry.message}</p>
              <p className="text-xs text-gray-400 mt-1.5"><span className="font-medium text-gray-500">{entry.author}</span><span className="mx-1.5">·</span>{entry.timestamp}</p>
            </div>
          </div>
        </motion.div>
      ))}
      {entries.length === 0 && (
        <div className="px-6 py-12 text-center">
          <MessageSquareIcon className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No messages yet</p>
        </div>
      )}
    </>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-0">
      {/* Design 1 default (also used for Design 3 notes) */}
      {notesUseDefaultLayout && (
        <>
          <div className="bg-white rounded-t-xl border border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-[#212529]">Messages</h2>
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: 'var(--accent)' }}>{entries.length}</span>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}><PlusIcon className="w-4 h-4" /> Add</button>
          </div>
          <div className="bg-white border-x border-gray-200 px-6">
            <div className="flex gap-0 border-b border-gray-100">
              {subTabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveSubTab(tab.id)} className={`relative flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 ${activeSubTab === tab.id ? '' : 'text-gray-500 border-transparent hover:text-gray-700'}`} style={activeSubTab === tab.id ? { color: 'var(--accent)', borderColor: 'var(--accent)' } : undefined}>
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-b-xl border-x border-b border-gray-200 divide-y divide-gray-100">{feedContentDefault}</div>
        </>
      )}

      {/* Design 2 compact: pill sub-tabs, cards with left accent */}
      {isCompact && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between border-l-4" style={{ borderLeftColor: 'var(--accent)' }} data-card>
            <h2 className="text-sm font-semibold text-[#212529]">Messages</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'var(--accent)' }}>{entries.length}</span>
              <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white rounded-full" style={{ backgroundColor: 'var(--accent)' }}><PlusIcon className="w-3 h-3" /> Add</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {subTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveSubTab(tab.id)} className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full ${activeSubTab === tab.id ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`} style={activeSubTab === tab.id ? { backgroundColor: 'var(--accent)' } : undefined}>
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 border-l-4" style={{ borderLeftColor: 'var(--accent)' }} data-card>
            {feedContentCompactMinimal}
          </div>
        </div>
      )}

    </motion.div>
  );

}