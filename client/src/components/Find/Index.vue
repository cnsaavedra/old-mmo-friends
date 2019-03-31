<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
    </v-flex>

    <v-flex :class="{
        xs12: !isUserLoggedIn,
        xs6: isUserLoggedIn
      }" class="ml-2">
      <user-search-panel />
      <user-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import UserPanel from './UserPanel'
import UserSearchPanel from './UserSearchPanel'
import UserService from '@/services/UserService'
import {mapState} from 'vuex'
export default {
  components: {
    UserPanel,
    UserSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await UserService.getIgn()).data
  }
}
</script>
