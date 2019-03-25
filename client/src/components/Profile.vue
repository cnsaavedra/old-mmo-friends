<template>
    <v-layout column>
        <v-flex xs6>
            <panel user="User">
                {{username}}
            </panel>
            <panel gamenames="Games">
                <!-- unique identifier for gamename is ign -->
                <div v-for="gamename in gamenames"
                    :key="gamename.ign">
                    {{gamename.game}}:
                    {{gamename.ign}}
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import UserService from '@/services/UserService'

export default {
    data () {
        return {
            username: {},
            gamenames: ''
        }
    },
    async mounted () {
        // do request for backend for username and gamenames from user
        try {
        const userID = this.$store.state.user.id
        //console.log(userID)
        this.username = (await UserService.getUserName(userID)).data
        //console.log(this.username)
        } catch (err) {
        console.log(err)
        }
    },
    components: {
        Panel
    }
}
</script>

<style scoped>

</style>
