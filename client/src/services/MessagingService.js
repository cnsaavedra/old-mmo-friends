import Api from '@/services/Api'

export default {
    getMsg (user1, user2) {
        return Api().get(`message/${user2}`, { data: { from_user: user1 } })
    },
    getMsgUserWith (username) {
        return Api().get(`message/${username}`)
    },
    sendMsg (user1, user2, message) {
        return Api().post(`message/${user2}`, user1, message)
    }
}
