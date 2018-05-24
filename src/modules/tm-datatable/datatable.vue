<template>
  <div>
    <tm-datatable source="https://vuetable.ratiw.net/api/users" tableClass="table table-hover table-bordered" title="TM-Datatable Users" :cols="cols"></tm-datatable>
  </div>
</template>
<script>
import Vue from "vue";
import TMDatatable from "../../components/tm-datatable/TMDatatable";
import services from "./services";
import tdOpt from "./comps/td-opt";
Vue.component("td-opt", tdOpt);
Vue.component("tm-datatable", TMDatatable);

export default {
  props: ["data"],
  data() {
    return {
      cols: [
        { name: "checkbox", type: "checkbox" },
        { name: "name", sortBy: "name" },
        { name: "email", sortBy: "email" },
        {
          name: "birthdate",
          sortBy: "birthdate",
          theadClass: "center aligned",
          tbodyClass: "center aligned",
          callback: "formatDate|DD/MM/YYYY",
          selected: true
        },
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
    console.log(this.data);
  }
};
</script>
