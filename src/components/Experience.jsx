
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase } from 'lucide-react';

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '24px',
      }}
      contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.2)' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          {experience.icon}
        </div>
      }
    >
      <div>
        <h3 className="text-xl font-bold">{experience.title}</h3>
        <p className="text-base font-semibold" style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-sm text-gray-600 pl-1"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company_name: "Tech Innovations Inc.",
      icon: <Briefcase className="text-white" />,
      iconBg: "#009FFD",
      date: "Jan 2022 - Present",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
      title: "Full Stack Developer",
      company_name: "Digital Solutions LLC",
      icon: <Briefcase className="text-white" />,
      iconBg: "#2A2A72",
      date: "Mar 2020 - Dec 2021",
      points: [
        "Built and maintained RESTful APIs using Node.js and Express.",
        "Implemented authentication systems and integrated third-party services.",
        "Optimized application performance and implemented caching strategies.",
        "Led development team in adopting best practices and implementing CI/CD pipelines.",
      ],
    },
    {
      title: "Frontend Developer",
      company_name: "Creative Web Agency",
      icon: <Briefcase className="text-white" />,
      iconBg: "#009FFD",
      date: "Jan 2018 - Feb 2020",
      points: [
        "Developed responsive web applications using modern JavaScript frameworks.",
        "Collaborated with designers to implement pixel-perfect UI components.",
        "Integrated analytics and tracking tools to monitor user behavior.",
        "Improved website performance and accessibility standards.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Work Experience</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My professional journey and roles I've taken on over the years.
            Each experience has shaped my skills and approach to development.
          </p>
        </motion.div>

        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;
