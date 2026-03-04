import Link from '@docusaurus/Link';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface BlogPostCardProps {
  title: string;
  description: string;
  /** Route to the post, e.g. "/blog/pods-vs-deployments". */
  permalink: string;
  /** ISO date string; formatted for display by the card. */
  date: string;
  /** Reading time in minutes, as reported by the blog plugin. */
  readingTime?: number;
  tags?: string[];
  className?: string;
}

function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogPostCard({
  title,
  description,
  permalink,
  date,
  readingTime,
  tags,
  className,
}: BlogPostCardProps): ReactNode {
  return (
    <article
      className={clsx(
        'group flex h-full flex-col rounded-2xl border border-[var(--nh-border)]',
        'bg-[var(--nh-surface-raised)] p-6 shadow-[var(--nh-shadow-sm)]',
        'transition-[transform,box-shadow,border-color] duration-300 ease-smooth',
        'hover:-translate-y-1 hover:border-[var(--ifm-color-primary)] hover:shadow-[var(--nh-shadow-lg)]',
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--nh-text-subtle)]">
        <time dateTime={date}>{formatDate(date)}</time>
        {readingTime ? (
          <>
            <span aria-hidden="true">·</span>
            <span>{Math.ceil(readingTime)} min read</span>
          </>
        ) : null}
      </div>

      <h3 className="mb-2 font-display text-lg font-bold leading-snug">
        <Link
          to={permalink}
          className="text-[var(--ifm-heading-color)] no-underline transition-colors duration-200 hover:text-[var(--ifm-color-primary)] hover:no-underline"
        >
          {/* Stretches the link across the card so the whole surface is clickable,
              while keeping a single accessible name for screen readers. */}
          <span className="absolute inset-0" aria-hidden="true" />
          {title}
        </Link>
      </h3>

      <p className="mb-4 line-clamp-3 text-[0.925rem] leading-relaxed text-[var(--nh-text-muted)]">
        {description}
      </p>

      {tags?.length ? (
        <ul className="mt-auto flex list-none flex-wrap gap-1.5 p-0">
          {tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-[var(--nh-surface-inset)] px-2.5 py-0.5 text-xs font-medium text-[var(--nh-text-subtle)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
