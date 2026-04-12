import { agency, agencyKpis } from '../../data/agency';
import { clients } from '../../data/clients';
import { MetricCard } from '../shared/MetricCard';
import { SalesLiftChart } from '../measurement/SalesLiftChart';
import { fmt } from '../../utils/fmt';

export function ExecutiveHome() {
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
      {/* KPI Scoreboard */}
      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Agency Performance</p>
        <div className="grid grid-cols-5 gap-3">
          {agencyKpis.map((kpi, i) => (
            <MetricCard key={kpi.id} label={kpi.label} value={kpi.value} format={kpi.format} delta={kpi.delta} deltaPositive={kpi.deltaPositive} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* Impact Brief + Chart */}
      <section className="grid grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <p className="text-[var(--step--2)] text-accent uppercase tracking-wider mb-2">Impact Brief</p>
          <h3 className="text-[var(--step-1)] font-semibold text-text-primary mb-3">{agency.impactBrief.headline}</h3>
          <p className="text-[var(--step--1)] text-text-secondary leading-relaxed mb-4">{agency.impactBrief.body}</p>
          <p className="text-[var(--step--2)] text-accent font-medium">{agency.impactBrief.action}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Blended Conversion Rate</p>
          <SalesLiftChart />
        </div>
      </section>

      {/* Client Overview Table */}
      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Client Portfolio</p>
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-6 gap-4 px-5 py-3 border-b border-black/6">
            {['Client', 'Conv. Rate', 'New Buyer ROAS', 'Revenue', 'Campaigns', 'Status'].map(h => (
              <span key={h} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">{h}</span>
            ))}
          </div>
          {clients.map(client => (
            <div key={client.id} className="grid grid-cols-6 gap-4 px-5 py-3 border-b border-black/4 items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: client.logoColor }} />
                <span className="text-[var(--step--1)] text-text-primary font-medium">{client.name}</span>
              </div>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(client.metrics.conversionRate, '%')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(client.metrics.newBuyerRoas, 'x')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(client.metrics.incrementalRevenue, '$')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{client.metrics.activeCampaigns}</span>
              <span className={`badge ${client.status === 'active' ? 'badge-active' : 'badge-paused'}`}>
                {client.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
