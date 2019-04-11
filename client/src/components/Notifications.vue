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
                    flat
                    dark
                    @click="accept(name.from_user)">
                Accept
                </v-btn>
                <v-btn
                    flat
                    dark
                    @click="decline(name.from_user)">
                Decline
                </v-btn>
            </v-list>
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
            reqIds: []
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
            } catch (error) {
                console.log(error)
            }
            this.updated = false
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
