import { useNavigate } from 'react-router-dom';
import { clients } from '../../data/clients';
import { fmt } from '../../utils/fmt';

export function ManagerHome() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Campaign Manager</p>
        <h2 className="text-[var(--step-2)] font-bold text-text-primary mb-6">Client Portfolio</h2>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {clients.filter(c => c.status === 'active').map(client => (
            <div
              key={client.id}
              className="glass-card p-5 cursor-pointer hover:translate-y-[-4px]"
              onClick={() => navigate(`/manager/${client.id}`)}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: client.logoColor }} />
                <span className="text-[var(--step--1)] font-semibold text-text-primary">{client.name}</span>
              </div>
              <p className="text-[var(--step--2)] text-text-muted mb-3">{client.vertical}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[var(--step--2)] text-text-muted">Conv. Rate</p>
                  <p className="text-[var(--step-0)] font-bold text-text-primary">{fmt(client.metrics.conversionRate, '%')}</p>
                </div>
                <div>
                  <p className="text-[var(--step--2)] text-text-muted">Revenue</p>
                  <p className="text-[var(--step-0)] font-bold text-text-primary">{fmt(client.metrics.incrementalRevenue, '$')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Table */}
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-7 gap-4 px-5 py-3 border-b border-black/6">
            {['Client', 'Vertical', 'Conv. Rate', 'ROAS', 'CPA', 'Revenue', 'Campaigns'].map(h => (
              <span key={h} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">{h}</span>
            ))}
          </div>
          {clients.map(client => (
            <div
              key={client.id}
              className="drill-row grid grid-cols-7 gap-4 px-5 py-3 items-center"
              onClick={() => navigate(`/manager/${client.id}`)}
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: client.logoColor }} />
                <span className="text-[var(--step--1)] text-text-primary font-medium">{client.name}</span>
              </div>
              <span className="text-[var(--step--2)] text-text-muted">{client.vertical}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(client.metrics.conversionRate, '%')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(client.metrics.newBuyerRoas, 'x')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(client.metrics.newBuyerCpa, '$full')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(client.metrics.incrementalRevenue, '$')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{client.metrics.activeCampaigns}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
