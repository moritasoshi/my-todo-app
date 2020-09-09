import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    board: {
      board_id: 1,
      board_name: "Board1",
      tiles: [
        {
          tile_id: 1,
          name: "List1",
          cards: [
            {
              name: "Vuexの勉強",
              date: "2020/09/08",
            },
            {
              name: "REST API",
              date: "2020/09/09",
            },
          ],
        },
        {
          tile_id: 2,
          name: "List2",
          cards: [
            {
              name: "HTMLの勉強",
              date: "2020/09/01",
            },
            {
              name: "買い物",
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
    // Firebase Authentication
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    logout() {
      firebase.auth().signOut();
    },
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
