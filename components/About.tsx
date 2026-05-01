const teamMembers = [
	{
		name: "Sarah Mitchell",
		role: "Operations Manager",
		bio: "15+ years in facility management, ensuring every clean meets our exacting standards.",
		specialties: ["Commercial Contracts", "Staff Training", "Quality Assurance"],
	},
	{
		name: "James Chen",
		role: "Lead Technician",
		bio: "Certified cleaning specialist with expertise in end-of-lease and deep cleaning.",
		specialties: ["End-of-Lease", "Deep Clean", "Carpet & Upholstery"],
	},
	{
		name: "Emily Rodriguez",
		role: "Customer Success",
		bio: "Dedicated to ensuring client satisfaction and seamless service delivery.",
		specialties: ["Client Relations", "Scheduling", "Problem Resolution"],
	},
];

const certifications = [
	{ name: "ISO 9001:2015", issuer: "Certified Quality Management" },
	{ name: "ISO 14001:2015", issuer: "Environmental Management Systems" },
	{ name: "Safe WA Certified", issuer: "Workplace Safety WA" },
	{ name: "Fully Insured", issuer: "Public Liability $20M" },
];

const serviceAreas = [
	"Perth CBD",
	"West Leederville",
	"Subiaco",
	"Nedlands",
	"Claremont",
	"Mount Lawley",
	"East Perth",
	"West Perth",
	"Highgate",
	"Northbridge",
];

export default function About() {
	return (
		<section
			id="about"
			className="py-20 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
						About <span className="text-blue-600">AASTACLEAN</span>
					</h1>
					<p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-3xl mx-auto text-lg">
						Perth&apos;s trusted name in professional cleaning services. Serving residential and
						commercial clients across Western Australia with excellence since 2015.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
					<div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border-l-4 border-blue-500">
						<div className="flex items-center gap-3 mb-3">
							<span className="text-2xl">📍</span>
							<h3 className="font-semibold text-zinc-900 dark:text-white">Our Location</h3>
						</div>
						<p className="text-zinc-600 dark:text-zinc-400">
							51 Tate Street
							<br />
							West Leederville 6007
							<br />
							Perth, Western Australia
						</p>
					</div>

					<div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border-l-4 border-green-500">
						<div className="flex items-center gap-3 mb-3">
							<span className="text-2xl">📞</span>
							<h3 className="font-semibold text-zinc-900 dark:text-white">Contact Us</h3>
						</div>
						<p className="text-zinc-600 dark:text-zinc-400">
							Phone: 08 9000 0000
							<br />
							Mobile: 0405 866 459
							<br />
							Email: aastaclean@gmail.com
						</p>
					</div>

					<div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500">
						<div className="flex items-center gap-3 mb-3">
							<span className="text-2xl">🕐</span>
							<h3 className="font-semibold text-zinc-900 dark:text-white">Business Hours</h3>
						</div>
						<p className="text-zinc-600 dark:text-zinc-400">
							Mon - Fri: 8:00 AM - 6:00 PM
							<br />
							Sat: 9:00 AM - 4:00 PM
							<br />
							Sun: By appointment
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					<div className="space-y-8">
						<div>
							<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Our Story</h2>
							<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
								Founded in West Leederville, AASTACLEAN has grown to become one of Perth&apos;s most
								trusted cleaning service providers. Our commitment to quality, reliability, and
								customer satisfaction has made us the preferred choice for both residential and
								commercial cleaning across the region.
							</p>
							<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
								We understand that every space is unique. Whether you need a thorough end-of-lease
								clean for your rental property, regular commercial cleaning for your office, or a
								one-off deep clean for your home, our team delivers exceptional results every time.
							</p>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
								Certifications & Credentials
							</h3>
							<div className="grid grid-cols-2 gap-3">
								{certifications.map((cert) => (
									<div
										key={cert.name}
										className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-700 p-3 rounded-lg"
									>
										<span className="text-green-500">✓</span>
										<div>
											<p className="font-medium text-zinc-900 dark:text-white text-sm">
												{cert.name}
											</p>
											<p className="text-xs text-zinc-500 dark:text-zinc-400">{cert.issuer}</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
								Service Areas
							</h3>
							<div className="flex flex-wrap gap-2">
								{serviceAreas.map((area) => (
									<span
										key={area}
										className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm"
									>
										{area}
									</span>
								))}
							</div>
						</div>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Meet Our Team</h2>
						<div className="space-y-6">
							{teamMembers.map((member) => (
								<div
									key={member.name}
									className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md"
								>
									<div className="flex items-start gap-4">
										<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
											<span className="text-2xl text-white font-semibold">
												{member.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</span>
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-zinc-900 dark:text-white">{member.name}</h3>
											<p className="text-blue-600 dark:text-blue-400 text-sm mb-2">{member.role}</p>
											<p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">{member.bio}</p>
											<div className="flex flex-wrap gap-2">
												{member.specialties.map((specialty) => (
													<span
														key={specialty}
														className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded text-xs"
													>
														{specialty}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
						<div className="text-4xl font-bold text-blue-600 dark:text-blue-400">10+</div>
						<div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Years Experience</div>
					</div>
					<div className="text-center p-6 bg-green-50 dark:bg-green-900/30 rounded-xl">
						<div className="text-4xl font-bold text-green-600 dark:text-green-400">2000+</div>
						<div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Properties Cleaned</div>
					</div>
					<div className="text-center p-6 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
						<div className="text-4xl font-bold text-purple-600 dark:text-purple-400">500+</div>
						<div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Happy Clients</div>
					</div>
					<div className="text-center p-6 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
						<div className="text-4xl font-bold text-orange-600 dark:text-orange-400">98%</div>
						<div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Client Satisfaction</div>
					</div>
				</div>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "LocalBusiness",
							name: "AASTACLEAN",
							description: "Professional cleaning services in Perth, Western Australia",
							address: {
								"@type": "PostalAddress",
								streetAddress: "51 Tate Street",
								addressLocality: "West Leederville",
								addressRegion: "WA",
								postalCode: "6007",
								addressCountry: "AU",
							},
							telephone: "+61890000000",
							email: "aastaclean@gmail.com",
							url: "https://aastaclean.com.au",
							priceRange: "$$",
							openingHours: "Mo-Fr 08:00-18:00, Sa 09:00-16:00",
							geo: {
								"@type": "GeoCoordinates",
								latitude: "-31.95",
								longitude: "115.83",
							},
							areaServed: ["Perth CBD", "West Leederville", "Subiaco", "Nedlands", "Claremont"],
							serviceType: [
								"Residential Cleaning",
								"Commercial Cleaning",
								"End of Lease Cleaning",
								"Deep Cleaning",
							],
						}),
					}}
				/>
			</div>
		</section>
	);
}
