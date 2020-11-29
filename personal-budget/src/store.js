import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        isAuthenticated: state => state.user
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
                    commit('setUser', null);
                });
        },
        async LogOut({ commit }) {
            axios
                .post(
                    'https://us-central1-personal-budget-final.cloudfunctions.net/server/api/logout'
                )
                .then(() => {
                    commit('setUser', null);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    router.push('/');
                });
        }
    },
    mutations: {
        setUser(state, username) {
            state.user = username;
        }
    }
});
