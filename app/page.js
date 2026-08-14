import Header from "./components/Header";
import Hero from "./components/Hero";
import InfoCards from "./components/InfoCards";
import ProfileSection from "./components/ProfileSection";
import ActivitiesSection from "./components/ActivitiesSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <InfoCards />
      <ProfileSection />
      <ActivitiesSection />
      <Footer />
    </div>
  );
}
