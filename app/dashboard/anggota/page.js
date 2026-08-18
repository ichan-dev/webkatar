"use client";

import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import TambahAnggotaModal from "../../components/TambahAnggotaModal";

export default function KelolaAnggotaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const allMembers = [
    { id: 1, name: "Budi Santoso", status: "Aktif", photo: "BS", photoColor: "bg-blue-500" },
    { id: 2, name: "Siti Aminah", status: "Aktif", photo: "SA", photoColor: "bg-pink-500" },
    { id: 3, name: "Ahmad Fauzi", status: "Tidak Aktif", photo: "AF", photoColor: "bg-gray-500" },
    { id: 4, name: "Dimas Pratama", status: "Aktif", photo: "DP", photoColor: "bg-green-500" },
    { id: 5, name: "Rina Wati", status: "Aktif", photo: "RW", photoColor: "bg-purple-500" },
    { id: 6, name: "Andi Wijaya", status: "Aktif", photo: "AW", photoColor: "bg-yellow-500" },
    { id: 7, name: "Linda Sari", status: "Tidak Aktif", photo: "LS", photoColor: "bg-red-500" },
    { id: 8, name: "Bagus Nugroho", status: "Aktif", photo: "BN", photoColor: "bg-indigo-500" },
    { id: 9, name: "Dewi Putri", status: "Aktif", photo: "DP", photoColor: "bg-teal-500" },
    { id: 10, name: "Rudi Hartono", status: "Aktif", photo: "RH", photoColor: "bg-orange-500" },
    { id: 11, name: "Maya Kusuma", status: "Tidak Aktif", photo: "MK", photoColor: "bg-cyan-500" },
    { id: 12, name: "Fajar Ramadhan", status: "Aktif", photo: "FR", photoColor: "bg-lime-500" },
  ];

  const itemsPerPage = 5;
  const filteredMembers = allMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);
  const totalMembers = filteredMembers.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kelola Anggota
              </h1>
              <p className="text-gray-600">
                Kelola data anggota Karang Taruna RT 03.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari nama..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                Tambah Anggota
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  FOTO
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  NAMA
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  STATUS KEAKTIFAN
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.length > 0 ? (
                currentMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div
                        className={`w-12 h-12 rounded-full ${member.photoColor} flex items-center justify-center text-white font-bold`}
                      >
                        {member.photo}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{member.name}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          member.status === "Aktif"
                            ? "bg-amber-700 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    Tidak ada anggota yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {currentMembers.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Menampilkan {startIndex + 1}-{Math.min(endIndex, totalMembers)} dari {totalMembers} anggota
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

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-1 rounded ${
                          currentPage === pageNumber
                            ? "bg-amber-700 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber}>...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          © 2024 Karang Taruna RT 03 Desa Sukamaju.
        </footer>
      </main>

      <TambahAnggotaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
