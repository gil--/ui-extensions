import type {RenderExtension} from '../../extension';

import type {AnyComponent, Components} from './shared';
import type {
  StandardApi,
  CustomerSegmentationTemplateApi,
  ActionExtensionApi,
  BlockExtensionApi,
  ProductDetailsConfigurationApi,
  ProductVariantDetailsConfigurationApi,
} from './api';
import {AnyComponentBuilder} from '../../shared';

type CustomerSegmentationTemplateComponent = AnyComponentBuilder<
  Pick<Components, 'CustomerSegmentationTemplate'>
>;

type ProductConfigurationComponents = AnyComponentBuilder<
  Pick<
    Components,
    | 'Box'
    | 'InlineStack'
    | 'BlockStack'
    | 'Divider'
    | 'HeadingGroup'
    | 'Heading'
    | 'Text'
    | 'Link'
    | 'Image'
    | 'Icon'
    | 'ResourceList'
    | 'ResourceItem'
    | 'Thumbnail'
  >
>;

/**
 * See the [list of available components](/docs/api/admin-extensions/components).
 */
type AllComponents = AnyComponent;

export interface ExtensionTargets {
  /**
   * @private
   */
  Playground: RenderExtension<StandardApi<'Playground'>, AllComponents>;

  /**
   * @private
   */
  'admin.customers.segmentation-templates.render': RenderExtension<
    CustomerSegmentationTemplateApi<'admin.customers.segmentation-templates.render'>,
    CustomerSegmentationTemplateComponent
  >;

  // Blocks
  /**
   * Renders an Admin Block in the product details page.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.product-details.block.render': RenderExtension<
    BlockExtensionApi<'admin.product-details.block.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Block in the order details page.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.order-details.block.render': RenderExtension<
    BlockExtensionApi<'admin.order-details.block.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Block in the customer details page.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.customer-details.block.render': RenderExtension<
    BlockExtensionApi<'admin.customer-details.block.render'>,
    AllComponents
  >;

  // Actions
  /**
   * Renders an Admin Action in the product details page. Open this extension from the "More Actions" menu.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.product-details.action.render': RenderExtension<
    ActionExtensionApi<'admin.product-details.action.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Action in the order details page. Open this extension from the "More Actions" menu.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.order-details.action.render': RenderExtension<
    ActionExtensionApi<'admin.order-details.action.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Action in the customer details page. Open this extension from the "More Actions" menu.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.customer-details.action.render': RenderExtension<
    ActionExtensionApi<'admin.customer-details.action.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Action in the product index page. Open this extension from the "More Actions" menu.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.product-index.action.render': RenderExtension<
    ActionExtensionApi<'admin.product-index.action.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Action in the order index page. Open this extension from the "More Actions" menu.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.order-index.action.render': RenderExtension<
    ActionExtensionApi<'admin.order-index.action.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Action in the customer index page. Open this extension from the "More Actions" menu.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.customer-index.action.render': RenderExtension<
    ActionExtensionApi<'admin.customer-index.action.render'>,
    AllComponents
  >;

  // Bulk Actions

  /**
   * Renders an Admin Action in the product index page when multiple resources are selected. Open this extension from the "More Actions"  menu of the resource list. The resource ids are available to this extension at runtime.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.product-index.selection-action.render': RenderExtension<
    ActionExtensionApi<'admin.product-index.selection-action.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Action in the order index page when multiple resources are selected. Open this extension from the "More Actions"  menu of the resource list. The resource ids are available to this extension at runtime.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.order-index.selection-action.render': RenderExtension<
    ActionExtensionApi<'admin.order-index.selection-action.render'>,
    AllComponents
  >;

  /**
   * Renders an Admin Action in the customer index page when multiple resources are selected. Open this extension from the "More Actions"  menu of the resource list. The resource ids are available to this extension at runtime.
   *
   * See the [list of available components](/docs/api/admin-extensions/components).
   */
  'admin.customer-index.selection-action.render': RenderExtension<
    ActionExtensionApi<'admin.customer-index.selection-action.render'>,
    AllComponents
  >;

  /**
   * Renders Product Configuration on product details and product variant details
   */

  'admin.product-details.configuration.render': RenderExtension<
    ProductDetailsConfigurationApi<'admin.product-details.configuration.render'>,
    ProductConfigurationComponents
  >;
  'admin.product-variant-details.configuration.render': RenderExtension<
    ProductVariantDetailsConfigurationApi<'admin.product-variant-details.configuration.render'>,
    ProductConfigurationComponents
  >;
}

export type ExtensionTarget = keyof ExtensionTargets;

export type ExtensionForExtensionTarget<T extends ExtensionTarget> =
  ExtensionTargets[T];

/**
 * For a given extension target, returns the value that is expected to be
 * returned by that extension target’s callback type.
 */
export type ReturnTypeForExtension<ID extends keyof ExtensionTargets> =
  ReturnType<ExtensionTargets[ID]>;

/**
 * For a given extension target, returns the tuple of arguments that would
 * be provided to that extension target’s callback type.
 */
export type ArgumentsForExtension<ID extends keyof ExtensionTargets> =
  Parameters<ExtensionTargets[ID]>;

/**
 * A union type containing all of the extension targets that follow the pattern of
 * accepting a [`@remote-ui/core` `RemoteRoot`](https://github.com/Shopify/remote-ui/tree/main/packages/core)
 * and an additional `api` argument, and using those arguments to render
 * UI.
 */
export type RenderExtensionTarget = {
  [ID in keyof ExtensionTargets]: ExtensionTargets[ID] extends RenderExtension<
    any,
    any
  >
    ? ID
    : never;
}[keyof ExtensionTargets];

/**
 * A mapping of each “render extension” name to its callback type.
 */
export type RenderExtensions = {
  [ID in RenderExtensionTarget]: ExtensionTargets[ID];
};

type ExtractedApiFromRenderExtension<T> = T extends RenderExtension<
  infer Api,
  any
>
  ? Api
  : never;

type ExtractedAllowedComponentsFromRenderExtension<T> =
  T extends RenderExtension<any, infer Components> ? Components : never;

/**
 * For a given rendering extension target, returns the type of the API that the
 * extension will receive at runtime. This API type is the second argument to
 * the callback for that extension target. The first callback for all of the rendering
 * extension targets each receive a `RemoteRoot` object.
 */
export type ApiForRenderExtension<ID extends keyof RenderExtensions> =
  ExtractedApiFromRenderExtension<RenderExtensions[ID]>;

/**
 * For a given rendering extension target, returns the UI components that the
 * extension target supports.
 */
export type AllowedComponentsForRenderExtension<
  ID extends keyof RenderExtensions,
> = ExtractedAllowedComponentsFromRenderExtension<RenderExtensions[ID]>;
