import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
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
            console.log('LogIn line 1');
            console.log(email);
            axios.get('localhost:3000/api/test').then(() => {
                console.log(commit, password, 'worked?');
            }).catch(error => {
                console.log(error);
            });
            /*axios
                .post('localhost:3000/api/login', {
                    email: email,
                    password: password
                })
                .then(() => {
                    commit('setUser', email);
                    router.push('/');
                })
                .catch(error => {
                    alert(error);
                    commit('setUser', null);
                });
                */
            /*firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    router.push('/');
                })
                .catch(() => {
                    alert('Email/password combination invalid');
                    commit('setUser', null);
                });
            */
        },
        async LogOut({ commit }) {
            firebase
                .auth()
                .signOut()
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
