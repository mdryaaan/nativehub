import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type { ReactNode } from 'react';

import ThemeToggle from '@site/src/components/ThemeToggle';
import CalloutBox from '@site/src/components/CalloutBox';
import styles from './tools.module.css';
import local from './about.module.css';

const PRINCIPLES = [
  {
    title: 'Technically correct, or not published',
    body: 'Every command here is written to run as-is, and every explanation is checked against the upstream documentation or source. Where something is genuinely ambiguous, the page says so rather than papering over it.',
  },
  {
    title: 'Explain the mechanism, not just the recipe',
    body: 'Knowing that a ClusterIP is a virtual address maintained by kube-proxy as iptables rules is what lets you debug it. A copy-pasteable YAML block without that context is worth very little at 3am.',
  },
  {
    title: 'Show the failure modes',
    body: 'Most documentation shows the happy path. The interesting part is what breaks: RollingUpdate deadlocking on an RWO volume, ndots:5 quadrupling DNS lookups, a version label leaking into an immutable selector.',
  },
  {
    title: 'No vendor pitch',
    body: 'Nothing here is sponsored and no link is affiliate. Tool recommendations name the licence and link upstream. Where a project is only partly open source, the page says that too.',
  },
];

const STACK = [
  { name: 'Docusaurus 3', role: 'Static site framework, docs and blog plugins' },
  { name: 'React 19 + TypeScript', role: 'Components and pages, fully typed' },
  { name: 'Tailwind CSS', role: 'Utility layer, alongside Infima and CSS Modules' },
  { name: 'MDX', role: 'Markdown with real React components inside it' },
  { name: 'GitHub Actions', role: 'Build, link check, lint, and format check on every PR' },
  { name: 'GitHub Pages', role: 'Hosting, deployed from main' },
];

export default function About(): ReactNode {
  return (
    <Layout
      title="About"
      description="What NativeHub is, who maintains it, the principles behind the content, and how to contribute."
    >
      <header className={styles.header}>
        <div className="container">
          <p className={styles.eyebrow}>About</p>
          <h1 className={styles.title}>A developer hub for cloud native work</h1>
          <p className={styles.lead}>
            NativeHub is an open source documentation and learning resource for Kubernetes,
            containers, and the tooling around them — written for people who have to make this
            stuff work, not just pass a certification.
          </p>
        </div>
      </header>

      <main className="container margin-bottom--xl">
        <div className={local.layout}>
          <div className={local.main}>
            <section>
              <h2 className={styles.sectionTitle}>Why it exists</h2>
              <p className={local.prose}>
                There is no shortage of Kubernetes content. There is a shortage of content that
                is simultaneously accurate, current, and honest about where the sharp edges are.
                Most tutorials stop at <code>kubectl apply</code> and a green checkmark; most
                reference documentation assumes you already know which page you need.
              </p>
              <p className={local.prose}>
                This site tries to sit in between. The <Link to="/docs/learn">Learn</Link>{' '}
                section explains mechanisms — what a Service actually is, what a Deployment
                actually manages, what <code>config.json</code> actually contains. The{' '}
                <Link to="/docs/guides">Guides</Link> section is task-shaped and end to end. The{' '}
                <Link to="/tools">Tools</Link> and <Link to="/resources">Resources</Link> pages
                are the things worth keeping close once you already know your way around.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionTitle}>Editorial principles</h2>
              <div className={local.principles}>
                {PRINCIPLES.map((principle) => (
                  <article key={principle.title} className={local.principle}>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className={styles.sectionTitle}>Contributing</h2>
              <p className={local.prose}>
                Corrections are the most valuable contribution. If something here is wrong, out
                of date, or misleading, please open an issue — being wrong in public is only
                useful if it gets fixed.
              </p>
              <ul className={local.contribList}>
                <li>
                  <strong>Found an error?</strong> Every doc page has an “Edit this page” link
                  at the bottom that takes you straight to the source file on GitHub.
                </li>
                <li>
                  <strong>Want to add a page?</strong>{' '}
                  <Link to="https://github.com/mdryaaan/nativehub/blob/main/CONTRIBUTING.md">
                    CONTRIBUTING.md
                  </Link>{' '}
                  covers the local setup, file conventions, and the PR checklist.
                </li>
                <li>
                  <strong>Have a question?</strong> Open a GitHub Discussion rather than an
                  issue, so the answer stays searchable for the next person.
                </li>
              </ul>

              <CalloutBox variant="info" title="Licensing">
                All content and code in this repository is MIT licensed. Reuse it, adapt it,
                teach from it — attribution is appreciated but not required.
              </CalloutBox>
            </section>

            <section>
              <h2 className={styles.sectionTitle}>Accessibility</h2>
              <p className={local.prose}>
                Accessibility is treated as a build requirement rather than a nice-to-have.
                Every page uses a single <code>h1</code> with a correctly nested heading
                hierarchy, all interactive elements are keyboard reachable with a visible focus
                ring, decorative graphics are marked <code>aria-hidden</code>, and body text
                meets WCAG AA contrast in both colour themes. Animations respect{' '}
                <code>prefers-reduced-motion</code>. If you hit something that does not work
                with your assistive technology, that is a bug worth filing.
              </p>
            </section>
          </div>

          <aside className={local.side}>
            <div className={local.card}>
              <h2 className={local.cardTitle}>Maintainer</h2>
              <p className={local.cardBody}>
                Built and maintained by <strong>Md Raiyan</strong>, who writes mostly Go and
                spends more time reading controller source than is strictly reasonable.
              </p>
              <Link
                className="button button--primary button--block"
                to="https://github.com/mdryaaan"
              >
                GitHub profile
              </Link>
            </div>

            <div className={local.card}>
              <h2 className={local.cardTitle}>Built with</h2>
              <ul className={local.stack}>
                {STACK.map((item) => (
                  <li key={item.name}>
                    <span className={local.stackName}>{item.name}</span>
                    <span className={local.stackRole}>{item.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={local.card}>
              <h2 className={local.cardTitle}>Appearance</h2>
              <p className={local.cardBody}>
                Both themes are designed rather than generated. Your choice is stored locally
                and applied before first paint, so it survives reloads without a flash.
              </p>
              <ThemeToggle />
            </div>

            <div className={local.card}>
              <h2 className={local.cardTitle}>Stay updated</h2>
              <p className={local.cardBody}>
                No newsletter, no tracking. Point any feed reader at the blog.
              </p>
              <div className={local.feedLinks}>
                <a
                  className="button button--secondary button--sm"
                  href={useBaseUrl('/blog/rss.xml')}
                >
                  RSS
                </a>
                <a
                  className="button button--secondary button--sm"
                  href={useBaseUrl('/blog/atom.xml')}
                >
                  Atom
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
}
