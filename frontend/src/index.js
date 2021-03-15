import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import webFontLoader from 'webfontloader';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

webFontLoader.load({
  google: {
    families: [
      'Great Vibes:400',
      'Dancing Script:400',
      'Raleway:400',
      'Josefin Slab:400',
      'Montserrat:400',
      'Roboto:300',
      'Parisienne:400',
      // 'Merriweather:400,700:latin-ext',
    ],
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
