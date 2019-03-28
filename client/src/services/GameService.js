import Api from '@/services/Api'

export default {
    index (search) {
        return Api().get('games', {
            params: {
                search: search
            }
        })
    },
    getGames () {
        return Api().get('games')
    },
    post (game) {
        return Api().post('games', game)
    }
}
