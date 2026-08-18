"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../components/DashboardSidebar";
import StatCard from "../components/StatCard";
import RecentActivities from "../components/RecentActivities";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">
            Ringkasan aktivitas dan data Karang Taruna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Anggota Aktif" 
            value="124" 
            trend="+12%"
          />
          <StatCard 
            title="Kegiatan" 
            value="12" 
            subtitle="Bulan Ini"
          />
          <StatCard 
            title="Dokumen" 
            value="45"
          />
          <StatCard 
            title="Foto Dokumentasi" 
            value="89"
          />
        </div>

        <RecentActivities />
      </main>
    </div>
  );
}
