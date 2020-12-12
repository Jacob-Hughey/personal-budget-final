import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store.js';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/log-in',
        name: 'Log-In',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/sign-up',
        name: 'Sign-Up',
        component: () => import('../views/Signup.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/configure',
        name: 'Configure',
        component: () => import('../views/Configure.vue')
    },
    {
        path: '/enter-expenses',
        name: 'Enter-Expenses',
        component: () => import('../views/EnterExpenses.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name == 'Home') {
        next();
    } else if (
        to.name !== 'Log-In' &&
        to.name !== 'Sign-Up' &&
        !store.state.user
    ) {
        next({ name: 'Log-In' });
    } else if (
        (to.name == 'Log-In' || to.name == 'Sign-Up') &&
        store.state.user
    ) {
        next({ name: '/home' });
    } else next();
});

export default router;
