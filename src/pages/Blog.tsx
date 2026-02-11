import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Modern Web Applications",
    excerpt: "Learn about the latest trends and best practices in web development, from component-based architecture to performance optimization techniques.",
    date: "April 14, 2024",
    readTime: "5 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "The Future of AI in Software Development",
    excerpt: "Explore how artificial intelligence is transforming the way we write, test, and deploy code, and what it means for developers.",
    date: "April 10, 2024",
    readTime: "7 min read",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "Creating Responsive UIs with Tailwind CSS",
    excerpt: "A deep dive into building beautiful, responsive user interfaces using Tailwind CSS and modern design principles.",
    date: "April 5, 2024",
    readTime: "6 min read",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    title: "TypeScript: Why You Should Use It",
    excerpt: "Discover the benefits of TypeScript and how it can improve your development workflow and code quality.",
    date: "March 28, 2024",
    readTime: "4 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 5,
    title: "Building a Portfolio That Stands Out",
    excerpt: "Learn how to create a portfolio website that showcases your skills and attracts potential employers or clients.",
    date: "March 20, 2024",
    readTime: "8 min read",
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 6,
    title: "The Rise of Web Components",
    excerpt: "Explore the future of web development with Web Components and how they're changing the way we build reusable UI elements.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 7,
    title: "Mastering Cypress: Best Practices for Automation Testing",
    excerpt: "Explore Cypress from setup to best practices, including tips for writing stable, scalable tests and integrating with modern CI/CD pipelines.",
    date: "April 14, 2024",
    readTime: "7 min read",
    category: "QA & Testing",
    imageUrl: "/cypress.jpeg"
  }
];

const categoryColors: Record<string, string> = {
  Development: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
  AI: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  Design: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Career: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'QA & Testing': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent-600/10 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-medium tracking-wider uppercase mb-4 block">
              Writing
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Blog</h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Thoughts, ideas, and insights about technology, development, and design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="group cursor-pointer bg-white/[0.03] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-accent-500/20 transition-all duration-300 hover:bg-accent-500/[0.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${categoryColors[post.category] || 'bg-white/10 text-white border-white/10'}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2 text-accent-500/30">|</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 text-white group-hover:text-accent-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-sm text-accent-400 group-hover:translate-x-1 transition-transform">
                    Read more →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
