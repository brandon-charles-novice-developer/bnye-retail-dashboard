import { agency } from '../../data/agency';

interface HeaderProps {
  mode: string;
  onModeChange: (mode: string) => void;
}

export function Header({ mode, onModeChange }: HeaderProps) {
  return (
    <header className="glass-header sticky top-0 z-50 flex items-center justify-between px-6 py-3">
      {/* Left — Brand */}
      <div className="flex items-center gap-3">
        <span className="text-[var(--step-0)] font-bold text-accent tracking-wide">Analytics HQ</span>
        <span className="text-[var(--step--2)] text-text-muted px-2 py-0.5 rounded-full bg-black/5 border border-black/6">
          {agency.name}
        </span>
      </div>

      {/* Center — Mode Toggle */}
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'executive' ? 'active' : ''}`}
          onClick={() => onModeChange('executive')}
        >
          Executive View
        </button>
        <button
          className={`mode-btn ${mode === 'manager' ? 'active' : ''}`}
          onClick={() => onModeChange('manager')}
        >
          Campaign Manager
        </button>
      </div>

      {/* Right — Architecture + Hub Link */}
      <div className="flex items-center gap-4">
        <a
          href="/architecture"
          className="text-[var(--step--2)] text-text-muted hover:text-accent transition-colors"
        >
          Architecture
        </a>
        <a
          href="https://brandonnye.pro"
          className="text-[var(--step--2)] text-text-muted hover:text-accent transition-colors"
        >
          Command Center
        </a>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-[var(--step--2)] font-semibold text-accent">
            {agency.seat.initials}
          </div>
          <div>
            <p className="text-[var(--step--2)] text-text-primary font-medium leading-tight">{agency.seat.name}</p>
            <p className="text-[var(--step--2)] text-text-muted leading-tight">{agency.seat.title}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
