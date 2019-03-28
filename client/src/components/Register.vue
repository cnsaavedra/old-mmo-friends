<template>
    <v-layout column>
        <v-container align-center>
            <div class ="white elevation-2">
                <v-toolbar flat dense class dark>
                    <v-toolbar-title>Register</v-toolbar-title>
                </v-toolbar>
                <div class = 'pl-4 pr-4 pt-2 pb-2'>
                    <form
                        name="mmo-friend-finder-form"
                        autocomplete="off">
                        <v-flex xs6 offset-xs3>
                            <v-text-field
                                type="email"
                                name="email"
                                v-model="email"
                                placeholder="Email"
                            ></v-text-field>
                        </v-flex>
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
                    </form>
                    <div class="error" v-html="error" >
                    </div>
                    <!-- <div class="error" v-html="error" /> -->
                    <br>
                    <v-btn color="info"
                        class = "blue"
                        @click="register">
                        Find Your Friends!
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
            email: '',
            username: '',
            password: '',
            error: null
        }
    },
    methods: {
        async register () {
            try {
                const response = await AuthenticationService.register({
                    email: this.email,
                    username: this.username,
                    password: this.password
                })
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
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

    //demonstrates two-way data binding
    // watch: {
    //     email(value) {
    //         console.log('email has changed value', value)
    //     }
    // },
    // shows data model view changes with mount & did it with setTimeOut
    // demonstrates input boxes two way binding
    // mounted() {
    //     setTimeout(() => {
    //         this.email=''
    //     }, 2000)


//style scoped only affects this template
</script>

<style scoped>

</style>

