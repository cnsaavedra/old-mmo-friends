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
                    {{gamenames.ign}}:
                    {{gamenames.gamename}}
                </div>
            </panel>
            <v-spacer></v-spacer>
            <v-layout row justify-center>
                <v-dialog v-model="adder" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            outline
                            large
                            fab
                            v-on="on"
                            color="indigo">
                        <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Add an IGN!</v-card-title>
                            <v-flex xs6 offset-xs3>
                                <v-text-field
                                    name="ign"
                                    v-model="gamenames.ign"
                                    placeholder="IGN"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6 offset-xs3>
                                <v-text-field
                                    name="gamename"
                                    v-model="gamenames.gamename"
                                    placeholder="Game"
                                ></v-text-field>
                            </v-flex>
                        <v-card-text>Please type in as accurate as possible your IGN along with the game played with it.</v-card-text>
                        <v-card-actions>
                            <v-btn color="green darken-1" flat @click="adder = false">Cancel</v-btn>
                            <v-btn color="green darken-1" flat @click="add">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import UserService from '@/services/UserService'

export default {
    data () {
        return {
            username: '',
            gamenames: {
                ign: '',
                gamename: ''
            },
            adder: false,
            adding: false
        }
    },
    methods: {
        async add () {
            this.adder = false
            console.log('Added game.')
            try {
                if (this.adding === true) {
                    console.log(this.adding)
                }
            } catch (err) {
                console.log(err)
            }
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
