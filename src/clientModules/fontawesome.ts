/**
 * Loads FontAwesome Free from the CDN. Mintlify bundled FA icons out of the
 * box; on Docusaurus we render <i class="fa-solid fa-{name}"> via the sidebar
 * icon swizzle + Card component and rely on FA's CSS.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  if (!document.querySelector('link[data-civic-fa]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    link.setAttribute('data-civic-fa', 'true');
    document.head.appendChild(link);
  }
}

export {};
