const variants: Record<string, string> = {
  active: 'badge-active',
  on_track: 'badge-on-track',
  paused: 'badge-paused',
  underpacing: 'badge-paused',
  ended: 'badge-ended',
};

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const cls = variants[status] ?? 'badge-active';
  return (
    <span className={`badge ${cls}`}>
      {label ?? status.replace(/_/g, ' ')}
    </span>
  );
}
