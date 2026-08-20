"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

export default function KegiatanGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [kegiatan, setKegiatan] = useState([]);

  useEffect(() => {
    const kegiatanRef = ref(database, 'kegiatan');
    const unsubscribe = onValue(kegiatanRef, (snapshot) => {
      if (snapshot.exists()) {
        const kegiatanData = snapshot.val();
        const kegiatanArray = Object.entries(kegiatanData).map(([id, item]) => ({
          id,
          judul: item.judul,
          deskripsi: item.deskripsi,
          tanggal: item.tanggal,
          status: item.status,
          statusColor: 
            item.status === "Akan Datang" ? "bg-blue-500" :
            item.status === "Berlangsung" ? "bg-yellow-500" :
            "bg-green-500",
          statusIcon:
            item.status === "Akan Datang" ? "📅" :
            item.status === "Berlangsung" ? "⚠" :
            "✓",
          image: item.gambar || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070"
        }));
        setKegiatan(kegiatanArray);
      } else {
        setKegiatan([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(kegiatan.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentKegiatan = kegiatan.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentKegiatan.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.image}')` }}
                ></div>
                <div className="absolute bottom-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-md text-sm font-semibold">
                  {item.tanggal}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.judul}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {item.deskripsi}
                </p>
                <a 
                  href={`/kegiatan/${item.id}`}
                  className="block w-full bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition-colors font-medium text-center"
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentPage === index + 1
                  ? "bg-amber-700 text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
