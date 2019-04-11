<template>
    <v-layout column>
        <v-flex
            xs6
        >
            <v-list
                dark
                v-for="(name,index) in reqIdsNow" :key="index"
            >
            {{name.from_user}}
                <v-btn
                    @click.stop="accepted = true"
                    flat
                    dark
                    @click="accept(name.from_user)">
                Accept
                </v-btn>
                <v-btn
                    @click.stop="declined = true"
                    flat
                    dark
                    @click="decline(name.from_user)">
                Decline
                </v-btn>
            </v-list>

            <v-dialog
                v-model="accepted"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">You have decided to reconcile with {{acceptedName}}!</v-card-title>

                    <v-card-text>
                    Do you want to check out their profile?
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="accepted = false; userprofile(acceptedName)"
                    >
                        Sure!
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="accepted = false"

                    >
                        No thanks!
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

             <v-dialog
                v-model="declined"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">You have decided not to reconcile with {{declinedName}} :(</v-card-title>

                    <v-card-text>
                    :)
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="declined = false"
                    >
                        Oh...
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-flex>
    </v-layout>
</template>

<script>
import FriendService from '@/services/FriendService'
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState([
        'isUserLoggedIn'
        ]),

        reqIdsNow: function () {
            // watches if something is added
            if (this.updated === true) {
                this.getFriendRequests()
            }
            return this.reqShow
        }
    },
    data () {
        return {
            reqs: null,
            reqShow: '',
            returnUser: '',
            currentUser: this.$store.state.user.username,
            fromUser: '',
            updated: false,
            reqIds: [],
            accepted: false,
            acceptedName: '',
            declined: false,
            declinedName: ''
        }
    },
    async mounted () {
        // do request for backend for friend requests
        this.getFriendRequests()
    },
    methods: {
        async getFriendRequests () {
            let response = await FriendService.getAllFriendReqs({
                id2: this.currentUser
            })
            this.reqShow = response.data
        },
        async accept (fromUser) {
            this.updated = true
            try {
                this.fromUser = fromUser
                await FriendService.resFriendReq({
                    status: 1,
                    id1: fromUser,
                    id2: this.currentUser
                })
                this.acceptedName = fromUser
            } catch (error) {
                console.log(error)
            }
            this.updated = false
        },
        async decline (fromUser) {
            this.updated = true
            try {
                this.fromUser = fromUser
                await FriendService.resFriendReq({
                    status: 0,
                    id1: fromUser,
                    id2: this.currentUser
                })
                this.declinedName = fromUser
            } catch (error) {
                console.log(error)
            }
            this.updated = false
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
