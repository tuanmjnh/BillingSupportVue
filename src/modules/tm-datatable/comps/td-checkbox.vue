<template>
  <td :class="col.bodyClass">
    <div class="custom-control custom-checkbox custom-width">
      <input type="checkbox" class="custom-control-input" name="chkItem" :id="'chkItem'+indexRow" v-model="chkItem" :value="'chkItem'+indexRow" @click="checkboxChecked">
      <label class="custom-control-label" :for="'chkItem'+indexRow"></label>
    </div>
  </td>
</template>
<script>
export default {
  props: ["col", "indexRow", "totalRow", "chkAll", "chkItem"],
  methods: {
    checkboxChecked(event) {
      if (event.target.name === "chkAll") {
        if (event.target.checked) {
          this.chkAll = true;
          if (this.chkAll) {
            for (let i = 0; i < this.totalRow; i++) {
              if (this.chkItem.indexOf("chkItem" + i) === -1) {
                this.chkItem.push("chkItem" + i);
              }
            }
          }
        } else {
          this.chkItem = [];
          this.chkAll = false;
        }
      } else {
        if (event.target.checked) {
          if (this.chkItem.indexOf(event.target.id) === -1) {
            this.chkItem.push(event.target.id);
          }
        } else {
          if (this.chkItem.indexOf(event.target.id) > -1) {
            this.chkItem.splice(this.chkItem.indexOf(event.target.id), 1);
          }
        }
        if (this.chkItem.length < this.totalRow) this.chkAll = false;
        else this.chkAll = true;
      }
    }
  }
};
</script>
