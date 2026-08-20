"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ref, onValue, remove } from "firebase/database";
import { database } from "@/lib/firebase";
import DashboardSidebar from "../../components/DashboardSidebar";
import TambahKegiatanModal from "../../components/TambahKegiatanModal";

export default function KelolaKegiatanPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/login");
    }
  }, [router]);

  const [filterStatus, setFilterStatus] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allActivities, setAllActivities] = useState([]);
  const [editingKegiatan, setEditingKegiatan] = useState(null);

  const handleDelete = async (kegiatanId, kegiatanTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kegiatan "${kegiatanTitle}"?`)) {
      try {
        const kegiatanRef = ref(database, `kegiatan/${kegiatanId}`);
        await remove(kegiatanRef);
        alert("Kegiatan berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting kegiatan:", error);
        alert("Gagal menghapus kegiatan. Silakan coba lagi.");
      }
    }
  };

  const handleEdit = (kegiatan) => {
    setEditingKegiatan(kegiatan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingKegiatan(null);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/login");
      return;
    }

    const kegiatanRef = ref(database, 'kegiatan');
    const unsubscribe = onValue(kegiatanRef, (snapshot) => {
      if (snapshot.exists()) {
        const kegiatanData = snapshot.val();
        const kegiatanArray = Object.entries(kegiatanData).map(([id, kegiatan]) => ({
          id,
          title: kegiatan.judul,
          location: kegiatan.lokasi,
          date: kegiatan.tanggal,
          status: kegiatan.status,
          statusColor: 
            kegiatan.status === "Akan Datang" 
              ? "bg-gray-200 text-gray-700"
              : kegiatan.status === "Berlangsung"
              ? "bg-amber-600 text-white"
              : "bg-gray-200 text-gray-700",
          ...kegiatan
        }));
        setAllActivities(kegiatanArray);
      } else {
        setAllActivities([]);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const itemsPerPage = 3;
  const filteredActivities = allActivities.filter((activity) => {
    if (filterStatus !== "semua" && activity.status !== filterStatus) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);
  const totalActivities = filteredActivities.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kelola Kegiatan
              </h1>
              <p className="text-gray-600">
                Manajemen agenda dan dokumentasi kegiatan RT 03.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="semua">Semua Status</option>
                <option value="Akan Datang">Akan Datang</option>
                <option value="Berlangsung">Berlangsung</option>
                <option value="Selesai">Selesai</option>
              </select>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                Tambah Kegiatan
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  JUDUL KEGIATAN
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  TANGGAL
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  STATUS
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.length > 0 ? (
                currentActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.location}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {activity.date}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${activity.statusColor}`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <button
                          className="text-gray-600 hover:text-amber-700 transition-colors"
                          title="Lihat Foto"
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
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(activity)}
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
                          onClick={() => handleDelete(activity.id, activity.title)}
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
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    Tidak ada kegiatan yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {currentActivities.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Menampilkan {startIndex + 1}-
                {Math.min(endIndex, totalActivities)} dari {totalActivities}{" "}
                kegiatan
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

      <TambahKegiatanModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingKegiatan={editingKegiatan}
      />
    </div>
  );
}
