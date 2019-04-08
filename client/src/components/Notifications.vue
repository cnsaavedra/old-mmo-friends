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
                    @click="accept(ign.ign, ign.UserId)">
                    Accept
                </v-btn>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
import UserService from '@/services/UserService'
//import FriendService from '@/services/FriendService'
import {mapState} from 'vuex'

export default {
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
    methods: {
        async accept (ign, UserId) {
            try {
                this.currentUser = this.$store.state.user.username
                //const currentUserId = this.$store.state.user.id
                this.notifiedIgn = ign
                this.notifiedUserId = UserId
                const response = await UserService.getUserFromUserId({
                    id: UserId
                })
                this.notifiedUser = response.data.user.id
                console.log(this.notifiedUser)
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
