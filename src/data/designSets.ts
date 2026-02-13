/** Design 1 | 2 | 3 - full mock data per estimate set */
export type DesignId = 1 | 2 | 3;

/** Theme: Design 1 = blue (default), Design 2 = emerald, Design 3 = violet */
export type DesignTheme = 'blue' | 'emerald' | 'violet';

/** UI layout variant: different header, tabs, and summary layout per design */
export type LayoutVariant = 'default' | 'compact' | 'minimal';

export interface DesignSet {
  theme: DesignTheme;
  layoutVariant: LayoutVariant;
  header: {
    estimateNumber: string;
    title: string;
    status: string;
    createdDate: string;
  };
  details: { label: string; value: string }[];
  contact: {
    name: string;
    contactId: string;
    email: string;
    phone: string;
    address: string;
    cityStateZip: string;
    teamMember: { name: string; role: string; initials: string };
    hasInsurance: boolean;
  };
  statusPipeline: { label: string; status: 'completed' | 'current' | 'upcoming'; date?: string }[];
  progressTimeline: { label: string; date?: string; status: 'completed' | 'current' | 'upcoming' }[];
  workscopes: {
    estimateTotal: string;
    workscopeLabel: string;
    measurementData: Record<string, { label: string; value: string; unit: string }[]>;
    lineItems: { sort: string; type: string; product: string; qtyCost: string; qty: string; total: string; description: string }[];
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
  expenses: { vendorName: string; invoiceDate: string; total: string }[];
  subcontractor: {
    crewName: string;
    totalCost: string;
    rows: { service: string; description: string; installQty: string; qty: string; installCost: string }[];
  };
  commission: { name: string; pay: string; adjust: string; net: string; paid: string; paidDate: string; remaining: string; status: string }[];
  services: { serviceId: string; installedType: string; status: string; pmName: string; totalValue: string }[];
}

const baseMeasurementData = {
  roofing: [
    { label: 'Roof Area', value: '1,200', unit: 'sq ft' },
    { label: 'Low Slope', value: '0', unit: 'sq ft' },
    { label: 'Rakes', value: '120', unit: 'linear ft' },
    { label: 'Ridges', value: '50', unit: 'linear ft' },
    { label: 'Eaves', value: '12', unit: 'linear ft' },
    { label: 'Hips', value: '10', unit: 'linear ft' },
    { label: 'Valleys', value: '50', unit: 'linear ft' },
    { label: 'Total w/ Waste', value: '1,320', unit: 'sq ft' },
  ],
  'flat-roof': [
    { label: 'Flat Area', value: '0', unit: 'sq ft' },
    { label: 'Perimeter', value: '0', unit: 'linear ft' },
  ],
  'roof-cleaning': [
    { label: 'Cleaning Area', value: '0', unit: 'sq ft' },
  ],
};

export const DESIGN_SETS: Record<DesignId, DesignSet> = {
  1: {
    theme: 'blue',
    layoutVariant: 'default',
    header: {
      estimateNumber: 'EST-449271',
      title: 'Roof Replacement — Tester Larsen',
      status: 'Quoted',
      createdDate: 'Jan 6, 2026',
    },
    details: [
      { label: 'Install Type', value: 'Roof Replacement' },
      { label: 'Property', value: 'House' },
      { label: 'Estimate Title', value: "Tester's Roof Replacement" },
      { label: 'Selection', value: 'Klaus Roofing Systems' },
      { label: 'Rating', value: 'Average' },
    ],
    contact: {
      name: 'Tester Larsen',
      contactId: 'CB0001XUGEF1LS',
      email: 'marcus.yodkaset@klauslarsen.com',
      phone: '(773) 461-7878',
      address: '503 North Windham Road',
      cityStateZip: 'North Windham, CT 06256',
      teamMember: { name: 'Rene Godbout', role: 'Project Manager', initials: 'RG' },
      hasInsurance: false,
    },
    statusPipeline: [
      { label: 'Open', status: 'completed', date: 'Jan 6' },
      { label: 'Quoted', status: 'current', date: 'Jan 27' },
      { label: 'Sold', status: 'upcoming' },
      { label: 'Contracted', status: 'upcoming' },
      { label: 'Closed', status: 'upcoming' },
    ],
    progressTimeline: [
      { label: 'Open', date: 'January 6, 2026', status: 'completed' },
      { label: 'Quoted', date: 'January 27, 2026', status: 'current' },
      { label: 'Sold', status: 'upcoming' },
      { label: 'Contracted', status: 'upcoming' },
      { label: 'Material Order', status: 'upcoming' },
      { label: 'Plan Start', status: 'upcoming' },
      { label: 'Plan End', status: 'upcoming' },
      { label: 'Permit Finalized', status: 'upcoming' },
      { label: 'Closed', status: 'upcoming' },
    ],
    workscopes: {
      estimateTotal: '$843.00',
      workscopeLabel: '1 IKO-Dynasty',
      measurementData: baseMeasurementData,
      lineItems: [
        { sort: '1', type: 'Services', product: '001 Hauling', qtyCost: '495.00', qty: '1', total: '$495.00', description: 'Remove and dispose of all debris generated during project from premises.' },
        { sort: '2', type: 'Materials', product: '01 Dispose OLD SHINGLES (1 Layer)', qtyCost: '0.29', qty: '1,200', total: '$348.00', description: 'Tear off one layer of existing roofing materials.' },
        { sort: '3', type: 'Disclaimers', product: 'KRS System', qtyCost: '0.00', qty: '1,200', total: '$0.00', description: 'Install a Klaus Larsen Roofing System.' },
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
    changeOrders: [
      { date: '02/08/2026', order: 'ECO-001', type: 'Addition', desc: 'Extra ridge vent', status: 'Approved', amount: '$245.00' },
    ],
    production: {
      phases: [
        { name: 'First Call', phaseNum: 'PHASE 01', date: '15/01/2026', notes: 'Test' },
        { name: 'Schedule', phaseNum: 'PHASE 02', date: '02/02/2026', notes: 'Test scheduled' },
        { name: 'Reminder', phaseNum: 'PHASE 03', date: '', notes: '' },
        { name: 'In Progress', phaseNum: 'PHASE 04', date: '', notes: '' },
        { name: 'Completion', phaseNum: 'PHASE 05', date: '', notes: '' },
      ],
      internalNotes: 'This is note for production.',
      materialLogistics: 'Delivery to driveway. No special access.',
      permitAllocation: '0.00',
      requirementDetails: 'Standard residential permit.',
      orderPlaced: '28/01/2026',
      expectedDelivery: '05/02/2026',
    },
    ordering: [
      { itemName: 'IKO Dynasty Shingle - Weathered Wood', color: 'Weathered Wood', unitPrice: '98.50', qty: '45', unit: 'sq' },
      { itemName: 'Ridge Cap - Weathered Wood', color: 'Weathered Wood', unitPrice: '12.00', qty: '8', unit: 'pcs' },
    ],
    expenses: [
      { vendorName: 'ABC Supply Co.', invoiceDate: '01/15/2026', total: '$4,230.00' },
      { vendorName: 'Waste Hauling Inc.', invoiceDate: '02/01/2026', total: '$495.00' },
    ],
    subcontractor: {
      crewName: 'North Crew - Team 1',
      totalCost: '3,150.55',
      rows: [
        { service: 'Tear-off', description: 'Remove existing shingles', installQty: '1,200', qty: '1', installCost: '$1,200.00' },
        { service: 'Install', description: 'IKO Dynasty full install', installQty: '1,200', qty: '1', installCost: '$1,950.55' },
      ],
    },
    commission: [
      { name: 'Sarah Chen', pay: '450.00', adjust: '0.00', net: '450.00', paid: '0.00', paidDate: '-', remaining: '450.00', status: 'Pending' },
      { name: 'Mike Torres', pay: '280.00', adjust: '0.00', net: '280.00', paid: '280.00', paidDate: '02/10/2026', remaining: '0.00', status: 'Paid' },
    ],
    services: [
      { serviceId: 'SVC-1001', installedType: 'Roof Replacement', status: 'Scheduled', pmName: 'Rene Godbout', totalValue: '$18,500.00' },
      { serviceId: 'SVC-1002', installedType: 'Gutter Install', status: 'Pending', pmName: 'Rene Godbout', totalValue: '$1,200.00' },
    ],
  },
  2: {
    theme: 'blue',
    layoutVariant: 'compact',
    header: {
      estimateNumber: 'EST-552882',
      title: 'Full Reroof — Martinez Family',
      status: 'Sold',
      createdDate: 'Feb 2, 2026',
    },
    details: [
      { label: 'Install Type', value: 'Full Reroof' },
      { label: 'Property', value: 'Residential · 2-Story' },
      { label: 'Estimate Title', value: "Martinez Home — 2-Story" },
      { label: 'Selection', value: 'GAF Timberline HDZ' },
      { label: 'Rating', value: 'Premium' },
      { label: 'Warranty', value: 'Golden Pledge 50-Year' },
    ],
    contact: {
      name: 'Carlos Martinez',
      contactId: 'CB0002YMHF2MS',
      email: 'carlos.martinez@email.com',
      phone: '(512) 889-3344',
      address: '1200 Oak Lane',
      cityStateZip: 'Austin, TX 78701',
      teamMember: { name: 'Jamie Lee', role: 'Sales Lead', initials: 'JL' },
      hasInsurance: true,
    },
    statusPipeline: [
      { label: 'Open', status: 'completed', date: 'Feb 2' },
      { label: 'Quoted', status: 'completed', date: 'Feb 5' },
      { label: 'Sold', status: 'current', date: 'Feb 10' },
      { label: 'Contracted', status: 'upcoming' },
      { label: 'Closed', status: 'upcoming' },
    ],
    progressTimeline: [
      { label: 'Open', date: 'February 2, 2026', status: 'completed' },
      { label: 'Quoted', date: 'February 5, 2026', status: 'completed' },
      { label: 'Sold', date: 'February 10, 2026', status: 'current' },
      { label: 'Contracted', status: 'upcoming' },
      { label: 'Material Order', status: 'upcoming' },
      { label: 'Plan Start', status: 'upcoming' },
      { label: 'Plan End', status: 'upcoming' },
      { label: 'Permit Finalized', status: 'upcoming' },
      { label: 'Closed', status: 'upcoming' },
    ],
    workscopes: {
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
        { sort: '1', type: 'Services', product: 'Debris Removal & Hauling', qtyCost: '650.00', qty: '1', total: '$650.00', description: 'Full tear-off and disposal.' },
        { sort: '2', type: 'Materials', product: 'GAF Timberline HDZ - Slate', qtyCost: '4.25', qty: '3,135', total: '$13,323.75', description: 'Premium architectural shingle.' },
        { sort: '3', type: 'Services', product: 'Ice & Water Shield', qtyCost: '1.85', qty: '120', total: '$222.00', description: 'Low slope areas.' },
      ],
    },
    notes: [
      { id: '1', type: 'manual', message: 'Customer confirmed color: Slate. Deposit received.', author: 'Jamie Lee', initials: 'JL', timestamp: '02/10/2026 11:30 AM', hasEmail: false },
      { id: '2', type: 'auto-log', message: 'Estimate status changed to Sold.', author: 'System', initials: 'SY', timestamp: '02/10/2026 09:00:00 AM', hasEmail: false },
    ],
    payment: {
      financingOption: 'SF Premium (Level 2)',
      appliedDate: '10/02/2026',
      totalSavings: '$1,245.00',
      totalPaid: '$3,112.50',
      remaining: '$9,337.50',
      paymentsRecorded: 1,
      paymentHistory: [
        { date: '02/10/2026', amount: '$3,112.50', method: 'Deposit (25%)' },
      ],
      discounts: [
        { id: 'early-bird', name: 'Early Bird 5%', description: 'Book within 7 days', checked: true, type: 'percent', percentValue: 5, amount: '$622.50' },
        { id: 'referral', name: 'Referral Discount', description: 'Customer referral', checked: true, type: 'fixed', amount: '$200' },
      ],
    },
    changeOrders: [
      { date: '02/09/2026', order: 'ECO-101', type: 'Addition', desc: 'Skylight flashing repair', status: 'Pending', amount: '$385.00' },
      { date: '02/05/2026', order: 'ECO-100', type: 'Credit', desc: 'Waive hauling upgrade', status: 'Approved', amount: '-$150.00' },
    ],
    production: {
      phases: [
        { name: 'First Call', phaseNum: 'PHASE 01', date: '02/02/2026', notes: 'Initial inspection' },
        { name: 'Schedule', phaseNum: 'PHASE 02', date: '02/10/2026', notes: 'Start 02/24' },
        { name: 'Reminder', phaseNum: 'PHASE 03', date: '02/20/2026', notes: 'Send reminder' },
        { name: 'In Progress', phaseNum: 'PHASE 04', date: '', notes: '' },
        { name: 'Completion', phaseNum: 'PHASE 05', date: '', notes: '' },
      ],
      internalNotes: 'Two-story — need extra staging. HOA approval on file.',
      materialLogistics: 'Gate code 4521. Leave pallets on driveway.',
      permitAllocation: '285.00',
      requirementDetails: 'City of Austin permit #2026-8842.',
      orderPlaced: '12/02/2026',
      expectedDelivery: '22/02/2026',
    },
    ordering: [
      { itemName: 'GAF Timberline HDZ - Slate', color: 'Slate', unitPrice: '4.25', qty: '95', unit: 'sq' },
      { itemName: 'Ridge Cap - Slate', color: 'Slate', unitPrice: '14.00', qty: '12', unit: 'pcs' },
      { itemName: 'Ice & Water Shield', color: 'N/A', unitPrice: '1.85', qty: '4', unit: 'roll' },
    ],
    expenses: [
      { vendorName: 'GAF Materials', invoiceDate: '02/12/2026', total: '$8,920.00' },
      { vendorName: 'ABC Dumpsters', invoiceDate: '02/14/2026', total: '$420.00' },
      { vendorName: 'City Permit', invoiceDate: '02/10/2026', total: '$285.00' },
    ],
    subcontractor: {
      crewName: 'South Austin Crew',
      totalCost: '5,200.00',
      rows: [
        { service: 'Tear-off', description: '2-layer removal', installQty: '2,850', qty: '1', installCost: '$2,100.00' },
        { service: 'Install', description: 'GAF HDZ full install', installQty: '3,135', qty: '1', installCost: '$3,100.00' },
      ],
    },
    commission: [
      { name: 'Jamie Lee', pay: '620.00', adjust: '0.00', net: '620.00', paid: '0.00', paidDate: '-', remaining: '620.00', status: 'Pending' },
    ],
    services: [
      { serviceId: 'SVC-2001', installedType: 'Full Reroof', status: 'Sold', pmName: 'Jamie Lee', totalValue: '$12,450.00' },
      { serviceId: 'SVC-2002', installedType: 'Skylight Flashing', status: 'Change Order', pmName: 'Jamie Lee', totalValue: '$385.00' },
    ],
  },
  3: {
    theme: 'blue',
    layoutVariant: 'minimal',
    header: {
      estimateNumber: 'EST-661993',
      title: 'Roof Repair & Coating — Parkview HOA',
      status: 'Contracted',
      createdDate: 'Jan 20, 2026',
    },
    details: [
      { label: 'Project Type', value: 'Repair & Coating' },
      { label: 'Property Type', value: 'Commercial · HOA' },
      { label: 'Estimate Title', value: 'Parkview Commons — Bldg A' },
      { label: 'System', value: 'Elastomeric Coating (2-Coat)' },
      { label: 'Compliance', value: 'Commercial · Denver Code' },
    ],
    contact: {
      name: 'Parkview HOA / Lisa Wong',
      contactId: 'CB0003ZNKF3PW',
      email: 'lisa.wong@parkviewhoa.com',
      phone: '(303) 555-1200',
      address: '4500 Parkview Blvd, Bldg A',
      cityStateZip: 'Denver, CO 80202',
      teamMember: { name: 'Tom Bradley', role: 'Commercial PM', initials: 'TB' },
      hasInsurance: true,
    },
    statusPipeline: [
      { label: 'Open', status: 'completed', date: 'Jan 20' },
      { label: 'Quoted', status: 'completed', date: 'Jan 28' },
      { label: 'Sold', status: 'completed', date: 'Feb 1' },
      { label: 'Contracted', status: 'current', date: 'Feb 8' },
      { label: 'Closed', status: 'upcoming' },
    ],
    progressTimeline: [
      { label: 'Open', date: 'January 20, 2026', status: 'completed' },
      { label: 'Quoted', date: 'January 28, 2026', status: 'completed' },
      { label: 'Sold', date: 'February 1, 2026', status: 'completed' },
      { label: 'Contracted', date: 'February 8, 2026', status: 'current' },
      { label: 'Material Order', date: 'February 9, 2026', status: 'completed' },
      { label: 'Plan Start', status: 'upcoming' },
      { label: 'Plan End', status: 'upcoming' },
      { label: 'Permit Finalized', status: 'upcoming' },
      { label: 'Closed', status: 'upcoming' },
    ],
    workscopes: {
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
        { sort: '1', type: 'Services', product: 'Roof Cleaning & Prep', qtyCost: '0.35', qty: '8,500', total: '$2,975.00', description: 'Power wash and repair prep.' },
        { sort: '2', type: 'Materials', product: 'Elastomeric Coating - White', qtyCost: '2.80', qty: '8,500', total: '$23,800.00', description: '2-coat system.' },
        { sort: '3', type: 'Services', product: 'Flashing & Sealant', qtyCost: '250.00', qty: '1', total: '$250.00', description: 'Perimeter and penetrations.' },
      ],
    },
    notes: [
      { id: '1', type: 'auto-log', message: 'Contract signed. PO #PO-2026-8842 attached.', author: 'Tom Bradley', initials: 'TB', timestamp: '02/08/2026 03:45 PM', hasEmail: true },
      { id: '2', type: 'manual', message: 'HOA board approved. Start date 02/25.', author: 'Lisa Wong', initials: 'LW', timestamp: '02/07/2026 10:00 AM', hasEmail: false },
    ],
    payment: {
      financingOption: 'None',
      appliedDate: '-',
      totalSavings: '$0.00',
      totalPaid: '$14,450.00',
      remaining: '$14,450.00',
      paymentsRecorded: 2,
      paymentHistory: [
        { date: '02/01/2026', amount: '$8,670.00', method: 'Deposit (30%)' },
        { date: '02/08/2026', amount: '$5,780.00', method: 'Contract signing' },
      ],
      discounts: [],
    },
    changeOrders: [
      { date: '02/05/2026', order: 'ECO-201', type: 'Addition', desc: 'Additional drain repair', status: 'Approved', amount: '$1,200.00' },
    ],
    production: {
      phases: [
        { name: 'First Call', phaseNum: 'PHASE 01', date: '01/20/2026', notes: 'Site walk' },
        { name: 'Schedule', phaseNum: 'PHASE 02', date: '02/08/2026', notes: 'Start 02/25' },
        { name: 'Reminder', phaseNum: 'PHASE 03', date: '02/22/2026', notes: 'HOA notice sent' },
        { name: 'In Progress', phaseNum: 'PHASE 04', date: '', notes: '' },
        { name: 'Completion', phaseNum: 'PHASE 05', date: '', notes: '' },
      ],
      internalNotes: 'Commercial — safety plan required. No weekend work per HOA.',
      materialLogistics: 'Loading dock at rear. Coordinate with property manager.',
      permitAllocation: '450.00',
      requirementDetails: 'Denver commercial roofing permit.',
      orderPlaced: '09/02/2026',
      expectedDelivery: '24/02/2026',
    },
    ordering: [
      { itemName: 'Elastomeric Coating - White', color: 'White', unitPrice: '2.80', qty: '220', unit: 'gal' },
      { itemName: 'Primer', color: 'N/A', unitPrice: '0.45', qty: '85', unit: 'gal' },
      { itemName: 'Sealant - 10 gal', color: 'N/A', unitPrice: '185.00', qty: '2', unit: 'pail' },
    ],
    expenses: [
      { vendorName: 'Coating Supply Co.', invoiceDate: '02/09/2026', total: '$18,200.00' },
      { vendorName: 'Safety Equip Rentals', invoiceDate: '02/20/2026', total: '$1,100.00' },
    ],
    subcontractor: {
      crewName: 'Denver Commercial Crew',
      totalCost: '8,500.00',
      rows: [
        { service: 'Cleaning', description: 'Prep and clean 8,500 sq ft', installQty: '8,500', qty: '1', installCost: '$2,200.00' },
        { service: 'Coating', description: '2-coat elastomeric', installQty: '8,500', qty: '1', installCost: '$6,300.00' },
      ],
    },
    commission: [
      { name: 'Tom Bradley', pay: '1,150.00', adjust: '0.00', net: '1,150.00', paid: '0.00', paidDate: '-', remaining: '1,150.00', status: 'Pending' },
    ],
    services: [
      { serviceId: 'SVC-3001', installedType: 'Roof Coating', status: 'Contracted', pmName: 'Tom Bradley', totalValue: '$28,900.00' },
      { serviceId: 'SVC-3002', installedType: 'Drain Repair', status: 'Change Order', pmName: 'Tom Bradley', totalValue: '$1,200.00' },
    ],
  },
};

export function getDesignSet(id: DesignId): DesignSet {
  return DESIGN_SETS[id];
}
