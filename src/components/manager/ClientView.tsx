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
    <div className="px-6 lg:px-8 2xl:px-12 py-8 max-w-[1400px] mx-auto space-y-6">
      <Breadcrumb crumbs={[
        { label: 'Clients', path: '/manager' },
        { label: client.name },
      ]} />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-4 h-4 rounded-full" style={{ background: client.logoColor }} />
        <h2 className="text-[var(--step-2)] font-bold text-text-primary mb-2">{client.name}</h2>
        <StatusBadge status={client.status} />
      </div>
      <p className="text-[var(--step--1)] text-text-muted mb-8">{client.vertical} · {client.buyingType} · {client.channels.join(', ')}</p>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="Conv. Rate" value={client.metrics.conversionRate} format="%" delay={0} />
        <MetricCard label="New Buyer ROAS" value={client.metrics.newBuyerRoas} format="x" delay={100} />
        <MetricCard label="Revenue" value={client.metrics.incrementalRevenue} format="$" delay={200} />
        <MetricCard label="Campaigns" value={client.metrics.activeCampaigns} format="#" delay={300} />
      </div>

      {/* Campaigns Table */}
      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-4">Campaigns</p>
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-black/6">
            {['Campaign', 'Status', 'Budget', 'Spent', 'Conv. Rate'].map(h => (
              <span key={h} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">{h}</span>
            ))}
          </div>
          {campaigns.map(campaign => (
            <div
              key={campaign.id}
              className="drill-row grid grid-cols-5 gap-4 px-5 py-3 items-center"
              onClick={() => navigate(`/manager/${clientId}/${campaign.id}`)}
            >
              <span className="text-[var(--step--1)] text-text-primary font-medium">{campaign.name}</span>
              <StatusBadge status={campaign.pacingStatus} />
              <span className="text-[var(--step--1)] text-text-primary">{fmt(campaign.budget, '$')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(campaign.spent, '$')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(campaign.metrics.conversionRate, '%')}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
