import {createRemoteComponent} from '@remote-ui/core';

import type {
  BorderProps,
  CornerProps,
  InlineAlignment,
  SizingProps,
  Spacing,
  SpacingProps,
  ViewLikeAccessibilityRole,
} from '../shared';
import {MaybeResponsiveConditionalStyle} from '../../style';

export interface BlockStackProps
  extends BorderProps,
    CornerProps,
    SizingProps,
    SpacingProps {
  /**
   * Position children along the main axis
   */
  inlineAlignment?: MaybeResponsiveConditionalStyle<InlineAlignment>;
  /**
   * Adjust spacing between children
   *
   * @defaultValue 'base'
   */
  spacing?: MaybeResponsiveConditionalStyle<Spacing>;
  /**
   * Sets the semantic meaning of the component’s content. When set,
   * the role will be used by assistive technologies to help buyers
   * navigate the page.
   *
   *
   * For example:
   *
   * - In an HTML host a `['listItem', 'separator']` tuple will render: `<li role='separator'>`
   *
   * - In an HTML host a `listItem` string will render: `<li>`
   */
  accessibilityRole?: ViewLikeAccessibilityRole;
  /**
   * A label that describes the purpose or contents of the element. When set,
   * it will be announced to buyers using assistive technologies and will
   * provide them with more context.
   */
  accessibilityLabel?: string;
  /**
   * A unique identifier for the component.
   */
  id?: string;
  /**
   * Sets the overflow behavior of the element.
   *
   * `hidden`: clips the content when it is larger than the element’s container.
   * The element will not be scrollable and the users will not be able
   * to access the clipped content by dragging or using a scroll wheel.
   *
   * `visible`: the content that extends beyond the element’s container is visible.
   *
   * @default 'visible'
   */
  overflow?: 'hidden' | 'visible';
}

/**
 * BlockStack is used to vertically stack elements.
 */
export const BlockStack = createRemoteComponent<'BlockStack', BlockStackProps>(
  'BlockStack',
);
