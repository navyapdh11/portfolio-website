import Link from "next/link";

export default function PrivacyPage() {
	return (
		<main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Privacy Policy</h1>
				<div className="prose dark:prose-invert max-w-none">
					<p>Last updated: April 22, 2026</p>
					<h2>1. Information We Collect</h2>
					<p>
						We collect information you provide directly to us when you book a service, request a
						quote, or contact us. This includes your name, email address, phone number, and service
						address.
					</p>
					<h2>2. How We Use Your Information</h2>
					<p>
						We use the information we collect to provide, maintain, and improve our cleaning
						services, to process your transactions, and to communicate with you.
					</p>
					<h2>3. Data Security</h2>
					<p>
						We take reasonable measures to help protect information about you from loss, theft,
						misuse and unauthorized access, disclosure, alteration and destruction.
					</p>
				</div>
				<div className="mt-12">
					<Link href="/" className="text-sky-500 hover:text-sky-600 font-semibold">
						← Back to Home
					</Link>
				</div>
			</div>
		</main>
	);
}
