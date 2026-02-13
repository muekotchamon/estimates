import React from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CopyIcon,
  NavigationIcon,
  ShieldIcon,
  UsersIcon,
  PencilIcon,
  PlusIcon,
  ExternalLinkIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';
import { ProgressTimeline } from './ProgressTimeline';
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 12
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.35
    }
  })
};
export function ContactSidebar() {
  const { designData } = useDesign();
  const contact = designData.contact;
  return (
    <aside className="space-y-4" aria-label="Contact and project details">
      {/* Contact Card */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        data-card>

        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#212529] flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-gray-400" />
            Contact
          </h3>
          <button className="text-xs font-medium transition-colors flex items-center gap-1 hover:opacity-90" style={{ color: 'var(--accent)' }}>
            <ExternalLinkIcon className="w-3 h-3" />
            View
          </button>
        </div>
        <div className="p-5 space-y-4">
          {/* Name & ID */}
          <div>
            <p className="text-sm font-semibold text-[#212529]">
              {contact.name}
            </p>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {contact.contactId}
            </p>
          </div>

          {/* Contact methods */}
          <div className="space-y-2.5">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2.5 text-sm text-gray-600 transition-colors group hover:opacity-90"
            >
              <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-colors" style={{ backgroundColor: 'var(--accent-light)' }}>
                <MailIcon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              </div>
              <span className="truncate group-hover:opacity-90" style={{ color: 'var(--accent)' }}>{contact.email}</span>
            </a>
            <a
              href={`tel:${contact.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-2.5 text-sm text-gray-600 transition-colors group hover:opacity-90"
            >
              <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-colors" style={{ backgroundColor: 'var(--accent-light)' }}>
                <PhoneIcon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              </div>
              <span style={{ color: 'var(--accent)' }}>{contact.phone}</span>
            </a>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 pt-1">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors hover:opacity-90" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-light)' }}>
              <PhoneIcon className="w-3 h-3" />
              Call
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors hover:opacity-90" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-light)' }}>
              <MailIcon className="w-3 h-3" />
              Email
            </button>
          </div>
        </div>
      </motion.div>

      {/* Project Location Card */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        data-card>

        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#212529] flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-gray-400" />
            Project Location
          </h3>
          <div className="flex gap-1">
            <button
              className="p-1.5 text-gray-400 rounded-md transition-colors hover:opacity-80"
              style={{ color: 'var(--accent)' }}
              aria-label="Copy address">

              <CopyIcon className="w-3.5 h-3.5" />
            </button>
            <button
              className="p-1.5 text-gray-400 rounded-md transition-colors hover:opacity-80"
              style={{ color: 'var(--accent)' }}
              aria-label="Get directions">

              <NavigationIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {contact.address}
            <br />
            {contact.cityStateZip}
          </p>
        </div>
      </motion.div>

      {/* Progress Timeline */}
      <ProgressTimeline />

      {/* Team Card */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        data-card>

        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#212529] flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-gray-400" />
            Team
          </h3>
          <button className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-90" style={{ color: 'var(--accent)' }}>
            <PlusIcon className="w-3 h-3" />
            Add
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: 'var(--accent)' }}>
                {contact.teamMember.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-[#212529]">
                  {contact.teamMember.name}
                </p>
                <p className="text-xs text-gray-500">{contact.teamMember.role}</p>
              </div>
            </div>
            <button
              className="p-1.5 text-gray-400 rounded-md transition-colors hover:opacity-80"
              style={{ color: 'var(--accent)' }}
              aria-label="Edit team member">

              <PencilIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Insurance Card */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        data-card>

        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#212529] flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-gray-400" />
            Insurance
          </h3>
          <button className="text-xs font-medium transition-colors hover:opacity-90" style={{ color: 'var(--accent)' }}>
            + Add
          </button>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-gray-400 italic">
            {contact.hasInsurance ? 'Insurance on file' : 'No insurance details added'}
          </p>
        </div>
      </motion.div>
    </aside>);

}