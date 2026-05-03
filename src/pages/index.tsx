import Layout from '@theme/Layout';
import FeatureCard from '@site/src/components/FeatureCard';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import BlogPostCard from '@site/src/components/BlogPostCard';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function Hero(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      {/* Decorative background: a soft brand aurora over a faint grid. */}
      <div className={styles.heroBackdrop} aria-hidden="true">
        <span className={styles.heroGlowA} />
        <span className={styles.heroGlowB} />
        <span className={styles.heroGrid} />
      </div>

      <div className={`container ${styles.heroInner}`}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Open source · Community maintained
        </p>

        <h1 className={styles.heroTitle}>
          Practical guides and resources for{' '}
          <span className={styles.heroAccent}>cloud native</span> development
        </h1>

        <p className={styles.heroSubtitle}>
          {siteConfig.title} is a working reference for Kubernetes, containers, and the tooling
          that runs them. Concepts explained properly, guides you can follow end to end, and
          commands that actually work.
        </p>

        <div className={styles.heroActions}>
          <Link
            className="button button--primary button--lg"
            to="/docs/learn/kubernetes-fundamentals"
          >
            Start learning
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/guides/deploy-first-app"
          >
            Deploy your first app
          </Link>
        </div>

        {/* A terminal panel, because that is where this material actually lives. */}
        <div className={styles.terminal} aria-hidden="true">
          <div className={styles.terminalBar}>
            <span className={styles.dot} data-dot="red" />
            <span className={styles.dot} data-dot="amber" />
            <span className={styles.dot} data-dot="green" />
            <span className={styles.terminalTitle}>~/nativehub</span>
          </div>
          <pre className={styles.terminalBody}>
            <code>
              <span className={styles.prompt}>$</span> kubectl get deploy,rs,pod -l app=web
              {'\n'}
              {'\n'}
              NAME{'                  '}READY{'   '}UP-TO-DATE{'   '}AVAILABLE{'\n'}
              deployment.apps/web{'   '}
              <span className={styles.ok}>3/3</span>
              {'     '}3{'            '}3{'\n'}
              {'\n'}
              NAME{'                             '}DESIRED{'   '}CURRENT{'   '}READY{'\n'}
              replicaset.apps/web-7d4b9c6f85{'   '}3{'         '}3{'         '}3{'\n'}
              {'\n'}
              NAME{'                       '}READY{'   '}STATUS{'    '}RESTARTS{'\n'}
              pod/web-7d4b9c6f85-2xk4l{'   '}1/1{'     '}
              <span className={styles.ok}>Running</span>
              {'   '}0{'\n'}
              pod/web-7d4b9c6f85-9mfqz{'   '}1/1{'     '}
              <span className={styles.ok}>Running</span>
              {'   '}0{'\n'}
              pod/web-7d4b9c6f85-hd7vw{'   '}1/1{'     '}
              <span className={styles.ok}>Running</span>
              {'   '}0
            </code>
          </pre>
        </div>

        <dl className={styles.stats}>
          <div>
            <dt>11</dt>
            <dd>In-depth doc pages</dd>
          </div>
          <div>
            <dt>6</dt>
            <dd>Long-form articles</dd>
          </div>
          <div>
            <dt>3</dt>
            <dd>Command cheat sheets</dd>
          </div>
          <div>
            <dt>MIT</dt>
            <dd>Licensed, free forever</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}

const SECTIONS = [
  {
    eyebrow: 'Concepts',
    title: 'Learn',
    description:
      'Concept-first explanations of the primitives you meet every day — containers, Pods, Services, volumes, RBAC, and Helm.',
    to: '/docs/learn',
    highlights: ['Docker', 'Kubernetes', 'Networking', 'Storage', 'Security', 'Helm'],
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    ),
  },
  {
    eyebrow: 'Hands on',
    title: 'Guides',
    description:
      'Task-shaped walkthroughs from an empty machine to a running deployment. Every command is written to run as-is.',
    to: '/docs/guides',
    highlights: ['Deploy an app', 'Build an image', 'Helm charts', 'CI/CD', 'Debugging'],
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 9 3 3-3 3" />
        <path d="M13 15h3" />
        <rect x="2" y="4" width="20" height="16" rx="2.5" />
      </svg>
    ),
  },
  {
    eyebrow: 'Reference',
    title: 'Tools',
    description:
      'Searchable kubectl, docker, and helm cheat sheets, plus an honest directory of the CLI tools worth installing.',
    to: '/tools',
    highlights: ['kubectl', 'docker', 'helm', 'k9s', 'stern'],
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.9 9.9a2.1 2.1 0 0 1-3-3Z" />
        <path d="M14.7 6.3 17.5 3.5" />
      </svg>
    ),
  },
  {
    eyebrow: 'Curated',
    title: 'Resources',
    description:
      'Official documentation worth bookmarking, real repositories worth reading, and a roadmap from container basics to production.',
    to: '/resources',
    highlights: ['Official docs', 'Repos to study', 'Roadmap'],
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21a8.4 8.4 0 0 0-6-2.4A1.6 1.6 0 0 1 4.4 17V5.4A1.4 1.4 0 0 1 5.8 4c2.3 0 4.6.8 6.2 2.2" />
        <path d="M12 21a8.4 8.4 0 0 1 6-2.4A1.6 1.6 0 0 0 19.6 17V5.4A1.4 1.4 0 0 0 18.2 4c-2.3 0-4.6.8-6.2 2.2" />
        <path d="M12 6.2V21" />
      </svg>
    ),
  },
];

function Sections(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Four ways in</h2>
          <p className={styles.sectionLead}>
            Whether you are starting from scratch or looking up a flag you half remember, there
            is a door here for it.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {SECTIONS.map((section) => (
            <FeatureCard key={section.title} {...section} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface LatestPost {
  title: string;
  description: string;
  permalink: string;
  date: string;
  readingTime: number;
  tags: string[];
}

function LatestPosts(): ReactNode {
  // Supplied by the `nativehub-latest-posts` plugin in docusaurus.config.ts,
  // so this list never drifts from what is actually published.
  const posts = (usePluginData('nativehub-latest-posts') as LatestPost[] | undefined) ?? [];
  const latest = posts.slice(0, 3);

  if (latest.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.blogHead}>
          <div>
            <h2 className={styles.sectionTitle}>Latest from the blog</h2>
            <p className={styles.sectionLead}>
              Longer pieces on how things actually work underneath.
            </p>
          </div>
          <Link className={styles.blogAll} to="/blog">
            All posts
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className={styles.blogGrid}>
          {latest.map((post) => (
            <BlogPostCard key={post.permalink} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Keep up with new guides</h2>
          <p className={styles.ctaLead}>
            New posts land every few weeks. Subscribe with any feed reader — no email address,
            no tracking, no list to unsubscribe from.
          </p>
          <div className={styles.ctaActions}>
            {/* Feeds are emitted after the broken-link check runs, so they are
                plain anchors rather than <Link> to keep the checker happy. */}
            <a className="button button--primary button--lg" href={useBaseUrl('/blog/rss.xml')}>
              Subscribe via RSS
            </a>
            <Link
              className="button button--secondary button--lg"
              to="https://github.com/mdryaan/nativehub"
            >
              Star on GitHub
            </Link>
          </div>
          <p className={styles.ctaNote}>
            Prefer Atom? <a href={useBaseUrl('/blog/atom.xml')}>Use the Atom feed</a> instead.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="Practical, technically accurate guides for Kubernetes, Docker, Helm, and cloud native development."
    >
      <Hero />
      <Sections />
      <LatestPosts />
      <Newsletter />
    </Layout>
  );
}
