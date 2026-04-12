import { useParams, useNavigate } from 'react-router-dom';
import { clientsById } from '../../data/clients';
import { campaignsById } from '../../data/campaigns';
import { adGroupsByCampaign } from '../../data/drilldown';
import { Breadcrumb } from '../shared/Breadcrumb';
import { MetricCard } from '../shared/MetricCard';
import { StatusBadge } from '../shared/StatusBadge';
import { fmt } from '../../utils/fmt';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CampaignView() {
  const { clientId, campaignId } = useParams();
  const navigate = useNavigate();
  const client = clientsById[clientId!];
  const campaign = campaignsById[campaignId!];
  const adGroups = adGroupsByCampaign(campaignId!);

  if (!client || !campaign) return <div className="p-8 text-text-muted">Not found</div>;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-6">
      <Breadcrumb crumbs={[
        { label: 'Clients', path: '/manager' },
        { label: client.name, path: `/manager/${clientId}` },
        { label: campaign.name },
      ]} />

      <div className="flex items-center gap-3">
        <h2 className="text-[var(--step-2)] font-bold text-text-primary">{campaign.name}</h2>
        <StatusBadge status={campaign.pacingStatus} />
      </div>
      <p className="text-[var(--step--1)] text-text-muted">{campaign.dsp} · {campaign.buyingType} · {campaign.flightStart} → {campaign.flightEnd}</p>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="Conv. Rate" value={campaign.metrics.conversionRate} format="%" delay={0} />
        <MetricCard label="New Buyer ROAS" value={campaign.metrics.newBuyerRoas} format="x" delay={100} />
        <MetricCard label="Impressions" value={campaign.impressions} format="#" delay={200} />
        <MetricCard label="Reach" value={campaign.reach} format="#" delay={300} />
      </div>

      {/* Sales Lift Chart */}
      <div className="glass-card p-6">
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Sales Lift — Incremental Revenue</p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={campaign.metrics.salesLiftData} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="incGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#166534" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#166534" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#1A1A2E' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#1A1A2E' }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, '$')} />
            <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8, fontSize: 12, color: '#1A1A2E', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => [fmt(Number(v), '$')]} />
            <Area type="monotone" dataKey="incremental" stroke="#166534" strokeWidth={2} fill="url(#incGradient)" dot={false} />
            <Area type="monotone" dataKey="observed" stroke="#115E59" strokeWidth={1.5} fill="none" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Ad Groups Table */}
      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Ad Groups</p>
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-black/6">
            {['Ad Group', 'Audience', 'Size', 'Conv. Rate', 'Spend'].map(h => (
              <span key={h} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">{h}</span>
            ))}
          </div>
          {adGroups.map(ag => (
            <div
              key={ag.id}
              className="drill-row grid grid-cols-5 gap-4 px-5 py-3 items-center"
              onClick={() => navigate(`/manager/${clientId}/${campaignId}/${ag.id}`)}
            >
              <span className="text-[var(--step--1)] text-text-primary font-medium">{ag.name}</span>
              <span className="text-[var(--step--2)] text-text-muted">{ag.audienceType} — {ag.audienceSegment}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(ag.audienceSize, '#')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(ag.metrics.conversionRate, '%')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(ag.metrics.spend, '$')}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
