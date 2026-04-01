import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHeader from "@/components/about/PageHeader";

const ServicesPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <PageHeader title="Services" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]} />
      <Services />
    </div>
    <Footer />
  </PageTransition>
);

export default ServicesPage;
