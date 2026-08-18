"use client";

import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import TambahDokumenModal from "../../components/TambahDokumenModal";

export default function KelolaDokumenPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allDocuments = [
    {
      id: 1,
      name: "Laporan_Keuangan_Q3.pdf",
      type: "pdf",
      relatedActivity: "Rapat Bulanan",
      uploadDate: "24 Oct 2023",
      size: "2.4 MB",
      iconColor: "bg-red-100",
      iconTextColor: "text-red-600",
    },
    {
      id: 2,
      name: "Proposal_Kerja_Bakti.docx",
      type: "doc",
      relatedActivity: "Kerja Bakti",
      uploadDate: "20 Oct 2023",
      size: "1.1 MB",
      iconColor: "bg-orange-100",
      iconTextColor: "text-orange-600",
    },
    {
      id: 3,
      name: "Dokumentasi_Lomba_17an.zip",
      type: "zip",
      relatedActivity: "Acara Tahunan",
      uploadDate: "18 Aug 2023",
      size: "45.8 MB",
      iconColor: "bg-gray-100",
      iconTextColor: "text-gray-600",
    },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(allDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = allDocuments.slice(startIndex, endIndex);
  const totalDocuments = allDocuments.length;

  const getFileIcon = (type) => {
    if (type === "pdf") {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h10l4 4v16H2v-1z"/>
          <text x="6" y="14" fontSize="6" fontWeight="bold">PDF</text>
        </svg>
      );
    } else if (type === "doc") {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kelola Dokumen
              </h1>
              <p className="text-gray-600">
                Kelola dan organisir file komunitas dengan aman.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center gap-2"
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload Dokumen
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  FILE
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  NAMA DOKUMEN
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  TANGGAL UPLOAD
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  UKURAN
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.length > 0 ? (
                currentDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div
                        className={`w-12 h-12 rounded-lg ${doc.iconColor} ${doc.iconTextColor} flex items-center justify-center`}
                      >
                        {getFileIcon(doc.type)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{doc.name}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {doc.uploadDate}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{doc.size}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <button
                          className="text-gray-600 hover:text-blue-700 transition-colors"
                          title="Download"
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
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                        <button
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
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    Tidak ada dokumen yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {currentDocuments.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Menampilkan {startIndex + 1} hingga {Math.min(endIndex, totalDocuments)}{" "}
                dari {totalDocuments} entri
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
                  Sebelumnya
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
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
                })}

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
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          © 2024 Karang Taruna RT 03 Desa Sukamaju. All Rights Reserved.
        </footer>
      </main>

      <TambahDokumenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
