import React, { useEffect } from 'react';
import { TestTube2, Bug, Code2 } from 'lucide-react';

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
        'Selenium',
        'Cypress',
        'TestNG',
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
    <div className="pt-20 md:pt-24 pb-16 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 gradient-text reveal">
            Career Journey
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 md:mb-16 reveal">
            A timeline of my professional growth and achievements in the Tech
            Industry
          </p>

          <div className="space-y-16 md:space-y-20">
            {careerHistory.map((role, index) => (
              <div key={index} className="reveal">
                <div className="bg-gray-900/30 rounded-xl p-6 md:p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00D1FF]/10 to-[#FF00D6]/10 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                          {role.title}
                        </h3>
                        <p className="text-lg md:text-xl text-gray-400">
                          {role.company}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {role.period}
                        </p>
                      </div>
                      {index === 0 && (
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <span className="px-3 py-1 bg-gradient-to-r from-[#00D1FF]/10 to-[#FF00D6]/10 rounded-full text-[#00D1FF] text-sm border border-[#00D1FF]/20">
                            Current Role
                          </span>
                        </div>
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
                          <li key={idx} className="flex items-start">
                            <Bug className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-[#FF00D6]" />
                            <span className="text-gray-400">{resp}</span>
                          </li>
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
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
