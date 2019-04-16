<template>
    <v-content fluid>
        <h1>{{otherusername}}</h1>
        <v-list
            v-for="(msg,index) in totalMsg" :key="index"
        >
        {{msg.from_user}}: {{msg.message}}
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
            sentmessages: [],
            receivedmessages: [],
            totalmessages: []
        }
    },
    computed: {
        totalMsg: function () {
            return this.totalmessages.sort(function (a, b) {
                return a.createdAt - b.createdAt
            })
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
            let received = await MessagingService.getMsg({
                    user2: myname,
                    user1: othername
            })
            for (var msg1 in response.data) {
                this.sentmessages.push(response.data[msg1])
            }
            for (var msg2 in received.data) {
                this.receivedmessages.push(received.data[msg2])
            }
            for (var msgs1 in this.sentmessages) {
                this.totalmessages.push(this.sentmessages[msgs1])
            }
            for (var msgs2 in this.receivedmessages) {
                this.totalmessages.push(this.receivedmessages[msgs2])
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
