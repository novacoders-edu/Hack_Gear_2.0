"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { FaQrcode, FaDownload, FaTrash, FaUsers, FaCheckCircle } from "react-icons/fa";
import QRScanner from "@/components/QRScanner";

const token = process.env.NEXT_PUBLIC_HS_API_TOKEN;
function AttendanceManagement() {
  const router = useRouter();
  const [attendances, setAttendances] = useState([]);
  const [stats, setStats] = useState({ count: 0, uniqueTeams: 0 });
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [activeTab, setActiveTab] = useState("scan"); // scan, list, generate, manual

  // QR Generation form
  const [qrForm, setQrForm] = useState({
    team_id: "",
    team_name: "",
    name: "",
    email: "",
    role: ""
  });
  const [generatedQR, setGeneratedQR] = useState(null);

  // Manual attendance form
  const [manualForm, setManualForm] = useState({
    team_id: "",
    team_name: "",
    name: "",
    email: "",
    role: ""
  });

  // Verify token from cookies
  useEffect(() => {
    const verifyToken = async () => {

      try {
        const res = await fetch("/api/admin/verify", {
          credentials:"include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        console.log("result in attendance is : ",result)

        if (!result.success) {
          router.push("/login");
        }else {
          setLoading2(false)
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        router.push("/login");
      }finally{
        setLoading2(false)
      }
    };

    verifyToken();
  }, [router]);

  // Fetch attendance records
  const fetchAttendances = async () => {

    setLoading(true);
    try {
      const res = await fetch("/api/attendance", {
        headers: { "hg-api-token": token }
      });
      const data = await res.json();
      
      if (data.success) {
        setAttendances(data.attendances);
        setStats({ count: data.count, uniqueTeams: data.uniqueTeams });
      }
    } catch (error) {
      console.error("Failed to fetch attendances:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && activeTab === "list") {
      fetchAttendances();
    }
  }, [activeTab]);

  // Generate QR code
  const handleGenerateQR = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/attendance/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "hg-api-token": token
        },
        body: JSON.stringify(qrForm)
      });

      const result = await res.json();

      if (result.success) {
        setGeneratedQR(result);
        alert("QR Code generated successfully!");
      } else {
        alert("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating QR:", error);
      alert("Error generating QR code");
    } finally {
      setLoading(false);
    }
  };

  // Download QR code
  const downloadQR = () => {
    if (!generatedQR) return;

    const link = document.createElement("a");
    link.href = generatedQR.qrCode;
    link.download = `${qrForm.name.replace(/\s+/g, "_")}_QR.png`;
    link.click();
  };

  // Delete attendance
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this attendance record?")) return;

    try {
      const res = await fetch(`/api/attendance?id=${id}`, {
        method: "DELETE",
        headers: { "hg-api-token": token }
      });

      if (res.ok) {
        alert("Attendance deleted successfully!");
        fetchAttendances();
      }
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  // Handle scan success
  const handleScanSuccess = (result) => {
    fetchAttendances();
  };

  // Manual attendance entry
  const handleManualAttendance = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/attendance/manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "hg-api-token": token
        },
        body: JSON.stringify(manualForm)
      });

      const result = await res.json();

      if (result.success) {
        alert("Attendance marked successfully!");
        setManualForm({
          team_id: "",
          team_name: "",
          name: "",
          email: "",
          role: ""
        });
        fetchAttendances();
      } else {
        alert(result.message || "Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (attendances.length === 0) {
      alert("No attendance records to export");
      return;
    }

    // CSV headers
    const headers = ["Team ID", "Team Name", "Member Name", "Email", "Role", "Marked At", "Marked By"];
    
    // CSV rows
    const rows = attendances.map(a => [
      a.teamId,
      a.teamName,
      a.memberName,
      a.email,
      a.role,
      new Date(a.markedAt).toLocaleString(),
      a.markedBy
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading2) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">Verifying access...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white uppercase mb-2">
            ATTENDANCE SYSTEM<span className="text-cyan-500">.</span>
          </h1>
          <p className="text-neutral-400">Scan QR codes and manage event attendance</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("scan")}
            className={`px-6 py-3 font-bold uppercase transition-colors ${
              activeTab === "scan"
                ? "bg-cyan-500 text-black"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
          >
            <FaQrcode className="inline mr-2" /> Scan QR
          </button>
          <button
            onClick={() => setActiveTab("manual")}
            className={`px-6 py-3 font-bold uppercase transition-colors ${
              activeTab === "manual"
                ? "bg-cyan-500 text-black"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
          >
            <FaCheckCircle className="inline mr-2" /> Manual Entry
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-6 py-3 font-bold uppercase transition-colors ${
              activeTab === "list"
                ? "bg-cyan-500 text-black"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
          >
            <FaUsers className="inline mr-2" /> Attendance List
          </button>
          <button
            onClick={() => setActiveTab("generate")}
            className={`px-6 py-3 font-bold uppercase transition-colors ${
              activeTab === "generate"
                ? "bg-cyan-500 text-black"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
          >
            <FaQrcode className="inline mr-2" /> Generate QR
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "scan" && (
          <div>
            <QRScanner 
              onScanSuccess={handleScanSuccess}
              onScanError={(error) => console.error(error)}
            />
          </div>
        )}

        {activeTab === "manual" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-neutral-900 border-2 border-cyan-500 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Manual Attendance Entry</h2>
              <p className="text-neutral-400 mb-6 text-sm">
                Use this form when QR code scanning is not working or unavailable.
              </p>
              
              <form onSubmit={handleManualAttendance} className="space-y-4">
                <input
                  type="text"
                  placeholder="Team ID"
                  value={manualForm.team_id}
                  onChange={(e) => setManualForm({ ...manualForm, team_id: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Team Name"
                  value={manualForm.team_name}
                  onChange={(e) => setManualForm({ ...manualForm, team_name: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Member Name"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={manualForm.email}
                  onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Status (e.g., Leader, Member)"
                  value={manualForm.role}
                  onChange={(e) => setManualForm({ ...manualForm, role: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold uppercase transition-colors disabled:opacity-50"
                >
                  {loading ? "Marking..." : "Mark Attendance"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "list" && (
          <div>
            {/* Stats & Export */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-neutral-900 border-2 border-cyan-500 p-6">
                <div className="flex items-center gap-4">
                  <FaCheckCircle className="text-4xl text-cyan-500" />
                  <div>
                    <p className="text-neutral-400 text-sm">Total Attendance</p>
                    <p className="text-3xl font-bold text-white">{stats.count}</p>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-900 border-2 border-cyan-500 p-6">
                <div className="flex items-center gap-4">
                  <FaUsers className="text-4xl text-cyan-500" />
                  <div>
                    <p className="text-neutral-400 text-sm">Unique Teams</p>
                    <p className="text-3xl font-bold text-white">{stats.uniqueTeams}</p>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-900 border-2 border-cyan-500 p-6">
                <button
                  onClick={exportToCSV}
                  disabled={attendances.length === 0}
                  className="w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaDownload className="text-4xl text-cyan-500" />
                  <span className="text-white font-bold">Export CSV</span>
                  <span className="text-neutral-400 text-xs">Download all records</span>
                </button>
              </div>
            </div>

            {/* Attendance List */}
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : (
              <div className="space-y-4">
                {attendances.length === 0 ? (
                  <div className="bg-neutral-900 border border-neutral-800 p-8 text-center">
                    <p className="text-neutral-400">No attendance records yet</p>
                  </div>
                ) : (
                  attendances.map((attendance) => (
                    <div
                      key={attendance._id}
                      className="bg-neutral-900 border border-neutral-800 p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white">{attendance.memberName}</h3>
                          <p className="text-sm text-neutral-400">{attendance.email}</p>
                          <div className="flex gap-4 mt-2 text-xs text-neutral-500">
                            <span>Team: {attendance.teamName} ({attendance.teamId})</span>
                            <span>Role: {attendance.role}</span>
                            <span>Marked: {new Date(attendance.markedAt).toLocaleString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(attendance._id)}
                          className="px-3 py-2 bg-red-600 text-white hover:bg-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "generate" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-neutral-900 border-2 border-cyan-500 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Generate QR Code</h2>
              
              <form onSubmit={handleGenerateQR} className="space-y-4">
                <input
                  type="text"
                  placeholder="Team ID"
                  value={qrForm.team_id}
                  onChange={(e) => setQrForm({ ...qrForm, team_id: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Team Name"
                  value={qrForm.team_name}
                  onChange={(e) => setQrForm({ ...qrForm, team_name: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Member Name"
                  value={qrForm.name}
                  onChange={(e) => setQrForm({ ...qrForm, name: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={qrForm.email}
                  onChange={(e) => setQrForm({ ...qrForm, email: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Status (e.g., Leader, Member, Developer)"
                  value={qrForm.role}
                  onChange={(e) => setQrForm({ ...qrForm, role: e.target.value })}
                  className="w-full p-3 bg-black border border-neutral-700 text-white"
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold uppercase transition-colors"
                >
                  Generate QR Code
                </button>
              </form>

              {/* Generated QR Display */}
              {generatedQR && (
                <div className="mt-6 p-4 bg-black border border-neutral-700">
                  <div className="text-center mb-4">
                    <img
                      src={generatedQR.qrCode}
                      alt="Generated QR Code"
                      className="mx-auto max-w-xs"
                    />
                  </div>
                  <div className="text-sm text-neutral-300 mb-4">
                    <p>Team: {generatedQR.data.team_name}</p>
                    <p>Member: {generatedQR.data.name}</p>
                    <p>Email: {generatedQR.data.email}</p>
                  </div>
                  <button
                    onClick={downloadQR}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold uppercase flex items-center justify-center gap-2"
                  >
                    <FaDownload /> Download QR Code
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>}>
      <AttendanceManagement />
    </Suspense>
  );
}
