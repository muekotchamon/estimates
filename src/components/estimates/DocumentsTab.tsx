import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, PlusIcon, XIcon } from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

// Placeholder for one uploaded image (aerial/house style)
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop';

export function DocumentsTab() {
  const { designData } = useDesign();
  const layoutVariant = designData.layoutVariant;
  const isCompact = layoutVariant === 'compact';
  const isMinimal = layoutVariant === 'minimal';

  const [category, setCategory] = useState('Before Pics');
  const [galleryExpanded, setGalleryExpanded] = useState(true);
  const [images, setImages] = useState<{ id: string; url: string }[]>([
    { id: '1', url: PLACEHOLDER_IMAGE },
  ]);

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const addImage = () => {
    setImages((prev) => [...prev, { id: String(Date.now()), url: PLACEHOLDER_IMAGE }]);
  };

  const cardClass = isMinimal
    ? 'rounded-lg shadow-sm border border-gray-200'
    : isCompact
      ? 'rounded-lg border border-gray-200 border-l-4'
      : 'rounded-xl border border-gray-200';
  const borderLeftStyle = isCompact ? { borderLeftColor: 'var(--accent)' } : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div
        className={`bg-white ${cardClass} overflow-hidden`}
        style={borderLeftStyle}
        data-card={isCompact || isMinimal ? true : undefined}
      >
        {/* Gallery header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-base font-semibold text-[#212529]">Gallery</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
              >
                <option>Before Pics</option>
                <option>After Pics</option>
                <option>In Progress</option>
                <option>All</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <button
              type="button"
              onClick={() => setGalleryExpanded((v) => !v)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={galleryExpanded ? 'Collapse gallery' : 'Expand gallery'}
            >
              <ChevronUp className={`w-5 h-5 transition-transform ${galleryExpanded ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {galleryExpanded && (
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-100 group"
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 shadow-sm transition-colors"
                    aria-label="Remove image"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors cursor-pointer"
              >
                <PlusIcon className="w-10 h-10" />
                <span className="text-sm font-medium">Add Image</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
