import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';
import { Provider } from 'react-redux'
import Example from './components/DayPicker'


const theme = {
  basicColors : {
    white: '#fff5f6',
    black: '#000000',
  },

  primaryColors : {
    primaryLighter : '#F8DFC2',
    primaryLight : '#FFC6B0',
    primary : '#ED784A',
    primaryDark : '"#E98B2A',
    primaryDarker : '#7a2f11',
  },

  secondaryColors : {
    secondaryLighter : '#bfdbde',
    secondaryLight : '#9bb7ba',
    secondary : '#77969A',
    secondaryDark : '#5c7b80',
    secondaryDarker : '#355257',
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


function initFacebookSdk() {
  return new Promise(resolve => {
    resolve()
    console.log('init')
    //初始化
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '382475983013781',
        cookie     : true,
        xfbml      : true,
        version    : 'v9.0'
      });
      //記錄用戶行為資料 可在後台查看用戶資訊
      window.FB.AppEvents.logPageView();   
        
    };
    //嵌入臉書sdk
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  })
}


initFacebookSdk().then(() => startApp())

const birthdayStyle = `.DayPicker-Day--highlighted {
  background-color: orange;
  color: white;
}`;

const modifiers = {
  highlighted: new Date(2020, 12, 19),
};

function startApp() {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  );
}


