<template>
    <v-layout column>
        <v-flex xs6>
            <v-list
                dark
                v-for="(ign,index) in igns" :key="index"
            >
            {{ign.ign}}
                <v-btn
                    class = "blue"
                    v-if="$store.state.isUserLoggedIn"
                    @click="notify">
                    Notify!
                </v-btn>
            </v-list>
              <div
                v-if="!$store.state.isUserLoggedIn">
                <div class="text-xs-center">
                <v-btn
                    color="primary"
                    v-bind:disabled="!alert"
                    @click="alert = !alert"
                >
                    Okay
                </v-btn>
                </div>
                <v-alert
                :value="alert"
                type="warning"
                transition="scale-transition"
                >
                You have to be logged in to find friends!
                </v-alert>
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
            igns: null,
            currentUser: '',
            alert: true
        }
    },
    watch: {
        '$route.query.search': {
            immediate: true,
            async handler (value) {
                this.igns = (await UserService.getIgn(value)).data
            }
        }
    },
    async mounted () {
        this.igns = (await UserService.getIgn()).data
        // for (var ign in this.igns) {
        //     if (this.igns.hasOwnProperty(ign)) {
        //         console.log(ign + '->' + JSON.stringify(this.igns[ign].ign))
        //         var pushedname = JSON.stringify(this.igns[ign].ign)
        //         pushedname = pushedname.replace(/"/g, '')
        //         this.names.push(pushedname)
        //     }
        // }
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
        },
        async notify () {
            try {
                this.currentUser = this.$store.state.user.username
            } catch (error) {
                console.log(error)
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
