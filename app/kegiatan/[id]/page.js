import Header from "../../components/Header";
import KegiatanDetailHero from "../../components/KegiatanDetailHero";
import KegiatanDetailContent from "../../components/KegiatanDetailContent";
import KegiatanGallery from "../../components/KegiatanGallery";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Detail Kegiatan - Karang Taruna RT 03 Desa Sukamaju",
  description: "Detail kegiatan dan program kerja Karang Taruna RT 03 Desa Sukamaju.",
};

const kegiatanData = {
  1: {
    id: 1,
    judul: "Turnamen Futsal Pemuda Desa",
    kategori: "Olahraga & Rekreasi",
    tanggal: "Okt 2024",
    tanggalLengkap: "12 Agustus 2024",
    lokasi: "Lapangan Serbaguna RT 03",
    deskripsi: "Perayaan HUT RI ke-79 dengan berbagai lomba olahraga dan seni budaya.",
    deskripsiLengkap: [
      "Turnamen Futsal Pemuda Desa yang diselenggarakan oleh Karang Taruna RT 03 telah sukses dilaksanakan dengan penuh antusiasme. Kegiatan tahunan ini tidak hanya bertujuan untuk mencari bibit-bibit unggul di bidang olahraga, tetapi juga sebagai ajang silaturahm dan mempererat tali persaudaraan antar pemuda di lingkungan Sukamaju.",
      "Selama tiga hari berturut-turut, lapangan serbaguna menjadi pusat keramaian desa. Sorak sorai pendukung dari berbagai RT menggema, menciptakan atmosfer kompetisi yang sehat dan menyenangkan. Selain pertandingan utama, acara ini juga dimeriahkan dengan bazaar makanan ringan yang dikelola oleh ibu-ibu PKK, turut membantu menggerakkan ekonomi lokal berskala kecil.",
      "Kami mengucapkan terima kasih yang sebesar-besarnya kepada seluruh panitia yang telah bekerja keras, para donatur yang telah menyalurkan rezeki nya, dan tentunya seluruh warga yang telah berpartisipasi meramaikan acara ini. Kesuksesan turnamen ini adalah bukti nyata bahwa dengan gotong royong, pemuda RT 03 mampu menyelenggarakan kegiatan yang positif dan berdampak nyata bagi lingkungan."
    ],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070",
    galeri: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070"
    ]
  },
  2: {
    id: 2,
    judul: "Program Desa Bersih",
    kategori: "Lingkungan & Kebersihan",
    tanggal: "Agu 2024",
    tanggalLengkap: "5 Agustus 2024",
    lokasi: "Seluruh Wilayah RT 03",
    deskripsi: "Kegiatan gotong royong rutin untuk menjaga kebersihan lingkungan RT 03.",
    deskripsiLengkap: [
      "Program Desa Bersih merupakan kegiatan rutin bulanan yang diinisiasi oleh Karang Taruna RT 03 untuk menjaga kebersihan dan keindahan lingkungan. Kegiatan ini melibatkan seluruh warga dari berbagai usia untuk bersama-sama membersihkan area publik.",
      "Dalam kegiatan kali ini, fokus utama adalah pembersihan saluran air dan pengangkatan sampah di sepanjang jalan utama desa. Antusiasme warga sangat tinggi dengan kehadiran lebih dari 50 peserta yang bekerja bergotong royong.",
      "Keberhasilan program ini menunjukkan kepedulian warga terhadap lingkungan dan pentingnya kerjasama dalam menjaga kebersihan desa kita bersama."
    ],
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070",
    galeri: [
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070",
      "https://images.unsplash.com/photo-1617791160588-241658c0f566?q=80&w=2070",
      "https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?q=80&w=2070",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070"
    ]
  }
};

export default function KegiatanDetailPage({ params }) {
  const kegiatan = kegiatanData[params.id] || kegiatanData[1];

  return (
    <div className="min-h-screen">
      <Header />
      <KegiatanDetailHero kegiatan={kegiatan} />
      <KegiatanDetailContent kegiatan={kegiatan} />
      <KegiatanGallery kegiatan={kegiatan} />
      <Footer />
    </div>
  );
}
