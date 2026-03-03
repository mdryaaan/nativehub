import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

import './styles.css';

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'danger';

export interface CalloutBoxProps {
  variant?: CalloutVariant;
  /** Heading shown next to the icon. Falls back to the variant's own label. */
  title?: string;
  children: ReactNode;
  className?: string;
}

const ICONS: Record<CalloutVariant, ReactNode> = {
  info: <path d="M12 16v-5M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  tip: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />,
  warning: <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />,
  danger: <path d="M15 9l-6 6M9 9l6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
};

const LABELS: Record<CalloutVariant, string> = {
  info: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  danger: 'Careful',
};

/**
 * Variant palettes are expressed as inline custom properties so a single set of
 * utility classes can serve every variant in both colour themes.
 */
const TONES: Record<CalloutVariant, { accent: string; wash: string; darkWash: string }> = {
  info: { accent: '#2563eb', wash: 'rgb(37 99 235 / 0.07)', darkWash: 'rgb(96 165 250 / 0.1)' },
  tip: { accent: '#0e8f80', wash: 'rgb(18 160 143 / 0.08)', darkWash: 'rgb(58 214 192 / 0.1)' },
  warning: {
    accent: '#b45309',
    wash: 'rgb(245 158 11 / 0.1)',
    darkWash: 'rgb(251 191 36 / 0.12)',
  },
  danger: { accent: '#be123c', wash: 'rgb(190 18 60 / 0.07)', darkWash: 'rgb(251 113 133 / 0.1)' },
};

export default function CalloutBox({
  variant = 'info',
  title,
  children,
  className,
}: CalloutBoxProps): ReactNode {
  const tone = TONES[variant];

  return (
    <aside
      className={clsx('nh-callout', `nh-callout--${variant}`, className)}
      style={
        {
          '--nh-callout-accent': tone.accent,
          '--nh-callout-wash': tone.wash,
          '--nh-callout-wash-dark': tone.darkWash,
        } as CSSProperties
      }
    >
      <div className="nh-callout__head">
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[variant]}
        </svg>
        <span>{title ?? LABELS[variant]}</span>
      </div>
      <div className="nh-callout__body">{children}</div>
    </aside>
  );
}
