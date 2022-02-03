import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from '../src/globalStyles';
import Application from './Application';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Application />
  </React.StrictMode>,
  document.getElementById('root')
);