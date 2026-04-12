interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DrillTableProps {
  columns: Column[];
  rows: Record<string, unknown>[];
  onRowClick: (row: Record<string, unknown>) => void;
}

export function DrillTable({ columns, rows, onRowClick }: DrillTableProps) {
  return (
    <div className="overflow-x-auto">
      {/* Header */}
      <div className="grid gap-4 px-4 py-3 border-b border-black/6" style={{ gridTemplateColumns: columns.map(() => '1fr').join(' ') }}>
        {columns.map(col => (
          <span key={col.key} className="text-[var(--step--2)] text-text-muted uppercase tracking-wider font-medium">
            {col.label}
          </span>
        ))}
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={String(row.id ?? i)}
          className="drill-row grid gap-4 px-4 py-3 items-center"
          style={{ gridTemplateColumns: columns.map(() => '1fr').join(' ') }}
          onClick={() => onRowClick(row)}
        >
          {columns.map(col => (
            <span key={col.key} className="text-[var(--step--1)] text-text-primary">
              {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
