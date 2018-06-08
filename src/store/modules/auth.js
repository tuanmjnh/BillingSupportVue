import {
  firebase
} from '@/connection/firebaseInit.js'
export default {
  namespaced: true,

  state: {
    loginForm: {},
    authUser: null
  },
  getters: {
    auth: state => state.authUser
  },
  mutations: {
    login(state, loginForm) {
      state.loginForm = loginForm;
    },
    authUpdate(state, authUser) {
      state.authUser = authUser;
    }
  },
  actions: {
    //   getProducts: (context) => {
    //     fetchProducts
    //       .then((response) => {
    //         context.commit('AUTH_UPDATED', response);
    //       })
    //       .catch((error) => {
    //         // eslint-disable-next-line
    //         console.error(error);
    //       });
    //   }
    // setCurrentUser: (context) => {
    //     context.commit('AUTH_UPDATED');
    // }
    // login({
    //   commit
    // }, loginForm) {
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(
    //       loginForm.email,
    //       loginForm.password
    //     )
    //     .then(users => {
    //       commit("authUpdate", users.user);
    //       // this.$router.push("/home");
    //       console.log(loginForm);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       this.performingRequest = false;
    //       this.errorMsg = err.message;
    //     });
    // }
  }
}
