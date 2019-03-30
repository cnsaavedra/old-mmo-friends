<template>
    <v-layout column>
        <v-flex xs6>
            <v-list
                dark
                v-for="(name,index) in names" :key="index"
            >
            <v-btn
                flat
                dark
                @click="userprofile(name)">
                {{name}}
            </v-btn>
            </v-list>
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
        usernames: null,
        names: []
        }
    },
    async mounted () {
        this.usernames = (await UserService.index()).data
        for (var username in this.usernames) {
            if (this.usernames.hasOwnProperty(username)) {
                console.log(username + '->' + JSON.stringify(this.usernames[username].username))
                var pushedname = JSON.stringify(this.usernames[username].username)
                pushedname = pushedname.replace(/"/g, '')
                this.names.push(pushedname)
            }
        }
    },
    methods: {
        navigateTo (route) {
                this.$router.push(route)
        },
         async userprofile (user) {
            try {
                // go to my profile
                this.$router.push({
                    name: `profile`,
                    params: {username: user}
                })
            } catch (error) {
                this.error = error.response.data.error
            }
        }
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
