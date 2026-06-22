import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import civic from './sidebars/civic';
import auth from './sidebars/auth';
import labs from './sidebars/labs';
import bryn from './sidebars/bryn';

// Four-tab navigation: each navbar tab (docSidebar) selects one of these.
const sidebars: SidebarsConfig = { civic, auth, labs, bryn };

export default sidebars;
