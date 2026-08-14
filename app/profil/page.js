import Header from "../components/Header";
import ProfilHero from "../components/ProfilHero";
import SejarahSection from "../components/SejarahSection";
import StrukturOrganisasi from "../components/StrukturOrganisasi";
import Footer from "../components/Footer";

export const metadata = {
  title: "Profil - Karang Taruna RT 03 Desa Sukamaju",
  description: "Profil organisasi Karang Taruna RT 03 Desa Sukamaju, sejarah singkat, dan struktur kepengurusan.",
};

export default function ProfilPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ProfilHero />
      <SejarahSection />
      <StrukturOrganisasi />
      <Footer />
    </div>
  );
}
