import Api from '@/services/Api'

export default {
    getGames (userid) {
        return Api().get('games', {
            body: {
                UserID: userid
            }
        })
    },
    post (game) {
        return Api().post('games', game)
    }
}
