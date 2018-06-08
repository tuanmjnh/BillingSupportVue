const defaultState = {
  currentUser: {}
};

const actions = {
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
  setCurrentUser: (context) => {
    console.log(context)
  }
};

const mutations = {
  AUTH_UPDATED: (state, currentUser) => {
    state.currentUser = currentUser;
  }
};

const getters = {
  auth: state => state.currentUser
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
