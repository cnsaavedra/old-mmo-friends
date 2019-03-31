<template>
    <v-layout column>
        <v-flex xs6>
            <v-list
                dark
                v-for="(ign,index) in igns" :key="index"
            >
            {{ign.ign}}
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
        igns: null
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
