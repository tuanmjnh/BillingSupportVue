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
                  <label for="email1">Email</label>
                  <input v-model.trim="loginForm.email" type="text" class="form-control" placeholder="example@email.com" id="email1" />
                </div>
                <div class="form-group">
                  <label for="password1">Password</label>
                  <input v-model.trim="loginForm.password" type="password" class="form-control" placeholder="******" id="password1" />
                </div>
              <a @click="togglePasswordReset">Forgot Password</a>
              <a @click="toggleForm">Create an Account</a>
          </div>
          <div class="card-footer text-right">
              <button @click="login" class="btn btn-secondary">Log In</button>
          </div>
            </div>
          </div>
        </form>
        <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          <h1>Get Started</h1>

          <label for="name">Name</label>
          <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />

          <label for="title">Title</label>
          <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />

          <label for="email2">Email</label>
          <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

          <label for="password2">Password</label>
          <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

          <button @click="signup" class="button">Sign Up</button>

          <div class="extras">
            <a @click="toggleForm">Back to Log In</a>
          </div>
        </form>
        <form v-if="showForgotPassword" @submit.prevent class="password-reset">
          <div v-if="!passwordResetSuccess">
            <h1>Reset Password</h1>
            <p>We will send you an email to reset your password</p>

            <label for="email3">Email</label>
            <input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />

            <button @click="resetPassword" class="button">Submit</button>

            <div class="extras">
              <a @click="togglePasswordReset">Back to Log In</a>
            </div>
          </div>
          <div v-else>
            <h1>Email Sent</h1>
            <p>check your email for a link to reset your password</p>
            <button @click="togglePasswordReset" class="button">Back to login</button>
          </div>
        </form>
        <!-- <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
          </div>
        </transition> -->
      </div>
    </section>
  </div>
</template>

<script>
import { firebase } from "../../connection/firebaseInit.js";
export default {
  name: "auth",
  mounted() {},
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
  methods: {
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordResetSuccess = false;
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },
    login() {
      this.performingRequest = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(users => {
          this.$store.commit("AUTH_UPDATED", users.user);
          // this.$store.commit("setAuth", user);
          // this.$store.dispatch("setUserProfile");
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
    // signup() {
    //   this.performingRequest = true;
    //   db.auth()
    //     .createUserWithEmailAndPassword(
    //       this.signupForm.email,
    //       this.signupForm.password
    //     )
    //     .then(user => {
    //       this.$store.commit("setCurrentUser", user);
    //       // create user obj
    //       fb.usersCollection
    //         .doc(user.uid)
    //         .set({
    //           name: this.signupForm.name,
    //           title: this.signupForm.title
    //         })
    //         .then(() => {
    //           this.$store.dispatch("fetchUserProfile");
    //           this.performingRequest = false;
    //           this.$router.push("/dashboard");
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           this.performingRequest = false;
    //           this.errorMsg = err.message;
    //         });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       this.performingRequest = false;
    //       this.errorMsg = err.message;
    //     });
    // },
    // resetPassword() {
    //   this.performingRequest = true;
    //   fb.auth
    //     .sendPasswordResetEmail(this.passwordForm.email)
    //     .then(() => {
    //       this.performingRequest = false;
    //       this.passwordResetSuccess = true;
    //       this.passwordForm.email = "";
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       this.performingRequest = false;
    //       this.errorMsg = err.message;
    //     });
    // }
  }
};
</script>
