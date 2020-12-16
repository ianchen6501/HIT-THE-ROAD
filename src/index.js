import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';
import { Provider } from 'react-redux'

const theme = {
  primaryColors : {
    primaryLighter : '#e6e6e6',
    primaryLight : '#c9c9c9',
    primary : '#9e9e9e',
    primaryDark : '#808080',
    primaryDarker : '#474747',
    white: '#fff5f6',
    black: '#000000',
  },

  fontSizes : {
    extraLarge : '30px',
    large: '26px',
    medium: '20px',
    small: '16px',
    extraSmall: '12px',
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
    maxWidth: '1200px',
    mediumWidth: '70vw',
  },

  heights : {
    header: '80px',
    homepageHeader: '400px',
    footer: '70px',
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
