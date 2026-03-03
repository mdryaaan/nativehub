import Link from '@docusaurus/Link';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface FeatureCardProps {
  /** Short section label, e.g. "Learn". */
  title: string;
  /** One or two sentences describing what lives behind the link. */
  description: string;
  /** Internal route or external URL. */
  to: string;
  /** Decorative glyph rendered in the card's badge. */
  icon: ReactNode;
  /** Optional eyebrow shown above the title. */
  eyebrow?: string;
  /** Optional bullet list of what the section covers. */
  highlights?: string[];
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  to,
  icon,
  eyebrow,
  highlights,
  className,
}: FeatureCardProps): ReactNode {
  return (
    <Link
      to={to}
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl p-6',
        'border border-[var(--nh-border)] bg-[var(--nh-surface-raised)]',
        'no-underline shadow-[var(--nh-shadow-sm)]',
        'transition-[transform,box-shadow,border-color] duration-300 ease-smooth',
        'hover:-translate-y-1 hover:border-[var(--ifm-color-primary)] hover:no-underline',
        'hover:shadow-[var(--nh-shadow-lg)]',
        className,
      )}
    >
      {/* Soft brand wash that fades in on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-smooth group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 90% at 100% 0%, rgb(18 160 143 / 0.13), transparent 62%)',
        }}
      />

      <span
        aria-hidden="true"
        className={clsx(
          'relative mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl',
          'bg-[var(--nh-surface-inset)] text-[var(--ifm-color-primary)]',
          'transition-transform duration-300 ease-smooth group-hover:scale-110',
        )}
      >
        {icon}
      </span>

      {eyebrow ? (
        <span className="relative mb-1 text-xs font-bold uppercase tracking-[0.11em] text-[var(--nh-text-subtle)]">
          {eyebrow}
        </span>
      ) : null}

      <h3 className="relative mb-2 font-display text-xl font-bold text-[var(--ifm-heading-color)]">
        {title}
      </h3>

      <p className="relative mb-4 text-[0.95rem] leading-relaxed text-[var(--nh-text-muted)]">
        {description}
      </p>

      {highlights?.length ? (
        <ul className="relative mb-5 flex list-none flex-wrap gap-1.5 p-0">
          {highlights.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[var(--nh-border)] px-2.5 py-0.5 text-xs font-medium text-[var(--nh-text-subtle)]"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <span className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ifm-color-primary)]">
        Explore
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
          className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
