import type {StatefulRemoteSubscribable} from '@remote-ui/async-subscription';
import type {RenderExtension, RunExtension} from './extension-signature';
import type {StandardApi} from './standard-api';

type Components = typeof import('../components');

type AllComponents = Components[keyof Components];
/**
 * A UI extension will register for one or more extension points using `shopify.extend()`.
 * An extension point in a UI extension is a plain JavaScript function.
 * This function receives some API for interacting with the application,
 * and is expected to return a value in a specific shape.
 * The input arguments and the output type are different
 * for each extension point.
 */
export interface ExtensionPoints {
  'CustomerAccount::FullPage::RenderWithin': RenderExtension<
    StandardApi<'CustomerAccount::FullPage::RenderWithin'> & FullPageApi,
    AllComponents
  >;
  'CustomerAccount::Returns::Initiate': RunExtension<
    StandardApi<'CustomerAccount::Returns::Initiate'> & {orderId: string},
    void
  >;
  'CustomerAccount::KitchenSink': RenderExtension<
    StandardApi<'CustomerAccount::KitchenSink'> & {name: string},
    AllComponents
  >;
  'CustomerAccount::KitchenSinkRun': RunExtension<
    StandardApi<'CustomerAccount::KitchenSinkRun'> & {name: string},
    string
  >;
  'customer-account.dynamic.render': RenderExtension<
    StandardApi<'customer-account.dynamic.render'>,
    AllComponents
  >;
}

export interface FullPageApi {
  location: StatefulRemoteSubscribable<{
    pathname: string;
    search: string;
  }>;
}

export type ExtensionPoint = keyof ExtensionPoints;
