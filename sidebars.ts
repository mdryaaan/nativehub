import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Two independent sidebars back the two top-level docs sections, so a reader
 * inside "Learn" is never shown the "Guides" tree and vice versa.
 *
 * The ordering below is deliberate: concepts build on one another, so the
 * sidebar doubles as a suggested reading order.
 */
const sidebars: SidebarsConfig = {
  learnSidebar: [
    {
      type: 'category',
      label: 'Learn',
      collapsible: false,
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Learn cloud native',
        description:
          'Concept-first explanations of the container and Kubernetes primitives you will meet every day. Start at Docker fundamentals and work down.',
        slug: '/learn',
        keywords: ['kubernetes', 'docker', 'containers', 'helm'],
      },
      items: [
        'learn/docker-fundamentals',
        'learn/kubernetes-fundamentals',
        'learn/kubernetes-networking',
        'learn/kubernetes-storage',
        'learn/kubernetes-security-basics',
        'learn/helm-basics',
      ],
    },
  ],

  guidesSidebar: [
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Hands-on guides',
        description:
          'Task-shaped walkthroughs. Every command here has been written to run as-is against a local cluster.',
        slug: '/guides',
        keywords: ['tutorial', 'kubernetes', 'ci/cd', 'helm'],
      },
      items: [
        'guides/deploy-first-app',
        'guides/build-docker-image',
        'guides/write-first-helm-chart',
        'guides/setup-cicd-github-actions',
        'guides/debugging-pod-failures',
      ],
    },
  ],
};

export default sidebars;
