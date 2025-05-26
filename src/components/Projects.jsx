import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import useSound from "../hooks/useSound";

const getRGBFromTailwindColor = (twColor) => {
    const colors = {
        "bg-blue-500": "59,130,246",
        "bg-orange-500": "249,115,22",
        "bg-purple-500": "168,85,247",
        "bg-teal-500": "20,184,166",
        "bg-red-500": "239,68,68",
        "bg-green-500": "34,197,94",
        "bg-yellow-500": "234,179,8",
    };
    return colors[twColor] || "59,130,246"; // default to blue
};
const ProjectCard = ({ project, index }) => {
    const isEven = index % 2 === 0;
    const { play: playHoverSound } = useSound("/sounds/hover.mp3");

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center mb-28`}>
            {/* Timeline connector */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent -z-10 md:block hidden"></div>

            {/* Interactive circle-dot at center */}
            <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-6 h-6 rounded-full z-20 md:block hidden
                    ${project.accentColor || "bg-blue-500"} 
                    shadow-[0_0_10px_rgba(59,130,246,0.5)]
                    transition-all duration-300 hover:scale-125 hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]`}
                aria-label={`Visit ${project.title} project`}>
                {/* Visual enhancement for the dot */}
                <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: `var(--${project.accentColor?.split("-")[1] || "blue"}-500)` }}></span>
            </a>

            {/* horizontal connector line - connects timeline center to image */}
            <div
                className={`absolute top-1/2 transform -translate-y-1/2 
      ${isEven ? "left-[42%] w-[8%]" : "left-[50%] w-[8%]"} 
      h-[4px] z-10 md:block hidden`}
                style={{
                    background: `linear-gradient(to right, 
        rgba(${getRGBFromTailwindColor(project.accentColor)}, ${isEven ? 0.7 : 1.0}) 0%,
        rgba(${getRGBFromTailwindColor(project.accentColor)}, 0.8) 50%,
        rgba(${getRGBFromTailwindColor(project.accentColor)}, ${isEven ? 1.0 : 0.7}) 100%)`,
                    boxShadow: `0 0 12px 2px rgba(${getRGBFromTailwindColor(project.accentColor)}, 0.6)`,
                    opacity: 1,
                }}></div>

            {/* Project content with increased spacing */}
            <div className="w-full md:w-[42%] p-4 z-0 relative">
                <div className="relative group rounded-xl transition-all duration-300 hover:scale-105">
                    {/* Small connecting dot from the image side */}
                    <div
                        className={`absolute ${isEven ? "right-[-6px]" : "left-[-6px]"} top-1/2 transform -translate-y-1/2 
            h-3 w-3 rounded-full ${project.accentColor || "bg-blue-500"} shadow-md md:block hidden border 
            border-gray-900 z-20`}></div>

                    {/* Image container with overflow-hidden */}
                    <div className="relative rounded-xl overflow-hidden p-4 md:p-6 backdrop-blur-sm">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-300 rounded-lg cursor-pointer"
                            loading="lazy"
                        />
                    </div>

                    {/* Enhanced Tooltip with center-to-top animation */}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => playHoverSound()}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  group-hover:top-0 group-hover:-translate-y-full
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-500 ease-out
                  z-30 scale-90 group-hover:scale-100">
                            <div
                                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                      backdrop-blur-md ${project.accentColor.replace("bg-", "bg-opacity-80 bg-")} 
                      shadow-[0_0_15px_rgba(0,0,0,0.3),0_0_30px_rgba(var(--tw-shadow-color),0.15)] 
                      transition-all duration-400 hover:scale-105 
                      animate-tooltipPulse border-2 border-white/10
                      hover:shadow-[0_5px_20px_4px_rgba(${getRGBFromTailwindColor(project.accentColor)},0.5)]`}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: "perspective(500px) rotateX(10deg)",
                                }}>
                                {/* Glowing dot indicator */}
                                <span
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 
                           w-2 h-2 rounded-full animate-pulse"
                                    style={{
                                        backgroundColor: `rgba(${getRGBFromTailwindColor(project.accentColor)}, 1)`,
                                        boxShadow: `0 0 10px 2px rgba(${getRGBFromTailwindColor(project.accentColor)}, 0.7)`,
                                    }}></span>

                                <span className="font-bold text-white tracking-wide ml-2">{project.title}</span>
                                <ExternalLink size={18} className="text-white ml-1" />

                                {/* Arrow pointer */}
                                <span
                                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                           border-t-8 border-l-8 border-r-8 border-transparent"
                                    style={{
                                        borderTopColor: `rgba(${getRGBFromTailwindColor(project.accentColor)}, 0.8)`,
                                    }}></span>
                            </div>
                        </a>
                    )}
                </div>
            </div>

            {/* Gap between content and details - spacer div */}
            <div className="md:w-[16%] hidden md:block"></div>

            {/* Project details with increased spacing */}
            <div className="w-full md:w-[42%] p-4 mt-8 md:mt-0">
                <div
                    className={`p-6 rounded-xl backdrop-blur-sm border border-gray-800/20 shadow-lg
                        bg-gradient-to-br ${project.gradientBg || "from-gray-900/80 to-gray-800/80"}`}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <h3 className={`text-2xl font-bold ${project.textColor || "text-blue-400"} mb-1`}>{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 font-medium">{project.subtitle}</p>
                        <p className="text-gray-300 mb-5 leading-relaxed text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    className={`px-3 py-1 text-xs rounded-full border border-gray-700/50 
                                    ${project.tagBg || "bg-gray-800/70"} backdrop-blur-sm 
                                    ${project.tagText || "text-gray-300"} 
                                    whitespace-nowrap`}>
                                    #{tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [projects] = useState([
        {
            title: "Geeta Sangam",
            subtitle: "(Discover the World)",
            description:
                "REST API World is a sleek and interactive platform to explore and test RESTful APIs built with React. Designed and developed from scratch to help developers understand and interact with APIs efficiently.",
            technologies: ["react.js", "restapi", "javascript", "axios", "html", "css", "figma"],
            image: "assets/geeta-sangam-mockup.png",
            live: "https://geeta-sangam.netlify.app/",
            github: "https://github.com/",
            gradientBg: "from-orange-900/30 to-orange-800/30",
            accentColor: "bg-orange-500",
            textColor: "text-orange-400",
            tagBg: "bg-orange-900/40",
            tagText: "text-orange-200",
        },
        {
            title: "Packpal Group Logistics Organizer",
            subtitle: "(Logistics & Supply Chain Management)",
            description:
                "A comprehensive logistics management platform designed to streamline supply chain operations and package tracking. Features real-time shipment monitoring, route optimization, and integrated communication tools for logistics teams.",
            technologies: ["react.js", "node.js", "express.js", "mongoDB", "logistics-api", "tracking", "responsive-design"],
            image: "assets/packpal-mockup.png",
            live: "https://packpal-logistics.netlify.app/",
            github: "https://github.com/Pushkar111/PackPal-Group-Logistics-Organizer.git",
            gradientBg: "from-indigo-900/30 to-indigo-800/30",
            accentColor: "bg-indigo-500",
            textColor: "text-indigo-400",
            tagBg: "bg-indigo-900/40",
            tagText: "text-indigo-200",
        },
        {
            title: "Movie Finder",
            subtitle: "(Search Any Movie Instantly)",
            description:
                "Built a responsive Movie Finder web app using React that lets users search and explore movie details in real time via the OMBD API. Implemented dynamic search functionality, loading states, and modern UI components to deliver a smooth user experience.",
            technologies: ["react.js", "OMBD API", "html", "css", "javascript"],
            image: "assets/movie-finder-mockup.png",
            live: "https://movie-find-app.netlify.app",
            github: "https://github.com/Pushkar111/Movie-search-app.git",
            gradientBg: "from-purple-900/30 to-purple-800/30",
            accentColor: "bg-purple-500",
            textColor: "text-purple-400",
            tagBg: "bg-purple-900/40",
            tagText: "text-purple-200",
        },
        {
            title: "Task Tracker",
            subtitle: "(Task Management Web App)",
            description:
                "A feature-rich task management application built with React to help users organize and prioritize their daily tasks. The app includes task categorization, priority levels, reminders, and analytics to boost productivity.",
            technologies: ["react.js", "html", "css", "javascript", "Material-UI", "Framer Motion", "Firebase", "Chart.js"],
            image: "assets/taskify-tracker-mockup.png",
            live: "https://taskify-tracker.netlify.app/",
            github: "https://github.com/Pushkar111/Task-Tracker.git",
            gradientBg: "from-teal-900/30 to-teal-800/30",
            accentColor: "bg-teal-500",
            textColor: "text-teal-400",
            tagBg: "bg-teal-900/40",
            tagText: "text-teal-200",
        },
        {
            title: "Memory Game",
            subtitle: "(Interactive Card Matching Game)",
            description:
                "Built a fully responsive and engaging memory card game using React. Players match pairs of fantasy-themed cards through interactive gameplay enhanced with flip animations and sound effects.",
            technologies: ["react", "javascript", "css", "responsive-design", "game-development"],
            image: "assets/memory-game-mockup.png",
            live: "https://memory-game-pushkar.netlify.app/",
            github: "https://github.com/",
            gradientBg: "from-red-900/30 to-red-800/30",
            accentColor: "bg-red-500",
            textColor: "text-red-400",
            tagBg: "bg-red-900/40",
            tagText: "text-red-200",
        },
        {
            title: "Country Explorer",
            subtitle: "(Discover the World)",
            description:
                "REST API World is a sleek and interactive platform to explore and test RESTful APIs built with React. Designed and developed from scratch to help developers understand and interact with APIs efficiently.",
            technologies: ["react.js", "restapi", "javascript", "axios", "html", "css", "figma"],
            image: "assets/country-exploror-mockup.png",
            live: "https://rest-api-world-react.netlify.app/",
            github: "https://github.com/Pushkar111/REST-Countries-API-with-color-theme-switcher-solution-react.git",
            gradientBg: "from-blue-900/30 to-blue-800/30",
            accentColor: "bg-blue-500",
            textColor: "text-blue-400",
            tagBg: "bg-blue-900/40",
            tagText: "text-blue-200",
        },
        {
            title: "IP Address Tracker",
            subtitle: "(IP Geolocation)",
            description:
                "An IP Address Tracker web app built with HTML, CSS, and JavaScript that allows users to track their IP address location in real-time. The app uses an external API to fetch geolocation data and displays it on an interactive map.",
            technologies: ["html", "css", "javascript", "ajax", "fetchAPI", "leaflet.js"],
            image: "assets/ip-tracker-mockup.png",
            live: "https://findmyiptracker.netlify.app/",
            github: "https://github.com/Pushkar111/Task-Tracker.git",
            gradientBg: "from-green-900/30 to-green-800/30",
            accentColor: "bg-green-500",
            textColor: "text-green-400",
            tagBg: "bg-green-900/40",
            tagText: "text-green-200",
        },
        {
            title: "Foodie Hamburger",
            subtitle: "(Food Menu App)",
            description:"A Responsive Food Menu web app built with HTML, CSS, and JavaScript that allows users to explore a variety of food items. The app features a dynamic menu with categories, images, and descriptions, providing an engaging user experience.",
            technologies: ["html", "css", "javascript"],
            image: "assets/foodie-hamburger-mockup.png",
            live: "https://foodiehamburger.vercel.app/",
            github: "https://github.com/Pushkar111/Foodie-Hamburger.git",
            gradientBg: "from-yellow-900/30 to-yellow-800/30",
            accentColor: "bg-yellow-500",
            textColor: "text-yellow-400",
            tagBg: "bg-yellow-900/40",
            tagText: "text-yellow-200",
        },
    ]);

    return (
        <section id="projects" className="py-20 px-4 bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(30,41,59,0.4),rgba(30,41,59,0)_30%),radial-gradient(circle_at_65%_70%,rgba(45,55,72,0.4),rgba(30,41,59,0)_30%)] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        <span className="inline-block border-b-4 border-blue-500 pb-2">Latest Works</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">A curated selection of my recent projects across various industries and technologies</p>
                </motion.div>
                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/10 via-blue-500/30 to-blue-500/10 transform -translate-x-1/2 rounded-full hidden md:block"></div>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
