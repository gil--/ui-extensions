import {createRemoteComponent} from '@remote-ui/core';

export interface AvatarProps {
  /** Description of what this prop does. This gets added to the docs. */
  accessibilityLabel?: string;
  customer?: boolean;
  initials?: string;
  name: string;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  source?: string;
  onError?(): void | Promise<void>;
}

/**
 * Avatars are used to show a thumbnail representation of an individual or business in the interface.
 *
 */
export const Avatar = createRemoteComponent<'Avatar', AvatarProps>('Avatar');
