import {createRemoteComponent} from '@remote-ui/core';

type Size = 'small' | 'medium' | 'large';
type Color = 'highlight' | 'primary' | 'success' | 'critical';
export interface ProgressBarProps {
  /**
   * The progression of certain tasks
   * @default 0
   */
  progress?: number;
  /**
   * Size of progressbar
   * @default 'medium'
   */
  size?: Size;
  /**
   * Color of progressbar
   * @default 'highlight'
   */
  color?: Color;
  /**
   * Whether the fill animation is triggered
   * @default 'true'
   */
  animated?: boolean;
}

/**
 * ProgressBar is a component that...
 *
 *
 */
export const ProgressBar = createRemoteComponent<
  'ProgressBar',
  ProgressBarProps
>('ProgressBar');
