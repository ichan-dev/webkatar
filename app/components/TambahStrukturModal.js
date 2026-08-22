"use client";

import { useState, useEffect } from "react";
import { ref, push, set, update } from "firebase/database";
import { database } from "@/lib/firebase";

export default function TambahStrukturModal({ isOpen, onClose, editingStruktur }) {
  const [formData, setFormData] = useState({
    periode: "",
  });

  const [foto, setFoto] = useState(null);
  const [existingFoto, setExistingFoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingStruktur) {
      setFormData({
        periode: editingStruktur.periode || "",
      });
      setExistingFoto(editingStruktur.fotoUrl || null);
      setFoto(null);
    } else {
      setFormData({
        periode: "",
      });
      setFoto(null);
      setExistingFoto(null);
    }
  }, [editingStruktur]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFoto(file);
    }
  };

  const handleFotoDragOver = (e) => {
    e.preventDefault();
  };

  const handleFotoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFoto(file);
    }
  };

  const handleRemoveFoto = () => {
    setFoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let fotoUrl = existingFoto;
      
      if (foto) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', foto);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        
        const uploadResult = await uploadResponse.json();
        
        if (uploadResult.success) {
          fotoUrl = uploadResult.url;
        } else {
          throw new Error('Gagal upload foto');
        }
      }

      if (!fotoUrl) {
        alert("Harap upload foto struktur organisasi");
        setUploading(false);
        return;
      }
      
      const strukturData = {
        periode: formData.periode,
        fotoUrl: fotoUrl,
        updatedAt: new Date().toISOString()
      };
      
      if (editingStruktur) {
        const strukturRef = ref(database, `struktur/${editingStruktur.id}`);
        await update(strukturRef, strukturData);
        alert("Struktur berhasil diupdate!");
      } else {
        const strukturRef = ref(database, 'struktur');
        const newStrukturRef = push(strukturRef);
        await set(newStrukturRef, {
          ...strukturData,
          createdAt: new Date().toISOString()
        });
        alert("Struktur berhasil ditambahkan!");
      }
      
      setFormData({
        periode: "",
      });
      setFoto(null);
      setExistingFoto(null);
      setUploading(false);
      onClose();
    } catch (error) {
      console.error("Error saving struktur:", error);
      alert(editingStruktur ? "Gagal mengupdate struktur. Silakan coba lagi." : "Gagal menambahkan struktur. Silakan coba lagi.");
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-800">
            {editingStruktur ? "Edit Struktur Kepengurusan" : "Tambah Struktur Kepengurusan"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Periode Kepengurusan
            </label>
            <input
              type="text"
              name="periode"
              value={formData.periode}
              onChange={handleInputChange}
              placeholder="Contoh: 2024-2026"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Format: YYYY-YYYY (contoh: 2024-2026)</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Foto Struktur Organisasi
            </label>
            <div
              onDragOver={handleFotoDragOver}
              onDrop={handleFotoDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors"
            >
              {!foto && !existingFoto ? (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-600 mb-2">
                    Tarik & lepas file di sini, atau{" "}
                    <label className="text-amber-700 hover:text-amber-800 cursor-pointer font-medium">
                      Cari File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">Upload foto/gambar struktur organisasi</p>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="relative inline-block">
                    <img
                      src={foto ? URL.createObjectURL(foto) : existingFoto}
                      alt="Preview struktur"
                      className="max-w-full max-h-96 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveFoto();
                        setExistingFoto(null);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {existingFoto && !foto && (
                    <p className="text-sm text-gray-500">Foto tersimpan</p>
                  )}
                  {foto && (
                    <p className="text-sm text-green-600 font-medium">Foto baru akan diupload</p>
                  )}
                  <label className="block">
                    <span className="text-amber-700 hover:text-amber-800 cursor-pointer font-medium text-sm">
                      Ganti foto
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={uploading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
