import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store.js';

// so that webpack can bundle styles 
// import style from './style.css';

render(
 <Provider store ={store}>
   <App/>
 </Provider>,
  document.getElementById('root')
);
