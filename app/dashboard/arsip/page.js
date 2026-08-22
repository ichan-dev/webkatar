"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ref, onValue, remove } from "firebase/database";
import { database } from "@/lib/firebase";
import DashboardSidebar from "../../components/DashboardSidebar";
import TambahArsipModal from "../../components/TambahArsipModal";

export default function KelolaArsipPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/login");
    }
  }, [router]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allArsip, setAllArsip] = useState([]);
  const [editingArsip, setEditingArsip] = useState(null);

  const handleDelete = async (arsipId, arsipPeriode) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus arsip "${arsipPeriode}"?`)) {
      try {
        const arsipRef = ref(database, `arsip/${arsipId}`);
        await remove(arsipRef);
        alert("Arsip berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting arsip:", error);
        alert("Gagal menghapus arsip. Silakan coba lagi.");
      }
    }
  };

  const handleEdit = (arsip) => {
    setEditingArsip(arsip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArsip(null);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/login");
      return;
    }

    const arsipRef = ref(database, 'arsip');
    const unsubscribe = onValue(arsipRef, (snapshot) => {
      if (snapshot.exists()) {
        const arsipData = snapshot.val();
        const arsipArray = Object.entries(arsipData).map(([id, arsip]) => ({
          id,
          ...arsip
        }));
        arsipArray.sort((a, b) => {
          const periodeA = a.periode.match(/\d{4}/g);
          const periodeB = b.periode.match(/\d{4}/g);
          if (periodeA && periodeB) {
            return parseInt(periodeB[0]) - parseInt(periodeA[0]);
          }
          return 0;
        });
        setAllArsip(arsipArray);
      } else {
        setAllArsip([]);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(allArsip.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArsip = allArsip.slice(startIndex, endIndex);
  const totalArsip = allArsip.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kelola Arsip Program Kerja
              </h1>
              <p className="text-gray-600">
                Manajemen arsip program kerja dan kepengurusan Karang Taruna.
              </p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Tambah Arsip
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  PERIODE
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  KETUA
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  JABATAN
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  PROGRAM KERJA
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {currentArsip.length > 0 ? (
                currentArsip.map((arsip) => (
                  <tr
                    key={arsip.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {arsip.periode}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">
                        {arsip.ketua}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {arsip.jabatan}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {arsip.programs?.length || 0} program
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(arsip)}
                          className="text-gray-600 hover:text-blue-700 transition-colors"
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
                          onClick={() => handleDelete(arsip.id, arsip.periode)}
                          className="text-gray-600 hover:text-red-700 transition-colors"
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    Belum ada arsip yang ditambahkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {currentArsip.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Menampilkan {startIndex + 1}-
                {Math.min(endIndex, totalArsip)} dari {totalArsip}{" "}
                arsip
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  &lt;
                </button>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <TambahArsipModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingArsip={editingArsip}
      />
    </div>
  );
}
