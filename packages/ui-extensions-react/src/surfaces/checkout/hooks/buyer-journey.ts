import {useEffect, useRef} from 'react';
import type {
  RenderExtensionTarget,
  Interceptor,
  BuyerJourney,
} from '@shopify/ui-extensions/checkout';

import {ExtensionHasNoMethodError} from '../errors';

import {useApi} from './api';
import {useSubscription} from './subscription';

/**
 * Returns the `buyerJourney` details on buyer progression in checkout.
 */
export function useBuyerJourney<
  Target extends RenderExtensionTarget = RenderExtensionTarget,
>(): BuyerJourney {
  const api = useApi<Target>();

  if ('buyerJourney' in api) {
    return api.buyerJourney;
  }

  throw new ExtensionHasNoMethodError(
    'applyAttributeChange',
    api.extension.target,
  );
}

/**
 * Returns true if the buyer completed submitting their order.
 *
 * For example, when viewing the order status page after submitting payment, the buyer will have completed their order.
 */
export function useBuyerJourneyCompleted<
  Target extends RenderExtensionTarget = RenderExtensionTarget,
>(): boolean {
  const api = useApi<Target>();

  if ('buyerJourney' in api) {
    return useSubscription(api.buyerJourney.completed);
  }

  throw new ExtensionHasNoMethodError('buyerJourney', api.extension.target);
}

/**
 * Installs a function for intercepting and preventing progress on checkout.
 *
 * To block checkout progress, you must set the [block_progress](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#block-progress)
 * capability in your extension's configuration.
 *
 * If you do, then you're expected to inform the buyer why navigation was blocked,
 * either by passing validation errors to the checkout UI or rendering the errors in your extension.
 */
export function useBuyerJourneyIntercept<
  Target extends RenderExtensionTarget = RenderExtensionTarget,
>(interceptor: Interceptor): void {
  const api = useApi<Target>();

  if (!('buyerJourney' in api)) {
    throw new ExtensionHasNoMethodError('buyerJourney', api.extension.target);
  }

  const interceptorRef = useRef(interceptor);
  interceptorRef.current = interceptor;

  return useEffect(() => {
    const teardownPromise = api.buyerJourney.intercept((interceptorProps) =>
      interceptorRef.current(interceptorProps),
    );

    return () => {
      teardownPromise.then((teardown) => teardown()).catch(() => {});
    };
  }, [api.buyerJourney]);
}
