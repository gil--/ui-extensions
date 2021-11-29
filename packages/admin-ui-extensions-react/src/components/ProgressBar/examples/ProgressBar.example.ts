import React from 'react';
import {extend, render, ProgressBar} from '@shopify/admin-ui-extensions-react';

function App() {
  return <ProgressBar>This is the best extension.</ProgressBar>;
}

extend(
  'Playground',
  render(() => <App />),
);
