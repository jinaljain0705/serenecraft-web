import Navbar from "@/components/Navbar";
import ConsultationForm from "@/components/ConsultationForm";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const ContactPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <ConsultationForm />
    </div>
    <Footer />
  </PageTransition>
);

export default ContactPage;
