import Navbar from "@/components/Navbar";
import PageHeader from "@/components/about/PageHeader";
import AboutSection from "@/components/about/AboutSection";
import FeatureSection from "@/components/about/FeatureSection";
import WhyChooseSection from "@/components/about/WhyChooseSection";
import TestimonialsSection from "@/components/about/TestimonialsSection";
import TeamSection from "@/components/about/TeamSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const AboutPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <PageHeader
        title="About Us"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "About" },
        ]}
      />
      <AboutSection />
      <FeatureSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <TeamSection />
    </div>
    <Footer />
  </PageTransition>
);

export default AboutPage;
