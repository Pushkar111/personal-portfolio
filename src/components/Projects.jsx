
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative flex flex-col md:flex-row border-l-2 border-blue-500 pl-8 pb-16"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
      
      <div className="w-full md:w-1/2 pr-4">
        <h3 className={`text-2xl font-bold mb-2 ${project.titleColor || 'text-blue-500'}`}>
          {project.title}
        </h3>
        <p className="text-gray-400 mb-2">{project.subtitle}</p>
        <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
              #{tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-1/2 mt-4 md:mt-0 relative">
        <div className="overflow-hidden rounded-md shadow-xl border border-gray-800">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
          />
          
          <div className="absolute top-4 right-4 flex gap-2">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-dark/80 backdrop-blur-sm hover:bg-gray-800 rounded-full transition-colors duration-300"
              >
                <Github size={20} className="text-white" />
              </a>
            )}
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-dark/80 backdrop-blur-sm hover:bg-gray-800 rounded-full transition-colors duration-300"
              >
                <ExternalLink size={20} className="text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      title: "Harigurus",
      subtitle: "(Event Booking)",
      titleColor: "text-orange-500",
      description: "HariGurus is a one-stop-shop for all Hindu religious, customs and traditional requirements. Built the complete site from scratch.",
      technologies: ["react.js", "express.js", "node.js", "swiper.js", "mongoDB", "mongoose", "css", "javascript", "figma"],
      image: "public/lovable-uploads/4e1b4920-048b-4668-8b1d-5534dac65aa3.png",
      github: "https://github.com/",
      live: "https://example.com/"
    },
    {
      title: "EazyGrad",
      subtitle: "(EdTech Startup)",
      titleColor: "text-purple-500",
      description: "Being a lead developer, revamped the site to a highly responsive, and interactive website. Created new features and pages. Worked as a team with product manager and ux designer.",
      technologies: ["node.js", "express.js", "mongoDB", "mongoDBAtlas", "ejs", "swiper.js", "html", "css", "javascript", "lighthouse", "figma"],
      image: "public/lovable-uploads/39a9d69a-cba1-4fa5-bf17-0597df660e88.png",
      github: "https://github.com/",
      live: "https://example.com/"
    },
    {
      title: "Web Dev English",
      subtitle: "(Coaching and Consulting)",
      titleColor: "text-teal-500",
      description: "US-based English Coach's website for guiding techies. Improved existing look and added new features and sections.",
      technologies: ["wordpress", "elementor", "html", "css", "javascript", "figma"],
      image: "public/lovable-uploads/4b25a12a-73e0-4a55-b6bf-67a91bacfc2c.png",
      github: "https://github.com/",
      live: "https://example.com/"
    },
    {
      title: "Money Arjan Solutions",
      subtitle: "(Software Development Agency)",
      titleColor: "text-blue-500",
      description: "Designed and developed the site from scratch. Used a combo of themes and Figma to get the best results. Integrated contact form in the website using Netlify.",
      technologies: ["html", "css", "bootstrap", "netlify", "figma"],
      image: "public/lovable-uploads/7dc50d01-ce2e-4307-baba-cc1fae8ed634.png",
      github: "https://github.com/",
      live: "https://example.com/"
    },
    {
      title: "Pioneer Digital",
      subtitle: "(Digital Marketing Agency)",
      titleColor: "text-red-500",
      description: "One of the featured site while working with TheBrandWick.com (agency). Worked as a frontend developer to make the site user-interactive and responsive.",
      technologies: ["javascript", "bootstrap", "css", "sass", "html", "figma"],
      image: "public/lovable-uploads/d8aa075e-1508-4226-86b8-a6fa85768505.png",
      github: "https://github.com/",
      live: "https://example.com/"
    },
    {
      title: "Track My Expense",
      subtitle: "(Finance)",
      titleColor: "text-green-500",
      description: "Initially, made this WebApp to track my monthly expenditure. Currently, with 10+ user base, I'm continuously working on improving it following the feedback.",
      technologies: ["node.js", "express.js", "mongoDB", "mongoAtlas", "ejs", "html", "css", "javascript", "restAPI", "passport", "figma"],
      image: "public/lovable-uploads/7466db47-a859-41ea-b962-d29caf0f7617.png",
      github: "https://github.com/",
      live: "https://example.com/"
    },
    {
      title: "Currency Converter",
      subtitle: "(Productivity Tool)",
      titleColor: "text-yellow-500",
      description: "I made this app when I started learning React. This app use an external API to fetch live currency rates. An appealing currency converter with a beautiful UI.",
      technologies: ["react.js", "javascript", "jsx", "css", "ajax", "fetchAPI", "figma"],
      image: "public/lovable-uploads/c9d58ad4-64b6-44d3-8b86-7f6a1bb8d7ff.png",
      github: "https://github.com/",
      live: "https://example.com/"
    }
  ]);

  return (
    <section id="projects" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">
            Latest Works
          </h2>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
