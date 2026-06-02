import { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import CheatSheetTable, { type CheatSheetRow } from '@site/src/components/CheatSheetTable';
import styles from './tools.module.css';

/* -------------------------------------------------------------------------- */
/* Cheat sheet data                                                           */
/* -------------------------------------------------------------------------- */

const KUBECTL: CheatSheetRow[] = [
  {
    group: 'Context',
    command: 'kubectl config get-contexts',
    description: 'List every configured cluster context.',
  },
  {
    group: 'Context',
    command: 'kubectl config use-context <name>',
    description: 'Switch the active cluster.',
  },
  {
    group: 'Context',
    command: 'kubectl config set-context --current --namespace=<ns>',
    description: 'Set the default namespace so you can stop typing -n.',
  },
  {
    group: 'Context',
    command: 'kubectl cluster-info',
    description: 'Show the control plane and CoreDNS endpoints.',
  },
  {
    group: 'Context',
    command: 'kubectl api-resources',
    description: 'Every resource kind the cluster knows, with short names.',
  },
  {
    group: 'Context',
    command: 'kubectl explain deploy.spec.strategy',
    description: 'Inline schema documentation for any field path.',
  },

  {
    group: 'Inspect',
    command: 'kubectl get pods -o wide',
    description: 'Pods with node, pod IP, and nominated node columns.',
  },
  {
    group: 'Inspect',
    command: 'kubectl get all -n <ns>',
    description: 'The common workload kinds in one namespace.',
  },
  {
    group: 'Inspect',
    command: 'kubectl get pods -A --field-selector=status.phase!=Running',
    description: 'Everything that is not healthy, cluster wide.',
  },
  {
    group: 'Inspect',
    command: 'kubectl get pods --sort-by=.status.containerStatuses[0].restartCount',
    description: 'Rank pods by restart count — the fastest way to spot a crash loop.',
  },
  {
    group: 'Inspect',
    command: "kubectl get pod <pod> -o jsonpath='{.spec.nodeName}'",
    description: 'Extract a single field for scripting.',
  },
  {
    group: 'Inspect',
    command: 'kubectl describe pod <pod>',
    description: 'Full state plus the Events that explain it. Read the bottom first.',
  },
  {
    group: 'Inspect',
    command: 'kubectl get events --sort-by=.lastTimestamp',
    description: 'Cluster events in chronological order.',
  },
  {
    group: 'Inspect',
    command: 'kubectl top pod --containers',
    description: 'Live CPU and memory per container (needs metrics-server).',
  },
  {
    group: 'Inspect',
    command: 'kubectl get endpointslices -l kubernetes.io/service-name=<svc>',
    description: 'The ready pod IPs actually behind a Service.',
  },

  {
    group: 'Debug',
    command: 'kubectl logs <pod> --previous',
    description: 'Logs from the container instance that crashed, not the new one.',
  },
  {
    group: 'Debug',
    command: 'kubectl logs -l app=web --prefix --all-containers -f',
    description: 'Follow logs from every pod matching a label.',
  },
  {
    group: 'Debug',
    command: 'kubectl logs <pod> --since=15m --timestamps',
    description: 'Recent logs with timestamps attached.',
  },
  {
    group: 'Debug',
    command: 'kubectl exec -it <pod> -- sh',
    description: 'Interactive shell inside a running container.',
  },
  {
    group: 'Debug',
    command: 'kubectl exec <pod> -- env | sort',
    description: 'Dump the container environment without an interactive session.',
  },
  {
    group: 'Debug',
    command: 'kubectl debug -it <pod> --image=nicolaka/netshoot --target=<container>',
    description: 'Ephemeral debug container sharing the pod namespaces. Works on distroless.',
  },
  {
    group: 'Debug',
    command: 'kubectl port-forward svc/<name> 8080:80',
    description: 'Tunnel a Service port to localhost through the API server.',
  },
  {
    group: 'Debug',
    command: 'kubectl cp <pod>:/var/log/app.log ./app.log',
    description: 'Copy a file out of a container.',
  },
  {
    group: 'Debug',
    command: 'kubectl auth can-i <verb> <resource> --as <user>',
    description: 'Check RBAC without trial and error.',
  },

  {
    group: 'Change',
    command: 'kubectl apply -f <file|dir>',
    description: 'Create or update via a three-way merge. The only one safe to repeat.',
  },
  {
    group: 'Change',
    command: 'kubectl diff -f <file>',
    description: 'Show exactly what applying would change on the live object.',
  },
  {
    group: 'Change',
    command: 'kubectl apply -f <file> --dry-run=server',
    description: 'Validate against the real API server without writing anything.',
  },
  {
    group: 'Change',
    command: 'kubectl scale deploy/<name> --replicas=5',
    description: 'Change replica count immediately.',
  },
  {
    group: 'Change',
    command: 'kubectl set image deploy/<name> <container>=<image>',
    description: 'Trigger a rolling update to a new image.',
  },
  {
    group: 'Change',
    command: 'kubectl rollout status deploy/<name> --timeout=120s',
    description: 'Block until the rollout completes or times out.',
  },
  {
    group: 'Change',
    command: 'kubectl rollout restart deploy/<name>',
    description: 'Recreate every pod with no spec change, respecting surge limits.',
  },
  {
    group: 'Change',
    command: 'kubectl rollout undo deploy/<name> --to-revision=2',
    description: 'Scale a previous ReplicaSet back up.',
  },
  {
    group: 'Change',
    command: 'kubectl label pod <pod> tier=canary --overwrite',
    description: 'Add or change a label in place.',
  },
  {
    group: 'Change',
    command: 'kubectl delete pod <pod> --grace-period=0 --force',
    description: 'Last resort for a stuck pod. Skips graceful shutdown.',
  },

  {
    group: 'Nodes',
    command: 'kubectl get nodes -o wide',
    description: 'Node status, roles, versions, and internal IPs.',
  },
  {
    group: 'Nodes',
    command: 'kubectl describe node <node>',
    description: 'Conditions, allocatable resources, and what is already claimed.',
  },
  {
    group: 'Nodes',
    command: 'kubectl drain <node> --ignore-daemonsets --delete-emptydir-data',
    description: 'Evict workloads before maintenance.',
  },
  {
    group: 'Nodes',
    command: 'kubectl uncordon <node>',
    description: 'Mark a node schedulable again.',
  },
  {
    group: 'Nodes',
    command: 'kubectl taint node <node> key=value:NoSchedule',
    description: 'Repel pods that do not tolerate the taint.',
  },
];

const DOCKER: CheatSheetRow[] = [
  {
    group: 'Images',
    command: 'docker build -t app:1.0 .',
    description: 'Build from the Dockerfile in the current directory.',
  },
  {
    group: 'Images',
    command: 'docker build --secret id=npmrc,src=$HOME/.npmrc -t app:1.0 .',
    description: 'Pass a credential without baking it into a layer.',
  },
  {
    group: 'Images',
    command: 'docker buildx build --platform linux/amd64,linux/arm64 -t app:1.0 --push .',
    description: 'Build and publish a multi-architecture manifest list.',
  },
  {
    group: 'Images',
    command: 'docker images',
    description: 'Locally stored images with sizes.',
  },
  {
    group: 'Images',
    command: 'docker history app:1.0',
    description: 'Layer-by-layer breakdown — where the megabytes went.',
  },
  {
    group: 'Images',
    command: 'docker tag app:1.0 ghcr.io/owner/app:1.0',
    description: 'Add a second reference to the same image.',
  },
  {
    group: 'Images',
    command: 'docker push ghcr.io/owner/app:1.0',
    description: 'Upload to a registry.',
  },
  {
    group: 'Images',
    command: 'docker manifest inspect nginx:1.27-alpine',
    description: 'Inspect a remote image without pulling it.',
  },
  {
    group: 'Images',
    command: 'docker save app:1.0 | gzip > app.tar.gz',
    description: 'Export an image as a portable archive.',
  },

  {
    group: 'Containers',
    command: 'docker run -d --rm -p 8080:80 --name web nginx:1.27-alpine',
    description: 'Detached, auto-removed on exit, port published.',
  },
  {
    group: 'Containers',
    command: 'docker run -it --rm --entrypoint sh app:1.0',
    description: 'Override the entrypoint to poke around inside an image.',
  },
  {
    group: 'Containers',
    command: 'docker run --memory=512m --cpus=1.5 app:1.0',
    description: 'Apply cgroup resource limits.',
  },
  {
    group: 'Containers',
    command: 'docker ps -a',
    description: 'All containers, including exited ones.',
  },
  {
    group: 'Containers',
    command: 'docker logs -f --tail=100 web',
    description: 'Follow the last 100 lines of output.',
  },
  {
    group: 'Containers',
    command: 'docker exec -it web sh',
    description: 'Shell into a running container.',
  },
  {
    group: 'Containers',
    command: "docker inspect web --format '{{.State.ExitCode}} {{.State.OOMKilled}}'",
    description: 'Why did it stop? 137 usually means the OOM killer.',
  },
  {
    group: 'Containers',
    command: 'docker stats',
    description: 'Live per-container resource accounting.',
  },
  {
    group: 'Containers',
    command: 'docker cp web:/etc/nginx/nginx.conf ./nginx.conf',
    description: 'Copy a file out of a container.',
  },

  {
    group: 'Volumes',
    command: 'docker volume create pgdata',
    description: 'Create a named, Docker-managed volume.',
  },
  {
    group: 'Volumes',
    command: 'docker run -v pgdata:/var/lib/postgresql/data postgres:17-alpine',
    description: 'Mount a named volume — survives container removal.',
  },
  {
    group: 'Volumes',
    command: 'docker run -v "$PWD":/app -w /app node:22-alpine npm test',
    description: 'Bind mount the working directory for local development.',
  },
  { group: 'Volumes', command: 'docker volume ls', description: 'List volumes.' },

  {
    group: 'Networks',
    command: 'docker network create appnet',
    description: 'A user-defined bridge, which enables DNS by container name.',
  },
  {
    group: 'Networks',
    command: 'docker run --network appnet --name db postgres:17-alpine',
    description: 'Join a network so other containers can reach it as "db".',
  },
  {
    group: 'Networks',
    command: 'docker network inspect appnet',
    description: 'See which containers are attached and their IPs.',
  },

  {
    group: 'Cleanup',
    command: 'docker system df',
    description: 'Where the disk actually went.',
  },
  {
    group: 'Cleanup',
    command: 'docker container prune',
    description: 'Remove all stopped containers.',
  },
  {
    group: 'Cleanup',
    command: 'docker image prune -a',
    description: 'Remove every image not referenced by a container.',
  },
  {
    group: 'Cleanup',
    command: 'docker builder prune',
    description: 'Clear the BuildKit cache.',
  },
  {
    group: 'Cleanup',
    command: 'docker system prune -a --volumes',
    description: 'Reclaim everything. Deletes volume data — be certain.',
  },
];

const HELM: CheatSheetRow[] = [
  {
    group: 'Repos',
    command: 'helm repo add bitnami https://charts.bitnami.com/bitnami',
    description: 'Register a chart repository.',
  },
  {
    group: 'Repos',
    command: 'helm repo update',
    description: 'Refresh the local index for every repo.',
  },
  {
    group: 'Repos',
    command: 'helm search repo postgresql --versions',
    description: 'Find charts and list every available version.',
  },
  {
    group: 'Repos',
    command: 'helm show values bitnami/postgresql',
    description: 'Print a chart’s default values before installing it.',
  },
  {
    group: 'Repos',
    command: 'helm registry login ghcr.io -u OWNER',
    description: 'Authenticate to an OCI registry hosting charts.',
  },

  {
    group: 'Release',
    command: 'helm upgrade --install web ./chart -n prod --create-namespace',
    description: 'Idempotent install-or-upgrade. Use this, not `helm install`.',
  },
  {
    group: 'Release',
    command: 'helm upgrade web ./chart --atomic --timeout 5m',
    description: 'Roll back automatically if the upgrade does not become ready.',
  },
  {
    group: 'Release',
    command: 'helm upgrade web ./chart -f values-prod.yaml --set image.tag=1.4.2',
    description: 'Layer a values file and a targeted override.',
  },
  {
    group: 'Release',
    command: 'helm upgrade web ./chart --set-string image.tag=1.10',
    description: 'Force a string — plain --set turns 1.10 into the float 1.1.',
  },
  {
    group: 'Release',
    command: 'helm list -A',
    description: 'Every release in every namespace.',
  },
  {
    group: 'Release',
    command: 'helm history web -n prod',
    description: 'Revision history with status and chart version.',
  },
  {
    group: 'Release',
    command: 'helm rollback web 3 -n prod --wait',
    description: 'Return to a specific revision.',
  },
  {
    group: 'Release',
    command: 'helm uninstall web -n prod',
    description: 'Remove a release. PVCs from volumeClaimTemplates are kept.',
  },

  {
    group: 'Debug',
    command: 'helm template rel ./chart -f values-prod.yaml',
    description: 'Render templates offline — no cluster contact at all.',
  },
  {
    group: 'Debug',
    command: 'helm template rel ./chart -s templates/deployment.yaml',
    description: 'Render exactly one file.',
  },
  {
    group: 'Debug',
    command: 'helm install rel ./chart --dry-run --debug',
    description: 'Render and validate against the live API server.',
  },
  {
    group: 'Debug',
    command: 'helm get values web -n prod --all',
    description: 'Merged values, including chart defaults.',
  },
  {
    group: 'Debug',
    command: 'helm get manifest web -n prod',
    description: 'The exact YAML that was applied.',
  },
  {
    group: 'Debug',
    command: 'helm lint ./chart --strict',
    description: 'Catch template and schema problems before install.',
  },

  {
    group: 'Author',
    command: 'helm create mychart',
    description: 'Scaffold a chart with sensible defaults.',
  },
  {
    group: 'Author',
    command: 'helm dependency update ./chart',
    description: 'Resolve subcharts and write Chart.lock.',
  },
  {
    group: 'Author',
    command: 'helm package ./chart',
    description: 'Produce a versioned .tgz artifact.',
  },
  {
    group: 'Author',
    command: 'helm push mychart-1.4.2.tgz oci://ghcr.io/owner/charts',
    description: 'Publish to an OCI registry.',
  },
  {
    group: 'Author',
    command: 'helm test web -n prod --logs',
    description: 'Run the chart’s test hooks against a live release.',
  },
];

/* -------------------------------------------------------------------------- */
/* CLI tool directory — every entry is a real, actively maintained project     */
/* -------------------------------------------------------------------------- */

interface Tool {
  name: string;
  tagline: string;
  detail: string;
  href: string;
  install: string;
  category: 'Cluster' | 'Containers' | 'Observability' | 'Delivery' | 'Security';
  license: string;
}

const TOOLS: Tool[] = [
  {
    name: 'k9s',
    tagline: 'Terminal UI for Kubernetes',
    detail:
      'A full-screen curses interface over the cluster. Navigate resources, tail logs, exec into pods, and edit objects without typing a kubectl command. Replaces most of the get/describe loop.',
    href: 'https://github.com/derailed/k9s',
    install: 'brew install k9s',
    category: 'Cluster',
    license: 'Apache-2.0',
  },
  {
    name: 'kubectx + kubens',
    tagline: 'Switch cluster and namespace in one word',
    detail:
      'Two tiny scripts that replace the verbose kubectl config incantations. With fzf installed they become interactive pickers.',
    href: 'https://github.com/ahmetb/kubectx',
    install: 'brew install kubectx',
    category: 'Cluster',
    license: 'Apache-2.0',
  },
  {
    name: 'stern',
    tagline: 'Multi-pod log tailing',
    detail:
      'Tail logs from every pod matching a regex, colour-coded per pod, following new pods as they appear. What kubectl logs -f should have been.',
    href: 'https://github.com/stern/stern',
    install: 'brew install stern',
    category: 'Observability',
    license: 'Apache-2.0',
  },
  {
    name: 'Lens',
    tagline: 'Desktop IDE for Kubernetes',
    detail:
      'A graphical cluster browser with built-in metrics, terminal, and multi-cluster management. The freely available OpenLens builds are community-maintained from the open source core.',
    href: 'https://k8slens.dev/',
    install: 'Download from k8slens.dev',
    category: 'Cluster',
    license: 'Mixed / proprietary',
  },
  {
    name: 'kind',
    tagline: 'Kubernetes in Docker',
    detail:
      'Runs each node as a Docker container. Multi-node clusters in about thirty seconds, and what the Kubernetes project itself uses for conformance testing.',
    href: 'https://kind.sigs.k8s.io/',
    install: 'brew install kind',
    category: 'Cluster',
    license: 'Apache-2.0',
  },
  {
    name: 'k3d',
    tagline: 'k3s clusters in Docker',
    detail:
      'Like kind but wrapping k3s, Rancher’s lightweight distribution. Starts faster and uses less memory, with a built-in load balancer and local registry support.',
    href: 'https://k3d.io/',
    install: 'brew install k3d',
    category: 'Cluster',
    license: 'MIT',
  },
  {
    name: 'kubectl-neat',
    tagline: 'Strip the noise from kubectl output',
    detail:
      'Removes managedFields, status, and default values from get -o yaml, leaving something you can actually read or commit to Git.',
    href: 'https://github.com/itaysk/kubectl-neat',
    install: 'kubectl krew install neat',
    category: 'Cluster',
    license: 'Apache-2.0',
  },
  {
    name: 'krew',
    tagline: 'Plugin manager for kubectl',
    detail:
      'A kubectl SIG project that installs and updates kubectl plugins. The index has hundreds of them, including neat, tree, and access-matrix.',
    href: 'https://krew.sigs.k8s.io/',
    install: 'brew install krew',
    category: 'Cluster',
    license: 'Apache-2.0',
  },
  {
    name: 'dive',
    tagline: 'Explore image layers',
    detail:
      'An interactive viewer for what each image layer added, changed, or deleted, with an efficiency score that points straight at wasted space.',
    href: 'https://github.com/wagoodman/dive',
    install: 'brew install dive',
    category: 'Containers',
    license: 'MIT',
  },
  {
    name: 'nerdctl',
    tagline: 'Docker-compatible CLI for containerd',
    detail:
      'A containerd project providing familiar docker-style commands, plus features Docker lacks such as lazy-pulling and image encryption.',
    href: 'https://github.com/containerd/nerdctl',
    install: 'brew install nerdctl',
    category: 'Containers',
    license: 'Apache-2.0',
  },
  {
    name: 'Podman',
    tagline: 'Daemonless container engine',
    detail:
      'Runs containers without a privileged background daemon, with first-class rootless support and a docker-compatible CLI. Can generate Kubernetes YAML from running containers.',
    href: 'https://podman.io/',
    install: 'brew install podman',
    category: 'Containers',
    license: 'Apache-2.0',
  },
  {
    name: 'netshoot',
    tagline: 'A container full of network tools',
    detail:
      'Not a CLI but an image: dig, curl, tcpdump, nmap, iperf, ss, and jq in one place. The fastest way to test connectivity from inside the cluster network.',
    href: 'https://github.com/nicolaka/netshoot',
    install: 'kubectl run netshoot --rm -it --image=nicolaka/netshoot -- bash',
    category: 'Observability',
    license: 'Apache-2.0',
  },
  {
    name: 'kubeconform',
    tagline: 'Fast manifest schema validation',
    detail:
      'Validates manifests against the Kubernetes OpenAPI schemas offline. Fast enough to run on every commit, and supports CRD schemas.',
    href: 'https://github.com/yannh/kubeconform',
    install: 'brew install kubeconform',
    category: 'Delivery',
    license: 'Apache-2.0',
  },
  {
    name: 'Kustomize',
    tagline: 'Template-free manifest customisation',
    detail:
      'Overlays and strategic merge patches instead of a templating language. Built into kubectl as `kubectl apply -k`.',
    href: 'https://kustomize.io/',
    install: 'Built into kubectl',
    category: 'Delivery',
    license: 'Apache-2.0',
  },
  {
    name: 'Argo CD',
    tagline: 'GitOps continuous delivery',
    detail:
      'A CNCF graduated project that runs inside the cluster, watches a Git repository, and continuously reconciles the cluster to match it — including drift detection.',
    href: 'https://argo-cd.readthedocs.io/',
    install:
      'kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml',
    category: 'Delivery',
    license: 'Apache-2.0',
  },
  {
    name: 'Trivy',
    tagline: 'Scanner for images, filesystems, and manifests',
    detail:
      'Finds vulnerabilities, misconfigurations, exposed secrets, and licence issues. Runs in CI, as a Kubernetes operator, or straight from your terminal.',
    href: 'https://trivy.dev/',
    install: 'brew install trivy',
    category: 'Security',
    license: 'Apache-2.0',
  },
  {
    name: 'cosign',
    tagline: 'Sign and verify container images',
    detail:
      'Part of Sigstore. Keyless signing via OIDC means no private key to store, with signatures recorded in the Rekor transparency log.',
    href: 'https://docs.sigstore.dev/cosign/signing/overview/',
    install: 'brew install cosign',
    category: 'Security',
    license: 'Apache-2.0',
  },
  {
    name: 'kube-bench',
    tagline: 'CIS Benchmark checks for Kubernetes',
    detail:
      'Runs the CIS Kubernetes Benchmark against a cluster and reports which controls pass, fail, or need manual review.',
    href: 'https://github.com/aquasecurity/kube-bench',
    install: 'kubectl apply -f job.yaml',
    category: 'Security',
    license: 'Apache-2.0',
  },
];

const CATEGORIES = [
  'All',
  'Cluster',
  'Containers',
  'Observability',
  'Delivery',
  'Security',
] as const;

const SHEETS = [
  {
    id: 'kubectl',
    label: 'kubectl',
    rows: KUBECTL,
    intro: 'The commands that cover roughly ninety percent of day-to-day cluster work.',
  },
  {
    id: 'docker',
    label: 'docker',
    rows: DOCKER,
    intro: 'Building, running, and cleaning up containers on your own machine.',
  },
  {
    id: 'helm',
    label: 'helm',
    rows: HELM,
    intro: 'Installing charts, and authoring your own.',
  },
] as const;

/* -------------------------------------------------------------------------- */

export default function Tools(): ReactNode {
  const [sheet, setSheet] = useState<string>('kubectl');
  const [category, setCategory] = useState<string>('All');

  const active = SHEETS.find((s) => s.id === sheet) ?? SHEETS[0];
  const visibleTools =
    category === 'All' ? TOOLS : TOOLS.filter((tool) => tool.category === category);

  return (
    <Layout
      title="Tools"
      description="Searchable kubectl, docker, and helm cheat sheets, plus a curated directory of cloud native CLI tools worth installing."
    >
      <header className={styles.header}>
        <div className="container">
          <p className={styles.eyebrow}>Reference</p>
          <h1 className={styles.title}>Tools &amp; cheat sheets</h1>
          <p className={styles.lead}>
            The commands worth keeping close, and the tools that make working with clusters
            noticeably less tedious. Everything here is filterable — start typing to narrow it
            down.
          </p>
        </div>
      </header>

      <main className="container margin-bottom--xl">
        <section aria-labelledby="cheatsheets">
          <h2 id="cheatsheets" className={styles.sectionTitle}>
            Cheat sheets
          </h2>

          <div className={styles.switcher} role="tablist" aria-label="Choose a cheat sheet">
            {SHEETS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={sheet === s.id}
                aria-controls={`panel-${s.id}`}
                className={clsx(styles.switcherButton, sheet === s.id && styles.switcherActive)}
                onClick={() => setSheet(s.id)}
              >
                <code>{s.label}</code>
                <span>{s.rows.length}</span>
              </button>
            ))}
          </div>

          <div id={`panel-${active.id}`} role="tabpanel" aria-labelledby={`tab-${active.id}`}>
            {/* Keying on the sheet id remounts the table when the reader switches
                sheets, clearing the search box and the category chips. Without
                it a stale category (say "Nodes") carries over to a sheet that
                has no such group and renders an empty table. */}
            <CheatSheetTable
              key={active.id}
              intro={active.intro}
              rows={active.rows}
              searchable
            />
          </div>
        </section>

        <section aria-labelledby="directory" className={styles.directory}>
          <h2 id="directory" className={styles.sectionTitle}>
            CLI tools worth installing
          </h2>
          <p className={styles.sectionLead}>
            Real projects, honestly described. Every link goes to the upstream source, not an
            affiliate page.
          </p>

          <div className={styles.filters} role="group" aria-label="Filter tools by category">
            {CATEGORIES.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={category === name}
                className={clsx(styles.filter, category === name && styles.filterActive)}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className={styles.toolGrid}>
            {visibleTools.map((tool) => (
              <article key={tool.name} className={styles.tool}>
                <div className={styles.toolHead}>
                  <h3 className={styles.toolName}>
                    <Link to={tool.href}>{tool.name}</Link>
                  </h3>
                  <span className={styles.toolCategory}>{tool.category}</span>
                </div>
                <p className={styles.toolTagline}>{tool.tagline}</p>
                <p className={styles.toolDetail}>{tool.detail}</p>
                <div className={styles.toolFoot}>
                  <code className={styles.toolInstall}>{tool.install}</code>
                  <span className={styles.toolLicense}>{tool.license}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
