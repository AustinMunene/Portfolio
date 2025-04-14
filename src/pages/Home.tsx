import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<number | null>(null);

  const projects = [
    {
      title: 'Faced by cynie',
      description:
        'A modern web application that allows users to create and share their stories through beautiful, customizable cards. Built with a focus on user experience and visual appeal.',
      images: [
        '/images/faced-by-cynie-1.png',
        '/images/faced-by-cynie-2.png',
        '/images/faced-by-cynie-3.png',
      ],
      link: 'https://facedbycynie.com',
      github: 'https://github.com/yourusername/faced-by-cynie',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'MKU Hostel Management System',
      description:
        'A comprehensive hostel management system for Mount Kenya University, featuring room allocation, student registration, and administrative tools. Streamlines the hostel management process for better efficiency.',
      images: [
        '/images/mku-hostel-1.png',
        '/images/mku-hostel-2.png',
        '/images/mku-hostel-3.png',
      ],
      link: 'https://mku-hostel.com',
      github: 'https://github.com/yourusername/mku-hostel',
      stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    },
    {
      title: 'Portfolio',
      description:
        'A modern, responsive portfolio website showcasing my work and skills. Features smooth animations, interactive elements, and a clean, professional design.',
      images: [
        '/images/portfolio-1.png',
        '/images/portfolio-2.png',
        '/images/portfolio-3.png',
      ],
      link: 'https://austinmunene.com',
      github: 'https://github.com/yourusername/portfolio',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayInterval.current = window.setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % 3);
      }, 5000);
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying]);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#FF00D6]/10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-6 gradient-text reveal"
            >
              Austin Munene
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 reveal"
            >
              Software Developer & Quality Assurance Analyst
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 reveal"
            >
              <a
                href="mailto:austinmunene@gmail.com"
                className="px-8 py-3 bg-gradient-to-r from-[#00D1FF] to-[#FF00D6] text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 group"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border border-gray-700 text-gray-300 rounded-full font-medium hover:border-[#00D1FF] hover:text-[#00D1FF] transition-colors"
              >
                View Projects
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center gradient-text reveal"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group reveal"
              >
                <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-[#00D1FF]/50 transition-colors h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={project.images[currentImageIndex]}
                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 gradient-text">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-[#00D1FF] transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-[#00D1FF] transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 gradient-text reveal"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 mb-8 reveal"
          >
            Have a project in mind? Let's discuss how we can work together.
          </motion.p>
          <motion.a
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            href="mailto:austinmunene@gmail.com"
            className="inline-flex items-center gap-2 text-[#00D1FF] hover:text-[#FF00D6] transition-colors reveal"
          >
            austinmunene@gmail.com
          </motion.a>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
