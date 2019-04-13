<template>
  <div id="app">
    <v-app>
      <page-header />
      <main>
        <v-container ma-0 pa-0 fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>



<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
#app {
    font-family: 'Roboto Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html, body {
  font-family: 'Roboto Condensed', sans-serif;
}

</style>
