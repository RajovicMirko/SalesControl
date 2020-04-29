import Cookies from 'js-cookie';
const cookie = Cookies.get('epUnPs');

export default ({ router, store }) => {
    //CHECK IF COOKIE EXISTS
    if(cookie) store.dispatch('auth/login', cookie)

    router.beforeEach((to, from, next) => {
        const isLoggedIn = store.getters['auth/getIsLogged'];
        const toRouteName = to.name;
        
        if (!isLoggedIn && toRouteName !== 'Login' && toRouteName !== 'Register') {
            next('/login');
            return;
        }

        next();
    });
  };