import Vue from 'vue'
import Vuex from 'vuex'

// allows store access with all view components
Vue.use(Vuex)

export default new Vuex.Store({
    //cant modify state unless thru action/mutation
    strict: true,
    state: {
        // these helps with global states of app to keep track of
        // used for changing display whether logged or not
        // in order for token to change, must be invoking mutation
        // in order to invoke mutation, need to invoke action typically
        token: null,
        user: null,
        isUserLoggedIn: false
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            state.isUserLoggedIn = !!(token)
        },
        setUser (state, user) {
            state.user = user
        }
    },
    // shud always invoke actions thru Vue components (eventnames)
    actions: {
        // call mutation, call setToken, and pass in that token object
        setToken ({commit}, token) {
            // do in here any async logic
            commit('setToken', token)
        },
        setUser ({commit}, user) {
            // do in here any async logic
            commit('setUser', user)
        }
    },
    getters: {
        getUserById (state) {
            if (state.isUserLoggedIn) {
                return state.user.id
            }
        },
        getUser (state) {
            if (state.isUserLoggedIn) {
                return state.user
            }
        }
    }
})
