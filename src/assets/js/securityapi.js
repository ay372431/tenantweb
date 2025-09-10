import Mgr from './SecurityService';
var user = new Mgr();
export default async function defineHeaderAxios () {
  let res = '';
  await user.getAcessToken().then(
    acessToken => {
      res = acessToken;
    }, err => {
      console.log(err);
    });
  return res;
}
