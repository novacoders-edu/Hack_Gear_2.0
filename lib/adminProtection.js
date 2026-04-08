import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyToken } from "@/lib/jwtHandler.js";

/**
 * Custom hook to protect admin routes
 * Verifies token from localStorage and redirects to login if invalid/missing
 */
export function useAdminProtection() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const verifyAdminAccess = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("adminToken");

        if (!token) {
          router.push("/admin-login");
          return;
        }

        // Verify token with backend
        const res = await fetch("/api/admin/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        });

        if (!res.ok) {
          localStorage.removeItem("adminToken");
          router.push("/admin-login");
          return;
        }

        const data = await res.json();
        setAdmin(data.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth verification failed:", error);
        localStorage.removeItem("adminToken");
        router.push("/admin-login");
      } finally {
        setLoading(false);
      }
    };

    verifyAdminAccess();
  }, [pathname, router]);

  return { loading, isAuthenticated, admin };
}

/**
 * Protected Route Wrapper Component
 */
export function ProtectedAdminRoute({ children, fallback = null }) {
  const { loading, isAuthenticated } = useAdminProtection();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-black">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-cyan-neon border-r-transparent rounded-full"></div>
          <p className="text-cyan-neon mt-4 font-bold uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback;
  }

  return children;
}
