<template>
   <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import Vue from "vue";
import Datatable from "../../components/vue2-datatable-component/Datatable";

Vue.use(Datatable) // done!
export default {};
</script>
