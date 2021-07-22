import {RemoteRoot, RemoteComponentType} from '@remote-ui/core';

import type {LayoutApi} from '../extension-api/LayoutApi';
import type {LocaleApi} from '../extension-api/LocaleApi';
import type {RouterApi} from '../extension-api/RouteApi';
import type {ToastApi} from '../extension-api/ToastApi';
import type {SessionTokenApi} from '../extension-api/SessionTokenApi';

export type ExtensionResult = Record<string, never> | void;

export interface RenderExtension<
  Api,
  AllowedComponents extends RemoteComponentType<string, any, any>
> {
  (root: RemoteRoot<AllowedComponents, true>, api: Api): ExtensionResult;
}

export type RenderableExtensionCallback<Api, Root extends RemoteRoot> = (
  root: Root,
  api: Api,
) => ExtensionResult;

export type StandardApi<T> = {[key: string]: any} & {
  extensionPoint: T;
} & LayoutApi &
  LocaleApi &
  SessionTokenApi;

export type {LayoutApi, LocaleApi, SessionTokenApi, ToastApi, RouterApi};

export interface ContainerAction {
  content: string;
  onAction?: () => void;
}
