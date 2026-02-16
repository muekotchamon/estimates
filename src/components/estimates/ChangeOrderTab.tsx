import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCwIcon,
  PlusIcon,
  ChevronUpIcon,
  InboxIcon,
  CalendarIcon,
  XIcon,
  FileTextIcon,
  DatabaseIcon,
  PencilIcon,
  DollarSignIcon,
  PrinterIcon,
  DownloadIcon,
  SendIcon,
  MailIcon,
  PenLine,
  Type,
  Check,
  ChevronDown,
  Trash2Icon,
  Search,
  ShoppingCart,
  ChevronUp,
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

function SignOnAppModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  const clearSignature = () => {
    setTypedSignature('');
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [open]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (mode !== 'draw') return;
    e.preventDefault();
    drawingRef.current = true;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const moveDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawingRef.current || mode !== 'draw') return;
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const endDraw = () => {
    drawingRef.current = false;
  };

  if (!open) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.dialog
          open
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#212529]">Sign — Customer</h3>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100" aria-label="Close">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600 mb-4">Customer — choose how to sign:</p>
            <div className="inline-flex rounded-xl border border-gray-200 p-1 bg-gray-50">
              <button
                type="button"
                onClick={() => setMode('draw')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === 'draw' ? 'bg-white text-[var(--accent)] shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                style={mode === 'draw' ? { color: 'var(--accent)' } : undefined}
              >
                <PenLine className="w-4 h-4" /> Draw
              </button>
              <button
                type="button"
                onClick={() => setMode('type')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === 'type' ? 'bg-white text-[var(--accent)] shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                style={mode === 'type' ? { color: 'var(--accent)' } : undefined}
              >
                <Type className="w-4 h-4" /> Type
              </button>
            </div>
            <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50" style={{ minHeight: '180px' }}>
              {mode === 'draw' ? (
                <canvas
                  ref={canvasRef}
                  className="w-full h-[180px] block touch-none cursor-crosshair"
                  onMouseDown={startDraw}
                  onMouseMove={moveDraw}
                  onMouseUp={endDraw}
                  onMouseLeave={endDraw}
                  onTouchStart={startDraw}
                  onTouchMove={moveDraw}
                  onTouchEnd={endDraw}
                />
              ) : (
                <input
                  type="text"
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  placeholder="Sign here"
                  className="w-full h-[180px] px-4 text-center text-2xl font-signature bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-gray-400"
                  style={{ fontFamily: 'cursive' }}
                />
              )}
            </div>
            <div className="mt-3 flex justify-end">
              <button type="button" onClick={clearSignature} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Trash2Icon className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 flex gap-2 justify-end bg-gray-50/30">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onClose()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Check className="w-4 h-4" /> Accept & Sign
            </button>
          </div>
        </motion.dialog>
      </div>
    </AnimatePresence>
  );
}

function SendEmailModal({ open, onClose, estimateId }: { open: boolean; onClose: () => void; estimateId: string }) {
  const [to, setTo] = useState('customer@email.com');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(
    'Dear Valued Customer,\n\nThank you for choosing Klaus Larsen Roofing. Please review the details and provide your authorization by clicking the link below.\n\nThank you'
  );
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (open) setSubject(`Change Order #${estimateId} — Authorization Required`);
  }, [open, estimateId]);

  if (!open) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.dialog
          open
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <h3 className="text-lg font-semibold text-[#212529]">Send Change Order to Customer</h3>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100" aria-label="Close">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-4 overflow-y-auto flex-1 min-h-0 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">To</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-y"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showPreview ? 'rotate-180' : ''}`} />
              Show Email Preview
            </button>
            {showPreview && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap">
                <p className="font-medium text-gray-500 mb-2">To: {to}</p>
                <p className="font-medium text-gray-500 mb-2">Subject: {subject}</p>
                <p className="border-t border-gray-200 pt-2 mt-2">{message}</p>
              </div>
            )}
          </div>
          <div className="px-6 py-4 border-t border-gray-100 flex gap-2 justify-end bg-gray-50/30 shrink-0">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onClose()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <SendIcon className="w-4 h-4" /> Send Email
            </button>
          </div>
        </motion.dialog>
      </div>
    </AnimatePresence>
  );
}

const ADD_PRODUCTS_CATEGORIES = [
  'All',
  'Disposal',
  'Decking',
  'Ice and Water',
  'Underlayment',
  'Ventilation',
  'Metal - Rake & Drip',
  'Starter Shingles',
  'Low-Slope Roofing',
  'Chimney Flashing Lead',
  'Chimney Flashing Copper',
];

const ADD_PRODUCTS_MOCK = [
  { id: '1', name: '1/2" Plywood CDX: Replace Damaged Units', description: 'Replace or install over damaged decking with new 1/2" CDX plywood at cost of $99.00 per sheet. Thicker plywood will incur additional cost, if required.', color: '—', cost: '99.00' },
  { id: '2', name: 'PVC Trim Boards (18\' min charge)', description: 'Remove and replace fascia and/or rake with 1x4 solid PVC trim boards.', color: '—', cost: '22.98' },
  { id: '3', name: 'PVC Trim Boards (18\' min charge)', description: 'Remove and replace fascia and/or rake with 1"x 8" Solid PVC trim boards.', color: '—', cost: '25.86' },
  { id: '4', name: 'PVC Trim Boards (18\' min charge)', description: 'Remove and replace fascia and/or rake with 1" x 10" Solid PVC trim boards.', color: '—', cost: '27.59' },
  { id: '5', name: 'PVC Trim Boards (18\' min charge)', description: 'Remove and replace fascia and/or rake with 1" x 12" Solid PVC trim boards.', color: '—', cost: '30.17' },
];

function AddProductsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState<{ id: string; name: string; cost: string }[]>([]);
  const [cartExpanded, setCartExpanded] = useState(false);

  const addToCart = (p: (typeof ADD_PRODUCTS_MOCK)[0]) => {
    setCart((prev) => [...prev, { id: p.id, name: p.name, cost: p.cost }]);
  };

  const saveAndClose = () => {
    onClose();
  };

  if (!open) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.dialog
          open
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <h3 className="text-lg font-semibold text-[#212529]">Add Products</h3>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100" aria-label="Close">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-3 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
              />
            </div>
          </div>
          <div className="flex-1 min-h-0 flex overflow-hidden">
            <div className="w-48 shrink-0 border-r border-gray-100 flex flex-col overflow-hidden">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</p>
              <div className="overflow-y-auto flex-1 py-1">
                {ADD_PRODUCTS_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-r-lg ${category === c ? 'bg-[var(--accent)]/10 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={category === c ? { color: 'var(--accent)' } : undefined}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</p>
              <div className="flex-1 overflow-y-auto border-t border-gray-100">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50/95">
                    <tr>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Product Name</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 w-24">Color</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 w-24">Cost</th>
                      <th className="w-12 px-2 py-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {ADD_PRODUCTS_MOCK.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-[#212529]">{p.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{p.description}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{p.color}</td>
                        <td className="px-4 py-3 font-semibold tabular-nums text-[#212529]">${p.cost}</td>
                        <td className="px-2 py-3">
                          <button
                            type="button"
                            onClick={() => addToCart(p)}
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors hover:opacity-90"
                            style={{ backgroundColor: 'var(--accent)' }}
                            aria-label="Add to cart"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 text-center">
                  <button type="button" className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    Load More
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
            <button
              type="button"
              onClick={() => setCartExpanded((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <span>Cart Summary</span>
              <span className="tabular-nums">{cart.length} items</span>
              <ChevronUp className={`w-4 h-4 transition-transform ${cartExpanded ? '' : 'rotate-180'}`} />
            </button>
            <button
              type="button"
              onClick={saveAndClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <ShoppingCart className="w-4 h-4" /> Save {cart.length} Items
            </button>
          </div>
        </motion.dialog>
      </div>
    </AnimatePresence>
  );
}

function ChangeOrderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { designData } = useDesign();
  const jobDate = 'Feb 16, 2026';
  const address = `${designData.contact.address}, ${designData.contact.cityStateZip}`;
  const [source, setSource] = useState<'custom' | 'workscopes'>('custom');
  const [contractSpec, setContractSpec] = useState('ADDITIONS (+)');
  const [changeAmount, setChangeAmount] = useState('0.00');
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [description, setDescription] = useState('');
  const [approve, setApprove] = useState(false);
  const [signModalOpen, setSignModalOpen] = useState(false);
  const [sendEmailModalOpen, setSendEmailModalOpen] = useState(false);
  const [addProductsModalOpen, setAddProductsModalOpen] = useState(false);

  if (!open) return null;
  const originalContract = '0.00';
  const taxRate = 6.35;
  const changeNum = parseFloat(changeAmount) || 0;
  const taxVal = taxEnabled ? (changeNum * taxRate) / 100 : 0;
  const totalChange = changeNum + taxVal;
  const revisedContract = (parseFloat(originalContract) + totalChange).toFixed(2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.dialog
          open
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100"
        >
          {/* Header */}
          <div className="shrink-0 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-gray-100 shadow-sm">
                  <FileTextIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#212529]">Change Order Authorization</h3>
                  <p className="text-xs text-gray-500">New change order</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-white transition-colors" aria-label="Close">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 min-h-0">
            {/* Job context strip */}
            <div className="px-6 pt-5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 px-4 rounded-xl bg-gray-50/80 border border-gray-100 text-sm">
                <span><span className="text-gray-400 font-medium">Job</span> <span className="font-semibold text-[#212529]">{designData.header.estimateNumber}</span></span>
                <span><span className="text-gray-400 font-medium">Date</span> <span className="font-semibold text-[#212529]">{jobDate}</span></span>
                <span><span className="text-gray-400 font-medium">Owner</span> <span className="font-semibold text-[#212529]">{designData.contact.name || '—'}</span></span>
                <span><span className="text-gray-400 font-medium">Phone</span> <span className="font-semibold text-[#212529]">{designData.contact.phone || '—'}</span></span>
                <span className="w-full min-w-0"><span className="text-gray-400 font-medium">Address</span> <span className="font-semibold text-[#212529] truncate block">{address}</span></span>
              </div>
            </div>

            {/* Source + main content */}
            <div className="px-6 py-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">How do you want to define this change?</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setSource('custom')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${source === 'custom' ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${source === 'custom' ? 'bg-[var(--accent)]/20' : 'bg-gray-100'}`}>
                    <PencilIcon className={`w-5 h-5 ${source === 'custom' ? 'text-[var(--accent)]' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#212529]">Custom order</p>
                    <p className="text-xs text-gray-500">Enter details manually</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSource('workscopes')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${source === 'workscopes' ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${source === 'workscopes' ? 'bg-[var(--accent)]/20' : 'bg-gray-100'}`}>
                    <DatabaseIcon className={`w-5 h-5 ${source === 'workscopes' ? 'text-[var(--accent)]' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#212529]">From workscopes</p>
                    <p className="text-xs text-gray-500">Pick from existing line items</p>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
                  <h4 className="text-sm font-semibold text-[#212529]">
                    {source === 'custom' ? 'Change specifications' : 'Workscope items'}
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Contract specification</label>
                    <select
                      value={contractSpec}
                      onChange={(e) => setContractSpec(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
                    >
                      <option>ADDITIONS (+)</option>
                      <option>DEDUCTIONS (-)</option>
                      <option>SUBSTITUTIONS</option>
                    </select>
                  </div>
                  {source === 'custom' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Type of change</label>
                        <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]">
                          <option value="">Select type...</option>
                          <option>Material</option>
                          <option>Labor</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Description of work</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe the changes in detail..."
                          rows={3}
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-y"
                        />
                      </div>
                    </>
                  )}
                  {source === 'workscopes' && (
                    <div>
                      <button type="button" onClick={() => setAddProductsModalOpen(true)} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl text-white transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
                        <PlusIcon className="w-4 h-4" />
                        Browse & add products
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddProductsModalOpen(true)}
                        className="mt-3 w-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors cursor-pointer"
                      >
                        <PlusIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm text-gray-500">Click to browse and add products</p>
                        <p className="text-xs text-gray-400 mt-0.5">Selected items will appear here</p>
                      </button>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Notes</label>
                        <textarea placeholder="Additional notes for this change order..." rows={2} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] resize-y" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Financial impact */}
                <div className="space-y-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
                  <h4 className="text-sm font-semibold text-[#212529] flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--bs-success)' }}>
                      <DollarSignIcon className="w-4 h-4" />
                    </span>
                    Financial impact
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Original contract</span>
                      <span className="font-semibold tabular-nums text-gray-700">${originalContract}</span>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Change amount</label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">$</span>
                        <input
                          type="text"
                          value={changeAmount}
                          onChange={(e) => setChangeAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                          className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
                          placeholder="0.00"
                          aria-describedby="change-amount-hint"
                        />
                      </div>
                      <p id="change-amount-hint" className="text-[10px] text-gray-400 mt-1">{source === 'workscopes' ? 'Auto-calculated from items' : 'Enter the dollar amount for this change'}</p>
                    </div>
                    <label className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-transparent hover:bg-gray-100/80 cursor-pointer transition-colors">
                      <span className="flex items-center gap-2 text-gray-700">
                        <input type="checkbox" checked={taxEnabled} onChange={(e) => setTaxEnabled(e.target.checked)} className="rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]" />
                        Tax (6.35%)
                      </span>
                      <span className="tabular-nums text-gray-600">${taxVal.toFixed(2)}</span>
                    </label>
                    <div className="flex justify-between items-center py-2.5 border-t border-gray-100">
                      <span className="text-gray-600 font-medium">Total change</span>
                      <span className="font-semibold tabular-nums" style={{ color: 'var(--bs-success)' }}>+${totalChange.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border-2 bg-[var(--accent)]/5" style={{ borderColor: 'var(--accent)' }}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Revised contract</p>
                    <p className="text-2xl font-bold tabular-nums" style={{ color: 'var(--accent)' }}>${revisedContract}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Payment method <span className="text-red-500">*</span></label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
                    >
                      <option value="">Select method...</option>
                      <option>Cash</option>
                      <option>Check</option>
                      <option>Credit Card</option>
                      <option>Finance</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Authorization & approval */}
            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Signature & approval</h4>
              <div className="rounded-xl border border-gray-200 bg-white p-4 mb-5">
                <p className="text-sm text-gray-600 leading-relaxed">
                  I hereby authorize and assume responsibility for the following <strong>{contractSpec.includes('ADDITIONS') ? 'additions' : contractSpec.includes('DEDUCTIONS') ? 'deductions' : 'substitutions'}</strong> from the original plans and specification of my contract. The work above will be performed under the same conditions as the original contract unless otherwise stipulated.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-2">Customer</p>
                  <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 mb-3">Pending</span>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => setSignModalOpen(true)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl text-white transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
                      <SendIcon className="w-4 h-4" /> Sign on app
                    </button>
                    <button type="button" onClick={() => setSendEmailModalOpen(true)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                      <MailIcon className="w-4 h-4" /> Send email
                    </button>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">Approve</p>
                  <p className="text-[10px] text-gray-400 mb-3">Toggle to approve this change order</p>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={approve}
                    onClick={() => setApprove((v) => !v)}
                    className={`w-12 h-7 rounded-full relative transition-colors flex-shrink-0 ${approve ? '' : 'bg-gray-200'}`}
                    style={approve ? { backgroundColor: 'var(--accent)' } : undefined}
                  >
                    <span className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform" style={{ transform: approve ? 'translateX(1.5rem)' : 'none' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0 bg-gray-50/50">
            <p className="text-xs text-gray-400">Change Order ID: auto-generated on save</p>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <button type="button" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <PrinterIcon className="w-4 h-4" /> Print
              </button>
              <button type="button" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <DownloadIcon className="w-4 h-4" /> PDF
              </button>
              <button type="button" className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors hover:opacity-90 shadow-md" style={{ backgroundColor: 'var(--accent)' }}>
                <PlusIcon className="w-4 h-4" /> Create
              </button>
            </div>
          </div>
        </motion.dialog>
        <SignOnAppModal open={signModalOpen} onClose={() => setSignModalOpen(false)} />
        <SendEmailModal open={sendEmailModalOpen} onClose={() => setSendEmailModalOpen(false)} estimateId={designData.header.estimateNumber} />
        <AddProductsModal open={addProductsModalOpen} onClose={() => setAddProductsModalOpen(false)} />
      </div>
    </AnimatePresence>
  );
}

export function ChangeOrderTab() {
  const { designData } = useDesign();
  const changeOrders = designData.changeOrders;
  const layoutVariant = designData.layoutVariant;
  const [modalOpen, setModalOpen] = useState(false);
  const totalAmount = changeOrders.reduce((sum, co) => sum + parseFloat(co.amount.replace(/[$,]/g, '') || '0'), 0).toFixed(2);

  const emptyState = (
    <div className="px-6 py-12 text-center border-t border-gray-100">
      <InboxIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <p className="text-sm font-medium text-gray-600 mb-1">No change orders yet</p>
      <p className="text-xs text-gray-400">Click <strong>Add</strong> above to create a new change order.</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
      {/* Design 1: table */}
      {layoutVariant === 'default' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-base font-semibold text-[#212529] flex items-center gap-2">
          <RefreshCwIcon className="w-4 h-4 text-gray-400" />
          Change Order
        </h2>
        <div className="flex items-center gap-2">
              <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
                <PlusIcon className="w-4 h-4" /> Add
          </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" aria-label="Collapse section"><ChevronUpIcon className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Date</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">Order</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Type</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Desc.</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Status</th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Amount</th>
                  <th className="text-right px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
                {changeOrders.map((co, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-6 py-3 text-sm text-[#212529]">{co.date}</td>
                    <td className="px-3 py-3 text-sm font-medium text-[#212529]">{co.order}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{co.type}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{co.desc}</td>
                    <td className="px-3 py-3"><span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--bs-success-light)', color: 'var(--bs-success)' }}>{co.status}</span></td>
                    <td className="px-3 py-3 text-right font-semibold text-[#212529] tabular-nums">{co.amount}</td>
                    <td className="px-6 py-3 text-right text-gray-400"><button className="text-[#0d6efd] hover:underline text-xs">Edit</button></td>
                  </tr>
                ))}
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <td className="px-6 py-3"><span className="flex items-center gap-1.5 text-xs font-semibold text-[#212529]"><CalendarIcon className="w-3.5 h-3.5 text-[#0d6efd]" /> Total</span></td>
                  <td className="px-3 py-3" colSpan={4} />
                  <td className="px-3 py-3 text-right font-semibold text-[#212529] tabular-nums">${totalAmount}</td>
              <td className="px-6 py-3" />
            </tr>
          </tbody>
        </table>
      </div>
          {changeOrders.length === 0 && emptyState}
        </div>
      )}

      {/* Design 2 (compact): card per change order */}
      {layoutVariant === 'compact' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#212529] flex items-center gap-2"><RefreshCwIcon className="w-4 h-4 text-gray-400" /> Change Order</h2>
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-full transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}><PlusIcon className="w-3 h-3" /> Add</button>
          </div>
          {changeOrders.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 border-l-4 px-4 py-8 text-center" style={{ borderLeftColor: 'var(--accent)' }} data-card>
              <InboxIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400">No change orders. Click Add to create one.</p>
            </div>
          ) : (
            <>
              {changeOrders.map((co, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden border-l-4 pl-4 py-4" style={{ borderLeftColor: 'var(--accent)' }} data-card>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[#212529]">{co.order}</span>
                      <span className="text-xs text-gray-500">{co.date}</span>
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: 'var(--bs-success-light)', color: 'var(--bs-success)' }}>{co.status}</span>
                    </div>
                    <span className="text-sm font-bold text-[#212529] tabular-nums">{co.amount}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{co.type} — {co.desc}</p>
                  <button className="text-xs mt-2" style={{ color: 'var(--accent)' }}>Edit</button>
                </div>
              ))}
              <div className="bg-gray-50 rounded-lg px-4 py-2 flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span className="tabular-nums">${totalAmount}</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Design 3 (minimal): compact table */}
      {layoutVariant === 'minimal' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden" data-card>
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#212529]">Change Order</h2>
            <button onClick={() => setModalOpen(true)} className="text-xs font-medium px-2 py-1 rounded transition-colors hover:opacity-90" style={{ color: 'var(--accent)' }}>+ Add</button>
          </div>
          {changeOrders.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-gray-400">No change orders.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-3 py-2 font-semibold text-gray-500">Date</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-500">Order</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-500">Type</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {changeOrders.map((co, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="px-3 py-2 text-[#212529]">{co.date}</td>
                      <td className="px-3 py-2 font-medium text-[#212529]">{co.order}</td>
                      <td className="px-3 py-2 text-gray-600">{co.type}</td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums">{co.amount}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50/50">
                    <td className="px-3 py-2 font-semibold" colSpan={3}>Total</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">${totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
      </div>
      )}

      <ChangeOrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  );

}