"use client";

import Link from "next/link";
import { useRef, useState } from "react";

interface Task {
	id: number;
	prompt: string;
	type: string;
	reward: number;
	estTime: string;
	rarity: string;
	category: string;
	completed?: boolean;
}

interface Job {
	id: number;
	title: string;
	location: string;
	pay: number;
	urgency: string;
	type: string;
	clientRating: number;
	distance: string;
}

interface Offer {
	id: number;
	client: string;
	job: string;
	pay: number;
	time: string;
}

interface LeaderboardEntry {
	rank: number;
	name: string;
	earnings: number;
	tasks: number;
	badge: string;
}

export default function MicrotasksContent() {
	const [activeSection, setActiveSection] = useState<string>("tasks");
	const [userBalance, setUserBalance] = useState(24.75);
	const [tasksCompleted, setTasksCompleted] = useState(47);
	const [streak] = useState(5);
	const [availableTasks, setAvailableTasks] = useState(12);
	const [showUserStatus, setShowUserStatus] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [capturing, setCapturing] = useState(false);
	const [qualityScore, setQualityScore] = useState(0);
	const [aiScore, setAiScore] = useState("Pending");
	const [rarityBonus] = useState(0.2);

	const leaderboardDefault: LeaderboardEntry[] = [
		{ rank: 1, name: "Sarah W.", earnings: 245.5, tasks: 156, badge: "🥇" },
		{ rank: 2, name: "James C.", earnings: 198.75, tasks: 134, badge: "🥈" },
		{ rank: 3, name: "Emily R.", earnings: 187.25, tasks: 121, badge: "🥉" },
		{ rank: 4, name: "Mike T.", earnings: 165.0, tasks: 98, badge: "⭐" },
		{ rank: 5, name: "Lisa K.", earnings: 142.5, tasks: 87, badge: "⭐" },
	];
	const badgesDefault = ["🏠", "🧹", "⚡", "🔥", "💎", "🎯"];

	const [leaderboard] = useState<LeaderboardEntry[]>(leaderboardDefault);
	const [badges] = useState<string[]>(badgesDefault);

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const videoStreamRef = useRef<MediaStream | null>(null);

	const tasks: Task[] = [
		{
			id: 1,
			prompt: "Photograph 5 dirty kitchen counters before cleaning",
			type: "image",
			reward: 0.75,
			estTime: "45s",
			rarity: "common",
			category: "kitchen",
		},
		{
			id: 2,
			prompt:
				'Record instructions: "How to clean marble countertops" in Spanish',
			type: "audio",
			reward: 1.25,
			estTime: "30s",
			rarity: "rare",
			category: "surface",
		},
		{
			id: 3,
			prompt: "Scan handwritten cleaning checklist (English)",
			type: "image",
			reward: 0.5,
			estTime: "25s",
			rarity: "common",
			category: "documentation",
		},
		{
			id: 4,
			prompt: "Label stains: Upload bathroom mirror photo + types",
			type: "annotation",
			reward: 1.0,
			estTime: "60s",
			rarity: "medium",
			category: "bathroom",
		},
		{
			id: 5,
			prompt: "Before/after: Vacuum marks on carpet",
			type: "image-pair",
			reward: 1.5,
			estTime: "90s",
			rarity: "high",
			category: "flooring",
		},
		{
			id: 6,
			prompt: 'Record "Stain removal techniques" in Mandarin',
			type: "audio",
			reward: 1.75,
			estTime: "40s",
			rarity: "rare",
			category: "stain",
		},
		{
			id: 7,
			prompt: "Photograph office desk organization stages",
			type: "image-sequence",
			reward: 1.2,
			estTime: "75s",
			rarity: "medium",
			category: "office",
		},
		{
			id: 8,
			prompt: "Annotate cleaning product labels (5 items)",
			type: "text",
			reward: 0.85,
			estTime: "50s",
			rarity: "common",
			category: "products",
		},
		{
			id: 9,
			prompt: "Capture move-out apartment conditions",
			type: "image",
			reward: 1.0,
			estTime: "60s",
			rarity: "medium",
			category: "moveout",
		},
		{
			id: 10,
			prompt: 'Record "Oven cleaning" demo in Hindi',
			type: "audio",
			reward: 1.5,
			estTime: "45s",
			rarity: "rare",
			category: "kitchen",
		},
		{
			id: 11,
			prompt: "Label floor types in 10 room photos",
			type: "annotation",
			reward: 0.9,
			estTime: "55s",
			rarity: "common",
			category: "flooring",
		},
		{
			id: 12,
			prompt: "Photograph dust buildup patterns",
			type: "image",
			reward: 0.65,
			estTime: "40s",
			rarity: "common",
			category: "dusting",
		},
	];

	const jobs: Job[] = [
		{
			id: 1,
			title: "Deep Clean - 4BR House",
			location: "West Leederville",
			pay: 180,
			urgency: "immediate",
			type: "Deep Clean",
			clientRating: 4.8,
			distance: "1.2km",
		},
		{
			id: 2,
			title: "Office Tower - 20 Floors",
			location: "Perth CBD",
			pay: 450,
			urgency: "soon",
			type: "Commercial",
			clientRating: 4.9,
			distance: "3.5km",
		},
		{
			id: 3,
			title: "End of Lease - 2BR",
			location: "Subiaco",
			pay: 120,
			urgency: "standard",
			type: "End of Lease",
			clientRating: 4.5,
			distance: "2.1km",
		},
		{
			id: 4,
			title: "Medical Centre - Daily",
			location: "Nedlands",
			pay: 95,
			urgency: "recurring",
			type: "Commercial",
			clientRating: 5.0,
			distance: "4.0km",
		},
		{
			id: 5,
			title: "Retail Space - Daily",
			location: "Claremont",
			pay: 75,
			urgency: "recurring",
			type: "Commercial",
			clientRating: 4.7,
			distance: "5.2km",
		},
		{
			id: 6,
			title: "Post-Reno Clean - Duplex",
			location: "Mount Lawley",
			pay: 200,
			urgency: "immediate",
			type: "Deep Clean",
			clientRating: 4.6,
			distance: "2.8km",
		},
	];

	const offers: Offer[] = [
		{
			id: 1,
			client: "Perth CBD Properties",
			job: "Office Tower - Weekly",
			pay: 450,
			time: "Today 2PM",
		},
		{
			id: 2,
			client: "Sarah Mitchell",
			job: "Regular House Clean",
			pay: 85,
			time: "Tomorrow 10AM",
		},
		{
			id: 3,
			client: "Nedlands Medical",
			job: "Daily 8AM",
			pay: 95,
			time: "Starting Monday",
		},
	];

	const openTaskModal = (task: Task) => {
		setSelectedTask(task);
		setShowModal(true);
		setQualityScore(0);
		setAiScore("Pending");
	};

	const closeTaskModal = () => {
		setShowModal(false);
		setSelectedTask(null);
	};

	const startCapture = async () => {
		setCapturing(true);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			videoStreamRef.current = stream;
			mediaRecorderRef.current = new MediaRecorder(stream);
			mediaRecorderRef.current.start();
			setTimeout(() => {
				setCapturing(false);
				setQualityScore(Math.floor(Math.random() * 30) + 70);
				setAiScore(Math.random() > 0.3 ? "Approved" : "Needs Revision");
			}, 3000);
		} catch {
			setCapturing(false);
			setQualityScore(Math.floor(Math.random() * 30) + 70);
			setAiScore(Math.random() > 0.3 ? "Approved" : "Needs Revision");
		}
	};

	const submitTask = () => {
		if (selectedTask && qualityScore > 0) {
			setUserBalance(userBalance + selectedTask.reward + rarityBonus);
			setTasksCompleted(tasksCompleted + 1);
			setAvailableTasks(availableTasks - 1);
			closeTaskModal();
		}
	};

	const getUrgencyColor = (urgency: string) => {
		const colors: Record<string, string> = {
			immediate: "bg-red-500",
			soon: "bg-orange-500",
			standard: "bg-yellow-500",
			recurring: "bg-emerald-500",
		};
		return colors[urgency] || "bg-gray-500";
	};

	const getRarityColor = (rarity: string) => {
		const colors: Record<string, string> = {
			common: "bg-gray-100 text-gray-700",
			medium: "bg-blue-100 text-blue-700",
			high: "bg-purple-100 text-purple-700",
			rare: "bg-amber-100 text-amber-700",
		};
		return colors[rarity] || "bg-gray-100 text-gray-700";
	};

	return (
		<>
			<section className="py-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-2">
								🧹 AI Microtasks Hub
							</h1>
							<p className="text-indigo-100">
								Earn $0.10-$2.00 per task training cleaning AI models
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							<button
								onClick={() => setActiveSection("tasks")}
								className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
									activeSection === "tasks"
										? "bg-white text-indigo-600"
										: "bg-indigo-500/30 text-white hover:bg-indigo-500/50"
								}`}
							>
								🧹 Tasks
							</button>
							<button
								onClick={() => setActiveSection("heatmap")}
								className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
									activeSection === "heatmap"
										? "bg-white text-indigo-600"
										: "bg-indigo-500/30 text-white hover:bg-indigo-500/50"
								}`}
							>
								📍 Jobs Heatmap
							</button>
							<button
								onClick={() => setActiveSection("offers")}
								className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
									activeSection === "offers"
										? "bg-white text-indigo-600"
										: "bg-indigo-500/30 text-white hover:bg-indigo-500/50"
								}`}
							>
								💼 Job Offers
							</button>
							<button
								onClick={() => setActiveSection("leaderboard")}
								className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
									activeSection === "leaderboard"
										? "bg-white text-indigo-600"
										: "bg-indigo-500/30 text-white hover:bg-indigo-500/50"
								}`}
							>
								🏆 Leaderboard
							</button>
						</div>
					</div>
				</div>
			</section>

			{showUserStatus && (
				<section className="py-4 bg-white dark:bg-zinc-800 shadow-md">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
							<div>
								<p className="font-bold text-xl text-zinc-900 dark:text-white">
									Cleaner: Sarah Wilson
								</p>
								<p className="text-2xl font-black text-emerald-600">
									${userBalance.toFixed(2)}
								</p>
								<p className="text-sm text-zinc-600 dark:text-zinc-400">
									Tasks completed: {tasksCompleted} | Streak: {streak} days 🔥
								</p>
							</div>
							<div className="flex gap-3">
								<Link
									href="/earn"
									className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
								>
									💸 Payout
								</Link>
							</div>
						</div>
					</div>
				</section>
			)}

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{activeSection === "tasks" && (
					<div className="space-y-8">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg text-center">
								<div className="text-3xl mb-2">🥇</div>
								<h3 className="text-xl font-bold mb-1">#1 Local</h3>
								<p className="text-yellow-100 text-sm">This week</p>
							</div>
							{badges.slice(0, 5).map((badge, i) => (
								<div
									key={i}
									className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow text-center"
								>
									<span className="text-3xl">{badge}</span>
								</div>
							))}
						</div>

						<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg">
							<div className="flex justify-between items-start mb-6">
								<div>
									<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
										Available Tasks
									</h2>
									<p className="text-zinc-600 dark:text-zinc-400">
										Earn $0.10-$2.00 per task training cleaning AI models
									</p>
								</div>
								<div className="text-right">
									<div className="text-2xl font-bold text-emerald-600">
										$1.47 avg/task
									</div>
									<div className="text-sm text-zinc-500">
										Available: {availableTasks}
									</div>
								</div>
							</div>

							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
								{tasks.map((task) => (
									<button
										key={task.id}
										onClick={() => openTaskModal(task)}
										className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all hover:shadow-md"
									>
										<div className="flex justify-between items-start mb-2">
											<span
												className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(task.rarity)}`}
											>
												{task.rarity}
											</span>
											<span className="font-bold text-emerald-600">
												${task.reward.toFixed(2)}
											</span>
										</div>
										<p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2 line-clamp-2">
											{task.prompt}
										</p>
										<div className="flex justify-between text-xs text-zinc-500">
											<span>⏱️ {task.estTime}</span>
											<span>{task.category}</span>
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				{activeSection === "heatmap" && (
					<div className="space-y-6">
						<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg">
							<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
								<div>
									<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
										📍 Cleaning Jobs Heatmap
									</h2>
									<p className="text-zinc-600 dark:text-zinc-400">
										Red = Immediate | Purple = Premium ($2+/hr)
									</p>
								</div>
								<div className="flex flex-wrap gap-3">
									<select className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
										<option>All Jobs</option>
										<option>Deep Clean</option>
										<option>Office</option>
										<option>Move-out</option>
									</select>
								</div>
							</div>

							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
								{jobs.map((job) => (
									<div
										key={job.id}
										className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl"
									>
										<div className="flex justify-between items-start mb-3">
											<span
												className={`px-2 py-1 rounded text-xs text-white ${getUrgencyColor(job.urgency)}`}
											>
												{job.urgency}
											</span>
											<span className="font-bold text-emerald-600">
												${job.pay}
											</span>
										</div>
										<h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
											{job.title}
										</h3>
										<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
											{job.location}
										</p>
										<div className="flex justify-between text-sm">
											<span className="text-zinc-500">{job.type}</span>
											<span className="text-zinc-500">{job.distance}</span>
										</div>
										<div className="mt-2 flex items-center gap-1">
											<span className="text-amber-500">⭐</span>
											<span className="text-sm font-medium">
												{job.clientRating}
											</span>
										</div>
									</div>
								))}
							</div>

							<div className="mt-6 flex flex-wrap gap-4 p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl">
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-red-500 rounded"></div>
									<span className="text-sm">Immediate (0-15min)</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-orange-500 rounded"></div>
									<span className="text-sm">Soon (15-45min)</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-yellow-500 rounded"></div>
									<span className="text-sm">Standard</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-purple-500 rounded"></div>
									<span className="text-sm">Premium Surge</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-emerald-500 rounded"></div>
									<span className="text-sm">Recurring Client</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{activeSection === "offers" && (
					<div className="space-y-6">
						<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg">
							<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
								💼 Incoming Job Offers
							</h2>
							<div className="space-y-4">
								{offers.map((offer) => (
									<div
										key={offer.id}
										className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl flex justify-between items-center"
									>
										<div>
											<h3 className="font-semibold text-zinc-900 dark:text-white">
												{offer.client}
											</h3>
											<p className="text-sm text-zinc-600 dark:text-zinc-400">
												{offer.job}
											</p>
											<p className="text-xs text-zinc-500 mt-1">{offer.time}</p>
										</div>
										<div className="text-right">
											<p className="text-xl font-bold text-emerald-600">
												${offer.pay}
											</p>
											<button className="mt-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors">
												Accept
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{activeSection === "leaderboard" && (
					<div className="space-y-6">
						<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg">
							<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
								🏆 Weekly Leaderboard
							</h2>
							<div className="space-y-3">
								{leaderboard.map((entry) => (
									<div
										key={entry.rank}
										className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-xl flex justify-between items-center"
									>
										<div className="flex items-center gap-4">
											<span className="text-2xl">{entry.badge}</span>
											<div>
												<h3 className="font-semibold text-zinc-900 dark:text-white">
													{entry.name}
												</h3>
												<p className="text-sm text-zinc-500">
													{entry.tasks} tasks
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-xl font-bold text-emerald-600">
												${entry.earnings.toFixed(2)}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</main>

			{showModal && selectedTask && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
					<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-bold text-zinc-900 dark:text-white">
								Task Details
							</h3>
							<button
								onClick={closeTaskModal}
								className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-2xl"
							>
								×
							</button>
						</div>

						<div className="mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
							<p className="text-zinc-700 dark:text-zinc-300">
								{selectedTask.prompt}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4 mb-4 text-sm">
							<div>
								<span className="text-zinc-500">Reward:</span>
								<span className="ml-2 font-bold text-emerald-600">
									${selectedTask.reward.toFixed(2)}
								</span>
							</div>
							<div>
								<span className="text-zinc-500">Est. time:</span>
								<span className="ml-2 font-medium">{selectedTask.estTime}</span>
							</div>
							<div>
								<span className="text-zinc-500">Rarity:</span>
								<span
									className={`ml-2 px-2 py-0.5 rounded text-xs ${getRarityColor(selectedTask.rarity)}`}
								>
									{selectedTask.rarity}
								</span>
							</div>
							<div>
								<span className="text-zinc-500">Category:</span>
								<span className="ml-2 font-medium">
									{selectedTask.category}
								</span>
							</div>
						</div>

						<div className="mb-4 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-xl min-h-[150px] flex items-center justify-center">
							<div className="text-center text-zinc-500">
								<span className="text-4xl block mb-2">📸</span>
								<p>Media capture area</p>
							</div>
						</div>

						<div className="flex gap-3">
							<button
								onClick={startCapture}
								disabled={capturing}
								className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
							>
								{capturing ? "🎥 Recording..." : "🎥 Start Capture"}
							</button>
							<button
								onClick={submitTask}
								disabled={qualityScore === 0}
								className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
							>
								✅ Submit (${(selectedTask.reward + rarityBonus).toFixed(2)})
							</button>
						</div>

						<div className="grid grid-cols-2 gap-4 mt-4 p-3 bg-zinc-50 dark:bg-zinc-700 rounded-lg text-sm">
							<div>
								<span className="text-zinc-500">Quality:</span>
								<span className="ml-2 font-medium">{qualityScore}%</span>
							</div>
							<div>
								<span className="text-zinc-500">AI Score:</span>
								<span
									className={`ml-2 font-medium ${aiScore === "Approved" ? "text-green-600" : "text-amber-600"}`}
								>
									{aiScore}
								</span>
							</div>
							<div>
								<span className="text-zinc-500">Rarity bonus:</span>
								<span className="ml-2 font-medium text-purple-600">
									+${rarityBonus.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="fixed bottom-4 right-4">
				<button
					onClick={() => setShowUserStatus(!showUserStatus)}
					className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
				>
					👤
				</button>
			</div>
		</>
	);
}
