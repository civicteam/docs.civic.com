/**
 * Globally-available MDX components.
 *
 * Docusaurus's MDXProvider picks up this file automatically (swizzled from
 * theme-classic). Anything exported here is callable from every MDX file
 * without a local import — lets us keep all 240 authored docs using the same
 * <Note>, <Card>, <Steps> tags they used under Mintlify.
 */
import MDXComponents from '@theme-original/MDXComponents';
import * as Compat from '@site/src/components/MintlifyCompat';

export default {
  ...MDXComponents,
  Note: Compat.Note,
  Tip: Compat.Tip,
  Warning: Compat.Warning,
  Info: Compat.Info,
  Check: Compat.Check,
  Callout: Compat.Callout,
  Card: Compat.Card,
  CardGroup: Compat.CardGroup,
  Steps: Compat.Steps,
  Step: Compat.Step,
  Accordion: Compat.Accordion,
  AccordionGroup: Compat.AccordionGroup,
  Frame: Compat.Frame,
  Tabs: Compat.Tabs,
  Tab: Compat.Tab,
  CodeGroup: Compat.CodeGroup,
  Update: Compat.Update,
};
