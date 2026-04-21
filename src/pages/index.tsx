import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
          <Link className="button button--primary button--lg" to="/docs/learn/kubernetes-fundamentals">
            Start learning
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/guides/deploy-first-app">
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
              <span className={styles.prompt}>$</span> kubectl get deploy,rs,pod -l app=web{'\n'}
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

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="Practical, technically accurate guides for Kubernetes, Docker, Helm, and cloud native development."
    >
      <Hero />
    </Layout>
  );
}
