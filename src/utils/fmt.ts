export function fmt(n: number, type: '$' | '$full' | 'x' | '%' | '#'): string {
  switch (type) {
    case '$':
      if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
      if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
      return `$${n.toFixed(2)}`;
    case '$full':
      return `$${n.toFixed(2)}`;
    case 'x':
      return `${n.toFixed(2)}x`;
    case '%':
      return `${n.toFixed(1)}%`;
    case '#':
      if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
      if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
      return `${Math.round(n)}`;
    default:
      return String(n);
  }
}
