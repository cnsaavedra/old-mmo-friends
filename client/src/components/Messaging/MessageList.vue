<template>
    <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title class="text-xs-center">Chat</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list subheader>
            <v-list
                v-for="(name,index) in reqIdsNow" :key="index"
            >
               <v-list-tile hover @click="goToMessage(name.to_user)" v-if="currentUser === name.from_user">{{name.to_user}}</v-list-tile>
               <v-list-tile hover @click="goToMessage(name.from_user)" v-else-if="currentUser === name.to_user">{{name.from_user}}</v-list-tile>
            </v-list>
        </v-list>
      </v-card>
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
            declinedName: '',
            emptyBool: false
        }
    },
    async mounted () {
        // do request for backend for friend requests
        this.getFriendships()
    },
    methods: {
        async getFriendships () {
            let response = await FriendService.getAllFriendships({
                user: this.currentUser
            })
            this.reqShow = response.data
            if (this.reqShow.length === 0) {
                this.emptyBool = true
            }
        },
        async goToMessage (user) {
            try {
                // go to my profile
                this.$router.push({
                    name: `message`,
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
