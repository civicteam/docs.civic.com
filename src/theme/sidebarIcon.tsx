import React from 'react';
import BrynMark from '../components/BrynMark';

const BRANDS = new Set([
  'js',
  'square-js',
  'react',
  'python',
  'node-js',
  'node',
  'google',
  'slack',
  'github',
  'npm',
  'docker',
]);

export function SidebarIcon({ name }: { name: string }): JSX.Element {
  // 'bryn' renders the Bryn horizon mark instead of a FontAwesome glyph.
  if (name === 'bryn') {
    return (
      <span style={{ width: 16, marginRight: 8, opacity: 0.8, display: 'inline-flex' }} aria-hidden>
        <BrynMark />
      </span>
    );
  }
  const family = BRANDS.has(name) ? 'fa-brands' : 'fa-solid';
  return (
    <i
      className={`${family} fa-${name}`}
      style={{ width: 16, marginRight: 8, opacity: 0.8 }}
      aria-hidden
    />
  );
}