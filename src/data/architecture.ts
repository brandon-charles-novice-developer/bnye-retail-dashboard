// Retail Media Dashboard — React Flow architecture
// Layout: horizontal left-to-right in 5 layers

const LAYER_X: Record<string, number> = {
  'data-source': 0,
  'processing': 220,
  'mode': 460,
  'visualization': 700,
  'output': 940,
}

const LAYER_SPACING_Y = 120
const LAYER_OFFSETS_Y: Record<string, number> = {
  'data-source': 20,
  'processing': 0,
  'mode': 80,
  'visualization': 0,
  'output': 60,
}

function pos(layer: string, index: number) {
  return {
    x: LAYER_X[layer],
    y: LAYER_OFFSETS_Y[layer] + index * LAYER_SPACING_Y,
  }
}

export const nodes = [
  // Data Source Layer
  { id: 'agency',    type: 'custom' as const, position: pos('data-source', 0), data: { label: 'Agency Data',       description: 'Client portfolios, contracts, seat assignments',                status: 'connected', category: 'data-source', tools: ['agency_api', 'contract_sync'] } },
  { id: 'campaigns', type: 'custom' as const, position: pos('data-source', 1), data: { label: 'Campaign Store',    description: 'Active campaigns, ad groups, packages, deals',                  status: 'connected', category: 'data-source', tools: ['campaign_fetch', 'deal_resolver'] } },
  { id: 'shopper',   type: 'custom' as const, position: pos('data-source', 2), data: { label: 'Shopper Signals',   description: 'Basket analysis, loyalty data, switching behavior',             status: 'connected', category: 'data-source', tools: ['basket_api', 'loyalty_sync'] } },

  // Processing Layer
  { id: 'kpi',       type: 'custom' as const, position: pos('processing', 0), data: { label: 'KPI Aggregator',    description: 'Computes ROAS, CPA, conversion rate across hierarchy levels',   status: 'running',   category: 'processing', tools: ['rollup_engine', 'metric_calculator'] } },
  { id: 'drill',     type: 'custom' as const, position: pos('processing', 1), data: { label: 'Drill-Down Engine', description: '7-level traversal: agency → client → campaign → deal',          status: 'running',   category: 'processing', connections: ['agency', 'campaigns'] } },
  { id: 'insights',  type: 'custom' as const, position: pos('processing', 2), data: { label: 'Shopper Insights',  description: 'Category propensity, basket association, brand switching',      status: 'connected', category: 'processing', connections: ['shopper'] } },

  // Mode Layer
  { id: 'exec',      type: 'custom' as const, position: pos('mode', 0), data: { label: 'Executive Mode',   description: 'KPI tiles, conversion trends, AI brief, portfolio summary',     status: 'connected', category: 'mode' } },
  { id: 'operator',  type: 'custom' as const, position: pos('mode', 1), data: { label: 'Operator Mode',    description: 'Breadcrumb drill-through, contextual metrics at each level',    status: 'connected', category: 'mode' } },

  // Visualization Layer
  { id: 'charts',    type: 'custom' as const, position: pos('visualization', 0), data: { label: 'Chart Components', description: '9 composable Recharts: bar, line, area, funnel, treemap',      status: 'connected', category: 'visualization', tools: ['BarChart', 'LineChart', 'FunnelChart', 'Treemap'] } },
  { id: 'saleslift', type: 'custom' as const, position: pos('visualization', 1), data: { label: 'Sales Lift Engine', description: 'Incremental vs expected vs observed measurement',                status: 'connected', category: 'visualization' } },
  { id: 'feed',      type: 'custom' as const, position: pos('visualization', 2), data: { label: 'Transaction Feed', description: 'Real-time transaction stream with status indicators',            status: 'running',   category: 'visualization' } },

  // Output Layer
  { id: 'dashboard', type: 'custom' as const, position: pos('output', 0), data: { label: 'Live Dashboard',   description: 'Glass UI with animated KPIs, gradient charts, responsive grid', status: 'connected', category: 'output' } },
  { id: 'export',    type: 'custom' as const, position: pos('output', 1), data: { label: 'Report Export',    description: 'CSV, PDF, and scheduled report delivery',                       status: 'idle',      category: 'output' } },
]

export const edges = [
  // Data Sources → Processing
  { id: 'e-agency-kpi',     source: 'agency',    target: 'kpi',       label: 'portfolios',   animated: true },
  { id: 'e-campaigns-kpi',  source: 'campaigns', target: 'kpi',       label: 'metrics',      animated: true },
  { id: 'e-agency-drill',   source: 'agency',    target: 'drill',     label: 'hierarchy',    animated: false },
  { id: 'e-campaigns-drill',source: 'campaigns', target: 'drill',     label: 'drill data',   animated: false },
  { id: 'e-shopper-insights',source: 'shopper',  target: 'insights',  label: 'signals',      animated: true },

  // Processing → Modes
  { id: 'e-kpi-exec',       source: 'kpi',       target: 'exec',      label: 'aggregated',   animated: true },
  { id: 'e-drill-operator',  source: 'drill',    target: 'operator',  label: 'navigation',   animated: true },
  { id: 'e-insights-exec',  source: 'insights',  target: 'exec',      label: 'intelligence', animated: false },

  // Modes → Visualization
  { id: 'e-exec-charts',    source: 'exec',      target: 'charts',    label: 'render',       animated: true },
  { id: 'e-operator-charts', source: 'operator', target: 'charts',    label: 'render',       animated: true },
  { id: 'e-exec-saleslift', source: 'exec',      target: 'saleslift', label: 'measurement',  animated: false },
  { id: 'e-operator-feed',  source: 'operator',  target: 'feed',      label: 'stream',       animated: true },

  // Visualization → Output
  { id: 'e-charts-dashboard', source: 'charts',  target: 'dashboard', label: 'compose',      animated: true },
  { id: 'e-saleslift-dash',   source: 'saleslift',target: 'dashboard',label: 'overlay',      animated: false },
  { id: 'e-feed-dash',        source: 'feed',    target: 'dashboard', label: 'live',         animated: true },
  { id: 'e-charts-export',    source: 'charts',  target: 'export',    label: 'snapshot',     animated: false },
]
