import Navbar from "@/components/Navbar";
import PageHeader from "@/components/about/PageHeader";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const PricingPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <PageHeader
        title="Pricing"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Pricing Tables" },
        ]}
      />
      <PricingSection />
    </div>
    <Footer />
  </PageTransition>
);

export default PricingPage;
