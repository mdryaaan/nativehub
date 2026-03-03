import { useMemo, useState } from 'react';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import './styles.css';

export interface CheatSheetRow {
  /** The literal command, rendered in monospace. */
  command: string;
  /** What the command does. */
  description: string;
  /** Optional grouping label used by the filter chips. */
  group?: string;
}

export interface CheatSheetTableProps {
  /** Heading rendered above the table. */
  title?: string;
  /** Optional intro sentence. */
  intro?: string;
  rows: CheatSheetRow[];
  /** Column heading for the command column. */
  commandLabel?: string;
  /** Column heading for the description column. */
  descriptionLabel?: string;
  /** Show the search input. Defaults to true when there are 8+ rows. */
  searchable?: boolean;
  className?: string;
}

export default function CheatSheetTable({
  title,
  intro,
  rows,
  commandLabel = 'Command',
  descriptionLabel = 'What it does',
  searchable,
  className,
}: CheatSheetTableProps): ReactNode {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string>('All');

  const groups = useMemo(() => {
    const found = Array.from(
      new Set(rows.map((row) => row.group).filter((g): g is string => Boolean(g))),
    );
    return found.length > 1 ? ['All', ...found] : [];
  }, [rows]);

  const showSearch = searchable ?? rows.length >= 8;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      const groupOk = group === 'All' || row.group === group;
      if (!groupOk) return false;
      if (!needle) return true;
      return (
        row.command.toLowerCase().includes(needle) ||
        row.description.toLowerCase().includes(needle)
      );
    });
  }, [rows, query, group]);

  return (
    <section className={clsx('nh-cheatsheet', className)}>
      {title ? <h3 className="nh-cheatsheet__title">{title}</h3> : null}
      {intro ? <p className="nh-cheatsheet__intro">{intro}</p> : null}

      {(showSearch || groups.length > 0) && (
        <div className="nh-cheatsheet__controls">
          {showSearch ? (
            <label className="nh-cheatsheet__search">
              <span className="sr-only">Filter {title ?? 'commands'}</span>
              <svg
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={query}
                placeholder="Filter commands…"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          ) : null}

          {groups.length > 0 ? (
            <div className="nh-cheatsheet__groups" role="group" aria-label="Filter by category">
              {groups.map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={group === name}
                  className={clsx(
                    'nh-cheatsheet__chip',
                    group === name && 'nh-cheatsheet__chip--active',
                  )}
                  onClick={() => setGroup(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {/* The scroll container keeps long commands from widening the page on mobile. */}
      <div className="nh-cheatsheet__scroll">
        <table className="nh-cheatsheet__table">
          <thead>
            <tr>
              <th scope="col">{commandLabel}</th>
              <th scope="col">{descriptionLabel}</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.command}>
                <td>
                  <code>{row.command}</code>
                </td>
                <td>{row.description}</td>
              </tr>
            ))}
            {visible.length === 0 ? (
              <tr>
                <td colSpan={2} className="nh-cheatsheet__empty">
                  No commands match “{query}”.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
