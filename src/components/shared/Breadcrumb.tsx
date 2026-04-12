import { useNavigate } from 'react-router-dom';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export function Breadcrumb({ crumbs }: BreadcrumbProps) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center flex-wrap gap-1 mb-4">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="breadcrumb-sep">/</span>}
            {isLast || !crumb.path ? (
              <span className="text-[var(--step--2)] text-text-primary font-medium">{crumb.label}</span>
            ) : (
              <button
                onClick={() => navigate(crumb.path!)}
                className="text-[var(--step--2)] text-text-muted hover:text-accent transition-colors bg-transparent border-none cursor-pointer"
              >
                {crumb.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
