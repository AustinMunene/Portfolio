import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export type BlogPreviewPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
};

const TOPICS = ['All', 'Development', 'AI', 'Design', 'QA & Testing', 'Career'];

type BlogPreviewProps = {
  posts: BlogPreviewPost[];
};

const categoryStyles: Record<string, string> = {
  Development: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
  AI: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  Design: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Career: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'QA & Testing': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const BlogPreview = ({ posts }: BlogPreviewProps) => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('All');

  const filtered = useMemo(() => {
    if (topic === 'All') return posts;
    return posts.filter((p) => p.category === topic);
  }, [posts, topic]);

  const featured = filtered[0];
  const recent = filtered.slice(1, 5);

  return (
    <section id="blog-preview" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background: image + overlay (same pattern as Hero, Career Preview, Let's Connect) */}
      <div className="absolute inset-0 bg-black" aria-hidden />
      <img
        src="/VibeCoding.jpeg"
        alt=""
        role="presentation"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90"
        aria-hidden
      />
      <div className="absolute inset-0">
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-accent-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-accent-800/10 rounded-full blur-[100px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12"
        >
          <div>
            <span className="text-accent-400 text-sm font-medium tracking-wider uppercase mb-4 block">
              Writing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 60%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Latest posts
            </h2>
            <p className="text-gray-400 max-w-xl">
              Thoughts on development, QA, and product.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.1] text-gray-300 hover:border-accent-500/40 hover:text-accent-300 transition-all text-sm font-medium"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Topic filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                topic === t
                  ? 'bg-accent-500/20 text-accent-300 border border-accent-500/40'
                  : 'bg-white/[0.04] text-gray-400 border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No posts in this topic.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Featured: large left */}
            {featured && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/blog/${featured.id}`)}
                className="lg:col-span-2 group cursor-pointer"
              >
                <div className="h-full rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.03] hover:border-accent-500/20 hover:bg-accent-500/[0.02] transition-all duration-300">
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={featured.imageUrl}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border mb-3 ${categoryStyles[featured.category] || 'bg-white/10 text-white border-white/10'}`}>
                        {featured.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent-300 transition-colors">
                        {featured.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span>{featured.date}</span>
                      <span className="mx-2 text-accent-500/30">·</span>
                      <span>{featured.readTime}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-accent-400 group-hover:translate-x-1 transition-transform">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Recent: list right */}
            <div className="space-y-4">
              {recent.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="group cursor-pointer rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 hover:border-accent-500/20 hover:bg-accent-500/[0.02] transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${categoryStyles[post.category] || 'bg-white/10 text-gray-400 border-white/10'}`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-gray-500">{post.readTime}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-accent-300 transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;
