<template>
    <v-toolbar fixed dark>
        <v-toolbar-title class="mr-4">
            <span
                class="home"
                @click="navigateTo({name: 'root'})">
                OldMMOFriendFinder
            </span>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn flat dark>
                Games
            </v-btn>
            <v-btn flat dark>
                Friends
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                flat
                dark
                @click="navigateTo({name: 'login'})">
                Login
            </v-btn>
            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                flat
                dark
                @click="navigateTo({name: 'register'})">
                Sign-Up
            </v-btn>
            <v-btn
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
        }

    }
}
</script>

<style scoped>
.home{
    cursor:pointer;
}

.home:hover{
    color:grey
}
</style>

