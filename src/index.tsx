import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './App';
import './index.css';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter >
      <App />  
    </HashRouter>
    </Provider>
  </React.StrictMode>
);


