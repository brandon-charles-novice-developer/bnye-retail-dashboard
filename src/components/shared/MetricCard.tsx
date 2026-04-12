import { useCountUp } from '../../hooks/useCountUp';
import { fmt } from '../../utils/fmt';

interface MetricCardProps {
  label: string;
  value: number;
  format: '$' | '$full' | 'x' | '%' | '#';
  delta?: number;
  deltaPositive?: boolean;
  delay?: number;
}

export function MetricCard({ label, value, format, delta, deltaPositive, delay = 0 }: MetricCardProps) {
  const animated = useCountUp({ target: value, delay });

  return (
    <div className="kpi-card">
      <p className="text-[var(--step--2)] text-text-muted uppercase tracking-wider mb-1">{label}</p>
      <p className="text-[var(--step-2)] font-bold text-text-primary mb-1">
        {fmt(animated, format)}
      </p>
      {delta != null && (
        <p className={`text-[var(--step--2)] font-medium ${deltaPositive ? 'text-positive' : 'text-negative'}`}>
          {deltaPositive ? '+' : ''}{delta.toFixed(1)}%
        </p>
      )}
    </div>
  );
}
