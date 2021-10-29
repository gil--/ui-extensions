import {RouterApi} from '@shopify/admin-ui-extensions';
import {useExtensionApi} from '../utils';

export function isRouterApi(api: any): api is RouterApi {
  return 'history' in api;
}

export function useRouter() {
  const api = useExtensionApi();
  if (!isRouterApi(api)) {
    throw new Error('No router api found');
  }
  return api.history as RouterApi['history'];
}