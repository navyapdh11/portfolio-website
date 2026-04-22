export function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`bg-slate-800 rounded-xl border border-slate-700 p-6 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`flex flex-row items-center justify-between pb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={`text-sm font-medium text-slate-400 ${className}`}>{children}</h3>;
}

export function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>;
}
