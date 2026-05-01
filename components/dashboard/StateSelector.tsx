"use client";

interface StateSelectorProps {
	value: string;
	onChange: (state: string) => void;
}

const states = [
	{ value: "ALL", label: "All States" },
	{ value: "NSW", label: "New South Wales" },
	{ value: "VIC", label: "Victoria" },
	{ value: "QLD", label: "Queensland" },
	{ value: "WA", label: "Western Australia" },
	{ value: "SA", label: "South Australia" },
	{ value: "TAS", label: "Tasmania" },
	{ value: "ACT", label: "Australian Capital Territory" },
	{ value: "NT", label: "Northern Territory" },
];

export function StateSelector({ value, onChange }: StateSelectorProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
				State / Territory
			</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full px-4 py-3 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
			>
				{states.map((state) => (
					<option key={state.value} value={state.value}>
						{state.label}
					</option>
				))}
			</select>
		</div>
	);
}
