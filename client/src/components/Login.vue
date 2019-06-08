<template>
    <v-container align-center justify-center fill-height>
        <v-layout align-center justify-center fill-height>
            <v-flex md3 pb-5 mb-5>
                <v-img src="https://i.imgur.com/r8xoU9k.png" aspect-ratio="2"></v-img>
                <v-sheet elevation="5">
                        <v-flex pr-5 pl-5>
                            <v-text-field
                                prepend-icon="person"
                                type="username"
                                name="username"
                                label="Username"
                                v-model="username"
                            ></v-text-field>
                        </v-flex>
                        <v-flex pr-5 pl-5>
                            <v-text-field
                                prepend-icon="lock"
                                type="password"
                                name="password"
                                label="Password"
                                v-model="password"
                            ></v-text-field>
                        </v-flex>
                        <div class="error" v-html="error" >
                        </div>
                </v-sheet>
                <v-flex pt-5>
                    <v-btn color="info"
                        class = "blue hvr-bounce-in"
                        @click="login">
                        LOGIN
                    </v-btn>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
    data () {
        return {
            username: '',
            password: '',
            error: null
        }
    },
    methods: {
        async login () {
            try {
                const response = await AuthenticationService.login({
                    username: this.username,
                    password: this.password
                })
                //call action using dispatch
                //call stores setToken method, which calls mutation setToken which updates state to token
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                // go to my profile
                this.$router.push({
                    name: `profile`,
                    params: {username: response.data.user.username}
                })
            } catch (error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>

<style scoped>

</style>

