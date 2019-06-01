const {User} = require('../models')
const {Game} = require('../models')
const {Friend} = require('../models')
const {Message} = require('../models')
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
    async getIgnAndGame (req, res) {
        const { Op } = require('sequelize');
        try {
            let ign = null
            const search = req.query.search
            if (search) {
                ign = await Game.findAll({
                where: {
                    [Op.or]: [
                    'ign', 'game'
                    ].map(key => ({
                    [key]: {
                        [Op.like]: `%${search}%`
                    }
                    }))
                }
                })
            } else {
                ign = await Game.findAll({
                    attributes: ['ign', 'game', 'UserId', 'UserName']
                })
            }
            res.send(ign)
            } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the users'
            })
        }
    },
    // returns User
    async getUserFromUserId (req, res) {
        try {
            const {id} = req.body
            const user = await User.findOne({
                where:{
                    id: id
                }
            })
            const userJSON = user.toJSON()
            res.send({
                user: userJSON
            })
            } catch (err) {
            res.status(204).send({
                error: 'an error has occured trying to fetch the users id'
            })
        }
    },
    async getUserIdFromUser (req, res) {
        try {
            const {username} = req.body
            const user = await User.findOne({
                where:{
                    username: username
                }
            })
            const userJSON = user.toJSON()
            res.send({
                user: userJSON
            })
            } catch (err) {
            res.status(204).send({
                error: 'an error has occured trying to fetch the users id'
            })
        }
    },

    async getGames (req, res) {
        try {
            const {id} = req.body
            const user = await Game.findAll({
                where:{
                    UserId: id
                }
            })
            //const userJSON = user.toJSON()
            res.send(user)
            } catch (err) {
            res.status(204).send({
                error: 'an error has occured trying to fetch the games by id'
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
          const gameJSON = game.toJSON()
          res.send({
              game: gameJSON
          })
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create the game'
          })
        }
    },
    async remove (req, res) {
        try {
            const game = await Game.destroy({
                where: {
                    id: req.body.id
                }
            })
            if (!game) {
                return res.status(403).send({
                  error: 'you do not have access to this game'
                })
            }
            await game.destroy()
            res.send(game)
            } catch (err) {
            res.status(204).send({
                error: 'an error has occured trying to delete the game'
            })
        }
    },
    //------------- THIS IS ALL FOR FRIEND INFO CONNECTED TO THE SPECIFIC USER ------------------
    async sendFriendReq (req, res) {
        try {
            const id1 = req.body.id1
            const id2 = req.body.id2
            const user1 = await User.findOne({
                where:{
                    username: id1
                }
            })
            const user2 = await User.findOne({
                where:{
                    username: id2
                }
            })
            const userJSON1 = user1.toJSON()
            const userJSON2 = user2.toJSON()
            const friends = await Friend.create(
                {
                    from_user: id1, 
                    to_user: id2
                })
            res.send({
                user1: userJSON1,
                user2: userJSON2,
                friends
            })
            } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to send friend request'
            })
        }
    },
    //status of friendship
    async getFriends(req, res) {
        try {
            const id1 = req.body.id1
            const id2 = req.body.id2
            const friends = await Friend.findOne({
                where: {
                    from_user: id1,
                    to_user: id2
                }
            })
            res.send({
                friends
            })
            } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to send friend request'
            })
        }
    },
    async getAllFriendReqs(req, res) {
        try {
            const id2 = req.body.id2
            const response = await Friend.findAll({
                where:{
                    to_user: id2,
                    status: null
                }
            })
            res.send(response)
            } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to get all friend request'
            })
        }
    },
    async resFriendReq(req, res) {
        try {
            const id1 = req.body.id1
            const id2 = req.body.id2
            const status = req.body.status
            const friends = await Friend.update({status: status}, {
                where: {
                    from_user: id1,
                    to_user: id2
                }
            })
            res.send({
                friends
            })
            } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to send friend request'
            })
        }
    },
    async getAllFriendships(req, res) {
        const { Op } = require('sequelize');
        try {
            const user = req.body.user
            const response = await Friend.findAll({
                where:{
                    status: 1,
                    [Op.or]: [{from_user: user}, {to_user: user}]
                }
            })
            res.send(response)
            } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to get all friend request'
            })
        }
    },
    //------------- THIS IS ALL FOR FRIEND INFO CONNECTED TO THE SPECIFIC CHAT ------------------
    async getMsg (req, res) {
        const { Op } = require('sequelize');
        try {
            const user1 = req.body.user1
            const user2 = req.body.user2
            let result = await Message.findAll({
                where:{
                    [Op.and]: [{from_user: user1}, {to_user: user2}]
                }
            })
            res.send(result)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to show all the msgs'
          })
        }
    },
    async getMsgUserWith (req, res) {
        try {
            const name = req.params.username
            const user = await Message.findOne({
                where:{
                    to_user : name
                }
            })
            res.send(user.username)
            } catch (err) {
                res.status(500).send({
                error: 'an error has occured trying to show the name'
            })
        }
    },
    async sendMsg (req, res) {
        try {
            const user1 = req.body.user1
            const user2 = req.body.user2
            const message = req.body.message
            const send = await Message.create({
                from_user: user1,
                to_user : user2,
                message : message
            })
            res.send(send)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to create message'
            })
        }
    },
    //------------- THIS IS FOR UPLOADING A FILE ------------------
    async uploadPfp(req, res) {
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
}
