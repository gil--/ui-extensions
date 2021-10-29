import {createRemoteComponent} from '@remote-ui/core';

export interface IndexTableRowProps {
  id: string;
  selected: boolean;
  position: number;
}

/**
 * `IndexTableRow` displays a filterable collection of objects of the same type, like products or customers.
 *
 * `IndexTableRow` should help merchants find an object and navigate to a full-page representation of it.
 * A resource list should contain `ResourceItem` components.
 */
export const IndexTableRow = createRemoteComponent<
  'IndexTableRow',
  IndexTableRowProps
>('IndexTableRow');