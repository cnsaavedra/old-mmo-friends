const {Game} = require('../models')

module.exports = {
    async getGames (req, res) {
        try {
            let games = null
            const search = req.query.search
            if (search) {
                games = await Game.findAll({
                where: {
                    $or: [
                    'ign', 'game', 'UserId'
                    ].map(key => ({
                    [key]: {
                        $like: `%${search}%`
                    }
                    }))
                }
                })
            } else {
                games = await Game.findAll({
                limit: 10
                })
            }
            res.send(games)
            } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the games'
            })
        }
    },
    async show (req, res) {
        try {
          const game = await Game.findById(req.params.gameId)
          res.send(game)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to show the game'
          })
        }
      },
    async post (req, res) {
        try {
          const game = await Game.create(req.body)
          res.send(game)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create the game'
          })
        }
      }
}
