import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SocialSidebar from '../components/SocialSidebar';
import CursorAnimation from '../components/CursorAnimation';

const Index = () => {
  useEffect(() => {
    // Set background color on body for the entire site
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#ffffff';
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white">
      <CursorAnimation />
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
