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
import MessagingService from '@/services/MessagingService'

export default {
    data () {
        return {
            myusername: '',
            otherusername: '',
            currentmessage: '',
            messages: []
        }
    },
    methods: {
        async getAllMsg () {
            let response = (await MessagingService.getMsg({
                from_user: this.myusername,
                to_user: this.otherusername
            }))
            console.log(response.data)
        },
        async sendMsg () {
            await MessagingService.sendMsg({
                from_user: this.myusername,
                to_user: this.otherusername,
                message: this.currentmessage
            })
        }
    },
    async mounted () {
        // do request for backend for username and gamenames from user
        try {
            let myname = this.$store.state.user.username
            let othername = this.$store.state.route.params.username
            this.myusername = (await UserService.getUserName(myname)).data
            this.otherusername = (await UserService.getUserName(othername)).data
            this.getAllMsg()
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
