import Header from "../components/Header";
import ArsipHero from "../components/ArsipHero";
import ArsipPeriodCards from "../components/ArsipPeriodCards";
import Footer from "../components/Footer";

export const metadata = {
  title: "Arsip Program Kerja - Karang Taruna RT 03 Desa Sukamaju",
  description: "Arsip program kerja dan kepengurusan Karang Taruna RT 03 Desa Sukamaju dari masa ke masa.",
};

export default function ArsipPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ArsipHero />
      <ArsipPeriodCards />
      <Footer />
    </div>
  );
}
