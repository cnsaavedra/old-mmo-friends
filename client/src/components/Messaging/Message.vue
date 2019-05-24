<template>
    <v-content>
        <v-container fluid grid-list-xl class="chatbox">
            <v-layout column align-start pb-5 ma-2>
                <v-list
                    class="message"
                    max-height="50"
                    v-for="(msg,index) in totalmessages" :key="index"
                >
                <v-list-tile-title class="title font-weight-bold">{{msg.from_user}}</v-list-tile-title>
                <v-list-tile-sub-title rounded class="subheading text-sm-left">{{msg.message}}</v-list-tile-sub-title>
                </v-list>
            </v-layout>
        </v-container>
        <v-container>
            <v-flex xs2>
                <v-text-field
                    single-line
                    class="messagebox"
                    outline
                    v-model="currentmessage"
                    placeholder="Enter a message"
                    v-on:keyup.enter="sendMsg"
                >
                </v-text-field>
            </v-flex>
        </v-container>
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
            totalmessages: [],
            updated: false
        }
    },
    methods: {
        async sendMsg () {
            this.updated = true
            let myname = this.$store.state.user.username
            let othername = this.$store.state.route.params.username
            let sendVal = await MessagingService.sendMsg({
                user1: myname,
                user2: othername,
                message: this.currentmessage
            })
            console.log(sendVal.data)
            this.totalmessages.push(sendVal.data)
            this.currentmessage = ''
            this.updated = true
        },
        async getAllMsg () {
            let myname = this.$store.state.user.username
            let othername = this.$store.state.route.params.username
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
            this.totalmessages.sort(function (a, b) {
                return a.id - b.id
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

.subheading.text-sm-left {
    display:inline-block;
    clear: both;
    padding: 10px;
    border-radius: 30px;
    margin-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
    background: #0084ff;
    color: #fff;
}

.chatbox {
    height: 800px;
    overflow-y: auto;
}

html, body {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    max-height: 100vh;
    overflow: hidden;
    padding-bottom: 1px;
}

.message{
    background-color: #fafafa
}

</style>
