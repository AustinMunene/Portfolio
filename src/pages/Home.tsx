import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { careerHistory } from './Career';
import { blogPosts } from './Blog';
import HeroSplit from '../components/sections/HeroSplit';
import FeaturedBento from '../components/sections/FeaturedBento';
import type { BentoProject } from '../components/sections/FeaturedBento';
import CareerPreview from '../components/sections/CareerPreview';
import BlogPreview from '../components/sections/BlogPreview';
import Section from '../components/Section';
import Services from '../components/sections/Services';
import ContactForm from '../components/ContactForm';

const rawProjects: Array<{
  title: string;
  description: string;
  link: string;
  github?: string;
  roles?: string[];
  stack: string[];
}> = [
    {
      title: 'HerCartExpress Essentials',
      description:
        'Built a custom Shopify storefront for a beauty and lifestyle retailer - bespoke theme development covering the full shopping journey from category collections and gift sets to predictive search, product pages, customer reviews, and newsletter capture, with a light and dark mode toggle and a fully configured checkout handling live payments.',
      link: 'https://hercartexpressessentials.com',
      roles: ['Full-stack Delivery', 'E-commerce Build'],
      stack: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'Shopify Payments'],
    },
    {
      title: 'Girlie Conversations',
      description:
        'Designed and built the official site for a women-led community brand - editorial storytelling, event calendar, testimonials, newsletter signup, and partner sections that match the brand’s warm, intentional tone.',
      link: 'https://girlieconversations.com',
      github: 'https://github.com/AustinMunene',
      roles: ['Functional Frontend Architecture', 'ModernUI Craft'],
      stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'BoxLap',
      description:
        'Built a full-stack F1 analytics platform from scratch - real telemetry data, qualifying mini sectors, race pace storytelling, and driver comparisons across every season from 2023 to present. Powered by OpenF1 and Ergast APIs with a Gemini AI layer that turns raw lap times into fan-friendly narratives. F1 data, finally explained.',
      link: 'https://boxlap.vercel.app',
      github: 'https://github.com/AustinMunene/BoxLap',
      roles: ['Full-stack', 'Product Thinking'],
      stack: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    },
    {
      title: 'Cradle HR',
      description:
        'Built a modern HR platform for African businesses - employee profiles, attendance and leave, document storage, performance reviews, recruitment workflows, and compliance tooling behind secure auth.',
      link: 'https://cradle.app.maunode.com',
      github: 'https://github.com/AustinMunene',
      roles: ['Full-stack Delivery', 'Product Thinking'],
      stack: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Pinia', 'Cloudflare'],
    },
    {
      title: 'Akili Sawa',
      description:
        'Redesigned and developed the official corporate website to deliver a modern, professional presence that clearly communicates mental wellness services and improves usability.',
      link: 'https://www.akilisawa.com/',
      github: 'https://github.com/AustinMunene/Akilisawa',
      roles: ['Frontend Architecture', 'UX Improvement'],
      stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Hostel Management System',
      description:
        'Full-stack hostel booking and allocation platform for students and administrators, with room discovery, booking requests, approvals, and occupancy tracking.',
      link: 'https://bookingsmku.netlify.app/',
      github: 'https://github.com/Austin254/MKU-HMS-FINAL',
      roles: ['Full-stack Delivery', 'Product Thinking'],
      stack: ['React', 'Next.js', 'Supabase', 'Tailwind CSS'],
    },
    {
      title: 'Shades of Cake',
      description:
        'Modern, responsive business website for a cake and events brand to showcase products, strengthen digital presence, and improve client inquiries across devices.',
      link: 'https://shadesofcake.org/',
      github: 'https://github.com/AustinMunene/shadesofcake.git',
      roles: ['Frontend Delivery', 'UI Craft'],
      stack: ['JavaScript', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons', 'Netlify'],
    },
    {
      title: 'Faced by Cynie',
      description:
        'Portfolio experience designed to present creative work with clear navigation, smooth interactions, and a polished visual layout.',
      link: 'https://facedbycynie.netlify.app',
      github: 'https://github.com/Austin254/facedbycynie',
      roles: ['UI Engineering', 'Interaction Design'],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Digital Resume',
      description:
        'Personal resume site focused on clarity, performance, and responsive presentation across devices.',
      link: 'https://austinmunene.netlify.app/',
      github: 'https://github.com/Austin254/Portfolio',
      roles: ['Component Design', 'Performance'],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Knowledge Library',
      description:
        'Designing and developing a full-stack knowledge library system to track books, borrowing, approvals, and user activity through a secure web platform for internal teams.',
      link: 'https://jubileelibrary.netlify.app/login',
      github: 'https://github.com/AustinMunene/Jubilee-knowledge-library',
      roles: ['System Design', 'QA Strategy'],
      stack: ['JavaScript', 'Supabase', 'Tailwind CSS', 'Netlify', 'MobX'],
    },
  ];

function projectCategory(roles: string[] = []): BentoProject['category'] {
  const r = roles.join(' ').toLowerCase();
  if (r.includes('full-stack') || r.includes('system design')) return 'Full-stack';
  if (r.includes('qa') || r.includes('quality')) return 'QA';
  return 'Frontend';
}

const projects: BentoProject[] = rawProjects.map((p) => ({
  ...p,
  category: projectCategory(p.roles),
}));

const featuredProject = {
  title: projects[0].title,
  description: projects[0].description,
  stack: projects[0].stack,
  link: projects[0].link,
};

const careerPreviewItems = careerHistory.slice(0, 4).map(({ title, company, period }) => ({
  title,
  company,
  period,
}));

const Home = () => {

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
      <HeroSplit featuredProject={featuredProject} />

      <Services />

      <FeaturedBento projects={projects} />

      <CareerPreview items={careerPreviewItems} />

      <BlogPreview posts={blogPosts} />

      {/* Contact. No hardcoded greys or white/x borders below - everything reads
          through the theme tokens, so the same markup works in either theme. */}
      <Section
        id="contact"
        variant="alt"
        className="section-glow py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-brand text-sm font-medium tracking-wider uppercase mb-4 block">
              Contact
            </span>
            <h2 className="text-4xl md:text-6xl font-display mb-6 text-fg">
              Got a project?
            </h2>
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-fg-muted mb-10 max-w-lg mx-auto"
          >
            Tell me what you are building and where it is breaking. I will tell you
            how I would approach it.
          </motion.p>
          {/* The card settles into place as the section arrives rather than
              floating over the page. The site already pins two things to the
              viewport - the nav island and ScrollToTop - and a third would crowd
              the content on a phone without adding a way to reach anyone. */}
          <motion.div
            initial={{ y: 28, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <ContactForm />
          </motion.div>

          {/* The form is the primary path, but the address stays readable: plenty
              of people want to paste it somewhere or forward it on rather than
              type into a page. */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10 text-sm"
          >
            <span className="text-fg-subtle">Or reach me directly</span>
            <a
              href="mailto:saviusmunene@gmail.com"
              className="text-fg-muted hover:text-fg transition-colors underline underline-offset-4 decoration-brand-line"
            >
              saviusmunene@gmail.com
            </a>
            <a
              href="tel:+254743988415"
              className="text-fg-muted hover:text-fg transition-colors underline underline-offset-4 decoration-brand-line"
            >
              +254 743 988 415
            </a>
          </motion.div>
        </div>
      </Section>
    </motion.div>
  );
};

export default Home;
