"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

export default function ActivitiesSection() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kegiatanRef = ref(database, 'kegiatan');
    const unsubscribe = onValue(kegiatanRef, (snapshot) => {
      if (snapshot.exists()) {
        const kegiatanData = snapshot.val();
        const kegiatanArray = Object.entries(kegiatanData).map(([id, kegiatan]) => {
          let badgeColor = "bg-blue-500";
          const badge = kegiatan.status || "Kegiatan";
          
          if (kegiatan.status === "Selesai") {
            badgeColor = "bg-green-500";
          } else if (kegiatan.status === "Berlangsung") {
            badgeColor = "bg-amber-500";
          } else if (kegiatan.status === "Akan Datang") {
            badgeColor = "bg-blue-500";
          }

          return {
            id,
            badge: badge,
            badgeColor: badgeColor,
            title: kegiatan.judul,
            description: kegiatan.deskripsi || "Kegiatan Karang Taruna RT 03",
            date: kegiatan.tanggal,
            image: kegiatan.gambar || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070",
            createdAt: kegiatan.createdAt || new Date().toISOString()
          };
        });

        kegiatanArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setActivities(kegiatanArray.slice(0, 3));
      } else {
        setActivities([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="kegiatan" className="py-16 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Kegiatan Terbaru
            </h2>
            <p className="text-gray-600 text-base">
              Aksi nyata pemuda untuk lingkungan sekitar.
            </p>
          </div>
          <Link 
            href="/kegiatan" 
            className="hidden sm:inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold group"
          >
            Lihat Semua Kegiatan
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600">Memuat kegiatan...</p>
          </div>
        ) : activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-44">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${activity.image}')` }}
                  ></div>
                  <div className={`absolute top-4 left-4 ${activity.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {activity.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {activity.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada kegiatan yang ditambahkan.</p>
          </div>
        )}

        <div className="mt-8 sm:hidden text-center">
          <Link 
            href="/kegiatan" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold group"
          >
            Lihat Semua Kegiatan
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
