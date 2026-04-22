import React from 'react';

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
  const family = BRANDS.has(name) ? 'fa-brands' : 'fa-solid';
  return (
    <i
      className={`${family} fa-${name}`}
      style={{ width: 16, marginRight: 8, opacity: 0.8 }}
      aria-hidden
    />
  );
}