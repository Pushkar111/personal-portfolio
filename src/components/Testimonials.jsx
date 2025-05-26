import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

const Testimonial = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
    >
      {/* Background Quote Icon */}
      <div className="absolute top-4 right-6 opacity-10">
        <Quote size={80} className="text-blue-500" />
      </div>
      
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-current" />
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-blue-500/30">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-300 mb-6 italic text-lg leading-relaxed font-light">
            "{testimonial.text}"
          </p>
          <div className="flex flex-col">
            <h3 className="text-blue-400 text-xl font-bold mb-1">{testimonial.name}</h3>
            <p className="text-gray-400 text-sm">{testimonial.position}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const swiperRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Enhanced testimonials with ratings and verified status
  const testimonials = [
    {
      name: "Gautham Chengappa",
      position: "Web Developer, UX Consultancy",
      text: "I can bet that it's too hard to find professional developers like Anurag. He could peek inside my mind and made the site exactly as I wanted. Much appreciated",
      image: "https://randomuser.me/api/portraits/men/30.jpg",
      rating: 5,
      verified: true
    },
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc",
      text: "Working with Anurag was a pleasure. His technical expertise and attention to detail resulted in a website that exceeded our expectations.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      verified: true
    },
    {
      name: "Michael Chen",
      position: "Product Manager, InnovateCo",
      text: "Anurag delivered exceptional work on our project. His ability to translate complex requirements into elegant solutions is remarkable.",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      rating: 5,
      verified: true
    },
    {
      name: "Priya Sharma",
      position: "Founder, DesignHub",
      text: "Anurag's technical skills combined with his understanding of design principles made him the perfect choice for our web development needs.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      verified: true
    },
    {
      name: "David Rodriguez",
      position: "CTO, NextGen Solutions",
      text: "Outstanding developer with deep understanding of modern web technologies. Delivered beyond expectations with clean, scalable code.",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      verified: true
    },
    {
      name: "Emily Zhang",
      position: "Lead Designer, Creative Hub",
      text: "Anurag brings designs to life with pixel-perfect precision. His collaborative approach made the entire process seamless.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      verified: true
    }
  ];

  // Function to get real slide index (handling loop)
  const getRealIndex = (swiper) => {
    if (!swiper) return 0;
    return swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
  };

  // Auto-advance testimonials - Remove manual timer since Swiper handles autoplay
  useEffect(() => {
    // Remove manual timer as Swiper's autoplay handles this better
    return () => {};
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && swiperRef.current) {
        swiperRef.current.slidePrev();
        toast.success('Previous testimonial');
      } else if (e.key === 'ArrowRight' && swiperRef.current) {
        swiperRef.current.slideNext();
        toast.success('Next testimonial');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextTestimonial = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const prevTestimonial = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">
            What my clients are saying?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about their experience working with me.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              // Use realIndex for proper loop handling
              const realIndex = getRealIndex(swiper);
              setCurrentTestimonial(realIndex);
            }}
            onRealIndexChange={(swiper) => {
              // This event is specifically for loop mode
              setCurrentTestimonial(swiper.realIndex);
            }}
            modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 1,
                spaceBetween: 40
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 50
              }
            }}
            effect="fade"
            fadeEffect={{
              crossFade: true
            }}
            loop={true}
            loopAdditionalSlides={1}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return `<span class="${className} !bg-blue-500 !w-3 !h-3 !mx-1 transition-all duration-300 hover:!bg-blue-400"></span>`;
              },
            }}
            parallax={true}
            speed={800}
            className="testimonial-swiper !pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div data-swiper-parallax="-300">
                  <Testimonial testimonial={testimonial} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation */}
          <div className="flex justify-center items-center mt-8 gap-6">
            <motion.button 
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group p-3 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 border border-gray-600 hover:border-blue-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-gray-300 group-hover:text-white transition-colors" />
            </motion.button>

            {/* Progress Indicator */}
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-medium text-sm">
                {currentTestimonial + 1} / {testimonials.length}
              </span>
              <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <motion.button 
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group p-3 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 border border-gray-600 hover:border-blue-500"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-gray-300 group-hover:text-white transition-colors" />
            </motion.button>
          </div>

          {/* Additional Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-6 mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="text-2xl font-bold text-blue-400 mb-1">50+</div>
              <div className="text-gray-400 text-sm">Happy Clients</div>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
              <div className="text-gray-400 text-sm">Satisfaction Rate</div>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="text-2xl font-bold text-blue-400 mb-1">5.0</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .testimonial-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 2rem;
        }
        
        .testimonial-swiper .swiper-pagination-bullet {
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }
        
        .testimonial-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;