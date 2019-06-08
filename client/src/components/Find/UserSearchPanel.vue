<template>
  <v-container>
    <v-layout justify-center align-center column title="Search">
      <v-text-field
        label="Search an IGN!"
        v-model="search"
      ></v-text-field>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'find'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style>
</style>
