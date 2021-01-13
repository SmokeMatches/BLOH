import Vue from 'vue'
import Vuex from 'vuex'
import { UserAll } from '../node/nodeFunc/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        aaa: '235'
    },
    mutations: {
        setuserToken(state, UserN) {
            // state.userToken = UserN
            Vue.set(state, 'logToken', UserN)
        }
    },
    actions: {},
    modules: {}
})