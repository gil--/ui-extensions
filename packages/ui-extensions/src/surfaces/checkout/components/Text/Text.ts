import {createRemoteComponent} from '@remote-ui/core';

import type {
  TextAccessibilityRole,
  Emphasis,
  TextSize,
  Appearance,
  VisibilityProps,
} from '../shared';

export interface TextProps extends VisibilityProps {
  /**
   * Size of the text
   */
  size?: TextSize;
  /**
   * Use to emphasize a word or a group of words.
   */
  emphasis?: Emphasis;
  /**
   * Set the semantic of the component’s content
   */
  accessibilityRole?: TextAccessibilityRole;
  /**
   * Unique identifier. Typically used as a target for another component’s controls
   * to associate an accessible label with an action.
   */
  id?: string;
  /**
   * Changes the visual appearance
   */
  appearance?: Extract<
    Appearance,
    'accent' | 'subdued' | 'info' | 'success' | 'warning' | 'critical'
  >;
}

/**
 * Text is used to visually style and provide semantic value for a small piece of text
 * content.
 */
export const Text = createRemoteComponent<'Text', TextProps>('Text');
