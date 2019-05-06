<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-list-tile-content
                ripple
                dark
                v-for="(ign,index) in igns" :key="index"
            >
                <v-card
                    tile
                    dark
                    min-height="100"
                    min-width="500"
                >
                <v-btn
                    dark
                    block
                    @click="getUserName(ign.UserId)"
                >
                    <v-list-tile-title class="font-weight-black title">{{ign.ign}}</v-list-tile-title>
                    <v-list-tile-sub-title class="subheading">Game: {{ign.game}}</v-list-tile-sub-title>
                </v-btn>
                <v-btn
                    @click.stop="reqExist; selfBool; sentBool"
                    class = "blue"
                    v-if="$store.state.isUserLoggedIn"
                    @click="notify(ign.ign, ign.UserId)">
                    Notify!
                </v-btn>
                </v-card>
            </v-list-tile-content>


            <v-dialog
                v-model="selfBool"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">You can't notify yourself dummy!</v-card-title>

                    <v-card-text>
                    :)
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="selfBool = false"
                    >
                        YOU GOT ME!
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog
                v-model="sentBool"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Success!</v-card-title>

                    <v-card-text>
                    You just need to now wait for a respond back :)
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="sentBool = false"
                    >
                        Sure!
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


            <v-dialog
                v-model="reqExist"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">You have already request a friend request to this person</v-card-title>

                    <v-card-text>
                    Nice try spamming.
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="reqExist = false"
                    >
                        YOU GOT ME!
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

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
            alert: true,
            selfBool: false,
            reqExist: false,
            sentBool: false,
            givenUser: ''
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
                this.notifiedIgn = ign
                this.notifiedUserId = UserId
                const response = await UserService.getUserFromUserId({
                    id: UserId
                })
                this.notifiedUser = response.data.user.username
                console.log(this.notifiedUser)

                // disable spam friend requests
                const findFriends = await FriendService.getFriends({
                    id1: this.currentUser,
                    id2: this.notifiedUser
                })
                if (findFriends.data.friends === null && this.currentUser !== this.notifiedUser) {
                    this.sentBool = true
                    await FriendService.sendFriendReq({
                        id1: this.currentUser,
                        id2: this.notifiedUser
                    })
                } else if (findFriends.data.friends !== null) {
                    this.reqExist = true
                  //temporary else if
                } else if (this.currentUser === this.notifiedUser) {
                    this.selfBool = true
                }
                //console.log(this.currentUser + ' is the current user')
                //console.log(this.notifiedIgn + ' is the notified ign for user: ' + this.notifiedUserId + ': ' + this.notifedUser.username)
            } catch (error) {
                console.log(error)
            }
        },
        async getUserName (id) {
            // get id from the given user to get their games
            let getUser = await UserService.getUserFromUserId({
                    id: id
            })
            let returnUserVal = await getUser.data.user.username
            this.$router.push({
                    name: `profile`,
                    params: {username: returnUserVal}
            })
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
