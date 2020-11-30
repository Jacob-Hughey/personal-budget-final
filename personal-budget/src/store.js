import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import axios from 'axios';
import VueCookies from 'vue-cookies';

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
    state: {
        user: Vue.$cookies.get('user')
    },
    actions: {
        async LogIn({ commit }, { email, password }) {
            axios
                .post(
                    'https://us-central1-personal-budget-final.cloudfunctions.net/server/api/login',
                    {
                        email: email,
                        password: password
                    }
                )
                .then(() => {
                    commit('setUser', email);
                    router.push('/');
                })
                .catch(() => {
                    alert('Username and/or password incorrect');
                    commit('removeUser');
                });
        },
        async LogOut({ commit }) {
            axios
                .post(
                    'https://us-central1-personal-budget-final.cloudfunctions.net/server/api/logout'
                )
                .then(() => {
                    commit('removeUser');
                    router.push('/');
                })
                .catch(() => {
                    commit('removeUser');
                    router.push('/');
                });
        },
        async SignUp({ commit }, { email, password }) {
            axios
                .post(
                    'https://us-central1-personal-budget-final.cloudfunctions.net/server/api/signup',
                    {
                        email: email,
                        password: password
                    }
                )
                .then(() => {
                    commit('setUser', email);
                    router.push('/');
                })
                .catch(() => {
                    alert('Signup failed, please try again.');
                });
        }
    },
    mutations: {
        async setUser(state, username) {
            Vue.$cookies.set('user', username);
            state.user = Vue.$cookies.get('user');
        },
        async removeUser(state) {
            Vue.$cookies.remove('user');
            state.user = null;
        }
    }
});
