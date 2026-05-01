// Shared UI utilities for dashboard components

const STATUS_COLORS: Record<string, string> = {
	pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	"in-progress": "bg-purple-500/20 text-purple-400 border-purple-500/30",
	completed: "bg-green-500/20 text-green-400 border-green-500/30",
	cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function getStatusColor(status: string): string {
	return STATUS_COLORS[status] || "bg-gray-500/20 text-gray-400";
}
