<template>
    <v-layout column>
        <v-flex
            xs12
            md4
            d-flex
        >
            <v-list
                dark
                v-for="(id,index) in reqIdsNow" :key="index"
            >
            {{id[Object.keys(id)[0]]}}
                <v-btn
                    flat
                    dark
                    @click="accept(Object.keys(id)[0])">
                Accept
                </v-btn>
                <v-btn
                    flat
                    dark
                    @click="decline(Object.keys(id)[0])">
                Decline
                </v-btn>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
import FriendService from '@/services/FriendService'
import UserService from '@/services/UserService'
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState([
        'isUserLoggedIn'
        ]),

        reqIdsNow: function () {
            // watches if something is added
            if (this.updated === true) {
                this.getUpdates()
            }
            return this.reqIds
        }
    },
    data () {
        return {
            reqs: null,
            reqIds: [],
            returnUser: '',
            currentUserId: this.$store.state.user.id,
            fromUserId: '',
            updated: false
        }
    },
    async mounted () {
        // do request for backend for friend requests
        this.getFriendRequests()
    },
    methods: {
        async getUpdates () {
            let response = await FriendService.getAllFriendReqs({
                id2: this.currentUserId
            })
            console.log(response.data.friends[0])
            return response
        },
        async getFriendRequests () {
            try {
            this.reqs = await this.getUpdates()
            for (var id in this.reqs.data.friends) {
                var pushedid = JSON.stringify(this.reqs.data.friends[id].from_user)
                pushedid = pushedid.replace(/"/g, '')
                // to get id + name to parse into pushing id into data, and representing id as username
                var pushObj = {}
                pushObj[pushedid] = await this.getUser(pushedid)
                this.reqIds.push(pushObj)
            }
            } catch (err) {
            console.log(err)
            }
            this.updated = false
        },
        async accept (fromUserId) {
            this.updated = true
            try {
                this.fromUserId = fromUserId
                await FriendService.resFriendReq({
                    status: 1,
                    id1: fromUserId,
                    id2: this.currentUserId
                })
            } catch (error) {
                console.log(error)
            }
            this.updated = false
        },
        async decline (fromUserId) {
            this.updated = true
            try {
                this.fromUserId = fromUserId
                await FriendService.resFriendReq({
                    status: 0,
                    id1: fromUserId,
                    id2: this.currentUserId
                })
            } catch (error) {
                console.log(error)
            }
            this.updated = false
        },
        async getUser (id) {
            // get id from the given user to get their games
            let response = await UserService.getUserFromUserId({
                    id: id
            })
            let userVal = await response.data.user.username
            return userVal
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
