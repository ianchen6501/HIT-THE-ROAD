const TOKEN_NAME = 'id'

export const setAuthTokenToLocalStorage = (token) => {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
}

export const getAuthTokenFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(TOKEN_NAME))
}

export const deleteAuthTokenFromLocalStorage = () => {
  return localStorage.removeItem(TOKEN_NAME)
}


export const FBstartApp = async () => {
  console.log('getStatus')
  const loginStatus = await new Promise(resolve => {
    window.FB.getLoginStatus(
      function(response) {
        resolve(response)
      }
    )
  })

  return statusChangeCallback(loginStatus)
  
  async function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // testAPI();
      return await new Promise(resolve => {
        window.FB.api('/me',{fields: 'id,name,email'}, function (response) {
          console.log(response)
          resolve({
            ok: true,
            FBUserData: response
          })
        })
      })
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('please sign in FB!')
      return await new Promise(resolve => {
        window.FB.login(function (response) {
          if (response.authResponse) {
            window.FB.api('/me',{fields: 'id,name,email'}, function (response) {
              console.log(response)
              resolve({
                ok: true,
                FBUserData: response
              })
            })
          } else {
            console.log('login fail!')
            resolve({
              ok: true,
              //下面是假資料
              FBUserData: {
                id: 3,
                name: "ian",
                email: "aaa"
              }
            })
          }
          //FB.login()預設只會回傳基本的授權資料
          //如果想取得額外的授權資料需要另外設定在scope參數裡面
          //可以設定的授權資料可以參考官方文件          
        }, {scope : 'public_profile,email'});
      })
    }
  }
}

export function FBdeleteApp() { 
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