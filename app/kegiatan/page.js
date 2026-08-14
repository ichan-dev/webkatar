import Header from "../components/Header";
import KegiatanHero from "../components/KegiatanHero";
import KegiatanGrid from "../components/KegiatanGrid";
import Footer from "../components/Footer";

export const metadata = {
  title: "Kegiatan & Program Kerja - Karang Taruna RT 03 Desa Sukamaju",
  description: "Daftar kegiatan dan program kerja Karang Taruna RT 03 Desa Sukamaju.",
};

export default function KegiatanPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <KegiatanHero />
      <KegiatanGrid />
      <Footer />
    </div>
  );
}
