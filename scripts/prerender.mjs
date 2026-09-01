/*
 * Bakes per-page <head> metadata into the built output, and emits an RSS feed.
 *
 * Why this exists: the site is a client-rendered SPA, so every route served
 * `dist/index.html` with one static title ("Austin Munene") and no Open Graph
 * tags at all. Social crawlers do not execute JavaScript, so every shared blog
 * link previewed as the same generic card with no image and the wrong title -
 * invisible to us, because it looks correct to anyone who actually clicks it.
 *
 * Doing it at build time rather than adding SSR: the route table is tiny and the
 * post data is static, so writing one HTML file per route with the right tags in
 * it is enough. Netlify serves a real file before it consults the `/*` SPA
 * fallback in _redirects, so `dist/blog/16/index.html` wins for crawlers while
 * humans still get the same bundle and the same client-side routing.
 */
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://austin.is-a.dev';
const AUTHOR = 'Austin Munene';
const DEFAULT_IMAGE = `${SITE}/dev.png`;

/* posts.ts is TypeScript, so it gets bundled to a temp ESM file first. It is
   pure data with no imports, which is the whole reason it was split out of
   Blog.tsx. */
const loadPosts = async () => {
  const tmp = join(DIST, '.posts.mjs');
  await build({
    entryPoints: [join(ROOT, 'src/data/posts.ts')],
    outfile: tmp,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  });
  const mod = await import(pathToFileURL(tmp).href);
  await rm(tmp, { force: true });
  return mod.blogPosts;
};

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeXml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${SITE}${url}`);

const clamp = (s, n = 200) => {
  const flat = String(s).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return flat.length <= n ? flat : `${flat.slice(0, n - 1).replace(/\s+\S*$/, '')}…`;
};

const headFor = ({ title, description, url, image, type = 'website' }) => `
    <title>${escapeAttr(title)}</title>
    <link rel="canonical" href="${escapeAttr(url)}" />
    <meta name="description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${escapeAttr(AUTHOR)}" />
    <meta property="og:url" content="${escapeAttr(url)}" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:image" content="${escapeAttr(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${escapeAttr(image)}" />`;

/* The template ships with a placeholder title and description. Both are removed
   before the real tags go in, or crawlers see two of each and pick whichever
   they like. */
const render = (template, meta) =>
  template
    .replace(/\n?\s*<title>.*?<\/title>/s, '')
    .replace(/\n?\s*<meta\s+name="description"[^>]*>/s, '')
    .replace('</head>', `${headFor(meta)}\n  </head>`);

const writePage = async (route, html) => {
  const dir = route === '/' ? DIST : join(DIST, route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
};

const rssFor = (posts) => {
  const items = posts
    .map((post) => {
      const url = `${SITE}/blog/${post.id}`;
      /* Parsed at midday UTC. `new Date('September 1, 2026')` is midnight *local*,
         which in Nairobi converts back to 21:00 on 31 August - so a post would
         advertise a pubDate a day before the date printed on it. */
      const date = new Date(`${post.date} 12:00:00 UTC`);
      const pubDate = Number.isNaN(date.getTime()) ? '' : `\n      <pubDate>${date.toUTCString()}</pubDate>`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>${pubDate}
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(clamp(post.excerpt, 400))}</description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(AUTHOR)} — Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Testing, frontend, AI, and the occasional strong opinion.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
};

const run = async () => {
  const template = await readFile(join(DIST, 'index.html'), 'utf8');
  const posts = await loadPosts();

  const staticRoutes = [
    {
      route: '/',
      title: `${AUTHOR} — Frontend + QA Engineer`,
      description:
        'Frontend and QA engineer in Nairobi. Test automation with Cypress and Playwright, and writing about testing, AI and building things that hold up.',
    },
    {
      route: '/blog',
      title: `Blog — ${AUTHOR}`,
      description:
        'Mostly what happens when I get bored and start poking at things. Testing, frontend, AI, and the occasional strong opinion.',
    },
    {
      route: '/career',
      title: `Career — ${AUTHOR}`,
      description: 'A timeline of professional growth and achievements in the tech industry.',
    },
    {
      route: '/interactive',
      title: `Interactive Demo — ${AUTHOR}`,
      description:
        'Testing, taken apart so you can see how it works. Manual against automated, Cypress against Playwright, run in the browser.',
    },
  ];

  for (const { route, title, description } of staticRoutes) {
    await writePage(route, render(template, { title, description, url: `${SITE}${route}`, image: DEFAULT_IMAGE }));
  }

  for (const post of posts) {
    await writePage(
      `/blog/${post.id}`,
      render(template, {
        title: `${post.title} — ${AUTHOR}`,
        description: clamp(post.excerpt),
        url: `${SITE}/blog/${post.id}`,
        image: absolute(post.imageUrl),
        type: 'article',
      }),
    );
  }

  await writeFile(join(DIST, 'rss.xml'), rssFor(posts), 'utf8');

  console.log(
    `prerendered ${staticRoutes.length} routes + ${posts.length} posts, and wrote rss.xml`,
  );
};

run().catch((err) => {
  console.error('prerender failed:', err);
  process.exit(1);
});
