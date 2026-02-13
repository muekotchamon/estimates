import React from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon, PencilIcon } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function EstimateDetails() {
  const { designData } = useDesign();
  const details = designData.details;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.35,
        delay: 0.15
      }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      data-card>

      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#212529] flex items-center gap-2">
          <FileTextIcon className="w-4 h-4 text-gray-400" />
          Estimate Details
        </h3>
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          <PencilIcon className="w-3 h-3" />
          Edit
        </button>
      </div>
      <div className="p-5">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {details.map((detail, i) =>
          <motion.div
            key={detail.label}
            initial={{
              opacity: 0,
              y: 6
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2 + i * 0.04,
              duration: 0.25
            }}
            className="flex flex-col">

              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {detail.label}
              </dt>
              <dd className="text-sm font-medium text-[#212529] mt-0.5">
                {detail.value}
              </dd>
            </motion.div>
          )}
        </dl>
      </div>
    </motion.div>);

}