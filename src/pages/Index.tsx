import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import ServicesHome from "@/components/ServicesHome";
import AboutHome from "@/components/AboutHome";
import TestimonialsHome from "@/components/TestimonialsHome";
import CTABanner from "@/components/CTABanner";
import ProjectsList from "@/components/ProjectsList";
import Team from "@/components/Team";
import WhyChooseUs from "@/components/WhyChooseUs";
import DonateCTA from "@/components/DonateCTA";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => (
  <PageTransition>
    <Navbar />
    <Hero />
    <ValueProps />
    <ServicesHome />
    <AboutHome />
    <TestimonialsHome />
    <CTABanner />
    <ProjectsList />
    <Team />
    <WhyChooseUs />
    <DonateCTA />
    <BlogSection />
    <Footer />
  </PageTransition>
);

export default Index;
