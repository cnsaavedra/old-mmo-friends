import Api from '@/services/Api'

export default {
    index (search) {
        return Api().get('users', {
            params: {
                search: search
            }
        })
    },
    getUserName (username) {
        return Api().get(`profile/${username}`)
    },
    getGames () {
        return Api().get('games')
    }
}
