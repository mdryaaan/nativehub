import fs from 'node:fs/promises';
import path from 'node:path';

import type { Config, LoadContext, Plugin } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { DEFAULT_PARSE_FRONT_MATTER } from '@docusaurus/utils';
import { themes as prismThemes } from 'prism-react-renderer';

export interface LatestPost {
  title: string;
  description: string;
  permalink: string;
  date: string;
  readingTime: number;
  tags: string[];
}

/**
 * Exposes the newest blog posts as global data so the homepage can render a
 * live "latest from the blog" section instead of a hand-maintained list.
 *
 * The blog plugin's own global data only carries titles and permalinks, so we
 * read the front matter directly to get descriptions, tags, and word counts.
 */
async function latestPostsPlugin(context: LoadContext): Promise<Plugin> {
  const blogDir = path.join(context.siteDir, 'blog');

  /** Maps a tag key from front matter to its display label in blog/tags.yml. */
  async function readTagLabels(): Promise<Record<string, string>> {
    const raw = await fs.readFile(path.join(blogDir, 'tags.yml'), 'utf8');
    const labels: Record<string, string> = {};
    let currentKey: string | null = null;

    for (const line of raw.split('\n')) {
      const key = /^([\w-]+):\s*$/.exec(line);
      if (key) {
        currentKey = key[1];
        labels[currentKey] = currentKey;
        continue;
      }
      const label = /^\s+label:\s*(.+?)\s*$/.exec(line);
      if (label && currentKey) {
        labels[currentKey] = label[1].replace(/^['"]|['"]$/g, '');
      }
    }

    return labels;
  }

  return {
    name: 'nativehub-latest-posts',

    async loadContent() {
      const tagLabels = await readTagLabels();
      const entries = await fs.readdir(blogDir);
      const files = entries.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

      const posts = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(blogDir, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { frontMatter, content } = await DEFAULT_PARSE_FRONT_MATTER({
            filePath,
            fileContent,
          });
          const fm = frontMatter as Record<string, unknown>;

          const words = content.split(/\s+/).filter(Boolean).length;

          return {
            title: String(fm.title ?? file),
            description: String(fm.description ?? ''),
            permalink: `/blog/${String(fm.slug ?? file.replace(/\.mdx?$/, ''))}`,
            date: new Date(String(fm.date)).toISOString(),
            // 220 wpm, matching the blog plugin's own reading-time estimate
            // closely enough for a preview card.
            readingTime: Math.max(1, Math.round(words / 220)),
            tags: Array.isArray(fm.tags)
              ? fm.tags.map((tag) => tagLabels[String(tag)] ?? String(tag))
              : [],
          } satisfies LatestPost;
        }),
      );

      return posts.sort((a, b) => b.date.localeCompare(a.date));
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData((content as LatestPost[] | undefined) ?? []);
    },
  };
}

const organizationName = 'mdryaan';
const projectName = 'nativehub';
const editUrlBase = `https://github.com/${organizationName}/${projectName}/tree/main/`;

/**
 * The canonical URL for this build.
 *
 * Vercel sets `VERCEL=1` on every build, plus `VERCEL_ENV` and either
 * `VERCEL_PROJECT_PRODUCTION_URL` (the stable production domain) or
 * `VERCEL_URL` (this specific deployment). Preview builds use the latter so
 * canonical tags and the sitemap point at the deployment you are actually
 * looking at, rather than claiming to be production.
 *
 * `baseUrl` is always `/` — local dev, previews, and production are identical.
 */
const productionUrl = 'https://nativehub-chi.vercel.app';

function resolveSiteUrl(): string {
  if (!process.env.VERCEL) {
    return productionUrl;
  }

  const host =
    process.env.VERCEL_ENV === 'production'
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL;

  return host ? `https://${host}` : productionUrl;
}

const config: Config = {
  title: 'NativeHub',
  tagline: 'Practical guides and resources for cloud native development',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
    faster: true,
  },

  url: resolveSiteUrl(),
  baseUrl: '/',

  organizationName,
  projectName,
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: false,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: editUrlBase,
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          breadcrumbs: true,
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'The NativeHub Blog',
          blogDescription:
            'Deep dives on Kubernetes, containers, and the tooling that runs them.',
          postsPerPage: 5,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'NativeHub Blog',
            description: 'Practical cloud native engineering, straight from the terminal.',
            copyright: `Copyright © ${new Date().getFullYear()} NativeHub.`,
            xslt: true,
          },
          editUrl: editUrlBase,
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'throw',
        },
        theme: {
          customCss: ['./src/css/tailwind.css', './src/css/custom.css'],
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    // Offline, index-at-build-time search. Chosen over Algolia DocSearch so the
    // site has working search without depending on an external account.
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 10,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],

  plugins: [
    latestPostsPlugin,

    // Wire Tailwind into the Docusaurus PostCSS pipeline.
    function tailwindPlugin() {
      return {
        name: 'nativehub-tailwind',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'), require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {
        name: 'keywords',
        content: 'kubernetes, docker, containers, helm, cloud native, devops, cncf',
      },
      { name: 'author', content: 'Md Raiyan' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: 'NativeHub',
      hideOnScroll: false,
      logo: {
        alt: 'NativeHub logo',
        src: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        { type: 'docSidebar', sidebarId: 'learnSidebar', position: 'left', label: 'Learn' },
        { type: 'docSidebar', sidebarId: 'guidesSidebar', position: 'left', label: 'Guides' },
        { to: '/tools', label: 'Tools', position: 'left' },
        { to: '/resources', label: 'Resources', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/about', label: 'About', position: 'left' },
        {
          href: `https://github.com/${organizationName}/${projectName}`,
          position: 'right',
          className: 'navbar--github-link',
          'aria-label': 'NativeHub on GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            { label: 'Docker fundamentals', to: '/docs/learn/docker-fundamentals' },
            { label: 'Kubernetes fundamentals', to: '/docs/learn/kubernetes-fundamentals' },
            { label: 'Kubernetes networking', to: '/docs/learn/kubernetes-networking' },
            { label: 'Helm basics', to: '/docs/learn/helm-basics' },
          ],
        },
        {
          title: 'Guides',
          items: [
            { label: 'Deploy your first app', to: '/docs/guides/deploy-first-app' },
            { label: 'Build a Docker image', to: '/docs/guides/build-docker-image' },
            { label: 'Write a Helm chart', to: '/docs/guides/write-first-helm-chart' },
            { label: 'Debug pod failures', to: '/docs/guides/debugging-pod-failures' },
          ],
        },
        {
          title: 'Reference',
          items: [
            { label: 'Tools', to: '/tools' },
            { label: 'Resources', to: '/resources' },
            { label: 'Blog', to: '/blog' },
            { label: 'About', to: '/about' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: `https://github.com/${organizationName}/${projectName}` },
            {
              label: 'Contributing',
              href: `https://github.com/${organizationName}/${projectName}/blob/main/CONTRIBUTING.md`,
            },
            { label: 'RSS', href: '/blog/rss.xml' },
            { label: 'CNCF Landscape', href: 'https://landscape.cncf.io/' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} NativeHub. Content licensed MIT. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'yaml', 'docker', 'json', 'go', 'toml', 'ini', 'diff'],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
