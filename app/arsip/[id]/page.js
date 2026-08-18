"use client";

import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const arsipDetailData = {
  1: {
    id: 1,
    periode: "Periode 2022 - 2023",
    judul: "Transformasi Pemuda: Inovasi & Kolaborasi Desa Sukamaju",
    ketua: {
      nama: "Budi Santoso",
      jabatan: "Ketua Umum",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
    },
    stats: {
      direncanakan: 12,
      terlaksana: 10,
      tidakTerlaksana: 2
    },
    programs: [
      {
        id: 1,
        nama: "Festival Budaya Desa",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "28 Sep 2023",
        deskripsi: "Mengadakan festival seni dan budaya untuk melestarikan tradisi lokal dan menampilkan kesenian dari berbagai kelompok di desa.",
        realisasi: "Acara dihadiri 500+ warga dengan 15 penampilan seni. Berhasil mengumpulkan dana Rp 5 juta untuk kas karang taruna.",
        evaluasi: "Sangat sukses. Antusiasme warga tinggi. Perlu diperbesar venue untuk tahun depan.",
        dokumentasiLink: "/kegiatan/5"
      },
      {
        id: 2,
        nama: "Workshop Kewirausahaan Muda",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "05 Okt 2023",
        deskripsi: "Pelatihan kewirausahaan untuk meningkatkan skill dan daya saing pemuda dalam berwirausaha di era digital.",
        realisasi: "30 peserta mengikuti training 3 hari. 5 peserta berhasil meluncurkan usaha baru.",
        evaluasi: "Berhasil. Peserta antusias dan ada dampak nyata. Perlu pendampingan lanjutan.",
        dokumentasiLink: "/kegiatan/3"
      },
      {
        id: 3,
        nama: "Renovasi Lapangan Voli",
        status: "Sebagian Terlaksana",
        statusColor: "bg-yellow-100 text-yellow-800",
        tanggal: "Nov 2023",
        deskripsi: "Perbaikan dan renovasi lapangan voli RT untuk fasilitas olahraga warga yang lebih layak.",
        realisasi: "Renovasi 70% selesai. Permukaan lapangan dan net sudah diperbaiki. Belum ada penerangan.",
        evaluasi: "Cukup baik namun terkendala dana. Perlu mencari sponsor untuk melengkapi penerangan.",
        dokumentasiLink: null
      },
      {
        id: 4,
        nama: "Studi Banding Organisasi",
        status: "Tidak Terlaksana",
        statusColor: "bg-red-100 text-red-800",
        tanggal: "-",
        deskripsi: "Kunjungan ke karang taruna desa lain untuk belajar best practice dalam pengelolaan organisasi pemuda.",
        realisasi: "Program dibatalkan karena keterbatasan anggaran dan kesulitan koordinasi jadwal.",
        evaluasi: "Perlu perencanaan anggaran lebih matang di periode berikutnya.",
        dokumentasiLink: null
      },
      {
        id: 5,
        nama: "Bakti Sosial Kesehatan",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "15 Sep 2023",
        deskripsi: "Pemeriksaan kesehatan gratis dan donor darah bekerjasama dengan Puskesmas setempat.",
        realisasi: "120 warga diperiksa kesehatan, 45 kantong darah terkumpul. Berkoordinasi dengan PMI.",
        evaluasi: "Sangat baik. Program rutin yang sangat dibutuhkan warga.",
        dokumentasiLink: "/kegiatan/6"
      },
      {
        id: 6,
        nama: "Program Bimbingan Belajar Gratis",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "Jul - Des 2023",
        deskripsi: "Bimbel gratis untuk anak-anak SD dan SMP di wilayah RT 03 setiap Sabtu sore.",
        realisasi: "25 siswa mengikuti program 6 bulan. Nilai rata-rata siswa meningkat 15%.",
        evaluasi: "Program berdampak positif. Perlu penambahan tutor untuk kapasitas lebih besar.",
        dokumentasiLink: null
      },
      {
        id: 7,
        nama: "Gerakan Penghijauan Lingkungan",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "20 Agu 2023",
        deskripsi: "Penanaman 100 pohon di area RT untuk penghijauan dan perbaikan kualitas udara.",
        realisasi: "Berhasil menanam 120 pohon dengan partisipasi 40 warga. Survival rate 85%.",
        evaluasi: "Sukses melebihi target. Perlu maintenance rutin untuk menjaga pohon.",
        dokumentasiLink: null
      },
      {
        id: 8,
        nama: "Turnamen Futsal Antar RT",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "17 Agu 2023",
        deskripsi: "Kompetisi futsal antar RT dalam rangka HUT RI untuk mempererat persaudaraan.",
        realisasi: "8 tim berpartisipasi. RT 03 juara 2. Dihadiri 300+ penonton.",
        evaluasi: "Meriah dan mempererat hubungan antar RT. Perlu venue lebih besar.",
        dokumentasiLink: "/kegiatan/2"
      }
    ]
  },
  2: {
    id: 2,
    periode: "Periode 2023 - 2024",
    judul: "Bangkit Bersama: Solidaritas Pemuda di Masa Pandemi",
    ketua: {
      nama: "Siti Rahmawati",
      jabatan: "Ketua Umum",
      foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
    },
    stats: {
      direncanakan: 8,
      terlaksana: 8,
      tidakTerlaksana: 0
    },
    programs: [
      {
        id: 1,
        nama: "Satgas Tanggap Darurat Pandemi",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "Mar - Agu 2024",
        deskripsi: "Pembentukan satgas pemuda untuk membantu warga terdampak pandemi dengan distribusi bantuan dan koordinasi kesehatan.",
        realisasi: "Membantu 150+ keluarga dengan paket sembako dan koordinasi rujukan RS untuk 30+ pasien.",
        evaluasi: "Respons cepat dan efektif. Apresiasi tinggi dari warga dan pemerintah desa.",
        dokumentasiLink: null
      },
      {
        id: 2,
        nama: "Dapur Umum Warga Isoman",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "Apr - Jun 2024",
        deskripsi: "Penyediaan makanan gratis untuk warga yang sedang isolasi mandiri di rumah.",
        realisasi: "Melayani 200+ porsi makanan per hari selama 3 bulan untuk 80+ keluarga isoman.",
        evaluasi: "Program sangat membantu warga. Koordinasi dengan ibu-ibu PKK sangat solid.",
        dokumentasiLink: null
      },
      {
        id: 3,
        nama: "Pelatihan UMKM Digital",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "Sep 2024",
        deskripsi: "Workshop digital marketing dan online selling untuk pelaku UMKM agar bisa bertahan di masa pandemi.",
        realisasi: "25 UMKM mengikuti training. 80% peserta berhasil go online dalam 1 bulan.",
        evaluasi: "Sangat bermanfaat. UMKM mulai bangkit dengan penjualan online.",
        dokumentasiLink: "/kegiatan/3"
      }
    ]
  },
  3: {
    id: 3,
    periode: "Periode 2024 - 2025",
    judul: "Pemuda Berkarya: Membangun Infrastruktur & Karakter",
    ketua: {
      nama: "Agus Setiawan",
      jabatan: "Ketua Umum",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
    },
    stats: {
      direncanakan: 10,
      terlaksana: 3,
      tidakTerlaksana: 0
    },
    programs: [
      {
        id: 1,
        nama: "Pembangunan Poskamling Modern",
        status: "Sebagian Terlaksana",
        statusColor: "bg-yellow-100 text-yellow-800",
        tanggal: "Okt 2024",
        deskripsi: "Renovasi total poskamling RT 03 menjadi lebih modern dan nyaman untuk kegiatan ronda.",
        realisasi: "Struktur bangunan 60% selesai. Sudah ada atap dan dinding. Belum interior.",
        evaluasi: "Progress baik namun perlu percepatan. Target selesai Desember 2024.",
        dokumentasiLink: null
      },
      {
        id: 2,
        nama: "Gerakan Penghijauan Lingkungan",
        status: "Terlaksana",
        statusColor: "bg-green-100 text-green-800",
        tanggal: "05 Okt 2024",
        deskripsi: "Penanaman pohon dan pembuatan taman kecil di beberapa titik RT untuk penghijauan.",
        realisasi: "150 pohon tertanam, 3 taman kecil terbangun. Partisipasi warga 50+ orang.",
        evaluasi: "Sukses. Lingkungan lebih hijau dan asri. Maintenance rutin diperlukan.",
        dokumentasiLink: "/kegiatan/1"
      },
      {
        id: 3,
        nama: "Turnamen Futsal Antar RT",
        status: "Berlangsung",
        statusColor: "bg-blue-100 text-blue-800",
        tanggal: "Nov 2024",
        deskripsi: "Kompetisi futsal antar RT untuk memeriahkan akhir tahun dan mempererat silaturahmi.",
        realisasi: "Sedang dalam tahap persiapan. 10 tim sudah mendaftar. Venue telah dikonfirmasi.",
        evaluasi: "Persiapan berjalan lancar. Antusiasme tinggi dari berbagai RT.",
        dokumentasiLink: null
      }
    ]
  }
};

export default function ArsipDetailPage({ params }) {
  const arsip = arsipDetailData[params.id] || arsipDetailData[1];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <Link 
            href="/arsip"
            className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium mb-6 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Arsip
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-1">
                <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  {arsip.periode}
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  {arsip.judul}
                </h1>
              </div>

              <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                <img 
                  src={arsip.ketua.foto}
                  alt={arsip.ketua.nama}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                />
                <div className="sm:text-center">
                  <p className="font-bold text-gray-900">{arsip.ketua.nama}</p>
                  <p className="text-sm text-gray-600">{arsip.ketua.jabatan}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Program Direncanakan</p>
                  <p className="text-3xl font-bold text-gray-900">{arsip.stats.direncanakan}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Program Terlaksana</p>
                  <p className="text-3xl font-bold text-gray-900">{arsip.stats.terlaksana}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Tidak Terlaksana</p>
                  <p className="text-3xl font-bold text-gray-900">{arsip.stats.tidakTerlaksana}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daftar Program Kerja</h2>
            
            <div className="space-y-6">
              {arsip.programs.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{program.nama}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{program.tanggal}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Deskripsi</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{program.deskripsi}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Realisasi</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{program.realisasi}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Evaluasi</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{program.evaluasi}</p>
                    </div>
                  </div>

                  {program.dokumentasiLink && (
                    <Link 
                      href={program.dokumentasiLink}
                      className="inline-flex items-center text-amber-700 hover:text-amber-800 text-sm font-medium group"
                    >
                      Lihat dokumentasi kegiatan terkait
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
