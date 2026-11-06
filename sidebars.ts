import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import civic from './sidebars/civic';
import auth from './sidebars/auth';
import labs from './sidebars/labs';
import bryn from './sidebars/bryn';

// Bryn is the only navbar tab. The civic, auth and labs sidebars still render
// on their pages when reached by direct URL.
const sidebars: SidebarsConfig = { civic, auth, labs, bryn };

export default sidebars;
