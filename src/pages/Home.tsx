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

      <FeaturedBento projects={projects} />

      <CareerPreview items={careerPreviewItems} />

      <BlogPreview posts={blogPosts} />

      {/* Contact - the first section converted to the light tone, as the
          proof-of-concept for the business/craft tonal split. Note there is not a
          single hardcoded grey or white/x border below: everything reads through
          the tone tokens, so this same markup would work in a dark section by
          flipping one prop. */}
      <Section tone="light" id="contact" className="py-24 md:py-32 overflow-hidden">
        {/* Warm ground, sitting on the light surface rather than fighting it. */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(50% 60% at 50% 0%, rgba(212, 212, 216, 0.10), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          aria-hidden
          style={{
            backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-accent-600 text-sm font-medium tracking-wider uppercase mb-4 block">
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
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="mailto:saviusmunene@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-neutral-950 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              saviusmunene@gmail.com
            </a>
            <a
              href="tel:+254743988415"
              className="inline-flex items-center gap-2 px-8 py-3 border border-line text-fg-muted rounded-full font-medium hover:border-accent-500/60 hover:text-fg hover:bg-accent-500/5 transition-colors"
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
