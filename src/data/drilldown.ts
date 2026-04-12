// Levels 4-7: Ad Groups, Packages, Deals, Creatives
// Simplified but functional drill-down data

export interface AdGroup {
  id: string; campaignId: string; clientId: string; name: string;
  audienceType: string; audienceSegment: string; audienceSize: number;
  metrics: { conversionRate: number; impressions: number; spend: number };
}

export interface Package {
  id: string; adGroupId: string; campaignId: string; clientId: string; name: string;
  environment: string; format: string; budget: number; spent: number;
  impressions: number; cpm: number;
  metrics: { conversionRate: number; ctr: number };
}

export interface Deal {
  id: string; packageId: string; clientId: string; name: string;
  dealType: string; publisher: string; format: string;
  cpm: number; impressions: number; spend: number;
  metrics: { conversionRate: number; viewability: number };
}

export interface Creative {
  id: string; dealId: string; clientId: string; name: string;
  format: string; size: string; status: string;
  impressions: number;
  metrics: { conversionRate: number; completionRate: number; ctr: number };
}

export const adGroups: AdGroup[] = [
  { id: 'ag-001', campaignId: 'cp-001', clientId: 'cl-001', name: 'In-Market Hydration Seekers', audienceType: 'In-Market', audienceSegment: 'Sports Drinks & Hydration', audienceSize: 2_400_000, metrics: { conversionRate: 4.2, impressions: 18_000_000, spend: 142_000 } },
  { id: 'ag-002', campaignId: 'cp-001', clientId: 'cl-001', name: 'Lifestyle — Active Wellness', audienceType: 'Lifestyle', audienceSegment: 'Fitness & Outdoor', audienceSize: 3_100_000, metrics: { conversionRate: 3.1, impressions: 14_000_000, spend: 98_000 } },
  { id: 'ag-003', campaignId: 'cp-001', clientId: 'cl-001', name: 'Purchase-Based Repeat Buyers', audienceType: 'Purchase-Based', audienceSegment: 'Repeat Buyers 90d', audienceSize: 890_000, metrics: { conversionRate: 5.8, impressions: 10_000_000, spend: 72_000 } },
  { id: 'ag-004', campaignId: 'cp-004', clientId: 'cl-003', name: 'CTV Sports Enthusiasts', audienceType: 'In-Market', audienceSegment: 'Athletic Equipment', audienceSize: 5_200_000, metrics: { conversionRate: 4.8, impressions: 32_000_000, spend: 286_000 } },
];

export const packages: Package[] = [
  { id: 'pk-001', adGroupId: 'ag-001', campaignId: 'cp-001', clientId: 'cl-001', name: 'CTV — 30s Pre-Roll', environment: 'CTV', format: ':30 Video', budget: 80_000, spent: 72_000, impressions: 8_000_000, cpm: 9.00, metrics: { conversionRate: 4.5, ctr: 0.82 } },
  { id: 'pk-002', adGroupId: 'ag-001', campaignId: 'cp-001', clientId: 'cl-001', name: 'Display — Standard IAB', environment: 'Display', format: '300x250, 728x90', budget: 62_000, spent: 58_000, impressions: 10_000_000, cpm: 5.80, metrics: { conversionRate: 3.8, ctr: 0.34 } },
  { id: 'pk-003', adGroupId: 'ag-004', campaignId: 'cp-004', clientId: 'cl-003', name: 'CTV — 15s & 30s Mix', environment: 'CTV', format: ':15/:30 Video', budget: 180_000, spent: 172_000, impressions: 18_000_000, cpm: 9.56, metrics: { conversionRate: 5.1, ctr: 0.91 } },
];

export const deals: Deal[] = [
  { id: 'dl-001', packageId: 'pk-001', clientId: 'cl-001', name: 'PMP — Premium Sports', dealType: 'PMP', publisher: 'StreamMax', format: ':30 CTV', cpm: 12.40, impressions: 4_200_000, spend: 52_080, metrics: { conversionRate: 4.8, viewability: 96 } },
  { id: 'dl-002', packageId: 'pk-001', clientId: 'cl-001', name: 'PG — News & Lifestyle', dealType: 'PG', publisher: 'MediaCore', format: ':30 CTV', cpm: 8.20, impressions: 3_800_000, spend: 31_160, metrics: { conversionRate: 4.1, viewability: 92 } },
  { id: 'dl-003', packageId: 'pk-003', clientId: 'cl-003', name: 'IO — Sports Direct', dealType: 'IO', publisher: 'AthleteNet', format: ':15/:30 CTV', cpm: 10.80, impressions: 10_000_000, spend: 108_000, metrics: { conversionRate: 5.4, viewability: 97 } },
];

export const creatives: Creative[] = [
  { id: 'cr-001', dealId: 'dl-001', clientId: 'cl-001', name: 'Hydration Hero — 30s', format: 'Video', size: '1920x1080', status: 'active', impressions: 2_800_000, metrics: { conversionRate: 5.1, completionRate: 94, ctr: 0.88 } },
  { id: 'cr-002', dealId: 'dl-001', clientId: 'cl-001', name: 'Summer Splash — 30s', format: 'Video', size: '1920x1080', status: 'active', impressions: 1_400_000, metrics: { conversionRate: 4.3, completionRate: 91, ctr: 0.76 } },
  { id: 'cr-003', dealId: 'dl-003', clientId: 'cl-003', name: 'Game Day Gear — 15s', format: 'Video', size: '1920x1080', status: 'active', impressions: 6_000_000, metrics: { conversionRate: 5.6, completionRate: 88, ctr: 0.95 } },
];

// Lookup helpers
export const adGroupsByCampaign = (campaignId: string) => adGroups.filter(a => a.campaignId === campaignId);
export const packagesByAdGroup = (adGroupId: string) => packages.filter(p => p.adGroupId === adGroupId);
export const dealsByPackage = (packageId: string) => deals.filter(d => d.packageId === packageId);
export const dealsByClient = (clientId: string) => deals.filter(d => d.clientId === clientId);
export const creativesByDeal = (dealId: string) => creatives.filter(c => c.dealId === dealId);
