import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useThemeConfig } from '@docusaurus/theme-common';
import type { ReactNode } from 'react';

import ThemeToggle from '@site/src/components/ThemeToggle';
import styles from './styles.module.css';

interface FooterLink {
  label?: string;
  to?: string;
  href?: string;
  html?: string;
}

interface FooterColumn {
  title?: string;
  items: FooterLink[];
}

function FooterItem({ item }: { item: FooterLink }): ReactNode {
  const toUrl = useBaseUrl(item.to);

  if (!item.label) {
    return null;
  }

  // `href` in the footer config means "a raw URL" — including generated assets
  // such as the feeds, which do not exist yet when the link checker runs — so
  // those render as a plain anchor rather than a routed <Link>.
  return (
    <li>
      {item.href ? (
        <a className={styles.link} href={item.href}>
          {item.label}
        </a>
      ) : (
        <Link className={styles.link} to={toUrl}>
          {item.label}
        </Link>
      )}
    </li>
  );
}

/**
 * Replaces the stock footer so the site can carry a brand block, a feed
 * sign-up, and a theme control alongside the config-driven link columns.
 * The columns themselves still come from `themeConfig.footer.links`, so adding
 * a link stays a one-line config change.
 */
export default function Footer(): ReactNode {
  const { footer } = useThemeConfig();
  const { siteConfig } = useDocusaurusContext();

  // Hooks must run unconditionally, so these are resolved before the early
  // return for sites that disable the footer entirely.
  const logoUrl = useBaseUrl('img/logo.svg');
  const rssUrl = useBaseUrl('/blog/rss.xml');
  const atomUrl = useBaseUrl('/blog/atom.xml');

  if (!footer) {
    return null;
  }

  const columns = (footer.links ?? []) as FooterColumn[];
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandMark}>
              <img src={logoUrl} alt="" width={30} height={30} loading="lazy" />
              <span>{siteConfig.title}</span>
            </Link>
            <p className={styles.brandBlurb}>
              Practical, technically accurate guides for Kubernetes, containers, and the tooling
              that runs them. Open source and MIT licensed.
            </p>

            <div className={styles.feed}>
              <p className={styles.feedTitle}>Follow along</p>
              <p className={styles.feedNote}>
                No newsletter and no tracking — just a feed. Point any reader at it.
              </p>
              <div className={styles.feedActions}>
                <a className={styles.feedButton} href={rssUrl}>
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="6" cy="18" r="2.2" />
                    <path d="M4 4a16 16 0 0 1 16 16h-3A13 13 0 0 0 4 7Z" />
                    <path d="M4 10.5A9.5 9.5 0 0 1 13.5 20h-3A6.5 6.5 0 0 0 4 13.5Z" />
                  </svg>
                  RSS
                </a>
                <a className={styles.feedButton} href={atomUrl}>
                  Atom
                </a>
                <Link
                  className={styles.feedButton}
                  to={`https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`}
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {columns.map((column, index) => (
              <div key={column.title ?? index} className={styles.column}>
                {column.title ? <h2 className={styles.columnTitle}>{column.title}</h2> : null}
                <ul className={styles.list}>
                  {column.items.map((item) => (
                    <FooterItem key={item.label ?? item.href ?? item.to} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} {siteConfig.title}. Content licensed MIT. Built with Docusaurus.
          </p>
          <ThemeToggle showLabel />
        </div>
      </div>
    </footer>
  );
}
