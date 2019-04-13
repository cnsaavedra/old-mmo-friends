<template>
    <v-layout>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                <div class ="white elevation-2">
                    <v-toolbar flat dense class dark>
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <div class = 'pl-4 pr-4 pt-2 pb-2'>
                        <v-flex>
                            <v-text-field
                                prepend-icon="person"
                                type="username"
                                name="username"
                                label="Username"
                                v-model="username"
                            ></v-text-field>
                        </v-flex>
                        <v-flex>
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
                        <!-- <div class="error" v-html="error" /> -->
                        <br>
                        <v-btn color="info"
                            class = "blue"
                            @click="login">
                            LOGIN
                        </v-btn>
                    </div>
                </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
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

