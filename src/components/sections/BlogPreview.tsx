import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpotlightSurface from '../SpotlightSurface';
import useParallax from '../../hooks/useParallax';
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
  Development: 'bg-accent-500/10 text-fg border-accent-500/20',
  AI: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  Design: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Career: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'QA & Testing': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const BlogPreview = ({ posts }: BlogPreviewProps) => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('All');
  const { ref: sectionRef, y } = useParallax<HTMLElement>(90);

  const filtered = useMemo(() => {
    if (topic === 'All') return posts;
    return posts.filter((p) => p.category === topic);
  }, [posts, topic]);

  const featured = filtered[0];
  const recent = filtered.slice(1, 5);

  return (
    <section
      id="blog-preview"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background: image + overlay (same pattern as Hero, Career Preview, Let's Connect) */}
      <div className="absolute inset-0 bg-surface-alt" aria-hidden />
      <motion.img
        src="/cypress.jpeg"
        data-photo-backdrop
        alt=""
        role="presentation"
        decoding="async"
        style={y ? { y } : undefined}
        className="absolute -inset-y-16 inset-x-0 w-full h-[calc(100%+8rem)] object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90"
        data-photo-backdrop
        aria-hidden
      />
      <div className="absolute inset-0">
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-accent-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-accent-800/10 rounded-full blur-[100px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)',
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
            <span className="text-fg-muted text-sm font-medium tracking-wider uppercase mb-4 block">
              Writing
            </span>
            <h2 className="text-4xl md:text-5xl font-display mb-4" style={{
              background:
                'linear-gradient(135deg, var(--fg) 0%, var(--fg) 55%, var(--fg-muted) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Latest posts
            </h2>
            <p className="text-fg-muted max-w-xl">
              Thoughts on development, QA, and product.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.1] text-fg-muted hover:border-accent-500/40 hover:text-fg transition-all text-sm font-medium"
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
                  ? 'bg-brand-soft text-brand border border-brand/30'
                  : 'bg-surface-raised text-fg-muted border border-line hover:border-line'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-fg-subtle">No posts in this topic.</p>
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
                <SpotlightSurface className="h-full rounded-2xl overflow-hidden border border-line bg-surface-raised hover:border-accent-500/20 transition-colors duration-300">
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={featured.imageUrl}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border mb-3 ${categoryStyles[featured.category] || 'bg-white/10 text-fg border-line'}`}>
                        {featured.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-fg group-hover:text-fg transition-colors">
                        {featured.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center text-xs text-fg-subtle mb-3">
                      <span>{featured.date}</span>
                      <span className="mx-2 text-fg-subtle">·</span>
                      <span>{featured.readTime}</span>
                    </div>
                    <p className="text-fg-muted text-sm leading-relaxed line-clamp-3 mb-4">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-fg-muted group-hover:translate-x-1 transition-transform">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </SpotlightSurface>
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
                  className="spotlight surface-depth group cursor-pointer rounded-xl border border-line bg-surface-raised p-4 hover:border-accent-500/20 transition-colors duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${categoryStyles[post.category] || 'bg-white/10 text-fg-muted border-line'}`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-fg-subtle">{post.readTime}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-fg group-hover:text-fg transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-fg-subtle">{post.date}</p>
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
