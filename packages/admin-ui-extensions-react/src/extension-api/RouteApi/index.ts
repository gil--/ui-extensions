import {LocationApi} from '@shopify/admin-ui-extensions';
import {useExtensionApi} from '../utils';

export function isLocationApi(api: any): api is LocationApi {
  return 'location' in api;
}

export function useLocation() {
  const api = useExtensionApi();
  if (!isLocationApi(api)) {
    throw new Error('No location api found');
  }
  return api.location as LocationApi['location'];
}
