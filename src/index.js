import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';

const theme = {
  primaryColors : {
    primaryLighter : '#00000',
    primaryLight : '#00000',
    primaryMedium : '#00000',
    primaryDark : '#00000',
    primaryDarker : '#00000',
    white: '#00000',
    black: '#00000',
  },

  fontSizes : {
    extraLarge : '36px',
    Large: '30px',
    medium: '26px',
    Small: '20px',
    extraSmall: '16px',
  },

  titles : {
    h1 : '4.5rem',
    h2 : '3.5rem',
    h3 : '2.3rem',
    h4 : '1.8rem',
    h5 : '1.6rem',
    h6 : '1.3rem',
  },

  Wrappers : {
    maxWidth: '80vw',
    mediumWidth: '70vw',
  }

}



ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
