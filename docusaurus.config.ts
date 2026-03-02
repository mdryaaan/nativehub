import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const organizationName = 'mdryaan';
const projectName = 'nativehub';
const editUrlBase = `https://github.com/${organizationName}/${projectName}/tree/main/`;

const config: Config = {
  title: 'NativeHub',
  tagline: 'Practical guides and resources for cloud native development',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
    experimental_faster: true,
  },

  url: `https://${organizationName}.github.io`,
  baseUrl: `/${projectName}/`,

  organizationName,
  projectName,
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: false,
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

  plugins: [
    // Wire Tailwind into the Docusaurus PostCSS pipeline.
    function tailwindPlugin() {
      return {
        name: 'nativehub-tailwind',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(
            require('tailwindcss'),
            require('autoprefixer'),
          );
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
            { label: 'RSS', href: '/nativehub/blog/rss.xml' },
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
