import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    boards: [],
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    addBoard(state, { id, board }) {
      board.board_id = id;
      state.boards.push(board);
    },
    upadateBoard(state, board ) {
      state.boards.set(board);
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
    // Boards
    fetchBoards({ getters, commit }) {
      firebase
        .firestore()
        .collection("users")
        .doc(getters.uid)
        .collection("boards")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            commit("addBoard", { id: doc.id, board: doc.data() });
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    addBoard({ getters, commit }, board) {
      firebase
        .firestore()
        .collection("users")
        .doc(getters.uid)
        .collection("boards")
        .add(board)
        .then(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          commit("addBoard", { id: doc.id, board });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    updateBoard({ getters, commit }, board) {
      firebase
        .firestore()
        .collection("users")
        .doc(getters.uid)
        .collection("boards")
        .doc(board.board_id)
        .set(board)
        .then(function() {
          console.log("Document successfully written!");
          commit("updateBoard",  board );
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
  },
  getters: {
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
  },
});
