import React, { useEffect } from 'react';
import { TestTube2, Bug, Code2, Briefcase, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Career = () => {
  const careerHistory = [
    {
      title: 'Lead QA Engineer',
      company: 'Nathan Digital, Nairobi',
      period: 'Sep 2025 - Present',
      description:
        'Lead end-to-end quality assurance across web and system applications, combining hands-on testing with strategy, mentorship, and scalable automation.',
      responsibilities: [
        'Lead planning, design, and execution of manual and automated test suites',
        'Design, implement, and maintain Cypress and Playwright automation frameworks',
        'Partner with product, design, and engineering to identify defects early',
        'Enforce QA standards, best practices, and release readiness checks',
        'Mentor QA engineers on test design, automation strategy, and defect reporting',
        'Conduct API, usability, performance, and cross-browser validation',
        'Maintain test plans, cases, execution reports, and defect logs',
        'Drive AI-assisted testing for smarter test generation and failure analysis',
      ],
      skills: [
        'Cypress',
        'Playwright',
        'QA Strategy',
        'Automation Frameworks',
        'API Testing',
        'Performance Testing',
        'Cross-browser Testing',
        'Mentorship',
      ],
    },
    {
      title: 'Quality Assurance Analyst',
      company: 'Nathan Digital, Nairobi',
      period: 'Oct 2024 - Aug 2025',
      description:
        'Supported end-to-end QA through manual and automated testing, partnering with cross-functional teams to deliver stable, user-focused releases.',
      responsibilities: [
        'Executed manual and automated test cases for functional and non-functional coverage',
        'Built and expanded the initial Cypress automation suite for core product flows',
        'Produced test plans, test cases, and execution reports',
        'Performed API testing and backend validation to ensure data integrity',
        'Collaborated with developers to log, triage, and resolve defects',
        'Supported regression cycles and release validation',
        'Performed cross-browser, usability, and exploratory testing',
        'Maintained defect logs and supported root cause analysis',
      ],
      skills: [
        'Cypress',
        'API Testing',
        'Regression Testing',
        'Test Planning',
        'Defect Management',
        'Cross-browser Testing',
        'Exploratory Testing',
        'JIRA',
      ],
    },
    {
      title: 'Technical Analyst & Software Support Specialist',
      company: 'Optiven Limited, Nairobi',
      period: 'Sep 2024 - Oct 2024',
      description:
        'Bridged business, systems, and QA by translating requirements into technical solutions and validating enterprise application behavior.',
      responsibilities: [
        'Conducted requirements elicitation and stakeholder interviews',
        'Translated business needs into functional and technical specifications',
        'Created system documentation, user stories, and API references',
        'Defined acceptance criteria with product, engineering, and QA teams',
        'Supported ERP requirements, functional testing, and verification',
        'Coordinated UAT execution and issue resolution',
        'Provided technical support and root cause analysis for system issues',
        'Delivered user training to improve adoption and efficiency',
      ],
      skills: [
        'Business Analysis',
        'Requirements Gathering',
        'ERP Validation',
        'UAT Coordination',
        'Technical Documentation',
        'API Documentation',
        'Systems Support',
        'Stakeholder Management',
      ],
    },
    {
      title: 'Quality Assurance Analyst',
      company: 'Bingwa, Nairobi',
      period: 'Mar 2022 - Dec 2023',
      description:
        'Delivered structured QA across web and mobile experiences through test execution, defect management, and release support.',
      responsibilities: [
        'Executed manual test cases for core platform features',
        'Supported regression testing for stable releases',
        'Logged and tracked defects with developers throughout the SDLC',
        'Prepared QA documentation including test plans, cases, and reports',
        'Ensured adherence to QA processes and standards',
        'Performed exploratory and usability testing to improve UX',
        'Joined requirement reviews to clarify testing expectations',
      ],
      skills: [
        'Manual Testing',
        'Regression Testing',
        'Defect Tracking',
        'QA Documentation',
        'Usability Testing',
        'Web & Mobile Testing',
      ],
    },
    {
      title: 'Tech Blogger',
      company: 'Sahihi Interior Builders, Nairobi',
      period: 'Mar 2021 - Dec 2023',
      description:
        'Produced tech and design-focused content to support brand visibility and customer education.',
      responsibilities: [
        'Created engaging blog content on home ownership and interior design',
        'Supported marketing campaigns with informative, educational articles',
      ],
      skills: ['Content Writing', 'Technical Writing', 'Brand Storytelling'],
    },
    {
      title: 'IT Consultant',
      company: 'Savy ICT Solutions, Nairobi',
      period: 'Feb 2021 - Present',
      description:
        'Advises clients on IT strategy and delivers tailored software, web, and support solutions.',
      responsibilities: [
        'Assessed client needs and recommended IT architecture and strategy',
        'Delivered custom software and website solutions',
        'Provided ongoing technical support and troubleshooting',
        'Advised on hardware and technology procurement',
      ],
      skills: [
        'IT Strategy',
        'Solution Architecture',
        'Software Development',
        'Client Consulting',
        'Tech Procurement',
        'Technical Support',
      ],
    },
    {
      title: 'Coding & Robotics Tutor',
      company: 'Appframe Code Academy, Nairobi',
      period: 'May 2018 - Dec 2020',
      description:
        'Taught foundational coding and robotics, guiding students through hands-on projects.',
      responsibilities: [
        'Delivered lessons on core coding and robotics concepts',
        'Guided students through projects, debugging, and code maintenance',
        'Encouraged problem-solving and design thinking through practice',
      ],
      skills: ['STEM Education', 'Robotics', 'Mentoring', 'Problem Solving'],
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
