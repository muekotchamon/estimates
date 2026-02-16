export type DesignId = 1 | 2 | 3;

export type LayoutVariant = 'default' | 'compact' | 'minimal';

export interface DesignSet {
  theme: string;
  layoutVariant: LayoutVariant;
  header: { estimateNumber: string; title: string; status: string; createdDate: string };
  contact: {
    name: string;
    contactId: string;
    email: string;
    phone: string;
    address: string;
    cityStateZip: string;
    teamMember?: { name: string; initials: string; role: string };
    hasInsurance?: boolean;
  };
  details: { label: string; value: string }[];
  statusPipeline: { label: string; status: 'completed' | 'current' | 'upcoming'; date?: string }[];
  progressTimeline: { label: string; date?: string; status: 'completed' | 'current' | 'upcoming' }[];
  workscopes: {
    estimateTotal: string;
    workscopeLabel: string;
    measurementData: Record<string, { label: string; value: string; unit: string }[]>;
    siteMeasures: { projectName: string; installedType: string; contractType: string; propertyType: string; selection: string; rating: string; messageToProduction: string };
    lineItems: { sort: string; type: string; product: string; qtyCost: string; qty: string; total: string; order: string; unitName: string; description: string }[];
  };
  notes: { id: string; type: string; message: string; author: string; initials: string; timestamp: string; hasEmail: boolean }[];
  payment: {
    financingOption: string;
    appliedDate: string;
    totalSavings: string;
    totalPaid: string;
    remaining: string;
    paymentsRecorded: number;
    paymentHistory: { date: string; amount: string; method: string }[];
    discounts: { id: string; name: string; description: string; checked: boolean; type: 'percent' | 'fixed'; percentValue?: number; amount?: string }[];
  };
  changeOrders: { date: string; order: string; type: string; desc: string; status: string; amount: string }[];
  production: {
    phases: { name: string; phaseNum: string; date: string; notes: string }[];
    internalNotes: string;
    materialLogistics: string;
    permitAllocation: string;
    requirementDetails: string;
    orderPlaced: string;
    expectedDelivery: string;
  };
  ordering: { itemName: string; color: string; unitPrice: string; qty: string; unit: string }[];
  orderingProducts: { productNumber: string; productLabel: string; productDescription: string; quantity: string; unit: string; vendor: string; isOrdered: string; orderNumber: string }[];
  subcontractor: { crewName: string; totalCost: string; rows: { service: string; description: string; installQty: string; qty: string; installCost: string }[] };
  expenses: { vendorName: string; invoiceDate: string; total: string }[];
  commission: { name: string; pay: string; adjust: string; net: string; paid: string; paidDate: string; remaining: string; status: string }[];
  services: { serviceId: string; installedType: string; status: string; pmName: string; totalValue: string }[];
}

const baseMeasurementData: Record<string, { label: string; value: string; unit: string }[]> = {
  roofing: [
    { label: 'Roof Area', value: '1,200', unit: 'sq ft' },
    { label: 'Low Slope', value: '80', unit: 'sq ft' },
    { label: 'Rakes', value: '120', unit: 'linear ft' },
    { label: 'Ridges', value: '65', unit: 'linear ft' },
    { label: 'Eaves', value: '18', unit: 'linear ft' },
    { label: 'Hips', value: '12', unit: 'linear ft' },
    { label: 'Valleys', value: '48', unit: 'linear ft' },
    { label: 'Total w/ Waste', value: '1,200', unit: 'sq ft' },
  ],
  'flat-roof': [
    { label: 'Flat Area', value: '80', unit: 'sq ft' },
    { label: 'Perimeter', value: '42', unit: 'linear ft' },
  ],
  'roof-cleaning': [
    { label: 'Cleaning Area', value: '1,200', unit: 'sq ft' },
  ],
};

const design1: DesignSet = {
  theme: 'blue',
  layoutVariant: 'default',
  header: { estimateNumber: 'EST-2026-001', title: 'Residential Roof Repair - Main St', status: 'Quoted', createdDate: '27/01/2026' },
  contact: { name: 'Marcus Yodkaset', contactId: 'C-8842', email: 'marcus.yodkaset@klauslarsen.com', phone: '+1 (555) 123-4567', address: '123 Main St', cityStateZip: 'Austin, TX 78701', teamMember: { name: 'Jane Doe', initials: 'JD', role: 'Project Manager' }, hasInsurance: true },
  details: [
    { label: 'Job Type', value: 'Roof Repair' },
    { label: 'Property', value: 'Residential' },
    { label: 'Address', value: '123 Main St, Austin, TX 78701' },
  ],
  statusPipeline: [
    { label: 'First Call', status: 'completed', date: '15/01/2026' },
    { label: 'Schedule', status: 'completed', date: '02/02/2026' },
    { label: 'Quoted', status: 'current', date: '27/01/2026' },
    { label: 'Sold', status: 'upcoming' },
    { label: 'Plan Start', status: 'upcoming' },
    { label: 'Plan End', status: 'upcoming' },
    { label: 'Permit Finalized', status: 'upcoming' },
    { label: 'Closed', status: 'upcoming' },
  ],
  progressTimeline: [
    { label: 'Estimate created', date: '27/01/2026', status: 'completed' },
    { label: 'Quote sent', date: '27/01/2026', status: 'completed' },
    { label: 'Awaiting approval', status: 'current' },
  ],
  workscopes: {
    estimateTotal: '$843.00',
    workscopeLabel: '1 IKO-Dynasty',
    measurementData: baseMeasurementData,
    siteMeasures: { projectName: 'Jared Cichon - Repair', installedType: 'Roof Repair', contractType: 'Repair', propertyType: 'House and Garage', selection: 'Klaus Roofing Systems', rating: 'Low', messageToProduction: '' },
    lineItems: [
      { sort: '1', type: 'Services', product: '001 Hauling', qtyCost: '495.00', qty: '1', total: '$495.00', order: '1', unitName: 'Job', description: 'Remove and dispose of all debris generated during project from premises.' },
      { sort: '2', type: 'Materials', product: '01 Dispose OLD SHINGLES (1 Layer)', qtyCost: '0.29', qty: '1,200', total: '$348.00', order: '2', unitName: 'Sq Ft', description: 'Tear off one layer of existing roofing materials.' },
      { sort: '3', type: 'Disclaimers', product: 'KRS System', qtyCost: '0.00', qty: '1,200', total: '$0.00', order: '3', unitName: 'Sq Ft', description: 'Install a Klaus Larsen Roofing System.' },
    ],
  },
  notes: [
    { id: '1', type: 'auto-log', message: 'Change Order ECOK_003 email sent to: marcus.yodkaset@klauslarsen.com.', author: 'Marcus Yodkaset', initials: 'MY', timestamp: '02/10/2026 08:01:44 PM', hasEmail: true },
    { id: '2', type: 'auto-log', message: 'Estimate status changed to Quoted.', author: 'System', initials: 'SY', timestamp: '01/27/2026 02:15:00 PM', hasEmail: false },
  ],
  payment: {
    financingOption: 'SF Standard (Level 0)',
    appliedDate: '13/2/2569',
    totalSavings: '$862.98',
    totalPaid: '$0.00',
    remaining: '$0.00',
    paymentsRecorded: 0,
    paymentHistory: [],
    discounts: [
      { id: 'same-day', name: '5% Same Day Discount', description: '5% discount for same day payment', checked: true, type: 'percent', percentValue: 5, amount: '$662.98' },
      { id: 'manager', name: 'Manager Discount', description: 'Manager-approved discount', checked: true, type: 'fixed', amount: '200' },
    ],
  },
  changeOrders: [],
  production: {
    phases: [
      { name: 'First Call', phaseNum: 'PHASE 01', date: '15/01/2026', notes: 'Test' },
      { name: 'Schedule', phaseNum: 'PHASE 02', date: '02/02/2026', notes: 'Test scheduled' },
      { name: 'Reminder', phaseNum: 'PHASE 03', date: '', notes: '' },
      { name: 'In Progress', phaseNum: 'PHASE 04', date: '', notes: '' },
      { name: 'Completion', phaseNum: 'PHASE 05', date: '', notes: '' },
    ],
    internalNotes: '',
    materialLogistics: '',
    permitAllocation: '',
    requirementDetails: '',
    orderPlaced: '',
    expectedDelivery: '',
  },
  ordering: [
    { itemName: 'GAF Timberline HDZ - Slate', color: 'Slate', unitPrice: '4.25', qty: '3135', unit: 'Sq Ft' },
  ],
  orderingProducts: [
    { productNumber: '4', productLabel: 'Products', productDescription: '1/2" Plywood CDX: Replacement', quantity: '1', unit: 'sheet', vendor: 'WH', isOrdered: '', orderNumber: '' },
    { productNumber: '5', productLabel: 'Products', productDescription: 'Renail Existing Plywood', quantity: '2', unit: 'box', vendor: 'KRS', isOrdered: '', orderNumber: '' },
    { productNumber: '6', productLabel: 'Products', productDescription: '01 Sealoron XT', quantity: '3', unit: 'rolls', vendor: 'KRS', isOrdered: '1', orderNumber: '1123' },
    { productNumber: '7', productLabel: 'Products', productDescription: 'SEALORON XT DECK TAPE', quantity: '1', unit: 'box', vendor: 'KRS', isOrdered: '', orderNumber: '' },
  ],
  subcontractor: {
    crewName: 'Crew A',
    totalCost: '2,450.00',
    rows: [
      { service: 'Tear-off', description: 'Remove existing shingles', installQty: '1', qty: '1', installCost: '650.00' },
      { service: 'Install', description: 'New shingle installation', installQty: '3135', qty: '3135', installCost: '1,800.00' },
    ],
  },
  expenses: [
    { vendorName: 'ABC Supply', invoiceDate: '02/01/2026', total: '1,200.00' },
  ],
  commission: [
    { name: 'John Smith', pay: '245.00', adjust: '0.00', net: '245.00', paid: '0.00', paidDate: '-', remaining: '245.00', status: 'Pending' },
  ],
  services: [
    { serviceId: 'SVC-001', installedType: 'Roofing', status: 'Scheduled', pmName: 'Jane Doe', totalValue: '12,450.00' },
  ],
};

const design2: DesignSet = {
  ...design1,
  theme: 'blue',
  layoutVariant: 'compact',
  header: { estimateNumber: 'EST-2026-002', title: 'GAF Timberline HDZ - Full Replacement', status: 'Sold', createdDate: '10/02/2026' },
  workscopes: {
    ...design1.workscopes,
    estimateTotal: '$12,450.00',
    workscopeLabel: '1 GAF Timberline HDZ',
    measurementData: {
      ...baseMeasurementData,
      roofing: [
        { label: 'Roof Area', value: '2,850', unit: 'sq ft' },
        { label: 'Low Slope', value: '120', unit: 'sq ft' },
        { label: 'Rakes', value: '180', unit: 'linear ft' },
        { label: 'Ridges', value: '95', unit: 'linear ft' },
        { label: 'Eaves', value: '24', unit: 'linear ft' },
        { label: 'Hips', value: '18', unit: 'linear ft' },
        { label: 'Valleys', value: '72', unit: 'linear ft' },
        { label: 'Total w/ Waste', value: '3,135', unit: 'sq ft' },
      ],
    },
    lineItems: [
      { sort: '1', type: 'Services', product: 'Debris Removal & Hauling', qtyCost: '650.00', qty: '1', total: '$650.00', order: '1', unitName: 'Job', description: 'Full tear-off and disposal.' },
      { sort: '2', type: 'Materials', product: 'GAF Timberline HDZ - Slate', qtyCost: '4.25', qty: '3,135', total: '$13,323.75', order: '2', unitName: 'Sq Ft', description: 'Premium architectural shingle.' },
      { sort: '3', type: 'Services', product: 'Ice & Water Shield', qtyCost: '1.85', qty: '120', total: '$222.00', order: '3', unitName: 'Sq Ft', description: 'Low slope areas.' },
    ],
  },
  payment: { ...design1.payment, totalPaid: '$3,112.50', remaining: '$9,337.50', paymentsRecorded: 1, paymentHistory: [{ date: '02/10/2026', amount: '$3,112.50', method: 'Deposit (25%)' }] },
  changeOrders: [{ date: '02/09/2026', order: 'ECO-101', type: 'Addition', desc: 'Skylight flashing repair', status: 'Pending', amount: '$385.00' }],
  statusPipeline: [
    { label: 'First Call', status: 'completed', date: '02/02/2026' },
    { label: 'Schedule', status: 'completed', date: '02/10/2026' },
    { label: 'Sold', status: 'current', date: '02/10/2026' },
    { label: 'Plan Start', status: 'upcoming' },
    { label: 'Closed', status: 'upcoming' },
  ],
};

const design3: DesignSet = {
  ...design1,
  theme: 'blue',
  layoutVariant: 'minimal',
  header: { estimateNumber: 'EST-2026-003', title: 'Elastomeric Coating - Commercial', status: 'Contracted', createdDate: '08/02/2026' },
  workscopes: {
    ...design1.workscopes,
    estimateTotal: '$28,900.00',
    workscopeLabel: 'Elastomeric System',
    measurementData: {
      roofing: baseMeasurementData.roofing,
      'flat-roof': [
        { label: 'Flat Area', value: '8,500', unit: 'sq ft' },
        { label: 'Perimeter', value: '420', unit: 'linear ft' },
      ],
      'roof-cleaning': [
        { label: 'Cleaning Area', value: '8,500', unit: 'sq ft' },
      ],
    },
    lineItems: [
      { sort: '1', type: 'Services', product: 'Roof Cleaning & Prep', qtyCost: '0.35', qty: '8,500', total: '$2,975.00', order: '1', unitName: 'Sq Ft', description: 'Power wash and repair prep.' },
      { sort: '2', type: 'Materials', product: 'Elastomeric Coating - White', qtyCost: '2.80', qty: '8,500', total: '$23,800.00', order: '2', unitName: 'Sq Ft', description: '2-coat system.' },
      { sort: '3', type: 'Services', product: 'Flashing & Sealant', qtyCost: '250.00', qty: '1', total: '$250.00', order: '3', unitName: 'Job', description: 'Perimeter and penetrations.' },
    ],
  },
  payment: { ...design1.payment, totalPaid: '$14,450.00', remaining: '$14,450.00', paymentsRecorded: 2, paymentHistory: [{ date: '02/01/2026', amount: '$8,670.00', method: 'Deposit (30%)' }, { date: '02/08/2026', amount: '$5,780.00', method: 'Contract signing' }] },
  statusPipeline: [
    { label: 'First Call', status: 'completed', date: '01/20/2026' },
    { label: 'Schedule', status: 'completed', date: '02/08/2026' },
    { label: 'Contracted', status: 'current', date: '02/08/2026' },
    { label: 'Plan Start', status: 'upcoming' },
    { label: 'Plan End', status: 'upcoming' },
    { label: 'Permit Finalized', status: 'upcoming' },
    { label: 'Closed', status: 'upcoming' },
  ],
};

const sets: Record<DesignId, DesignSet> = { 1: design1, 2: design2, 3: design3 };

export function getDesignSet(id: DesignId): DesignSet {
  return sets[id] ?? design1;
}
