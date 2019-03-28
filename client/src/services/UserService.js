import Api from '@/services/Api'

export default {
    getUserName (username) {
        return Api().get(`profile/${username}`)
    },
    getGames () {
        return Api().get('games')
    }
}
