<template>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <a class="nav-link pointer" @click="signOut">Sign out</a>
            </li>
        </ul>
    </nav>
</template>
<script>
import {firebase} from "../../connection/firebaseInit.js";
export default {
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/auth");
    }
  }
};
</script>
<style scoped>
</style>
