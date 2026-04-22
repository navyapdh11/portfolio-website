export function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`bg-slate-800 rounded-xl border border-slate-700 p-6 ${className}`}>{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row items-center justify-between pb-2">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-medium text-slate-400">{children}</h3>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
