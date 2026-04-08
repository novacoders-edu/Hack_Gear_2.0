"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import dynamic from "next/dynamic";

// Import the existing admin panel component
const AdminPanel = dynamic(() => import("@/app/hg/admin/content-management"), {
  loading: () => <div className="text-white">Loading...</div>,
  ssr: false
});

function ContentManagementWrapper() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cyber-black">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-cyan-neon border-r-transparent rounded-full"></div>
          <p className="text-cyan-neon mt-4 font-bold uppercase">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push("/hg/admin")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 px-4 py-2 bg-neutral-800 border border-neutral-700 text-white font-bold uppercase text-sm flex items-center gap-2 hover:border-cyan-neon transition"
        >
          <FaArrowLeft /> Back to Dashboard
        </motion.button>
      </div>

      {/* Admin Panel */}
      <Suspense fallback={<div className="text-white text-center py-8">Loading...</div>}>
        <AdminPanel />
      </Suspense>
    </div>
  );
}

export default ContentManagementWrapper;
