<template>
    <v-layout column>
        <v-flex xs6>
            <panel user="UserList">
                {{usernames}}
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import UserService from '@/services/UserService'
import {mapState} from 'vuex'

export default {
    components: {
        Panel
    },
    computed: {
        ...mapState([
        'isUserLoggedIn'
        ])
    },
    data () {
        return {
        usernames: null
        }
    },
    async mounted () {
        this.usernames = (await UserService.index()).data
    }
    }
</script>

<style scoped>

</style>
