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
  }
];

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-gray-400 mb-12">
          Thoughts, ideas, and insights about technology, development, and design.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
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
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-400">{post.excerpt}</p>
                <button 
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Read more →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog; 