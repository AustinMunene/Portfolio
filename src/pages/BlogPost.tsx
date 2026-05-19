import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from './Blog';

const categoryColors: Record<string, string> = {
  Development: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
  AI: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  Design: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Career: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'QA & Testing': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const BlogPost2: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 gradient-text">Post Not Found</h1>
            <button
              onClick={() => navigate('/blog')}
              className="text-accent-400 hover:text-accent-300 transition-colors"
            >
              ← Back to Blog
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent-600/8 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-gray-400 hover:text-accent-400 transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>

          <div className="relative h-80 md:h-96 mb-8 rounded-2xl overflow-hidden border border-white/[0.06]">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span
                className={
                  'px-3 py-1 rounded-full text-xs border ' +
                  (categoryColors[post.category] || 'bg-white/10 text-white border-white/10')
                }
              >
                {post.category}
              </span>
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-500 mb-4">
            <span>{post.date}</span>
            <span className="mx-2 text-accent-500/30">|</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">{post.title}</h1>

          <div
            className="prose prose-invert prose-headings:text-white prose-a:text-accent-400 prose-a:no-underline hover:prose-a:text-accent-300 prose-code:text-accent-300 prose-strong:text-white max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost2;
