import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';
import { Provider } from 'react-redux'
import { ConsoleSqlOutlined } from '@ant-design/icons';

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


function initFacebookSdk() {
  return new Promise(resolve => {
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

const FBstartApp = () => {
  console.log('getStatus')
  window.FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    window.FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
  
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // testAPI();
      window.FB.api('/me',{fields: 'id,name,email'}, function (response) {
        console.log(response)})
        return new Promise(resolve => resolve(response))
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('please sign in FB!')
      window.FB.login(function (response) {
        if (response.authResponse) {
          window.FB.api('/me',{fields: 'id,name,email'}, function (response) {
            console.log(response)
            return new Promise(resolve => resolve(response))
            //這邊就可以判斷取得資料跟網站使用者資料是否一致
          });
        }
      //FB.login()預設只會回傳基本的授權資料
      //如果想取得額外的授權資料需要另外設定在scope參數裡面
      //可以設定的授權資料可以參考官方文件          
      }, {scope : 'public_profile,email'});
    }
  }
}

function FBdeleteApp() { 
  window.FB.getLoginStatus(function (response) {//取得目前user是否登入FB網站
      //debug用
      console.log(response);
      if (response.status === 'connected') {
          // Logged into Facebook.
          //抓userID
          window.FB.api("/me/permissions", "DELETE", function (response) {
              console.log("刪除結果");
              console.log(response); //gives true on app delete success 
          });
      } else {
          // FB取消授權
          console.log("無法刪除FB App");
      }
  });
}

initFacebookSdk()

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App FBstartApp={FBstartApp} FBdeleteApp={FBdeleteApp}/>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
