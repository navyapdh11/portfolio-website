import Link from "next/link";
import { australianCities, cleaningServices } from "@/lib/constants/services";

export default function LocationsPage() {
	return (
		<main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold mb-12">All Service Locations</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{australianCities.map((city) => (
						<div
							key={`${city.state}-${city.slug}`}
							className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl"
						>
							<h2 className="text-xl font-bold mb-4 uppercase">
								{city.name}, {city.state.toUpperCase()}
							</h2>
							<ul className="space-y-2">
								{cleaningServices.map((service) => (
									<li key={service.slug}>
										<Link
											href={`/services/${service.slug}/${city.state}/${city.slug}`}
											className="text-sky-500 hover:underline"
										>
											{service.name} in {city.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
