export function Card({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`bg-white/10 backdrop-blur-[20px] rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/15 ${className}`}
		>
			{children}
		</div>
	);
}

export function CardHeader({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`flex flex-row items-center justify-between pb-2 ${className}`}
		>
			{children}
		</div>
	);
}

export function CardTitle({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h3
			className={`text-lg font-semibold tracking-tight text-slate-100 ${className}`}
		>
			{children}
		</h3>
	);
}

export function CardContent({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={className}>{children}</div>;
}
