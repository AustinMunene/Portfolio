import React, { useState } from 'react';
import { List, ChevronDown } from 'lucide-react';
import type { Heading } from '../lib/postContent';

/*
 * Collapsed by default, and deliberately so. The long posts have close to forty
 * h2s, and an always-open contents list of that length is a wall of links
 * between the reader and the first paragraph. Shut, it is one line that says how
 * many sections are coming; open, it is a way to jump.
 *
 * Short posts do not get one at all - see the threshold in BlogPost.
 */
const TableOfContents: React.FC<{ headings: Heading[] }> = ({ headings }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Table of contents" className="glass rounded-2xl mb-10 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-raised transition-colors duration-200"
      >
        <List className="w-4 h-4 text-fg-subtle flex-shrink-0" />
        <span className="text-sm text-fg-muted">
          <span className="text-fg font-medium">Contents</span>
          <span className="mx-2 text-brand-line">·</span>
          {headings.length} sections
        </span>
        <ChevronDown
          className={`w-4 h-4 ml-auto text-fg-subtle transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ol className="px-5 pb-5 pt-1 space-y-1.5 max-h-80 overflow-y-auto border-t border-line">
          {headings.map((h, i) => (
            <li key={h.id} className="flex gap-3 text-sm">
              <span className="font-mono text-[11px] text-fg-subtle pt-0.5 w-6 flex-shrink-0 text-right">
                {i + 1}
              </span>
              <a
                href={`#${h.id}`}
                onClick={() => setOpen(false)}
                className="text-fg-muted hover:text-fg transition-colors leading-snug"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
};

export default TableOfContents;
