import AuthResource from '@/resources/auth.resource'


const state = {
    user: null,
    token: null,
    loggedIn: false,
};


const actions = {
    async get_auth ({commit}) {
        try {
            const response = await AuthResource.getAuthState();
            if (response.data.status) 
                commit('setAuthState',response.data.auth);
            else
                commit('resetAuthState');
        

        } catch (error) {
            console.error(error);
        }
    },

    setAuthState({commit},payload){
        commit('setAuthState',payload);
    },
    resetAuthState({commit}){
        commit('resetAuthState');
    },
    setUser({commit},payload){
        commit('setUser',payload);
    },

}

const mutations = {
    setAuthState(state,payload){
        state.user = payload.user;
        state.token = payload.token;
        state.loggedIn = state.user?.id ? true : false;
    },

    resetAuthState(state){
        state.user= null;
        state.token= null;
        state.loggedIn= false;
    },

    setUser(state,payload){
        state.user = payload;
    },

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
