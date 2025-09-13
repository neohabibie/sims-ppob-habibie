import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';
import TopUp from './views/TopUp.vue';
import Payment from './views/Payment.vue';
import History from './views/History.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login, meta: {guest: true} },
    { path: '/register', component: Register, meta: {guest: true} },
    { path: '/home', component: Home, meta: {requiresAuth: true} },
    { path: '/profile', component: Profile, meta: {requiresAuth: true} },
    { path: '/topup', component: TopUp, meta: {requiresAuth: true} },
    { path: '/payment', component: Payment, meta: {requiresAuth: true} },
    { path: '/history', component: History, meta: {requiresAuth: true} }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogged = store.getters['auth/isLoggedIn'];
  if (to.meta.requiresAuth && !isLogged) return next('/login');
  if (to.meta.guest && isLogged) return next('/home');
  next();
});

export default router;