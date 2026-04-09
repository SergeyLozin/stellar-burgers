// src/index.tsx
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 Роутер
import { Provider } from 'react-redux';           // 👈 Redux
import App from './components/app/app';
import store from './services/store';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>      {/* 👈 Redux работает */}
      <BrowserRouter>             {/* 👈 Навигация работает */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);