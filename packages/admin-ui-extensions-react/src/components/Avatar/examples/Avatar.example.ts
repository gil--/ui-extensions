import React from 'react';
import {extend, render, Avatar} from '@shopify/admin-ui-extensions-react';

function App() {
  return <Avatar>This is the best extension.</Avatar>;
}

extend(
  'Playground',
  render(() => <App />),
);
