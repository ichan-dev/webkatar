"use client";

import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import TambahPeriodeModal from "../../components/TambahPeriodeModal";

export default function KelolaStrukturPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allPeriods = [
    {
      id: 1,
      title: "Periode 2020-2022",
      description: "Struktur kepengurusan Karang Taruna RT 03 periode 2020-2022 dengan fokus pada pemberdayaan pemuda dan pengembangan program kerja berbasis komunitas.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
    },
    {
      id: 2,
      title: "Periode 2018-2020",
      description: "Periode kepengurusan yang berfokus pada peningkatan kualitas SDM pemuda dan pembangunan infrastruktur organisasi.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070",
    },
    {
      id: 3,
      title: "Periode 2016-2018",
      description: "Masa pembentukan fondasi organisasi yang kuat dengan berbagai program inovatif untuk pemuda desa.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kelola Struktur Kepengurusan
              </h1>
              <p className="text-gray-600">
                Kelola struktur kepengurusan Karang Taruna RT 03 per periode.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Tambah Periode Baru
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPeriods.map((period) => (
            <div
              key={period.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={period.image}
                  alt={period.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {period.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {period.description}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors"
                    title="Edit"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-red-700 transition-colors"
                    title="Hapus"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          © 2024 Karang Taruna RT 03 Desa Sukamaju. All Rights Reserved.
        </footer>
      </main>

      <TambahPeriodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
