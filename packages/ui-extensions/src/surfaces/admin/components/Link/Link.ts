import {createRemoteComponent} from '@remote-ui/core';

export interface LinkProps {
  /**
   * A unique identifier for the link.
   */
  id?: string;

  /**
   * The URL to link to.
   * If set, it will navigate to the location specified by `href` after executing the `onClick` callback.
   */
  href?: string;

  /**
   * Alias for `href`
   * If set, it will navigate to the location specified by `to` after executing the `onClick` callback.
   */
  to?: string;

  /**
   * Sets the link color.
   *
   * - `inherit` will take the color value from its parent,
   * giving the link a monochrome appearance. In some cases,
   * its important to pair this property with another stylistic treatment,
   * like an underline, to differentiate the link from a normal text.
   */
  tone?: 'default' | 'inherit' | 'critical';

  /**
   * Callback when a link is pressed. If `href` is set,
   * it will execute the callback and then navigate to the location specified by `href`.
   */
  onClick?(): void;

  /**
   * Alias for `onClick`
   * Callback when a link is pressed. If `href` is set,
   * it will execute the callback and then navigate to the location specified by `href`.
   */
  onPress?(): void;

  /**
   * A label used for users using assistive technologies. When set, any
   * `children` supplied to this component will not be announced to screen reader users.
   */
  accessibilityLabel?: string;

  /**
   * Indicate the text language. Useful when the text is in a different language than the rest of the page.
   * It will allow assistive technologies such as screen readers to invoke the correct pronunciation.
   * [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label)
   */
  language?: string;

  /**
   * Alias for `language`
   */
  lang?: string;
}

export const Link = createRemoteComponent<'Link', LinkProps>('Link');
