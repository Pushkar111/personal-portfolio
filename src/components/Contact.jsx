
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating form submission
    setTimeout(() => {
      setLoading(false);
      toast.success('Thank you. I will get back to you as soon as possible.');
      
      setForm({
        name: '',
        email: '',
        message: '',
      });
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Feel free to reach out if you have any questions or would like to work together.
            I'm always open to discussing new projects, creative ideas, or opportunities.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to say?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-primary text-white font-medium py-3 px-8 rounded-lg hover-scale flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <Send size={18} />}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="bg-gradient-primary rounded-2xl p-8 text-white h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="mb-8">
                  I'm currently available for freelance work or full-time positions. 
                  If you have a project that you want to get started or need help with 
                  something, feel free to get in touch.
                </p>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                    >
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-white/80 text-sm">
                  &copy; 2025 Anurag Singh. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
