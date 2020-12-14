import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';
import { Provider } from 'react-redux'

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
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
