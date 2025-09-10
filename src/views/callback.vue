<template>
  <div></div>
</template>

<script>
import Oidc from 'oidc-client-zqy';
import Mgr from '../assets/js/SecurityService';
let mgr = new Mgr();
export default {
  created() {
    var that = this;
    try {
      new Oidc.UserManager({
        userStore: new Oidc.WebStorageStateStore({
          store: window.localStorage
        }),
        loadUserInfo: true,
        filterProtocolClaims: true,
        response_mode: "query"
      })
        .signinRedirectCallback()
        .then(function () {
          console.log('i am in try');
          window.history.replaceState({},
            window.document.title,
            window.location.origin + window.location.pathname);
          setTimeout(function () {
            mgr.getRole().then(
              success => {
                if (success === 'Employee') {
                  that.$router.replace({ path: '/employeemain/employeehome' });
                } else {
                  that.$router.replace({ path: '/main/home' });
                }
              },
              err => {
                console.log(err);
              }
            );
           
          }, 100);
        })
        .catch(function (e) { });
    } catch (err) {
      console.log('i am in catch');
      setTimeout(function () {
        that.$router.replace({ path: '/main/home' });
      }, 100);
    }
  }
};
</script>

<style scoped></style>
