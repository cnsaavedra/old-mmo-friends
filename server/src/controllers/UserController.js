const {User} = require('../models')
const {Game} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// FOR TOKENS
function jwtSignUser (user) {
    // 60 seconds 60 minutes 24 hours 7 days
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    // only care about express endpoint/middleware, the callback function
    async register (req, res) {
        try{
            const user = await User.create(req.body)
            const userJSON = user.toJSON()
            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON)
            })
        } catch (err) {
            // Since we have unique as True in our User model 
            res.status(400).send({
                error: 'This email account is already in use.'
            })
            // email already exist
        }
    },
    async login (req, res) {
        try{
            // thank you for sequelize makes SQL much easier
            const {username, password} = req.body
            const user = await User.findOne({
                where:{
                    username: username
                }
            })
            if(!user) {
                return res.status(403).send({
                    error: 'The login information was correct'
                })
            }

            //await since returning a promise
            const isPasswordValid = await user.comparePassword(password)
            if(!isPasswordValid){
                return res.status(403).send({
                    error: 'The login information was correct'
                })
            }
            const userJSON = user.toJSON()
            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON)
            })
        } catch (err) {
            // Since we have unique as True in our User model 
            res.status(500).send({
                error: 'An error has occured trying to login.'
            })
        }
    },
    async index (req, res) {
            try {
            let usernames = null
            const search = req.query.search
            if (search) {
                usernames = await User.findAll({
                where: {
                    $or: [
                    'username'
                    ].map(key => ({
                    [key]: {
                        $like: `%${search}%`
                    }
                    }))
                }
                })
            } else {
                usernames = await User.findAll({
                    raw: true,
                    attributes: ['username']
                })
            }
            res.send(usernames)
            } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the users'
            })
        }
    },
     async getUserName (req, res) {
         try {
             const name = req.params.username
             const user = await User.findOne({
                 where:{
                     username : name
                 }
             })
             res.send(user.username)
             } catch (err) {
                 res.status(500).send({
                 error: 'an error has occured trying to show the name'
             })
             }
     },
    // async getUserName (req, res) {
    //     try {
    //         const user = await User.findById(req.params.id)
    //         res.send(user)
    //     } catch (err) {
    //         res.status(500).send({
    //         error: 'an error has occured trying to show the songs'
    //         })
    //     }
    // },
    //------------- THIS IS ALL FOR GAME INFO CONNECTED TO THE SPECIFIC USER ------------------
    async getGames (req, res) {
        try {
            let games = null
            const search = req.query.search
            if (search) {
                games = await Game.findAll({
                where: {
                    $or: [
                    'ign', 'game', 'user'
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
