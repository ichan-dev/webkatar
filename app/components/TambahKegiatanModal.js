"use client";

import { useState, useEffect } from "react";
import { ref, push, set, update } from "firebase/database";
import { database } from "@/lib/firebase";

export default function TambahKegiatanModal({ isOpen, onClose, editingKegiatan }) {
  const [formData, setFormData] = useState({
    namaKegiatan: "",
    tanggalKegiatan: "",
    lokasi: "",
    status: "",
    deskripsi: "",
  });

  const [dokumen, setDokumen] = useState([]);
  const [foto, setFoto] = useState([]);
  const [existingDokumen, setExistingDokumen] = useState([]);
  const [existingFoto, setExistingFoto] = useState([]);

  useEffect(() => {
    if (editingKegiatan) {
      setFormData({
        namaKegiatan: editingKegiatan.judul || "",
        tanggalKegiatan: editingKegiatan.tanggal || "",
        lokasi: editingKegiatan.lokasi || "",
        status: editingKegiatan.status || "",
        deskripsi: editingKegiatan.deskripsi || "",
      });
      setExistingDokumen(editingKegiatan.dokumen || []);
      setExistingFoto(editingKegiatan.galeri || []);
      setDokumen([]);
      setFoto([]);
    } else {
      setFormData({
        namaKegiatan: "",
        tanggalKegiatan: "",
        lokasi: "",
        status: "",
        deskripsi: "",
      });
      setDokumen([]);
      setFoto([]);
      setExistingDokumen([]);
      setExistingFoto([]);
    }
  }, [editingKegiatan]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDokumenUpload = (e) => {
    const files = Array.from(e.target.files);
    const docFiles = files.filter(file => file.type === "application/pdf" || file.type.includes("document"));
    setDokumen(prev => [...prev, ...docFiles]);
  };

  const handleFotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    setFoto(prev => [...prev, ...imageFiles]);
  };

  const handleDokumenDragOver = (e) => {
    e.preventDefault();
  };

  const handleDokumenDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const docFiles = files.filter(file => file.type === "application/pdf" || file.type.includes("document"));
    setDokumen(prev => [...prev, ...docFiles]);
  };

  const handleFotoDragOver = (e) => {
    e.preventDefault();
  };

  const handleFotoDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    setFoto(prev => [...prev, ...imageFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let fotoUrls = existingFoto;
      
      if (foto.length > 0) {
        const uploadPromises = foto.map(async (file) => {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);
          
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });
          
          const uploadResult = await uploadResponse.json();
          
          if (uploadResult.success) {
            return uploadResult.url;
          } else {
            throw new Error('Gagal upload foto');
          }
        });
        
        fotoUrls = await Promise.all(uploadPromises);
      }
      
      let dokumenData = existingDokumen;
      
      if (dokumen.length > 0) {
        const uploadPromises = dokumen.map(async (file) => {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);
          
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });
          
          const uploadResult = await uploadResponse.json();
          
          if (uploadResult.success) {
            const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            return {
              nama: file.name,
              ukuran: `${fileSizeInMB} MB`,
              url: uploadResult.url
            };
          } else {
            throw new Error('Gagal upload dokumen');
          }
        });
        
        dokumenData = await Promise.all(uploadPromises);
      }
      
      const kegiatanData = {
        judul: formData.namaKegiatan,
        tanggal: formData.tanggalKegiatan,
        lokasi: formData.lokasi,
        status: formData.status,
        deskripsi: formData.deskripsi,
        gambar: fotoUrls[0] || editingKegiatan?.gambar || "",
        galeri: fotoUrls,
        dokumen: dokumenData,
        updatedAt: new Date().toISOString()
      };
      
      if (editingKegiatan) {
        const kegiatanRef = ref(database, `kegiatan/${editingKegiatan.id}`);
        await update(kegiatanRef, kegiatanData);
        alert("Kegiatan berhasil diupdate!");
      } else {
        const kegiatanRef = ref(database, 'kegiatan');
        const newKegiatanRef = push(kegiatanRef);
        await set(newKegiatanRef, {
          ...kegiatanData,
          createdAt: new Date().toISOString()
        });
        alert("Kegiatan berhasil ditambahkan!");
      }
      
      setFormData({
        namaKegiatan: "",
        tanggalKegiatan: "",
        lokasi: "",
        status: "",
        deskripsi: "",
      });
      setDokumen([]);
      setFoto([]);
      setExistingDokumen([]);
      setExistingFoto([]);
      onClose();
    } catch (error) {
      console.error("Error saving kegiatan:", error);
      alert(editingKegiatan ? "Gagal mengupdate kegiatan. Silakan coba lagi." : "Gagal menambahkan kegiatan. Silakan coba lagi.");
    }
  };

  const handleRemoveDokumen = (index) => {
    setDokumen(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveFoto = (index) => {
    setFoto(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-800">
            {editingKegiatan ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
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
                Nama Kegiatan
              </label>
              <input
                type="text"
                name="namaKegiatan"
                value={formData.namaKegiatan}
                onChange={handleInputChange}
                placeholder="Masukkan nama kegiatan"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tanggal Kegiatan
              </label>
              <input
                type="date"
                name="tanggalKegiatan"
                value={formData.tanggalKegiatan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Lokasi
              </label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
                placeholder="Contoh: Balai Desa Sukamaju"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Pilih Status</option>
                <option value="Akan Datang">Akan Datang</option>
                <option value="Berlangsung">Berlangsung</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Deskripsi Kegiatan
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              placeholder="Jelaskan detail kegiatan..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Dokumen Pendukung (PDF/DOCX)
            </label>
            <div
              onDragOver={handleDokumenDragOver}
              onDrop={handleDokumenDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors"
            >
              {dokumen.length === 0 && existingDokumen.length === 0 ? (
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-600 mb-2">
                    Tarik & lepas file di sini, atau{" "}
                    <label className="text-amber-700 hover:text-amber-800 cursor-pointer font-medium">
                      Cari File
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        multiple
                        onChange={handleDokumenUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">Bisa pilih multiple dokumen. Maks. ukuran 5MB per file.</p>
                </>
              ) : (
                <div className="space-y-3">
                  {dokumen.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-600 font-medium">{dokumen.length} dokumen baru dipilih</p>
                      <div className="space-y-2">
                        {dokumen.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded">
                            <div className="flex items-center gap-3">
                              <svg
                                className="h-8 w-8 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              <div className="text-left">
                                <span className="text-gray-700 block">{file.name}</span>
                                <span className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveDokumen(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg
                                className="h-5 w-5"
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
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 font-medium">{existingDokumen.length} dokumen tersimpan</p>
                      <div className="space-y-2">
                        {existingDokumen.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded">
                            <div className="flex items-center gap-3">
                              <svg
                                className="h-8 w-8 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              <div className="text-left">
                                <span className="text-gray-700 block">{doc.nama}</span>
                                <span className="text-xs text-gray-500">{doc.ukuran} • Dokumen tersimpan</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setExistingDokumen(prev => prev.filter((_, i) => i !== index))}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg
                                className="h-5 w-5"
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
                        ))}
                      </div>
                    </>
                  )}
                  <label className="block">
                    <span className="text-amber-700 hover:text-amber-800 cursor-pointer font-medium text-sm">
                      + Tambah dokumen lagi
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={handleDokumenUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Dokumentasi Foto
            </label>
            <div
              onDragOver={handleFotoDragOver}
              onDrop={handleFotoDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors"
            >
              {foto.length === 0 && existingFoto.length === 0 ? (
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
                        multiple
                        onChange={handleFotoUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">Bisa pilih multiple foto. Foto pertama = foto utama.</p>
                </>
              ) : (
                <div className="space-y-3">
                  {foto.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-600 font-medium">{foto.length} foto baru dipilih (foto pertama = foto utama)</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {foto.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {index === 0 && (
                                <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                                  Foto Utama
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFoto(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 font-medium">{existingFoto.length} foto tersimpan</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {existingFoto.map((url, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                              <img
                                src={url}
                                alt={`Existing ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {index === 0 && (
                                <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                                  Foto Utama
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => setExistingFoto(prev => prev.filter((_, i) => i !== index))}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  <label className="block">
                    <span className="text-amber-700 hover:text-amber-800 cursor-pointer font-medium text-sm">
                      + Tambah foto lagi
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
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
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center gap-2"
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
