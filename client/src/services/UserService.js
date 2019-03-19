import Api from '@/services/Api'

export default {
    getUserName () {
        return Api().get('username')
    },
    getGames () {
        return Api().get('games')
    }
}
