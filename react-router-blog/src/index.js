import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from "./store";

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </StoreProvider>
  </React.StrictMode>
);
