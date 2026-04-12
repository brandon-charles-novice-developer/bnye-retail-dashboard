export const agency = {
  id: 'ag-001',
  name: 'Meridian Media Group',
  fullName: 'Meridian Media Group — Retail Activation',
  platform: 'B.Nye Analytics HQ',
  seat: { name: 'Sarah Chen', title: 'VP, Media Strategy', initials: 'SC' },
  clientCount: 8,
  activeCampaigns: 23,
  activeAudienceReach: 42_500_000,
  kpis: {
    incrementalRevenue: 8_420_000,
    blendedRoas: 4.2,
    newBuyerLift: 18.7,
    avgConversionRate: 3.1,
    totalImpressions: 186_000_000,
  },
  impactBrief: {
    headline: 'Q1 Performance Exceeds Targets Across All Verticals',
    body: 'Blended ROAS improved 12% QoQ driven by audience optimization in CPG and beverage verticals. New buyer acquisition up 18.7% with expanded in-market targeting.',
    action: 'Review Q2 audience expansion proposal',
  },
};

export const agencyKpis = [
  { id: 'rev', label: 'Incremental Revenue', value: 8_420_000, format: '$' as const, delta: 12.3, deltaPositive: true },
  { id: 'roas', label: 'Blended ROAS', value: 4.2, format: 'x' as const, delta: 0.3, deltaPositive: true },
  { id: 'nbl', label: 'New Buyer Lift', value: 18.7, format: '%' as const, delta: 4.1, deltaPositive: true },
  { id: 'cvr', label: 'Avg Conv. Rate', value: 3.1, format: '%' as const, delta: -0.2, deltaPositive: false },
];
