import Navbar from "@/components/Navbar";
import ConsultationForm from "@/components/ConsultationForm";
import Footer from "@/components/Footer";

const ContactPage = () => (
  <>
    <Navbar />
    <div className="pt-20">
      <ConsultationForm />
    </div>
    <Footer />
  </>
);

export default ContactPage;
