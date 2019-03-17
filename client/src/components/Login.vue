<template>
    <v-layout column>
        <v-container align-center>
            <div class ="white elevation-2">
                <v-toolbar flat dense class dark>
                    <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <div class = 'pl-4 pr-4 pt-2 pb-2'>
                    <v-flex xs6 offset-xs3>
                        <v-text-field
                            type="username"
                            name="username"
                            v-model="username"
                            placeholder="Username"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6 offset-xs3>
                        <v-text-field
                            type="password"
                            name="password"
                            v-model="password"
                            placeholder="Password"
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
                console.log(response.data)
            } catch (error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>

<style scoped>

</style>

