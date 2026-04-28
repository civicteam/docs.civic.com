/**
 * MDX components used across the docs: <Note>, <Card>, <Steps>, etc.
 * Built on top of @theme/* primitives or plain HTML/CSS. Imported globally
 * from src/theme/MDXComponents.tsx so MDX files can use them without local
 * imports.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';
import clsx from 'clsx';
import styles from './DocComponents.module.css';

type Props = { children?: React.ReactNode };

/* ---------- Admonitions ---------- */
// Note / Tip / Warning / Info map to Docusaurus admonition types.
// Check renders as a success-styled tip.

export const Note = ({ children, ...rest }: Props) => (
  <Admonition type="note" {...rest}>{children}</Admonition>
);
export const Tip = ({ children, ...rest }: Props) => (
  <Admonition type="tip" {...rest}>{children}</Admonition>
);
export const Warning = ({ children, ...rest }: Props) => (
  <Admonition type="warning" {...rest}>{children}</Admonition>
);
export const Info = ({ children, ...rest }: Props) => (
  <Admonition type="info" {...rest}>{children}</Admonition>
);
export const Check = ({ children, ...rest }: Props) => (
  <Admonition type="tip" title="Success" {...rest}>{children}</Admonition>
);
// `<Callout icon="..." color="...">` — maps colors to admonition types.
type CalloutProps = Props & { icon?: string; color?: string; title?: string };
export const Callout = ({ color, title, children, ...rest }: CalloutProps) => {
  const type =
    color === 'red'
      ? 'danger'
      : color === 'green'
      ? 'tip'
      : color === 'orange' || color === 'yellow'
      ? 'warning'
      : 'info';
  return (
    <Admonition type={type as any} title={title} {...(rest as any)}>
      {children}
    </Admonition>
  );
};

/* ---------- Cards ---------- */

type CardProps = {
  title?: string;
  icon?: string; // FontAwesome name, rendered via <i class="fa-solid fa-{icon}">
  href?: string;
  children?: React.ReactNode;
  className?: string;
  horizontal?: boolean;
};

export const Card: React.FC<CardProps> = ({
  title,
  icon,
  href,
  children,
  className,
  horizontal,
}) => {
  const body = (
    <div className={clsx(styles.card, horizontal && styles.cardHorizontal, className)}>
      {icon && (
        <span className={styles.cardIcon} aria-hidden>
          <i className={`fa-solid fa-${icon}`} />
        </span>
      )}
      <div className={styles.cardBody}>
        {title && <div className={styles.cardTitle}>{title}</div>}
        {children && <div className={styles.cardChildren}>{children}</div>}
      </div>
    </div>
  );
  if (!href) return body;
  return (
    <Link to={href} className={styles.cardLink}>
      {body}
    </Link>
  );
};

type CardGroupProps = { cols?: number; children?: React.ReactNode };

export const CardGroup: React.FC<CardGroupProps> = ({ cols = 2, children }) => (
  <div
    className={styles.cardGroup}
    style={{ ['--cards-cols' as string]: String(cols) } as React.CSSProperties}
  >
    {children}
  </div>
);

/* ---------- Steps ---------- */

type StepProps = { title?: string; children?: React.ReactNode };

export const Steps: React.FC<Props> = ({ children }) => {
  // Assign index numbers to each Step child. Filter out whitespace text
  // nodes that show up between <Step> elements.
  const kids = React.Children.toArray(children).filter(
    (c) => React.isValidElement(c) && (c.type as any).displayName === 'Step',
  ) as React.ReactElement<StepProps>[];
  return (
    <ol className={styles.steps}>
      {kids.map((step, i) => (
        <li key={i} className={styles.step}>
          <div className={styles.stepNumber}>{i + 1}</div>
          <div className={styles.stepContent}>
            {step.props.title && (
              <div className={styles.stepTitle}>{step.props.title}</div>
            )}
            <div>{step.props.children}</div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export const Step: React.FC<StepProps> = ({ children }) => <>{children}</>;
(Step as any).displayName = 'Step';

/* ---------- Accordion ---------- */

type AccordionProps = {
  title?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({
  title,
  defaultOpen,
  children,
}) => (
  <details className={styles.accordion} open={defaultOpen}>
    <summary className={styles.accordionSummary}>{title}</summary>
    <div className={styles.accordionBody}>{children}</div>
  </details>
);

export const AccordionGroup: React.FC<Props> = ({ children }) => (
  <div className={styles.accordionGroup}>{children}</div>
);

/* ---------- Frame ---------- */

type FrameProps = {
  caption?: string;
  href?: string;
  children?: React.ReactNode;
};

export const Frame: React.FC<FrameProps> = ({ caption, href, children }) => {
  const inner = (
    <figure className={styles.frame}>
      <div className={styles.frameContent}>{children}</div>
      {caption && <figcaption className={styles.frameCaption}>{caption}</figcaption>}
    </figure>
  );
  if (!href) return inner;
  return (
    <Link to={href} className={styles.frameLink}>
      {inner}
    </Link>
  );
};

/* ---------- Update (changelog entry) ---------- */

type UpdateProps = {
  label?: string;
  description?: string;
  children?: React.ReactNode;
};

export const Update: React.FC<UpdateProps> = ({ label, description, children }) => (
  <section className={styles.update}>
    <header className={styles.updateHeader}>
      {label && <h3 className={styles.updateLabel}>{label}</h3>}
      {description && <code className={styles.updateDescription}>{description}</code>}
    </header>
    <div className={styles.updateBody}>{children}</div>
  </section>
);

/* ---------- Tabs / Tab ----------
 *
 * Custom tab widget. @theme/Tabs validates its children at render time and
 * rejects anything that isn't @theme/TabItem, which rules out wrapping it
 * with our own Tab. API: <Tabs><Tab title="...">…</Tab></Tabs>.
 */

type TabProps = {
  title?: string;
  label?: string;
  value?: string;
  children?: React.ReactNode;
};

export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;
(Tab as any).displayName = 'Tab';

export const Tabs: React.FC<Props> = ({ children }) => {
  const tabs = React.Children.toArray(children)
    .filter(
      (c): c is React.ReactElement<TabProps> =>
        React.isValidElement(c) && (c.type as any)?.displayName === 'Tab',
    )
    .map((c, i) => {
      const label = c.props.label ?? c.props.title ?? `Tab ${i + 1}`;
      return {
        label,
        value: c.props.value ?? slug(`${label}-${i}`),
        content: c.props.children,
      };
    });
  const [active, setActive] = React.useState(tabs[0]?.value);
  if (tabs.length === 0) return null;
  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((t) => (
          <button
            key={t.value}
            role="tab"
            type="button"
            aria-selected={active === t.value}
            className={clsx(styles.tab, active === t.value && styles.tabActive)}
            onClick={() => setActive(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.value}
          role="tabpanel"
          hidden={active !== t.value}
          className={styles.tabPanel}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
};

/* ---------- CodeGroup ----------
 *
 * Tabs a list of child code blocks by their info-string filename. Docusaurus
 * MDX surfaces code blocks as <pre><code className="language-..." />, so we
 * inspect each child to derive a tab label.
 */
export const CodeGroup: React.FC<Props> = ({ children }) => {
  const kids = React.Children.toArray(children).filter(React.isValidElement);
  const tabs = kids.map((child: any, i) => {
    const codeEl = findChildCode(child);
    const label =
      codeEl?.props?.title ||
      codeEl?.props?.metastring?.match(/title="([^"]+)"/)?.[1] ||
      (codeEl?.props?.className &&
        codeEl.props.className.replace(/^language-/, '')) ||
      `Tab ${i + 1}`;
    return { label, value: slug(`${label}-${i}`), content: child };
  });
  const [active, setActive] = React.useState(tabs[0]?.value);
  if (tabs.length === 0) return null;
  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((t) => (
          <button
            key={t.value}
            role="tab"
            type="button"
            aria-selected={active === t.value}
            className={clsx(styles.tab, active === t.value && styles.tabActive)}
            onClick={() => setActive(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.value}
          role="tabpanel"
          hidden={active !== t.value}
          className={styles.tabPanel}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
};

/* ---------- helpers ---------- */

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'tab';
}

function findChildCode(node: any): any {
  if (!node || typeof node !== 'object') return null;
  if (node.props?.originalType === 'pre' || node.type === 'pre') return node;
  return node;
}
