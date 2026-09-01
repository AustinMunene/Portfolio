import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { blogPosts } from '../data/posts';
import { CATEGORY_CHIP_ON_IMAGE } from '../components/categoryChip';

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section-glow relative min-h-screen bg-surface overflow-hidden">

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-fg-muted text-sm font-medium tracking-wider uppercase mb-4 block">
              Writing
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Blog</h1>
            <p className="text-fg-muted max-w-lg mx-auto">
              Mostly what happens when I get bored and start poking at things.
              Testing, frontend, AI, and the occasional strong opinion. 😂
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="glass group cursor-pointer rounded-2xl overflow-hidden hover:border-brand-line"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${CATEGORY_CHIP_ON_IMAGE}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-fg-subtle mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2 text-brand-line">|</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 text-fg group-hover:text-fg transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-fg-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-sm text-fg-muted group-hover:translate-x-1 transition-transform">
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
