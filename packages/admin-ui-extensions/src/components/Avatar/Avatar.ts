import {createRemoteComponent} from '@remote-ui/core';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface AvatarProps {
  /**
   * Size of avatar
   * @default 'medium'
   */
  size?: Size;
  /** The name of the person */
  name?: string;
  /** Initials of person to display */
  initials?: string;
  /** Whether the avatar is for a customer */
  customer?: boolean;
  /** URL of the avatar image which falls back to initials if the image fails to load */
  source?: string;
  /** Callback fired when the image fails to load  */
  onError?(): void | Promise<void>;
  /** Accessible label for the avatar image */
  accessibilityLabel?: string;
}

/**
 * Avatars are used to show a thumbnail representation of an individual or business in the interface.
 */
export const Avatar = createRemoteComponent<'Avatar', AvatarProps>('Avatar');
