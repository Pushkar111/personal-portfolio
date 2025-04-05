
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonial = ({ testimonial, active }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className={`p-8 bg-gray-900 rounded-xl shadow-lg ${active ? 'block' : 'hidden'}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-300 mb-6 italic text-lg">"{testimonial.text}"</p>
          <h3 className="text-blue-500 text-xl font-bold">{testimonial.name}</h3>
          <p className="text-gray-400">{testimonial.position}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Gautham Chengappa",
      position: "Web Developer, UX Consultancy",
      text: "I can bet that it's too hard to find professional developers like Anurag. He could peek inside my mind and made the site exactly as I wanted. Much appreciated",
      image: "public/lovable-uploads/20bd19e2-0957-4a7d-a71e-104dad166253.png"
    },
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc",
      text: "Working with Anurag was a pleasure. His technical expertise and attention to detail resulted in a website that exceeded our expectations.",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Michael Chen",
      position: "Product Manager, InnovateCo",
      text: "Anurag delivered exceptional work on our project. His ability to translate complex requirements into elegant solutions is remarkable.",
      image: "https://randomuser.me/api/portraits/men/36.jpg"
    },
    {
      name: "Priya Sharma",
      position: "Founder, DesignHub",
      text: "Anurag's technical skills combined with his understanding of design principles made him the perfect choice for our web development needs.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">
            What my clients are saying?
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index} 
              testimonial={testimonial} 
              active={index === currentTestimonial}
            />
          ))}
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <ChevronLeft size={30} />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-500 w-4' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
