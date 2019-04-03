import Api from '@/services/Api'

export default {
    index (search) {
        return Api().get('users', {
            params: {
                search: search
            }
        })
    },
    getIgnAndGame (search) {
        return Api().get('ignGame', {
            params: {
                search: search
            }
        })
    },
    getUserFromUserId (id) {
        return Api().post('userFromId', id)
    },
    getUserIdFromUser (username) {
        return Api().post('idFromUser', username)
    },
    getUserName (username) {
        return Api().get(`profile/${username}`)
    }
}
