<template>
    <v-layout align-center justify-center>
        <v-flex xs10 md3 justify-center>
            <v-list-tile-content
                ripple
                dark
                v-for="(ign,index) in igns.slice(firstIndex, lastIndex)" :key="index"
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
                    class = "blue hvr-bob"
                    v-if="$store.state.isUserLoggedIn && boolArr[index] === undefined"
                    @click="notify(ign.ign, ign.UserId)">
                    Notify!
                </v-btn>
                <h4><span style="opacity:0;">.</span> Account: {{ign.UserName}}</h4>
                </v-card>
            </v-list-tile-content>
            <v-pagination
                class="justify-center"
                v-model="page"
                :length="sizeOfPage"
                circle
            ></v-pagination>

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
                        I won't spam.
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
            boolArr: [],
            igns: null,
            currentUser: '',
            notifiedIgn: '',
            notifiedUserId: '',
            notifiedUser: '',
            alert: true,
            selfBool: false,
            reqExist: false,
            sentBool: false,
            givenUser: '',
            page: 1,
            firstIndex: 0,
            lastIndex: 6,
            sizeOfPage: 0,
            currentlyFriends: false
        }
    },
    watch: {
        '$route.query.search': {
            immediate: true,
            async handler (value) {
                this.igns = (await UserService.getIgnAndGame(value)).data
            }
        },
        page: function (newVal, oldVal) {
            if (newVal > oldVal) {
                if (newVal > 1) {
                    this.firstIndex = 0
                    this.lastIndex = 5
                }
                this.firstIndex = (this.firstIndex + 5) * (newVal - 1)
                this.lastIndex = (this.lastIndex + (5 * (newVal - 1)))
            } else if (newVal < oldVal) {
                if ((oldVal - newVal) > 1) {
                    this.firstIndex = 0
                    this.lastIndex = 5
                    this.firstIndex = (this.firstIndex + 5) * (newVal - 1)
                    this.lastIndex = (this.lastIndex + (5 * (newVal - 1)))
                } else {
                    this.firstIndex = (this.firstIndex - 5) * (oldVal - newVal)
                    this.lastIndex = (this.lastIndex - 5) * (oldVal - newVal)
                }
            }
        }
    },
    async mounted () {
        this.boolArr.length = 0
        this.igns = (await UserService.getIgnAndGame()).data
        this.sizeOfPage = this.igns.length / 6
        for (var ign in this.igns) {
            this.boolArr.push(await this.areFriends(this.igns[ign].UserId))
        }
        console.log(this.boolArr)
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
        async areFriends (UserId) {
            try {
                this.currentUser = this.$store.state.user.username
                this.notifiedUserId = UserId

                const response = await UserService.getUserFromUserId({
                    id: UserId
                })
                // disable spam friend requests
                const findFriends = await FriendService.getFriends({
                    id1: this.$store.state.user.username,
                    id2: response.data.user.username
                })

                const findFriends2 = await FriendService.getFriends({
                    id1: response.data.user.username,
                    id2: this.$store.state.user.username
                })

                if (findFriends.data.friends !== null) {
                    let currentMe = (findFriends.data.friends.from_user)
                    let currentOther = (findFriends.data.friends.to_user)
                    let statusFriendship = (findFriends.data.friends.status)

                    if ((currentMe === this.$store.state.user.username && currentOther === response.data.user.username && statusFriendship === 1) ||
                    (currentOther === this.$store.state.user.username && currentMe === response.data.user.username && statusFriendship === 1)) {
                        this.currentlyFriends = true
                    } else {
                        this.currentlyFriends = false
                    }
                }
                if (findFriends2.data.friends !== null) {
                    let currentMe = (findFriends2.data.friends.from_user)
                    let currentOther = (findFriends2.data.friends.to_user)
                    let statusFriendship = (findFriends2.data.friends.status)

                    if ((currentMe === this.$store.state.user.username && currentOther === this.notifiedUser && statusFriendship === 1) ||
                    (currentOther === this.$store.state.user.username && currentMe === this.notifiedUser && statusFriendship === 1)) {
                        this.currentlyFriends = true
                    } else {
                        this.currentlyFriends = false
                    }
                }

                if (findFriends.data.friends === null && findFriends2.data.friends === null) {
                    this.currentlyFriends = undefined
                }
                if ((this.$store.state.user.username === response.data.user.username)) {
                    this.currentlyFriends = false
                }

                return this.currentlyFriends
            } catch (error) {
                console.log(error)
            }
        },
        async notify (ign, UserId) {
            try {
                this.currentUser = this.$store.state.user.username
                this.notifiedIgn = ign
                this.notifiedUserId = UserId
                const response = await UserService.getUserFromUserId({
                    id: UserId
                })
                this.notifiedUser = response.data.user.username

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
            console.log(returnUserVal)
            return returnUserVal
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
