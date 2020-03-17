import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import './index.scss';
import WebfontLoader from '@dr-kobros/react-webfont-loader';

const config = {
  google: {
    families: ['Fredoka One', 'Roboto Mono:400,500,700']
  }
};

ReactDOM.render(
  <BrowserRouter>
    <WebfontLoader config={config}>
      <App />
    </WebfontLoader>
  </BrowserRouter>,
  document.getElementById('root')
);
