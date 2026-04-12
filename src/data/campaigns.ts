export interface Campaign {
  id: string;
  clientId: string;
  name: string;
  status: string;
  flightStart: string;
  flightEnd: string;
  budget: number;
  spent: number;
  pacing: number;
  pacingStatus: string;
  buyingType: string;
  dsp: string;
  impressions: number;
  reach: number;
  frequency: number;
  metrics: {
    conversionRate: number;
    newBuyerRoas: number;
    salesLiftData: { week: string; observed: number; expected: number; incremental: number }[];
  };
}

export const campaigns: Campaign[] = [
  {
    id: 'cp-001', clientId: 'cl-001', name: 'Apex Summer Hydration', status: 'active',
    flightStart: '2026-03-01', flightEnd: '2026-05-31', budget: 450_000, spent: 312_000, pacing: 0.69, pacingStatus: 'on_track',
    buyingType: 'Managed', dsp: 'Platform A', impressions: 42_000_000, reach: 8_200_000, frequency: 5.1,
    metrics: { conversionRate: 3.8, newBuyerRoas: 5.4,
      salesLiftData: [
        { week: 'W1', observed: 142000, expected: 128000, incremental: 14000 },
        { week: 'W2', observed: 156000, expected: 130000, incremental: 26000 },
        { week: 'W3', observed: 168000, expected: 131000, incremental: 37000 },
        { week: 'W4', observed: 175000, expected: 132000, incremental: 43000 },
        { week: 'W5', observed: 183000, expected: 133000, incremental: 50000 },
        { week: 'W6', observed: 191000, expected: 134000, incremental: 57000 },
      ],
    },
  },
  {
    id: 'cp-002', clientId: 'cl-001', name: 'Apex Brand Awareness — CTV', status: 'active',
    flightStart: '2026-02-15', flightEnd: '2026-04-30', budget: 280_000, spent: 224_000, pacing: 0.80, pacingStatus: 'on_track',
    buyingType: 'Managed', dsp: 'Platform B', impressions: 18_000_000, reach: 6_500_000, frequency: 2.8,
    metrics: { conversionRate: 2.9, newBuyerRoas: 4.1,
      salesLiftData: [
        { week: 'W1', observed: 98000, expected: 92000, incremental: 6000 },
        { week: 'W2', observed: 104000, expected: 93000, incremental: 11000 },
        { week: 'W3', observed: 112000, expected: 94000, incremental: 18000 },
        { week: 'W4', observed: 118000, expected: 95000, incremental: 23000 },
      ],
    },
  },
  {
    id: 'cp-003', clientId: 'cl-002', name: 'Solara Spring Collection', status: 'active',
    flightStart: '2026-03-10', flightEnd: '2026-05-15', budget: 180_000, spent: 95_000, pacing: 0.53, pacingStatus: 'underpacing',
    buyingType: 'Self-Service', dsp: 'Platform A', impressions: 14_000_000, reach: 4_100_000, frequency: 3.4,
    metrics: { conversionRate: 2.6, newBuyerRoas: 3.5,
      salesLiftData: [
        { week: 'W1', observed: 62000, expected: 58000, incremental: 4000 },
        { week: 'W2', observed: 67000, expected: 59000, incremental: 8000 },
        { week: 'W3', observed: 71000, expected: 60000, incremental: 11000 },
      ],
    },
  },
  {
    id: 'cp-004', clientId: 'cl-003', name: 'Ironclad Q1 Performance', status: 'active',
    flightStart: '2026-01-15', flightEnd: '2026-03-31', budget: 520_000, spent: 498_000, pacing: 0.96, pacingStatus: 'on_track',
    buyingType: 'Managed', dsp: 'Platform C', impressions: 56_000_000, reach: 12_000_000, frequency: 4.7,
    metrics: { conversionRate: 4.5, newBuyerRoas: 6.8,
      salesLiftData: [
        { week: 'W1', observed: 210000, expected: 180000, incremental: 30000 },
        { week: 'W2', observed: 238000, expected: 182000, incremental: 56000 },
        { week: 'W3', observed: 265000, expected: 184000, incremental: 81000 },
        { week: 'W4', observed: 284000, expected: 185000, incremental: 99000 },
        { week: 'W5', observed: 301000, expected: 186000, incremental: 115000 },
      ],
    },
  },
];

export const campaignsByClient = (clientId: string) =>
  campaigns.filter(c => c.clientId === clientId);

export const campaignsById = Object.fromEntries(campaigns.map(c => [c.id, c]));
