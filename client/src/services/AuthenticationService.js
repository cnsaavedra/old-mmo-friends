import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('register', credentials)
    },
    login (credentials) {
        return Api().post('login', credentials)
    }
}

//AuthenticationService.register({
//    email: "testing123456@gmail.com",
//    username: "test"
//    password: "123456"
//})
