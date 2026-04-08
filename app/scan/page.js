"use client";

import QRScanner from "@/components/QRScanner";
import { useState } from "react";
import { FaArrowLeft, FaQrcode, FaEdit } from "react-icons/fa";
import Link from "next/link";

export default function PublicScannerPage() {
  const [scanHistory, setScanHistory] = useState([]);
  const [mode, setMode] = useState("scan"); // "scan" or "manual"
  const [loading, setLoading] = useState(false);
  const [manualForm, setManualForm] = useState({
    team_id: "",
    team_name: "",
    name: "",
    email: "",
    role: ""
  });

  const handleScanSuccess = (result) => {
    setScanHistory(prev => [result, ...prev].slice(0, 10)); // Keep last 10 scans
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/attendance/manual-public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manualForm)
      });

      const result = await res.json();

      // Add to history
      setScanHistory(prev => [result, ...prev].slice(0, 10));

      if (result.success) {
        // Clear form
        setManualForm({
          team_id: "",
          team_name: "",
          name: "",
          email: "",
          role: ""
        });
      }
    } catch (error) {
      console.error("Manual entry error:", error);
      setScanHistory(prev => [{
        success: false,
        message: "Failed to mark attendance",
        data: null
      }, ...prev].slice(0, 10));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-4"
          >
            <FaArrowLeft /> Back to Home
          </Link>
          <h1 className="text-4xl font-black text-white uppercase mb-2">
            HACKGEAR 2.0<span className="text-cyan-500">.</span>
          </h1>
          <p className="text-neutral-400">Attendance Scanner</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("scan")}
            className={`flex-1 px-6 py-3 font-bold uppercase transition-colors ${
              mode === "scan"
                ? "bg-cyan-500 text-black"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
          >
            <FaQrcode className="inline mr-2" /> Scan QR
          </button>
          <button
            onClick={() => setMode("manual")}
            className={`flex-1 px-6 py-3 font-bold uppercase transition-colors ${
              mode === "manual"
                ? "bg-cyan-500 text-black"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
          >
            <FaEdit className="inline mr-2" /> Manual Entry
          </button>
        </div>

        {/* Scanner */}
        {mode === "scan" && (
          <div className="mb-8">
            <QRScanner 
              onScanSuccess={handleScanSuccess}
              onScanError={(error) => console.error(error)}
            />
          </div>
        )}

        {/* Manual Entry Form */}
        {mode === "manual" && (
          <div className="mb-8">
            <div className="bg-neutral-900 border-2 border-cyan-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                MANUAL ATTENDANCE ENTRY
              </h2>
              <p className="text-neutral-400 mb-6 text-sm text-center">
                Use this form when QR code is not available
              </p>
              
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Team ID"
                  value={manualForm.team_id}
                  onChange={(e) => setManualForm({ ...manualForm, team_id: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Team Name"
                  value={manualForm.team_name}
                  onChange={(e) => setManualForm({ ...manualForm, team_name: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Member Name"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={manualForm.email}
                  onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Status (e.g., Leader, Member)"
                  value={manualForm.role}
                  onChange={(e) => setManualForm({ ...manualForm, role: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white rounded"
                  required
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold uppercase transition-colors disabled:opacity-50 rounded"
                >
                  {loading ? "Marking..." : "Mark Attendance"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="bg-neutral-900 border-2 border-cyan-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Scans</h2>
            <div className="space-y-3">
              {scanHistory.map((scan, index) => (
                <div
                  key={index}
                  className={`p-4 rounded border-2 ${
                    scan.success
                      ? "bg-green-900 border-green-500"
                      : "bg-red-900 border-red-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-bold">{scan.data?.memberName || "Unknown"}</p>
                      <p className="text-sm text-neutral-300">{scan.data?.teamName || "N/A"}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      scan.success ? "bg-green-600" : "bg-red-600"
                    }`}>
                      {scan.success ? "✓ Success" : "✗ Failed"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">{scan.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-neutral-900 border border-neutral-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-3">Instructions</h3>
          <ul className="text-neutral-300 space-y-2 text-sm">
            <li>• <strong>Scan QR:</strong> Click "Start Scanning" and point camera at QR code</li>
            <li>• <strong>Manual Entry:</strong> Switch to manual tab if QR is not available</li>
            <li>• Attendance will be marked automatically</li>
            <li>• Green = Success, Red = Already marked or error</li>
            <li>• Each person can only mark attendance once</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
