import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
    SET_IS_AUTHENTICATED: 'SET_IS_AUTHENTICATED', //是否通过认证
    SET_USER: 'SET_USER' // 存储用户信息
}

// 需要维护的状态
const state = {
    isAuthenticated: false, //是否认证
    user: {} //存储用户信息
}

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
}

const mutations = {
    [types.SET_IS_AUTHENTICATED](state, isAuthenticated) {
        if (isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        } else {
            state.isAuthenticated = false
        }
    },
    [types.SET_USER](state, user) {
        if (user) {
            state.user = user
        } else {
            state.user = {}
        }
    }
}

const actions = {
    setIsAuthenticated: ({ commit }, isAuthenticated)　=> {
        commit(types.SET_IS_AUTHENTICATED, isAuthenticated)
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    clearCurrentState: ({ commit }) => {
        commit(types.SET_IS_AUTHENTICATED, false)
        commit(types.SET_USER, null)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})