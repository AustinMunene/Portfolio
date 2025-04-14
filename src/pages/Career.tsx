import React, { useEffect } from 'react';
import { TestTube2, Bug, Code2, Briefcase, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Career = () => {
  const careerHistory = [
    {
      title: 'Quality Assurance Analyst',
      company: 'Nathan Digital',
      period: '2024 October - Present',
      description:
        "In my role as a QA Analyst, I am responsible for ensuring the functionality, reliability, and user experience of Nathan Digital's products.",
      responsibilities: [
        'Developing and executing manual and automated test cases to verify software functionality and identify potential issues',
        'Design and execute test cases for complex web applications',
        'Perform thorough regression testing and smoke testing',
        'Collaborate with development teams to ensure quality throughout the SDLC',
        'Supporting continuous improvement by identifying process enhancements and recommending best practices for quality assurance',
        'Documenting test results, tracking bugs, and providing detailed feedback to enhance software performance.',
      ],
      skills: [
        'Cypress',
        'JMeter',
        'JIRA',
        'Git',
        'Postman',
        'API Testing',
        'PostgreSQL',
      ],
    },
    {
      title: 'IT Consultant',
      company: 'Savy ICT Solutions',
      period: '2021 - Present',
      description:
        "At Savy ICT Solutions, I'm the friendly neighborhood tech consultant who helps clients build IT structures as solid as their coffee. Specializing in IT Architecture, Strategy, Software Development, and Solution Delivery, I partner with clients to turn tech headaches into smooth operations—because every challenge is just an opportunity in disguise!",
      responsibilities: [
        'Consultation Extraordinaire: Engage with clients to understand their tech needs and provide tailored IT advice.',
        'Problem-Solving Ninja: Tackle tech challenges head-on, providing pragmatic solutions to keep clients moving forward.',
        'Product Source Guru: Help clients navigate the gadget galaxy, recommending the best phones and tech products for their needs and budget.',
        'Software and Website Creator: Develop custom software and websites that elevate client engagement and streamline operations.',
      ],
      skills: [
        'Software Development',
        'Product sourcing',
        'Problem solving',
        'Consultation',
        'Solutions Architect',
      ],
    },
    {
      title: 'Technical Analyst & Software Support Specialist',
      company: 'Optiven Limited',
      period: '2024 August - 2024 October',
      description: ' Business Analysis & Technical Documentation',
      responsibilities: [
        'Created detailed bug reports and tracked issues in JIRA',
        'Created and maintained comprehensive documentation for codebases, APIs, and technical processes',
        'Conducted requirements gathering on the business analysis side, prepared user stories, and ensured alignment with business needs',
        'Documented and ran tests on company applications to support development, troubleshooting, and continuous improvement',
        'Facilitated knowledge sharing among team members and stakeholders to enhance collaboration and project success',
        'ERP System Development: Actively contributed to the development of an ERP system, focusing on business analysis and requirements gathering',
        'Collaborated with cross-functional teams to define system functionality, document business needs, and translate them into detailed technical specifications',
        'Technical Support: Provided comprehensive ICT support to ensure the seamless operation of all IT systems and infrastructure',
        'User Training and Support: Conducted training sessions for staff on new software applications and systems',
      ],
      skills: [
        'Software Development',
        'API Documentation',
        'Bug Tracking',
        'Technical analysis',
        'Software Documentation',
      ],
    },
    {
      title: 'QA Analyst',
      company: 'Bingwa Partner',
      period: 'Jan 2020 - 2022',
      description: 'Quality Assurance',
      responsibilities: [
        'Ensured the product met established quality standards and industry benchmarks',
        'Ensured QA standards, processes and procedures were followed',
        'Assisted in developing automated test scripts',
        'Provided oversight on test plans, test cases/scripts, and reports.',
        'Conducted functional and UI testing',
      ],
      skills: [
        'Manual Testing',
        'Test Planning',
        'Bug Tracking',
        'Agile Methodologies',
        'Basic Automation',
      ],
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black"
    >
      <div className="container mx-auto px-4 pt-20 md:pt-24 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6 gradient-text reveal"
            >
              Career Journey
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 reveal"
            >
              A timeline of my professional growth and achievements in the Tech Industry
            </motion.p>
          </motion.div>

          <div className="space-y-16 md:space-y-20">
            {careerHistory.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="reveal"
              >
                <motion.div
                  whileHover={{ scale: 1.02, rotateX: 5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/30 rounded-xl p-6 md:p-8 relative overflow-hidden group perspective backdrop-blur-sm border border-gray-700/50 hover:border-[#00D1FF]/50"
                >
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00D1FF]/10 to-[#FF00D6]/10 blur-3xl group-hover:scale-150 transition-transform duration-700"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 45, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                      <div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 mb-2"
                        >
                          <Briefcase className="w-6 h-6 text-[#00D1FF]" />
                          <h3 className="text-2xl md:text-3xl font-bold gradient-text">
                            {role.title}
                          </h3>
                        </motion.div>
                        <div className="flex items-center gap-3 text-lg md:text-xl text-gray-400 mb-2">
                          <Award className="w-5 h-5 text-[#FF00D6]" />
                          <span>{role.company}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{role.period}</span>
                        </div>
                      </div>
                      {index === 0 && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex gap-2 mt-4 md:mt-0"
                        >
                          <span className="px-3 py-1 bg-gradient-to-r from-[#00D1FF]/10 to-[#FF00D6]/10 rounded-full text-[#00D1FF] text-sm border border-[#00D1FF]/20">
                            Current Role
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <p className="text-base md:text-lg text-gray-300 mb-6">
                      {role.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-base md:text-lg font-semibold mb-4 flex items-center">
                        <TestTube2 className="w-5 h-5 mr-2 text-[#00D1FF]" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {role.responsibilities.map((resp, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start group"
                          >
                            <Bug className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[#FF00D6] group-hover:scale-110 transition-transform" />
                            <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{resp}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-base md:text-lg font-semibold mb-4 flex items-center">
                        <Code2 className="w-5 h-5 mr-2 text-[#00D1FF]" />
                        Skills & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 hover:bg-gray-600/50 transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Career;
