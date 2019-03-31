import Api from '@/services/Api'

export default {
    index (search) {
        return Api().get('users', {
            params: {
                search: search
            }
        })
    },
    getIgn (search) {
        return Api().get('ign', {
            params: {
                search: search
            }
        })
    },
    getUserName (username) {
        return Api().get(`profile/${username}`)
    }
}
