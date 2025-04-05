
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SocialSidebar from '../components/SocialSidebar';

const Index = () => {
  useEffect(() => {
    // Set background color on body for the entire site
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#ffffff';
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden">
      <Navbar />
      <SocialSidebar />
      <Hero />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
