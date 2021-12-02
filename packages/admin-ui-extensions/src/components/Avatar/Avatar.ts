import {createRemoteComponent} from '@remote-ui/core';

export interface AvatarProps {
  /** Description of what this prop does. This gets added to the docs. */
  firstProp?: string;
}

/**
 * Avatar is a component that...
 *
 *
 */
export const Avatar = createRemoteComponent<'Avatar', AvatarProps>('Avatar');

