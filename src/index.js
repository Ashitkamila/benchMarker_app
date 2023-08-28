import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import store from './redux/store';
import './index.css';
import App from './App';


ReactDom.render(
    <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);