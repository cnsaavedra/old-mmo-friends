import Api from '@/services/Api'

export default {
    getMsg (user1, user2) {
        return Api().post('message', user1, user2)
    },
    getMsgUserWith (username) {
        return Api().get(`message/${username}`)
    },
    sendMsg (user1, user2, message) {
        return Api().post('sendmessage', user1, user2, message)
    }
}
