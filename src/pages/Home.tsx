import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const Home = () => {
  const projects = [
    {
      title: 'Jubilee Knowledge Library',
      description:
        'Built an internal library system to manage inventory, requests, and access control. I focused on frontend structure and QA coverage for critical staff and member workflows.',
      link: 'https://jubileelibrary.netlify.app/login',
      github: 'https://github.com/AustinMunene/Jubilee-knowledge-library',
      caseStudy: '#',
      roles: ['Frontend Architecture', 'QA Strategy'],
      stack: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Faced by cynie',
      description:
        'Designed a visual portfolio that helps visitors explore creative work quickly and clearly. I handled UI structure, motion, and quality checks to keep the experience smooth.',
      link: 'https://facedbycynie.netlify.app',
      github: 'https://github.com/Austin254/facedbycynie',
      caseStudy: '#',
      roles: ['UI Engineering', 'Interaction Design'],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Shades of Cake',
      description:
        'Delivered a bakery site that makes browsing products and placing inquiries straightforward. I built responsive layouts and validated the contact flow end to end.',
      link: 'https://shadesofcake.org/',
      github: 'https://github.com/AustinMunene/shadesofcake.git',
      caseStudy: '#',
      roles: ['Frontend Delivery', 'QA Checks'],
      stack: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Akili Sawa',
      description:
        'Created a mental-health platform to connect users with support resources across Kenya. I built reliable frontend flows and validated critical journeys with QA strategy.',
      link: 'https://akilisawa.com/',
      github: 'https://github.com/AustinMunene/Akilisawa',
      caseStudy: '#',
      roles: ['Frontend Architecture', 'System Reliability'],
      stack: [
        'React',
        'React Router',
        'Backbone.js',
        'Marionette.js',
        'Framer Motion',
      ],
    },
    {
      title: 'MKU Hostel Management System',
      description:
        'Developed a hostel management system for allocations, registration, and admin oversight. I focused on role-based flows and test coverage for key operations.',
      link: 'https://mkuhms.netlify.app/',
      github: 'https://github.com/Austin254/MKU-HMS-FINAL',
      caseStudy: '#',
      roles: ['Product Thinking', 'QA Strategy'],
      stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    },
    {
      title: 'Digital Resume',
      description:
        'Personal portfolio built for clarity, speed, and maintainability. I structured reusable components and validated cross-device reliability.',
      link: 'https://austinmunene.netlify.app/',
      github: 'https://github.com/Austin254/Portfolio',
      caseStudy: '#',
      roles: ['Component Design', 'Performance'],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
  ];

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

  const name = 'Austin Munene';

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
              animate={{
                scale: 1,
                opacity: 1,
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              whileHover={{
                textShadow: [
                  '0 0 0 rgba(0, 209, 255, 0)',
                  '0 0 26px rgba(0, 209, 255, 0.45)',
                  '0 0 0 rgba(0, 209, 255, 0)',
                ],
              }}
              transition={{
                backgroundPosition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                textShadow: {
                  duration: 1.6,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                },
              }}
              className="text-5xl md:text-7xl font-bold mb-6 gradient-text reveal cursor-default"
              style={{ backgroundSize: '200% 200%' }}
            >
              {name.split('').map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="inline-block transition-transform duration-200 ease-out hover:scale-110"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 reveal"
            >
              Frontend + QA Engineer delivering reliable, production-ready user
              experiences
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 reveal"
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-gradient-to-r from-[#00D1FF] to-[#FF00D6] text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:muneneaustin56@gmail.com"
                className="px-8 py-3 border border-gray-700 text-gray-300 rounded-full font-medium hover:border-[#00D1FF] hover:text-[#00D1FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                Get in Touch
              </a>
            </motion.div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500/80 reveal">
              <span>Production QA</span>
              <span className="text-gray-600">•</span>
              <span>React + TypeScript</span>
              <span className="text-gray-600">•</span>
              <span>Automation Mindset</span>
              <span className="text-gray-600">•</span>
              <span>System Reliability</span>
            </div>
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
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-gray-400 text-center max-w-3xl mx-auto mb-10 md:mb-12 reveal"
          >
            Selected work focused on reliable delivery, clear UX, and quality
            practices that scale with real-world use.
          </motion.p>

          <div className="space-y-6 md:space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group reveal"
              >
                <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 hover:border-[#00D1FF]/60 transition-all transform-gpu [transform-style:preserve-3d] hover:shadow-[0_20px_46px_-30px_rgba(0,209,255,0.5)] hover:[transform:perspective(1200px)_rotateX(1deg)_rotateY(-1deg)_translateY(-3px)]">
                  <div className="p-6 md:p-8 flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#00D1FF] to-[#FF00D6]"></span>
                        <h3 className="text-xl md:text-2xl font-bold gradient-text">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00D1FF] transition-colors group-hover:text-[#00D1FF]"
                          >
                            <Github className="w-5 h-5" />
                            <span>Code</span>
                          </a>
                        )}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#00D1FF] hover:text-[#FF00D6] transition-colors group-hover:translate-x-0.5"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>Visit</span>
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-400">{project.description}</p>
                    {project.roles && (
                      <div className="flex flex-wrap gap-2">
                        {project.roles.map((role, roleIndex) => (
                          <span
                            key={roleIndex}
                            className="px-3 py-1 rounded-full text-xs text-gray-300/80 border border-gray-700/60 bg-gray-800/40"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div>
                      <a
                        href={project.caseStudy}
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00D1FF] transition-colors group-hover:text-[#00D1FF]"
                      >
                        Case Study →
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
            muneneaustin56@gmail.com
          </motion.a>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
