import Api from '@/services/Api'

export default {
    // getGames (userid) {
    //     return Api().get('getgames', {
    //         body: {
    //             UserId: userid
    //         }
    //     })
    // },
    getGames (username) {
        return Api().get('getgames', username)
    },
    post (game) {
        return Api().post('games', game)
    }
}
