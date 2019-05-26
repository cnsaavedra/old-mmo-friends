<template>
    <v-layout class="layout-body">
        <v-flex
            d-flex
        >
            <v-sheet
                class="d-flex"
                dark
                height="100vh"
                max-width="450"
                elevation="0"
                >
                <div class="User">
                <span style="opacity:0;">.</span>
                <h1>User: {{username}}</h1>
                <v-spacer></v-spacer>
                <div class="Games">
                     <h2>Games: </h2>
                    <v-list
                        dark
                        v-for="(ign, index) in ignShowNow.slice(firstIndex, lastIndex)" :key="index"
                    >
                        {{ign.ign}}: {{ign.game}}
                        <v-btn
                            class = "blue"
                            v-show= "isUserProfile"
                            @click="deleteGame(ign.id)">
                            delete
                        </v-btn>
                    </v-list>
                </div>
                <v-pagination
                    v-model="page"
                    :length="sizeOfPage"
                    circle
                ></v-pagination>
                </div>
            </v-sheet>
            <v-layout>
                <v-dialog v-model="adder" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-show= "isUserProfile"
                            outline
                            fab
                            v-on="on"
                            color="indigo">
                        <v-icon>settings</v-icon>
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
                UserId: this.userID,
                UserName: this.username
            },
            ignShow: '',
            viewId: '',
            // for if the user has pressed accept on adding a game
            adder: false,
            adding: false,
            updated: false,
            page: 1,
            firstIndex: 0,
            lastIndex: 5,
            sizeOfPage: 0
        }
    },
    methods: {
        // adding games for a user
        async add () {
            this.adder = false
            // updates the game list
            this.updated = true
            //adds a game given the params
            await GameService.post({
                ign: this.gamenames.ign,
                game: this.gamenames.game,
                UserId: this.userID,
                UserName: this.username
            })
            console.log('Added game.')
            //stops updating
            this.updated = false
            try {
                if (this.adding === true) {
                    console.log(this.adding)
                }
            } catch (err) {
                console.log(err)
            }
        },
        async deleteGame (id) {
            this.updated = true
            console.log('Removing ' + id)
            await GameService.remove(id)
            this.updated = false
            console.log('Deleted game.')
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
            this.sizeOfPage = this.ignShow.length / 6
        }
    },
    watch: {
        '$route.params.username': {
            immediate: true,
            handler (value) {
                this.username = value
                this.getId()
            }
        },
        page: function (newVal, oldVal) {
            if (newVal > oldVal) {
                if (newVal > 1) {
                    this.firstIndex = 0
                    this.lastIndex = 5
                }
                this.firstIndex = (this.firstIndex + 5) * (newVal - 1)
                this.lastIndex = (this.lastIndex + (5 * (newVal - 1)))
                console.log(this.firstIndex, this.lastIndex)
            } else if (newVal < oldVal) {
                if ((oldVal - newVal) > 1) {
                    this.firstIndex = 0
                    this.lastIndex = 5
                    this.firstIndex = (this.firstIndex + 5) * (newVal - 1)
                    this.lastIndex = (this.lastIndex + (5 * (newVal - 1)))
                } else {
                    this.firstIndex = (this.firstIndex - 5) * (oldVal - newVal)
                    this.lastIndex = (this.lastIndex - 5) * (oldVal - newVal)
                }
                console.log(this.firstIndex, this.lastIndex)
            }
        }
    },
    computed: {
        isUserProfile: function () {
            return this.$store.state.route.params.username === this.$store.state.user.username
        },
        ignShowNow: function () {
            // watches if something is added
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
