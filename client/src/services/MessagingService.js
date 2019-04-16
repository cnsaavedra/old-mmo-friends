import Api from '@/services/Api'

export default {
    getChat (user1, user2) {
        return Api().post('message', user1, user2)
    },
    getMsgUserWith (username) {
        return Api().get(`message/${username}`)
    }
}
