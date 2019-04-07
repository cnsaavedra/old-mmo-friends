import Api from '@/services/Api'

export default {
    getUserFromUserId (id) {
        return Api().post('userFromId', id)
    },
    getUserIdFromUser (username) {
        return Api().post('idFromUser', username)
    },
    sendFriendReq (id1, id2) {
        return Api().post('friendreq', id1, id2)
    }
}
