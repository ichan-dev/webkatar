"use client";

import { useState } from "react";

export default function TambahPeriodeModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Mohon pilih file gambar yang valid (JPG, PNG, dll)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Image file:", imageFile);
    onClose();
    setFormData({
      title: "",
      description: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-800">
            Tambah Periode Baru
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Judul Periode
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Contoh: Periode 2020-2022"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Masukkan periode kepengurusan, misalnya "Periode 2020-2022"
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Deskripsi singkat tentang periode kepengurusan ini..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Jelaskan fokus dan pencapaian pada periode ini
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Gambar
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-300 bg-gray-50 hover:border-amber-400"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required={!imageFile}
                />
                <div className="pointer-events-none">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold text-amber-700">
                      Klik untuk upload
                    </span>{" "}
                    atau drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF hingga 10MB
                  </p>
                </div>
              </div>
              {imageFile && (
                <p className="text-sm text-gray-600 mt-2">
                  File dipilih: <span className="font-medium">{imageFile.name}</span>
                </p>
              )}
            </div>

            {imagePreview && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Preview Gambar
                </label>
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
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
              Simpan Periode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
