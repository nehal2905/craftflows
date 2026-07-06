/**
 * Crafted Flows blog plugin.
 *
 * Compiles /content/blog/*.md at BUILD time (Node), so the browser never
 * downloads a markdown parser or highlighter — posts ship as prerendered
 * HTML strings in tiny per-post chunks.
 *
 * Provides:
 *  1. `virtual:blog-index` — metadata array for every published post
 *     (frontmatter + reading time), sorted newest-first. Powers /blog.
 *  2. A transform for `content/blog/*.md` imports — each post becomes a
 *     JS module exporting { frontmatter, headings, html }.
 *  3. `sitemap.xml` generation on build — "/", "/blog", and every
 *     published post are included automatically.
 *
 * Publishing a post = dropping a .md file into content/blog. Nothing else.
 * The filename (minus .md) is the slug. Set `draft: true` in frontmatter
 * to keep a post out of the index, routes, and sitemap.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import taskLists from 'markdown-it-task-lists';
import hljs from 'highlight.js';

const CONTENT_DIR = path.resolve(process.cwd(), 'content', 'blog');
const VIRTUAL_ID = 'virtual:blog-index';
const RESOLVED_VIRTUAL_ID = '\0' + VIRTUAL_ID;
const ORIGIN = 'https://craftedflows.com';

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

/* GFM: tables + strikethrough are on by default; linkify covers autolinks;
   the taskLists plugin covers checkboxes. */
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
})
  .use(anchor, { slugify, tabIndex: false })
  .use(taskLists);

/* Every markdown image is below the fold on article pages → lazy + async. */
const defaultImage =
  md.renderer.rules.image ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  tokens[idx].attrSet('loading', 'lazy');
  tokens[idx].attrSet('decoding', 'async');
  return defaultImage(tokens, idx, options, env, self);
};

/* External links open in a new tab, matching the rest of the site. */
const defaultLinkOpen =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') || '';
  if (/^https?:\/\//i.test(href) && !href.startsWith(ORIGIN)) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener');
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

function postFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(CONTENT_DIR, f));
}

function readMeta(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: path.basename(file, '.md'),
    title: data.title ?? path.basename(file, '.md'),
    description: data.description ?? '',
    date: data.date ?? '1970-01-01',
    updated: data.updated ?? data.date ?? '1970-01-01',
    author: data.author ?? 'Crafted Flows Team',
    category: data.category ?? 'Automation',
    tags: data.tags ?? [],
    image: data.image ?? '/assets/og.png',
    imageAlt: data.imageAlt ?? data.title ?? '',
    draft: Boolean(data.draft),
    readingTime: Math.max(1, Math.round(words / 220)),
  };
}

function publishedPosts() {
  return postFiles()
    .map(readMeta)
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function compilePost(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const { content } = matter(raw);
  const tokens = md.parse(content, {});

  const headings = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === 'heading_open' && (t.tag === 'h2' || t.tag === 'h3')) {
      const inline = tokens[i + 1];
      const text = inline.children
        .filter((c) => c.type === 'text' || c.type === 'code_inline')
        .map((c) => c.content)
        .join('');
      headings.push({
        depth: Number(t.tag[1]),
        text,
        id: t.attrGet('id') || slugify(text),
      });
    }
  }

  const html = md.renderer.render(tokens, md.options, {});
  return { meta: readMeta(file), headings, html };
}

function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${ORIGIN}/`, lastmod: today, changefreq: 'monthly', priority: '1.0' },
    { loc: `${ORIGIN}/blog`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
    ...publishedPosts().map((p) => ({
      loc: `${ORIGIN}/blog/${p.slug}`,
      lastmod: p.updated,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

function rssXml() {
  const posts = publishedPosts();
  const newest = posts[0]?.updated ?? new Date().toISOString().slice(0, 10);
  /* RSS dates are RFC 822; frontmatter dates are YYYY-MM-DD. */
  const rfc822 = (iso) => new Date(`${iso}T00:00:00Z`).toUTCString();

  const items = posts
    .map((p) => {
      const url = `${ORIGIN}/blog/${p.slug}`;
      const categories = [p.category, ...p.tags]
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <description>${escapeXml(p.description)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <dc:creator>${escapeXml(p.author)}</dc:creator>
${categories}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Crafted Flows Blog</title>
    <description>Practical writing on business automation, AI workflows, and the tools we build with\u2014from the team at Crafted Flows.</description>
    <link>${ORIGIN}/blog</link>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${rfc822(newest)}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

export default function blogPlugin() {
  return {
    name: 'crafted-flows-blog',
    enforce: 'pre',

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        return `export default ${JSON.stringify(publishedPosts())};`;
      }
    },

    transform(_, id) {
      if (!id.includes('content') || !id.endsWith('.md')) return;
      const normalized = path.normalize(id.split('?')[0]);
      if (!normalized.startsWith(CONTENT_DIR)) return;
      const { meta, headings, html } = compilePost(normalized);
      return {
        code:
          `export const frontmatter = ${JSON.stringify(meta)};\n` +
          `export const headings = ${JSON.stringify(headings)};\n` +
          `export const html = ${JSON.stringify(html)};\n`,
        map: null,
      };
    },

    /* New/edited posts appear in dev without a server restart. */
    configureServer(server) {
      server.watcher.add(CONTENT_DIR);
      const refresh = (file) => {
        if (!path.normalize(file).startsWith(CONTENT_DIR)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh);
      server.watcher.on('change', refresh);
      server.watcher.on('unlink', refresh);
    },

    /* Sitemap + RSS regenerate on every build from the content folder. */
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
      this.emitFile({ type: 'asset', fileName: 'rss.xml', source: rssXml() });
    },
  };
}
