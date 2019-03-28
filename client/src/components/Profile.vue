<template>
    <v-layout column>
        <v-flex xs6>
            <panel user="User">
                {{username}}
            </panel>
            <panel gamenames="Games">
                {{gamenames}}
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
                                    v-model="gamenames.game"
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
import GameService from '@/services/GameService'

export default {
    data () {
        return {
            username: '',
            userID: '',
            gamenames: {
                ign: '',
                game: '',
                UserId: this.userID
            },
            adder: false,
            adding: false
        }
    },
    methods: {
        async add () {
            this.adder = false
            await GameService.post({
                ign: this.gamenames.ign,
                game: this.gamenames.game,
                UserId: this.userID
            })
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
        const name = this.$store.state.route.params.username
        this.username = (await UserService.getUserName(name)).data
        this.userID = this.$store.getters.getUserById
        console.log(this.userID)
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
