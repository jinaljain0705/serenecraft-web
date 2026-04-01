import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const TestimonialsPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <Testimonials />
    </div>
    <Footer />
  </PageTransition>
);

export default TestimonialsPage;
