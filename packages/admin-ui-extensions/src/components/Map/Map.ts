import {createRemoteComponent} from '@remote-ui/core';

export interface MapProps {
  /** The content to display inside the badge. */
  destinations: string[];
}

/**
 * Badges are used to inform merchants of the status of an object, or the status of an action that’s been taken.
 */
export const Map = createRemoteComponent<'Map', MapProps>('Map');
