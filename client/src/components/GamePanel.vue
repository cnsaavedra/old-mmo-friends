<template>
  <panel title="Games">
    <div
      v-for="game in games"
      class="game"
      :key="game.id">

      <v-layout>
        <v-flex xs6>
          <div class="game-ign">
            {{game.ign}}
          </div>
          <div class="game-name">
            {{game.name}}
          </div>
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import GameService from '@/services/GameService'
export default {
  data () {
    return {
      games: null,
      userId: ''
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.games = (await GameService.getGames(1)).data
      }
    }
  }
}
</script>

<style scoped>
</style>
