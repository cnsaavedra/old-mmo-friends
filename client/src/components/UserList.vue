<template>
    <v-layout column>
        <v-flex xs6>
            <div user="UserList">
                {{usernames}}
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import GamePanel from '@/components/GamePanel'
import UserService from '@/services/UserService'
import {mapState} from 'vuex'

export default {
    components: {
        GamePanel
    },
    computed: {
        ...mapState([
        'isUserLoggedIn'
        ])
    },
    data () {
        return {
        usernames: null
        }
    },
    async mounted () {
        this.usernames = (await UserService.index()).data
    }
    }
</script>

<style scoped>
.users {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
</style>
