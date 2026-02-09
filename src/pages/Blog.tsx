import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
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
    imageUrl: "https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Mastering-Cypress-Testing-Speed-Reliability-Best-Practices-Featured-Image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvTWFzdGVyaW5nLUN5cHJlc3MtVGVzdGluZy1TcGVlZC1SZWxpYWJpbGl0eS1CZXN0LVByYWN0aWNlcy1GZWF0dXJlZC1JbWFnZS5wbmciLCJpYXQiOjE3NDQ3MzgwMzgsImV4cCI6MjA2MDA5ODAzOH0.uj8-JAn7v5Dr5VKAR67Cs-OFGLJ1IKJa5pA6yWm7r94"
  }
];

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-contain md:bg-cover bg-center bg-no-repeat opacity-70 saturate-150 contrast-125"
        style={{ backgroundImage: "url('/antman.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/80" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 gradient-text">Blog</h1>
          <p className="text-gray-300 mb-12">
            Thoughts, ideas, and insights about technology, development, and design.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/50 rounded-lg overflow-hidden border border-white/5 hover:border-white/15 hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-300">{post.excerpt}</p>
                  <button
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="mt-4 text-white/80 hover:text-white transition-colors"
                  >
                    Read more →
                  </button>
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