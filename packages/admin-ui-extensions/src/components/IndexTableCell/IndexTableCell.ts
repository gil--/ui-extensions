import {createRemoteComponent} from '@remote-ui/core';

export interface IndexTableCellProps {}

/**
 * `IndexTableCell` displays a filterable collection of objects of the same type, like products or customers.
 *
 * `IndexTableCell` should help merchants find an object and navigate to a full-page representation of it.
 */
export const IndexTableCell = createRemoteComponent<
  'IndexTableCell',
  IndexTableCellProps
>('IndexTableCell');
