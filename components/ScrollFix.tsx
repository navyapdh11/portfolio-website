"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function ScrollFixInternal() {
	const _pathname = usePathname();
	const _searchParams = useSearchParams();

	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				const offset = 80; // Navbar height
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		}
	}, []);

	return null;
}

export function ScrollFix() {
	return (
		<Suspense fallback={null}>
			<ScrollFixInternal />
		</Suspense>
	);
}
