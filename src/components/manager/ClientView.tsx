import { useParams, useNavigate } from 'react-router-dom';
import { clientsById } from '../../data/clients';
import { campaignsByClient } from '../../data/campaigns';
import { Breadcrumb } from '../shared/Breadcrumb';
import { MetricCard } from '../shared/MetricCard';
import { StatusBadge } from '../shared/StatusBadge';
import { fmt } from '../../utils/fmt';

export function ClientView() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const client = clientsById[clientId!];
  const campaigns = campaignsByClient(clientId!);

  if (!client) return <div className="p-8 text-text-muted">Client not found</div>;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-6">
      <Breadcrumb crumbs={[
        { label: 'Clients', path: '/manager' },
        { label: client.name },
      ]} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-4 h-4 rounded-full" style={{ background: client.logoColor }} />
        <h2 className="text-[var(--step-2)] font-bold text-text-primary">{client.name}</h2>
        <StatusBadge status={client.status} />
      </div>
      <p className="text-[var(--step--1)] text-text-muted mb-6">{client.vertical} · {client.buyingType} · {client.channels.join(', ')}</p>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="Conv. Rate" value={client.metrics.conversionRate} format="%" delay={0} />
        <MetricCard label="New Buyer ROAS" value={client.metrics.newBuyerRoas} format="x" delay={100} />
        <MetricCard label="Revenue" value={client.metrics.incrementalRevenue} format="$" delay={200} />
        <MetricCard label="Campaigns" value={client.metrics.activeCampaigns} format="#" delay={300} />
      </div>

      {/* Campaigns Table */}
      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Campaigns</p>
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-7 gap-4 px-5 py-3 border-b border-black/6">
            {['Campaign', 'Status', 'DSP', 'Budget', 'Spent', 'Pacing', 'Conv. Rate'].map(h => (
              <span key={h} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">{h}</span>
            ))}
          </div>
          {campaigns.map(campaign => (
            <div
              key={campaign.id}
              className="drill-row grid grid-cols-7 gap-4 px-5 py-3 items-center"
              onClick={() => navigate(`/manager/${clientId}/${campaign.id}`)}
            >
              <span className="text-[var(--step--1)] text-text-primary font-medium">{campaign.name}</span>
              <StatusBadge status={campaign.pacingStatus} />
              <span className="text-[var(--step--2)] text-text-muted">{campaign.dsp}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(campaign.budget, '$')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(campaign.spent, '$')}</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-black/5 overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${campaign.pacing * 100}%` }} />
                </div>
                <span className="text-[var(--step--2)] text-text-muted">{Math.round(campaign.pacing * 100)}%</span>
              </div>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(campaign.metrics.conversionRate, '%')}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
