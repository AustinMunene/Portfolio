import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { blogPosts, SERIES, type BlogPost } from '../data/posts';

/*
 * Shown at the top of any post that belongs to a numbered run. Every part is a
 * link, not just the neighbours: these posts refer to each other by number in
 * their own bodies ("Remember Part 3?"), so a reader hitting that sentence
 * should be one click away rather than back at the index working it out from
 * publication dates.
 */
const SeriesNav: React.FC<{ post: BlogPost }> = ({ post }) => {
  if (!post.series) return null;

  const meta = SERIES[post.series.slug];
  if (!meta) return null;

  const parts = blogPosts
    .filter((p) => p.series?.slug === post.series?.slug)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));

  return (
    <nav
      aria-label={`${meta.name} series`}
      className="glass rounded-2xl px-5 py-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3"
    >
      <div className="flex items-center gap-2 min-w-0">
        <Layers className="w-4 h-4 text-fg-subtle flex-shrink-0" />
        <span className="text-sm text-fg-muted truncate">
          <span className="text-fg font-medium">{meta.name}</span>
          <span className="mx-2 text-brand-line">·</span>
          Part {post.series.part} of {meta.total}
        </span>
      </div>

      <div className="flex items-center gap-1.5 sm:ml-auto">
        {parts.map((p) => {
          const isCurrent = p.id === post.id;
          return (
            <Link
              key={p.id}
              to={`/blog/${p.id}`}
              title={p.title}
              aria-current={isCurrent ? 'page' : undefined}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium transition-colors duration-200 ${
                isCurrent
                  ? 'bg-brand-soft border border-brand-line text-fg'
                  : 'border border-line text-fg-subtle hover:text-fg hover:border-brand-line'
              }`}
            >
              {p.series?.part}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SeriesNav;
