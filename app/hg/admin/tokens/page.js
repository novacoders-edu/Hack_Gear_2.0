"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import { FaPlus, FaTrash, FaCopy, FaToggleOn, FaToggleOff } from "react-icons/fa";

function TokenManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null); // Store the token
  const [check, setCheck] = useState(null)
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    expiresInDays: ""
  });

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

  const fetchTokens = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tokens",{
        headers:{
          "hg-api-token":token
        }
      });
      const data = await res.json();
      setTokens(data);
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if(token){
      fetchTokens();
    }
  }, [token, check, fetchTokens]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json","hg-api-token":token },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Token created successfully!");
        setShowForm(false);
        setFormData({ name: "", description: "", expiresInDays: "" });
        fetchTokens();
      } else {
        alert("Failed to create token");
      }
    } catch (error) {
      console.error("Error creating token:", error);
      alert("Error creating token");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/tokens/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "hg-api-token":token
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (res.ok) {
        fetchTokens();
      }
    } catch (error) {
      console.error("Error toggling token:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this token?")) return;

    try {
      const res = await fetch(`/api/tokens/${id}`, {
        method: "DELETE",
        headers:{
          "hg-api-token":token
        }
      });

      if (res.ok) {
        alert("Token deleted successfully!");
        fetchTokens();
      }
    } catch (error) {
      console.error("Error deleting token:", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Token copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-cyber-black py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="heading-font text-4xl font-black text-white uppercase">
            API TOKENS<span className="text-cyan-neon">.</span>
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-cyan-neon text-black font-bold uppercase flex items-center gap-2"
          >
            <FaPlus /> Create Token
          </button>
        </div>

        {showForm && (
          <div className="bg-neutral-900 border border-neutral-800 p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Create New Token</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Token Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                rows="3"
              />
              <input
                type="number"
                placeholder="Expires in days (leave empty for no expiration)"
                value={formData.expiresInDays}
                onChange={(e) => setFormData({ ...formData, expiresInDays: e.target.value })}
                className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-cyan-neon text-black font-bold uppercase"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-neutral-700 text-white font-bold uppercase"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="space-y-4">
            {tokens.map((token) => (
              <div
                key={token._id}
                className="bg-neutral-900 border border-neutral-800 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{token.name}</h3>
                    <p className="text-sm text-neutral-400">{token.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-neutral-500">
                      <span>Created: {new Date(token.createdAt).toLocaleDateString()}</span>
                      {token.expiresAt && (
                        <span>Expires: {new Date(token.expiresAt).toLocaleDateString()}</span>
                      )}
                      <span>Usage: {token.usageCount}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggle(token._id, token.isActive)}
                      className={`px-3 py-2 ${token.isActive ? "bg-green-600" : "bg-red-600"
                        } text-white`}
                    >
                      {token.isActive ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                    <button
                      onClick={() => handleDelete(token._id)}
                      className="px-3 py-2 bg-red-600 text-white"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black p-3 border border-neutral-700">
                  <code className="flex-1 text-cyan-neon text-sm font-mono break-all">
                    {token.token}
                  </code>
                  <button
                    onClick={() => copyToClipboard(token.token)}
                    className="px-3 py-2 bg-cyan-600 text-white"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page(){
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TokenManagement/>
        </Suspense>
    )
}