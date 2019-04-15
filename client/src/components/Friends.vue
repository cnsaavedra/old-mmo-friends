<template>
    <v-layout column>
        <v-flex
            xs6
        >
            <v-img
                v-show="emptyBool"
                aspect-ratio="2.5"
                contain
                src="https://i.imgur.com/ABGA8F4.png"
            >
            </v-img>
            <v-list
                dark
                v-for="(name,index) in reqIdsNow" :key="index"
            >
               <h1 v-if="currentUser === name.from_user">{{name.to_user}}</h1>
               <h1 v-else-if="currentUser === name.to_user">{{name.from_user}}</h1>
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

.v-image__image, .v-image__placeholder, .v-image__image--contain {
    background-attachment: fixed !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
}

</style>
