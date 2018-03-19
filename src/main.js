'use strict';
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import jQuery from 'jquery';
import {jqApp} from '../static/libs/app.min.js';
import './styles/main.css';
import './styles/posts.css';

window.$ = window.jQuery = jQuery;

const history = createBrowserHistory();

export function getHistory() {
  return history;
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes(store)}
    </Router>
  </Provider>,
  document.getElementById('content'),
);
