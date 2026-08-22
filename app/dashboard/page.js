"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import DashboardSidebar from "../components/DashboardSidebar";
import StatCard from "../components/StatCard";
import RecentActivities from "../components/RecentActivities";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [anggotaCount, setAnggotaCount] = useState(0);
  const [kegiatanCount, setKegiatanCount] = useState(0);
  const [arsipCount, setArsipCount] = useState(0);
  const [strukturCount, setStrukturCount] = useState(0);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (isAuthenticated !== "true") {
      router.push("/login");
      return;
    }

    const usersRef = ref(database, 'users');
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const activeMembers = Object.values(users).filter(
          user => user.role === "member" && user.statusKeaktifan === "Aktif"
        );
        setAnggotaCount(activeMembers.length);
      } else {
        setAnggotaCount(0);
      }
    });

    const kegiatanRef = ref(database, 'kegiatan');
    const unsubscribeKegiatan = onValue(kegiatanRef, (snapshot) => {
      if (snapshot.exists()) {
        const kegiatan = snapshot.val();
        setKegiatanCount(Object.keys(kegiatan).length);
      } else {
        setKegiatanCount(0);
      }
    });

    const arsipRef = ref(database, 'arsip');
    const unsubscribeArsip = onValue(arsipRef, (snapshot) => {
      if (snapshot.exists()) {
        const arsip = snapshot.val();
        setArsipCount(Object.keys(arsip).length);
      } else {
        setArsipCount(0);
      }
    });

    const strukturRef = ref(database, 'struktur');
    const unsubscribeStruktur = onValue(strukturRef, (snapshot) => {
      if (snapshot.exists()) {
        const struktur = snapshot.val();
        setStrukturCount(Object.keys(struktur).length);
      } else {
        setStrukturCount(0);
      }
    });

    setLoading(false);

    return () => {
      unsubscribeUsers();
      unsubscribeKegiatan();
      unsubscribeArsip();
      unsubscribeStruktur();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

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
            value={anggotaCount.toString()}
          />
          <StatCard 
            title="Kegiatan" 
            value={kegiatanCount.toString()}
          />
          <StatCard 
            title="Arsip Program Kerja" 
            value={arsipCount.toString()}
          />
          <StatCard 
            title="Struktur" 
            value={strukturCount.toString()}
          />
        </div>

        <RecentActivities />
      </main>
    </div>
  );
}
