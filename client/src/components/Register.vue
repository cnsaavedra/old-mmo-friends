<template>
    <div>
        <h1>Register</h1>
        <input
            type="email"
            name="email"
            v-model="email"
            placeholder="Email" />
        <br>
        <input
            type="username"
            name="username"
            v-model="username"
            placeholder="Username" />
        <br>
        <input
            type="password"
            name="password"
            v-model="password"
            placeholder="Password" />
        <br>
        <button
            @click="register">
            Find Your Friends!
        </button>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
    data () {
        return {
            email: '',
            username: '',
            password: ''
        }
    },
    methods: {
        async register () {
            const response = await AuthenticationService.register({
                email: this.email,
                username: this.username,
                password: this.password
            })
            console.log(response.data)
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

</script>

<style scoped>

</style>

