"use client";

import { use, useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";
import Header from "../../components/Header";
import KegiatanDetailHero from "../../components/KegiatanDetailHero";
import KegiatanDetailContent from "../../components/KegiatanDetailContent";
import KegiatanGallery from "../../components/KegiatanGallery";
import DokumenPendukung from "../../components/DokumenPendukung";
import Footer from "../../components/Footer";

export default function KegiatanDetailPage({ params }) {
  const { id } = use(params);
  const [kegiatan, setKegiatan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const kegiatanRef = ref(database, `kegiatan/${id}`);
        const snapshot = await get(kegiatanRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          setKegiatan({
            id: id,
            judul: data.judul,
            kategori: data.kategori || "Kegiatan",
            tanggal: data.tanggal,
            tanggalLengkap: data.tanggal,
            lokasi: data.lokasi,
            deskripsi: data.deskripsi,
            deskripsiLengkap: data.deskripsi ? [data.deskripsi] : [],
            image: data.gambar || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070",
            galeri: data.galeri || [],
            dokumen: data.dokumen || []
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching kegiatan:", error);
        setLoading(false);
      }
    };

    fetchKegiatan();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail kegiatan...</p>
        </div>
      </div>
    );
  }

  if (!kegiatan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl">Kegiatan tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <KegiatanDetailHero kegiatan={kegiatan} />
      
      <section className="py-8 bg-white">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <KegiatanDetailContent kegiatan={kegiatan} />
            </div>
            <div className="lg:col-span-1">
              <DokumenPendukung dokumen={kegiatan.dokumen} />
            </div>
          </div>
        </div>
      </section>

      <KegiatanGallery kegiatan={kegiatan} />
      <Footer />
    </div>
  );
}
