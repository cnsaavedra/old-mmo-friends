<template>
    <v-content fluid>
        <h1>{{otherusername}}</h1>
        <v-text-field
                class="messagebox"
                outline
                placeholder="Enter a message"
        >
        </v-text-field>
    </v-content>
</template>

<script>
import UserService from '@/services/UserService'

export default {
    data () {
        return {
            myusername: '',
            otherusername: '',
            userID: '',
            ignShow: '',
            viewId: ''
        }
    },
    methods: {
    },
    async mounted () {
        // do request for backend for username and gamenames from user
        try {
            let myname = this.$store.state.user.username
            let othername = this.$store.state.route.params.username
            this.myusername = (await UserService.getUserName(myname)).data
            this.otherusername = (await UserService.getUserName(othername)).data






            // problems with having usernames as an integer
            if (Number.isInteger(this.myusername)) {
                this.myusername = JSON.stringify(this.myusername)
            } else {
                this.myusername = this.myusername.replace(/['"]+/g, '')
            }
            if (Number.isInteger(this.otherusername)) {
                this.otherusername = JSON.stringify(this.otherusername)
            } else {
                this.otherusername = this.otherusername.replace(/['"]+/g, '')
            }
        } catch (err) {
        console.log(err)
        }
    }
}
</script>

<style scoped>
.messagebox{
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
}


</style>
