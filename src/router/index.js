import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import auth from './modules/auth';
import dashboard from './modules/dashboard';
import settings from './modules/settings';


Vue.use(VueRouter);


const routes = [
    ...auth,
    ...dashboard,
    ...settings,
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach(async (to, from, next) => {
    if(store.state?.auth?.loggedIn){
        if (!store.state?.loaded?.loaded) {
            await store.dispatch('auth/get_auth');
            await store.dispatch('loaded/set_loaded');
        }
        if(to.name === 'Login')
            next({name: 'Dashboard'});
        else
            next();
    }
    else{
        if(to.meta?.public)
            next();
        else
            next({name: 'Login'})    
    } 

    next();
});

router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title ? to.meta.title : 'Product management';
    });
});

export default router
