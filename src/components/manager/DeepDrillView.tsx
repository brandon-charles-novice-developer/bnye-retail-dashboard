import { useParams, useNavigate } from 'react-router-dom';
import { clientsById } from '../../data/clients';
import { campaignsById } from '../../data/campaigns';
import { adGroups, packages, deals, packagesByAdGroup, dealsByPackage, creativesByDeal } from '../../data/drilldown';
import { Breadcrumb } from '../shared/Breadcrumb';
import { MetricCard } from '../shared/MetricCard';
import { fmt } from '../../utils/fmt';

// Generic deep drill view for levels 4-7
export function AdGroupView() {
  const { clientId, campaignId, adGroupId } = useParams();
  const navigate = useNavigate();
  const client = clientsById[clientId!];
  const campaign = campaignsById[campaignId!];
  const ag = adGroups.find(a => a.id === adGroupId);
  const pkgs = packagesByAdGroup(adGroupId!);

  if (!client || !campaign || !ag) return <div className="p-8 text-text-muted">Not found</div>;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-6">
      <Breadcrumb crumbs={[
        { label: 'Clients', path: '/manager' },
        { label: client.name, path: `/manager/${clientId}` },
        { label: campaign.name, path: `/manager/${clientId}/${campaignId}` },
        { label: ag.name },
      ]} />
      <h2 className="text-[var(--step-2)] font-bold text-text-primary">{ag.name}</h2>
      <p className="text-[var(--step--1)] text-text-muted">{ag.audienceType} — {ag.audienceSegment} · {fmt(ag.audienceSize, '#')} audience</p>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Conv. Rate" value={ag.metrics.conversionRate} format="%" />
        <MetricCard label="Impressions" value={ag.metrics.impressions} format="#" delay={100} />
        <MetricCard label="Spend" value={ag.metrics.spend} format="$" delay={200} />
      </div>

      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Packages</p>
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-black/6">
            {['Package', 'Format', 'Budget', 'CPM', 'Conv. Rate'].map(h => (
              <span key={h} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">{h}</span>
            ))}
          </div>
          {pkgs.map(pk => (
            <div key={pk.id} className="drill-row grid grid-cols-5 gap-4 px-5 py-3 items-center"
              onClick={() => navigate(`/manager/${clientId}/${campaignId}/${adGroupId}/${pk.id}`)}>
              <span className="text-[var(--step--1)] text-text-primary font-medium">{pk.name}</span>
              <span className="text-[var(--step--2)] text-text-muted">{pk.format}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(pk.budget, '$')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(pk.cpm, '$full')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(pk.metrics.conversionRate, '%')}</span>
            </div>
          ))}
          {pkgs.length === 0 && <div className="px-5 py-8 text-center text-text-muted text-[var(--step--1)]">No packages at this level</div>}
        </div>
      </section>
    </div>
  );
}

export function PackageView() {
  const { clientId, campaignId, adGroupId, packageId } = useParams();
  const navigate = useNavigate();
  const client = clientsById[clientId!];
  const pk = packages.find(p => p.id === packageId);
  const dls = dealsByPackage(packageId!);

  if (!client || !pk) return <div className="p-8 text-text-muted">Not found</div>;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-6">
      <Breadcrumb crumbs={[
        { label: 'Clients', path: '/manager' },
        { label: client.name, path: `/manager/${clientId}` },
        { label: '...', path: `/manager/${clientId}/${campaignId}` },
        { label: '...', path: `/manager/${clientId}/${campaignId}/${adGroupId}` },
        { label: pk.name },
      ]} />
      <h2 className="text-[var(--step-2)] font-bold text-text-primary">{pk.name}</h2>
      <p className="text-[var(--step--1)] text-text-muted">{pk.environment} · {pk.format}</p>

      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="Budget" value={pk.budget} format="$" />
        <MetricCard label="Spent" value={pk.spent} format="$" delay={100} />
        <MetricCard label="CPM" value={pk.cpm} format="$full" delay={200} />
        <MetricCard label="Conv. Rate" value={pk.metrics.conversionRate} format="%" delay={300} />
      </div>

      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Deals</p>
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-black/6">
            {['Deal', 'Publisher', 'CPM', 'Impressions', 'Viewability'].map(h => (
              <span key={h} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">{h}</span>
            ))}
          </div>
          {dls.map(dl => (
            <div key={dl.id} className="drill-row grid grid-cols-5 gap-4 px-5 py-3 items-center"
              onClick={() => navigate(`/manager/${clientId}/${campaignId}/${adGroupId}/${packageId}/${dl.id}`)}>
              <span className="text-[var(--step--1)] text-text-primary font-medium">{dl.name}</span>
              <span className="text-[var(--step--2)] text-text-muted">{dl.publisher}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(dl.cpm, '$full')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(dl.impressions, '#')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(dl.metrics.viewability, '%')}</span>
            </div>
          ))}
          {dls.length === 0 && <div className="px-5 py-8 text-center text-text-muted text-[var(--step--1)]">No deals at this level</div>}
        </div>
      </section>
    </div>
  );
}

export function DealView() {
  const { clientId, campaignId, adGroupId, packageId, dealId } = useParams();
  const client = clientsById[clientId!];
  const dl = deals.find(d => d.id === dealId);
  const crs = creativesByDeal(dealId!);

  if (!client || !dl) return <div className="p-8 text-text-muted">Not found</div>;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-6">
      <Breadcrumb crumbs={[
        { label: 'Clients', path: '/manager' },
        { label: client.name, path: `/manager/${clientId}` },
        { label: '...', path: `/manager/${clientId}/${campaignId}` },
        { label: '...', path: `/manager/${clientId}/${campaignId}/${adGroupId}` },
        { label: '...', path: `/manager/${clientId}/${campaignId}/${adGroupId}/${packageId}` },
        { label: dl.name },
      ]} />
      <h2 className="text-[var(--step-2)] font-bold text-text-primary">{dl.name}</h2>
      <p className="text-[var(--step--1)] text-text-muted">{dl.dealType} · {dl.publisher} · {dl.format}</p>

      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="CPM" value={dl.cpm} format="$full" />
        <MetricCard label="Impressions" value={dl.impressions} format="#" delay={100} />
        <MetricCard label="Spend" value={dl.spend} format="$" delay={200} />
        <MetricCard label="Viewability" value={dl.metrics.viewability} format="%" delay={300} />
      </div>

      <section>
        <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-3">Creatives</p>
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-black/6">
            {['Creative', 'Format', 'Impressions', 'Completion', 'Conv. Rate'].map(h => (
              <span key={h} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">{h}</span>
            ))}
          </div>
          {crs.map(cr => (
            <div key={cr.id} className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-black/4 items-center">
              <span className="text-[var(--step--1)] text-text-primary font-medium">{cr.name}</span>
              <span className="text-[var(--step--2)] text-text-muted">{cr.format} · {cr.size}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(cr.impressions, '#')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(cr.metrics.completionRate, '%')}</span>
              <span className="text-[var(--step--1)] text-text-primary">{fmt(cr.metrics.conversionRate, '%')}</span>
            </div>
          ))}
          {crs.length === 0 && <div className="px-5 py-8 text-center text-text-muted text-[var(--step--1)]">No creatives at this level</div>}
        </div>
      </section>
    </div>
  );
}
