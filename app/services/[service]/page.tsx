import { redirect } from "next/navigation";

export default async function ServicePage({
	params,
}: {
	params: Promise<{ service: string }>;
}) {
	const { service } = await params;
	// Redirect to a default location (Perth/WA) to ensure valid route
	redirect(`/services/${service}/wa/perth#booking`);
}
