import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, CATEGORY_CHIP } from './Blog';

const BlogPost2: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <section className="section-glow relative min-h-screen bg-surface overflow-hidden">
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-display mb-4 gradient-text">Post Not Found</h1>
            <button
              onClick={() => navigate('/blog')}
              className="text-fg-muted hover:text-fg transition-colors"
            >
              ← Back to Blog
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-glow relative min-h-screen bg-surface overflow-hidden">
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.article
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => navigate('/blog')}
            className="glass-pill inline-flex items-center px-4 py-2 rounded-full text-fg-muted hover:text-fg hover:border-brand-line mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>

          <div className="relative h-80 md:h-96 mb-8 rounded-2xl overflow-hidden border border-line">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs ${CATEGORY_CHIP}`}>
                {post.category}
              </span>
            </div>
          </div>

          <div className="flex items-center text-xs text-fg-subtle mb-4">
            <span>{post.date}</span>
            <span className="mx-2 text-brand-line">|</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display mb-8 gradient-text">{post.title}</h1>

          <div
            className="prose  prose-headings:text-fg prose-a:text-fg-muted prose-a:no-underline hover:prose-a:text-fg prose-code:text-fg prose-strong:text-fg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost2;
