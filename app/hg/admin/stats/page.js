"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function StatsPage() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [registrationCount, setRegistrationCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newRegistrationCount, setNewRegistrationCount] = useState(0); // State for updating total registrations

  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null); // Store the token

  useEffect(() => {
    const verifyToken = async () => {
      const queryToken = searchParams.get("token"); // Get token from query params

      if (!queryToken) {
        router.push("/"); // Redirect to `/` if token is missing
        return;
      }

      try {
        const res = await fetch("/api/tokens/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: queryToken })
        });

        const result = await res.json();

        if (!result.success) {
          router.push("/"); // Redirect to `/` if token is invalid
        } else {
          setToken(queryToken); // Set the token if valid
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        router.push("/"); // Redirect to `/` on error
      }
    };

    verifyToken();
  }, [searchParams, router]);


  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

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
        setNewRegistrationCount(registrationData.total); // Initialize the input field with the current count
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

      // Send PUT request to update registration count
      const response = await fetch("/api/registrations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: newRegistrationCount }),
      });

      const result = await response.json();
      if (response.ok) {
        setRegistrationCount(result.total); // Update the displayed count
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