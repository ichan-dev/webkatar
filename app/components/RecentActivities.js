"use client";

import { useState, useEffect } from "react";
import { ref, onValue, query, orderByChild, limitToLast } from "firebase/database";
import { database } from "@/lib/firebase";

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kegiatanRef = ref(database, 'kegiatan');
    const unsubscribe = onValue(kegiatanRef, (snapshot) => {
      if (snapshot.exists()) {
        const kegiatanData = snapshot.val();
        const kegiatanArray = Object.entries(kegiatanData).map(([id, kegiatan]) => {
          let statusColor = "bg-gray-200 text-gray-700";
          if (kegiatan.status === "Akan Datang") {
            statusColor = "bg-blue-100 text-blue-800";
          } else if (kegiatan.status === "Berlangsung") {
            statusColor = "bg-amber-100 text-amber-800";
          } else if (kegiatan.status === "Selesai") {
            statusColor = "bg-green-100 text-green-800";
          }

          return {
            id,
            name: kegiatan.judul,
            date: kegiatan.tanggal,
            status: kegiatan.status,
            statusColor,
            createdAt: kegiatan.createdAt || new Date().toISOString()
          };
        });

        kegiatanArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setActivities(kegiatanArray.slice(0, 5));
      } else {
        setActivities([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Kegiatan Terbaru</h2>
        </div>
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Memuat kegiatan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Kegiatan Terbaru</h2>
      </div>

      {activities.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                  Nama Kegiatan
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                  Tanggal
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{activity.name}</td>
                  <td className="py-3 px-4 text-gray-600">{activity.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Belum ada kegiatan yang ditambahkan.</p>
        </div>
      )}
    </div>
  );
}
