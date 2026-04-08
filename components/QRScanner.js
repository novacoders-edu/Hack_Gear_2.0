"use client";

import { useState, useRef, useEffect } from "react";
import { FaCamera, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import jsQR from "jsqr";

export default function QRScanner({ onScanSuccess, onScanError }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Start camera
  const startScanning = async () => {
    try {
      setError(null);
      setResult(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" } // Use back camera on mobile
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setScanning(true);

        // Start scanning loop
        scanIntervalRef.current = setInterval(() => {
          scanQRCode();
        }, 300); // Scan every 300ms
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Failed to access camera. Please grant camera permissions.");
    }
  };

  // Stop camera
  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setScanning(false);
  };

  // Scan QR code from video
  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        handleQRDetected(code.data);
      }
    }
  };

  // Handle QR code detection
  const handleQRDetected = async (qrData) => {
    stopScanning();
    setLoading(true);

    try {
      const response = await fetch("/api/attendance/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          encryptedData: qrData,
          markedBy: "web-scanner"
        })
      });

      const result = await response.json();

      if (result.success) {
        setResult({
          success: true,
          message: result.message,
          data: result.data
        });
        if (onScanSuccess) onScanSuccess(result);
      } else {
        setResult({
          success: false,
          message: result.message,
          data: result.data
        });
        if (onScanError) onScanError(result);
      }
    } catch (err) {
      console.error("Scan error:", err);
      const errorResult = {
        success: false,
        message: "Failed to process QR code"
      };
      setResult(errorResult);
      if (onScanError) onScanError(errorResult);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-neutral-900 border-2 border-cyan-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          QR ATTENDANCE SCANNER
        </h2>

        {/* Camera View */}
        <div className="relative mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`w-full rounded-lg ${scanning ? "block" : "hidden"}`}
          />
          <canvas ref={canvasRef} className="hidden" />

          {!scanning && !result && (
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <FaCamera className="text-6xl text-neutral-600" />
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
              <FaSpinner className="text-4xl text-cyan-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Result Display */}
        {result && (
          <div
            className={`mb-4 p-4 rounded-lg border-2 ${
              result.success
                ? "bg-green-900 border-green-500"
                : "bg-red-900 border-red-500"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {result.success ? (
                <FaCheckCircle className="text-2xl text-green-400" />
              ) : (
                <FaTimesCircle className="text-2xl text-red-400" />
              )}
              <span className="text-white font-bold">{result.message}</span>
            </div>

            {result.data && (
              <div className="text-sm text-neutral-200 space-y-1">
                <p>Team: {result.data.teamName}</p>
                <p>Member: {result.data.memberName}</p>
                <p>Role: {result.data.role}</p>
                <p>Email: {result.data.email}</p>
                {result.data.markedAt && (
                  <p>Time: {new Date(result.data.markedAt).toLocaleString()}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-900 border-2 border-red-500 rounded-lg">
            <p className="text-white">{error}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2">
          {!scanning && !loading && (
            <button
              onClick={startScanning}
              className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold uppercase transition-colors flex items-center justify-center gap-2"
            >
              <FaCamera /> Start Scanning
            </button>
          )}

          {scanning && (
            <button
              onClick={stopScanning}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold uppercase transition-colors"
            >
              Stop Scanning
            </button>
          )}

          {result && (
            <button
              onClick={() => {
                setResult(null);
                setError(null);
              }}
              className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold uppercase transition-colors"
            >
              Scan Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
