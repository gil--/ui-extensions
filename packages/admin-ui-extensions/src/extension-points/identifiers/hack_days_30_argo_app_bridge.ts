import {RemoteRoot} from '@remote-ui/core';

import {AllComponentsSchema} from '../../containers';

import {RenderableExtensionCallback, StandardApi, ToastApi} from '../types';

// Add the unique extension point(s) as a union string
// This example only contains a single extension point

export type HackDays30ArgoAppBridgeExtensionPoint =
  | 'Admin::App'
  | 'Admin::Product::MoreActions';

// Update APIs for your needs
// All Extension APIs should include the StandardApi by default
export interface HackDays30ArgoAppBridgeExtensionApi {
  'Admin::App': StandardApi<HackDays30ArgoAppBridgeExtensionPoint> & ToastApi;
  'Admin::Product::MoreActions': StandardApi<
    HackDays30ArgoAppBridgeExtensionPoint
  > &
    ToastApi;
}

// Replace AllComponentsSchema with a schema for your needs
export interface HackDays30ArgoAppBridgeExtensionPointCallback {
  'Admin::App': RenderableExtensionCallback<
    HackDays30ArgoAppBridgeExtensionApi['Admin::App'],
    RemoteRoot<AllComponentsSchema>
  >;
  'Admin::Product::MoreActions': RenderableExtensionCallback<
    HackDays30ArgoAppBridgeExtensionApi['Admin::Product::MoreActions'],
    RemoteRoot<AllComponentsSchema>
  >;
}
