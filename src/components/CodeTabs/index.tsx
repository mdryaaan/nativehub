import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import type { ReactNode } from 'react';

import './styles.css';

export interface CodeTabItem {
  /** Tab label, e.g. "kubectl" or "macOS". */
  label: string;
  /** Prism language id, e.g. "bash", "yaml", "docker". */
  language?: string;
  /** Optional filename shown in the code block's title bar. */
  title?: string;
  /** The snippet itself. Leading indentation is stripped. */
  code: string;
}

export interface CodeTabsProps {
  items: CodeTabItem[];
  /**
   * Sharing a groupId across CodeTabs instances keeps the reader's choice
   * (say, "Homebrew") selected across every snippet on the page.
   */
  groupId?: string;
  className?: string;
}

/** Strips the common leading indentation so template literals stay readable in MDX. */
function dedent(code: string): string {
  const lines = code.replace(/^\n/, '').replace(/\s+$/, '').split('\n');
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const pad = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(pad)).join('\n');
}

export default function CodeTabs({ items, groupId, className }: CodeTabsProps): ReactNode {
  return (
    <div className={className ? `nh-codetabs ${className}` : 'nh-codetabs'}>
      <Tabs groupId={groupId}>
        {items.map((item) => (
          <TabItem key={item.label} value={item.label} label={item.label}>
            <CodeBlock language={item.language ?? 'bash'} title={item.title}>
              {dedent(item.code)}
            </CodeBlock>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}
