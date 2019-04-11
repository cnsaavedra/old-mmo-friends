<template>
    <v-layout column>
        <v-flex
            xs12
            md4
            d-flex
        >
            <v-sheet
                class="d-flex"
                dark
                height="800"
                max-width="450"
                elevation="15"
                >
                <div class="User">
                <h1>User: {{username}}</h1>
                <v-spacer></v-spacer>
                <div class="Games">
                     <h2>Games: </h2>
                    <v-list
                        dark
                        v-for="(ign, index) in ignShowNow" :key="index"
                    >
                        {{ign.ign}}: {{ign.game}}
                    </v-list>
                </div>
                </div>
            </v-sheet>
            <v-layout row justify-center>
                <v-dialog v-model="adder" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-show= "isUserProfile"
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
import GamePanel from '@/components/GamePanel'
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
            ignShow: '',
            viewId: '',
            // for if the user has pressed accept on adding a game
            adder: false,
            adding: false,
            updated: false
        }
    },
    methods: {
        // adding games for a user
        async add () {
            this.adder = false
            this.updated = true
            //adds a game given the params
            await GameService.post({
                ign: this.gamenames.ign,
                game: this.gamenames.game,
                UserId: this.userID
            })
            console.log('Added game.')
            this.updated = false
            try {
                if (this.adding === true) {
                    console.log(this.adding)
                }
            } catch (err) {
                console.log(err)
            }
        },
        async getId () {
            // get id from the given user to get their games
            let getId = await UserService.getUserIdFromUser({
                    username: this.username
            })
            this.viewId = getId.data.user.id

            // give profile the games for the user
            let response = await GameService.getGames({
                id: this.viewId
            })
            this.ignShow = response.data
        }
    },
    watch: {
        '$route.params.username': {
            immediate: true,
            handler (value) {
                this.username = value
                this.getId()
            }
        }
    },
    computed: {
        isUserProfile: function () {
            return this.$store.state.route.params.username === this.$store.state.user.username
        },
        ignShowNow: function () {
            if (this.updated === true) {
                this.getId()
            }
            return this.ignShow
        }
    },
    async mounted () {
        // do request for backend for username and gamenames from user
        try {
            let name = this.$store.state.route.params.username
            this.username = (await UserService.getUserName(name)).data

            // used for assigning userid to a game
            this.userID = this.$store.getters.getUserById

            // problems with having usernames as an integer
            if (Number.isInteger(this.username)) {
                this.username = JSON.stringify(this.username)
            } else {
                this.username = this.username.replace(/['"]+/g, '')
            }
        } catch (err) {
        console.log(err)
        }
    },
    components: {
        GamePanel,
        SheetFooter: {
            functional: true,
             render (h, { children }) {
                return h('v-sheet', {
                    staticClass: 'mt-auto align-center justify-center d-flex',
                    props: {
                    color: 'rgba(0, 0, 0, .36)',
                    dark: true,
                    height: 50
            }
          }, children)
        }
      }
    }
}
</script>

<style scoped>

</style>
