"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaDatabase, FaChartBar, FaUsers, FaCog, FaArrowRight } from "react-icons/fa";

function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/admin/verify", {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();

        if (!result.success) {
          router.push("/login");
        } else {
          setAdmin(result.data);
          setLoading(false)
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        router.push("/login");
      }
    };

    verifyToken();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST"
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.push("/login");
    }
  };

  const dashboardCards = [
    {
      id: "tokens",
      icon: FaDatabase,
      title: "API Tokens",
      description: "Manage and monitor API tokens usage",
      color: "from-cyan-neon/20 to-cyan-neon/5",
      borderColor: "border-cyan-neon",
      textColor: "#00E0FF",
      route: "/hg/admin/tokens"
    },
    {
      id: "stats",
      icon: FaChartBar,
      title: "Statistics",
      description: "View detailed analytics and reports",
      color: "from-purple-neon/20 to-purple-neon/5",
      borderColor: "border-purple-neon",
      textColor: "#B026FF",
      route: "/hg/admin/stats"
    },
    {
      id: "content",
      icon: FaUsers,
      title: "Content Management",
      description: "Edit core team, judges, and more",
      color: "from-pink-neon/20 to-pink-neon/5",
      borderColor: "border-pink-neon",
      textColor: "#FF006E",
      route: "/hg/admin/content"
    },
    {
      id: "attendance",
      icon: FaCog,
      title: "Attendance System",
      description: "Manage event attendance data",
      color: "from-green-neon/20 to-green-neon/5",
      borderColor: "border-green-neon",
      textColor: "#39FF14",
      route: "/hg/admin/attendance"
    }
  ];

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cyber-black">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-cyan-neon border-r-transparent rounded-full"></div>
          <p className="text-cyan-neon mt-4 font-bold uppercase">Loading Dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16 bg-cyber-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-neon opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-neon opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start mb-12"
        >
          <div>
            <h1 className="heading-font text-4xl md:text-6xl font-black text-white uppercase mb-2">
              DASHBOARD<span className="text-cyan-neon">.</span>
            </h1>
            <p className="sub-font text-cyan-neon font-bold text-sm tracking-widest">
              Welcome, {admin?.email}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 bg-red-900 border border-red-600 text-red-400 font-bold uppercase text-sm hover:bg-red-800 transition flex items-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </motion.button>
        </motion.div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  onClick={() => router.push(card.route)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group"
                >
                  <div
                    className={`relative h-64 bg-gradient-to-br ${card.color} border-2 ${card.borderColor} p-8 overflow-hidden transition-all duration-300`}
                    style={{
                      boxShadow: `0 0 20px ${card.textColor}40`
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                        backgroundSize: "30px 30px"
                      }} />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-4 rounded border-2 ${card.borderColor}`}>
                          <Icon className="text-2xl" style={{ color: card.textColor }} />
                        </div>
                      </div>

                      <div className="text-left">
                        <h3 className="text-2xl font-bold text-white uppercase mb-2">
                          {card.title}
                        </h3>
                        <p className="text-neutral-400 text-sm">
                          {card.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-cyan-neon font-bold uppercase text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Explore</span>
                        <FaArrowRight />
                      </div>
                    </div>

                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-neon opacity-50"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-neon opacity-50"></div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-black border border-neutral-800 p-6 rounded"
        >
          <h3 className="text-cyan-neon font-bold uppercase mb-4 flex items-center gap-2">
            <FaCog /> System Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-neutral-500">Admin Level</p>
              <p className="text-white font-bold uppercase">ADMIN</p>
            </div>
            <div>
              <p className="text-neutral-500">Email Address</p>
              <p className="text-white font-mono break-all">{admin?.email}</p>
            </div>
            <div>
              <p className="text-neutral-500">Session Status</p>
              <p className="text-green-400 font-bold">ACTIVE</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
