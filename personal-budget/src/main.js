import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//import axios from 'axios';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import '@/firebase';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
