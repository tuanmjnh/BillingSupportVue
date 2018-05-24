<template>
    <div>
        <v-server-table url="https://api.github.com/users/matfish2/repos" :columns="columns" :data="data" :options="options">
            <a slot="uri" slot-scope="props" target="_blank" :href="props.row.uri" class="glyphicon glyphicon-eye-open"></a>
            <div slot="child_row" slot-scope="props">
                The link to {{props.row.name}} is
                <a :href="props.row.uri">{{props.row.uri}}</a>
            </div>
        </v-server-table>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import { ServerTable } from 'vue-tables-2';
    Vue.use(ServerTable, axios);
    export default {
      name: 'datatable',
      data() {
        return {
          columns: ['id', 'name', 'created_at', 'updated_at', 'pushed_at'],
          data: null,
          options: {
            headings: {
              name: 'Country Name',
              code: 'Country Code',
              uri: 'View Record'
            },
            requestFunction: function(data) {
              return axios.get(this.url, { params: data }).catch(
                function(e) {
                  this.dispatch('error', e);
                }.bind(this)
              );
            },
            responseAdapter({ data }) {
              return {
                data,
                count: data.length
              };
            },
            sortable: ['name', 'code'],
            perPage: 5,
            perPageValues: [5, 10, 15, 20],
            filterable: false,
            templates: {
              created_at(h, row) {
                return this.$options.filters.formatDate(row.created_at);
              },
              updated_at(h, row) {
                return this.$options.filters.formatDate(row.updated_at);
              },
              pushed_at(h, row) {
                return this.$options.filters.formatDate(row.pushed_at);
              }
            }
          }
        };
      }
    };
</script>
