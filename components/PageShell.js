import TopBar from "./TopBar";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import SurveyModal from "./SurveyModal";
import LoginModal from "./LoginModal";

export default function PageShell({ children }) {
  return (
    <>
      <TopBar />
      <Navbar />
      <SurveyModal />
      <LoginModal />
      <main>{children}</main>
      <AboutSection />
      <Footer />
    </>
  );
}