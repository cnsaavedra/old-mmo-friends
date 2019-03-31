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
        return Api().get('userFromId', id)
    },
    getUserName (username) {
        return Api().get(`profile/${username}`)
    }
}
