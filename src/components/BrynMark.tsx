import React from 'react';

/**
 * Bryn horizon mark, flat single-color variant: ground line, hill arc, and
 * signal dot in currentColor. Geometry matches the control-plane-ui ringed
 * mark (300-unit master); per the brand book the flat mark renders in
 * currentColor, which keeps it theme-safe on light and dark surfaces.
 * Sized to 1em so it drops in wherever a FontAwesome <i> would render.
 */
export function BrynMark({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      width="1em"
      height="1em"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        d="M25 288H275"
        stroke="currentColor"
        strokeWidth="12.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
        fill="none"
      />
      <path
        d="M37.5 288C112.5 129.667 187.5 129.667 262.5 288"
        stroke="currentColor"
        strokeWidth="18.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M150 25C170.987 25 188 42.0132 188 63C188 83.9868 170.987 101 150 101C129.013 101 112 83.9868 112 63C112 42.0132 129.013 25 150 25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default BrynMark;
