import Api from '@/services/Api'

export default {
    getUserName (id) {
        return Api().get(`username/${id}`)
    },
    getGames () {
        return Api().get('games')
    }
}
