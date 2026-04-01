import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHeader from "@/components/about/PageHeader";
import ContactInfo from "@/components/ContactInfo";
import ContactFormSection from "@/components/ContactFormSection";

const ContactPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <PageHeader title="Contact" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <ContactInfo />
      <ContactFormSection />
    </div>
    <Footer />
  </PageTransition>
);

export default ContactPage;
