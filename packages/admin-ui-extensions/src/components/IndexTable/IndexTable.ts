import {createRemoteComponent} from '@remote-ui/core';

export interface IndexTableProps {
  headings: string[];
  itemCount: number;
  selectedItemsCount: number;
  onSelectionChange: (
    selectionType: string,
    toggleType: boolean,
    selection: string | Range,
  ) => void;
}

/**
 * `IndexTable` displays a filterable collection of objects of the same type, like products or customers.
 *
 * `IndexTable` should help merchants find an object and navigate to a full-page representation of it.
 * An index table should contain `IndexTableRow` components.
 */
export const IndexTable = createRemoteComponent<'IndexTable', IndexTableProps>(
  'IndexTable',
);
