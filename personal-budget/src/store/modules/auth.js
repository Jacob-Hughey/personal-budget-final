import axios from 'axios';

const state = {
    user: null
};

const getters = {
    isAuthenticated: state => state.user
};

const actions = {
    async LogIn({ commit }, User) {
        await axios.post('login', User);
        await commit('setUser', User.get('username'));
    },
    async LogOut({ commit }) {
        let user = null;
        commit('logout', user);
    }
};

const mutations = {
    setUser(state, username) {
        state.user = username;
    },
    LogOut(state) {
        state.user = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
