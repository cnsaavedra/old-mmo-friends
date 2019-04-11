import Api from '@/services/Api'

export default {
    // getGames (userid) {
    //     return Api().get('getgames', {
    //         body: {
    //             UserId: userid
    //         }
    //     })
    // },
    getGames (id) {
        return Api().post('getgames', id)
    },
    post (game) {
        return Api().post('games', game)
    },
    remove (id) {
        return Api().delete('games', { data: { id: id } })
    }
}
