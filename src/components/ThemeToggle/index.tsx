import { useColorMode } from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import './styles.css';

export interface ThemeToggleProps {
  /** Renders a visible "Theme" label before the control. */
  showLabel?: boolean;
  className?: string;
}

const OPTIONS = [
  {
    value: null,
    label: 'System',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    value: 'light' as const,
    label: 'Light',
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  },
  {
    value: 'dark' as const,
    label: 'Dark',
    icon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  },
];

/**
 * A segmented System / Light / Dark control for use outside the navbar.
 *
 * "System" maps to `setColorMode(null)`, which clears the stored preference so
 * the site follows `prefers-color-scheme` again. Without it, picking a theme
 * once would leave no way back to following the OS short of clearing site data.
 *
 * Persistence is handled by Docusaurus' own colour-mode provider, which writes
 * the choice to `localStorage` and replays it before first paint — so the
 * selection survives reloads and new sessions.
 */
export default function ThemeToggle({ showLabel, className }: ThemeToggleProps): ReactNode {
  const isBrowser = useIsBrowser();
  // `colorModeChoice` is the *explicit* choice (null when following the OS),
  // as opposed to `colorMode`, which is the effective light/dark value.
  const { colorModeChoice, setColorMode } = useColorMode();

  return (
    <div className={clsx('nh-theme-toggle', className)}>
      {showLabel ? <span className="nh-theme-toggle__label">Theme</span> : null}
      <div className="nh-theme-toggle__group" role="group" aria-label="Colour theme">
        {OPTIONS.map((option) => {
          // Before hydration the real mode is unknown, so nothing is marked
          // active — this avoids a flash of the wrong selected state.
          const active = isBrowser && colorModeChoice === option.value;
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={active}
              title={
                option.value === null
                  ? 'Follow your system theme'
                  : `Switch to ${option.label.toLowerCase()} theme`
              }
              className={clsx(
                'nh-theme-toggle__button',
                active && 'nh-theme-toggle__button--active',
              )}
              onClick={() => setColorMode(option.value)}
            >
              <svg
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {option.icon}
              </svg>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
