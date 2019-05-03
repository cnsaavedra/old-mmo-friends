<template>
    <v-toolbar fixed dark>
        <v-toolbar-title class="mr-4">
            writethistoshowimage
            <span
                class="home"
                @click="navigateTo({name: 'root'})">
                <v-img src="https://i.gyazo.com/e2733790126125190fb51c2429a6b929.png" aspect-ratio="4"></v-img>
            </span>
            <span style="opacity:0;">.</span>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn
                class="text-lowercase"
                flat
                dark
                @click="navigateTo({name: 'find'})">
                Find Friends
            </v-btn>
            <v-btn
                class="text-lowercase"
                flat
                dark
                @click="navigateTo({name: 'users'})">
                UserList
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn
                class="text-lowercase"
                v-if="!$store.state.isUserLoggedIn"
                flat
                dark
                @click="navigateTo({name: 'login'})">
                Login
            </v-btn>
            <v-btn
                class="text-lowercase"
                v-if="!$store.state.isUserLoggedIn"
                flat
                dark
                @click="navigateTo({name: 'register'})">
                Sign-Up
            </v-btn>

            <v-menu
                v-if="$store.state.isUserLoggedIn"
                transition="slide-y-transition"
                nudge-top
                >
                <template v-slot:activator="{ on }">
                    <v-btn
                    flat
                    color="normal"
                    v-on="on"
                    v-if="$store.state.isUserLoggedIn"
                    >
                    <h3>{{loggedinuser}}</h3>
                    <span style="opacity:0;">.</span>
                     <v-icon>account_circle</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-tile
                        @click="myprofile"
                    >
                    <v-list-tile-title>Profile</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                        @click="navigateTo({name: 'myfriends'})"
                    >
                    <v-list-tile-title>Friends</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-btn
                class="text-lowercase"
                v-if="$store.state.isUserLoggedIn"
                flat
                dark
                @click="navigateTo({name: 'notifs'})">
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn
                class="text-lowercase"
                v-if="$store.state.isUserLoggedIn"
                flat
                dark
                @click="navigateTo({name: 'mymessages'})">
                 <v-icon>chat</v-icon>
            </v-btn>
            <v-btn
                class="text-lowercase"
                v-if="$store.state.isUserLoggedIn"
                flat
                dark
                @click="logout">
                Logout
            </v-btn>
            <!-- SINCE WE DON'T WANT TO wrap the link with some dumb hyperlink-->
            <!-- <router-link to="home">Home</router-link> -->
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    data () {
        return {
            loggedinuser: '',
            username: '',
            error: null
        }
    },
    watch: {
        '$route.params.username': {
            immediate: true,
            handler (value) {
                this.username = value
                this.getUser()
            }
        }
    },
    methods: {
        navigateTo (route) {
            this.$router.push(route)
        },
        logout () {
            // store.dispatch inside action creators
            // since we're setting it to null, member in store
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            // goes to main page after logout
            this.$router.push({
                name: 'root'
            })
        },
        async getUser () {
            if (this.$store.state.isUserLoggedIn) {
                this.loggedinuser = this.$store.state.user.username
            }
        },
        async myprofile () {
            try {
                // go to my profile
                this.$router.push({
                    name: `profile`,
                    params: {username: this.$store.state.user.username}
                })
            } catch (error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>

<style scoped>
.home{
    cursor:pointer;
    font-size: 30px;
}

.home:hover{
    color:grey
}

.text-lowercase{
    font-size: 20px;
    font-weight: bold;
}
</style>

