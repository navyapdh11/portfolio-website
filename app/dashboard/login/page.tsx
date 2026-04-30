"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<"admin" | "customer">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get("redirect") || "/dashboard/admin";
  const paramError = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-red-500/20 mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-bold text-white">AASTACLEAN</h1>
          <p className="text-slate-400">Sign in to your dashboard</p>
        </div>

        {paramError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            Authentication required. Please sign in to continue.
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Role</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  role === "admin"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-slate-700/50 text-slate-400 border border-slate-600/50"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  role === "customer"
                    ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                    : "bg-slate-700/50 text-slate-400 border border-slate-600/50"
                }`}
              >
                Customer
              </button>
            </div>
          </div>

          {role === "customer" && (
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none"
                placeholder="customer@email.com"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-400 mb-1">
              {role === "admin" ? "Admin Secret" : "Password"}
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-sky-500 focus:outline-none"
              placeholder={role === "admin" ? "Enter admin secret" : "Enter password"}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white rounded-xl font-medium transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="text-center text-slate-400">Loading login form...</div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
