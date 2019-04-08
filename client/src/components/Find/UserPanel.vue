<template>
    <v-layout column>
        <v-flex xs6>
            <v-list
                dark
                v-for="(ign,game) in igns" :key="game"
            >
            {{ign}}
                <v-btn
                    class = "blue"
                    v-if="$store.state.isUserLoggedIn"
                    @click="notify(ign.ign, ign.UserId)">
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
import FriendService from '@/services/FriendService'
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
            notifiedIgn: '',
            notifiedUserId: '',
            notifiedUser: '',
            alert: true
        }
    },
    watch: {
        '$route.query.search': {
            immediate: true,
            async handler (value) {
                this.igns = (await UserService.getIgnAndGame(value)).data
            }
        }
    },
    async mounted () {
        this.igns = (await UserService.getIgnAndGame()).data
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
        async notify (ign, UserId) {
            try {
                this.currentUser = this.$store.state.user.username
                const currentUserId = this.$store.state.user.id
                this.notifiedIgn = ign
                this.notifiedUserId = UserId
                const response = await UserService.getUserFromUserId({
                    id: UserId
                })
                this.notifiedUser = response.data.user.id
                console.log(this.notifiedUser)

                // disable spam friend requests
                const findFriends = await FriendService.getFriends({
                    id1: currentUserId,
                    id2: UserId
                })
                if (findFriends.data.friends === null && currentUserId !== this.notifiedUserId) {
                    const friendReq = await FriendService.sendFriendReq({
                    id1: currentUserId,
                    id2: UserId
                    })
                    console.log(friendReq)
                } else if (findFriends.data.friends !== null) {
                    console.log('This user has already notified or is friends with the other person')
                  //temporary else if
                } else if (currentUserId === this.notifiedUserId) {
                    console.log('You cant notify yourself')
                }
                //console.log(this.currentUser + ' is the current user')
                //console.log(this.notifiedIgn + ' is the notified ign for user: ' + this.notifiedUserId + ': ' + this.notifedUser.username)
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
