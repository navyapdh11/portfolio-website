"use client";

interface Service {
	id: string;
	title: string;
	basePrice: number;
	stock: number;
	available: boolean;
	category: string;
}

interface ServicesTabProps {
	services: Service[];
	editingService: string | null;
	setEditingService: (id: string | null) => void;
	updateService: (id: string, data: Partial<Service>) => Promise<void>;
	deleteService: (id: string) => Promise<void>;
}

export default function ServicesTab({
	services,
	editingService,
	setEditingService,
	updateService,
	deleteService,
}: ServicesTabProps) {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-white">🧹 Service & Pricing Control</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{services.map((service) => (
					<div
						key={service.id}
						className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all"
					>
						{editingService === service.id ? (
							<div className="space-y-3">
								<input
									type="text"
									defaultValue={service.title}
									id={`title-${service.id}`}
									className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm"
								/>
								<input
									type="number"
									defaultValue={service.basePrice}
									id={`price-${service.id}`}
									className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm"
								/>
								<input
									type="number"
									defaultValue={service.stock}
									id={`stock-${service.id}`}
									className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm"
								/>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() =>
											updateService(service.id, {
												title: (document.getElementById(`title-${service.id}`) as HTMLInputElement)
													?.value,
												basePrice: Number(
													(document.getElementById(`price-${service.id}`) as HTMLInputElement)
														?.value,
												),
												stock: Number(
													(document.getElementById(`stock-${service.id}`) as HTMLInputElement)
														?.value,
												),
											})
										}
										className="px-3 py-1 bg-green-500 text-white rounded text-sm"
									>
										Save
									</button>
									<button
										type="button"
										onClick={() => setEditingService(null)}
										className="px-3 py-1 bg-slate-600 text-white rounded text-sm"
									>
										Cancel
									</button>
								</div>
							</div>
						) : (
							<>
								<div className="flex justify-between items-start mb-4">
									<div>
										<h3 className="text-lg font-bold text-white">{service.title}</h3>
										<p className="text-sm text-slate-400">{service.category}</p>
									</div>
									<span
										className={`px-3 py-1 rounded-full text-xs ${service.available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
									>
										{service.available ? "Active" : "Inactive"}
									</span>
								</div>
								<div className="grid grid-cols-2 gap-3 mb-4">
									<div className="bg-slate-700/50 rounded-lg p-3">
										<p className="text-xs text-slate-400">Price</p>
										<p className="text-xl font-bold text-white">${service.basePrice}</p>
									</div>
									<div className="bg-slate-700/50 rounded-lg p-3">
										<p className="text-xs text-slate-400">Stock</p>
										<p
											className={`text-xl font-bold ${service.stock < 10 ? "text-red-400" : "text-white"}`}
										>
											{service.stock}
										</p>
									</div>
								</div>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => setEditingService(service.id)}
										className="px-3 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 rounded-lg text-sm font-medium transition-colors"
									>
										✏️ Edit
									</button>
									<button
										type="button"
										onClick={() => deleteService(service.id)}
										className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
									>
										🗑️
									</button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
