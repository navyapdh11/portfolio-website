"use client";

import { useCallback, useEffect, useState } from "react";

interface Project {
	id: string;
	title: string;
	category: string;
	location: string;
	description: string;
	beforeImage?: string;
	afterImage?: string;
	createdAt: string;
}

const FALLBACKS = [
	{ emoji: "🏢", label: "Commercial" },
	{ emoji: "🏠", label: "Residential" },
	{ emoji: "🔑", label: "End of Lease" },
	{ emoji: "🏥", label: "Medical" },
	{ emoji: "🛍️", label: "Retail" },
	{ emoji: "🔨", label: "Deep Clean" },
];

function getProjectEmoji(category: string): string {
	const match = FALLBACKS.find((f) =>
		category.toLowerCase().includes(f.label.toLowerCase().split(" ")[0]),
	);
	return match?.emoji || "✨";
}

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [token, setToken] = useState("");

	// Fetch projects from API
	const fetchProjects = useCallback(async () => {
		try {
			const res = await fetch("/api/projects", { credentials: "include" });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const json = await res.json();
			setProjects(json.data || []);
			// Capture CSRF token from response cookie for subsequent requests
			const csrfHeader = res.headers.get("X-CSRF-Token");
			if (csrfHeader) setToken(csrfHeader);
		} catch {
			setProjects([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	// Admin: create a new project
	const handleCreate = async () => {
		if (!isAdmin || !token) return;
		const title = prompt("Project title:");
		if (!title) return;
		const category = prompt("Category:") || "General";
		const location = prompt("Location:") || "Unknown";
		const description = prompt("Description:") || "";

		try {
			const res = await fetch("/api/projects", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": token,
				},
				body: JSON.stringify({ title, category, location, description }),
			});
			if (!res.ok) {
				const err = await res.json();
				alert(`Error: ${JSON.stringify(err.error)}`);
				return;
			}
			fetchProjects();
		} catch (e) {
			alert(`Failed: ${e}`);
		}
	};

	// Admin: update a project
	const handleUpdate = async (project: Project) => {
		if (!isAdmin || !token) return;
		const title = prompt("Title:", project.title) || project.title;
		const category = prompt("Category:", project.category) || project.category;
		const location = prompt("Location:", project.location) || project.location;
		const description = prompt("Description:", project.description) || project.description;

		try {
			const res = await fetch("/api/projects", {
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": token,
				},
				body: JSON.stringify({ id: project.id, title, category, location, description }),
			});
			if (!res.ok) {
				const err = await res.json();
				alert(`Error: ${JSON.stringify(err.error)}`);
				return;
			}
			fetchProjects();
		} catch (e) {
			alert(`Failed: ${e}`);
		}
	};

	// Admin: delete a project
	const handleDelete = async (id: string) => {
		if (!isAdmin || !token) return;
		if (!confirm("Delete this project?")) return;

		try {
			const res = await fetch("/api/projects", {
				method: "DELETE",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": token,
				},
				body: JSON.stringify({ id }),
			});
			if (!res.ok) {
				const err = await res.json();
				alert(`Error: ${JSON.stringify(err.error)}`);
				return;
			}
			fetchProjects();
		} catch (e) {
			alert(`Failed: ${e}`);
		}
	};

	return (
		<>
			<section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Projects</h1>
					<p className="text-blue-100 text-lg max-w-2xl mx-auto">
						Showcase of our best cleaning projects across residential, commercial, and specialised
						services.
					</p>
					<button
						onClick={() => setIsAdmin(!isAdmin)}
						className="mt-4 px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
					>
						{isAdmin ? "Exit Admin" : "Enable Admin Edit"}
					</button>
				</div>
			</section>

			{isAdmin && (
				<section className="py-6 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between mb-4">
							<h2 className="font-bold text-zinc-900 dark:text-white">Admin — Manage Projects</h2>
							<button
								onClick={handleCreate}
								className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500"
							>
								+ New Project
							</button>
						</div>
						<div className="space-y-3 max-h-64 overflow-y-auto">
							{projects.map((p) => (
								<div
									key={p.id}
									className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700"
								>
									<div className="flex-1 min-w-0">
										<p className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
											{p.title}
										</p>
										<p className="text-xs text-zinc-500">
											{p.category} · {p.location}
										</p>
									</div>
									<button
										onClick={() => handleUpdate(p)}
										className="px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-700 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(p.id)}
										className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
									>
										Delete
									</button>
								</div>
							))}
							{projects.length === 0 && (
								<p className="text-sm text-zinc-500 text-center py-4">
									No projects yet. Click "+ New Project" to add one.
								</p>
							)}
						</div>
					</div>
				</section>
			)}

			<section className="py-16 bg-white dark:bg-zinc-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="bg-zinc-100 dark:bg-zinc-700 rounded-2xl h-80 animate-pulse"
								/>
							))}
						</div>
					) : projects.length === 0 ? (
						<div className="text-center py-20">
							<p className="text-zinc-500 text-lg">No projects to display.</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{projects.map((project) => (
								<article
									key={project.id}
									className="bg-white dark:bg-zinc-700 rounded-2xl shadow-lg overflow-hidden border border-zinc-100 dark:border-zinc-600 hover:shadow-xl transition-shadow"
								>
									<div className="h-48 bg-gradient-to-br from-blue-50 to-zinc-100 dark:from-zinc-600 dark:to-zinc-500 flex items-center justify-center text-6xl">
										{project.beforeImage ? (
											<img
												src={project.beforeImage}
												alt={project.title}
												className="w-full h-full object-cover"
											/>
										) : (
											getProjectEmoji(project.category)
										)}
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
											{project.title}
										</h3>
										<p className="text-zinc-600 dark:text-zinc-300 text-sm mb-4">
											{project.description}
										</p>
										<div className="text-xs text-zinc-500 mb-4 uppercase tracking-widest font-bold">
											📍 {project.location}
										</div>
										<div className="flex gap-2">
											<span className="px-2 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded text-[10px] font-bold uppercase">
												{project.category}
											</span>
										</div>
									</div>
								</article>
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
}
