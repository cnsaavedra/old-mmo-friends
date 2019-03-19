<template>
  <div class="white elevation-2">
    <v-toolbar flat dense dark>
      <v-toolbar-title>{{username}}</v-toolbar-title>
      <v-toolbar-title>{{gamenames}}</v-toolbar-title>
      <slot name="action" />
    </v-toolbar>

    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        Nothing is displayed here.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
    // this panel has the ability to pass in a username prop, which is used on top {{username}} for example
  props: [
    'username',
    'gamenames'
  ]
}
</script>

<style scoped>
</style>
