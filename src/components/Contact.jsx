import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { 
  Send, 
  User, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  Sparkles,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Confetti from "react-confetti";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";

// Form validation schema
const contactSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod.string().optional(),
  subject: zod.string().min(5, "Subject must be at least 5 characters").max(100, "Subject too long"),
  message: zod.string().min(10, "Message must be at least 10 characters").max(1000, "Message too long"),
  priority: zod.enum(["low", "medium", "high"]).default("medium"),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const formRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      priority: "medium",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for Formspree
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      const response = await fetch("https://formspree.io/f/mnnponll", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSuccessAnimation(true);
        setShowConfetti(true);
        
        toast.success("🎉 Message sent successfully!", {
          description: "I'll get back to you within 24 hours!",
          duration: 5000,
        });
        
        form.reset();
        
        // Hide confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000);
        setTimeout(() => setSuccessAnimation(false), 4000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Failed to send message", {
        description: "Please try again or contact me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityColors = {
    low: "bg-green-500/20 border-green-500 text-green-400",
    medium: "bg-yellow-500/20 border-yellow-500 text-yellow-400",
    high: "bg-red-500/20 border-red-500 text-red-400",
  };

  const floatingElements = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
      initial={{ 
        x: Math.random() * 400, 
        y: Math.random() * 600,
        opacity: 0 
      }}
      animate={{ 
        x: Math.random() * 400, 
        y: Math.random() * 600,
        opacity: [0, 1, 0] 
      }}
      transition={{ 
        duration: Math.random() * 3 + 2, 
        repeat: Infinity,
        delay: Math.random() * 2 
      }}
    />
  ));

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements}
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          viewport={{ once: true }} 
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Let's Build Something Amazing</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Let's discuss your next project and create something extraordinary together.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Side - Info Cards */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -100 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            viewport={{ once: true }}
          >
            {/* Lottie Animation */}
            <div className="relative mb-8">
              <DotLottieReact 
                src="https://lottie.host/e416c9e3-00e9-4ac0-8662-b2205f6c0791/V7Qcfw07AB.lottie" 
                loop 
                autoplay 
                className="w-full max-w-md mx-auto scale-125" 
              />
            </div>

            {/* Contact Info Cards */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email Me</h3>
                  <p className="text-gray-400 text-sm">pushkarmodi111@gmail.com</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Drop me a line and I'll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.1)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Response Time</h3>
                  <p className="text-gray-400 text-sm">Usually within 2-4 hours</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Quick turnaround time for all inquiries and project discussions.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.1)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Project Ready</h3>
                  <p className="text-gray-400 text-sm">Available for new projects</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Currently accepting new client projects and collaborations.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 100 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Success Animation Overlay */}
              <AnimatePresence>
                {successAnimation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl border border-green-500/30 flex items-center justify-center z-10"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-green-300">Thank you for reaching out. I'll be in touch soon!</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                <Form {...form}>
                  <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-white font-medium">
                              <User className="w-4 h-4 text-blue-400" />
                              Full Name *
                            </FormLabel>
                            <FormControl>
                              <motion.input
                                {...field}
                                className="w-full p-4 bg-gray-900/70 border border-gray-600 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                                placeholder="Enter your full name"
                                whileFocus={{ scale: 1.02 }}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-white font-medium">
                              <Mail className="w-4 h-4 text-green-400" />
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <motion.input
                                {...field}
                                type="email"
                                className="w-full p-4 bg-gray-900/70 border border-gray-600 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300"
                                placeholder="your.email@example.com"
                                whileFocus={{ scale: 1.02 }}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Phone and Subject Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-white font-medium">
                              <Phone className="w-4 h-4 text-purple-400" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <motion.input
                                {...field}
                                type="tel"
                                className="w-full p-4 bg-gray-900/70 border border-gray-600 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                                placeholder="+1 (555) 123-4567"
                                whileFocus={{ scale: 1.02 }}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-white font-medium">
                              <MessageSquare className="w-4 h-4 text-yellow-400" />
                              Subject *
                            </FormLabel>
                            <FormControl>
                              <motion.input
                                {...field}
                                className="w-full p-4 bg-gray-900/70 border border-gray-600 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300"
                                placeholder="What's this about?"
                                whileFocus={{ scale: 1.02 }}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Priority Selector */}
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-white font-medium">
                            <Star className="w-4 h-4 text-orange-400" />
                            Priority Level
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-4">
                              {["low", "medium", "high"].map((priority) => (
                                <motion.button
                                  key={priority}
                                  type="button"
                                  onClick={() => field.onChange(priority)}
                                  className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                                    field.value === priority
                                      ? priorityColors[priority]
                                      : "border-gray-600 text-gray-400 hover:border-gray-500"
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                </motion.button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Message Field */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-white font-medium">
                            <MessageSquare className="w-4 h-4 text-cyan-400" />
                            Your Message *
                          </FormLabel>
                          <FormControl>
                            <motion.textarea
                              {...field}
                              rows={6}
                              className="w-full p-4 bg-gray-900/70 border border-gray-600 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 resize-none"
                              placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                              whileFocus={{ scale: 1.02 }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                          <p className="text-gray-500 text-xs mt-1">
                            {field.value?.length || 0}/1000 characters
                          </p>
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                            <Sparkles className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {/* Footer Note */}
                    <motion.p 
                      className="text-center text-gray-400 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      🔒 Your information is secure and will never be shared with third parties.
                    </motion.p>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    
  );
  
};

export default Contact;