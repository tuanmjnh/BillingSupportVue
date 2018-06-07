<template>
    <td :class="col.tbodyClass">
        <span class="pointer">
            <i class="material-icons">pageview</i>
        </span>
        <span class="pointer">
            <i class="material-icons">edit</i>
        </span>
        <span class="pointer">
            <i class="material-icons">delete</i>
        </span>
    </td>
</template>
<script>
export default {
  props: ["col"]
};
</script>
