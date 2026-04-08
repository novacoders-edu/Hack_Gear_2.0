"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          const res = await fetch("/api/admin/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
          });

          if (res.ok) {
            router.push("/hg/admin");
          }
        } catch (err) {
          localStorage.removeItem("adminToken");
        }
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("adminToken", data.token);
      setSuccess(true);

      // Redirect after brief delay
      setTimeout(() => {
        router.push("/hg/admin");
      }, 500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-cyber-black py-12 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-neon opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-neon opacity-5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-black border-2 border-cyan-neon shadow-lg shadow-cyan-neon/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="heading-font text-4xl font-black text-white uppercase mb-2">
              ADMIN<span className="text-cyan-neon">.</span>
            </h1>
            <p className="sub-font text-cyan-neon font-bold text-sm tracking-widest">
              SECURE ACCESS ONLY
            </p>
            <div className="w-12 h-1 bg-cyan-neon mx-auto mt-4"></div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-900/20 border border-red-neon text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-green-900/20 border border-green-400 text-green-400 text-sm"
            >
              Login successful! Redirecting...
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-white text-sm font-bold mb-2 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-cyan-neon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  disabled={loading}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white text-sm font-bold mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-cyan-neon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-6 py-3 bg-cyan-neon text-black font-bold uppercase tracking-widest hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <FaLock />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <p className="text-center text-neutral-500 text-xs uppercase tracking-wider">
              Authorized Personnel Only
            </p>
            <p className="text-center text-neutral-600 text-xs mt-2">
              All access attempts are logged and monitored
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-neon"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-neon"></div>
      </motion.div>
    </section>
  );
}
