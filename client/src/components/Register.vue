<template>
    <v-container align-center justify-center fill-height>
        <v-layout align-center justify-center fill-height>
            <v-flex md4 pb-5 mb-5>
                <v-img src="https://i.imgur.com/VN9QJMp.png" aspect-ratio="2"></v-img>
                <v-sheet elevation="5">
                    <form
                        name="mmo-friend-finder-form"
                        autocomplete="off"
                    >
                        <v-flex xs6 offset-xs3>
                            <v-text-field
                                prepend-icon="mail"
                                type="email"
                                name="email"
                                v-model="email"
                                placeholder="Email"
                            ></v-text-field>
                        </v-flex>
                            <v-flex xs6 offset-xs3>
                            <v-text-field
                                prepend-icon="person"
                                type="username"
                                name="username"
                                v-model="username"
                                placeholder="Username"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6 offset-xs3>
                            <v-text-field
                                prepend-icon="lock"
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
                </v-sheet>
                <v-flex pt-5>
                <v-btn color="info"
                    class = "blue"
                    @click="register">
                    Find Your Friends!
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

