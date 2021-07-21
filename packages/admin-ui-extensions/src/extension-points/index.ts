import {
  PlaygroundExtensionPoint,
  PlaygroundExtensionApi,
  PlaygroundExtensionPointCallback,
} from './identifiers/playground';
import {
  ProductSubscriptionExtensionPoint,
  ProductSubscriptionExtensionApi,
  ProductSubscriptionExtensionPointCallback,
} from './identifiers/product_subscription';

import {
  HackDays30ArgoAppBridgeExtensionPoint,
  HackDays30ArgoAppBridgeExtensionApi,
  HackDays30ArgoAppBridgeExtensionPointCallback,
} from './identifiers/hack_days_30_argo_app_bridge';

export type {PlaygroundExtensionPoint, ProductSubscriptionExtensionPoint};

export {HackDays30ArgoAppBridgeExtensionPoint};

/*
Placeholder for new imports
*/

export type {
  ContainerAction,
  ExtensionResult,
  RenderableExtensionCallback,
} from './types';

export type ExtensionPoint =
  | PlaygroundExtensionPoint
  | ProductSubscriptionExtensionPoint
  | HackDays30ArgoAppBridgeExtensionPoint;

export type ExtensionApi = PlaygroundExtensionApi &
  ProductSubscriptionExtensionApi &
  HackDays30ArgoAppBridgeExtensionApi;

export type ExtensionPointCallback = PlaygroundExtensionPointCallback &
  ProductSubscriptionExtensionPointCallback &
  HackDays30ArgoAppBridgeExtensionPointCallback;
