
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
