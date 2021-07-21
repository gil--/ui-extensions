import {createRemoteComponent} from '@remote-ui/core';

export interface StarRatingProps {
  /** The value of the Rating to be displayed*/
  ratingValue?: number;
}

/**
 * Temporary Component for hackdays
 *
 */
export const StarRating = createRemoteComponent<'StarRating', StarRatingProps>('StarRating');
