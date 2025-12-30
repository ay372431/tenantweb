/* eslint-disable */
import Oidc from 'oidc-client-zqy';
import 'babel-polyfill';
import axios from 'axios';
import {
  url,netUrl,loginUrl,authUrl
} from '../js/version';

var mgr = new Oidc.UserManager({
 authority: authUrl,
  client_id: "tenantvuejs",
  // redirect_uri: window.location.origin + '/static/callback.html',
  redirect_uri: loginUrl +'/#/CallBack/?',
  response_type: 'id_token token',
  scope: "openid profile role tenant.api",
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
  post_logout_redirect_uri: loginUrl +'',
  silent_redirect_uri: loginUrl +'/static/silent-renew.html',
  accessTokenExpiringNotificationTime: 5,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  extraQueryParams:{InAuth:loginUrl +'/#/login/unloading',
  Disabled:loginUrl +'/#/login/disabled',
  IpLimited:loginUrl +'/#/login/iplimited',
  AccessDenied:loginUrl +'/#/accessdenied',
  IpSecurity:loginUrl +'/#/login/ipsecurity',
  Deleted:loginUrl +'/#/login/deleted'},
  // loadUserInfo: true,
  // revokeAccessTokenOnSignout:true
})



Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.WARN;

// mgr.events.addUserLoaded(function (user) {
//   console.log('New User Loaded：', arguments);
//  // console.log('Acess_token: ', user.access_token)
// });

// mgr.events.addAccessTokenExpiring(function () {
//   console.log('AccessToken Expiring：', arguments);
// });

// mgr.events.addAccessTokenExpired(function () {
//   //  alert('会话超时，请重新登录!');
//   mgr.signoutRedirect().then(function (resp) {
//     console.log('signed out', resp);
//   }).catch(function (err) {
//     console.log(err)
//   })
//    });

// mgr.events.addSilentRenewError(function () {
//   console.error('Silent Renew Error：', arguments);
// });

// mgr.events.addUserSignedOut(function () {
//   // alert('signedOut');
//   // console.log('登出成功');
//   //  mgr.signoutRedirect().then(function (resp) {
//   //   console.log('signed out', resp);
//   // }).catch(function (err) {
//   //   console.log(err)
//   // })
  
// });

export default class SecurityService {

  // Renew the token manually
  renewToken() {
    var self = this
    return new Promise((resolve, reject) => {
      mgr.signinSilent().then(function (user) {
        if (user == null) {
          self.signIn(null)
        } else {
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the user who is logged in
  getUser() {
    var self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else {
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Check if there is any user logged in
  getSignedIn() {
    var self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        console.log(user)
        if (user == null||user.expired) {
          // self.signIn()
        //  window.location.href = '../';
          return resolve("")
        } else {
          // return resolve(true)
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Redirect of the current window to the authorization endpoint.
  signIn() {
    mgr.signinRedirect().catch(function (err) {
      console.log(err)
    })
  }

  // Redirect of the current window to the end session endpoint
  signOut() {
    mgr.signoutRedirect().then(function (resp) {
    }).catch(function (err) {
      console.log(err);
    })
  }


  // Get the profile of the user logged in
  getProfile() {
    var self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else {
          return resolve(user.profile)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the token id
  getIdToken() {
    var self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else {
          return resolve(user.id_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the session state
  getSessionState() {
    var self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else {
          return resolve(user.session_state)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the access token of the logged in user
  getAcessToken() {
    var self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else {
          return resolve(user.access_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Takes the scopes of the logged in user
  getScopes() {
    var self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else {
          return resolve(user.scopes)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the user roles logged in
  // Get the user roles logged in
  getRole() {
    var self = this;
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        // console.log('获取用户角色',user)
        if (!user ||user.expired) {
          self.signIn().then(rsq => {
            if (!user || !user.profile || !user.profile.role) {
              return resolve(null)
            } else {
              if(user.profile.UserState == "CustomRole"){
                return resolve("CustomRole")
              }else{
                return resolve(user.profile.role)
              }
            }
          }).catch(err => {
            return resolve(null)
          })
        } else { 
          if(user.profile.UserState == "CustomRole"){
            return resolve("CustomRole")
          }else{
            return resolve(user.profile.role)   
          }
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  isAuthToMeatch() {
    return new Promise((resolve, reject) => {
      this.getAcessToken().then(
        accessToken => {
         axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
         axios.get(url+'api/HomePage/GetHomePageOrdersTodayListAsync').then(rep => {   
          console.log('请求响应',rep)  
         return resolve(true);
         } ).catch(err => {
          return resolve(false);
         });
       }, err => {
         console.log('dddd',err);
         return resolve(false);
       } ).catch(er=>{
         console.log('dddd',er);
         return resolve(false);
       });
    })     
  }

  getReturnUrl(){
    return new Promise((resolve,reject) => {
      mgr.getSigninRedirectUrl().then(u=>{
        // 输出用于调试的完整 URL 和配置
        try { console.log('OIDC authority:', mgr.settings.authority || '<unknown>'); } catch(e){}
        try { console.log('OIDC client_id:', mgr.settings.client_id || '<unknown>'); } catch(e){}
        console.log('signin redirect url:', u);
        return resolve(u);
      }).catch(err=>{
        console.error('getSigninRedirectUrl error:', err);
        return reject(err);
      });
    });
   
  }

  popupLayer(){
    var self = this;
    mgr.getSigninRedirectUrl().then(u=>{
      layer.open({
        type: 2,
        title: '',
        shadeClose: true,
        shade: 0.5,
        area: ['584px', '674px'],
        id:'login',
        content: u,//iframe的url
        end: function(){
          self.getSignedIn().then(result => {
            if(result){
              window.location.href='../#/main';
            }
          });
          
        }
      }); 
    })
  }

}
