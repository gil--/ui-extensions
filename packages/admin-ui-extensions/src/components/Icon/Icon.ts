import {createRemoteComponent} from '@remote-ui/core';

type Source =
  | 'cancelSmallMinor'
  | 'export'
  | 'import'
  | 'mobileAccept'
  | 'searchMinor'
  | 'starHollow'
  | 'starFilled'
  | 'sortMinor';

type Color =
| 'base'
| 'subdued'
| 'critical'
| 'interactive'
| 'warning'
| 'highlight'
| 'success'
| 'primary';

export interface IconProps {
  /** Pre-defined glyph content to display. */
  source: Source;

  color?: Color;

  /** Text describing the icon, to be read to screenreaders. */
  accessibilityLabel?: string;
}

/**
 * Icons are small visual indicators from a set of pre-defined glyphs.
 */
export const Icon = createRemoteComponent<'Icon', IconProps>('Icon');
