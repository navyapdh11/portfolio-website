const faqs = [
	{
		question: "What areas do you service?",
		answer:
			"We service all Australian metro and regional areas with 10,247+ suburbs covered. This includes Sydney, Melbourne, Brisbane, Perth, Adelaide, and all major cities. Contact us to confirm your area.",
	},
	{
		question: "Are your cleaners police checked and insured?",
		answer:
			"Absolutely. Every AASTACLEAN cleaner has a current National Police Check. We also hold $20M public liability insurance, so you&apos;re fully protected. Certificates available on request.",
	},
	{
		question: "What's your bond-back guarantee?",
		answer:
			"If you're not 100% satisfied with your end of lease clean, we'll return and reclean at no extra cost. If the agent still rejects it, we'll refund your full payment. We have a 99.7% first-time pass rate.",
	},
	{
		question: "Do you bring your own cleaning supplies?",
		answer:
			"Yes! We bring all professional-grade, eco-friendly cleaning products and equipment. You don't need to provide anything. Our products are non-toxic and safe for children and pets.",
	},
	{
		question: "How much notice do you need for booking?",
		answer:
			"We offer same-day service subject to availability (call us). For regular bookings, we recommend 48-72 hours notice. End of lease cleans typically require 2-3 days notice for best availability.",
	},
	{
		question: "What's your cancellation policy?",
		answer:
			"Free cancellation up to 24 hours before your scheduled clean. Cancellations within 24 hours may incur a $50 fee to cover cleaner travel time.",
	},
	{
		question: "Do you offer regular/ongoing cleaning?",
		answer:
			"Yes! We offer weekly, fortnightly, and monthly cleaning schedules with discounted rates. Weekly clients save 20%, fortnightly 15%, and monthly 10%. Lock in your rate for 12 months.",
	},
	{
		question: "What payment methods do you accept?",
		answer:
			"We accept bank transfer, credit/debit cards (Visa, Mastercard), PayPal, and cash. Payment is only required after your clean is completed and you're satisfied.",
	},
];

export function FAQSection() {
	return (
		<section id="faq" className="py-20 bg-slate-50 dark:bg-slate-800">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
						Frequently Asked <span className="text-sky-600">Questions</span>
					</h2>
					<p className="text-slate-600 dark:text-slate-400 mt-4">
						Everything you need to know about our cleaning services
					</p>
				</div>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<details
							key={index}
							className="group bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden"
							open={index === 0}
						>
							<summary className="cursor-pointer px-6 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors list-none">
								<span className="font-semibold text-slate-900 dark:text-white pr-4">
									{faq.question}
								</span>
								<svg
									className="w-6 h-6 text-sky-600 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</summary>
							<div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
								{faq.answer}
							</div>
						</details>
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-slate-600 dark:text-slate-400 mb-4">
						Still have questions? We&apos;re here to help!
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="tel:1300253268"
							className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold"
						>
							📞 Call 1300 CLEAN
						</a>
						<a
							href="#booking"
							className="px-6 py-3 border-2 border-sky-500 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors font-semibold"
						>
							Send Inquiry
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
