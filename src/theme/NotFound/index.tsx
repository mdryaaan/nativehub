import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';
import type { ReactNode } from 'react';

import styles from './styles.module.css';

const DESTINATIONS = [
  { label: 'Learn', to: '/docs/learn', hint: 'Concepts, from containers to Helm' },
  { label: 'Guides', to: '/docs/guides', hint: 'Step-by-step walkthroughs' },
  { label: 'Tools', to: '/tools', hint: 'kubectl, docker, and helm cheat sheets' },
  { label: 'Resources', to: '/resources', hint: 'Official docs and a learning roadmap' },
  { label: 'Blog', to: '/blog', hint: 'Longer pieces on how things work' },
  { label: 'Home', to: '/', hint: 'Start over from the top' },
];

export default function NotFound(): ReactNode {
  return (
    <>
      <PageMetadata
        title={translate({ id: 'theme.NotFound.title', message: 'Page Not Found' })}
      />
      <Layout>
        <main className={styles.wrapper}>
          <div className="container">
            <div className={styles.inner}>
              <pre className={styles.terminal} aria-hidden="true">
                <code>
                  <span className={styles.prompt}>$</span> kubectl get page --this-url{'\n'}
                  <span className={styles.error}>
                    Error from server (NotFound): pages &quot;this-url&quot; not found
                  </span>
                </code>
              </pre>

              <p className={styles.code}>404</p>

              <h1 className={styles.title}>
                <Translate id="nativehub.notFound.title">
                  This page could not be scheduled
                </Translate>
              </h1>

              <p className={styles.lead}>
                <Translate id="nativehub.notFound.lead">
                  The URL does not match anything on this site. It may have moved, or the link
                  that brought you here may be out of date.
                </Translate>
              </p>

              <div className={styles.grid}>
                {DESTINATIONS.map((destination) => (
                  <Link key={destination.to} to={destination.to} className={styles.card}>
                    <span className={styles.cardLabel}>
                      {destination.label}
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
                    </span>
                    <span className={styles.cardHint}>{destination.hint}</span>
                  </Link>
                ))}
              </div>

              <p className={styles.report}>
                Think this link should work?{' '}
                <Link to="https://github.com/mdryaaan/nativehub/issues/new">Open an issue</Link>{' '}
                and it will get fixed.
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
