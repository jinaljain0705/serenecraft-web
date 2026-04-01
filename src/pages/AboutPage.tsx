import Navbar from "@/components/Navbar";
import AboutUs from "@/components/AboutUs";
import AboutValues from "@/components/AboutValues";
import AboutTeam from "@/components/AboutTeam";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const AboutPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <AboutUs />
      <AboutValues />
      <AboutTeam />
    </div>
    <Footer />
  </PageTransition>
);

export default AboutPage;
