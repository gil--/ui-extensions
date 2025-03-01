import type {StatefulRemoteSubscribable} from '@remote-ui/async-subscription';

import {CartLine} from '../standard/standard';

export interface CartLineItemApi {
  /**
   * The cart line the extension is attached to. Until version `2023-04`, this property was a `StatefulRemoteSubscribable<PresentmentCartLine>`.
   */
  target: StatefulRemoteSubscribable<CartLine>;
}
