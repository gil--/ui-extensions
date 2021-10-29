import {RemoteRoot} from '@remote-ui/core';

import {AllComponentsSchema} from '../../containers';

import {
  ContainerAction,
  RenderableExtensionCallback,
  StandardApi,
  ToastApi,
  RouterApi,
} from '../types';

// Add the unique extension point(s) as a union string
// This example only contains a single extension point

export type ArgoDemoExtensionPoint =
  | 'Admin::App'
  | 'Admin::Product::MoreActions';

export interface ArgoDemoContainerApi {
  setBreadcrumbActions: (actions?: ContainerAction[]) => void;
}

// Update APIs for your needs
// All Extension APIs should include the StandardApi by default
export interface ArgoDemoExtensionApi {
  'Admin::App': StandardApi<ArgoDemoExtensionPoint> &
    ToastApi &
    ArgoDemoContainerApi &
    RouterApi;
  'Admin::Product::MoreActions': StandardApi<
    ArgoDemoExtensionPoint
  > &
    ToastApi;
}

// Replace AllComponentsSchema with a schema for your needs
export interface ArgoDemoExtensionPointCallback {
  'Admin::App': RenderableExtensionCallback<
    ArgoDemoExtensionApi['Admin::App'],
    RemoteRoot<AllComponentsSchema>
  >;
  'Admin::Product::MoreActions': RenderableExtensionCallback<
    ArgoDemoExtensionApi['Admin::Product::MoreActions'],
    RemoteRoot<AllComponentsSchema>
  >;
}