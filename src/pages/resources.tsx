import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { ReactNode } from 'react';

import LearningRoadmap, { type RoadmapStep } from '@site/src/components/LearningRoadmap';
import CalloutBox from '@site/src/components/CalloutBox';
import styles from './tools.module.css';
import local from './resources.module.css';

/* -------------------------------------------------------------------------- */
/* Official documentation                                                     */
/* -------------------------------------------------------------------------- */

interface DocLink {
  name: string;
  href: string;
  note: string;
}

interface DocGroup {
  title: string;
  blurb: string;
  links: DocLink[];
}

const DOC_GROUPS: DocGroup[] = [
  {
    title: 'Kubernetes',
    blurb: 'Start with Concepts, not the Tasks section — the mental model saves far more time.',
    links: [
      {
        name: 'Kubernetes documentation',
        href: 'https://kubernetes.io/docs/home/',
        note: 'The canonical source. Concepts, Tasks, Tutorials, and the full API reference.',
      },
      {
        name: 'API reference',
        href: 'https://kubernetes.io/docs/reference/kubernetes-api/',
        note: 'Every field of every built-in object, versioned. The answer to “what can I put here?”.',
      },
      {
        name: 'kubectl reference',
        href: 'https://kubernetes.io/docs/reference/kubectl/',
        note: 'Command reference plus the official cheat sheet and JSONPath guide.',
      },
      {
        name: 'Kubernetes Enhancement Proposals',
        href: 'https://github.com/kubernetes/enhancements/tree/master/keps',
        note: 'Where features are designed. The best way to understand why something works the way it does.',
      },
      {
        name: 'Kubernetes blog',
        href: 'https://kubernetes.io/blog/',
        note: 'Release announcements and deep dives written by the people who built the feature.',
      },
    ],
  },
  {
    title: 'Containers & runtimes',
    blurb: 'The specifications are shorter and more readable than most people expect.',
    links: [
      {
        name: 'Docker documentation',
        href: 'https://docs.docker.com/',
        note: 'Dockerfile reference, BuildKit, Compose, and the CLI.',
      },
      {
        name: 'OCI Image Specification',
        href: 'https://github.com/opencontainers/image-spec',
        note: 'What an image actually is: manifest, config, layers, and the index.',
      },
      {
        name: 'OCI Runtime Specification',
        href: 'https://github.com/opencontainers/runtime-spec',
        note: 'The bundle and config.json format every low-level runtime consumes.',
      },
      {
        name: 'containerd documentation',
        href: 'https://containerd.io/docs/',
        note: 'Architecture, the CRI plugin, and how snapshots and shims fit together.',
      },
      {
        name: 'BuildKit documentation',
        href: 'https://docs.docker.com/build/buildkit/',
        note: 'Cache mounts, build secrets, and multi-platform builds.',
      },
    ],
  },
  {
    title: 'Packaging & delivery',
    blurb: 'Two competing philosophies — templating versus overlays. Learn both, pick per project.',
    links: [
      {
        name: 'Helm documentation',
        href: 'https://helm.sh/docs/',
        note: 'Chart structure, the template language, and the best-practices guide.',
      },
      {
        name: 'Kustomize documentation',
        href: 'https://kubectl.docs.kubernetes.io/references/kustomize/',
        note: 'Overlays and patches, with no templating language at all.',
      },
      {
        name: 'Argo CD documentation',
        href: 'https://argo-cd.readthedocs.io/',
        note: 'The reference implementation of GitOps continuous delivery.',
      },
      {
        name: 'Flux documentation',
        href: 'https://fluxcd.io/flux/',
        note: 'A GitOps toolkit built from composable controllers rather than one application.',
      },
    ],
  },
  {
    title: 'Ecosystem & landscape',
    blurb: 'For working out what a project actually does before you adopt it.',
    links: [
      {
        name: 'CNCF Landscape',
        href: 'https://landscape.cncf.io/',
        note: 'An interactive map of the cloud native ecosystem, with maturity levels and licences.',
      },
      {
        name: 'CNCF project maturity levels',
        href: 'https://www.cncf.io/project-metrics/',
        note: 'Sandbox, Incubating, Graduated — and what each one actually guarantees.',
      },
      {
        name: 'Gateway API',
        href: 'https://gateway-api.sigs.k8s.io/',
        note: 'The role-oriented successor to Ingress. Worth reading before starting anything new.',
      },
      {
        name: 'Prometheus documentation',
        href: 'https://prometheus.io/docs/',
        note: 'The de facto metrics standard, and PromQL, which is worth learning properly.',
      },
      {
        name: 'OpenTelemetry documentation',
        href: 'https://opentelemetry.io/docs/',
        note: 'Vendor-neutral traces, metrics, and logs. The instrumentation layer to standardise on.',
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Repositories worth reading                                                 */
/* -------------------------------------------------------------------------- */

interface Repo {
  name: string;
  href: string;
  language: string;
  why: string;
  start: string;
}

const REPOS: Repo[] = [
  {
    name: 'kubernetes/kubernetes',
    href: 'https://github.com/kubernetes/kubernetes',
    language: 'Go',
    why: 'The project itself. Enormous, but the controller implementations are surprisingly readable and are the definitive answer to “what does this actually do?”.',
    start: 'pkg/controller/deployment — the rollout logic described in every tutorial, in code.',
  },
  {
    name: 'kubernetes-sigs/kubebuilder',
    href: 'https://github.com/kubernetes-sigs/kubebuilder',
    language: 'Go',
    why: 'The framework and book for building your own controllers. Writing one operator teaches more about how Kubernetes works than months of using it.',
    start: 'The Kubebuilder Book’s CronJob tutorial, start to finish.',
  },
  {
    name: 'opencontainers/runc',
    href: 'https://github.com/opencontainers/runc',
    language: 'Go / C',
    why: 'The reference OCI runtime. Small enough to read end to end, and it is where containers are literally created.',
    start: 'libcontainer/ — the namespace and cgroup setup, and nsexec.c for the clone dance.',
  },
  {
    name: 'containerd/containerd',
    href: 'https://github.com/containerd/containerd',
    language: 'Go',
    why: 'A CNCF graduated runtime with a genuinely clean plugin architecture. A good model for how to structure a large Go daemon.',
    start: 'docs/ then the CRI plugin under internal/cri.',
  },
  {
    name: 'helm/helm',
    href: 'https://github.com/helm/helm',
    language: 'Go',
    why: 'Shows how rendering, release storage, and the three-way merge upgrade strategy actually work — which explains most surprising Helm behaviour.',
    start: 'pkg/action/upgrade.go',
  },
  {
    name: 'prometheus/prometheus',
    href: 'https://github.com/prometheus/prometheus',
    language: 'Go',
    why: 'An exemplary Go codebase. The TSDB implementation is a genuinely good storage-engine tutorial in its own right.',
    start: 'tsdb/docs/format/ — the on-disk format, documented properly.',
  },
  {
    name: 'cilium/cilium',
    href: 'https://github.com/cilium/cilium',
    language: 'Go / C (eBPF)',
    why: 'Networking, observability, and security implemented with eBPF instead of iptables. The best entry point into kernel-level networking.',
    start: 'Documentation/ then bpf/ for the datapath programs.',
  },
  {
    name: 'kubernetes/website',
    href: 'https://github.com/kubernetes/website',
    language: 'Markdown / Hugo',
    why: 'Not code, but the easiest place to make a first meaningful open source contribution — and reviewers are patient with newcomers.',
    start: 'The “good first issue” label on the issue tracker.',
  },
];

/* -------------------------------------------------------------------------- */
/* Roadmap                                                                    */
/* -------------------------------------------------------------------------- */

const ROADMAP: RoadmapStep[] = [
  {
    title: 'Container basics',
    duration: '1–2 weeks',
    outcome:
      'explain what a container is at the kernel level, write a cache-efficient multi-stage Dockerfile, and publish a multi-architecture image.',
    items: [
      { label: 'Docker fundamentals', to: '/docs/learn/docker-fundamentals' },
      { label: 'Build a Docker image', to: '/docs/guides/build-docker-image' },
      { label: 'Docker vs containerd vs runc', to: '/blog/docker-vs-containerd-vs-runc' },
      { label: 'What is an OCI bundle?', to: '/blog/what-is-oci-bundle' },
      { label: 'Namespaces, cgroups, overlayfs' },
      { label: 'Registries and image digests' },
    ],
  },
  {
    title: 'Kubernetes fundamentals',
    duration: '3–4 weeks',
    outcome:
      'deploy and expose an application, read a failing pod’s events and logs to a root cause, and choose the right controller for a workload.',
    items: [
      { label: 'Kubernetes fundamentals', to: '/docs/learn/kubernetes-fundamentals' },
      { label: 'Pods vs Deployments', to: '/blog/pods-vs-deployments' },
      { label: 'Deploy your first app', to: '/docs/guides/deploy-first-app' },
      { label: 'Kubernetes networking', to: '/docs/learn/kubernetes-networking' },
      { label: 'Kubernetes storage', to: '/docs/learn/kubernetes-storage' },
      { label: 'Multi-node clusters with kind', to: '/blog/multi-node-cluster-kind' },
      { label: 'Debugging pod failures', to: '/docs/guides/debugging-pod-failures' },
    ],
  },
  {
    title: 'Packaging & automation',
    duration: '3–4 weeks',
    outcome:
      'package an application as a chart that works across environments, and ship it through a pipeline that builds, scans, signs, and deploys.',
    items: [
      { label: 'Helm basics', to: '/docs/learn/helm-basics' },
      { label: 'Write your first Helm chart', to: '/docs/guides/write-first-helm-chart' },
      { label: 'CI/CD with GitHub Actions', to: '/docs/guides/setup-cicd-github-actions' },
      { label: 'Kustomize overlays' },
      { label: 'GitOps with Argo CD or Flux' },
    ],
  },
  {
    title: 'Production practices',
    duration: 'Ongoing',
    outcome:
      'run workloads safely: least-privilege RBAC, hardened pods, meaningful SLOs, and an on-call runbook you would trust at 3am.',
    items: [
      { label: 'Kubernetes security basics', to: '/docs/learn/kubernetes-security-basics' },
      { label: 'Pod Security Admission & NetworkPolicy' },
      { label: 'Resource tuning, QoS, and autoscaling' },
      { label: 'Prometheus, Grafana, OpenTelemetry' },
      { label: 'Multi-cluster and disaster recovery' },
      { label: 'Cost visibility and rightsizing' },
    ],
  },
];

/* -------------------------------------------------------------------------- */

export default function Resources(): ReactNode {
  return (
    <Layout
      title="Resources"
      description="Curated official documentation, open source repositories worth studying, and a structured learning roadmap from container basics to production practices."
    >
      <header className={styles.header}>
        <div className="container">
          <p className={styles.eyebrow}>Curated</p>
          <h1 className={styles.title}>Resources</h1>
          <p className={styles.lead}>
            The documentation actually worth bookmarking, the repositories worth reading, and a
            path through them that does not assume you already know the answer.
          </p>
        </div>
      </header>

      <main className="container margin-bottom--xl">
        <section aria-labelledby="roadmap">
          <h2 id="roadmap" className={styles.sectionTitle}>
            Learning roadmap
          </h2>
          <p className={styles.sectionLead}>
            Four stages, in order. The durations assume a few focused hours a week alongside a job —
            treat them as a sanity check, not a deadline.
          </p>

          <LearningRoadmap steps={ROADMAP} />

          <CalloutBox variant="tip" title="Build something at every stage">
            Reading about Kubernetes produces the illusion of understanding remarkably fast. Every
            stage above should end with something running on a real cluster that you had to debug.
          </CalloutBox>
        </section>

        <section aria-labelledby="official">
          <h2 id="official" className={styles.sectionTitle}>
            Official documentation
          </h2>
          <p className={styles.sectionLead}>
            Primary sources only. When a blog post and the official docs disagree, the docs are
            usually right and always more current.
          </p>

          <div className={local.docGrid}>
            {DOC_GROUPS.map((group) => (
              <section key={group.title} className={local.docGroup}>
                <h3 className={local.docGroupTitle}>{group.title}</h3>
                <p className={local.docGroupBlurb}>{group.blurb}</p>
                <ul className={local.docList}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className={local.docLink}>
                        {link.name}
                        <svg
                          aria-hidden="true"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </Link>
                      <span className={local.docNote}>{link.note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby="repos">
          <h2 id="repos" className={styles.sectionTitle}>
            Repositories worth studying
          </h2>
          <p className={styles.sectionLead}>
            Reading production code is the fastest way past the tutorial plateau. Each entry
            includes a concrete place to start rather than “browse the repo”.
          </p>

          <div className={local.repoList}>
            {REPOS.map((repo) => (
              <article key={repo.name} className={local.repo}>
                <div className={local.repoHead}>
                  <h3 className={local.repoName}>
                    <Link to={repo.href}>{repo.name}</Link>
                  </h3>
                  <span className={local.repoLang}>{repo.language}</span>
                </div>
                <p className={local.repoWhy}>{repo.why}</p>
                <p className={local.repoStart}>
                  <strong>Start with:</strong> {repo.start}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
