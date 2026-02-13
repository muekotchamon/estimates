import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LandmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CreditCardIcon,
  XIcon,
  CheckIcon,
  PercentIcon,
  CalendarIcon,
  PlusIcon,
  FileTextIcon } from
'lucide-react';
import { useDesign } from '../../context/DesignContext';

export function PaymentTab() {
  const { designData } = useDesign();
  const payment = designData.payment;
  const discounts = payment.discounts;
  const layoutVariant = designData.layoutVariant;
  const [financingOpen, setFinancingOpen] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(true);

  // Design 2 (compact): 2 columns — ซ้าย Summary+History, ขวา Financing
  const isCompact = layoutVariant === 'compact';
  // Design 3 (minimal): single column แบบกระชับ
  const isMinimal = layoutVariant === 'minimal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Design 1 (default): Summary บน → Financing → History */}
      {layoutVariant === 'default' && (
        <>
      {/* 1. Summary of Payments — อยู่ด้านบน */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => setSummaryOpen(!summaryOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
          <h2 className="text-base font-semibold text-[#212529]">
            Summary of Payments
          </h2>
          {summaryOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          )}
        </button>
        {summaryOpen && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg px-4 py-5 text-center border" style={{ backgroundColor: 'var(--bs-success-light)', borderColor: 'var(--bs-success-border)' }}>
                <p className="text-xs text-gray-500 mb-1">Total Paid</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--bs-success)' }}>{payment.totalPaid}</p>
              </div>
              <div className="rounded-lg px-4 py-5 text-center border" style={{ backgroundColor: 'var(--bs-success-light)', borderColor: 'var(--bs-success-border)' }}>
                <p className="text-xs text-gray-500 mb-1">Remaining</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--bs-success)' }}>{payment.remaining}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-5 flex items-center justify-center gap-2 border border-gray-100">
                <CalendarIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Payments recorded</p>
                  <p className="text-lg font-bold text-[#212529]">{payment.paymentsRecorded}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Financing & Discounts — อยู่ด้านล่าง Summary */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => setFinancingOpen(!financingOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
          <h2 className="text-base font-semibold text-[#212529]">
            Financing & Discounts
          </h2>
          {financingOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          )}
        </button>
        {financingOpen && (
          <div className="px-6 pb-6 space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
                <LandmarkIcon className="w-4 h-4 text-gray-400" />
                Financing Offer Option
              </label>
              <div className="relative max-w-md">
                <select className="appearance-none w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg bg-white text-[#212529] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0d6efd]">
                  <option>{payment.financingOption}</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="border-2 rounded-lg p-4" style={{ borderColor: 'var(--bs-success)', backgroundColor: 'var(--bs-success-light)' }}>
              <div className="flex items-center gap-2 mb-1">
                <CreditCardIcon className="w-4 h-4" style={{ color: 'var(--bs-success)' }} />
                <p className="text-sm font-semibold text-[#212529]">Current Financial Offer:</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">Applied on {payment.appliedDate}</p>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                <XIcon className="w-3 h-3" />
                Remove Financial Offer
              </button>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-3">
                <PercentIcon className="w-4 h-4 text-gray-400" />
                Available Discounts
              </h3>
              <div className="space-y-2.5">
                {discounts.map((discount) => (
                  <div
                    key={discount.id}
                    className={`rounded-lg border-2 p-3.5 transition-colors ${discount.checked ? '' : 'border-gray-200 bg-white'}`}
                    style={discount.checked ? { borderColor: 'var(--bs-success)', backgroundColor: 'var(--bs-success-light)' } : undefined}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${discount.checked ? '' : 'border-2 border-gray-300 bg-white'}`} style={discount.checked ? { backgroundColor: 'var(--bs-success)' } : undefined}>
                        {discount.checked && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-[#212529]">{discount.name}</p>
                          {discount.checked && discount.amount && (
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {discount.type === 'percent' && discount.percentValue != null && (
                                <span className="text-xs text-gray-500">{discount.percentValue}% =</span>
                              )}
                              <input
                                type="text"
                                readOnly
                                value={discount.amount}
                                className="w-24 px-2 py-1 text-sm font-semibold rounded bg-white text-right border"
                                style={{ color: 'var(--bs-success)', borderColor: 'var(--bs-success-border)' }}
                              />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{discount.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
              <p className="text-sm font-bold text-[#212529]">Total Savings</p>
              <p className="text-lg font-bold" style={{ color: 'var(--bs-success)' }}>{payment.totalSavings}</p>
            </div>

            <div>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--bs-success)' }}>
                <CheckIcon className="w-4 h-4" />
                Apply Financial Offer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Payment History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
          <h2 className="text-base font-semibold text-[#212529]">
            Payment History
          </h2>
          {historyOpen ?
          <ChevronUpIcon className="w-4 h-4 text-gray-400" /> :

          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          }
        </button>

        {historyOpen &&
        <div className="px-6 pb-8 pt-4">
            {payment.paymentHistory.length === 0 ? (
              <div className="text-center">
                <FileTextIcon className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-4">
                  No payment history recorded yet
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#0d6efd] hover:text-[#0d6efd] transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  Add First Payment
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {payment.paymentHistory.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#212529]">{p.date} — {p.method}</p>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--bs-success)' }}>{p.amount}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        }
      </div>
        </>
      )}

      {/* Design 2 (compact): 2 คอลัมน์ — ซ้าย Summary + History, ขวา Financing */}
      {isCompact && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden border-l-4" style={{ borderLeftColor: 'var(--accent)' }} data-card>
              <button onClick={() => setSummaryOpen(!summaryOpen)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 text-left">
                <h2 className="text-sm font-semibold text-[#212529]">Summary of Payments</h2>
                {summaryOpen ? <ChevronUpIcon className="w-4 h-4 text-gray-400" /> : <ChevronDownIcon className="w-4 h-4 text-gray-400" />}
              </button>
              {summaryOpen && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-md px-3 py-3 text-center border" style={{ backgroundColor: 'var(--bs-success-light)', borderColor: 'var(--bs-success-border)' }}>
                      <p className="text-[10px] text-gray-500">Total Paid</p>
                      <p className="text-lg font-bold" style={{ color: 'var(--bs-success)' }}>{payment.totalPaid}</p>
                    </div>
                    <div className="rounded-md px-3 py-3 text-center border" style={{ backgroundColor: 'var(--bs-success-light)', borderColor: 'var(--bs-success-border)' }}>
                      <p className="text-[10px] text-gray-500">Remaining</p>
                      <p className="text-lg font-bold" style={{ color: 'var(--bs-success)' }}>{payment.remaining}</p>
                    </div>
                    <div className="bg-gray-50 rounded-md px-3 py-3 text-center border border-gray-100">
                      <p className="text-[10px] text-gray-500">Recorded</p>
                      <p className="text-lg font-bold text-[#212529]">{payment.paymentsRecorded}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden border-l-4" style={{ borderLeftColor: 'var(--accent)' }} data-card>
              <button onClick={() => setHistoryOpen(!historyOpen)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 text-left">
                <h2 className="text-sm font-semibold text-[#212529]">Payment History</h2>
                {historyOpen ? <ChevronUpIcon className="w-4 h-4 text-gray-400" /> : <ChevronDownIcon className="w-4 h-4 text-gray-400" />}
              </button>
              {historyOpen && (
                <div className="px-4 pb-4">
                  {payment.paymentHistory.length === 0 ? (
                    <div className="text-center py-6">
                      <FileTextIcon className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-2">No payment history</p>
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-dashed border-gray-300 rounded-lg hover:border-[#0d6efd] hover:text-[#0d6efd]">+ Add</button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {payment.paymentHistory.map((p, i) => (
                        <div key={i} className="flex justify-between py-1.5 text-xs border-b border-gray-50 last:border-0">
                          <span className="text-[#212529]">{p.date} — {p.method}</span>
                          <span className="font-semibold" style={{ color: 'var(--bs-success)' }}>{p.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden border-l-4" style={{ borderLeftColor: 'var(--accent)' }} data-card>
              <button onClick={() => setFinancingOpen(!financingOpen)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 text-left">
                <h2 className="text-sm font-semibold text-[#212529]">Financing & Discounts</h2>
                {financingOpen ? <ChevronUpIcon className="w-4 h-4 text-gray-400" /> : <ChevronDownIcon className="w-4 h-4 text-gray-400" />}
              </button>
              {financingOpen && (
                <div className="px-4 pb-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#212529] mb-1">Financing Offer</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white">{payment.financingOption}</select>
                  </div>
                  <div className="border rounded-lg p-3" style={{ borderColor: 'var(--bs-success)', backgroundColor: 'var(--bs-success-light)' }}>
                    <p className="text-xs font-semibold text-[#212529]">Current offer · {payment.appliedDate}</p>
                    <button className="mt-2 text-xs font-semibold text-red-500">Remove</button>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#212529] mb-2">Discounts</p>
                    <div className="space-y-1.5">
                      {discounts.map((d) => (
                        <div key={d.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0">
                          <span className={d.checked ? 'font-semibold text-[#212529]' : 'text-gray-500'}>{d.name}</span>
                          {d.checked && d.amount && <span className="font-semibold" style={{ color: 'var(--bs-success)' }}>{d.amount}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-100">
                    <span>Total Savings</span>
                    <span style={{ color: 'var(--bs-success)' }}>{payment.totalSavings}</span>
                  </div>
                  <button className="w-full py-2 text-sm font-semibold text-white rounded-lg" style={{ backgroundColor: 'var(--bs-success)' }}>Apply</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Design 3 (minimal): single column แบบมินิมอล */}
      {isMinimal && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden" data-card>
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#212529]">Summary of Payments</h2>
            </div>
            <div className="px-4 py-3 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Total Paid</span>
                <span className="text-lg font-bold" style={{ color: 'var(--bs-success)' }}>{payment.totalPaid}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Remaining</span>
                <span className="text-lg font-bold" style={{ color: 'var(--bs-success)' }}>{payment.remaining}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">{payment.paymentsRecorded} recorded</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden" data-card>
            <button onClick={() => setFinancingOpen(!financingOpen)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 text-left border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#212529]">Financing & Discounts</h2>
              {financingOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
            </button>
            {financingOpen && (
              <div className="px-4 py-3 space-y-3 text-sm">
                <p className="text-gray-600">{payment.financingOption} · Applied {payment.appliedDate}</p>
                <div className="flex flex-wrap gap-2">
                  {discounts.filter((d) => d.checked).map((d) => (
                    <span key={d.id} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--bs-success-light)', color: 'var(--bs-success)' }}>{d.name} {d.amount}</span>
                  ))}
                </div>
                <p className="font-bold">Total Savings {payment.totalSavings}</p>
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden" data-card>
            <button onClick={() => setHistoryOpen(!historyOpen)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 text-left border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#212529]">Payment History</h2>
              {historyOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
            </button>
            {historyOpen && (
              <div className="px-4 py-3">
                {payment.paymentHistory.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4 text-center">No payments yet. <button className="text-[#0d6efd] hover:underline">Add</button></p>
                ) : (
                  <ul className="space-y-1.5 text-xs">
                    {payment.paymentHistory.map((p, i) => (
                      <li key={i} className="flex justify-between py-1">
                        <span>{p.date} {p.method}</span>
                        <span className="font-semibold" style={{ color: 'var(--bs-success)' }}>{p.amount}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}