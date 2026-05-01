"use client";

import { useState } from "react";
import { serviceDetails } from "@/lib/constants/serviceDetails";

interface BookingProps {
	serviceSlug?: string;
	state?: string;
	city?: string;
}

export default function Booking({
	serviceSlug = "domestic-cleaning",
	state = "WA",
	city = "Perth",
}: BookingProps) {
	const details =
		serviceDetails[serviceSlug as keyof typeof serviceDetails] ||
		serviceDetails["domestic-cleaning"];
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		suburb: city,
		state: state,
		address: "",
		date: "",
		time: "09:00",
		frequency: "one-time",
		message: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

	const validateStep = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (step === 2) {
			if (!formData.date) newErrors.date = "Please select a date";
		}
		if (step === 3) {
			if (!formData.name.trim()) newErrors.name = "Name is required";
			if (!formData.email.trim()) newErrors.email = "Email is required";
			else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
				newErrors.email = "Invalid email";
			if (!formData.phone.trim()) newErrors.phone = "Phone is required";
			if (!formData.suburb.trim()) newErrors.suburb = "Suburb is required";
			if (!formData.address.trim()) newErrors.address = "Address is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const nextStep = () => {
		if (validateStep()) setStep(step + 1);
	};

	const handleSubmit = async () => {
		if (!validateStep()) return;

		setIsSubmitting(true);
		try {
			const res = await fetch("/api/bookings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					customerName: formData.name,
					customerEmail: formData.email,
					customerPhone: formData.phone,
					service: serviceSlug.replace(/-/g, " "),
					address: formData.address,
					suburb: formData.suburb,
					state: formData.state,
					date: formData.date,
					time: formData.time,
					frequency: formData.frequency,
					addons: [],
					totalPrice: 0,
					notes: formData.message,
				}),
			});

			if (res.ok) {
				setSubmitStatus("success");
				setFormData({
					name: "",
					email: "",
					phone: "",
					suburb: city,
					state,
					address: "",
					date: "",
					time: "09:00",
					frequency: "one-time",
					message: "",
				});
				setStep(1);
			} else {
				setSubmitStatus("error");
			}
		} catch {
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSubmitStatus(null), 5000);
		}
	};

	const inputClass = (field: string) =>
		`w-full p-3 border rounded-lg ${errors[field] ? "border-red-500 bg-red-50" : "border-zinc-300"} focus:ring-2 focus:ring-blue-500 focus:outline-none`;

	return (
		<section
			id="booking"
			className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800"
		>
			<div className="mb-8">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-2xl font-bold capitalize">{serviceSlug.replace(/-/g, " ")}</h2>
					<span className="text-sm text-blue-600 font-bold">Step {step} / 4</span>
				</div>
				<p className="text-zinc-600 text-sm">{details.description}</p>
			</div>

			{submitStatus === "success" && (
				<div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl text-center font-medium">
					✓ Booking confirmed! We&apos;ll contact you within 2 hours.
				</div>
			)}
			{submitStatus === "error" && (
				<div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-center font-medium">
					✗ Booking failed. Please try again or call us directly.
				</div>
			)}

			{step === 1 && (
				<div className="space-y-6">
					<h4 className="font-semibold text-lg">Inclusions:</h4>
					<ul className="text-sm text-zinc-600 space-y-2">
						{details.included.map((inc, i) => (
							<li key={i} className="flex items-center gap-2">
								✓ {inc}
							</li>
						))}
					</ul>
					<button
						onClick={() => setStep(2)}
						className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
					>
						Continue to Schedule
					</button>
				</div>
			)}

			{step === 2 && (
				<div className="space-y-4">
					<h3 className="font-bold text-lg">Schedule Your Service</h3>
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
						Preferred Date *
					</label>
					<input
						type="date"
						value={formData.date}
						onChange={(e) => setFormData({ ...formData, date: e.target.value })}
						className={inputClass("date")}
						aria-required="true"
						aria-invalid={!!errors.date}
						aria-describedby="date-error"
					/>
					{errors.date && (
						<p id="date-error" role="alert" className="text-red-500 text-sm">
							{errors.date}
						</p>
					)}
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
						Preferred Time
					</label>
					<select
						value={formData.time}
						onChange={(e) => setFormData({ ...formData, time: e.target.value })}
						className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>
						<option value="08:00">8:00 AM</option>
						<option value="09:00">9:00 AM</option>
						<option value="10:00">10:00 AM</option>
						<option value="11:00">11:00 AM</option>
						<option value="12:00">12:00 PM</option>
						<option value="13:00">1:00 PM</option>
						<option value="14:00">2:00 PM</option>
						<option value="15:00">3:00 PM</option>
						<option value="16:00">4:00 PM</option>
					</select>
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
						Frequency
					</label>
					<select
						value={formData.frequency}
						onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
						className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>
						<option value="one-time">One-Time</option>
						<option value="weekly">Weekly</option>
						<option value="bi-weekly">Bi-Weekly</option>
						<option value="monthly">Monthly</option>
					</select>
					<button
						onClick={nextStep}
						className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
					>
						Continue to Contact
					</button>
				</div>
			)}

			{step === 3 && (
				<div className="space-y-4">
					<h3 className="font-bold text-lg">Contact Information</h3>
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
						Full Name *
					</label>
					<input
						type="text"
						placeholder="John Doe"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className={inputClass("name")}
						aria-required="true"
						aria-invalid={!!errors.name}
						aria-describedby="name-error"
					/>
					{errors.name && (
						<p id="name-error" role="alert" className="text-red-500 text-sm">
							{errors.name}
						</p>
					)}
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
						Email *
					</label>
					<input
						type="email"
						placeholder="john@email.com"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						className={inputClass("email")}
						aria-required="true"
						aria-invalid={!!errors.email}
						aria-describedby="email-error"
					/>
					{errors.email && (
						<p id="email-error" role="alert" className="text-red-500 text-sm">
							{errors.email}
						</p>
					)}
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
						Phone *
					</label>
					<input
						type="tel"
						placeholder="04XX XXX XXX"
						value={formData.phone}
						onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
						className={inputClass("phone")}
						aria-required="true"
						aria-invalid={!!errors.phone}
						aria-describedby="phone-error"
					/>
					{errors.phone && (
						<p id="phone-error" role="alert" className="text-red-500 text-sm">
							{errors.phone}
						</p>
					)}
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
								Suburb *
							</label>
							<input
								type="text"
								placeholder="Suburb"
								value={formData.suburb}
								onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
								className={inputClass("suburb")}
								aria-required="true"
								aria-invalid={!!errors.suburb}
								aria-describedby="suburb-error"
							/>
							{errors.suburb && (
								<p id="suburb-error" role="alert" className="text-red-500 text-sm">
									{errors.suburb}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
								State
							</label>
							<input
								type="text"
								value={formData.state}
								readOnly
								className="w-full p-3 border border-zinc-300 rounded-lg bg-zinc-100"
							/>
						</div>
					</div>
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
						Street Address *
					</label>
					<input
						type="text"
						placeholder="123 Main St"
						value={formData.address}
						onChange={(e) => setFormData({ ...formData, address: e.target.value })}
						className={inputClass("address")}
						aria-required="true"
						aria-invalid={!!errors.address}
						aria-describedby="address-error"
					/>
					{errors.address && (
						<p id="address-error" role="alert" className="text-red-500 text-sm">
							{errors.address}
						</p>
					)}
					<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
						Special Instructions
					</label>
					<textarea
						placeholder="Any special requirements..."
						value={formData.message}
						onChange={(e) => setFormData({ ...formData, message: e.target.value })}
						className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
						rows={3}
					/>
					<button
						onClick={nextStep}
						className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
					>
						Continue to Payment
					</button>
				</div>
			)}

			{step === 4 && (
				<div className="space-y-4">
					<h3 className="font-bold text-lg">Confirm &amp; Pay</h3>
					<div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 space-y-2 text-sm">
						<div className="flex justify-between">
							<span className="text-zinc-500">Service</span>
							<span className="font-medium">{serviceSlug.replace(/-/g, " ")}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-zinc-500">Date</span>
							<span className="font-medium">{formData.date}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-zinc-500">Time</span>
							<span className="font-medium">{formData.time}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-zinc-500">Frequency</span>
							<span className="font-medium capitalize">{formData.frequency}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-zinc-500">Address</span>
							<span className="font-medium">
								{formData.address}, {formData.suburb}
							</span>
						</div>
					</div>
					<button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? "Submitting..." : "Confirm Booking"}
					</button>
					<p className="text-center text-xs text-zinc-500">
						We&apos;ll send you a quote after confirming your requirements. No upfront payment
						required.
					</p>
				</div>
			)}
		</section>
	);
}
