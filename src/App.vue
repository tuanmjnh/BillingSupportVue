<template>
  <div id="app">
    <default-navbar></default-navbar>
    <div class="container-fluid">
      <div class="row">
        <default-toolbar></default-toolbar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div class="main-header d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Share</button>
                <button class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                This week
              </button>
            </div>
          </div>
          <div class="main-content">
            <router-view/>
          </div>
          <div class="main-footer">
            <default-footer></default-footer>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import defaultNavbar from "./themes/default/navbar";
import defaultToolbar from "./themes/default/toolbar";
import defaultFooter from "./themes/default/footer";
import {firebase} from "./connection/firebaseInit.js";
export default {
  name: "App",
  components: {
    "default-navbar": defaultNavbar,
    "default-toolbar": defaultToolbar,
    "default-footer": defaultFooter
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.commit("auth/authUpdate", user);
      // console.log(this.$store.getters)
    });
    // console.log(this);
  }
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "./assets/style.scss";
</style>
