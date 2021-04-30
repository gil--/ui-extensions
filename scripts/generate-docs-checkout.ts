import {extensionPoints, components, gettingStarted} from './typedoc/shopify-dev-renderer';

const paths = {
  inputRoot: '../checkout-web/packages/argo-checkout',
  packages: {
    JS: '../checkout-web/packages/argo-checkout',
    React: '../checkout-web/packages/argo-checkout-react',
  },
  outputRoot: '../shopify-dev/content/docs/checkout-extensions',
  shopifyDevUrl: '/docs/checkout-extensions',
};

extensionPoints(paths);
components(paths);
gettingStarted(paths);