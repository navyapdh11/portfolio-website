"use client";

interface ServiceTypeSelectorProps {
	value: string[];
	onChange: (services: string[]) => void;
}

const services = [
	{ value: "house-cleaning", label: "House Cleaning", icon: "🏠" },
	{ value: "end-of-lease", label: "End of Lease", icon: "🔑" },
	{ value: "commercial", label: "Commercial", icon: "🏢" },
	{ value: "carpet-cleaning", label: "Carpet Cleaning", icon: "🧹" },
	{ value: "window-cleaning", label: "Window Cleaning", icon: "🪟" },
	{ value: "deep-cleaning", label: "Deep Cleaning", icon: "✨" },
];

export function ServiceTypeSelector({
	value,
	onChange,
}: ServiceTypeSelectorProps) {
	const toggleService = (serviceValue: string) => {
		if (value.includes(serviceValue)) {
			onChange(value.filter((s) => s !== serviceValue));
		} else {
			onChange([...value, serviceValue]);
		}
	};

	return (
		<div>
			<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
				Service Types ({value.length} selected)
			</label>
			<div className="grid grid-cols-2 gap-2">
				{services.map((service) => (
					<button
						key={service.value}
						onClick={() => toggleService(service.value)}
						className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
							value.includes(service.value)
								? "bg-blue-500 text-white shadow-md"
								: "bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
						}`}
					>
						<span>{service.icon}</span>
						<span className="truncate">{service.label}</span>
					</button>
				))}
			</div>
		</div>
	);
}
