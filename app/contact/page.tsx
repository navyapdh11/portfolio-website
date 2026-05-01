import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
	title: "Contact AASTACLEAN | Professional Cleaning Services Perth WA",
	description:
		"Contact AASTACLEAN for professional cleaning services in Perth, Western Australia. Phone: 08 9000 0000, Mobile: 0405 866 459. Visit us at 51 Tate Street, West Leederville 6007.",
	keywords:
		"contact AASTACLEAN, Perth cleaning contact, cleaning services Perth WA, get quote cleaning, phone cleaning services Perth, AASTACLEAN phone email address",
	authors: [{ name: "AASTACLEAN" }],
	openGraph: {
		title: "Contact AASTACLEAN | Professional Cleaning Services Perth WA",
		description:
			"Contact AASTACLEAN for professional cleaning services in Perth, Western Australia.",
		type: "website",
		locale: "en_AU",
		siteName: "AASTACLEAN",
		url: "https://aastaclean.com.au/contact",
	},
	alternates: {
		canonical: "https://aastaclean.com.au/contact",
	},
	other: {
		"geo.region": "WA",
		"geo.placename": "West Leederville, Perth",
		"geo.position": "-31.9505;115.8605",
		icbm: "-31.9505, 115.8605",
	},
};

export default function ContactPage() {
	return <ContactContent />;
}
