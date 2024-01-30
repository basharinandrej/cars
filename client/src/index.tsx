import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.sass'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <h1>Hello world</h1>
  </React.StrictMode>
);
