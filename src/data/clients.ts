export interface Client {
  id: string;
  name: string;
  vertical: string;
  logoColor: string;
  buyingType: string;
  channels: string[];
  status: string;
  metrics: {
    conversionRate: number;
    conversionRateVsBenchmark: number;
    newBuyerRoas: number;
    newBuyerCpa: number;
    incrementalRevenue: number;
    activeCampaigns: number;
    onlineSplit: number;
    inStoreSplit: number;
  };
}

export const clients: Client[] = [
  {
    id: 'cl-001', name: 'Apex Beverages', vertical: 'CPG — Beverages', logoColor: '#22D4BF',
    buyingType: 'Managed', channels: ['CTV', 'Display', 'Video'], status: 'active',
    metrics: { conversionRate: 3.4, conversionRateVsBenchmark: 1.21, newBuyerRoas: 5.1, newBuyerCpa: 12.80, incrementalRevenue: 2_180_000, activeCampaigns: 6, onlineSplit: 62, inStoreSplit: 38 },
  },
  {
    id: 'cl-002', name: 'Solara Cosmetics', vertical: 'Beauty & Personal Care', logoColor: '#C4B5FD',
    buyingType: 'Self-Service', channels: ['Display', 'Social'], status: 'active',
    metrics: { conversionRate: 2.8, conversionRateVsBenchmark: 0.98, newBuyerRoas: 3.7, newBuyerCpa: 18.20, incrementalRevenue: 1_450_000, activeCampaigns: 4, onlineSplit: 78, inStoreSplit: 22 },
  },
  {
    id: 'cl-003', name: 'Ironclad Athletics', vertical: 'Sporting Goods', logoColor: '#5C70D6',
    buyingType: 'Managed', channels: ['CTV', 'Video'], status: 'active',
    metrics: { conversionRate: 4.1, conversionRateVsBenchmark: 1.46, newBuyerRoas: 6.3, newBuyerCpa: 9.50, incrementalRevenue: 1_920_000, activeCampaigns: 5, onlineSplit: 45, inStoreSplit: 55 },
  },
  {
    id: 'cl-004', name: 'Verdant Foods', vertical: 'CPG — Food', logoColor: '#22C55E',
    buyingType: 'Managed', channels: ['Display', 'CTV', 'Audio'], status: 'active',
    metrics: { conversionRate: 2.6, conversionRateVsBenchmark: 0.93, newBuyerRoas: 3.2, newBuyerCpa: 21.40, incrementalRevenue: 980_000, activeCampaigns: 3, onlineSplit: 34, inStoreSplit: 66 },
  },
  {
    id: 'cl-005', name: 'Luminos Electronics', vertical: 'Consumer Electronics', logoColor: '#F59E0B',
    buyingType: 'Self-Service', channels: ['Display', 'Video', 'Social'], status: 'active',
    metrics: { conversionRate: 1.9, conversionRateVsBenchmark: 0.68, newBuyerRoas: 2.8, newBuyerCpa: 32.10, incrementalRevenue: 720_000, activeCampaigns: 2, onlineSplit: 88, inStoreSplit: 12 },
  },
  {
    id: 'cl-006', name: 'Crestline Home', vertical: 'Home & Garden', logoColor: '#EF4444',
    buyingType: 'Managed', channels: ['CTV', 'Display'], status: 'paused',
    metrics: { conversionRate: 3.0, conversionRateVsBenchmark: 1.07, newBuyerRoas: 4.0, newBuyerCpa: 15.60, incrementalRevenue: 640_000, activeCampaigns: 1, onlineSplit: 52, inStoreSplit: 48 },
  },
  {
    id: 'cl-007', name: 'Nordic Pet Supply', vertical: 'Pet Care', logoColor: '#8B5CF6',
    buyingType: 'Self-Service', channels: ['Display'], status: 'active',
    metrics: { conversionRate: 3.8, conversionRateVsBenchmark: 1.36, newBuyerRoas: 5.5, newBuyerCpa: 10.90, incrementalRevenue: 380_000, activeCampaigns: 1, onlineSplit: 70, inStoreSplit: 30 },
  },
  {
    id: 'cl-008', name: 'Tideline Pharma', vertical: 'Health & Wellness', logoColor: '#06B6D4',
    buyingType: 'Managed', channels: ['CTV', 'Video', 'Display'], status: 'active',
    metrics: { conversionRate: 2.2, conversionRateVsBenchmark: 0.79, newBuyerRoas: 3.0, newBuyerCpa: 24.30, incrementalRevenue: 150_000, activeCampaigns: 1, onlineSplit: 60, inStoreSplit: 40 },
  },
];

export const clientsById = Object.fromEntries(clients.map(c => [c.id, c]));
