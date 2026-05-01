"use client";

import { useEffect, useRef, useState } from "react";
import { type AnswerEngineResponse, answerQuery, QUICK_ACTIONS } from "../lib/ai/answer-engine";

interface ChatMessage {
	role: "user" | "assistant";
	content: string;
	relatedQuestions?: string[];
}

export default function NanochatAssistant() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			role: "assistant",
			content:
				"Hi! I'm the AASTACLEAN AI Assistant. I can help you with pricing, services, booking, and more. How can I help?",
		},
	]);
	const [input, setInput] = useState("");
	const [isThinking, setIsThinking] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, []);

	const handleSend = (message?: string) => {
		const text = (message || input).trim();
		if (!text || isThinking) return;

		const userMessage: ChatMessage = { role: "user", content: text };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsThinking(true);

		// Answer engine retrieval
		setTimeout(
			() => {
				const response: AnswerEngineResponse = answerQuery(text);
				const assistantMessage: ChatMessage = {
					role: "assistant",
					content: response.answer,
					relatedQuestions: response.relatedQuestions,
				};
				setMessages((prev) => [...prev, assistantMessage]);
				setIsThinking(false);
			},
			800 + Math.random() * 700,
		);
	};

	const handleRelatedQuestion = (question: string) => {
		handleSend(question);
	};

	const handleQuickAction = (query: string) => {
		handleSend(query);
	};

	// Typing indicator dots
	const TypingIndicator = () => (
		<div className="flex justify-start">
			<div className="max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700">
				<div className="flex gap-1.5 items-center h-5">
					<span
						className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
						style={{ animationDelay: "0ms" }}
					/>
					<span
						className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
						style={{ animationDelay: "150ms" }}
					/>
					<span
						className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
						style={{ animationDelay: "300ms" }}
					/>
				</div>
			</div>
		</div>
	);

	return (
		<div className="fixed bottom-6 left-6 z-[60]">
			{!isOpen ? (
				<button
					onClick={() => setIsOpen(true)}
					aria-label="Open AASTACLEAN AI Assistant"
					className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95 group"
				>
					💬
					<span className="absolute -top-1 -right-1 flex h-4 w-4">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
					</span>
				</button>
			) : (
				<div
					role="dialog"
					aria-label="AI Assistant Chat"
					className="bg-white dark:bg-zinc-900 w-80 sm:w-96 h-[560px] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
				>
					{/* Header */}
					<div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
						<div className="flex items-center gap-2">
							<span className="text-2xl">💬</span>
							<div>
								<h3 className="font-bold text-sm leading-tight">AASTACLEAN Assistant</h3>
								<p className="text-[10px] text-indigo-200">AI-Powered Support</p>
							</div>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							aria-label="Close assistant"
							className="text-white/80 hover:text-white text-2xl"
						>
							&times;
						</button>
					</div>

					{/* Messages */}
					<div
						ref={scrollRef}
						className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950"
						aria-live="polite"
					>
						{messages.map((msg, i) => (
							<div key={i}>
								<div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
									<div
										className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
											msg.role === "user"
												? "bg-indigo-600 text-white rounded-tr-none"
												: "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm border border-zinc-100 dark:border-zinc-700 rounded-tl-none"
										}`}
									>
										{msg.content}
									</div>
								</div>
								{/* Related questions after assistant messages */}
								{msg.role === "assistant" &&
									msg.relatedQuestions &&
									msg.relatedQuestions.length > 0 && (
										<div className="mt-2 ml-1 space-y-1.5">
											<p className="text-xs text-zinc-500 dark:text-zinc-400">Related questions:</p>
											{msg.relatedQuestions.map((q, j) => (
												<button
													key={j}
													onClick={() => handleRelatedQuestion(q)}
													className="block w-full text-left text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg px-3 py-1.5 transition-colors"
												>
													{q}
												</button>
											))}
										</div>
									)}
							</div>
						))}
						{isThinking && <TypingIndicator />}
					</div>

					{/* Quick Actions */}
					<div className="px-4 py-2 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-2 overflow-x-auto">
						{QUICK_ACTIONS.map((action) => (
							<button
								key={action.label}
								onClick={() => handleQuickAction(action.query)}
								disabled={isThinking}
								className="shrink-0 text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-zinc-700 dark:text-zinc-300 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-full px-3 py-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{action.icon} {action.label}
							</button>
						))}
					</div>

					{/* Input */}
					<div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
						<div className="flex gap-2">
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSend()}
								placeholder="Ask about our services, pricing, booking..."
								disabled={isThinking}
								className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-white placeholder:text-zinc-400 disabled:opacity-50"
							/>
							<button
								onClick={() => handleSend()}
								disabled={isThinking || !input.trim()}
								className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white p-2 rounded-xl transition-colors disabled:cursor-not-allowed"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
