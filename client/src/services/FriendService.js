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
    },
    getFriends (id1, id2) {
        return Api().post('getfriends', id1, id2)
    },
    getAllFriendReqs (id2) {
        return Api().post('getallfriendreqs', id2)
    },
    resFriendReq (id1, id2, status) {
        return Api().put('acceptfriend', id1, id2, status)
    }
}
