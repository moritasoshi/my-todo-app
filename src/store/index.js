import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    board: {
      title: "Board1",
      tiles: [
        {
          id: 1,
          name: "List1",
          items: [
            {
              title: "Vuexの勉強",
              date: "2020/09/08",
            },
            {
              title: "REST API",
              date: "2020/09/09",
            },
          ],
        },
        {
          id: 2,
          name: "List2",
          items: [
            {
              title: "HTMLの勉強",
              date: "2020/09/01",
            },
            {
              title: "買い物",
              date: "2020/09/02",
            },
          ],
        },
      ],
    },
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
    },
    addAddress(state, address) {
      state.addresses.push(address);
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    addAddress({ commit }, address) {
      commit("addAddress", address);
    },
  },
  getters: {
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
  },
});
