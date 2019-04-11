<template>
  <v-layout column>
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
      games: null
    }
  },
  async mounted () {
    this.games = (await UserService.getIgnAndGame()).data
  }
}
</script>
