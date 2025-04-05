
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, description, tags, image, source, visit, index }) => {
  const tiltOptions = {
    max: 15,
    scale: 1,
    speed: 450,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <Tilt options={tiltOptions} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-56 object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <div className="flex gap-2">
                  <a 
                    href={source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors duration-300"
                  >
                    <Github size={18} className="text-white" />
                  </a>
                  <a 
                    href={visit} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors duration-300"
                  >
                    <ExternalLink size={18} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`text-xs px-3 py-1 rounded-full ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with shopping cart, user authentication, and payment processing capabilities.",
      tags: [
        { name: "react", color: "bg-blue-100 text-blue-800" },
        { name: "mongodb", color: "bg-green-100 text-green-800" },
        { name: "tailwind", color: "bg-cyan-100 text-cyan-800" },
      ],
      image: "https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      source: "https://github.com/",
      visit: "https://project.com/",
      id: 0,
    },
    {
      title: "AI Image Generator",
      description: "An application that utilizes OpenAI's DALL-E to generate unique images based on text prompts.",
      tags: [
        { name: "react", color: "bg-blue-100 text-blue-800" },
        { name: "openai", color: "bg-purple-100 text-purple-800" },
        { name: "express", color: "bg-yellow-100 text-yellow-800" },
      ],
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      source: "https://github.com/",
      visit: "https://project.com/",
      id: 1,
    },
    {
      title: "Social Media Dashboard",
      description: "A comprehensive dashboard for managing social media accounts and tracking engagement metrics.",
      tags: [
        { name: "react", color: "bg-blue-100 text-blue-800" },
        { name: "firebase", color: "bg-orange-100 text-orange-800" },
        { name: "chart.js", color: "bg-red-100 text-red-800" },
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      source: "https://github.com/",
      visit: "https://project.com/",
      id: 2,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
            Each project is briefly described with links to code repositories and live demos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
