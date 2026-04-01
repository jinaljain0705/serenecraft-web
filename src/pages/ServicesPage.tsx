import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const ServicesPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <Services />
    </div>
    <Footer />
  </PageTransition>
);

export default ServicesPage;
