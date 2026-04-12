import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { week: 'W1', rate: 2.4, benchmark: 2.8 },
  { week: 'W2', rate: 2.6, benchmark: 2.8 },
  { week: 'W3', rate: 2.9, benchmark: 2.8 },
  { week: 'W4', rate: 3.1, benchmark: 2.8 },
  { week: 'W5', rate: 3.3, benchmark: 2.8 },
  { week: 'W6', rate: 3.0, benchmark: 2.8 },
  { week: 'W7', rate: 3.2, benchmark: 2.8 },
  { week: 'W8', rate: 3.5, benchmark: 2.8 },
  { week: 'W9', rate: 3.4, benchmark: 2.8 },
  { week: 'W10', rate: 3.6, benchmark: 2.8 },
  { week: 'W11', rate: 3.3, benchmark: 2.8 },
  { week: 'W12', rate: 3.1, benchmark: 2.8 },
];

export function SalesLiftChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#1A1A2E' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#1A1A2E' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[1.5, 4.5]} />
        <Tooltip
          contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8, fontSize: 12, color: '#1A1A2E', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          formatter={(value) => [`${Number(value).toFixed(1)}%`]}
        />
        <ReferenceLine y={2.8} stroke="#4338CA" strokeDasharray="6 4" strokeOpacity={0.6} />
        <Area type="monotone" dataKey="rate" stroke="#7C3AED" strokeWidth={2} fill="url(#rateGradient)" dot={false} activeDot={{ r: 4, fill: '#7C3AED' }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
