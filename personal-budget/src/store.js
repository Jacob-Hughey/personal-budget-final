import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import axios from 'axios';
import VueCookies from 'vue-cookies';

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
    state: {
        user: Vue.$cookies.get('user'),
        budget: Vue.$cookies.get('budget')
    },
    actions: {
        async LogIn({ commit, dispatch }, { email, password }) {
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
                    dispatch('GetBudget');
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
        },
        GetBudget({ commit }) {
            var date = new Date();
            axios
                .post(
                    'https://us-central1-personal-budget-final.cloudfunctions.net/server/api/fullBudgetInfo',
                    {
                        user: this.state.user,
                        monthYear: date.getMonth() + '_' + date.getFullYear()
                    }
                )
                .then(response => {
                    var budgets = {
                        titles: [],
                        totals: [],
                        used: [],
                        colors: []
                    };
                    function random_rgb() {
                        var o = Math.round,
                            r = Math.random,
                            s = 255;
                        return (
                            'rgba(' +
                            o(r() * s) +
                            ',' +
                            o(r() * s) +
                            ',' +
                            o(r() * s) +
                            ',' +
                            1 +
                            ')'
                        );
                    }
                    response.data.forEach(element => {
                        budgets.titles.push(element.TITLE);
                        budgets.totals.push(element.TOTAL);
                        budgets.used.push(element.AMOUNT_USED);
                        budgets.colors.push(random_rgb());
                    });
                    commit('setBudget', budgets);
                })
                .catch(() => {
                    alert('Error');
                });
        },
        DeleteBudget({ dispatch }, { label }) {
            var date = new Date();
            axios
                .post(
                    'https://us-central1-personal-budget-final.cloudfunctions.net/server/api/deleteBudget',
                    {
                        user: this.state.user,
                        monthYear: date.getMonth() + '_' + date.getFullYear(),
                        budgetName: label
                    }
                )
                .then(() => {
                    dispatch('GetBudget');
                })
                .catch(() => {
                    alert('Error');
                });
        },
        AddBudget({ dispatch }, { label, total }) {
            var date = new Date();
            axios
                .post(
                    'https://us-central1-personal-budget-final.cloudfunctions.net/server/api/addBudget',
                    {
                        user: this.state.user,
                        monthYear: date.getMonth() + '_' + date.getFullYear(),
                        newName: label,
                        newTotal: total
                    }
                )
                .then(() => {
                    dispatch('GetBudget');
                })
                .catch(() => {
                    alert('Error');
                });
        },
        EnterExpense({ dispatch }, { label, expense }) {
            var date = new Date();
            axios
                .post(
                    'https://us-central1-personal-budget-final.cloudfunctions.net/server/api/enterExpense',
                    {
                        user: this.state.user,
                        monthYear: date.getMonth() + '_' + date.getFullYear(),
                        budgetName: label,
                        amount: expense
                    }
                )
                .then(() => {
                    dispatch('GetBudget');
                })
                .catch(() => {
                    alert('Error');
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
            Vue.$cookies.remove('budget');
            state.budget = null;
        },
        async setBudget(state, budget) {
            Vue.$cookies.set('budget', budget);
            state.budget = Vue.$cookies.get('budget');
        }
    }
});
