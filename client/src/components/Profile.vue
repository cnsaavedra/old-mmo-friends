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
                <v-flex>
                    <div class="container">
                        <img
                            v-if="emptyPfp"
                            class="pfp-image"
                            :src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbyCLA6j52sEg3zuQDN9pBS4iTPrCt9ghz6EVmx6hn8ldUqGl-GQ'"
                        />
                        <img
                            v-if="!emptyPfp"
                            class="pfp-image"
                            :src="pfpShowNow"
                        />

                        <!-- NOTIFICATION -->

                        <v-btn
                            v-show= "!isUserProfile"
                            @click.stop="reqExist; selfBool; sentBool"
                            class = "blue"
                            v-if="$store.state.isUserLoggedIn && !currentlyFriends"
                            @click="notify(otherProfile)">
                            Notify!
                        </v-btn>


                        <v-dialog
                            v-model="selfBool"
                            max-width="290"
                        >
                            <v-card>
                                <v-card-title class="headline">You can't notify yourself dummy!</v-card-title>

                                <v-card-text>
                                :)
                                </v-card-text>

                                <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                    color="green darken-1"
                                    flat="flat"
                                    @click="selfBool = false"
                                >
                                    YOU GOT ME!
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog
                            v-model="sentBool"
                            max-width="290"
                        >
                            <v-card>
                                <v-card-title class="headline">Success!</v-card-title>

                                <v-card-text>
                                You just need to now wait for a respond back :)
                                </v-card-text>

                                <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                    color="green darken-1"
                                    flat="flat"
                                    @click="sentBool = false"
                                >
                                    Sure!
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>


                        <v-dialog
                            v-model="reqExist"
                            max-width="290"
                        >
                            <v-card>
                                <v-card-title class="headline">You have already request a friend request to this person</v-card-title>

                                <v-card-text>
                                Nice try spamming.
                                </v-card-text>

                                <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                    color="green darken-1"
                                    flat="flat"
                                    @click="reqExist = false"
                                >
                                    I won't spam.
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <div v-show= "isUserProfile" class="overlay">
                            <v-layout align-center justify-center fill-height row>
                                <v-dialog v-model="profileModal" persistent max-width="290">
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            class="hvr-bob"
                                            v-show= "isUserProfile"
                                            fab
                                            small
                                            v-on="on"
                                            @click.stop="profileModal = true"
                                            color="indigo"
                                        >
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="headline">Add a profile picture!</v-card-title>
                                            <v-flex>
                                                <input type="file" @change="onFileSelected">
                                                <v-text-field
                                                    label="Or you can add an image url"
                                                    v-model="userPfp"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-card-actions>
                                            <v-btn
                                                color="green darken-1"
                                                flat
                                                xs6 offset-xs3
                                                @click="profileModal = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                color="green darken-1"
                                                flat
                                                xs6 offset-xs3
                                                @click="upload"
                                            >
                                                Image
                                            </v-btn>
                                            <v-btn
                                                color="green darken-1"
                                                flat
                                                xs6 offset-xs3
                                                @click="uploadURL"
                                            >
                                                URL Image
                                            </v-btn>
                                            </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <div class="text-no-wrap-center">Update Picture</div>
                            </v-layout>
                        </div>
                    </div>
                </v-flex>

                <!--User Games -->
                <h1>User: {{username}}</h1>
                <v-spacer></v-spacer>
                <div class="Games">
                    <v-dialog v-model="adder" persistent max-width="290">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    v-show= "isUserProfile"
                                    fab
                                    small
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
                     <h2>Games: </h2>
                    <v-list
                        dark
                        v-for="(ign, index) in ignShowNow.slice(firstIndex, lastIndex)" :key="index"
                    >
                        {{ign.ign}}: {{ign.game}}
                        <v-btn
                            class = "blue hvr-buzz"
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
        </v-flex>
    </v-layout>
</template>

<script>
import GamePanel from '@/components/GamePanel'
import UserService from '@/services/UserService'
import GameService from '@/services/GameService'
import FriendService from '@/services/FriendService'
export default {
    data () {
        return {
            currentUser: '',
            selfBool: false,
            reqExist: false,
            sentBool: false,
            notifiedIgn: '',
            notifiedUserId: '',
            notifiedUser: '',
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
            sizeOfPage: 0,
            profileModal: false,
            selectedFile: null,
            userPfp: '',
            viewPfp: '',
            otherProfile: '',
            emptyPfp: false,
            currentlyFriends: false
        }
    },
    methods: {
        async areFriends () {
            try {
                let pfp = await UserService.getUserIdFromUser({
                    username: this.username
                })
                this.otherProfile = pfp.data.user.id

                this.currentUser = this.$store.state.user.username
                const response = await UserService.getUserFromUserId({
                    id: this.otherProfile
                })
                this.notifiedUser = response.data.user.username

                // disable spam friend requests
                const findFriends = await FriendService.getFriends({
                    id1: this.$store.state.user.username,
                    id2: response.data.user.username
                })

                // disable spam friend requests
                const findFriends2 = await FriendService.getFriends({
                    id1: response.data.user.username,
                    id2: this.$store.state.user.username
                })
                if (findFriends.data.friends !== null) {
                    let currentMe = (findFriends.data.friends.from_user)
                    let currentOther = (findFriends.data.friends.to_user)
                    let statusFriendship = (findFriends.data.friends.status)

                    if ((currentMe === this.$store.state.user.username && currentOther === this.notifiedUser && statusFriendship === 1) ||
                    (currentOther === this.$store.state.user.username && currentMe === this.notifiedUser && statusFriendship === 1)) {
                        this.currentlyFriends = true
                    } else {
                        this.currentlyFriends = false
                    }
                }
                if (findFriends2.data.friends !== null) {
                    let currentMe = (findFriends2.data.friends.from_user)
                    let currentOther = (findFriends2.data.friends.to_user)
                    let statusFriendship = (findFriends2.data.friends.status)

                    if ((currentMe === this.$store.state.user.username && currentOther === this.notifiedUser && statusFriendship === 1) ||
                    (currentOther === this.$store.state.user.username && currentMe === this.notifiedUser && statusFriendship === 1)) {
                        this.currentlyFriends = true
                    } else {
                        this.currentlyFriends = false
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        async notify (UserId) {
            try {
                this.currentUser = this.$store.state.user.username
                this.notifiedUserId = UserId
                const response = await UserService.getUserFromUserId({
                    id: UserId
                })
                this.notifiedUser = response.data.user.username

                // disable spam friend requests
                const findFriends = await FriendService.getFriends({
                    id1: this.currentUser,
                    id2: this.notifiedUser
                })
                if (findFriends.data.friends === null && this.currentUser !== this.notifiedUser) {
                    this.sentBool = true
                    await FriendService.sendFriendReq({
                        id1: this.currentUser,
                        id2: this.notifiedUser
                    })
                } else if (findFriends.data.friends !== null) {
                    this.reqExist = true
                  //temporary else if
                } else if (this.currentUser === this.notifiedUser) {
                    this.selfBool = true
                }
                //console.log(this.currentUser + ' is the current user')
                //console.log(this.notifiedIgn + ' is the notified ign for user: ' + this.notifiedUserId + ': ' + this.notifedUser.username)
            } catch (error) {
                console.log(error)
            }
        },
        onFileSelected (event) {
            this.selectedFile = event.target.files[0]
        },
        async upload () {
            this.profileModal = false
            const fd = new FormData()
            fd.append('image', this.selectedFile, this.selectedFile.name)
            console.log(fd)
            try {
                const response = await UserService.uploadPfp({
                    id: this.userID,
                    pfp: fd
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async uploadURL () {
            this.profileModal = false
            this.updated = true
            try {
                const response = await UserService.uploadPfp({
                    id: this.userID,
                    pfp: this.userPfp
                })
                this.updated = false
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async getPfp () {
            let pfp = await UserService.getUserIdFromUser({
                    username: this.username
            })
            this.viewPfp = pfp.data.user.pfp
            this.otherProfile = pfp.data.user.id
            if (this.viewPfp == null) {
                this.emptyPfp = true
            } else {
                this.emptyPfp = false
            }
        },
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
                this.getPfp()
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
        },
        pfpShowNow: function () {
            // watches if something is added
            if (this.updated === true) {
                this.getPfp()
            }
            return this.viewPfp
        },
        areFriendsNow: function () {
            if (this.updated === true) {
                this.areFriends()
            }
            return this.currentlyFriends
        }
    },
    async mounted () {
        // do request for backend for username and gamenames from user
        try {
            this.areFriends()
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
.pfp-image {
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
}

/* Container needed to position the overlay. Adjust the width as needed */
.container {
  position: relative;
  width: 50%;
}


/* The overlay effect (full height and width) - lays on top of the container and over the image */
.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #424242;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transition: .3s ease;
}

/* When you mouse over the container, the overlay text will "zoom" in display */
.container:hover .overlay {
  transform: scale(1);
}

/* Some text inside the overlay, which is positioned in the middle vertically and horizontally */
.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

</style>
