import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {};
  console.info = () => {};
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
