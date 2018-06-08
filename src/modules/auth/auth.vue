<template>
  <div id="login">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errorMsg !== ''" class="error-msg">
        <p>{{ errorMsg }}</p>
      </div>
    </transition>
    <section>
      <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
        <form v-if="showLoginForm" @submit.prevent>
          <div class="col-md-5 m-auto">
            <div class="card">
              <h5 class="card-header">Login Form</h5>
              <div class="card-body">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input v-model.trim="loginForm.email" type="text" class="form-control" placeholder="example@email.com" id="email" />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input v-model.trim="loginForm.password" type="password" class="form-control" placeholder="******" id="password" />
                </div>
              <!-- <a @click="togglePasswordReset">Forgot Password</a> -->
              <!-- <a @click="toggleForm">Create an Account</a> -->
          </div>
          <div class="card-footer text-right">
              <button @click="login" class="btn btn-secondary">Log In</button>
          </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import {firebase} from '@/connection/firebaseInit.js'
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "auth",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        title: "",
        email: "",
        password: ""
      },
      passwordForm: {
        email: ""
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: ""
    };
  },
  computed: {
    ...mapState({
      authUser: state => state.auth.authUser
    }),
    ...mapGetters("auth", {
      // productIsInStock: "productIsInStock"
    })
  },
  methods: {
    ...mapActions({
      // login: "auth/login"
      // addProductToCart: "cart/addProductToCart"
    }),
    login() {
      this.performingRequest = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(users => {
          this.$store.commit("auth/authUpdate", users.user);
          console.log(this.$store)
          this.performingRequest = false;
          this.$router.push("/home");
          // console.log(this.$store.state.auth);
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    }
  },
  created() {
    // console.log(authUser)
    // this.loading = true;
    // this.fetchProducts().then(() => (this.loading = false));
  }
};
</script>
