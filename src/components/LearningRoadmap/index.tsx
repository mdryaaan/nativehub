import Link from '@docusaurus/Link';
import type { ReactNode } from 'react';

import './styles.css';

export interface RoadmapStep {
  /** Stage name, e.g. "Container Basics". */
  title: string;
  /** Rough time investment, e.g. "1–2 weeks". */
  duration: string;
  /** What the reader should be able to do at the end of the stage. */
  outcome: string;
  /** Ordered list of things to work through. */
  items: { label: string; to?: string }[];
}

export interface LearningRoadmapProps {
  steps: RoadmapStep[];
}

export default function LearningRoadmap({ steps }: LearningRoadmapProps): ReactNode {
  return (
    <ol className="nh-roadmap" aria-label="Cloud native learning roadmap">
      {steps.map((step, index) => (
        <li className="nh-roadmap__step" key={step.title}>
          <div className="nh-roadmap__marker" aria-hidden="true">
            <span className="nh-roadmap__number">{index + 1}</span>
          </div>

          <div className="nh-roadmap__card">
            <div className="nh-roadmap__head">
              <h3 className="nh-roadmap__title">{step.title}</h3>
              <span className="nh-roadmap__duration">{step.duration}</span>
            </div>

            <p className="nh-roadmap__outcome">
              <strong>You&rsquo;ll be able to:</strong> {step.outcome}
            </p>

            <ul className="nh-roadmap__items">
              {step.items.map((item) => (
                <li key={item.label}>
                  {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
