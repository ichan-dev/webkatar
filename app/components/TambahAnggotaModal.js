"use client";

import { useState, useEffect } from "react";
import { ref, push, set, update } from "firebase/database";
import { database } from "@/lib/firebase";

export default function TambahAnggotaModal({ isOpen, onClose, editingMember }) {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    username: "",
    password: "",
    tanggalLahir: "",
    jenisKelamin: "",
    noTelepon: "",
    statusKeaktifan: "",
    jabatan: "",
  });

  useEffect(() => {
    if (editingMember) {
      setFormData({
        namaLengkap: editingMember.name || "",
        username: editingMember.username || "",
        password: "",
        tanggalLahir: "",
        jenisKelamin: "",
        noTelepon: "",
        statusKeaktifan: editingMember.status || "",
        jabatan: "",
      });
    } else {
      setFormData({
        namaLengkap: "",
        username: "",
        password: "",
        tanggalLahir: "",
        jenisKelamin: "",
        noTelepon: "",
        statusKeaktifan: "",
        jabatan: "",
      });
    }
  }, [editingMember]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        const memberRef = ref(database, `users/${editingMember.id}`);
        const updates = {
          ...formData,
          role: "member",
          updatedAt: new Date().toISOString()
        };
        
        await update(memberRef, updates);
        alert("Anggota berhasil diupdate!");
      } else {
        const usersRef = ref(database, 'users');
        const newUserRef = push(usersRef);
        
        await set(newUserRef, {
          ...formData,
          role: "member",
          createdAt: new Date().toISOString()
        });
        
        alert("Anggota berhasil ditambahkan!");
      }
      
      setFormData({
        namaLengkap: "",
        username: "",
        password: "",
        tanggalLahir: "",
        jenisKelamin: "",
        noTelepon: "",
        statusKeaktifan: "",
        jabatan: "",
      });
      onClose();
    } catch (error) {
      console.error("Error saving member:", error);
      alert(editingMember ? "Gagal mengupdate anggota. Silakan coba lagi." : "Gagal menambahkan anggota. Silakan coba lagi.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-800">
            {editingMember ? "Edit Anggota" : "Tambah Anggota Baru"}
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
                Nama Lengkap
              </label>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username untuk login"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password untuk login"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Jenis Kelamin
              </label>
              <select
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                No. Telepon
              </label>
              <input
                type="tel"
                name="noTelepon"
                value={formData.noTelepon}
                onChange={handleInputChange}
                placeholder="Contoh: 08123456789"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Status Keaktifan
              </label>
              <select
                name="statusKeaktifan"
                value={formData.statusKeaktifan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Pilih Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Jabatan/Posisi
              </label>
              <select
                name="jabatan"
                value={formData.jabatan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Pilih Jabatan</option>
                <option value="Ketua">Ketua</option>
                <option value="Wakil Ketua">Wakil Ketua</option>
                <option value="Sekretaris">Sekretaris</option>
                <option value="Bendahara">Bendahara</option>
                <option value="Seksi Humas">Seksi Humas</option>
                <option value="Seksi Olahraga">Seksi Olahraga</option>
                <option value="Seksi Keagamaan">Seksi Keagamaan</option>
                <option value="Anggota Biasa">Anggota Biasa</option>
              </select>
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
              className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
