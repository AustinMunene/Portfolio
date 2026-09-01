import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts, type BlogPost } from '../data/posts';

/*
 * The end of a post used to be a dead end - the only way onward was the browser
 * back button. `blogPosts` is authored newest first, so the neighbour at index-1
 * is the newer post and index+1 the older one.
 */
const PostFooterNav: React.FC<{ post: BlogPost }> = ({ post }) => {
  const index = blogPosts.findIndex((p) => p.id === post.id);
  if (index === -1) return null;

  const newer = index > 0 ? blogPosts[index - 1] : null;
  const older = index < blogPosts.length - 1 ? blogPosts[index + 1] : null;
  if (!newer && !older) return null;

  const Card: React.FC<{ target: BlogPost; direction: 'newer' | 'older' }> = ({ target, direction }) => (
    <Link
      to={`/blog/${target.id}`}
      className={`glass group rounded-2xl p-5 flex flex-col gap-2 hover:border-brand-line transition-colors duration-200 ${
        direction === 'older' ? 'sm:text-right sm:items-end' : ''
      }`}
    >
      <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-fg-subtle">
        {direction === 'newer' && <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />}
        {direction === 'newer' ? 'Newer' : 'Older'}
        {direction === 'older' && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="text-sm font-medium text-fg leading-snug line-clamp-2">{target.title}</span>
      <span className="text-xs text-fg-subtle">{target.readTime}</span>
    </Link>
  );

  return (
    <nav aria-label="More posts" className="mt-16 pt-10 border-t border-line">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {newer ? <Card target={newer} direction="newer" /> : <span className="hidden sm:block" />}
        {older && <Card target={older} direction="older" />}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/blog"
          className="glass-pill inline-flex items-center px-4 py-2 rounded-full text-sm text-fg-muted hover:text-fg hover:border-brand-line"
        >
          All posts
        </Link>
      </div>
    </nav>
  );
};

export default PostFooterNav;
