export type {
  ExtensionPoints,
  ExtensionPoint,
  FullPageApi,
} from './extension-points';
export type {
  Language,
  Localization,
  I18nTranslate,
  I18n,
} from './standard-api/localization';
export type {Capability} from './standard-api/extension';
export type {Storage} from './standard-api/storage';

export type {StandardApi} from './standard-api';

export type {
  ApiForExtension,
  ArgumentsForExtension,
  RenderExtensionPoint,
  RunExtensionPoint,
  ReturnTypeForExtension,
  RenderExtensions,
  ApiForRenderExtension,
} from './types';

export type {RenderExtension, RunExtension} from './extension-signature';
