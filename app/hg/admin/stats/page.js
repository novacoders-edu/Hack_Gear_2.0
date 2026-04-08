"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

function StatsPage() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [registrationCount, setRegistrationCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newRegistrationCount, setNewRegistrationCount] = useState(0);
  const [admin, setAdmin] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/admin/verify", {
          credentials:"include",
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

  useEffect(() => {
    if (admin) {
      fetchStats();
    }
  }, [admin]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch visitor count
      const visitorRes = await fetch("/api/visitors");
      const visitorData = await visitorRes.json();
      if (visitorRes.ok) {
        setVisitorCount(visitorData.count);
      } else {
        console.error("Failed to fetch visitor count:", visitorData.message);
      }

      // Fetch registration count
      const registrationRes = await fetch("/api/registrations");
      const registrationData = await registrationRes.json();
      if (registrationRes.ok) {
        setRegistrationCount(registrationData.total);
        setNewRegistrationCount(registrationData.total);
      } else {
        console.error("Failed to fetch registration count:", registrationData.message);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/registrations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ count: newRegistrationCount })
      });

      const result = await response.json();
      if (response.ok) {
        setRegistrationCount(result.total);
      } else {
        console.error("Failed to update registration count:", result.message);
      }
    } catch (error) {
      console.error("Error updating registration count:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-16 bg-cyber-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push("/hg/admin")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 px-4 py-2 bg-neutral-800 border border-neutral-700 text-white font-bold uppercase text-sm flex items-center gap-2 hover:border-cyan-neon transition"
        >
          <FaArrowLeft /> Back to Dashboard
        </motion.button>

        <h1 className="text-4xl font-bold text-white mb-8">Admin Stats</h1>

        {loading ? (
          <p className="text-white">Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Total Visitors */}
            <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-cyan-neon mb-4">Total Visitors</h2>
              <p className="text-4xl font-black text-white">{visitorCount ?? "N/A"}</p>
            </div>

            {/* Total Registrations */}
            <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-purple-electric mb-4">Total Registrations</h2>
              <p className="text-4xl font-black text-white">{registrationCount ?? "N/A"}</p>

              {/* Update Registration Count Section */}
              <div className="mt-4">
                <label className="block text-white font-bold mb-2">
                  Update Total Registrations:
                </label>
                <input
                  type="number"
                  value={newRegistrationCount}
                  onChange={(e) => setNewRegistrationCount(Number(e.target.value))}
                  className="w-full p-2 bg-neutral-800 text-white border border-neutral-700 rounded"
                  min="0"
                />
                <button
                  onClick={handleUpdate}
                  className="mt-4 px-4 py-2 bg-purple-electric text-black font-bold rounded hover:bg-purple-600 transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Page(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatsPage/>
    </Suspense>
  )
}
