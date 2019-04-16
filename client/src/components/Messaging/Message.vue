<template>
    <v-content fluid>
        <h1>{{otherusername}}</h1>
        <v-list
            dark
            v-for="(msg,index) in messages" :key="index"
        >
        {{msg}}
        </v-list>
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
        async sendMsg () {
            await MessagingService.sendMsg({
                from_user: this.myusername,
                to_user: this.otherusername,
                message: this.currentmessage
            })
        }
    },
    async mounted () {
        // do request for backend for usernames
        try {
            let myname = this.$store.state.user.username
            let othername = this.$store.state.route.params.username
            this.myusername = (await UserService.getUserName(myname)).data
            this.otherusername = (await UserService.getUserName(othername)).data
            let response = await MessagingService.getMsg({
                    user1: myname,
                    user2: othername
            })
            for (var msg in response.data) {
                this.messages.push(response.data[msg].message)
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
