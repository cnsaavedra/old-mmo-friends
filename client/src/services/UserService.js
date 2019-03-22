import Api from '@/services/Api'

export default {
    getUserName (id) {
        return Api().get(`profile/${id}`)
    },
    getGames () {
        return Api().get('games')
    }
}
