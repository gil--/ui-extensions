import {extend, ProgressBar} from '@shopify/admin-ui-extensions';

extend('Playground', (root) => {
  const progressBar = root.createComponent(ProgressBar, {
    // Props go here
  });

  root.appendChild(progressBar);

  root.mount();
});
