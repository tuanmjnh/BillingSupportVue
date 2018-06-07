<template>
  <div class="tm-table">
    <div class="tm-table-header">
      <div class="tm-table-header-title pr-1">
        {{title}}
      </div>
      <div class="tm-table-header-columns pr-1">
        <select class="form-control" ref="columns" v-model="query.search_column">
          <option v-for="(col,i) in cols" :key="i" :value="col.name">{{col.name}}</option>
        </select>
      </div>
      <div class="tm-table-header-opeators pr-1">
        <select class="form-control" v-model="operators.like">
          <option v-for="(operator,i) in operators" :key="i" :value="operator">{{operator}}</option>
        </select>
      </div>
      <div class="tm-table-header-search">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" v-model="query.search_input" @keyup="fetchIndexData()">
          <div class="input-group-append">
            <i class="material-icons input-group-text">search</i>
          </div>
        </div>
      </div>
      <div class="tm-table-header-command">
        <button class="btn btn-secondary">
          <i class="material-icons">add</i>
        </button>
        <button class="btn btn-secondary">
          <i class="material-icons">delete</i>
        </button>
        <button class="btn btn-secondary">
          <i class="material-icons">restore_from_trash</i>
        </button>
        <button class="btn btn-secondary">
          <i class="material-icons">delete_forever</i>
        </button>
      </div>
    </div>
    <div class="tm-table-body">
      <table :class="tableClass">
        <thead>
          <tr>
            <template v-for="(col,i) in cols">
              <template v-if="col.type==='checkbox'">
                <td :key="i" :class="col.theadClass">
                  <div class="custom-control custom-checkbox custom-width">
                    <input type="checkbox" class="custom-control-input" name="chkAll" id="chkAll" @click="checkboxChecked" v-model="chkAll">
                    <label class="custom-control-label" for="chkAll"></label>
                  </div>
                </td>
              </template>
              <template v-else>
                <th :key="i" :class="col.theadClass" @click="toggleOrder(col.sortBy)">
                  <span>{{col.name}}</span>
                  <span class="dv-table-column" v-if="col.name === query.column">
                    <span v-if="query.direction === 'desc'">&darr;</span>
                    <span v-else>&uarr;</span>
                  </span>
                </th>
              </template>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,i) in table" :key="i">
            <template v-for="(col,j) in cols">
              <template v-if="hasCallback(col)">
                <td :key="j" :class="col.tbodyClass" v-html="callCallback(col, row[col.name])"></td>
              </template>
              <template v-else-if="col.type==='checkbox'">
                <td :key="j" :class="col.bodyClass">
                  <div class="custom-control custom-checkbox custom-width">
                    <input type="checkbox" class="custom-control-input" name="chkItem" :id="'chkItem'+i" v-model="chkItem" :value="'chkItem'+i" @click="checkboxChecked">
                    <label class="custom-control-label" :for="'chkItem'+i"></label>
                  </div>
                </td>
              </template>
              <component v-else-if="col.tdComp" :key="j" :is="col.tdComp" :col="col" :indexRow="i"></component>
              <template v-else>
                <td :key="j" :class="col.tbodyClass">{{row[col.name]}}</td>
              </template>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
// Similar to vue-resource
import axios from "axios";

export default {
  props: ["source", "title", "cols", "tableClass"],
  data() {
    return {
      table: {},
      comp: [],
      chkAll: false,
      chkItem: [],
      query: {
        page: 1,
        column: "name",
        direction: "desc",
        per_page: 15,
        search_column: "name",
        search_operator: "equal",
        search_input: ""
      },
      operators: {
        equal: "=",
        not_equal: "<>",
        less_than: "<",
        greater_than: ">",
        less_than_or_equal_to: "<=",
        greater_than_or_equal_to: ">=",
        in: "IN",
        like: "LIKE"
      }
    };
  },
  created() {
    this.fetchIndexData();
  },
  methods: {
    fetchIndexData() {
      var vm = this;
      if (typeof this.source === "object") {
        Vue.set(vm.$data, "table", this.source);
        // console.log(typeof this.source);
      } else {
        axios
          .get(this.source)
          .then(function(response) {
            Vue.set(vm.$data, "table", response.data.data);
            // console.log(response.data.data);
            // Vue.set(vm.$data, "columns", response.data.columns);
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    },
    checkboxChecked(event) {
      if (event.target.name === "chkAll") {
        if (event.target.checked) {
          this.chkAll = true;
          if (this.chkAll) {
            for (let i = 0; i < this.query.per_page; i++) {
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
        if (this.chkItem.length < this.query.per_page) this.chkAll = false;
        else this.chkAll = true;
      }
    },
    selected(value) {
      if (value) {
        return "selected";
      }
    },
    updatedQuery() {
      console.log(this.$refs["cols"].value);
    },
    hasCallback(item) {
      return item.callback ? true : false;
    },
    callCallback(field, item) {
      if (!this.hasCallback(field)) return;
      if (typeof field.callback === "function") {
        return field.callback(this.getObjectValue(item, field.name));
      }
      let args = field.callback.split("|");
      let func = args.shift();
      if (typeof this.$options.filters[func] === "function") {
        return args.length > 0
          ? this.$options.filters[func](item, args[0])
          : item;
      }
      return null;
    },
    toggleOrder(column) {
      if (column === this.query.column) {
        // only change direction
        if (this.query.direction === "desc") {
          this.query.direction = "asc";
        } else {
          this.query.direction = "desc";
        }
      } else {
        this.query.column = column;
        this.query.direction = "asc";
      }
      this.fetchIndexData();
    },
    // usage: <component :is="forDynCompIs(XXX)" ... />
    forDynCompIs(component) {
      // according to https://vuejs.org/v2/guide/components.html#Dynamic-Components
      // dynamic components can be names (string) or component objects
      console.log(this.comp);
      return typeof component === "object" ? component : this.comp[component];
    }
  }
};
</script>
