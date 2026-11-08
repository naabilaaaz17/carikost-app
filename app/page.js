import PageShell from "../components/PageShell";
import Hero from "../components/Hero";
import PromoCarousel from "../components/PromoCarousel";
import InfoCards from "../components/InfoCards";
import PromoNgebut from "../components/PromoNgebut";
import Recommendations from "../components/Recommendations";
import NewKos from "../components/NewKos";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <PromoCarousel />
      <InfoCards />
      <PromoNgebut />
      <Recommendations />
      <NewKos />
    </PageShell>
  );
}