import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  StyleProvider,
} from '@ant-design/cssinjs';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
} else {
  console.error('Element with id "root" not found in the document.');
}
