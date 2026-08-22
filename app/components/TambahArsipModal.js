"use client";

import { useState, useEffect } from "react";
import { ref, push, set, update } from "firebase/database";
import { database } from "@/lib/firebase";

export default function TambahArsipModal({ isOpen, onClose, editingArsip }) {
  const [formData, setFormData] = useState({
    periode: "",
    ketua: "",
    jabatan: "",
    deskripsi: "",
  });

  const [programs, setPrograms] = useState([{ nama: "", deskripsi: "", tanggal: "" }]);

  useEffect(() => {
    if (editingArsip) {
      setFormData({
        periode: editingArsip.periode || "",
        ketua: editingArsip.ketua || "",
        jabatan: editingArsip.jabatan || "",
        deskripsi: editingArsip.deskripsi || "",
      });
      setPrograms(
        editingArsip.programs 
          ? editingArsip.programs.map(p => 
              typeof p === 'string' 
                ? { nama: p, deskripsi: "", tanggal: "" } 
                : { nama: p.nama || "", deskripsi: p.deskripsi || "", tanggal: p.tanggal || "" }
            )
          : [{ nama: "", deskripsi: "", tanggal: "" }]
      );
    } else {
      setFormData({
        periode: "",
        ketua: "",
        jabatan: "",
        deskripsi: "",
      });
      setPrograms([{ nama: "", deskripsi: "", tanggal: "" }]);
    }
  }, [editingArsip]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProgramChange = (index, field, value) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index][field] = value;
    setPrograms(updatedPrograms);
  };

  const handleAddProgram = () => {
    setPrograms([...programs, { nama: "", deskripsi: "", tanggal: "" }]);
  };

  const handleRemoveProgram = (index) => {
    if (programs.length > 1) {
      setPrograms(programs.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const filteredPrograms = programs.filter(p => p.nama && p.nama.trim() !== "");
      
      const arsipData = {
        periode: formData.periode,
        ketua: formData.ketua,
        jabatan: formData.jabatan,
        deskripsi: formData.deskripsi,
        programs: filteredPrograms,
        updatedAt: new Date().toISOString()
      };
      
      if (editingArsip) {
        const arsipRef = ref(database, `arsip/${editingArsip.id}`);
        await update(arsipRef, arsipData);
        alert("Arsip berhasil diupdate!");
      } else {
        const arsipRef = ref(database, 'arsip');
        const newArsipRef = push(arsipRef);
        await set(newArsipRef, {
          ...arsipData,
          createdAt: new Date().toISOString()
        });
        alert("Arsip berhasil ditambahkan!");
      }
      
      setFormData({
        periode: "",
        ketua: "",
        jabatan: "",
        deskripsi: "",
      });
      setPrograms([{ nama: "", deskripsi: "", tanggal: "" }]);
      onClose();
    } catch (error) {
      console.error("Error saving arsip:", error);
      alert(editingArsip ? "Gagal mengupdate arsip. Silakan coba lagi." : "Gagal menambahkan arsip. Silakan coba lagi.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-800">
            {editingArsip ? "Edit Arsip Program Kerja" : "Tambah Arsip Program Kerja"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Periode
              </label>
              <input
                type="text"
                name="periode"
                value={formData.periode}
                onChange={handleInputChange}
                placeholder="Contoh: Periode 2024 - 2025"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ketua
              </label>
              <input
                type="text"
                name="ketua"
                value={formData.ketua}
                onChange={handleInputChange}
                placeholder="Nama Ketua"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Jabatan
              </label>
              <input
                type="text"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleInputChange}
                placeholder="Contoh: Ketua Umum"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              placeholder="Jelaskan tentang periode kepengurusan ini..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Program Kerja
            </label>
            <div className="space-y-3">
              {programs.map((program, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={program.nama || ""}
                      onChange={(e) => handleProgramChange(index, 'nama', e.target.value)}
                      placeholder={`Nama program kerja ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {programs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProgram(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus program"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="date"
                      value={program.tanggal || ""}
                      onChange={(e) => handleProgramChange(index, 'tanggal', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <textarea
                    value={program.deskripsi || ""}
                    onChange={(e) => handleProgramChange(index, 'deskripsi', e.target.value)}
                    placeholder="Deskripsi program kerja (opsional)"
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddProgram}
                className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center gap-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah program kerja
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit" className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
