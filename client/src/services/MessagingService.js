import Api from '@/services/Api'

export default {
    getChat (user1, user2) {
        return Api().post('chat', user1, user2)
    }
}
