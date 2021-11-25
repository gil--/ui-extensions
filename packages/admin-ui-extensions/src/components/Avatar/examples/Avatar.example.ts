import {extend, Avatar} from '@shopify/admin-ui-extensions';

extend('Playground', (root) => {
  const avatar = root.createComponent(Avatar, {
    // Props go here
  });

  root.appendChild(avatar);

  root.mount();
});
