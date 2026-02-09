import React, { useEffect } from 'react';
import { TestTube2, Bug, Code2, Briefcase, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Career = () => {
  const careerHistory = [
    {
      title: 'Lead QA Engineer',
      company: 'Nathan Digital, Nairobi',
      period: 'Sept 2025 - Present',
      description:
        'Oversee the end-to-end QA lifecycle, combining hands-on testing with strategic leadership to deliver high-quality, reliable releases.',
      responsibilities: [
        'Lead planning, design, and execution of manual and automated test suites',
        'Design, implement, and maintain Cypress and Playwright frameworks',
        'Collaborate with developers, product managers, and designers to resolve defects early',
        'Enforce QA standards, best practices, and testing processes across teams',
        'Mentor QA engineers on automation strategy, test design, and defect reporting',
        'Conduct API, usability, performance, and cross-browser testing',
        'Maintain QA documentation: plans, cases, execution reports, and defect logs',
        'Drive AI-assisted testing initiatives to improve efficiency and scalability',
        'Champion continuous improvement to expand coverage and release confidence',
      ],
      skills: [
        'Cypress',
        'Playwright',
        'QA Leadership',
        'Automation Frameworks',
        'API Testing',
        'Performance Testing',
        'Cross-browser Testing',
        'UAT Coordination',
      ],
    },
    {
      title: 'Quality Assurance Analyst',
      company: 'Nathan Digital, Nairobi',
      period: 'Oct 2024 - Aug 2025',
      description:
        'Supported end-to-end QA through hands-on testing and close collaboration to deliver stable, user-focused software releases.',
      responsibilities: [
        'Executed manual and automated test cases across web and system applications',
        'Implemented Cypress-based automation for core product flows',
        'Developed test plans, test cases, and execution reports',
        'Performed API testing and backend validation for data accuracy',
        'Worked with developers to identify, document, and resolve defects',
        'Supported regression testing and release validation cycles',
        'Performed cross-browser, usability, and exploratory testing',
        'Maintained defect logs and supported root cause analysis',
      ],
      skills: [
        'Cypress',
        'API Testing',
        'Regression Testing',
        'Test Planning',
        'Defect Management',
        'Exploratory Testing',
        'Cross-browser Testing',
        'Jira',
      ],
    },
    {
      title: 'QA Engineer & Technical Support Specialist',
      company: 'Optiven Limited, Nairobi',
      period: 'Jan 2023 - Sept 2024',
      description:
        'Led QA across ERP and enterprise systems, validating workflows, data accuracy, and integrations before and during production rollout.',
      responsibilities: [
        'Led end-to-end testing of ERP modules across finance, sales, and operations',
        'Performed manual and automated E2E testing for workflows and integrations',
        'Conducted API testing with Postman to validate endpoints and responses',
        'Managed UAT cycles with internal users and stakeholders',
        'Logged and tracked defects in Jira and verified fixes via regression',
        'Executed regression testing after deployments to ensure system stability',
        'Tested staging and production environments for high-risk bugs and gaps',
        'Validated database records and system outputs during QA',
        'Provided technical support and acted as QA liaison for business users',
      ],
      skills: [
        'ERP Testing',
        'Postman',
        'UAT Management',
        'Regression Testing',
        'Defect Tracking',
        'Database Validation',
        'Systems Support',
        'Jira',
      ],
    },
    {
      title: 'Quality Assurance Analyst',
      company: 'Bingwa, Nairobi',
      period: 'Mar 2022 - Dec 2022',
      description:
        'Ensured product quality across web and mobile applications through structured testing, defect management, and collaboration.',
      responsibilities: [
        'Executed manual test cases for core platform features',
        'Supported regression testing to ensure stability after updates',
        'Collaborated with developers to resolve defects across the lifecycle',
        'Maintained QA documentation: test plans, cases, reports, and defect logs',
        'Ensured adherence to QA processes and SDLC best practices',
        'Conducted exploratory and usability testing to improve UX',
        'Joined requirement reviews to clarify testing expectations',
      ],
      skills: [
        'Manual Testing',
        'Regression Testing',
        'Defect Management',
        'QA Documentation',
        'Usability Testing',
        'Web & Mobile Testing',
      ],
    },
    {
      title: 'IT & Systems QA Consultant',
      company: 'Savy ICT Solutions, Nairobi',
      period: 'Feb 2020 - Feb 2022',
      description:
        'Led QA for client systems across web and mobile applications to deliver stable, production-ready releases.',
      responsibilities: [
        'Led functional, integration, and end-to-end testing across client systems',
        'Designed manual and automation strategies for critical user journeys',
        'Performed API and backend validation for secure, accurate integrations',
        'Conducted cross-browser, cross-device, and mobile testing',
        'Built Cypress automation scripts for recurring workflows',
        'Identified high-risk defects early to prevent production failures',
        'Collaborated with developers to debug issues and validate fixes',
        'Provided QA-driven recommendations to improve usability and performance',
        'Acted as quality gate before deployment and go-live',
      ],
      skills: [
        'Cypress',
        'API Validation',
        'Integration Testing',
        'Mobile Testing',
        'Cross-browser Testing',
        'Defect Prevention',
        'QA Strategy',
        'Client Consulting',
      ],
    },
    {
      title: 'Coding & Robotics Tutor',
      company: 'Appframe Code Academy, Nairobi',
      period: 'May 2018 - Dec 2019',
      description:
        'Delivered structured training in coding and robotics with a strong focus on practical projects and testing discipline.',
      responsibilities: [
        'Taught Scratch, robotics fundamentals, and intro mobile app development',
        'Designed hands-on sessions covering planning, development, testing, and debugging',
        'Introduced functional testing and debugging techniques',
        'Mentored students in logical thinking, system design, and troubleshooting',
        'Guided learners to build web and mobile apps with structured testing',
        'Taught automation concepts through robotics exercises',
        'Emphasized clean code practices and continuous improvement',
      ],
      skills: [
        'STEM Education',
        'Robotics',
        'Testing Fundamentals',
        'Mentoring',
        'Problem Solving',
        'Mobile App Basics',
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
