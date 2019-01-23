import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import React from 'react';
import './index.css';
import Main from './components/MainPanel/Main';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

render((
  <BrowserRouter>
    <Main />
  </BrowserRouter>
), document.getElementById('root'));