"use client";

import { useState, useEffect, useRef } from "react";

export default function NanochatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Nanochat, your 2026 AI-Native Librarian. How can I help you optimize your cleaning workflow today?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated 2026 SMLM Response (Optimized with Flash Attention 3 & RoPE)
    setTimeout(() => {
      let response = "I've analyzed your request using my 1.9B parameter core. ";
      if (input.toLowerCase().includes("cleaning")) {
        response += "For optimal efficiency, I recommend the 'Microtasks Hub' to contribute data for our next-gen cleaning vision models. This path has the highest authority-weight in our current WikiLLM.";
      } else if (input.toLowerCase().includes("security")) {
        response += "Our 2026 security protocols use Shift-Left scanning. Check 'scripts/security_check.py' to see how we verify the integrity of our centaur workflows.";
      } else {
        response += "I'm currently running on a sliding-window KV cache to minimize token entropy. Ask me about our 3-Layer WikiLLM architecture or our Muon-optimized training routines!";
      }
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95 group"
        >
          🤖
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
          </span>
        </button>
      ) : (
        <div className="bg-white dark:bg-zinc-900 w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-bold text-sm leading-tight">Nanochat SMLM</h3>
                <p className="text-[10px] text-indigo-200 uppercase tracking-widest font-bold">1.9B | Flash-3 | RoPE</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white text-2xl">
              ×
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-none" 
                    : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm border border-zinc-100 dark:border-zinc-700 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
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
                placeholder="Ask Nanochat..."
                className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-white"
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
