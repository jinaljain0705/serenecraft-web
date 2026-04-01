import Navbar from "@/components/Navbar";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const TeamPage = () => (
  <PageTransition>
    <Navbar />
    <div className="pt-20">
      <Team />
    </div>
    <Footer />
  </PageTransition>
);

export default TeamPage;
