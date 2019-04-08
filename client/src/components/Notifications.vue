<template>
    <v-layout column>
        <v-flex xs6>
            <v-list
                dark
                v-for="(id,index) in reqIds" :key="index"
            >
            {{id}}
                <v-btn
                    flat
                    dark
                    @click="accept(id)">
                Accept
                </v-btn>
                <v-btn
                    flat
                    dark
                    @click="decline(id)">
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
        ])
    },
    data () {
        return {
            reqs: null,
            reqIds: [],
            returnUser: '',
            currentUserId: this.$store.state.user.id,
            fromUserId: ''
        }
    },
    async mounted () {
        // do request for backend for friend requests
        try {
            this.reqs = await FriendService.getAllFriendReqs({
                id2: this.currentUserId
            })
            for (var id in this.reqs.data.friends) {
                var pushedid = JSON.stringify(this.reqs.data.friends[id].from_user)
                pushedid = pushedid.replace(/"/g, '')
                this.reqIds.push(await this.getUser(pushedid))
            }
        } catch (err) {
        console.log(err)
        }
    },
    methods: {
        async accept (fromUserId) {
            try {
                this.fromUserId = fromUserId
                const response = await FriendService.resFriendReq({
                    status: 1,
                    id1: fromUserId,
                    id2: this.currentUserId
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async decline (fromUserId) {
            try {
                this.fromUserId = fromUserId
                const response = await FriendService.resFriendReq({
                    status: 0,
                    id1: fromUserId,
                    id2: this.currentUserId
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
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
