import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as store from './redux/store';
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store.store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
