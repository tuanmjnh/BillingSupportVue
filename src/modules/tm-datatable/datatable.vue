<template>
  <div>
    <tm-datatable :source=source tableClass="table table-hover table-bordered" title="TM-Datatable Users" :cols="cols"></tm-datatable>
    <!-- "https://vuetable.ratiw.net/api/users" -->
  </div>
</template>
<script>
import Vue from "vue";
import TMDatatable from "../../components/tm-datatable/TMDatatable";
import userService from "./services";
import tdOpt from "./_com/td-opt";
Vue.component("td-opt", tdOpt);
Vue.component("tm-datatable", TMDatatable);

export default {
  data() {
    return {
      source: userService.select(),
      cols: [
        { name: "checkbox", type: "checkbox" },
        { name: "id", sortBy: "id" },
        { name: "username", sortBy: "username" },
        { name: "password", sortBy: "password" },
        // {
        //   name: "birthdate",
        //   sortBy: "birthdate",
        //   theadClass: "center aligned",
        //   tbodyClass: "center aligned",
        //   callback: "formatDate|DD/MM/YYYY",
        //   selected: true
        // },
        {
          name: "#", // Operation
          theadClass: "text-center w-10",
          tbodyClass: "text-center",
          tdComp: "td-opt"
        }
      ]
    };
  },
  created() {
    // var data = userService.select();
    // console.log(data);
    // console.log(users);
  }
};
</script>
