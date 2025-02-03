import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Home = () => {
  const projects = [
    {
      title: 'faced by cynie',
      description:
        'Faced by Cynie is a vibrant online portfolio showcasing Her artistic journey through captivating visuals and creative expression. Built using Vue.js and TypeScript, along with HTML, CSS, and JavaScript, the site features a seamless blend of photography, graphic design, and personal projects.',
      images: [
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.05.39.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjA1LjM5LnBuZyIsImlhdCI6MTczODM0NzkxMiwiZXhwIjo0ODkxOTQ3OTEyfQ.5msgI3mM10Bxt8VLmaOcOZv7XwC-PrlMIoUCg9Q4vDg',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.05.54.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjA1LjU0LnBuZyIsImlhdCI6MTczODM0Nzg3NiwiZXhwIjo0ODkxOTQ3ODc2fQ.lhKPRwEHdD1D8XrURhQOdRk6P3-nN9BWUD62H_4raZQ',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.06.12.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjA2LjEyLnBuZyIsImlhdCI6MTczODM0Nzg0OCwiZXhwIjo0ODkxOTQ3ODQ4fQ.GZX5Gs7e2PeUwKX3nJCLqX9DtYdAxXRuZYq8ZtCm-gY',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.06.41.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjA2LjQxLnBuZyIsImlhdCI6MTczODM0NzgyNSwiZXhwIjo0ODkxOTQ3ODI1fQ.n4AdpnRPa2Vml_t0uWXoZqqBD8KtoQ6RsoJjUOhP0ug',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.07.05.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjA3LjA1LnBuZyIsImlhdCI6MTczODM0NzczMywiZXhwIjo0ODkxOTQ3NzMzfQ.vJg2FVhzmRdVAZco3AUcJawkXzaRE68T7lnofXKH-YA',
      ],
      link: 'https://facedbycynie.netlify.app/',
      tech: 'React • CSS •JavaScript • Node.js',
    },
    {
      title: 'MKU Hostel Management System',
      description:
        'Welcome to MKU HMS—your all-in-one hostel management solution designed to simplify the life of hostel administrators and residents alike. This platform streamlines the entire hostel experience, from room allocations to payments, enhancing communication and convenience for everyone involved.',
      images: [
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.07.58.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjA3LjU4LnBuZyIsImlhdCI6MTczODM0NzY4NSwiZXhwIjo0ODkxOTQ3Njg1fQ._5StNfwUAc4UXzgosPTg5hV0LB1HMEVUcuWglPSfXUw',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.08.15.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjA4LjE1LnBuZyIsImlhdCI6MTczODM0NzY2MSwiZXhwIjo0ODkxOTQ3NjYxfQ.jzaJwoDAYhHbG93hWs01Sjq_ekqjdvIWSgYUODN6Jvw',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.08.48.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjA4LjQ4LnBuZyIsImlhdCI6MTczODM0NzYzMSwiZXhwIjo0ODkxOTQ3NjMxfQ.1sWg98VkKhEedldJQGcbo_qJYaqQv6QQ4TeJt7jslsk',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.10.50.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjEwLjUwLnBuZyIsImlhdCI6MTczODM0NzYwNCwiZXhwIjo0ODkxOTQ3NjA0fQ.dSI0F5vTEKFX6uivx8CgetbdtU64gh004RlKc6yfzOk',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2021.11.03.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIxLjExLjAzLnBuZyIsImlhdCI6MTczODM0NzU1NiwiZXhwIjo0ODkxOTQ3NTU2fQ.HxxiAt9EClTXKw2O5eYiT9khTwmOPuVROKGiThFAKyw',
      ],
      link: 'https://mkuhms.netlify.app/',
      tech: 'Bootstrap • React.js • CSS • Node.js • Express.js • MongoDB',
    },
    {
      title: 'Portfolio',
      description:
        'Explore the innovative world of Austin Munene! This portfolio not only demonstrates a passion for design and development but also serves as a testament to creativity and professionalism. If you are looking for a stunning, personalized website to showcase your work, get in touch! Let us bring your vision to life!',
      images: [
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-30%20at%2015.53.37.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMwIGF0IDE1LjUzLjM3LnBuZyIsImlhdCI6MTczODI0MTY3MiwiZXhwIjoyMDUzNjAxNjcyfQ.vxv_rVaJQ3qUlcpJ5Jc00_7l-gIHl1XwqbmYWfcEUKU',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2020.58.40.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIwLjU4LjQwLnBuZyIsImlhdCI6MTczODM0NjM2NywiZXhwIjo0ODkxOTQ2MzY3fQ.ceBZP29CG3OJVztm2Nd8zOvKpYSpPdMO24Geae-Rb1U',
        'https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Screenshot%202025-01-31%20at%2020.58.19.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvU2NyZWVuc2hvdCAyMDI1LTAxLTMxIGF0IDIwLjU4LjE5LnBuZyIsImlhdCI6MTczODM0NjM5MiwiZXhwIjo0ODkxOTQ2MzkyfQ.obPSOuoTbtc4W-18k33psig3sXDHzQvVHqjAzIrvUro',
      ],
      link: 'https://austinmunene.netlify.app/',
      tech: 'Bootstrap • React.js • CSS',
    },
  ];

  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    projects.map(() => 0)
  );

  useEffect(() => {
    // Auto-rotate images
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map(
          (index, projectIndex) =>
            (index + 1) % projects[projectIndex].images.length
        )
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [projects]);

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

  const handlePrevImage = (projectIndex: number) => {
    setCurrentImageIndexes((prevIndexes) =>
      prevIndexes.map((index, idx) =>
        idx === projectIndex
          ? (index - 1 + projects[projectIndex].images.length) %
            projects[projectIndex].images.length
          : index
      )
    );
  };

  const handleNextImage = (projectIndex: number) => {
    setCurrentImageIndexes((prevIndexes) =>
      prevIndexes.map((index, idx) =>
        idx === projectIndex
          ? (index + 1) % projects[projectIndex].images.length
          : index
      )
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-20 relative">
        <div className="max-w-3xl">
          <div className="reveal">
            <h1 className="text-5xl md:text-8xl font-bold mb-6 md:mb-8 gradient-text slide-in">
              Austin Munene
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-400 mb-4 fade-up"></h2>
          </div>
          <div className="reveal">
            <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 fade-up">
              Motivated and adaptable Frontend Web ProDev and Software Test
              Engineer with a Bachelor of Science in Information Technology. I
              possess a strong foundation in technical and interpersonal skills,
              with proficiency in programming languages such as JavaScript and
              React. My expertise spans software engineering, software analysis,
              technical software support and Web Development.
            </p>
            <Link
              to="/career"
              className="inline-flex items-center px-5 md:px-6 py-3 bg-gradient-to-r from-[#00D1FF] to-[#FF00D6] rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              View My Career Journey
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 floating">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 reveal gradient-text">
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-12 md:gap-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="reveal project-card bg-gray-900/30 rounded-xl p-4 md:p-6"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  <div className="md:w-1/2">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <p className="text-gray-400 mb-4 text-base md:text-lg">
                      {project.description}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {project.tech}
                    </p>
                  </div>

                  <div className="md:w-1/2">
                    <div className="relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                      <img
                        src={project.images[currentImageIndexes[index]]}
                        alt={`${project.title} - Image ${
                          currentImageIndexes[index] + 1
                        }`}
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4 z-20">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrevImage(index);
                          }}
                          className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-white/80">
                          {currentImageIndexes[index] + 1} /{' '}
                          {project.images.length}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleNextImage(index);
                          }}
                          className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 gradient-text">
            Let's Work Together
          </h2>
          <p className="text-gray-400 mb-8 md:mb-12 text-base md:text-lg">
            I'm currently available for freelance work and interesting projects.
            If you have a project that needs clean code and modern design, let's
            have a conversation.
          </p>
          <a
            href="mailto:austinmunene56@icloud.com"
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#00D1FF] to-[#FF00D6] rounded-full text-white font-medium hover:opacity-90 transition-opacity"
          >
            Get in Touch
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
